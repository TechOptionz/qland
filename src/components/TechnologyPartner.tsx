import Image from "next/image";
import Reveal from "@/components/Reveal";
import { technologyPartner } from "@/lib/site";

/*
 * KEYOB supplied this band as standalone HTML in its own navy/cyan palette.
 * It is re-skinned onto the QLand tokens rather than pasted in, so the page
 * keeps one visual language: KEYOB navy maps to `ink`, KEYOB cyan to `amber`,
 * and the reference's white-on-tint cards to the same white-on-cream cards the
 * Our Difference band uses. The wordmark is the only KEYOB brand asset that
 * survives, and it is never recoloured.
 */

const { logo, partnerLabel } = technologyPartner;

/** "In partnership with" plus the wordmark, in whichever colourway the band needs. */
function PartnerLockup({ on }: { on: "dark" | "light" }) {
  const mark = on === "dark" ? logo.white : logo.navy;

  return (
    <span className="flex items-center gap-3">
      <span
        className={`eyebrow ${on === "dark" ? "text-cream/60" : "text-muted"}`}
      >
        {partnerLabel}
      </span>
      <Image
        src={mark.src}
        alt={logo.alt}
        width={mark.width}
        height={mark.height}
        className="h-[22px] w-auto"
      />
    </span>
  );
}

/** The partner band. Used once, on the home page above the featured project. */
export default function TechnologyPartner() {
  const {
    id,
    lockup,
    eyebrow,
    heading,
    lede,
    capabilities,
    benefits,
    cta,
    disclaimer,
  } = technologyPartner;

  /*
   * Top padding only: the featured-project banner that follows supplies its
   * own `mt-[clamp(56px,8vw,110px)]`, so a full `band-y` here would stack two
   * band gaps into one 220px void.
   */
  return (
    <section id={id} className="gutter-x pt-[clamp(56px,8vw,110px)]">
      <div className="shell flex flex-col gap-11">
        {/* Lockup and eyebrow */}
        <Reveal className="flex flex-col items-start gap-3">
          <span className="flex items-center gap-2.5 rounded-full border border-line bg-white px-[18px] py-2 text-xs font-extrabold tracking-[0.14em] uppercase">
            <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-amber" />
            {lockup}
          </span>
          <span className="eyebrow text-amber-dark">{eyebrow}</span>
        </Reveal>

        {/*
          Heading and lede sit side by side from `mdx` up. Stacked in one narrow
          measure they left the right third of the band empty while every grid
          below ran its full width.
        */}
        <div className="-mt-6 grid grid-cols-1 items-start gap-6 mdx:grid-cols-2 mdx:gap-[clamp(28px,5vw,72px)]">
          <Reveal>
            <h2 className="section-title">{heading}</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="m-0 text-[14.5px] leading-[1.75] text-body">{lede}</p>
          </Reveal>
        </div>

        {/* Capabilities */}
        <Reveal className="flex flex-wrap gap-2.5">
          {capabilities.map((capability, i) => (
            <span
              key={capability}
              className="stagger-item rounded-full border border-line bg-white px-4 py-2 text-[13px] font-bold"
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              {capability}
            </span>
          ))}
        </Reveal>

        {/* What it changes */}
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 90}>
              <div className="card-lift flex h-full flex-col gap-3 rounded-[18px] border border-line bg-white px-[26px] py-[30px] hover:-translate-y-1 hover:border-amber hover:shadow-[0_14px_34px_rgba(240,166,60,0.14)]">
                <h3 className="m-0 flex items-center gap-3 text-[17px] font-bold">
                  <span
                    aria-hidden
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber text-[12px] font-extrabold text-ink"
                  >
                    ✓
                  </span>
                  {benefit.title}
                </h3>
                <p className="m-0 text-[13.5px] leading-[1.65] text-body">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Close */}
        <Reveal variant="scale">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-[22px] bg-ink p-[clamp(32px,5vw,56px)] text-cream">
            <div className="flex max-w-[46ch] flex-col gap-2">
              <span className="text-[clamp(20px,2.4vw,28px)] font-extrabold tracking-[-0.02em]">
                {cta.heading}
              </span>
              <p className="m-0 text-sm leading-relaxed font-medium text-cream/80">
                {cta.body}
              </p>
            </div>

            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-wrap gap-3.5">
                <a
                  href={cta.primary.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pill-cta bg-amber text-ink hover:bg-cream"
                >
                  {cta.primary.label}
                </a>
                <a
                  href={cta.secondary.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pill-cta border-[1.5px] border-cream/40 font-semibold text-cream hover:border-amber-light hover:text-amber-light"
                >
                  {cta.secondary.label}
                </a>
              </div>
              <PartnerLockup on="dark" />
            </div>
          </div>
        </Reveal>

        {/*
          One legal sentence, so it runs the full band and only wraps once the
          viewport is too narrow to hold it.
        */}
        <Reveal variant="fade">
          <p className="m-0 -mt-4 text-[13px] leading-[1.6] text-muted">
            {disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
