"use client";

import { useLanguage } from "./LanguageProvider";

export default function HomeIntro() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
      <h2 className="font-display text-2xl text-sage-800 sm:text-3xl">{t("home.introHeading")}</h2>
      <p className="mt-4 text-base leading-relaxed text-foreground/70">{t("home.introBody")}</p>
    </section>
  );
}
