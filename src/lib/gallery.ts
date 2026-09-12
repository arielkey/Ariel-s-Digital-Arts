import { supabase } from "./supabase";
import type { ArtPiece } from "./types";

interface ArtPieceRow {
  id: string;
  title: string;
  description: string | null;
  image: string;
  price: number | null;
  currency: string;
  status: "available" | "sold" | "inquire";
  longest_side_inches: number | null;
}

/**
 * Fetches original art listings from Supabase. Returns null if Supabase
 * isn't configured or the request fails, so callers can fall back to
 * placeholder data.
 */
export async function getArtPieces(): Promise<ArtPiece[] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("art_pieces")
    .select("id, title, description, image, price, currency, status, longest_side_inches")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Supabase error fetching art_pieces:", error?.message);
    return null;
  }

  return (data as ArtPieceRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    image: row.image,
    price: row.price ?? undefined,
    currency: row.currency,
    status: row.status,
    href: `/gallery#${row.id}`,
    longestSideInches: row.longest_side_inches ?? undefined,
  }));
}
