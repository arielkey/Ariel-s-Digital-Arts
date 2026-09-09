import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { getPrintfulProducts, isPrintfulConfigured } from "@/lib/printful";
import { shopProducts as placeholderProducts } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Shop | Ariel's Digital Arts",
};

export default async function ShopPage() {
  const liveProducts = await getPrintfulProducts();
  const products = liveProducts ?? placeholderProducts;
  const isLive = liveProducts !== null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-3xl text-foreground">Shop</h1>
        <p className="mt-3 max-w-xl text-foreground/70">
          Apparel, puzzles, and prints — printed and shipped by Printful.
        </p>
        {!isLive ? (
          <p className="mt-3 inline-block rounded-full bg-gold-100 px-4 py-1.5 text-xs font-medium text-gold-800">
            {isPrintfulConfigured()
              ? "Couldn't reach Printful right now — showing sample items."
              : "Printful isn't connected yet — showing sample items."}
          </p>
        ) : null}
      </div>

      <ShopGrid products={products} />
    </section>
  );
}
