import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import SectionHeader from "@/components/SectionHeader";
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

      <HomeIntro />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader titleKey="home.featuredArt" linkHref="/gallery" linkKey="home.viewGallery" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featuredArt.map((art) => (
            <ArtCard key={art.id} art={art} />
          ))}
        </div>
      </section>

      <ColoringPageBanner />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader titleKey="home.fromShop" linkHref="/shop" linkKey="home.shopAll" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
