import Image from "next/image";
import PlaceholderArt from "./PlaceholderArt";
import AddToCartButton from "./AddToCartButton";
import type { ArtPiece } from "@/lib/types";

export default function ArtCard({ art }: { art: ArtPiece }) {
  const canBuy = art.status === "available" && !!art.price;
  const canInquire = art.status === "inquire";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/60 bg-cream-50 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {art.image ? (
          <Image
            src={art.image}
            alt={art.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderArt label={art.title} className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base text-foreground">{art.title}</h3>
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
          {canBuy ? (
            <AddToCartButton
              item={{
                id: art.id,
                type: "art",
                title: art.title,
                price: art.price!,
                image: art.image,
              }}
              variant="gold"
            />
          ) : canInquire ? (
            <a
              href={`mailto:executiveorganizeak@gmail.com?subject=${encodeURIComponent(
                `Inquiry about "${art.title}"`
              )}&body=${encodeURIComponent(
                `Hi Ariel, I'm interested in "${art.title}" from your gallery. `
              )}`}
              className="rounded-full bg-gold-400 px-4 py-1.5 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300"
            >
              Inquire
            </a>
          ) : (
            <span className="rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-400">
              Sold
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
