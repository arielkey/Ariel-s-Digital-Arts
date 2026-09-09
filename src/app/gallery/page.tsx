import type { Metadata } from "next";
import GalleryPageContent from "@/components/GalleryPageContent";
import { getArtPieces } from "@/lib/gallery";
import { featuredArt as placeholderArt } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Gallery | Ariel's Digital Arts",
};

export default async function GalleryPage() {
  const liveArt = await getArtPieces();
  const art = liveArt ?? placeholderArt;
  const isLive = liveArt !== null;

  return <GalleryPageContent art={art} isLive={isLive} />;
}
