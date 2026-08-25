import Image from "next/image";

/**
 * Stand-in for the `<image-slot>` elements in the design canvas.
 *
 * The project renders for Boutique Chevron Island were not part of the design
 * export, so each slot shows a branded placeholder until an image is supplied.
 * Drop a file into `public/assets/` and pass its path as `src` to fill a slot —
 * see `BOUTIQUE_IMAGES` in `src/app/boutique-chevron-island/page.tsx`.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  priority = false,
  tone = "light",
  className = "",
}: {
  src?: string;
  alt?: string;
  label: string;
  priority?: boolean;
  /** `dark` keeps the empty state legible on the ink-coloured sections. */
  tone?: "light" | "dark";
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  const surface =
    tone === "dark"
      ? "border-cream/20 bg-cream/5 text-cream/60"
      : "border-line bg-tint/60 text-muted";

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed p-6 text-center ${surface} ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={tone === "dark" ? "text-amber-light" : "text-amber-dark"}
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="8.5" cy="9.5" r="1.8" />
        <path d="M21 16l-5.5-5.5L7 19" />
      </svg>
      <span className="text-[12.5px] leading-snug font-semibold">{label}</span>
    </div>
  );
}
