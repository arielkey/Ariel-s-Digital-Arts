import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createPrintfulOrder } from "@/lib/printful";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Stripe webhook — on a completed cart checkout, places one combined order
 * with Printful (covering every shop item in the cart) so it enters
 * fulfillment automatically, and marks any purchased original art pieces
 * "sold" in Supabase. Configure this URL
 * (https://yourdomain.com/api/webhooks/stripe) in the Stripe dashboard,
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

    let printfulItems: { variantId: number; quantity: number }[] = [];
    let artPieceIds: string[] = [];
    try {
      printfulItems = JSON.parse(session.metadata?.printfulItems ?? "[]");
      artPieceIds = JSON.parse(session.metadata?.artPieceIds ?? "[]");
    } catch {
      console.error("Malformed cart metadata on session", session.id);
    }

    if (printfulItems.length > 0) {
      const shipping = session.collected_information?.shipping_details;
      const address = shipping?.address;

      if (shipping?.name && address?.line1 && address.city && address.country && address.postal_code) {
        try {
          await createPrintfulOrder(printfulItems, {
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

    if (artPieceIds.length > 0 && supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from("art_pieces")
        .update({ status: "sold" })
        .in("id", artPieceIds);
      if (error) {
        console.error("Failed to mark art pieces sold", artPieceIds, error.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
