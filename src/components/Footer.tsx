import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import KitEmbedForm from "./KitEmbedForm";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M16.6 5.82c-.9-.78-1.44-1.9-1.5-3.14h-3.02v13.44a2.6 2.6 0 1 1-1.86-2.5v-3.1a5.6 5.6 0 1 0 4.88 5.56V9.4a6.9 6.9 0 0 0 4.1 1.34V7.72a3.9 3.9 0 0 1-2.6-1.9z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-sage-200/60 bg-sage-900 text-cream-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-3">
          <div className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="font-display text-base tracking-wide">
              Ariel&apos;s Digital Arts
            </span>
          </div>
          <p className="text-sm text-cream-100/70">
            Original fantasy art, prints, and apparel — hand-drawn stories brought to life.
          </p>
          <a
            href="mailto:executiveorganizeak@gmail.com"
            className="flex items-center gap-2 text-sm text-cream-100/70 transition-colors hover:text-gold-300"
          >
            <Mail className="h-4 w-4" />
            executiveorganizeak@gmail.com
          </a>
          <div className="flex gap-4 pt-1">
            <a
              href="https://instagram.com/arielsdigitalarts"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream-100/70 transition-colors hover:text-gold-300"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://tiktok.com/@arielsdigitalarts"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-cream-100/70 transition-colors hover:text-gold-300"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav className="flex gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-display text-xs uppercase tracking-widest text-gold-300">
              Explore
            </span>
            <Link href="/shop" className="text-cream-100/80 hover:text-cream-50">
              Shop
            </Link>
            <Link href="/gallery" className="text-cream-100/80 hover:text-cream-50">
              Gallery
            </Link>
            <Link href="/about" className="text-cream-100/80 hover:text-cream-50">
              About
            </Link>
            <Link href="/contact" className="text-cream-100/80 hover:text-cream-50">
              Contact
            </Link>
          </div>
        </nav>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <span className="font-display text-xs uppercase tracking-widest text-gold-300">
            Join the list
          </span>
          <p className="text-sm text-cream-100/70">
            Occasional updates on new pieces, prints, and drops. No spam.
          </p>
          <KitEmbedForm />
        </div>
      </div>

      <div className="border-t border-cream-100/10 px-4 py-4 text-center text-xs text-cream-100/50 sm:px-6">
        © {new Date().getFullYear()} Ariel&apos;s Digital Arts. All rights reserved.
      </div>
    </footer>
  );
}
