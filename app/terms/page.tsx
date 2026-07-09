import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl pb-28 pt-36 md:pt-44">
      <p className="kicker text-mango">Legal</p>
      <h1 className="font-display mt-5 text-4xl font-medium text-cream md:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
        Last updated — July 2026
      </p>

      <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-cream/70">
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">1. Pre-Orders</h2>
          <p>
            A pre-order placed through this website is a request, not a completed
            purchase. Keri In Windsor will contact you to confirm availability,
            delivery schedule, and payment. No payment is collected online at
            this time. Submitting a pre-order does not guarantee allocation from
            a given batch; batches are limited and fulfilled in order of
            confirmation.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">2. Seasonal Availability</h2>
          <p>
            Mangoes are a seasonal, perishable product. Varieties, arrival
            dates, and quantities depend on harvests and import schedules and
            may change without notice. Prices shown are in Canadian dollars and
            may be adjusted between batches.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">3. Delivery</h2>
          <p>
            Delivery is currently offered across Windsor, Ontario and nearby
            areas. Delivery windows are arranged with you directly after your
            order is confirmed. Please inspect your box on delivery; quality
            concerns must be raised within 24 hours of receipt.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">4. Use of Your Information</h2>
          <p>
            Information submitted with a pre-order (name, phone number, address,
            postal code) is used to process your order and contact you regarding
            this purchase, as described in our Privacy Policy. Marketing
            messages are sent only if you opt in, and you can unsubscribe or
            request removal at any time.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">5. Contact</h2>
          <p>
            Questions about these terms can be sent to hello@keriinwindsor.com
            or via Instagram @keri_in_windsor.
          </p>
        </section>
      </div>
    </div>
  );
}
