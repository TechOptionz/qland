import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand, SectionHeading } from "@/components/sections";
import { houseAndLand } from "@/lib/pages";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "House and Land",
  description:
    "Fixed-price house and land packages in exclusive owner-occupier estates across Park Ridge, Logan Reserve, Jimboomba, Greenbank, and Ripley.",
  alternates: { canonical: "/house-and-land" },
  openGraph: {
    url: "/house-and-land",
    title: "House and Land · QLand Property",
    description:
      "We source and negotiate the block, you choose the floorplan. Fixed pricing and luxury inclusions as standard.",
  },
};

export default function HouseAndLandPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <PageHero
        eyebrow="House & Land"
        title="Your block and your floorplan, at one fixed price"
        lede="Exclusive owner-occupier estates across Brisbane's southern growth corridor, matched to a design you help shape."
        image={photos.facadeGarden}
        ctas={[
          { label: "See if you qualify", href: "#qualify" },
          { label: "Schedule your free consult", href: site.calendly, external: true, variant: "ghost" },
        ]}
      />

      {/* Intro */}
      <section className="gutter-x band-y">
        <div className="shell grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1.05fr_minmax(0,1fr)]">
          <Reveal variant="left" className="flex flex-col items-start gap-5">
            <span className="eyebrow text-amber-dark">The approach</span>
            <h2 className="section-title">Land you can’t find on the open market</h2>
            {houseAndLand.intro.map((paragraph) => (
              <p key={paragraph} className="m-0 text-[14.5px] leading-[1.75] text-body">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal
            variant="right"
            delay={120}
            className="relative h-[clamp(260px,36vw,420px)] min-w-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={photos.facadeDuskLight}
              alt="Completed Qland home on a new estate block at dusk"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Facades */}
      <section className="gutter-x shell band-y-sm">
        <SectionHeading eyebrow="Designs" title="Great selection of homes to choose from" />
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {houseAndLand.facades.map((facade, i) => (
            <Reveal key={facade.name} variant="scale" delay={i * 120}>
              <article className="card-lift flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white hover:-translate-y-1 hover:border-amber hover:shadow-[0_14px_34px_rgba(240,166,60,0.14)]">
                <div className="relative h-[clamp(200px,26vw,300px)] w-full">
                  <Image
                    src={facade.img}
                    alt={facade.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-[26px]">
                  <h3 className="m-0 text-lg font-extrabold">{facade.name}</h3>
                  <ul className="m-0 flex flex-wrap gap-2 p-0">
                    {facade.specs.map((spec) => (
                      <li
                        key={spec}
                        className="list-none rounded-full bg-tint px-3.5 py-1.5 text-[12.5px] font-bold text-amber-dark"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={site.calendly}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="pill-cta mt-auto self-start bg-amber text-ink hover:bg-ink hover:text-cream"
                  >
                    Book Consult
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="gutter-x band-y bg-ink text-cream">
        <div className="shell">
          <SectionHeading
            eyebrow="Locations"
            title="Current locations to choose from"
            lede="Owner-occupier estates we hold land in across Logan and Ipswich. Tell us your preferred area and we will source and negotiate the block."
            tone="dark"
          />
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 wide:grid-cols-3">
            {houseAndLand.locations.map((location, i) => (
              <Reveal key={location.name} delay={(i % 3) * 90}>
                <div className="card-lift flex h-full flex-col gap-2 rounded-2xl border border-cream/15 bg-cream/5 p-6 hover:-translate-y-1 hover:border-amber-light/60">
                  <span className="text-[11px] font-extrabold tracking-[0.18em] text-amber-light uppercase">
                    {location.region}
                  </span>
                  <span className="text-[19px] font-extrabold tracking-[-0.01em]">
                    {location.name}
                  </span>
                  <p className="m-0 text-[13.5px] leading-[1.65] text-cream/70">
                    {location.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="gutter-x shell band-y">
        <SectionHeading
          eyebrow="The process"
          title="Our efficient 5-step House and Land purchase process"
        />
        <ol className="mt-11 m-0 flex list-none flex-col gap-4 p-0">
          {houseAndLand.steps.map((step, i) => (
            <Reveal key={step.num} as="li" variant="up" delay={i * 60}>
              <div className="card-lift grid grid-cols-1 gap-4 rounded-[18px] border border-line bg-white p-[clamp(22px,3vw,32px)] hover:border-amber hover:shadow-[0_14px_34px_rgba(240,166,60,0.12)] mdx:grid-cols-[auto_minmax(0,22ch)_minmax(0,1fr)] mdx:items-start mdx:gap-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-lg font-extrabold text-ink">
                  {step.num}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="m-0 text-[17px] font-bold">{step.title}</h3>
                  <span className="text-[12.5px] font-bold tracking-[0.06em] text-amber-dark uppercase">
                    {step.subtitle}
                  </span>
                </div>
                <p className="m-0 text-[13.5px] leading-[1.7] text-body">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Qualify */}
      <section id="qualify" className="gutter-x band-y-sm">
        <Reveal
          variant="scale"
          className="mx-auto flex w-full max-w-[860px] flex-col gap-[22px] rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(28px,5vw,52px)]"
        >
          <div className="flex flex-col gap-2">
            <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">
              See if you qualify
            </h2>
            <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">
              Add your details below and our team will assess your borrowing capacity, then
              come back with locations and designs that fit your budget.
            </p>
          </div>
          <EnquiryForm
            source="house-and-land"
            submitLabel="Check my options"
            successMessage="Thank you. We will be in touch shortly with the options that fit your budget."
            fields={[
              { name: "firstName", label: "First name", autoComplete: "given-name" },
              { name: "lastName", label: "Last name", autoComplete: "family-name" },
              { name: "email", label: "Email", type: "email", autoComplete: "email" },
              { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
              {
                name: "address",
                label: "Preferred location",
                wide: true,
                autoComplete: "off",
              },
              { name: "message", label: "Anything else we should know?", type: "textarea", wide: true },
            ]}
          />
        </Reveal>
      </section>

      <CtaBand
        eyebrow="Next step?"
        title="Schedule your Free Consult"
        body="Talk it through with our team. No obligation, and no cost."
      />

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
