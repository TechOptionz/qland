import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/** Eyebrow + heading + optional lede, revealed as one block. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** `dark` is for the ink-coloured bands. */
  tone?: "light" | "dark";
  align?: "start" | "center";
}) {
  return (
    <Reveal
      className={`flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && (
        <span className={`eyebrow ${tone === "dark" ? "text-amber-light" : "text-amber-dark"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className="section-title max-w-[24ch]">{title}</h2>
      {lede && (
        <p
          className={`m-0 max-w-[62ch] text-[14.5px] leading-[1.75] ${
            tone === "dark" ? "text-cream/80" : "text-body"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/** Numbered card, matching the "01 / 02 / 03 / 04" treatment on the home page. */
export function NumberCard({
  num,
  title,
  subtitle,
  body,
  href,
  delay = 0,
}: {
  num: string;
  title: string;
  subtitle?: string;
  body: string;
  href?: string;
  delay?: number;
}) {
  const inner = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-lg font-extrabold text-amber-dark">
        {num}
      </span>
      <h3 className="m-0 text-[17px] font-bold">{title}</h3>
      {subtitle && (
        <span className="text-[12.5px] font-bold tracking-[0.06em] text-amber-dark uppercase">
          {subtitle}
        </span>
      )}
      <p className="m-0 text-[13.5px] leading-[1.65] text-body">{body}</p>
      {href && (
        <span className="mt-auto pt-2 text-[13.5px] font-bold text-amber-ink">Learn more →</span>
      )}
    </>
  );

  const className =
    "card-lift flex h-full flex-col gap-3 rounded-[18px] border border-line bg-white px-[26px] py-[30px] hover:-translate-y-1 hover:border-amber hover:shadow-[0_14px_34px_rgba(240,166,60,0.14)]";

  return (
    <Reveal delay={delay}>
      {href ? (
        <Link href={href} className={className}>
          {inner}
        </Link>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </Reveal>
  );
}

/** Image grid used by the Our Difference and About galleries. */
export function Gallery({
  images,
  columns = 3,
}: {
  images: readonly { src: string; alt: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
        columns === 3 ? "wide:grid-cols-3" : ""
      }`}
    >
      {images.map((image, i) => (
        <Reveal
          key={image.src}
          variant="scale"
          delay={(i % 3) * 90}
          className="group relative h-[clamp(200px,26vw,300px)] min-w-0 overflow-hidden rounded-2xl bg-tint"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-cover transition-[scale] duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </Reveal>
      ))}
    </div>
  );
}

/**
 * The amber gradient banner that closes most pages. Mirrors the featured-project
 * banner on the home page.
 */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  action = { label: "Book your FREE strategy session", href: site.calendly, external: true },
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  action?: { label: string; href: string; external?: boolean };
}) {
  return (
    <section className="gutter-x pb-[clamp(56px,8vw,110px)]">
      <Reveal variant="scale" className="shell">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(32px,5vw,56px)]">
          <div className="flex max-w-[46ch] flex-col gap-2">
            <span className="eyebrow text-ink/65">{eyebrow}</span>
            <span className="text-[clamp(20px,2.4vw,28px)] font-extrabold tracking-[-0.02em]">
              {title}
            </span>
            {body && (
              <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">{body}</p>
            )}
          </div>
          {action.external ? (
            <a
              href={action.href}
              target="_blank"
              rel="noreferrer noopener"
              className="pill-cta bg-ink text-cream hover:bg-cream hover:text-ink"
            >
              {action.label}
            </a>
          ) : (
            <Link
              href={action.href}
              className="pill-cta bg-ink text-cream hover:bg-cream hover:text-ink"
            >
              {action.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
