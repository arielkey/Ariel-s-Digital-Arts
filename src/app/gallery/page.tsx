import type { Metadata } from "next";
import ArtCard from "@/components/ArtCard";
import { getArtPieces } from "@/lib/gallery";
import { featuredArt as placeholderArt } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Gallery | Ariel's Digital Arts",
};

export default async function GalleryPage() {
  const liveArt = await getArtPieces();
  const art = liveArt ?? placeholderArt;
  const isLive = liveArt !== null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-3xl text-ink-900">Gallery</h1>
        <p className="mt-3 max-w-xl text-foreground/70">
          Original, one-of-a-kind fantasy art pieces — each painted by hand,
          not printed on demand.
        </p>
        {!isLive ? (
          <p className="mt-3 inline-block rounded-full bg-gold-100 px-4 py-1.5 text-xs font-medium text-gold-800">
            Gallery isn&apos;t connected yet — showing sample pieces.
          </p>
        ) : null}
      </div>

      {art.length === 0 ? (
        <p className="text-sm text-foreground/60">No pieces posted yet — check back soon.</p>
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
