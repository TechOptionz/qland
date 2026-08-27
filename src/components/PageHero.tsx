import Image from "next/image";
import Link from "next/link";

export type HeroCta = {
  label: string;
  href: string;
  /** Opens in a new tab and renders as a plain `<a>` — used for Calendly and `tel:`. */
  external?: boolean;
  /** `primary` is the amber pill; `ghost` is the outlined one. */
  variant?: "primary" | "ghost";
};

/**
 * The dark banner every inner page opens with.
 *
 * Matches the home and project heroes: a full-bleed photograph under an
 * ink gradient, with the copy animating in via the CSS `rise-in` cascade rather
 * than a scroll trigger — it is already on screen, and this way it plays before
 * hydration.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
  ctas = [],
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  ctas?: readonly HeroCta[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(22,19,14,0.92)_20%,rgba(22,19,14,0.6)_60%,rgba(22,19,14,0.3)_100%)]"
      />

      <div className="gutter-x shell relative flex flex-col items-start gap-[22px] py-[clamp(52px,8vw,104px)]">
        <span className="rise-in inline-flex items-center gap-2.5 rounded-full border border-amber-light/50 px-[18px] py-2 text-xs font-bold tracking-[0.18em] text-amber-light uppercase">
          {eyebrow}
        </span>
        <h1 className="rise-in m-0 max-w-[20ch] text-[clamp(28px,4.2vw,52px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-pretty [animation-delay:120ms]">
          {title}
        </h1>
        {lede && (
          <p className="rise-in m-0 max-w-[52ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed font-medium text-cream/85 [animation-delay:240ms]">
            {lede}
          </p>
        )}
        {ctas.length > 0 && (
          <div className="rise-in mt-1 flex flex-wrap gap-3.5 [animation-delay:360ms]">
            {ctas.map((cta) => {
              const className =
                cta.variant === "ghost"
                  ? "pill-cta border-[1.5px] border-cream/40 font-semibold text-cream hover:border-amber-light hover:text-amber-light"
                  : "pill-cta bg-amber text-ink hover:bg-cream";

              return cta.external ? (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={cta.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className={className}
                >
                  {cta.label}
                </a>
              ) : (
                <Link key={cta.label} href={cta.href} className={className}>
                  {cta.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
