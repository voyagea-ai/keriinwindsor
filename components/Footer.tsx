import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-cream/5 bg-ink">
      <div className="container-x pb-10 pt-20">
        <div className="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="kicker mb-4 text-mango">Farm to Door — With Love</p>
            <p className="font-display text-5xl font-medium italic leading-[1.05] text-cream md:text-7xl">
              Keri In Windsor
            </p>
            <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-cream/50">
              Premium Indian mangoes in limited seasonal batches, delivered
              across Windsor–Essex and Ontario.
            </p>
          </div>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-cream/15 py-3 pl-5 pr-6 transition hover:border-mango"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-mango"
            >
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
            </svg>
            <span className="text-[14px] font-medium text-cream/80 transition group-hover:text-mango">
              {site.instagramHandle}
            </span>
          </a>
        </div>

        <div className="grid gap-10 border-t border-cream/5 pt-10 text-[14px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="kicker mb-4 text-cream/35">Location</p>
            <p className="text-cream/70">Windsor, Ontario</p>
            <p className="mt-1 text-cream/45">Delivering across Windsor–Essex</p>
          </div>
          <div>
            <p className="kicker mb-4 text-cream/35">Contact</p>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-cream/70 transition hover:text-mango"
            >
              {site.whatsappLabel}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-cream/45 transition hover:text-mango"
            >
              {site.instagramHandle}
            </a>
          </div>
          <div>
            <p className="kicker mb-4 text-cream/35">Explore</p>
            <Link href="/#story" className="block text-cream/70 transition hover:text-mango">
              The Story
            </Link>
            <Link href="/products" className="mt-1 block text-cream/70 transition hover:text-mango">
              Products
            </Link>
            <Link href="/delivery" className="mt-1 block text-cream/70 transition hover:text-mango">
              Delivery Areas
            </Link>
            <Link href="/blog" className="mt-1 block text-cream/70 transition hover:text-mango">
              The Mango Journal
            </Link>
          </div>
          <div>
            <p className="kicker mb-4 text-cream/35">Legal</p>
            <Link href="/terms" className="block text-cream/70 transition hover:text-mango">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="mt-1 block text-cream/70 transition hover:text-mango">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-cream/5 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-wider text-cream/30">
            © 2026 KERI IN WINDSOR — ALL RIGHTS RESERVED
          </p>
          <p className="font-mono text-[11px] tracking-wider text-cream/30">
            DESIGNED &amp; DEVELOPED BY{" "}
            <a
              href="https://shah-dev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/55 underline decoration-cream/20 underline-offset-4 transition hover:text-mango hover:decoration-mango"
            >
              DEV SHAH
            </a>
          </p>
          <p className="font-mono text-[11px] tracking-wider text-cream/30">
            GROWN IN INDIA · LOVED IN WINDSOR 🥭
          </p>
        </div>
      </div>
    </footer>
  );
}
