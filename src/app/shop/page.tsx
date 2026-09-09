import type { Metadata } from "next";
import ShopPageContent from "@/components/ShopPageContent";
import { getPrintfulProducts, isPrintfulConfigured } from "@/lib/printful";
import { shopProducts as placeholderProducts } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "Shop | Ariel's Digital Arts",
};

export default async function ShopPage() {
  const liveProducts = await getPrintfulProducts();
  const products = liveProducts ?? placeholderProducts;
  const isLive = liveProducts !== null;

  return <ShopPageContent products={products} isLive={isLive} configured={isPrintfulConfigured()} />;
}
