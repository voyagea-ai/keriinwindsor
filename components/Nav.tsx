"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./cart/CartContext";
import { EASE } from "./Reveal";

const links = [
  { href: "/#story", label: "The Story" },
  { href: "/#why", label: "Why Us" },
  { href: "/#varieties", label: "Varieties" },
  { href: "/products", label: "Products" },
];

export default function Nav() {
  const { count, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[250] transition-all duration-500 ${
          scrolled
            ? "border-b border-cream/5 bg-ink/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-[26px] font-medium italic leading-none text-cream transition group-hover:text-mango">
              Keri
            </span>
            <span className="kicker text-[10px] text-mango">In Windsor</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] font-medium text-cream/65 transition hover:text-mango"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/products" className="btn btn-primary !px-6 !py-2.5 text-[13.5px]">
              Pre-Order Now
            </Link>
            <CartButton onClick={openDrawer} count={count} />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <CartButton onClick={openDrawer} count={count} />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-1.5 p-2"
            >
              <span className="h-px w-6 bg-cream" />
              <span className="h-px w-4 bg-mango" />
              <span className="h-px w-6 bg-cream" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[290] flex flex-col bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <span className="font-display text-[26px] font-medium italic text-cream">
                Keri
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-cream/15 text-cream/70"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <nav className="container-x flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-4xl font-medium italic text-cream transition hover:text-mango"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
                className="mt-8"
              >
                <Link
                  href="/products"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Pre-Order Now
                </Link>
              </motion.div>
            </nav>
            <p className="container-x kicker pb-10 text-cream/30">
              Windsor, Ontario — Mango Season 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CartButton({ onClick, count }: { onClick: () => void; count: number }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open cart (${count} items)`}
      className="relative grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition hover:border-mango hover:text-mango"
    >
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
        <path
          d="M3.5 6.5h13l-1.2 9a2 2 0 01-2 1.75h-6.6a2 2 0 01-2-1.75l-1.2-9z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M7 6.5V5a3 3 0 016 0v1.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-mango font-mono text-[10px] font-semibold text-ink"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
