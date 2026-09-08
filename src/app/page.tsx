import Link from "next/link";
import Hero from "@/components/Hero";
import ColoringPageBanner from "@/components/ColoringPageBanner";
import ProductCard from "@/components/ProductCard";
import ArtCard from "@/components/ArtCard";
import { getArtPieces } from "@/lib/gallery";
import { getPrintfulProducts } from "@/lib/printful";
import { featuredArt as placeholderArt, featuredProducts as placeholderProducts } from "@/lib/placeholder-data";

export default async function Home() {
  const [liveArt, liveProducts] = await Promise.all([getArtPieces(), getPrintfulProducts()]);
  const featuredArt = (liveArt ?? placeholderArt).slice(0, 2);
  const featuredProducts = (liveProducts ?? placeholderProducts).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-2xl text-sage-800 sm:text-3xl">
          Hand-drawn fantasy, made to keep
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/70">
          Ariel&apos;s Digital Arts is a one-woman studio painting original fantasy
          worlds — dragons, quiet keepers, and the magic in between. Every
          piece starts as a digital painting, and many find their way onto
          prints, apparel, and puzzles so you can bring a little bit of that
          world home.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink-900">Featured Original Art</h2>
          <Link href="/gallery" className="text-sm font-medium text-sage-700 hover:text-sage-800">
            View gallery →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featuredArt.map((art) => (
            <ArtCard key={art.id} art={art} />
          ))}
        </div>
      </section>

      <ColoringPageBanner />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink-900">From the Shop</h2>
          <Link href="/shop" className="text-sm font-medium text-sage-700 hover:text-sage-800">
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
