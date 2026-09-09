"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-900">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-ink-900/80 via-ink-900/45 to-ink-900/20"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink-900/20" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
        <span className="rounded-full border border-gold-300/40 px-4 py-1 text-xs uppercase tracking-widest text-gold-200">
          {t("hero.badge")}
        </span>
        <h1 className="max-w-2xl font-display text-4xl leading-tight text-mist-50 sm:text-5xl md:text-6xl">
          {t("hero.heading")}
        </h1>
        <p className="max-w-xl text-base text-mist-100/80 sm:text-lg">{t("hero.description")}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/gallery"
            className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300"
          >
            {t("hero.exploreGallery")}
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-mist-100/40 px-6 py-3 text-sm font-medium text-mist-50 transition-colors hover:bg-mist-50/10"
          >
            {t("hero.shopPrints")}
          </Link>
        </div>
      </div>
    </section>
  );
}
