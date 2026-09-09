export type ProductCategory = "apparel" | "puzzles" | "prints" | "mats" | "other";

/** A print-on-demand item fulfilled through Printful. */
export interface ShopProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  category: ProductCategory;
  /** Printful sync variant id — the authoritative id used to place fulfillment orders. */
  printfulVariantId?: number;
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

/** A line in the shopping cart — either a shop product or a one-off art piece. */
export interface CartItem {
  id: string;
  type: "product" | "art";
  title: string;
  price: number;
  image: string;
  quantity: number;
}
