import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Mango Journal — Guides to Indian Mangoes in Ontario",
  description:
    "Guides to buying, ripening and enjoying Kesar and Alphonso mangoes in Windsor and across Ontario — from the team at Keri In Windsor.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="container-x pb-28 pt-36 md:pt-44">
      <Reveal>
        <p className="kicker text-mango">The Mango Journal</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-medium leading-[1.05] text-cream md:text-6xl">
          Everything worth knowing about{" "}
          <em className="italic text-mango">Indian mangoes</em> in Ontario.
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <Link
              href={`/blog/${p.slug}`}
              className="glass group flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream/40">
                {new Date(p.date + "T12:00:00Z").toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {p.readMinutes} min read
              </p>
              <h2 className="font-display mt-4 text-2xl font-medium leading-snug text-cream transition group-hover:text-mango md:text-[28px]">
                {p.title}
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-cream/60">
                {p.description}
              </p>
              <span className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mango">
                Read the guide →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
