import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import ArtCard from "@/components/ArtCard";
import BookCard from "@/components/BookCard";
import { books } from "@/lib/books";
import { getArtPieces } from "@/lib/gallery";
import { getPrintfulProducts, HOME_FEATURED_PRODUCT_IDS } from "@/lib/printful";
import type { ShopProduct } from "@/lib/types";
import { featuredArt as placeholderArt, featuredProducts as placeholderProducts } from "@/lib/placeholder-data";

// Refetch featured art/products periodically instead of only at build
// time, so adding/editing/selling a piece in Supabase shows up without a
// redeploy.
export const revalidate = 300;

export default async function Home() {
  const [liveArt, liveProducts] = await Promise.all([getArtPieces(), getPrintfulProducts()]);
  const featuredArt = (liveArt ?? placeholderArt).slice(0, 2);
  const allProducts = liveProducts ?? placeholderProducts;
  const picked = HOME_FEATURED_PRODUCT_IDS.map((id) =>
    allProducts.find((p) => p.printfulProductId === id)
  ).filter((p): p is ShopProduct => p !== undefined);
  // If any pick is missing (renamed/removed in Printful, or sample data), fall back to the first items.
  const featuredProducts = picked.length === HOME_FEATURED_PRODUCT_IDS.length ? picked : allProducts.slice(0, 3);

  return (
    <>
      <Hero />

      <HomeIntro />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader titleKey="home.fromShop" linkHref="/shop" linkKey="home.shopAll" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader titleKey="home.featuredArt" linkHref="/gallery" linkKey="home.viewGallery" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featuredArt.map((art) => (
            <ArtCard key={art.id} art={art} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeader titleKey="home.coloringBooks" linkHref="/books" linkKey="home.viewBooks" />
        <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}
