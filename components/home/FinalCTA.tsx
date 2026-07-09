"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealLines } from "@/components/Reveal";
import { site } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/scene-delivery.jpg"
        alt="Keri In Windsor mango box, opened at the doorstep"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/72" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_100%,rgba(7,16,9,0.9),transparent)]" />

      <div className="container-x relative z-10 py-32 text-center md:py-44">
        <RevealLines
          as="h2"
          className="font-display text-5xl font-medium leading-[1.02] text-cream md:text-8xl"
          lines={[
            <span key="1">Don&apos;t miss</span>,
            <span key="2">
              <em className="italic text-mango">the season.</em>
            </span>,
          ]}
        />
        <Reveal delay={0.35}>
          <p className="mx-auto mt-7 max-w-lg text-[15.5px] leading-relaxed text-cream/70">
            Fresh mangoes arrive in limited batches. Pre-order now before the
            next batch sells out.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn btn-primary">
              Pre-Order Now
            </Link>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Message Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
