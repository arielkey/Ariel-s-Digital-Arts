import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getPrintfulVariant, isPrintfulConfigured } from "@/lib/printful";
import { supabase } from "@/lib/supabase";
import { createClient } from "@/lib/auth/server";
import { shopProducts as placeholderProducts, featuredArt as placeholderArt } from "@/lib/placeholder-data";
import type { Profile } from "@/lib/types";

/**
 * For a signed-in shopper, returns a Stripe Customer id carrying their
 * saved shipping address (if any) so Checkout pre-fills it. Returns null
 * for guests, or if Supabase/Stripe aren't fully wired up.
 */
async function getOrCreateStripeCustomer(): Promise<string | null> {
  if (!stripe) return null;

  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user) return null;

  const { data: profile } = await authClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email ?? undefined,
      name: profile?.full_name ?? undefined,
    });
    customerId = customer.id;
    await authClient.from("profiles").upsert({ id: user.id, email: user.email, stripe_customer_id: customerId });
  }

  if (profile?.shipping_address1 && profile.shipping_city && profile.shipping_zip) {
    await stripe.customers.update(customerId, {
      name: profile.full_name ?? undefined,
      shipping: {
        name: profile.full_name ?? user.email ?? "",
        address: {
          line1: profile.shipping_address1,
          line2: profile.shipping_address2 ?? undefined,
          city: profile.shipping_city,
          state: profile.shipping_state ?? undefined,
          postal_code: profile.shipping_zip,
          country: profile.shipping_country ?? "US",
        },
      },
    });
  }

  return customerId;
}

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
  const customerId = await getOrCreateStripeCustomer();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    ...(customerId
      ? { customer: customerId, customer_update: { shipping: "auto" } }
      : {}),
    metadata: {
      printfulItems: JSON.stringify(printfulItems),
      artPieceIds: JSON.stringify(artPieceIds),
    },
    success_url: `${origin}/shop?order=success`,
    cancel_url: `${origin}/shop?order=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
