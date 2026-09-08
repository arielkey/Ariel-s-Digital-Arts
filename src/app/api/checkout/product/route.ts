import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPrintfulVariant, isPrintfulConfigured } from "@/lib/printful";
import { shopProducts as placeholderProducts } from "@/lib/placeholder-data";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't configured yet. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  const { productId } = (await req.json()) as { productId?: string };
  if (!productId) {
    return NextResponse.json({ error: "Missing product." }, { status: 400 });
  }

  let title: string;
  let unitAmount: number;
  let currency: string;
  let image: string | undefined;

  if (isPrintfulConfigured()) {
    const variantId = Number(productId);
    const live = Number.isFinite(variantId) ? await getPrintfulVariant(variantId) : null;
    if (!live) {
      return NextResponse.json({ error: "That item is no longer available." }, { status: 404 });
    }
    title = live.sync_variant.name;
    unitAmount = Math.round(Number(live.sync_variant.retail_price) * 100);
    currency = live.sync_variant.currency.toLowerCase();
    image = live.sync_variant.product?.image;
  } else {
    const product = placeholderProducts.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "That item is no longer available." }, { status: 404 });
    }
    title = product.title;
    unitAmount = Math.round(product.price * 100);
    currency = product.currency.toLowerCase();
    image = product.image || undefined;
  }

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: title, images: image ? [image] : undefined },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    metadata: { printfulVariantId: productId },
    success_url: `${origin}/shop?order=success`,
    cancel_url: `${origin}/shop?order=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
