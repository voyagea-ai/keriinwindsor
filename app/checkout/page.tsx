"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/CartContext";
import { formatCad, getProduct } from "@/lib/products";
import { FieldErrors, validateCheckout } from "@/lib/orders";
import { EASE } from "@/components/Reveal";
import { site } from "@/lib/site";

const inputCls =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3.5 text-[15px] text-cream placeholder:text-cream/30 outline-none transition focus:border-mango focus:bg-cream/[0.07]";

const labelCls = "mb-2 block text-[13px] font-semibold text-cream/60";

const errCls = "mt-1.5 block text-[13px] font-medium text-tangerine";

interface SuccessState {
  orderNumber: string;
  totalCad: number;
}

export default function CheckoutPage() {
  const { lines, hydrated, subtotal, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Windsor",
    postalCode: "",
    notes: "",
    termsAccepted: false,
    marketingOptIn: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const input = { type: "order" as const, items: lines, ...form };
    const { ok, errors: v } = validateCheckout(input);
    if (!ok) {
      setErrors(v);
      document.querySelector("[data-checkout-top]")?.scrollIntoView?.();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess({ orderNumber: data.orderNumber, totalCad: data.totalCad });
        clear();
        window.__lenis?.scrollTo(0, { immediate: true });
      } else if (data.errors) {
        setErrors(data.errors);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- success ---------- */
  if (success) {
    return (
      <div className="container-x flex min-h-[100svh] max-w-2xl flex-col items-center justify-center pb-24 pt-36 text-center">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid size-20 place-items-center rounded-full bg-emerald/15 text-4xl"
        >
          🥭
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <h1 className="font-display mt-8 text-4xl font-medium leading-[1.05] text-cream md:text-6xl">
            You&apos;re on the list <em className="italic text-mango">for next season.</em>
          </h1>
          <p className="kicker mt-5 text-mango">
            Request {success.orderNumber} — {formatCad(success.totalCad)}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-cream/65">
            The mango season is currently over — but your pre-order request has
            been saved. The moment the new season begins and fresh batches are
            on their way, you&apos;ll be the first to hear from us to confirm
            your box, delivery, and payment. Thank you for taking the time —
            we can&apos;t wait to bring you the first mangoes of the season. 🥭
          </p>
        </motion.div>
        <motion.ol
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mt-10 w-full max-w-md space-y-0 text-left"
        >
          {[
            ["01", "The season returns", "Fresh Kesar and Alphonso batches land at the start of the new season."],
            ["02", "You hear first", "We contact you before the public drop to confirm your box and delivery."],
            ["03", "Pay on delivery", "Cash, e-transfer or card — only once the mangoes are in your hands."],
          ].map(([n, title, copy]) => (
            <li key={n} className="flex gap-5 border-t border-cream/10 py-5">
              <span className="font-mono text-[11px] tracking-[0.25em] text-mango">{n}</span>
              <div>
                <p className="font-display text-lg font-medium text-cream">{title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-cream/55">{copy}</p>
              </div>
            </li>
          ))}
        </motion.ol>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
        >
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Message Us
          </a>
        </motion.div>
      </div>
    );
  }

  /* ---------- empty cart ---------- */
  if (hydrated && lines.length === 0) {
    return (
      <div className="container-x flex min-h-[80svh] flex-col items-center justify-center pb-24 pt-36 text-center">
        <span className="text-6xl">🥭</span>
        <h1 className="font-display mt-6 text-4xl font-medium text-cream">
          Your box is empty
        </h1>
        <p className="mt-4 max-w-sm text-[15px] text-cream/60">
          The season is short — pick your mangoes before the batch sells out.
        </p>
        <Link href="/products" className="btn btn-primary mt-8">
          Browse the Collection
        </Link>
      </div>
    );
  }

  /* ---------- checkout form ---------- */
  return (
    <div className="container-x pb-28 pt-32 md:pt-40" data-checkout-top>
      <p className="kicker text-mango">Checkout — No payment today</p>
      <h1 className="font-display mt-4 text-4xl font-medium text-cream md:text-6xl">
        Almost <em className="italic text-mango">there.</em>
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <form onSubmit={submit} noValidate className="order-2 lg:order-1">
          <h2 className="kicker mb-6 text-cream/40">01 — Contact</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="co-name" className={labelCls}>Full Name *</label>
              <input id="co-name" type="text" autoComplete="name" placeholder="Your name"
                value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
              {errors.name && <span className={errCls}>{errors.name}</span>}
            </div>
            <div>
              <label htmlFor="co-phone" className={labelCls}>Phone Number *</label>
              <input id="co-phone" type="tel" autoComplete="tel" placeholder="(519) 555-0123"
                value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
              {errors.phone && <span className={errCls}>{errors.phone}</span>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="co-email" className={labelCls}>Email (optional)</label>
              <input id="co-email" type="email" autoComplete="email" placeholder="you@example.com"
                value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
              {errors.email && <span className={errCls}>{errors.email}</span>}
            </div>
          </div>

          <h2 className="kicker mb-6 mt-12 text-cream/40">02 — Delivery</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="co-address" className={labelCls}>Street Address *</label>
              <input id="co-address" type="text" autoComplete="street-address" placeholder="123 Ouellette Ave"
                value={form.address} onChange={(e) => set("address", e.target.value)} className={inputCls} />
              {errors.address && <span className={errCls}>{errors.address}</span>}
            </div>
            <div>
              <label htmlFor="co-city" className={labelCls}>City *</label>
              <input id="co-city" type="text" autoComplete="address-level2" placeholder="Windsor"
                value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
              {errors.city && <span className={errCls}>{errors.city}</span>}
            </div>
            <div>
              <label htmlFor="co-postal" className={labelCls}>Postal Code / ZIP *</label>
              <input id="co-postal" type="text" autoComplete="postal-code" placeholder="N9A 1A1"
                value={form.postalCode} onChange={(e) => set("postalCode", e.target.value.toUpperCase())}
                className={`${inputCls} uppercase`} />
              {errors.postalCode && <span className={errCls}>{errors.postalCode}</span>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="co-notes" className={labelCls}>Delivery Notes (optional)</label>
              <textarea id="co-notes" rows={3} placeholder="Buzzer code, preferred day, leave at door…"
                value={form.notes} onChange={(e) => set("notes", e.target.value)}
                className={`${inputCls} resize-none`} />
            </div>
          </div>

          <h2 className="kicker mb-6 mt-12 text-cream/40">03 — Consent</h2>
          <div className="space-y-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={form.termsAccepted}
                onChange={(e) => set("termsAccepted", e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-mango" />
              <span className="text-[13px] leading-relaxed text-cream/65">
                I agree to the{" "}
                <a href="/terms" target="_blank" className="font-semibold text-mango underline">Terms &amp; Conditions</a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" className="font-semibold text-mango underline">Privacy Policy</a>.
                I understand my information will be used to process my order and
                contact me regarding this purchase. <span className="text-tangerine">*</span>
              </span>
            </label>
            {errors.termsAccepted && <span className={errCls}>{errors.termsAccepted}</span>}
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={form.marketingOptIn}
                onChange={(e) => set("marketingOptIn", e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-mango" />
              <span className="text-[13px] leading-relaxed text-cream/65">
                I agree to receive updates, seasonal mango arrivals, offers, and
                marketing messages from Keri In Windsor. I understand I can
                unsubscribe or request removal anytime. <em>(Optional)</em>
              </span>
            </label>
          </div>

          {errors.items && <p className={`${errCls} mt-5`}>{errors.items}</p>}
          {serverError && (
            <p className="mt-5 rounded-xl bg-tangerine/10 px-4 py-3 text-[13px] font-medium text-tangerine">
              {serverError}
            </p>
          )}

          <button type="submit" disabled={submitting || !hydrated}
            className="btn btn-primary mt-8 w-full !py-4 text-base disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Placing your pre-order…" : `Place Pre-Order — ${formatCad(subtotal)}`}
          </button>
          <p className="mt-3 text-center text-[12.5px] text-cream/40">
            Nothing is charged online. We confirm your batch first, then arrange
            payment &amp; delivery personally.
          </p>
        </form>

        {/* summary */}
        <aside className="order-1 lg:order-2">
          <div className="glass sticky top-24 rounded-3xl p-6 md:p-7">
            <h2 className="kicker text-cream/40">Your Box</h2>
            <ul className="mt-4 divide-y divide-cream/8">
              {lines.map((line) => {
                const p = getProduct(line.productId);
                if (!p) return null;
                return (
                  <li key={line.productId} className="flex items-center gap-4 py-4">
                    <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display truncate text-[17px] font-medium text-cream">{p.name}</p>
                      <div className="mt-1 flex items-center gap-2.5">
                        <button type="button" onClick={() => setQty(line.productId, line.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="grid size-6 place-items-center rounded-full border border-cream/20 text-[13px] text-cream/70 transition hover:border-mango hover:text-mango">−</button>
                        <span className="w-5 text-center text-[14px] text-cream">{line.quantity}</span>
                        <button type="button" onClick={() => setQty(line.productId, line.quantity + 1)}
                          aria-label="Increase quantity"
                          className="grid size-6 place-items-center rounded-full border border-cream/20 text-[13px] text-cream/70 transition hover:border-mango hover:text-mango">+</button>
                        <button type="button" onClick={() => remove(line.productId)}
                          className="ml-1 text-[11px] font-mono uppercase tracking-wider text-cream/35 transition hover:text-tangerine">
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-display text-[17px] font-medium text-cream">
                      {formatCad(p.priceCad * line.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 space-y-2.5 border-t border-cream/10 pt-4 text-[14px]">
              <div className="flex justify-between text-cream/60">
                <span>Subtotal</span><span>{formatCad(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Local delivery</span>
                <span className="text-emerald">Free</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-cream/10 pt-3">
                <span className="font-semibold text-cream">Total</span>
                <span className="font-display text-3xl font-medium italic text-mango">
                  {formatCad(subtotal)}
                </span>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12.5px] text-cream/45">
              <span className="pulse-dot size-1.5 rounded-full bg-emerald" />
              Limited seasonal batches — orders confirmed in sequence.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
