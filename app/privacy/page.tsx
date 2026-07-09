import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container-x max-w-3xl pb-28 pt-36 md:pt-44">
      <p className="kicker text-mango">Legal</p>
      <h1 className="font-display mt-5 text-4xl font-medium text-cream md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
        Last updated — July 2026
      </p>

      <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-cream/70">
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">1. What We Collect</h2>
          <p>
            When you place a pre-order or join a notify list, we collect the
            details you provide: your name, phone number, delivery address, and
            postal code, along with your order selection and consent choices.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">2. How We Use It</h2>
          <p>
            Your information is used to process your order and to contact you
            regarding your purchase — confirming availability, arranging
            delivery, and settling payment. If you opt in to marketing, we may
            also send updates about seasonal arrivals and offers.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">3. Marketing Consent</h2>
          <p>
            Marketing messages are strictly opt-in. You can unsubscribe or
            request removal at any time by replying to any message or contacting
            us directly, and we will remove you from the list.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">4. Storage &amp; Sharing</h2>
          <p>
            Pre-order details are stored securely and are not sold or shared
            with third parties, except as required to fulfil your delivery or by
            law. You may request a copy or deletion of your information at any
            time.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-3 text-2xl font-medium text-cream">5. Contact</h2>
          <p>
            Privacy questions can be sent to hello@keriinwindsor.com or via
            Instagram @keri_in_windsor.
          </p>
        </section>
      </div>
    </div>
  );
}
