"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/components/cart/CartContext";
import { ProductId } from "@/lib/products";
import { site } from "@/lib/site";

interface Variety {
  name: string;
  epithet: string;
  img: string;
  taste: string;
  origin: string;
  bestFor: string;
  productId?: ProductId;
}

const varieties: Variety[] = [
  {
    name: "Kesar",
    epithet: "The Queen of Mangoes",
    img: "/images/scene-closeup.jpg",
    taste: "Honey-sweet with a warm saffron note; smooth, fibreless flesh.",
    origin: "Gir–Talala, Gujarat",
    bestFor: "Eating fresh · aamras & pulp · desserts · gifting",
    productId: "kesar-box",
  },
  {
    name: "Alphonso",
    epithet: "The King of Mangoes",
    img: "/images/scene-slice.jpg",
    taste: "Rich, creamy, apricot-honey depth with a heady room-filling aroma.",
    origin: "Ratnagiri, Maharashtra",
    bestFor: "Eating fresh · desserts · gifting",
    productId: "alphonso-box",
  },
  {
    name: "Banganpalli",
    epithet: "The Golden Giant",
    img: "/images/scene-orchard.jpg",
    taste: "Bright, mellow sweetness; crisp, juicy, almost fibre-free bite.",
    origin: "Andhra Pradesh",
    bestFor: "Slicing fresh · salads · juices · pulp",
  },
];

export default function Varieties() {
  const { add } = useCart();

  return (
    <section id="varieties" className="bg-ink">
      <div className="container-x py-28 md:py-36">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="kicker text-mango">[03] — Mango Varieties</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.06] text-cream md:text-6xl">
                Three <em className="italic text-mango">legends</em> of the season.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-[14.5px] leading-relaxed text-cream/50">
              Each variety has its own week, its own fans, and its own argument
              at the dinner table.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {varieties.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1} className="h-full">
              <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.img}
                    alt={`${v.name} mango`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <p className="kicker absolute bottom-4 left-5 text-[10px] text-mango">
                    {v.epithet}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-3xl font-medium italic text-cream">
                    {v.name}
                  </h3>
                  <dl className="mt-5 space-y-4 text-[13.5px] leading-relaxed">
                    <div>
                      <dt className="kicker mb-1 text-[9.5px] text-cream/35">Taste</dt>
                      <dd className="text-cream/75">{v.taste}</dd>
                    </div>
                    <div>
                      <dt className="kicker mb-1 text-[9.5px] text-cream/35">Origin</dt>
                      <dd className="text-cream/75">{v.origin}</dd>
                    </div>
                    <div>
                      <dt className="kicker mb-1 text-[9.5px] text-cream/35">Best for</dt>
                      <dd className="text-cream/75">{v.bestFor}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto pt-7">
                    {v.productId ? (
                      <button
                        onClick={() => add(v.productId!)}
                        className="btn btn-ghost w-full !py-3 text-[13.5px] group-hover:border-mango group-hover:text-mango"
                      >
                        Add {v.name} to Cart
                      </button>
                    ) : (
                      <a
                        href={site.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost w-full !py-3 text-[13.5px]"
                      >
                        By Request — Message Us
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
