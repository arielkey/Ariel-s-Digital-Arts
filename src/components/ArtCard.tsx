import Link from "next/link";
import PlaceholderArt from "./PlaceholderArt";
import type { ArtPiece } from "@/lib/types";

export default function ArtCard({ art }: { art: ArtPiece }) {
  const showInquire = art.status === "inquire" || art.status === "sold";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/60 bg-white transition-shadow hover:shadow-lg">
      <div className="aspect-[4/5] w-full overflow-hidden">
        <PlaceholderArt label={art.title} className="h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base text-ink-900">{art.title}</h3>
        {art.description ? (
          <p className="text-sm text-foreground/60">{art.description}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-foreground/80">
            {art.status === "sold"
              ? "Sold"
              : art.price
                ? `$${art.price.toFixed(2)}`
                : "Inquire for price"}
          </span>
          <Link
            href={art.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              art.status === "sold"
                ? "pointer-events-none bg-sage-100 text-sage-400"
                : "bg-gold-400 text-ink-900 hover:bg-gold-300"
            }`}
          >
            {showInquire ? "Inquire" : "Buy"}
          </Link>
        </div>
      </div>
    </div>
  );
}
