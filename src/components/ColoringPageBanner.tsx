import KitEmbedForm from "./KitEmbedForm";

export default function ColoringPageBanner() {
  return (
    <section className="bg-sage-700">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <h2 className="font-display text-2xl text-mist-50">
            Get a free coloring page
          </h2>
          <p className="mt-2 text-sm text-mist-100/80">
            Join the list and I&apos;ll send you a free printable coloring page from my
            fantasy art collection, plus first look at new pieces and drops.
          </p>
        </div>
        <KitEmbedForm />
      </div>
    </section>
  );
}
