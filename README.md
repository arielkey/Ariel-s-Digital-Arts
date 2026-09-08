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
    shop/               Shop (Printful items) — stub, built out next
    gallery/            Gallery (original art) — stub, built out next
    about/               About — stub, built out next
    contact/             Contact — stub, built out next
    api/
      checkout/tip/      Stripe Checkout session for the tip jar
      newsletter/        ConvertKit signup proxy
  components/            Header, Footer, Hero, ProductCard, ArtCard, etc.
  lib/
    types.ts             Shared Product / ArtPiece types
    placeholder-data.ts  Sample data for homepage until Printful/Supabase are live
    stripe.ts            Server-side Stripe client
```

## Roadmap (built one section at a time)

1. ✅ Project scaffold + homepage (hero, brand intro, featured items, tip jar, newsletter banner)
2. Shop page — live Printful catalog, category filters, Stripe checkout
3. Gallery page — Supabase-backed original art listings, buy/inquire flow
4. About page — brand story
5. Contact page — form + email delivery
6. Printful → Stripe order fulfillment webhook
7. Polish, SEO, analytics, deploy to Vercel

## Deploying

Push to a GitHub repo and import it in [Vercel](https://vercel.com/new). Add
all variables from `.env.example` to the Vercel project's Environment
Variables before the first production deploy.
