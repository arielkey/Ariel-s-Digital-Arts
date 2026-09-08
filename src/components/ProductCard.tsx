import Link from "next/link";
import PlaceholderArt from "./PlaceholderArt";
import type { ShopProduct } from "@/lib/types";

export default function ProductCard({ product }: { product: ShopProduct }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sage-200/60 bg-white transition-shadow hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden">
        <PlaceholderArt label={product.title} className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs uppercase tracking-widest text-sage-600">
          {product.category}
        </span>
        <h3 className="font-display text-base text-ink-900">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-foreground/80">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={product.href}
            className="rounded-full bg-sage-600 px-4 py-1.5 text-sm font-medium text-cream-50 transition-colors hover:bg-sage-700"
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}
