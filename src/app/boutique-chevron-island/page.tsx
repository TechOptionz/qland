import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { ProjectFooter } from "@/components/SiteFooter";
import { boutique } from "@/lib/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // Renders as "Boutique Chevron Island · QLand Property" via the root template.
  title: "Boutique Chevron Island",
  description:
    "BOUTIQUE is a luxury collection of 42 resident-only apartments on Chevron Island, Gold Coast. Two and three-bedroom residences from $1,220,000.",
  alternates: { canonical: "/boutique-chevron-island" },
  openGraph: {
    url: "/boutique-chevron-island",
    title: "Boutique Chevron Island · Gold Coast",
    description:
      "42 resident-only residences by Draycon and BDA Architects, moments from HOTA and Surfers Paradise. Register for pricing, floor plans, and private inspections.",
    images: [{ url: boutique.images.aerialTower }],
  },
};

export default function BoutiqueChevronIslandPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <PageHero
        eyebrow={boutique.eyebrow}
        title={boutique.title}
        lede={boutique.lede}
        image={boutique.images.aerialTower}
        imageAlt="Aerial render of the BOUTIQUE tower on Chevron Island with the Surfers Paradise skyline behind"
        ctas={[
          { label: "Register your interest", href: "#register" },
          {
            label: `Call ${site.phone}`,
            href: site.phoneHref,
            external: true,
            variant: "ghost",
          },
        ]}
      />

      {/* Key facts */}
      <section className="gutter-x border-b border-line bg-white py-[clamp(28px,4vw,44px)]">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-8 wide:grid-cols-4">
          {boutique.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 80} className="flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold tracking-[0.18em] text-amber-dark uppercase">
                {fact.label}
              </span>
              <span className="text-[clamp(16px,1.9vw,21px)] font-extrabold tracking-[-0.01em]">
                {fact.value}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Alternating design bands. The renders are portrait, so each band is a
          two-column split rather than a full-bleed image. */}
      {boutique.bands.map((band, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={band.eyebrow}
            className={`gutter-x band-y-sm ${dark ? "bg-ink text-cream" : ""}`}
          >
            <div className="shell grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-2">
              <Reveal
                variant={dark ? "left" : "right"}
                className={`relative aspect-[9/10] min-w-0 overflow-hidden rounded-2xl ${
                  dark ? "" : "mdx:order-2"
                }`}
              >
                <Image
                  src={band.image}
                  alt={band.alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  className="object-cover"
                />
              </Reveal>

              <Reveal
                variant={dark ? "right" : "left"}
                delay={120}
                className={`flex flex-col items-start gap-5 ${dark ? "" : "mdx:order-1"}`}
              >
                <span className={`eyebrow ${dark ? "text-amber-light" : "text-amber-dark"}`}>
                  {band.eyebrow}
                </span>
                <h2 className="section-title max-w-[18ch]">{band.title}</h2>
                {band.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={`m-0 max-w-[52ch] text-[14.5px] leading-[1.75] ${
                      dark ? "text-cream/80" : "text-body"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Work, play & wellness */}
      <section className="gutter-x band-y">
        <div className="shell flex flex-col gap-9">
          <Reveal className="flex flex-col items-start gap-4">
            <span className="eyebrow text-amber-dark">{boutique.wellness.eyebrow}</span>
            <h2 className="section-title max-w-[20ch]">{boutique.wellness.title}</h2>
            <p className="m-0 max-w-[62ch] text-[14.5px] leading-[1.75] text-body">
              {boutique.wellness.body}
            </p>
            <ul className="m-0 flex flex-wrap gap-2.5 p-0">
              {boutique.wellness.amenities.map((amenity, i) => (
                <li
                  key={amenity}
                  style={{ transitionDelay: `${240 + i * 70}ms` }}
                  className="stagger-item list-none rounded-full border border-amber/50 bg-tint px-[18px] py-2.5 text-[13px] font-bold text-amber-ink"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal
              variant="scale"
              className="relative aspect-[9/10] min-w-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={boutique.images.pool}
                alt="Pool deck on the communal leisure level"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              variant="scale"
              delay={110}
              className="relative aspect-[9/10] min-w-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={boutique.images.terrace}
                alt="Residents on the communal terrace overlooking the city"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="gutter-x band-y bg-ink text-cream">
        <div className="shell grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1fr_minmax(0,1fr)]">
          <Reveal variant="left" className="flex flex-col items-start gap-5">
            <span className="eyebrow text-amber-light">{boutique.location.eyebrow}</span>
            <h2 className="section-title max-w-[18ch]">{boutique.location.title}</h2>
            <p className="m-0 max-w-[52ch] text-[14.5px] leading-[1.75] text-cream/80">
              {boutique.location.body}
            </p>
            <dl className="m-0 mt-2 grid w-full grid-cols-3 gap-4 p-0">
              {boutique.location.distances.map((distance, i) => (
                <div
                  key={distance.label}
                  style={{ transitionDelay: `${260 + i * 110}ms` }}
                  className="stagger-item flex flex-col gap-1 border-t border-cream/20 pt-3"
                >
                  <dt className="order-2 text-[11px] font-extrabold tracking-[0.16em] text-cream/60 uppercase">
                    {distance.label}
                  </dt>
                  <dd className="order-1 m-0 text-[clamp(20px,2.6vw,28px)] font-extrabold tracking-[-0.02em] text-amber-light">
                    {distance.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            variant="right"
            delay={120}
            className="relative aspect-[5/4] min-w-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={boutique.images.aerialIsland}
              alt="Aerial view of Chevron Island, the Nerang River, and the Surfers Paradise skyline"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Register interest */}
      <section id="register" className="gutter-x band-y">
        <div className="shell grid grid-cols-1 items-start gap-[clamp(28px,5vw,56px)] mdx:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <Reveal variant="left" className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-amber-dark">Marketed by</span>
              <p className="m-0 text-[14.5px] leading-[1.75] text-body">
                {boutique.enquiry.marketedBy}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="eyebrow text-amber-dark">{boutique.displaySuite.label}</span>
              <address className="m-0 text-[14.5px] leading-[1.8] font-semibold text-body-strong not-italic">
                {boutique.displaySuite.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow text-amber-dark">The creators</span>
              <dl className="m-0 flex flex-col gap-2.5 p-0">
                {boutique.creators.map((creator) => (
                  <div key={creator.role} className="flex flex-col">
                    <dt className="text-[11px] font-extrabold tracking-[0.16em] text-muted uppercase">
                      {creator.role}
                    </dt>
                    <dd className="m-0 text-[14.5px] font-bold">{creator.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal
            variant="right"
            delay={120}
            className="rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(28px,4vw,48px)]"
          >
            <div className="mb-6 flex flex-col gap-2">
              <span className="eyebrow text-ink/65">{boutique.enquiry.eyebrow}</span>
              <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">
                {boutique.enquiry.title}
              </h2>
              <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">
                {boutique.enquiry.body}
              </p>
            </div>

            <EnquiryForm
              source="boutique-chevron-island"
              submitLabel="Enquire now"
              successMessage="Thank you. Our sales team will be in touch with pricing, floor plans, and inspection times."
              fields={[
                { name: "name", label: "Full name", autoComplete: "name" },
                { name: "email", label: "Email", type: "email", autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                {
                  name: "postcode",
                  label: "Suburb / postcode",
                  autoComplete: "postal-code",
                },
                {
                  name: "bedrooms",
                  label: "Bedrooms",
                  type: "select",
                  options: ["2 Bedroom", "3 Bedroom", "Either"],
                },
                {
                  name: "budget",
                  label: "Budget",
                  type: "select",
                  options: ["$1.2M to $1.5M", "$1.5M to $2M", "$2M to $2.5M", "$2.5M to $3.5M+"],
                },
                {
                  name: "buyerType",
                  label: "I am a…",
                  type: "select",
                  options: ["Owner-occupier", "Investor", "Interstate / overseas buyer"],
                  wide: true,
                },
                { name: "message", label: "Message", type: "textarea", wide: true },
              ]}
            />

            <p className="mt-5 mb-0 text-[12.5px] leading-relaxed font-medium text-ink/65">
              {boutique.enquiry.consent}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="gutter-x pb-[clamp(36px,5vw,64px)]">
        <Reveal variant="fade" className="shell">
          <p className="m-0 max-w-[92ch] border-t border-line pt-6 text-[12px] leading-[1.7] text-muted">
            {boutique.disclaimer}
          </p>
        </Reveal>
      </section>

      <ProjectFooter />
      <ChatWidget />
    </div>
  );
}
