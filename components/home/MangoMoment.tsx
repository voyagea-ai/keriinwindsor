"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";

const statement =
  "In India, mango season isn't a shopping trip — it's an event. Families argue over Kesar versus Alphonso. Boxes are gifted like gold. And for a few short weeks, everything smells like summer.";

const flavors = [
  { word: "Sweet.", cls: "text-mango-deep" },
  { word: "Fragrant.", cls: "text-tangerine" },
  { word: "Seasonal.", cls: "text-emerald-deep" },
  { word: "Unforgettable.", cls: "text-ink" },
];

export default function MangoMoment() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // word-by-word ink-up on the intro statement
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.fromTo(
        words,
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 72%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );

      // each flavour word rises + saturates as it enters
      gsap.utils.toArray<HTMLElement>("[data-flavor]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.08, y: 46 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 55%", scrub: true },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="moment" className="bg-cream text-ink">
      <div className="container-x py-28 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Reveal>
              <p className="kicker text-emerald-deep">[01] — The Mango Moment</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 text-4xl font-medium leading-[1.06] md:text-5xl">
                Why Indian mangoes are{" "}
                <em className="italic text-emerald-deep">worth the wait</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60">
                Sun-ripened in GI-tagged orchards, harvested for flavour instead
                of shelf life, and flown in at the peak of the season. This is
                the mango as it was meant to taste.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-8">
                {[
                  ["22°+", "Brix sweetness"],
                  ["48h", "Orchard to flight"],
                  ["8–10", "Weeks of season"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-medium text-ink">{num}</p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <p
              data-statement
              className="font-display text-2xl font-medium leading-[1.35] text-ink md:text-[34px]"
            >
              {statement.split(" ").map((w, i) => (
                <span key={i} data-word className="inline">
                  {w}{" "}
                </span>
              ))}
            </p>
            <div className="mt-16 md:mt-20">
              {flavors.map(({ word, cls }) => (
                <p
                  key={word}
                  data-flavor
                  className={`font-display text-[15vw] font-semibold italic leading-[1.02] sm:text-7xl lg:text-8xl xl:text-[110px] ${cls}`}
                >
                  {word}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
