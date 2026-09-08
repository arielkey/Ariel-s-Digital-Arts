import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  const { amount } = (await req.json()) as { amount?: number };

  if (!amount || amount < 1) {
    return NextResponse.json({ error: "Invalid tip amount." }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Tip jar — Ariel's Digital Arts" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/?tip=success`,
    cancel_url: `${origin}/?tip=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
