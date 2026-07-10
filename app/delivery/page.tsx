import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Indian Mango Delivery Areas — Windsor–Essex & Ontario",
  description:
    "Keri In Windsor delivers premium Kesar and Alphonso mangoes across Windsor, LaSalle, Tecumseh, Belle River, Kingsville, Leamington — plus London, Toronto and Brampton.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryIndexPage() {
  const local = cities.filter((c) => c.region === "windsor-essex");
  const ontario = cities.filter((c) => c.region === "ontario");

  return (
    <div className="container-x pb-28 pt-36 md:pt-44">
      <Reveal>
        <p className="kicker text-mango">Delivery Areas</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-medium leading-[1.05] text-cream md:text-6xl">
          Fresh Indian mangoes,{" "}
          <em className="italic text-mango">delivered across Ontario.</em>
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-cream/65">
          Free weekly doorstep delivery across Windsor–Essex, plus scheduled
          seasonal runs to London and the GTA. Find your city below.
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <h2 className="kicker mt-16 text-cream/40">Windsor–Essex — free weekly delivery</h2>
      </Reveal>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {local.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05} className="h-full">
            <Link
              href={`/delivery/${c.slug}`}
              className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="font-display text-2xl font-medium text-cream transition group-hover:text-mango">
                {c.name}
              </span>
              <span className="mt-2 text-[13.5px] leading-relaxed text-cream/55">
                {c.delivery}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2 className="kicker mt-14 text-cream/40">Across Ontario — seasonal delivery runs</h2>
      </Reveal>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ontario.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05} className="h-full">
            <Link
              href={`/delivery/${c.slug}`}
              className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="font-display text-2xl font-medium text-cream transition group-hover:text-mango">
                {c.name}
              </span>
              <span className="mt-2 text-[13.5px] leading-relaxed text-cream/55">
                {c.delivery}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 flex flex-col items-start gap-4 rounded-3xl border border-mango/25 bg-mango/[0.06] p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-[15px] leading-relaxed text-cream/75">
            Don&apos;t see your town? If you&apos;re anywhere in Southwestern
            Ontario or the GTA, message us — batches travel further every
            season.
          </p>
          <Link href="/products" className="btn btn-primary shrink-0">
            Pre-Order Now
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
