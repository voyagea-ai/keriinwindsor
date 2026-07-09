import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductShowcase from "@/components/products/ProductShowcase";
import { Reveal, RevealLines } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Premium Mango Collection",
  description:
    "Freshly imported from India. Hand-selected for exceptional sweetness, freshness, and quality. Available only during the mango season in limited batches.",
};

export default function ProductsPage() {
  return (
    <div className="bg-ink">
      {/* page header */}
      <header className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(246,164,30,0.14),transparent_70%)]" />
        <div className="container-x relative z-10 text-center">
          <Reveal>
            <p className="kicker text-mango">The Collection — Season 2026</p>
          </Reveal>
          <RevealLines
            as="h1"
            delay={0.15}
            className="font-display mx-auto mt-6 max-w-4xl text-5xl font-medium leading-[1.02] text-cream md:text-7xl"
            lines={[
              <span key="1">Premium Mango</span>,
              <span key="2">
                <em className="italic text-mango">Collection</em>
              </span>,
            ]}
          />
          <Reveal delay={0.4}>
            <p className="mx-auto mt-7 max-w-2xl text-[15.5px] leading-relaxed text-cream/60">
              Freshly imported from India. Hand-selected for exceptional
              sweetness, freshness, and quality. Available only during the mango
              season in limited batches.
            </p>
          </Reveal>
        </div>
      </header>

      {/* showcases */}
      <div className="container-x flex flex-col gap-28 pb-32 md:gap-40">
        {products.map((p, i) => (
          <ProductShowcase key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
