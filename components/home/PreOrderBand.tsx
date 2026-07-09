"use client";

import { Reveal } from "@/components/Reveal";
import { useCart } from "@/components/cart/CartContext";

export default function PreOrderBand() {
  const { add } = useCart();

  return (
    <section
      id="preorder"
      className="relative overflow-hidden bg-gradient-to-br from-mango via-[#f39114] to-tangerine text-ink"
    >
      {/* oversized watermark */}
      <p
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap text-[26vw] font-semibold italic leading-none text-ink/[0.06]"
      >
        keri keri keri
      </p>
      <div className="container-x relative z-10 py-24 text-center md:py-32">
        <Reveal>
          <p className="kicker text-ink/60">[04] — Pre-Order</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-medium leading-[1.04] md:text-6xl">
            Reserve your batch <em className="italic">before it lands.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/70">
            No payment today. Build your box, and we&apos;ll confirm
            availability, delivery and payment personally.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => add("kesar-box")}
              className="btn btn-ink !px-8 !py-4 text-base"
            >
              Add Kesar Box — $45
            </button>
            <button
              onClick={() => add("alphonso-box")}
              className="btn !border !border-ink/30 !bg-transparent !px-8 !py-4 text-base text-ink hover:!bg-ink hover:!text-cream"
            >
              Add Alphonso Box — $50
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="kicker mt-8 text-[10px] text-ink/50">
            Batches sell out — Windsor &amp; Essex County
          </p>
        </Reveal>
      </div>
    </section>
  );
}
