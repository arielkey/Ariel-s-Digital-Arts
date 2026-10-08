"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { commissionExamples, type CommissionExample } from "@/lib/commission-examples";

export default function CommissionExamples() {
  const { t, dir } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const count = commissionExamples.length;
  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback(
    (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    // Arrow keys follow reading direction: in RTL, the left arrow goes forward.
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === forward) step(1);
      else if (e.key === backward) step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, dir, close, step]);

  const open = commissionExamples[openIndex ?? 0];

  function renderGroup(group: CommissionExample["group"]) {
    return (
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {commissionExamples.map((example, index) =>
          example.group !== group ? null : (
            <li key={example.id}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpenIndex(index);
                }}
                aria-label={t("commissionExamples.enlarge", { title: t(`commissionExamples.${example.id}Title`) })}
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-gold-200/60 bg-cream-100 text-start transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
              >
                <span className="relative block aspect-[5/7] w-full overflow-hidden">
                  <Image
                    src={example.image}
                    alt={t(`commissionExamples.${example.id}Title`)}
                    fill
                    sizes="(min-width: 640px) 170px, 45vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block px-2.5 py-2 text-xs font-medium text-foreground/80">
                  {t(`commissionExamples.${example.id}Title`)}
                </span>
              </button>
            </li>
          )
        )}
      </ul>
    );
  }

  const lightbox =
    openIndex === null ? null : (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(`commissionExamples.${open.id}Title`)}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-900/85 p-4"
        onClick={close}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={t("commissionExamples.close")}
          className="absolute end-4 top-4 cursor-pointer rounded-full bg-cream-50/90 p-2 text-ink-900 transition-colors hover:bg-cream-50"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
          aria-label={t("commissionExamples.previous")}
          className="absolute start-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-cream-50/90 p-2 text-ink-900 transition-colors hover:bg-cream-50 sm:start-4"
        >
          <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
          aria-label={t("commissionExamples.next")}
          className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-cream-50/90 p-2 text-ink-900 transition-colors hover:bg-cream-50 sm:end-4"
        >
          <ChevronRight className="h-6 w-6 rtl:rotate-180" />
        </button>

        <figure className="flex max-h-full max-w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <Image
            key={open.id}
            src={open.image}
            alt={t(`commissionExamples.${open.id}Title`)}
            width={open.width}
            height={open.height}
            sizes="90vw"
            priority
            className="h-auto max-h-[78vh] w-auto max-w-[calc(100vw-7rem)] rounded-lg object-contain shadow-2xl"
          />
          <figcaption className="max-w-md text-center text-sm text-mist-50">
            <span className="block font-display text-base">{t(`commissionExamples.${open.id}Title`)}</span>
            <span className="mt-1 block text-mist-100/80">{t(`commissionExamples.${open.id}Desc`)}</span>
          </figcaption>
        </figure>
      </div>
    );

  return (
    <div>
      <h3 className="font-display text-xl text-foreground">{t("commissionExamples.heading")}</h3>
      <p className="mt-2 text-sm text-foreground/70">{t("commissionExamples.intro")}</p>

      <h4 className="mt-6 text-sm font-medium uppercase tracking-wide text-link">{t("commissionExamples.tokensHeading")}</h4>
      <p className="mt-1 text-sm text-foreground/60">{t("commissionExamples.tokensDesc")}</p>
      {renderGroup("tokens")}

      <h4 className="mt-8 text-sm font-medium uppercase tracking-wide text-link">{t("commissionExamples.altersHeading")}</h4>
      <p className="mt-1 text-sm text-foreground/60">{t("commissionExamples.altersDesc")}</p>
      {renderGroup("alters")}

      <p className="mt-6 text-xs text-foreground/50">{t("commissionExamples.ipNote")}</p>

      {lightbox ? createPortal(lightbox, document.body) : null}
    </div>
  );
}
