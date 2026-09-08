/**
 * Placeholder circular badge logo (sage silhouette on cream).
 * Replace with the real logo: drop the file at public/logo.svg (or .png)
 * and swap this component for a plain <Image src="/logo.svg" .../>.
 */
export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Ariel's Digital Arts logo"
    >
      <circle cx="50" cy="50" r="48" fill="var(--color-cream-50)" stroke="var(--color-sage-600)" strokeWidth="3" />
      <path
        d="M50 24c-9 0-16 8-16 18 0 8 4 14 9 18l-3 12 10-6c0 0 0 0 0 0 9 0 16-10 16-24 0-10-7-18-16-18z"
        fill="var(--color-sage-600)"
      />
      <path
        d="M64 32l10-10-1 8 8-2-9 9"
        fill="none"
        stroke="var(--color-sage-600)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
