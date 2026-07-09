import { OrderRecord } from "./orders";

/**
 * Storage layer with two backends, picked by environment:
 *
 * - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set  → Supabase Postgres
 *   (production / Vercel; order numbers assigned by a DB trigger).
 * - otherwise                                     → local SQLite at
 *   data/keri.db (development; numbering inside a transaction).
 *
 * Both are lazy-imported so the unused driver never loads — better-sqlite3
 * must not initialise on Vercel's read-only filesystem.
 */

export interface NewOrder {
  id: string;
  type: "order" | "notify";
  status: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  items: OrderRecord["items"];
  subtotalCad: number;
  deliveryCad: number;
  totalCad: number;
  termsAcceptedAt: string;
  marketingOptIn: boolean;
  marketingOptInAt: string | null;
}

function useSupabase(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Persist an order/notify request; returns the assigned order number. */
export async function saveOrder(order: NewOrder): Promise<string> {
  return useSupabase() ? saveToSupabase(order) : saveToSqlite(order);
}

/* ---------------- Supabase (production) ---------------- */

async function saveToSupabase(order: NewOrder): Promise<string> {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from("orders")
    .insert({
      id: order.id,
      type: order.type,
      status: order.status,
      created_at: order.createdAt,
      name: order.name,
      phone: order.phone,
      email: order.email,
      address: order.address,
      city: order.city,
      postal_code: order.postalCode,
      notes: order.notes,
      items: order.items,
      subtotal_cad: order.subtotalCad,
      delivery_cad: order.deliveryCad,
      total_cad: order.totalCad,
      terms_accepted_at: order.termsAcceptedAt,
      marketing_opt_in: order.marketingOptIn,
      marketing_opt_in_at: order.marketingOptInAt,
      payment_method: "pay_on_confirmation",
      payment_status: "pending",
      stripe_payment_intent_id: null,
      source: "website",
    })
    .select("order_number")
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
  return data.order_number as string;
}

/* ---------------- SQLite (local development) ---------------- */

async function saveToSqlite(order: NewOrder): Promise<string> {
  const { db } = await import("./db");

  const insertStmt = db.prepare(`
    INSERT INTO orders (
      id, order_number, type, status, created_at,
      name, phone, email, address, city, postal_code, notes,
      items_json, subtotal_cad, delivery_cad, total_cad,
      terms_accepted_at, marketing_opt_in, marketing_opt_in_at,
      payment_method, payment_status, stripe_payment_intent_id, source
    ) VALUES (
      @id, @orderNumber, @type, @status, @createdAt,
      @name, @phone, @email, @address, @city, @postalCode, @notes,
      @itemsJson, @subtotalCad, @deliveryCad, @totalCad,
      @termsAcceptedAt, @marketingOptIn, @marketingOptInAt,
      'pay_on_confirmation', 'pending', NULL, 'website'
    )
  `);
  const countByType = db.prepare("SELECT COUNT(*) AS c FROM orders WHERE type = ?");

  // Number + insert atomically so concurrent orders can't collide.
  const run = db.transaction((o: NewOrder) => {
    const { c } = countByType.get(o.type) as { c: number };
    const orderNumber =
      o.type === "order"
        ? `KIW-${String(c + 1).padStart(4, "0")}`
        : `KIW-N-${String(c + 1).padStart(4, "0")}`;
    insertStmt.run({
      id: o.id,
      orderNumber,
      type: o.type,
      status: o.status,
      createdAt: o.createdAt,
      name: o.name,
      phone: o.phone,
      email: o.email,
      address: o.address,
      city: o.city,
      postalCode: o.postalCode,
      notes: o.notes,
      itemsJson: JSON.stringify(o.items),
      subtotalCad: o.subtotalCad,
      deliveryCad: o.deliveryCad,
      totalCad: o.totalCad,
      termsAcceptedAt: o.termsAcceptedAt,
      marketingOptIn: o.marketingOptIn ? 1 : 0,
      marketingOptInAt: o.marketingOptInAt,
    });
    return orderNumber;
  });

  return run(order);
}
