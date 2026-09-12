/**
 * Flat-rate shipping. Shop items are fulfilled and shipped by Printful;
 * original art is packed and mailed individually by hand, so its cost
 * scales with canvas size rather than being a single flat fee.
 */

export const SHOP_SHIPPING_CENTS = 699;

const ART_SHIPPING_TIERS: { maxLongestSideInches: number; cents: number }[] = [
  { maxLongestSideInches: 12, cents: 1000 },
  { maxLongestSideInches: 24, cents: 1800 },
  { maxLongestSideInches: 40, cents: 3000 },
  { maxLongestSideInches: Infinity, cents: 5000 },
];

/** Flat shipping cost in cents for one original art piece, based on its longest side. */
export function getArtShippingCents(longestSideInches: number | undefined | null): number {
  const size = longestSideInches ?? ART_SHIPPING_TIERS[ART_SHIPPING_TIERS.length - 1].maxLongestSideInches;
  const tier = ART_SHIPPING_TIERS.find((t) => size <= t.maxLongestSideInches);
  return tier?.cents ?? ART_SHIPPING_TIERS[ART_SHIPPING_TIERS.length - 1].cents;
}
