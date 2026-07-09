"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/components/cart/CartContext";
import { Product } from "@/lib/products";

export default function ProductShowcase({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { add, openNotify } = useCart();
  const flipped = index % 2 === 1;
  const isComingSoon = product.status === "coming-soon";

  return (
    <Reveal>
      <article
        className={`group grid items-center gap-10 lg:gap-20 ${
          isComingSoon
            ? "overflow-hidden rounded-3xl bg-gradient-to-br from-ink-2 via-ink to-ink-2 p-8 ring-1 ring-cream/10 md:p-14 lg:grid-cols-2"
            : "lg:grid-cols-2"
        }`}
      >
        {/* imagery */}
        <Link
          href={`/products/${product.slug}`}
          className={`relative block overflow-hidden rounded-3xl ${flipped ? "lg:order-2" : ""}`}
          aria-label={`View ${product.name} details`}
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            {isComingSoon && (
              <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(246,164,30,0.18),transparent_75%)]" />
            )}
            {/* glass sheen sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/10 to-transparent transition-transform duration-[1.2s] ease-out group-hover:translate-x-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          </div>
          {product.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-mango px-4 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink">
              {product.badge}
            </span>
          )}
          <span className="glass absolute bottom-5 right-5 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-cream/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            View Details →
          </span>
        </Link>

        {/* details */}
        <div className={flipped ? "lg:order-1" : ""}>
          <p className="kicker text-mango">
            No. {String(index + 1).padStart(2, "0")} —{" "}
            {isComingSoon ? "Launching Soon" : "Featured"}
          </p>
          <h2 className="font-display mt-5 text-4xl font-medium leading-tight text-cream md:text-5xl">
            {product.name}
          </h2>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.25em] text-cream/45">
            {product.unit}
          </p>
          <p className="font-display mt-6 text-4xl font-medium italic text-mango">
            {product.priceLabel}
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/60">
            {product.description}
          </p>
          <ul className="mt-8 space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[14.5px] text-cream/75">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-mango" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            {isComingSoon ? (
              <button onClick={openNotify} className="btn btn-primary">
                Notify Me
              </button>
            ) : (
              <button onClick={() => add(product.id)} className="btn btn-primary">
                Add to Cart — {product.priceLabel}
              </button>
            )}
            <Link href={`/products/${product.slug}`} className="btn btn-ghost">
              Full Details
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
