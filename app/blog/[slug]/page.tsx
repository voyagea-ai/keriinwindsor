import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.metaTitle, description: post.description, type: "article" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="container-x max-w-3xl pb-28 pt-36 md:pt-44">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: site.name, url: site.domain },
          publisher: { "@type": "Organization", name: site.name, url: site.domain },
          mainEntityOfPage: `${site.domain}/blog/${post.slug}`,
        }}
      />
      {post.faq && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      <nav className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
        <Link href="/blog" className="transition hover:text-mango">
          The Mango Journal
        </Link>
      </nav>

      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream/40">
        {new Date(post.date + "T12:00:00Z").toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {post.readMinutes} min read
      </p>
      <h1 className="font-display mt-4 text-4xl font-medium leading-[1.08] text-cream md:text-5xl">
        {post.title}
      </h1>

      <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-cream/75">
        {post.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {post.sections.map((s) => (
        <section key={s.heading} className="mt-12">
          <h2 className="font-display text-2xl font-medium text-cream md:text-3xl">
            {s.heading}
          </h2>
          <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-cream/70">
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {s.list && (
            <ul className="mt-5 space-y-2.5">
              {s.list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-cream/80">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-mango" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {post.faq && (
        <section className="mt-14 rounded-3xl border border-cream/10 bg-cream/[0.03] p-7 md:p-9">
          <h2 className="font-display text-2xl font-medium text-cream">
            Quick answers
          </h2>
          <dl className="mt-6 space-y-6">
            {post.faq.map((f) => (
              <div key={f.q}>
                <dt className="text-[15.5px] font-semibold text-mango">{f.q}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-cream/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-mango via-[#f39114] to-tangerine p-9 text-center text-ink">
        <h2 className="font-display text-3xl font-medium leading-tight">
          The season won&apos;t wait.
        </h2>
        <p className="max-w-md text-[14.5px] text-ink/75">
          Premium Kesar &amp; Alphonso boxes, delivered across Windsor–Essex and
          Ontario. Reserve yours before the next batch sells out.
        </p>
        <Link href="/products" className="btn btn-ink mt-2">
          Pre-Order Now
        </Link>
      </div>

      {others.length > 0 && (
        <div className="mt-16">
          <p className="kicker text-cream/40">Keep reading</p>
          <div className="mt-5 space-y-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/blog/${o.slug}`}
                className="group block rounded-2xl border border-cream/10 p-5 transition hover:border-mango/40"
              >
                <span className="font-display text-lg font-medium text-cream transition group-hover:text-mango">
                  {o.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
