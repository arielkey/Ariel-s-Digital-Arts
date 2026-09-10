import type { ProductCategory, ShopProduct } from "./types";

const PRINTFUL_API_BASE = "https://api.printful.com";

function printfulHeaders(): HeadersInit | null {
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey) return null;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
  };
  if (process.env.PRINTFUL_STORE_ID) {
    headers["X-PF-Store-Id"] = process.env.PRINTFUL_STORE_ID;
  }
  return headers;
}

export function isPrintfulConfigured() {
  return printfulHeaders() !== null;
}

/**
 * Best-effort category guess from the product name, since Printful sync
 * products don't carry our Apparel/Puzzles/Prints/Mats taxonomy directly.
 * Override by renaming products in Printful, or extend this list.
 */
function guessCategory(name: string): ProductCategory {
  const n = name.toLowerCase();
  if (/(puzzle|jigsaw)/.test(n)) return "puzzles";
  if (/(shirt|tee|hoodie|sweatshirt|tank|apparel|crewneck)/.test(n)) return "apparel";
  if (/(desk mat|playmat|play mat|mousepad|mouse pad|\bmats?\b)/.test(n)) return "mats";
  if (/(print|poster|canvas|art)/.test(n)) return "prints";
  return "other";
}

interface PrintfulSyncProductSummary {
  id: number;
  name: string;
  thumbnail_url: string;
}

interface PrintfulSyncVariant {
  id: number;
  name: string;
  retail_price: string;
  currency: string;
  product: { image: string; name: string };
}

interface PrintfulSyncProductDetail {
  sync_product: { id: number; name: string; thumbnail_url: string };
  sync_variants: PrintfulSyncVariant[];
}

async function printfulFetch<T>(path: string): Promise<T | null> {
  const headers = printfulHeaders();
  if (!headers) return null;

  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    console.error(`Printful API error ${res.status} on ${path}`);
    return null;
  }
  const json = await res.json();
  return json.result as T;
}

/**
 * Manual overrides for products where Printful's own store thumbnail
 * doesn't represent the design well — e.g. a mug thumbnail cropped to an
 * angle where the print barely shows, or a product whose art is on the
 * back but the thumbnail is a blank front view. Keyed by sync_product id.
 */
const IMAGE_OVERRIDES: Record<number, string> = {
  468507476: "https://files.cdn.printful.com/files/f54/f542fa0b566984d7994d7e9b980bdc83_preview.png", // Mombie Mug
  468506651:
    "https://files.cdn.printful.com/printfile-preview/1035291759/547a3c45f423e45473e1bbf578cd65fd_preview.png", // Cardboard Crack premium heavyweight tee (back design)
  468506669:
    "https://files.cdn.printful.com/printfile-preview/1035291759/547a3c45f423e45473e1bbf578cd65fd_preview.png", // Cardboard Crack Unisex Hoodie (back design)
};

/**
 * Fetches the live Printful store catalog, using each product's first
 * variant as the buyable item. Returns null if Printful isn't configured
 * (missing PRINTFUL_API_KEY) or the request fails, so callers can fall
 * back to placeholder data.
 */
export async function getPrintfulProducts(): Promise<ShopProduct[] | null> {
  const list = await printfulFetch<PrintfulSyncProductSummary[]>("/store/products");
  if (!list) return null;

  const details = await Promise.all(
    list.map((p) => printfulFetch<PrintfulSyncProductDetail>(`/store/products/${p.id}`))
  );

  const products: ShopProduct[] = [];
  for (const detail of details) {
    const variant = detail?.sync_variants?.[0];
    if (!detail || !variant) continue;

    products.push({
      id: String(variant.id),
      title: detail.sync_product.name,
      price: Number(variant.retail_price),
      currency: variant.currency,
      image: IMAGE_OVERRIDES[detail.sync_product.id] ?? detail.sync_product.thumbnail_url,
      category: guessCategory(detail.sync_product.name),
      printfulVariantId: variant.id,
      href: `/shop#${variant.id}`,
    });
  }
  return products;
}

/**
 * Looks up a single sync variant by id — used at checkout time to read the
 * authoritative price server-side rather than trusting a client-supplied
 * amount.
 */
export async function getPrintfulVariant(syncVariantId: number) {
  const headers = printfulHeaders();
  if (!headers) return null;

  const res = await fetch(`${PRINTFUL_API_BASE}/store/variants/${syncVariantId}`, {
    headers,
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.result as PrintfulSyncVariant;
}

interface PrintfulOrderRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  email?: string;
}

/** Creates and confirms a Printful order (possibly multiple items) so it enters fulfillment immediately. */
export async function createPrintfulOrder(
  items: { variantId: number; quantity: number }[],
  recipient: PrintfulOrderRecipient
) {
  const headers = printfulHeaders();
  if (!headers) throw new Error("Printful is not configured.");

  const res = await fetch(`${PRINTFUL_API_BASE}/orders`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient,
      items: items.map((i) => ({ sync_variant_id: i.variantId, quantity: i.quantity })),
      confirm: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Printful order failed (${res.status}): ${text}`);
  }
  return res.json();
}
