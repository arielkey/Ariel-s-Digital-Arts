"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import type { Book } from "@/lib/books";

export default function BookCard({ book }: { book: Book }) {
  const { t } = useLanguage();
  const title = t(book.titleKey);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/60 bg-cream-50 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[1000/1293] w-full overflow-hidden bg-cream-100">
        <Image
          src={book.cover}
          alt={title}
          fill
          sizes="(min-width: 768px) 360px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base text-foreground">{title}</h3>
        <p className="text-sm text-foreground/60">{t(book.descriptionKey)}</p>
        <p className="text-xs text-foreground/50">{t("books.details")}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-foreground/80">${book.price.toFixed(2)}</span>
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-4 py-1.5 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300"
          >
            {t("books.viewOnAmazon")}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
