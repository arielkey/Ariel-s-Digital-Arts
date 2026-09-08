import { Feather } from "lucide-react";

/**
 * Stand-in visual used until real product/art photography is uploaded.
 * Swap the parent's `image` field for a real URL and render next/image instead.
 */
export default function PlaceholderArt({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sage-100 via-cream-200 to-gold-100 text-sage-700 ${className}`}
    >
      <Feather className="h-8 w-8 opacity-60" strokeWidth={1.5} />
      {label ? (
        <span className="px-4 text-center text-xs tracking-wide text-sage-700/70">
          {label}
        </span>
      ) : null}
    </div>
  );
}
