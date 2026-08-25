import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import RegisterInterestForm from "@/components/RegisterInterestForm";
import SiteHeader from "@/components/SiteHeader";
import { ProjectFooter } from "@/components/SiteFooter";
import { boutiqueHighlights, locationPoints, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Boutique Chevron Island",
  description:
    "A boutique residential project on Chevron Island, moments from Surfers Paradise. Register your interest for plans, pricing, and availability.",
};

/**
 * Fill these in as the project renders become available — drop the file into
 * `public/assets/` and set the matching path (e.g. `/assets/bci-hero.jpg`).
 * Empty values render a labelled placeholder instead.
 */
const BOUTIQUE_IMAGES: Record<string, string | undefined> = {
  hero: undefined,
  exterior: undefined,
  interior: undefined,
  kitchen: undefined,
  living: undefined,
  island: undefined,
  map: undefined,
};

export default function BoutiqueChevronIslandPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="boutique" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="absolute inset-0">
          {/* No placeholder here — an empty hero reads better as the plain dark
              gradient than as a labelled slot showing through it. */}
          {BOUTIQUE_IMAGES.hero && (
            <ImageSlot
              src={BOUTIQUE_IMAGES.hero}
              label="Hero render / photo"
              alt="Boutique Chevron Island"
              priority
            />
          )}
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(22,19,14,0.9)_25%,rgba(22,19,14,0.3)_80%)]" />
        </div>
        <div className="gutter-x shell relative flex flex-col items-start gap-[22px] py-[clamp(60px,9vw,120px)]">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-light/50 px-[18px] py-2 text-xs font-bold tracking-[0.18em] text-amber-light uppercase">
            Featured Project · Gold Coast
          </span>
          <h1 className="m-0 text-[clamp(30px,4.2vw,52px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-pretty">
            Boutique Chevron Island
          </h1>
          <p className="m-0 max-w-[46ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed font-medium text-cream/85">
            A boutique residential project on Chevron Island, moments from Surfers Paradise.
            Register your interest for plans, pricing, and availability.
          </p>
          <div className="mt-1 flex flex-wrap gap-3.5">
            <a href="#register" className="pill-cta bg-amber text-ink hover:bg-cream">
              Register your interest
            </a>
            <a
              href={site.phoneHref}
              className="pill-cta border-[1.5px] border-cream/40 font-semibold text-cream hover:border-amber-light hover:text-amber-light"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="gutter-x shell band-y-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {boutiqueHighlights.map((h) => (
            <div
              key={h.label}
              className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-6"
            >
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-amber-dark uppercase">
                {h.label}
              </span>
              <span className="text-[17px] font-bold">{h.title}</span>
              <p className="m-0 text-[13.5px] leading-[1.65] text-body">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="gutter-x shell flex flex-col gap-6 pb-[clamp(44px,6vw,80px)]">
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-amber-dark">Gallery</span>
          <h2 className="section-title">The project</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-[clamp(260px,40vw,420px)] min-w-0 overflow-hidden rounded-2xl sm:col-span-2">
            <ImageSlot src={BOUTIQUE_IMAGES.exterior} label="Render — exterior" />
          </div>
          <div className="h-[clamp(200px,30vw,420px)] min-w-0 overflow-hidden rounded-2xl">
            <ImageSlot src={BOUTIQUE_IMAGES.interior} label="Render — interior" />
          </div>
          <div className="h-[clamp(200px,30vw,260px)] min-w-0 overflow-hidden rounded-2xl">
            <ImageSlot src={BOUTIQUE_IMAGES.kitchen} label="Render — kitchen" />
          </div>
          <div className="h-[clamp(200px,30vw,260px)] min-w-0 overflow-hidden rounded-2xl">
            <ImageSlot src={BOUTIQUE_IMAGES.living} label="Render — living" />
          </div>
          <div className="h-[clamp(200px,30vw,260px)] min-w-0 overflow-hidden rounded-2xl">
            <ImageSlot src={BOUTIQUE_IMAGES.island} label="Photo — Chevron Island" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="gutter-x band-y-sm bg-ink text-cream">
        <div className="shell grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div className="flex flex-col items-start gap-[18px]">
            <span className="eyebrow text-amber-light">Location</span>
            <h2 className="section-title">Chevron Island, Gold Coast</h2>
            <p className="m-0 text-[14.5px] leading-[1.75] text-cream/80">
              Set between Surfers Paradise and the HOTA precinct, Chevron Island offers
              riverside living with cafes, dining, and the beach within walking distance.
            </p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[13.5px] font-semibold">
              {locationPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[clamp(240px,34vw,380px)] min-w-0 overflow-hidden rounded-2xl">
            <ImageSlot
              src={BOUTIQUE_IMAGES.map}
              label="Location map / aerial photo"
              tone="dark"
            />
          </div>
        </div>
      </section>

      {/* Register interest */}
      <section id="register" className="gutter-x band-y-sm">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-[22px] rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(28px,5vw,52px)]">
          <div className="flex flex-col gap-2">
            <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">
              Register your interest
            </h2>
            <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">
              Be first to receive plans, pricing, and release updates for Boutique Chevron
              Island.
            </p>
          </div>
          <RegisterInterestForm />
        </div>
      </section>

      <ProjectFooter />
    </div>
  );
}
