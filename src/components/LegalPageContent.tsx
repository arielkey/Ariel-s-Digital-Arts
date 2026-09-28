"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { legalPages, legalTitle, type LegalDocByLocale } from "@/lib/legal";

export default function LegalPageContent({
  doc,
  currentSlug,
}: {
  doc: LegalDocByLocale;
  currentSlug: string;
}) {
  const { locale } = useLanguage();
  const content = doc[locale] ?? doc.en;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-foreground">{content.title}</h1>
      <p className="mt-2 text-sm text-foreground/50">
        {content.effectiveDateLabel} {content.effectiveDate}
      </p>
      <p className="mt-6 text-foreground/80">{content.intro}</p>

      <div className="mt-10 flex flex-col gap-8">
        {content.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-lg text-sage-800">{section.heading}</h2>
            <div className="mt-2 flex flex-col gap-3 text-sm leading-relaxed text-foreground/80">
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i}>{block.text}</p>
                ) : (
                  <ul key={i} className="list-disc ps-5">
                    {block.items.map((item, j) => (
                      <li key={j} className="mt-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-14 flex flex-wrap gap-x-4 gap-y-2 border-t border-sage-200 pt-6 text-sm">
        {legalPages
          .filter((page) => page.slug !== currentSlug)
          .map((page) => (
            <Link key={page.slug} href={page.href} className="text-link underline hover:text-sage-800">
              {legalTitle(page.doc, locale)}
            </Link>
          ))}
      </nav>
    </section>
  );
}
