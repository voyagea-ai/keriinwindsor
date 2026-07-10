import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/cities";
import { orderableProducts } from "@/lib/products";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  return {
    title: `Indian Mangoes in ${c.name} — Kesar & Alphonso Delivery`,
    description: `Buy premium Indian mangoes in ${c.name}, Ontario. Kesar and Alphonso boxes delivered to your door by Keri In Windsor. ${c.delivery}`,
    alternates: { canonical: `/delivery/${c.slug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const faq = [
    {
      q: `Where can I buy Indian mangoes in ${c.name}?`,
      a: `Keri In Windsor delivers premium Kesar and Alphonso mango boxes to ${c.name}. ${c.delivery} Pre-order online — no payment is taken until your box is confirmed.`,
    },
    {
      q: `How much does a box of mangoes cost in ${c.name}?`,
      a: `A box of 12 premium Kesar mangoes is $45 CAD and a box of 12 Alphonso mangoes is $50 CAD, delivered.`,
    },
    {
      q: `When are Indian mangoes available in ${c.name}?`,
      a: `The season runs roughly April to early July — Alphonso peaks April–June and Kesar May–July, arriving in small batches every 2–3 weeks. Pre-order to be first in line when a batch lands.`,
    },
  ];

  const otherCities = cities.filter((x) => x.slug !== c.slug);

  return (
    <div className="container-x pb-28 pt-36 md:pt-44">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <nav className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
        <Link href="/delivery" className="transition hover:text-mango">
          Delivery Areas
        </Link>
        <span className="mx-3 text-cream/20">/</span>
        <span className="text-cream/70">{c.name}</span>
      </nav>

      <p className="kicker text-mango">
        {c.region === "windsor-essex" ? "Windsor–Essex" : "Ontario"} Delivery
      </p>
      <h1 className="font-display mt-5 max-w-4xl text-4xl font-medium leading-[1.05] text-cream md:text-6xl">
        Indian mangoes in <em className="italic text-mango">{c.name}.</em>
      </h1>
      <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-cream/70">
        Premium Kesar and Alphonso mangoes, imported at peak season and
        delivered to your door in {c.name}. {c.delivery}
      </p>
      <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-cream/55">{c.blurb}</p>

      <div className="mt-8 flex max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
        <Link href="/products" className="btn btn-primary">
          Pre-Order for {c.name}
        </Link>
        <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Ask a Question
        </a>
      </div>

      {/* products */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {orderableProducts.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.slug}`}
            className="glass group flex items-center justify-between rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
          >
            <div>
              <p className="font-display text-xl font-medium text-cream transition group-hover:text-mango">
                {p.name}
              </p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream/45">
                {p.unit}
              </p>
            </div>
            <p className="font-display text-2xl font-medium italic text-mango">{p.priceLabel}</p>
          </Link>
        ))}
      </div>

      {/* how it works */}
      <h2 className="font-display mt-16 text-3xl font-medium text-cream">
        How delivery to {c.name} works
      </h2>
      <ol className="mt-6 max-w-2xl space-y-0">
        {[
          ["01", "Pre-order your boxes", "Reserve online in under a minute — no payment today."],
          ["02", "We confirm your batch", `When mangoes land in Canada, we contact you with a ${c.name} delivery date.`],
          ["03", "Pay on delivery", "Cash, e-transfer or card — once the box is in your hands."],
        ].map(([n, title, copy]) => (
          <li key={n} className="flex gap-5 border-t border-cream/10 py-5">
            <span className="font-mono text-[11px] tracking-[0.25em] text-mango">{n}</span>
            <div>
              <p className="font-display text-lg font-medium text-cream">{title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-cream/55">{copy}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* FAQ */}
      <h2 className="font-display mt-16 text-3xl font-medium text-cream">
        {c.name} mango questions
      </h2>
      <dl className="mt-6 max-w-2xl space-y-6">
        {faq.map((f) => (
          <div key={f.q} className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6">
            <dt className="text-[15.5px] font-semibold text-mango">{f.q}</dt>
            <dd className="mt-2 text-[14.5px] leading-relaxed text-cream/70">{f.a}</dd>
          </div>
        ))}
      </dl>

      {/* other cities */}
      <p className="kicker mt-16 text-cream/40">We also deliver to</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {otherCities.map((x) => (
          <Link
            key={x.slug}
            href={`/delivery/${x.slug}`}
            className="rounded-full border border-cream/15 px-4 py-2 text-[13px] text-cream/70 transition hover:border-mango hover:text-mango"
          >
            {x.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
