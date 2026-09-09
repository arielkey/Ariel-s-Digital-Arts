"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import type { CartItem } from "@/lib/types";

export default function AddToCartButton({
  item,
  variant = "sage",
}: {
  item: Omit<CartItem, "quantity">;
  variant?: "sage" | "gold";
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const colors =
    variant === "gold"
      ? "bg-gold-400 text-ink-900 hover:bg-gold-300"
      : "bg-sage-600 text-cream-50 hover:bg-sage-700";

  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${colors}`}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
