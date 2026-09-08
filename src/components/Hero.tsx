import Link from "next/link";

/**
 * Homepage hero. Background is a placeholder dark-fantasy gradient until
 * the real hero artwork is added — drop the file at public/hero.jpg and
 * swap the div's className/style below for a background-image, e.g.
 * style={{ backgroundImage: "url(/hero.jpg)" }}.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-900">
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-900 via-sage-900 to-ink-800"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-gold-500) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--color-sage-500) 0%, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink-900/30" aria-hidden />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
        <span className="rounded-full border border-gold-300/40 px-4 py-1 text-xs uppercase tracking-widest text-gold-200">
          Original Fantasy Art &amp; Goods
        </span>
        <h1 className="max-w-2xl font-display text-4xl leading-tight text-cream-50 sm:text-5xl md:text-6xl">
          Stories drawn from another realm
        </h1>
        <p className="max-w-xl text-base text-cream-100/80 sm:text-lg">
          I&apos;m Ariel — I paint dragons, keepers, and quiet magic, and turn them into
          original art, prints, and everyday things you&apos;ll love to carry with you.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/gallery"
            className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-gold-300"
          >
            Explore the Gallery
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-cream-100/40 px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-cream-50/10"
          >
            Shop Prints &amp; Apparel
          </Link>
        </div>
      </div>
    </section>
  );
}
