"use client";

import Link from "next/link";
import CommissionForm from "./CommissionForm";
import { useLanguage } from "./LanguageProvider";

export default function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl">{t("about.title")}</h1>
      <p className="mt-3 text-lg text-link">{t("about.tagline")}</p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/80">
        <p>{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
      </div>

      <blockquote className="my-10 rounded-2xl border border-gold-200 bg-gold-50 px-6 py-5 font-display text-lg text-sage-800">
        {t("about.quote")}
      </blockquote>

      <div className="space-y-6 text-base leading-relaxed text-foreground/80">
        <p>{t("about.p3")}</p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/gallery"
          className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300"
        >
          {t("about.seeGallery")}
        </Link>
        <Link
          href="/shop"
          className="rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-mist-50 transition-colors hover:bg-sage-700"
        >
          {t("about.shopPrintsApparel")}
        </Link>
      </div>

      <div
        id="commissions"
        className="mt-20 scroll-mt-24 rounded-2xl border border-gold-200 bg-cream-50 p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl text-foreground">{t("about.commissionsTitle")}</h2>
        <p className="mt-3 text-base leading-relaxed text-foreground/80">{t("about.commissionsBody")}</p>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-link">
          {t("about.includeLabel")}
        </p>
        <ul className="mt-2 space-y-1.5 text-base text-foreground/80">
          <li>• {t("about.include1")}</li>
          <li>• {t("about.include2")}</li>
          <li>• {t("about.include3")}</li>
          <li>• {t("about.include4")}</li>
        </ul>

        <p className="mt-5 text-sm text-foreground/60">{t("about.pricingNote")}</p>

        <div className="mt-8 border-t border-gold-200 pt-8">
          <CommissionForm />
        </div>
      </div>
    </section>
  );
}
