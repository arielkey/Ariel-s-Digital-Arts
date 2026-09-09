import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import KitEmbedForm from "./KitEmbedForm";
import { InstagramIcon, TikTokIcon } from "./SocialIcons";

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
