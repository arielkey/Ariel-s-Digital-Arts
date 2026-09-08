"use client";

import { useState } from "react";

export default function BuyButton({
  productId,
  variant = "sage",
  label = "Buy",
}: {
  productId: string;
  variant?: "sage" | "gold";
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const colors =
    variant === "gold"
      ? "bg-gold-400 text-ink-900 hover:bg-gold-300"
      : "bg-sage-600 text-cream-50 hover:bg-sage-700";

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer disabled:opacity-60 ${colors}`}
      >
        {loading ? "…" : label}
      </button>
      {error ? (
        <p className="absolute right-0 top-full z-10 mt-1 w-48 text-right text-xs text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
