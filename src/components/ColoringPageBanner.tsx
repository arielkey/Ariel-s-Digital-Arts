"use client";

import KitEmbedForm from "./KitEmbedForm";
import { useLanguage } from "./LanguageProvider";

export default function ColoringPageBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-sage-700">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <h2 className="font-display text-2xl text-mist-50">{t("coloringBanner.heading")}</h2>
          <p className="mt-2 text-sm text-mist-100/80">{t("coloringBanner.description")}</p>
        </div>
        <KitEmbedForm />
      </div>
    </section>
  );
}
