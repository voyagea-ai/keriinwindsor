"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { getProduct, ProductId } from "@/lib/products";
import { CartLine } from "@/lib/orders";
import CartDrawer from "./CartDrawer";
import NotifyModal from "./NotifyModal";

const STORAGE_KEY = "kiw-cart-v1";

interface CartContextValue {
  lines: CartLine[];
  hydrated: boolean;
  count: number;
  subtotal: number;
  add: (productId: ProductId, quantity?: number, openDrawer?: boolean) => void;
  remove: (productId: ProductId) => void;
  setQty: (productId: ProductId, quantity: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  notifyOpen: boolean;
  openNotify: () => void;
  closeNotify: () => void;
}

const Ctx = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  // Hydrate from localStorage after mount (SSR renders an empty cart).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l) => getProduct(l.productId) && l.quantity >= 1 && l.quantity <= 50
            )
          );
        }
      }
    } catch {
      /* corrupted cart — start fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  // Freeze page + Lenis behind any overlay.
  useEffect(() => {
    const anyOpen = drawerOpen || notifyOpen;
    const lenis = window.__lenis;
    if (anyOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [drawerOpen, notifyOpen]);

  const add = useCallback(
    (productId: ProductId, quantity = 1, open = true) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.productId === productId);
        if (existing) {
          return prev.map((l) =>
            l.productId === productId
              ? { ...l, quantity: Math.min(50, l.quantity + quantity) }
              : l
          );
        }
        return [...prev, { productId, quantity: Math.min(50, quantity) }];
      });
      if (open) setDrawerOpen(true);
    },
    []
  );

  const remove = useCallback((productId: ProductId) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQty = useCallback((productId: ProductId, quantity: number) => {
    setLines((prev) =>
      quantity < 1
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) =>
            l.productId === productId ? { ...l, quantity: Math.min(50, quantity) } : l
          )
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const l of lines) {
      const p = getProduct(l.productId);
      if (!p) continue;
      count += l.quantity;
      subtotal += p.priceCad * l.quantity;
    }
    return { count, subtotal };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      hydrated,
      count,
      subtotal,
      add,
      remove,
      setQty,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      notifyOpen,
      openNotify: () => setNotifyOpen(true),
      closeNotify: () => setNotifyOpen(false),
    }),
    [lines, hydrated, count, subtotal, add, remove, setQty, clear, drawerOpen, notifyOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
      <NotifyModal />
    </Ctx.Provider>
  );
}
