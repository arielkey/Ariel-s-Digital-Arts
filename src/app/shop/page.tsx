import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Ariel's Digital Arts",
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl text-ink-900">Shop</h1>
      <p className="mt-3 max-w-xl text-foreground/70">
        Apparel, puzzles, and prints — built out in the next phase with live
        Printful products, category filters, and Stripe checkout.
      </p>
    </section>
  );
}
