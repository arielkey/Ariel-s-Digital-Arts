import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { featuredArt } from "@/lib/placeholder-data";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't configured yet. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  const { pieceId } = (await req.json()) as { pieceId?: string };
  if (!pieceId) {
    return NextResponse.json({ error: "Missing item." }, { status: 400 });
  }

  let title: string;
  let unitAmount: number;
  let image: string | undefined;

  if (supabase) {
    const { data: piece } = await supabase
      .from("art_pieces")
      .select("title, price, image, status")
      .eq("id", pieceId)
      .single();

    if (!piece || piece.status !== "available" || !piece.price) {
      return NextResponse.json({ error: "That piece is no longer available." }, { status: 404 });
    }
    title = piece.title;
    unitAmount = Math.round(piece.price * 100);
    image = piece.image || undefined;
  } else {
    const piece = featuredArt.find((p) => p.id === pieceId);
    if (!piece || piece.status !== "available" || !piece.price) {
      return NextResponse.json({ error: "That piece is no longer available." }, { status: 404 });
    }
    title = piece.title;
    unitAmount = Math.round(piece.price * 100);
    image = piece.image || undefined;
  }

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${title} (original art)`, images: image ? [image] : undefined },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    metadata: { artPieceId: pieceId },
    success_url: `${origin}/gallery?order=success`,
    cancel_url: `${origin}/gallery?order=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
