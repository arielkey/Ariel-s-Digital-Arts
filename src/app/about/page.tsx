import type { Metadata } from "next";
import Link from "next/link";
import CommissionForm from "@/components/CommissionForm";

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

      <div
        id="commissions"
        className="mt-20 scroll-mt-24 rounded-2xl border border-gold-200 bg-white p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl text-ink-900">Custom Commissions</h2>
        <p className="mt-3 text-base leading-relaxed text-foreground/80">
          Want something made just for you? I take on a limited number of
          custom pieces — send me the details and I&apos;ll let you know if
          it&apos;s something I can take on, then we&apos;ll work out the rest
          together.
        </p>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-sage-700">
          When you reach out, include:
        </p>
        <ul className="mt-2 space-y-1.5 text-base text-foreground/80">
          <li>• A reference image or some inspiration for what you have in mind</li>
          <li>• The subject (a character, a pet, a scene — whatever it is)</li>
          <li>• Your deadline, if you have one</li>
          <li>• Your budget range</li>
        </ul>

        <p className="mt-5 text-sm text-foreground/60">
          As a rough guide, an 8&times;10 original typically runs $110&ndash;$150
          depending on detail and complexity — final pricing depends on size
          and what you&apos;re looking for, so message me for an exact quote.
        </p>

        <div className="mt-8 border-t border-gold-200 pt-8">
          <CommissionForm />
        </div>
      </div>
    </section>
  );
}
