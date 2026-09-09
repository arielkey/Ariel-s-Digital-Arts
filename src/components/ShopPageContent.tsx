"use client";

import ShopGrid from "./ShopGrid";
import { useLanguage } from "./LanguageProvider";
import type { ShopProduct } from "@/lib/types";

export default function ShopPageContent({
  products,
  isLive,
  configured,
}: {
  products: ShopProduct[];
  isLive: boolean;
  configured: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-3xl text-foreground">{t("shop.title")}</h1>
        <p className="mt-3 max-w-xl text-foreground/70">{t("shop.description")}</p>
        {!isLive ? (
          <p className="mt-3 inline-block rounded-full bg-gold-100 px-4 py-1.5 text-xs font-medium text-gold-800">
            {configured ? t("shop.notLiveConfigured") : t("shop.notLiveUnconfigured")}
          </p>
        ) : null}
      </div>

      <ShopGrid products={products} />
    </section>
  );
}
