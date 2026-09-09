"use client";

import ArtCard from "./ArtCard";
import { useLanguage } from "./LanguageProvider";
import type { ArtPiece } from "@/lib/types";

export default function GalleryPageContent({ art, isLive }: { art: ArtPiece[]; isLive: boolean }) {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-3xl text-foreground">{t("gallery.title")}</h1>
        <p className="mt-3 max-w-xl text-foreground/70">{t("gallery.description")}</p>
        {!isLive ? (
          <p className="mt-3 inline-block rounded-full bg-gold-100 px-4 py-1.5 text-xs font-medium text-gold-800">
            {t("gallery.notLive")}
          </p>
        ) : null}
      </div>

      {art.length === 0 ? (
        <p className="text-sm text-foreground/60">{t("gallery.empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {art.map((piece) => (
            <ArtCard key={piece.id} art={piece} />
          ))}
        </div>
      )}
    </section>
  );
}
