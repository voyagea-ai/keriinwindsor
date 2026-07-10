"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, RevealLines } from "@/components/Reveal";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safari blocks autoplay because React omits the `muted` attribute from
  // server-rendered HTML (it only sets the JS property after hydration) —
  // and Safari judges autoplay eligibility from the parsed attribute. Force
  // muted for real, ask to play, and retry on the first interaction for
  // strict cases like Low Power Mode.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    if (v.readyState >= 2) tryPlay();
    v.addEventListener("loadeddata", tryPlay, { once: true });
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("scroll", tryPlay, { once: true, passive: true });
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden">
      {/* real footage backdrop with slow settle */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-loop.mp4"
          poster="/images/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Slow-motion golden mango juice splashing over fresh cut mangoes"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_40%,rgba(7,16,9,0.75)_100%)]" />

      <div className="container-x relative z-10 pb-20 md:pb-24">
        <motion.p
          className="kicker mb-6 flex items-center gap-3 text-mango"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
        >
          <span className="inline-block size-1.5 rounded-full bg-mango" />
          Fresh Indian Mangoes — Windsor, Ontario
        </motion.p>

        <RevealLines
          as="h1"
          className="font-display max-w-5xl text-[13vw] font-medium leading-[0.98] text-cream sm:text-7xl lg:text-8xl xl:text-[104px]"
          delay={0.65}
          lines={[
            <span key="1">
              Windsor&apos;s <em className="italic text-mango">Mango Season</em>
            </span>,
            <span key="2">Starts Here.</span>,
          ]}
        />

        <motion.p
          className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-cream/70 md:text-[17px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
        >
          Fresh Indian mangoes, premium quality, limited seasonal batches —
          delivered with love across Windsor and nearby areas.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.9, ease: EASE }}
        >
          <Link href="/products" className="btn btn-primary w-full sm:w-auto">
            Pre-Order Now
          </Link>
          <Link href="/#varieties" className="btn btn-ghost w-full sm:w-auto">
            Explore Mangoes
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 md:right-12 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="kicker text-[10px] text-cream/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="relative h-16 w-px overflow-hidden bg-cream/15">
          <motion.span
            className="absolute left-0 top-0 h-6 w-px bg-mango"
            animate={{ y: [-24, 64] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
