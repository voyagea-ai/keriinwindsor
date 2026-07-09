import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/store";
import { CheckoutInput, OrderRecord, validateCheckout } from "@/lib/orders";
import { getProduct } from "@/lib/products";

export async function POST(request: Request) {
  let body: Partial<CheckoutInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const type = body.type === "notify" ? "notify" : "order";
  const { ok, errors } = validateCheckout({ ...body, type });
  if (!ok) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Recompute all money server-side from the catalog — client totals are
  // display-only and never trusted.
  const items: OrderRecord["items"] = [];
  if (type === "order") {
    for (const line of body.items ?? []) {
      const product = getProduct(line.productId);
      if (!product || product.status !== "preorder") {
        return NextResponse.json(
          { ok: false, errors: { items: "One of the products is unavailable." } },
          { status: 422 }
        );
      }
      const quantity = Math.trunc(Number(line.quantity));
      items.push({
        productId: product.id,
        name: product.name,
        unit: product.unit,
        unitPriceCad: product.priceCad,
        quantity,
        lineTotalCad: Number((product.priceCad * quantity).toFixed(2)),
      });
    }
  }

  const subtotal = Number(items.reduce((s, i) => s + i.lineTotalCad, 0).toFixed(2));
  const now = new Date().toISOString();

  try {
    const orderNumber = await saveOrder({
      id: randomUUID(),
      type,
      // Season is closed: requests are waitlisted and confirmed when the
      // new season opens.
      status: type === "order" ? "waitlisted" : "new",
      createdAt: now,
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: String(body.email ?? "").trim(),
      address: String(body.address ?? "").trim(),
      city: String(body.city ?? "").trim(),
      postalCode: String(body.postalCode ?? "").trim().toUpperCase(),
      notes: String(body.notes ?? "").trim(),
      items,
      subtotalCad: subtotal,
      deliveryCad: 0,
      totalCad: subtotal,
      termsAcceptedAt: now,
      marketingOptIn: Boolean(body.marketingOptIn),
      marketingOptInAt: body.marketingOptIn ? now : null,
    });

    return NextResponse.json({ ok: true, orderNumber, totalCad: subtotal });
  } catch (err) {
    console.error("[orders] save failed:", err);
    return NextResponse.json(
      { ok: false, message: "Could not save your order. Please try again." },
      { status: 500 }
    );
  }
}
