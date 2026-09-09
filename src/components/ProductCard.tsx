"use client";

import Image from "next/image";
import PlaceholderArt from "./PlaceholderArt";
import AddToCartButton from "./AddToCartButton";
import { useLanguage } from "./LanguageProvider";
import type { ShopProduct } from "@/lib/types";

export default function ProductCard({ product }: { product: ShopProduct }) {
  const { t } = useLanguage();

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-sage-200/60 bg-cream-50 transition-shadow hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderArt label={product.title} className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs uppercase tracking-widest text-link">
          {t(`shopGrid.${product.category}`)}
        </span>
        <h3 className="font-display text-base text-foreground">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-foreground/80">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton
            item={{
              id: product.id,
              type: "product",
              title: product.title,
              price: product.price,
              image: product.image,
            }}
            variant="sage"
          />
        </div>
      </div>
    </div>
  );
}
