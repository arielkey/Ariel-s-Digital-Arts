import Image from "next/image";

export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Ariel's Digital Arts logo"
      width={370}
      height={370}
      className={`${className} object-contain`}
      priority
    />
  );
}
