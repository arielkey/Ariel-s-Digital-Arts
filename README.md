# Ariel's Digital Arts

Next.js e-commerce/portfolio site for Ariel's Digital Arts — original fantasy
art, prints, apparel, and puzzles.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4)
- **Stripe** — checkout for shop items + tip jar
- **Printful** — POD product catalog + order fulfillment
- **Supabase** — original art gallery listings
- **ConvertKit** — email list / free coloring page opt-in

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in keys as each integration is wired up
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Assets to drop in before launch

- ✅ `public/logo.png` — real badge logo in place, used by
  [`src/components/Logo.tsx`](src/components/Logo.tsx). `src/app/favicon.ico`,
  `icon.png`, and `apple-icon.png` were generated from it.
- ✅ `public/hero.jpg` — real hero art (green dragon eye) in place, used by
  [`src/components/Hero.tsx`](src/components/Hero.tsx) as a full-bleed
  background with a left-to-right dark gradient for text contrast.

## Project structure

```
src/
  app/
    page.tsx           Homepage
    shop/               Shop (Printful items) — live catalog + category filters
    gallery/            Gallery (original art) — live Supabase listings + buy/inquire
    about/               About — stub, built out next
    contact/             Contact — stub, built out next
    api/
      checkout/tip/      Stripe Checkout session for the tip jar
      checkout/product/  Stripe Checkout session for a shop item
      checkout/art/      Stripe Checkout session for an original art piece
      webhooks/stripe/   On payment: places the Printful fulfillment order, or
                         marks the matching art piece "sold" in Supabase
      newsletter/        ConvertKit signup proxy
  components/            Header, Footer, Hero, ProductCard, ArtCard, BuyButton, ShopGrid, etc.
  lib/
    types.ts             Shared Product / ArtPiece types
    placeholder-data.ts  Sample data used until Printful/Supabase are live
    printful.ts          Printful API client (catalog + order creation)
    gallery.ts           Supabase art gallery reads
    supabase.ts          Supabase clients (anon read + service-role admin)
    stripe.ts            Server-side Stripe client
supabase/
  schema.sql             Run once in the Supabase SQL Editor to create art_pieces
```

### Going live with the shop

The Shop page and checkout work today with sample data. To connect the real
store:

1. Add `PRINTFUL_API_KEY` (and `PRINTFUL_STORE_ID` if your token spans
   multiple stores) to `.env.local` — the shop page will automatically
   switch from sample items to your live Printful catalog.
2. Add `STRIPE_SECRET_KEY` so the Buy button can create real Checkout
   sessions.
3. In the Stripe dashboard, add a webhook endpoint at
   `https://yourdomain.com/api/webhooks/stripe` subscribed to
   `checkout.session.completed`, and add its signing secret as
   `STRIPE_WEBHOOK_SECRET`. This is what triggers the Printful order
   automatically after a successful payment.

Category filters (Apparel/Puzzles/Prints) are guessed from each Printful
product's name — see `guessCategory()` in `src/lib/printful.ts` if you want
to refine the matching.

**Status:** Printful catalog and Stripe checkout are both connected. The
checkout flow and the fulfillment webhook were verified in test mode (tip
jar created a real Checkout session; the webhook was verified with the
Stripe CLI, returning 200 with no errors). `STRIPE_SECRET_KEY` has since
been switched to the **live** key — real charges are possible from this
point on. Still to do: add a permanent live-mode webhook endpoint in the
Stripe dashboard once deployed (see below) — until then, successful
payments won't automatically trigger Printful fulfillment or mark art
pieces sold, since there's no public URL yet for Stripe to send the event to.

### Going live with the gallery

The Gallery page works today with sample data. To connect real pieces:

1. Create a Supabase project, then run [`supabase/schema.sql`](supabase/schema.sql)
   once in its SQL Editor to create the `art_pieces` table.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
   `.env.local` (Supabase dashboard → Settings → API) — the gallery will
   automatically switch from sample pieces to your live listings.
3. Add `SUPABASE_SERVICE_ROLE_KEY` too — the checkout webhook needs it to
   mark a piece "sold" after it's purchased (this key bypasses Row Level
   Security, so keep it server-side only, never in client code).
4. To add, edit, or remove pieces day-to-day, use Supabase's **Table Editor**
   (Dashboard → Table Editor → `art_pieces`) — no code changes needed.
   Uploading images: Supabase Storage works well for this (Dashboard →
   Storage → create a public bucket, upload the image, copy its public URL
   into the piece's `image` field).
5. Set a piece's `status` to `available` (with a `price`) for a Buy button,
   `inquire` for an "Inquire" link to the Contact page, or `sold` to disable
   both.

### Testing checkout locally with the Stripe CLI

A portable `stripe.exe` is set up at `C:\Users\execu\bin\stripe.exe`
(not a system install, so nothing to uninstall — just delete the file/folder
if you want it gone). To test the fulfillment webhook locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe --api-key sk_test_...
```

This prints a `whsec_...` signing secret — put that in `.env.local` as
`STRIPE_WEBHOOK_SECRET` (only while testing locally). In another terminal:

```bash
stripe trigger checkout.session.completed --api-key sk_test_...
```

This fires a synthetic event so you can watch the webhook route respond
without needing a real completed purchase. Note the CLI's webhook secret is
temporary and local-only — it's unrelated to the permanent one you'll get
from a real webhook endpoint in the Stripe dashboard once deployed.

## Roadmap (built one section at a time)

1. ✅ Project scaffold + homepage (hero, brand intro, featured items, tip jar, newsletter banner)
2. ✅ Shop page — live Printful catalog, category filters, Stripe checkout, auto-fulfillment webhook
3. ✅ Gallery page — Supabase-backed original art listings, buy/inquire flow (Supabase not yet connected — placeholder pieces)
4. ✅ About page — brand story
5. Contact page — form + email delivery
6. Polish, SEO, analytics

## Deploying

**Live at [ariel-s-digital-arts.vercel.app](https://ariel-s-digital-arts.vercel.app)**,
deployed via Vercel's GitHub integration (auto-deploys on every push to
`main`). Production has `STRIPE_SECRET_KEY` (live), `STRIPE_WEBHOOK_SECRET`,
`PRINTFUL_API_KEY`, and `PRINTFUL_STORE_ID` set in Vercel's Environment
Variables — **the live Stripe key is active, so checkout processes real
payments.** Supabase and ConvertKit variables aren't set yet, so Gallery and
the newsletter forms still run on placeholder/disabled behavior in
production too. A live-mode Stripe webhook is configured pointing at
`/api/webhooks/stripe`, verified reachable (returns 400 on an unsigned
request, confirming the route and secret are live).

Adding new env vars later: Vercel project → Settings → Environment
Variables → Add, then redeploy (Deployments tab → latest → "..." →
Redeploy) for the change to take effect.
