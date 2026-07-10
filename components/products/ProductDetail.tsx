"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, Reveal } from "@/components/Reveal";
import { useCart } from "@/components/cart/CartContext";
import { formatCad, Product } from "@/lib/products";

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-cream/10 py-6">
      <h3 className="kicker mb-4 text-cream/40">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-cream/75">
            <span className="mt-[8px] size-1 shrink-0 rounded-full bg-mango/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { add, openNotify } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const contain = product.imageFit === "contain";
  const frame = useRef<HTMLDivElement>(null);
  const isComingSoon = product.status === "coming-soon";

  // cursor-following zoom origin
  const onMove = (e: React.MouseEvent) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--zx", `${x}%`);
    el.style.setProperty("--zy", `${y}%`);
  };

  return (
    <div className="bg-ink">
      <div className="container-x pb-28 pt-32 md:pt-40">
        {/* breadcrumb */}
        <Reveal>
          <nav className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
            <Link href="/products" className="transition hover:text-mango">
              Products
            </Link>
            <span className="mx-3 text-cream/20">/</span>
            <span className="text-cream/70">{product.shortName}</span>
          </nav>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* gallery */}
          <div>
            <motion.div
              ref={frame}
              onMouseMove={onMove}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              className="relative aspect-[4/5] cursor-crosshair overflow-hidden rounded-3xl ring-1 ring-cream/10"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {contain && (
                <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_46%,rgba(246,164,30,0.2),rgba(7,16,9,0)_75%)]" />
              )}
              <Image
                key={product.gallery[active]}
                src={product.gallery[active]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={
                  contain
                    ? "object-contain p-10 drop-shadow-[0_40px_70px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out md:p-14"
                    : "object-cover transition-transform duration-500 ease-out"
                }
                style={{
                  transformOrigin: "var(--zx, 50%) var(--zy, 50%)",
                  transform: zoom ? (contain ? "scale(1.35)" : "scale(1.7)") : "scale(1)",
                }}
              />
              {product.badge && (
                <span className="absolute left-5 top-5 z-10 rounded-full bg-mango px-4 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink">
                  {product.badge}
                </span>
              )}
              <span className="glass pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
                Hover to zoom
              </span>
            </motion.div>
            <div className="mt-4 flex gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`relative aspect-square w-20 overflow-hidden rounded-xl ring-1 transition md:w-24 ${
                    active === i
                      ? "ring-mango"
                      : "opacity-55 ring-cream/10 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className={contain ? "object-contain p-2" : "object-cover"}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <Reveal>
              <h1 className="font-display text-4xl font-medium leading-tight text-cream md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.25em] text-cream/45">
                {product.unit}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex items-center justify-between gap-6">
                <p className="font-display text-4xl font-medium italic text-mango">
                  {product.priceLabel}
                </p>
                <p className="flex items-center gap-2.5 text-[13px] text-cream/60">
                  <span
                    className={`pulse-dot size-2 rounded-full ${
                      isComingSoon ? "bg-mango" : "bg-emerald"
                    }`}
                  />
                  {isComingSoon ? "Launching soon" : "Limited seasonal availability"}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed text-cream/65">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8">
                {isComingSoon ? (
                  <button onClick={openNotify} className="btn btn-primary w-full">
                    Notify Me
                  </button>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                    <div className="flex items-center justify-center gap-5 rounded-full border border-cream/15 px-4 py-3 sm:justify-start sm:gap-3 sm:py-0">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="p-1 text-lg text-cream/70 transition hover:text-mango"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-display text-xl text-cream">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((q) => Math.min(20, q + 1))}
                        aria-label="Increase quantity"
                        className="p-1 text-lg text-cream/70 transition hover:text-mango"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => add(product.id, qty)}
                      className="btn btn-primary flex-1"
                    >
                      Add to Cart — {formatCad(product.priceCad * qty)}
                    </button>
                  </div>
                )}
                <p className="mt-3 text-center text-[12px] text-cream/40">
                  No payment today — we confirm availability first.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10">
                <div className="border-t border-cream/10 py-6">
                  <h3 className="kicker mb-3 text-cream/40">Origin</h3>
                  <p className="text-[15px] font-medium text-cream">
                    {product.origin.region}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-cream/55">
                    {product.origin.note}
                  </p>
                </div>
                <InfoBlock title="What's Included" items={product.included} />
                <InfoBlock title="Storage" items={product.storage} />
                <InfoBlock title="Delivery" items={product.delivery} />
                <div className="rounded-2xl border border-mango/25 bg-mango/[0.07] px-5 py-4">
                  <p className="text-[13.5px] leading-relaxed text-mango">
                    {product.availability}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* related */}
        <div className="mt-28">
          <Reveal>
            <p className="kicker text-mango">You may also like</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <Link
                  href={`/products/${r.slug}`}
                  className="glass group flex items-center gap-6 overflow-hidden rounded-3xl p-4 transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl md:w-32">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      sizes="128px"
                      className={
                        r.imageFit === "contain"
                          ? "object-contain p-3 transition-transform duration-[1.2s] group-hover:scale-105"
                          : "object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                      }
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display truncate text-2xl font-medium text-cream">
                      {r.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream/40">
                      {r.unit}
                    </p>
                    <p className="font-display mt-2 text-xl italic text-mango">
                      {r.priceLabel}
                    </p>
                  </div>
                  <span className="ml-auto mr-3 text-cream/30 transition group-hover:translate-x-1.5 group-hover:text-mango">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
