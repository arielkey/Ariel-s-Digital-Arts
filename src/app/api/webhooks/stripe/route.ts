import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createPrintfulOrder } from "@/lib/printful";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Stripe webhook — on a completed shop checkout, places the matching order
 * with Printful so it enters fulfillment automatically; on a completed
 * original-art checkout, marks that piece "sold" in Supabase. Configure this
 * URL (https://yourdomain.com/api/webhooks/stripe) in the Stripe dashboard,
 * subscribed to checkout.session.completed, and set STRIPE_WEBHOOK_SECRET.
 *
 * Fulfillment is attempted once; a failure is logged rather than retried,
 * since retrying a paid session risks placing a duplicate Printful order.
 */
export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature ?? "", process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const variantId = Number(session.metadata?.printfulVariantId);

    if (Number.isFinite(variantId)) {
      const shipping = session.collected_information?.shipping_details;
      const address = shipping?.address;

      if (shipping?.name && address?.line1 && address.city && address.country && address.postal_code) {
        try {
          await createPrintfulOrder(variantId, 1, {
            name: shipping.name,
            address1: address.line1,
            address2: address.line2 ?? undefined,
            city: address.city,
            state_code: address.state ?? undefined,
            country_code: address.country,
            zip: address.postal_code,
            email: session.customer_details?.email ?? undefined,
          });
        } catch (err) {
          console.error("Failed to create Printful order for session", session.id, err);
        }
      } else {
        console.error("Checkout session missing shipping details", session.id);
      }
    }

    const artPieceId = session.metadata?.artPieceId;
    if (artPieceId && supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from("art_pieces")
        .update({ status: "sold" })
        .eq("id", artPieceId);
      if (error) {
        console.error("Failed to mark art piece sold", artPieceId, error.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
