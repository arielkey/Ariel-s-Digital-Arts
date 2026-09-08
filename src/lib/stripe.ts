import Stripe from "stripe";

/**
 * Server-only Stripe client. STRIPE_SECRET_KEY must be set in .env.local
 * (see .env.example). Routes that use this should check `stripe` is non-null
 * so the app still builds/runs before keys are configured.
 */
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;
