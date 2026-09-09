"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "ada-cart";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage — unavailable during SSR, so this
    // can only happen after mount on the client.
    const params = new URLSearchParams(window.location.search);
    const justCompletedOrder = params.get("order") === "success";

    let initial: CartItem[] = [];
    if (justCompletedOrder) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) initial = JSON.parse(stored);
      } catch {
        // ignore malformed/unavailable storage
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client hydration from localStorage, not derivable at render time
    setItems(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore unavailable storage (private browsing, etc.)
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.type === item.type);
      if (existing) {
        if (item.type === "art") return prev; // one-of-a-kind, no duplicates
        return prev.map((i) =>
          i.id === item.id && i.type === item.type ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
    clear,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
