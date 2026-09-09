import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Ariel's Digital Arts",
  description:
    "The story behind Ariel's Digital Arts — original fantasy art inspired by dragons, made with a stickler's eye for detail.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl text-ink-900 sm:text-4xl">About Ariel</h1>
      <p className="mt-3 text-lg text-sage-700">
        Digital paintings born from a lifelong love of fantasy.
      </p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/80">
        <p>
          I&apos;ve been making art for as long as I can remember — but
          Ariel&apos;s Digital Arts, the business, is only about a year old.
          I started it to explore what I could really do with my talent, and
          to build something of my own that could help fund my kids&apos;
          education.
        </p>

        <p>
          Dragons and fantasy have had a hold on me for a long time. There&apos;s
          something about a dragon that gets me every time — that mix of
          beauty and raw strength.
        </p>
      </div>

      <blockquote className="my-10 rounded-2xl border border-gold-200 bg-gold-50 px-6 py-5 font-display text-lg text-sage-800">
        Beauty and strength that isn&apos;t always used — but is always there.
      </blockquote>

      <div className="space-y-6 text-base leading-relaxed text-foreground/80">
        <p>
          That&apos;s the feeling I&apos;m chasing in every piece: quiet
          power, waiting. Every piece I make gets the same amount of
          attention, whether it&apos;s an original painting or something
          you&apos;ll find printed on a shirt or a puzzle. I&apos;m honestly a
          bit of a stickler about how things turn out — the details matter to
          me, and a piece doesn&apos;t go out into the world until it feels
          right.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/gallery"
          className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300"
        >
          See the Gallery
        </Link>
        <Link
          href="/shop"
          className="rounded-full bg-sage-600 px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-sage-700"
        >
          Shop Prints &amp; Apparel
        </Link>
      </div>
    </section>
  );
}
