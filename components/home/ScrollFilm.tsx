"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FILM_CHAPTERS,
  TOTAL_FRAMES,
  flatIndex,
  framePath,
  locateFrame,
} from "@/lib/film";

/** Portion of the pinned scroll devoted to the film; the rest holds the CTA. */
const FILM_PORTION = 0.86;
/** Frames of chapter 1 that must be decoded before the film reveals. */
const READY_FRAMES = 14;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};

export default function ScrollFilm() {
  const root = useRef<HTMLElement>(null);
  // GSAP pins (and re-parents into a spacer) this inner div — never the
  // section React positions, or route changes die in removeChild.
  const pinEl = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const images: (HTMLImageElement | undefined)[] = new Array(TOTAL_FRAMES);
    const loaded: boolean[] = new Array(TOTAL_FRAMES).fill(false);
    let currentFrame = 0;
    let lastDrawn = -1;
    let readyCount = 0;
    let isReady = false;
    let disposed = false;

    /* ---------- canvas ---------- */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn = -1;
      draw(currentFrame);
    };

    const nearestLoaded = (idx: number): number => {
      if (loaded[idx]) return idx;
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        if (idx - d >= 0 && loaded[idx - d]) return idx - d;
        if (idx + d < TOTAL_FRAMES && loaded[idx + d]) return idx + d;
      }
      return -1;
    };

    const draw = (idx: number) => {
      const use = nearestLoaded(idx);
      if (use < 0 || use === lastDrawn) return;
      const img = images[use]!;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawn = use;
    };

    /* ---------- progressive loader ---------- */
    // Chapter 1 loads first and gates the reveal; the rest stream in behind
    // it. If a frame is missing when the user scrubs past it, the nearest
    // decoded frame is drawn instead — no gaps, no jank.
    const queue: number[] = [];
    for (let c = 0; c < FILM_CHAPTERS.length; c++) {
      for (let f = 0; f < FILM_CHAPTERS[c].count; f++) queue.push(flatIndex(c, f));
    }
    let cursor = 0;
    const CONCURRENCY = 8;

    const pump = () => {
      if (disposed || cursor >= queue.length) return;
      const idx = queue[cursor++];
      const { chapter, local } = locateFrame(idx);
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(FILM_CHAPTERS[chapter].key, local);
      const done = () => {
        if (disposed) return;
        images[idx] = img;
        loaded[idx] = true;
        if (idx < READY_FRAMES) {
          readyCount++;
          if (loaderBarRef.current) {
            loaderBarRef.current.style.transform = `scaleX(${readyCount / READY_FRAMES})`;
          }
          if (!isReady && readyCount >= READY_FRAMES) {
            isReady = true;
            setReady(true);
            draw(currentFrame);
          }
        }
        // A better frame for the current position may have just arrived.
        if (Math.abs(idx - currentFrame) < 3) draw(currentFrame);
        pump();
      };
      img.onload = done;
      img.onerror = done; // skip broken frames rather than stalling the queue
    };
    for (let i = 0; i < CONCURRENCY; i++) pump();

    /* ---------- captions (driven imperatively — one trigger total) ---------- */
    const setCaption = (i: number, alpha: number, y: number) => {
      const el = captionRefs.current[i];
      if (!el) return;
      el.style.opacity = String(alpha);
      el.style.transform = `translateY(${y}px)`;
      el.style.visibility = alpha <= 0.01 ? "hidden" : "visible";
    };

    const update = (p: number) => {
      const fp = clamp01(p / FILM_PORTION);
      currentFrame = Math.round(fp * (TOTAL_FRAMES - 1));
      draw(currentFrame);

      const pos = fp * FILM_CHAPTERS.length; // 0..6 chapter-space
      for (let i = 0; i < FILM_CHAPTERS.length; i++) {
        const local = pos - i; // <0 upcoming, 0..1 active, >1 passed
        const isLast = i === FILM_CHAPTERS.length - 1;
        const fadeIn = smooth(local / 0.18);
        const fadeOut = isLast ? 1 : 1 - smooth((local - 0.78) / 0.2);
        const alpha = clamp01(Math.min(fadeIn, fadeOut));
        const y = (1 - fadeIn) * 36;
        setCaption(i, alpha, y);
      }

      // closing CTA
      const ctaT = smooth((p - FILM_PORTION) / (1 - FILM_PORTION));
      if (dimRef.current) dimRef.current.style.opacity = String(ctaT * 0.82);
      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(ctaT);
        ctaRef.current.style.transform = `translateY(${(1 - ctaT) * 40}px) scale(${0.97 + ctaT * 0.03})`;
        ctaRef.current.style.pointerEvents = ctaT > 0.6 ? "auto" : "none";
      }
      if (ctaT > 0.5) {
        setCaption(FILM_CHAPTERS.length - 1, 1 - smooth((ctaT - 0.5) / 0.3), 0);
      }

      // chrome
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${fp})`;
      }
      if (counterRef.current) {
        const idx = Math.min(FILM_CHAPTERS.length - 1, Math.floor(pos));
        const label = String(idx + 1).padStart(2, "0");
        if (counterRef.current.textContent !== label) {
          counterRef.current.textContent = label;
        }
      }
    };

    // One ScrollTrigger owns the pin and every visual it drives — a second
    // trigger on a pinned element fights the pin.
    const st = ScrollTrigger.create({
      trigger: pinEl.current!,
      start: "top top",
      end: () => `+=${(FILM_CHAPTERS.length + 1.4) * 100}%`,
      pin: pinEl.current!,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => update(self.progress),
    });

    resize();
    update(st.progress);
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      id="story"
      className="relative bg-ink"
      aria-label="The journey of a Keri In Windsor mango, from orchard to doorstep"
    >
      <div ref={pinEl} className="relative h-[100svh] overflow-hidden bg-ink">
      {/* film */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* cinematic grade: letterbox vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      {/* loader (until first frames decode) */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-ink transition-opacity duration-700 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <p className="kicker text-mango">The Journey</p>
        <p className="font-display text-2xl font-medium italic text-cream/80">
          Rolling film…
        </p>
        <div className="h-px w-40 overflow-hidden bg-cream/15">
          <div
            ref={loaderBarRef}
            className="h-px origin-left scale-x-0 bg-mango transition-transform duration-300"
          />
        </div>
      </div>

      {/* chapter captions */}
      {FILM_CHAPTERS.map((c, i) => (
        <div
          key={c.key}
          ref={(el) => {
            captionRefs.current[i] = el;
          }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-24 opacity-0 md:pb-28"
        >
          <div className="container-x">
            <p className="kicker mb-4 text-mango">
              [{c.index}] — {c.kicker}
            </p>
            <h3 className="font-display max-w-3xl text-[31px] leading-[1.05] font-medium text-cream sm:text-4xl md:text-6xl">
              {c.title}
            </h3>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-cream/70 sm:mt-5 sm:text-[15px]">
              {c.copy}
            </p>
          </div>
        </div>
      ))}

      {/* closing CTA */}
      <div ref={dimRef} className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0" />
      <div
        ref={ctaRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0"
      >
        <div className="container-x text-center">
          <p className="kicker mb-6 text-mango">[07] — The Season</p>
          <h3 className="font-display mx-auto max-w-3xl text-[34px] leading-[1.03] font-medium text-cream sm:text-4xl md:text-7xl">
            Taste it <em className="italic text-mango">while it lasts.</em>
          </h3>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-cream/60">
            Batches land every few weeks and disappear in days. Build your box
            before the next one sells out.
          </p>
          <div className="mt-9">
            <Link href="/products" className="btn btn-primary">
              Pre-Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* film chrome */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-9">
        <div className="container-x flex items-center justify-between">
          <div className="h-px w-36 bg-cream/15 md:w-56">
            <div ref={progressRef} className="h-px origin-left scale-x-0 bg-mango" />
          </div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-cream/40">
            <span ref={counterRef} className="text-mango">
              01
            </span>{" "}
            / {String(FILM_CHAPTERS.length).padStart(2, "0")}
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
