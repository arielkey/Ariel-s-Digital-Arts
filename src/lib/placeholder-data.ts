import type { ArtPiece, ShopProduct } from "./types";

/**
 * Temporary sample data so the homepage/shop/gallery layouts can be built
 * and previewed before Printful + Supabase are wired up.
 * Replace with live data in later phases.
 */
export const featuredProducts: ShopProduct[] = [
  {
    id: "shirt-dragon-sigil",
    title: "Dragon Sigil Tee",
    price: 28,
    currency: "USD",
    image: "",
    category: "apparel",
    href: "/shop",
  },
  {
    id: "puzzle-enchanted-forest",
    title: "Enchanted Forest Puzzle",
    price: 24,
    currency: "USD",
    image: "",
    category: "puzzles",
    href: "/shop",
  },
  {
    id: "print-moonlit-keep",
    title: "Moonlit Keep Art Print",
    price: 18,
    currency: "USD",
    image: "",
    category: "prints",
    href: "/shop",
  },
];

/** Fuller sample catalog for the Shop page's category filters, until Printful is live. */
export const shopProducts: ShopProduct[] = [
  ...featuredProducts,
  {
    id: "hoodie-emberwing",
    title: "Emberwing Hoodie",
    price: 44,
    currency: "USD",
    image: "",
    category: "apparel",
    href: "/shop",
  },
  {
    id: "print-quillkeeper",
    title: "The Quillkeeper Art Print",
    price: 22,
    currency: "USD",
    image: "",
    category: "prints",
    href: "/shop",
  },
];

export const featuredArt: ArtPiece[] = [
  {
    id: "art-the-quillkeeper",
    title: "The Quillkeeper",
    description: "Original digital painting, fantasy portrait series.",
    image: "",
    price: 120,
    currency: "USD",
    status: "available",
    href: "/gallery",
  },
  {
    id: "art-emberwing",
    title: "Emberwing",
    description: "Original digital painting, dragon study.",
    image: "",
    status: "inquire",
    href: "/gallery",
  },
];
