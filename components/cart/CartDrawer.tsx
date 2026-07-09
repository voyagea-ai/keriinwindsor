"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { formatCad, getProduct } from "@/lib/products";
import { EASE } from "@/components/Reveal";

export default function CartDrawer() {
  const { lines, count, subtotal, setQty, remove, drawerOpen, closeDrawer } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          className="fixed inset-0 z-[300]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your box"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="kicker text-emerald-deep">Pre-Order</p>
                <h2 className="font-display text-2xl font-medium italic">
                  Your Box {count > 0 && <span className="not-italic text-ink/40">({count})</span>}
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink/60 transition hover:rotate-90 hover:border-ink hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="text-5xl">🥭</span>
                <p className="font-display text-2xl font-medium">Your box is empty</p>
                <p className="text-[14px] text-ink/55">
                  The season is short — fill it while the batches last.
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    router.push("/products");
                  }}
                  className="btn btn-ink mt-2"
                >
                  Browse Mangoes
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/8 overflow-y-auto px-6">
                  {lines.map((line) => {
                    const p = getProduct(line.productId);
                    if (!p) return null;
                    return (
                      <motion.li
                        key={line.productId}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4 py-5"
                      >
                        <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-display text-lg font-medium leading-tight">
                                {p.name}
                              </p>
                              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                                {p.unit} · {p.priceLabel}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(line.productId)}
                              aria-label={`Remove ${p.name}`}
                              className="text-ink/35 transition hover:text-[#c2410c]"
                            >
                              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
                              </svg>
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setQty(line.productId, line.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="grid size-8 place-items-center rounded-full border border-ink/20 transition hover:border-emerald-deep hover:text-emerald-deep"
                              >
                                −
                              </button>
                              <span className="w-6 text-center font-display text-lg">
                                {line.quantity}
                              </span>
                              <button
                                onClick={() => setQty(line.productId, line.quantity + 1)}
                                aria-label="Increase quantity"
                                className="grid size-8 place-items-center rounded-full border border-ink/20 transition hover:border-emerald-deep hover:text-emerald-deep"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-display text-lg font-medium">
                              {formatCad(p.priceCad * line.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="border-t border-ink/10 bg-white/50 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] text-ink/60">Subtotal</p>
                    <p className="font-display text-2xl font-medium">{formatCad(subtotal)}</p>
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-[12.5px] text-emerald-deep">
                    <span className="size-1.5 rounded-full bg-emerald" />
                    Free local delivery across Windsor–Essex
                  </p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      router.push("/checkout");
                    }}
                    className="btn btn-primary mt-4 w-full"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="mt-3 text-center text-[12px] text-ink/45">
                    No payment today — pay when we confirm your batch.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
