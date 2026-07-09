"use client";

import { Reveal } from "@/components/Reveal";

const benefits = [
  {
    n: "01",
    title: "Fresh seasonal Indian mangoes",
    copy: "Flown in at peak season and delivered within days of landing — never months in cold storage.",
  },
  {
    n: "02",
    title: "Limited batches",
    copy: "Small imports timed to the harvest. When a batch is gone, it's gone until the next one lands.",
  },
  {
    n: "03",
    title: "Premium quality",
    copy: "Every box is hand-graded for size, aroma and blemish-free skin before it reaches your door.",
  },
  {
    n: "04",
    title: "Local Windsor delivery",
    copy: "From our door to yours across Windsor and nearby areas — carefully, quickly, personally.",
  },
  {
    n: "05",
    title: "Easy pre-order system",
    copy: "Reserve in under a minute. No payment today — we confirm your batch first, then arrange the rest.",
  },
  {
    n: "06",
    title: "First to know",
    copy: "Opt in for arrival alerts, new varieties and member offers before the public announcement.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="border-t border-ink/10 bg-cream text-ink">
      <div className="container-x py-28 md:py-36">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="kicker text-emerald-deep">[02] — Why Keri In Windsor</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 max-w-xl text-4xl font-medium leading-[1.06] md:text-6xl">
                Mangoes, taken <em className="italic text-mango-deep">seriously.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-[14.5px] leading-relaxed text-ink/55">
              One obsession, done properly: getting India&apos;s best mangoes to
              Windsor at their absolute peak.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.n} delay={(i % 3) * 0.08} className="h-full">
              <div className="group h-full bg-cream p-8 transition-colors duration-500 hover:bg-white md:p-10">
                <p className="font-mono text-[11px] tracking-[0.25em] text-ink/35 transition-colors duration-500 group-hover:text-mango-deep">
                  /{b.n}
                </p>
                <h3 className="font-display mt-8 text-[22px] font-medium leading-snug md:mt-12">
                  {b.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/55">{b.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
