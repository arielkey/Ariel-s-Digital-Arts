import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getPrintfulVariant, isPrintfulConfigured } from "@/lib/printful";
import { supabase } from "@/lib/supabase";
import { shopProducts as placeholderProducts, featuredArt as placeholderArt } from "@/lib/placeholder-data";

interface CartRequestItem {
  id: string;
  type: "product" | "art";
  quantity: number;
}

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't configured yet. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  const { items } = (await req.json()) as { items?: CartRequestItem[] };
  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const printfulItems: { variantId: number; quantity: number }[] = [];
  const artPieceIds: string[] = [];

  for (const item of items) {
    const quantity = Math.max(1, Math.min(item.quantity, 20));

    if (item.type === "product") {
      let title: string;
      let unitAmount: number;
      let image: string | undefined;
      let variantId: number | null = null;

      if (isPrintfulConfigured()) {
        const numericId = Number(item.id);
        const live = Number.isFinite(numericId) ? await getPrintfulVariant(numericId) : null;
        if (!live) {
          return NextResponse.json({ error: `An item in your cart is no longer available.` }, { status: 404 });
        }
        title = live.name;
        unitAmount = Math.round(Number(live.retail_price) * 100);
        image = live.product?.image;
        variantId = numericId;
      } else {
        const product = placeholderProducts.find((p) => p.id === item.id);
        if (!product) {
          return NextResponse.json({ error: `An item in your cart is no longer available.` }, { status: 404 });
        }
        title = product.title;
        unitAmount = Math.round(product.price * 100);
        image = product.image || undefined;
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: title, images: image ? [image] : undefined },
          unit_amount: unitAmount,
        },
        quantity,
      });
      if (variantId !== null) printfulItems.push({ variantId, quantity });
    } else {
      let title: string;
      let unitAmount: number;
      let image: string | undefined;

      if (supabase) {
        const { data: piece } = await supabase
          .from("art_pieces")
          .select("title, price, image, status")
          .eq("id", item.id)
          .single();
        if (!piece || piece.status !== "available" || !piece.price) {
          return NextResponse.json({ error: `An item in your cart is no longer available.` }, { status: 404 });
        }
        title = piece.title;
        unitAmount = Math.round(piece.price * 100);
        image = piece.image || undefined;
      } else {
        const piece = placeholderArt.find((p) => p.id === item.id);
        if (!piece || piece.status !== "available" || !piece.price) {
          return NextResponse.json({ error: `An item in your cart is no longer available.` }, { status: 404 });
        }
        title = piece.title;
        unitAmount = Math.round(piece.price * 100);
        image = piece.image || undefined;
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: `${title} (original art)`, images: image ? [image] : undefined },
          unit_amount: unitAmount,
        },
        quantity: 1,
      });
      artPieceIds.push(item.id);
    }
  }

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    metadata: {
      printfulItems: JSON.stringify(printfulItems),
      artPieceIds: JSON.stringify(artPieceIds),
    },
    success_url: `${origin}/shop?order=success`,
    cancel_url: `${origin}/shop?order=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
