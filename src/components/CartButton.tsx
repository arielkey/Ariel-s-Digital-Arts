"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function CartButton() {
  const { count, open } = useCart();

  return (
    <button
      onClick={open}
      aria-label="Open cart"
      className="relative text-sage-800 cursor-pointer"
    >
      <ShoppingCart className="h-6 w-6" />
      {count > 0 ? (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-400 px-1 text-[10px] font-medium text-ink-900">
          {count}
        </span>
      ) : null}
    </button>
  );
}
