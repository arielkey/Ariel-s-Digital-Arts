"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function CrimsonValkyrieBanner() {
  const { t } = useLanguage();

  return (
    <section className="cv-theme relative isolate overflow-hidden border-y border-bronze-500/30 bg-black text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_50%,rgba(141,38,57,0.25),transparent_55%),radial-gradient(ellipse_at_95%_50%,rgba(39,62,54,0.5),transparent_55%)]"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 text-center sm:px-6 md:flex-row md:gap-10 md:text-start">
        <Image
          src="/crimson-valkyrie/logo.jpg"
          alt="The Crimson Valkyrie"
          width={1254}
          height={1254}
          sizes="176px"
          className="h-36 w-36 shrink-0 [mask-image:radial-gradient(closest-side,#000_78%,transparent_100%)] sm:h-44 sm:w-44"
        />
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze-500">The Crimson Valkyrie</p>
          <h2 className="mt-2 font-display text-2xl text-bronze-300 text-balance sm:text-3xl">
            {t("crimsonValkyrie.bannerHeading")}
          </h2>
          <p className="mt-2 text-sm text-foreground/70">{t("crimsonValkyrie.tagline")}</p>
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <Link
            href="/crimson-valkyrie#request"
            className="rounded-full bg-crimson-500 px-6 py-3 text-sm font-medium text-mist-50 transition-colors hover:bg-crimson-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300"
          >
            {t("crimsonValkyrie.ctaRequest")}
          </Link>
          <Link href="/crimson-valkyrie#work" className="text-sm text-link underline hover:text-bronze-300">
            {t("crimsonValkyrie.bannerLink")}
          </Link>
        </div>
      </div>
    </section>
  );
}
