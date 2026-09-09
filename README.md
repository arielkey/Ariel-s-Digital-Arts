# Ariel's Digital Arts

Next.js e-commerce/portfolio site for Ariel's Digital Arts — original fantasy
art, prints, apparel, and puzzles.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4)
- **Stripe** — checkout for shop items + tip jar
- **Printful** — POD product catalog + order fulfillment
- **Supabase** — original art gallery listings
- **Kit** (formerly ConvertKit) — email list / free coloring page opt-in
- **Resend** — contact form email delivery

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
    about/               About — brand story
    contact/             Contact — form (reads ?piece=&title= for gallery inquiries)
    api/
      checkout/tip/      Stripe Checkout session for the tip jar
      checkout/cart/     Stripe Checkout session for the whole cart (shop
                         items + original art, multiple items/quantities)
      webhooks/stripe/   On payment: places one combined Printful fulfillment
                         order for all shop items, and marks any purchased
                         art pieces "sold" in Supabase
      contact/           Sends contact form submissions via Resend
  components/            Header, Footer, Hero, ProductCard, ArtCard, ShopGrid,
                         KitEmbedForm, ContactForm, CartContext, CartDrawer,
                         CartButton, AddToCartButton, etc.
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

Category filters (Apparel/Puzzles/Prints/Mats) are guessed from each Printful
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

### Going live with the contact form

The form works today, but shows a friendly "not connected yet" error until
it's wired up:

1. Create a free [Resend](https://resend.com) account, verify or skip
   domain verification (their `onboarding@resend.dev` sender works without
   one, fine for launch), and generate an API key.
2. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (the inbox that should
   receive messages) to `.env.local` (and Vercel's Environment Variables
   once ready).
3. Once you have a custom domain verified in Resend, update the `from`
   address in `src/app/api/contact/route.ts` to something like
   `Ariel's Digital Arts <hello@arielsdigitalarts.com>` — using your own
   domain instead of `onboarding@resend.dev` looks more professional and
   avoids spam folders.

Replying to a contact email goes straight back to the sender — the route
sets `reply_to` to their address automatically.

### Newsletter (Kit)

The footer and homepage coloring-page signup forms both use
[`KitEmbedForm`](src/components/KitEmbedForm.tsx) — Kit's own hosted form,
embedded via their script widget (form id `9895460`, "Website signups").

**Why not a native API-based form?** Kit's free plan blocks third-party
apps from writing subscribers via the API (confirmed: `GET /v4/forms`
works, but `POST /v4/forms/{id}/subscribers` returns 404 on every form on
the account, regardless of which form). Kit's own embed widget still works
on free, since it's a first-party form rather than a third-party
integration — verified end-to-end, a real signup through the embedded form
returned "Success! Now check your email to confirm your subscription."

**If the account upgrades to Kit's paid Creator plan later**, the API-based
approach can be restored for a form that matches the site's own styling
instead of Kit's: `KIT_API_KEY` / `KIT_FORM_ID` are already documented in
`.env.example` for that. The previous implementation (a custom
`NewsletterForm` component posting to `/api/newsletter`, which called
`POST https://api.kit.com/v4/forms/{id}/subscribers` with the
`X-Kit-Api-Key` header) is preserved in git history — see the commit that
introduced `KitEmbedForm`.

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
5. ✅ Contact page — form + email delivery via Resend, connected and
   verified live in production (delivers to `CONTACT_TO_EMAIL`, sender is
   currently Resend's shared `onboarding@resend.dev` until a custom domain
   is verified — see "Going live with the contact form" below)
6. ✅ Custom commissions — a "Custom Commissions" section on the About page
   (`/about#commissions`, linked from the main nav), with a "Request a
   Commission" button that pre-fills the Contact form's reason and reveals
   commission-specific fields (subject, deadline, budget, reference/inspiration).
   Inquiry-only — no deposit/payment flow; Ariel handles that manually after
   the initial message. Includes a soft pricing note ($110–$150 for an 8×10)
   as a rough guide — update or remove it in `src/app/about/page.tsx` if you'd
   rather not publish numbers yet.
7. ✅ Shopping cart — "Buy" on Shop and Gallery items now adds to a cart
   (persisted in `localStorage`, via `CartContext`) instead of checking out
   immediately. A cart icon in the header (with an item-count badge) opens a
   drawer to review items, adjust quantities, remove items, and check out —
   one Stripe Checkout session covers the whole cart, and the webhook places
   one combined Printful order plus marks any purchased art pieces sold.
   Original art pieces are capped at quantity 1 (one-of-a-kind, no duplicates).
8. ✅ Newsletter — connected and verified live via Kit's own embed widget
   (see "Newsletter (Kit)" below for why, instead of a native API form)
9. Polish, SEO, analytics

## Deploying

**Live at [arielsdigitalarts.com](https://arielsdigitalarts.com)** (custom
domain purchased and connected through Vercel; the original
[ariel-s-digital-arts.vercel.app](https://ariel-s-digital-arts.vercel.app)
URL still works too), deployed via Vercel's GitHub integration (auto-deploys
on every push to `main`). Production has `STRIPE_SECRET_KEY` (live), `STRIPE_WEBHOOK_SECRET`,
`PRINTFUL_API_KEY`, `PRINTFUL_STORE_ID`, `RESEND_API_KEY`, and
`CONTACT_TO_EMAIL` set in Vercel's Environment Variables — **the live Stripe
key is active, so checkout processes real payments**, and the contact form
sends real emails (verified end-to-end in production: a live POST to
`/api/contact` returned `200` and the test message was received). Supabase
and Kit variables aren't set yet, so Gallery and the newsletter forms
still run on placeholder/disabled behavior in production too. A live-mode
Stripe webhook is configured pointing at `/api/webhooks/stripe`, verified
reachable (returns 400 on an unsigned request, confirming the route and
secret are live).

Adding new env vars later: Vercel project → Settings → Environment
Variables → Add, then redeploy (Deployments tab → latest → "..." →
Redeploy) for the change to take effect.
