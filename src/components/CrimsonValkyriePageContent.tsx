"use client";

import Image from "next/image";
import Link from "next/link";
import CommissionExamples from "./CommissionExamples";
import CrimsonValkyrieForm from "./CrimsonValkyrieForm";
import { useLanguage } from "./LanguageProvider";

const MENU = ["basic", "custom", "partial", "full", "original"] as const;
const STEPS = ["step1", "step2", "step3"] as const;

export default function CrimsonValkyriePageContent() {
  const { t } = useLanguage();
  const [noteBefore, noteAfter] = t("crimsonValkyrie.cardNote").split("{link}");

  return (
    <div className="cv-theme bg-[#0B0809] text-foreground">
      <section className="relative isolate overflow-hidden bg-black">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,rgba(141,38,57,0.28),transparent_55%),radial-gradient(ellipse_at_90%_85%,rgba(39,62,54,0.55),transparent_55%)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-bronze-500">
              {t("crimsonValkyrie.sister")}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-bronze-300 text-balance sm:text-5xl">
              <span className="sr-only">The Crimson Valkyrie — </span>
              {t("crimsonValkyrie.tagline")}
            </h1>
            <p className="mt-5 max-w-md font-display text-xl leading-snug text-foreground">
              {t("crimsonValkyrie.descriptor")}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
              {t("crimsonValkyrie.explain")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#request"
                className="rounded-full bg-crimson-500 px-6 py-3 text-sm font-medium text-mist-50 transition-colors hover:bg-crimson-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300"
              >
                {t("crimsonValkyrie.ctaRequest")}
              </a>
              <a
                href="#work"
                className="rounded-full border border-bronze-500/70 px-6 py-3 text-sm font-medium text-bronze-300 transition-colors hover:border-bronze-300 hover:text-bronze-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-300"
              >
                {t("crimsonValkyrie.ctaWork")}
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/crimson-valkyrie/logo.jpg"
              alt="The Crimson Valkyrie"
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 560px, 90vw"
              priority
              className="mx-auto h-auto w-full max-w-[420px] [mask-image:radial-gradient(closest-side,#000_78%,transparent_100%)] lg:max-w-[540px]"
            />
          </div>
        </div>
      </section>

      <section id="prices" className="scroll-mt-24 border-t border-bronze-500/30 bg-[#0F0A0B]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl text-bronze-300">{t("crimsonValkyrie.pricesHeading")}</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">{t("crimsonValkyrie.priceNote")}</p>
          </div>
          <ul className="divide-y divide-bronze-500/20 border-y border-bronze-500/20">
            {MENU.map((key) => (
              <li key={key} className="py-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-foreground">{t(`crimsonValkyrie.${key}Name`)}</span>
                  <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-bronze-500/50" />
                  <span className="whitespace-nowrap font-display text-lg text-bronze-300">
                    {t(`crimsonValkyrie.${key}Price`)}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-foreground/60">{t(`crimsonValkyrie.${key}Desc`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl text-bronze-300">{t("crimsonValkyrie.howHeading")}</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((key, i) => (
              <li key={key} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-crimson-400 font-display text-sm text-bronze-300"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg text-foreground">{t(`crimsonValkyrie.${key}Title`)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{t(`crimsonValkyrie.${key}Body`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-t border-bronze-500/30 bg-[#0B0809]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <CommissionExamples />
        </div>
      </section>

      <section id="request" className="scroll-mt-24 border-t border-bronze-500/30 bg-[#0F0A0B]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl text-bronze-300">{t("crimsonValkyrie.requestHeading")}</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">{t("crimsonValkyrie.requestIntro")}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/70">
              {noteBefore}
              <Link href="/terms-of-sale" className="text-link underline hover:text-bronze-300">
                {t("crimsonValkyrie.cardNoteLink")}
              </Link>
              {noteAfter}
            </p>
          </div>
          <CrimsonValkyrieForm />
        </div>
      </section>
    </div>
  );
}
