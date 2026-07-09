"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { FieldErrors, validateCheckout } from "@/lib/orders";
import { EASE } from "@/components/Reveal";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 outline-none transition focus:border-emerald-deep focus:bg-white";

export default function NotifyModal() {
  const { notifyOpen, closeNotify } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (notifyOpen) {
      setErrors({});
      setDone(false);
      setServerError(null);
    }
  }, [notifyOpen]);

  useEffect(() => {
    if (!notifyOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNotify();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [notifyOpen, closeNotify]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const input = {
      type: "notify" as const,
      items: [],
      name,
      phone,
      email: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "Mango Pulp launch list",
      termsAccepted: terms,
      marketingOptIn: marketing,
    };
    const { ok, errors: v } = validateCheckout(input);
    if (!ok) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.ok) setDone(true);
      else if (data.errors) setErrors(data.errors);
      else setServerError("Something went wrong. Please try again.");
    } catch {
      setServerError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {notifyOpen && (
        <motion.div
          className="fixed inset-0 z-[310] flex items-end justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
            onClick={closeNotify}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Get notified when Mango Pulp launches"
            className="relative w-full max-w-md rounded-t-3xl bg-cream p-7 text-ink shadow-2xl md:rounded-3xl"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              onClick={closeNotify}
              aria-label="Close"
              className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-ink/15 text-ink/60 transition hover:rotate-90 hover:border-ink hover:text-ink"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {done ? (
              <div className="py-6 text-center">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-emerald/15 text-2xl"
                >
                  🥭
                </motion.div>
                <h3 className="font-display text-2xl font-medium">You&apos;re on the list!</h3>
                <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-ink/65">
                  We&apos;ll message you the moment Mango Pulp lands in Windsor —
                  before anyone else.
                </p>
                <button onClick={closeNotify} className="btn btn-ink mt-6">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="kicker text-emerald-deep">Launching Soon</p>
                <h3 className="font-display mt-2 text-2xl font-medium italic">
                  Be first to know
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">
                  Mango Pulp · 850g Can · $4.99 CAD — leave your details and
                  we&apos;ll contact you at launch.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-[13px] font-medium text-[#c2410c]">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-[13px] font-medium text-[#c2410c]">{errors.phone}</p>
                    )}
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={(e) => setTerms(e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 accent-emerald-deep"
                    />
                    <span className="text-[12.5px] leading-relaxed text-ink/65">
                      I agree to the{" "}
                      <a href="/terms" target="_blank" className="font-semibold text-emerald-deep underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" target="_blank" className="font-semibold text-emerald-deep underline">
                        Privacy Policy
                      </a>{" "}
                      and to being contacted about this launch. *
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-[13px] font-medium text-[#c2410c]">{errors.termsAccepted}</p>
                  )}
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="mt-0.5 size-5 shrink-0 accent-emerald-deep"
                    />
                    <span className="text-[12.5px] leading-relaxed text-ink/65">
                      Also send me seasonal arrivals and offers. I can unsubscribe
                      anytime. <em>(Optional)</em>
                    </span>
                  </label>
                </div>

                {serverError && (
                  <p className="mt-4 rounded-xl bg-[#c2410c]/10 px-4 py-3 text-[13px] font-medium text-[#c2410c]">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Notify Me"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
