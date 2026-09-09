export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M16.6 5.82c-.9-.78-1.44-1.9-1.5-3.14h-3.02v13.44a2.6 2.6 0 1 1-1.86-2.5v-3.1a5.6 5.6 0 1 0 4.88 5.56V9.4a6.9 6.9 0 0 0 4.1 1.34V7.72a3.9 3.9 0 0 1-2.6-1.9z" />
    </svg>
  );
}
