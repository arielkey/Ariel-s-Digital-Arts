"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./CartContext";
import PlaceholderArt from "./PlaceholderArt";
import { useLanguage } from "./LanguageProvider";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, setQuantity, subtotal } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, type: i.type, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("cart.error"));
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("cart.error"));
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink-900/40" onClick={close} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-cream-50 shadow-xl">
        <div className="flex items-center justify-between border-b border-sage-200 px-5 py-4">
          <h2 className="font-display text-lg text-sage-800">{t("cart.title")}</h2>
          <button
            onClick={close}
            aria-label={t("cart.closeCart")}
            className="text-link/60 hover:text-sage-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-foreground/60">{t("cart.empty")}</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={`${item.type}-${item.id}`} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    ) : (
                      <PlaceholderArt className="h-full w-full" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                    <span className="text-sm text-foreground/60">${item.price.toFixed(2)}</span>
                    {item.type === "product" ? (
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={t("cart.decreaseQuantity")}
                          className="rounded-full border border-sage-200 p-1 text-link disabled:opacity-40 cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label={t("cart.increaseQuantity")}
                          className="rounded-full border border-sage-200 p-1 text-link cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="mt-1 text-xs uppercase tracking-wide text-gold-700">
                        {t("cart.originalPiece")}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={t("cart.remove", { title: item.title })}
                    className="self-start text-foreground/40 hover:text-red-600 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-sage-200 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm font-medium text-foreground">
              <span>{t("cart.subtotal")}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {error ? <p className="mb-2 text-sm text-red-600">{error}</p> : null}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full rounded-full bg-sage-600 px-4 py-2.5 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700 disabled:opacity-60 cursor-pointer"
            >
              {loading ? t("cart.redirecting") : t("cart.checkout")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
