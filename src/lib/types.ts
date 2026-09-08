export type ProductCategory = "apparel" | "puzzles" | "prints";

/** A print-on-demand item fulfilled through Printful. */
export interface ShopProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  category: ProductCategory;
  printfulVariantId?: string;
  href: string;
}

/** A one-of-a-kind or limited original art piece, managed in Supabase. */
export interface ArtPiece {
  id: string;
  title: string;
  description?: string;
  image: string;
  price?: number;
  currency?: string;
  status: "available" | "sold" | "inquire";
  href: string;
}
