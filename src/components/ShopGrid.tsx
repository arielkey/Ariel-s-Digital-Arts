"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { useLanguage } from "./LanguageProvider";
import type { ProductCategory, ShopProduct } from "@/lib/types";

const CATEGORY_ORDER: ProductCategory[] = ["apparel", "puzzles", "prints", "mats", "other"];

export default function ShopGrid({ products }: { products: ShopProduct[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const categories = useMemo(
    () => CATEGORY_ORDER.filter((c) => products.some((p) => p.category === c)),
    [products]
  );

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            active === "all"
              ? "bg-sage-600 text-mist-50"
              : "bg-sage-50 text-link hover:bg-sage-100"
          }`}
        >
          {t("shopGrid.all")}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              active === category
                ? "bg-sage-600 text-mist-50"
                : "bg-sage-50 text-link hover:bg-sage-100"
            }`}
          >
            {t(`shopGrid.${category}`)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-foreground/60">{t("shopGrid.empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
