import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand, NumberCard, SectionHeading } from "@/components/sections";
import { buyersAgency } from "@/lib/pages";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buyers Agency",
  description:
    "Exclusive listings, expert Brisbane market insight, and skilled negotiation. QLand's buyers agents act for you — never the seller.",
  alternates: { canonical: "/buyers-agency" },
  openGraph: {
    url: "/buyers-agency",
    title: "Buyers Agency — QLand Property",
    description:
      "Why use a buyer's agent: exclusive properties, a tailored search, expert market insight, and negotiation that works for you.",
  },
};

export default function BuyersAgencyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <PageHero
        eyebrow="Buyers Agency"
        title={buyersAgency.title}
        lede={buyersAgency.lede}
        image={photos.soldSign}
        ctas={[
          { label: "Book a discovery call", href: site.calendly, external: true },
          { label: "Talk to us", href: "/contact", variant: "ghost" },
        ]}
      />

      {/* Eight benefits */}
      <section className="gutter-x shell band-y">
        <SectionHeading
          eyebrow="Why a buyer's agent"
          title="Eight reasons buyers bring us in"
        />
        <div className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-2 wide:grid-cols-4">
          {buyersAgency.benefits.map((benefit, i) => (
            <NumberCard
              key={benefit.num}
              num={benefit.num}
              title={benefit.title}
              body={benefit.body}
              delay={(i % 4) * 90}
            />
          ))}
        </div>
      </section>

      {/* Investors */}
      <section className="gutter-x band-y bg-ink text-cream">
        <div className="shell flex flex-col gap-11">
          <div className="grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1.05fr_minmax(0,1fr)]">
            <Reveal variant="left" className="flex flex-col items-start gap-5">
              <span className="eyebrow text-amber-light">{buyersAgency.investors.eyebrow}</span>
              <h2 className="section-title">{buyersAgency.investors.title}</h2>
              <p className="m-0 text-[14.5px] leading-[1.75] text-cream/80">
                {buyersAgency.investors.lede}
              </p>
              <a
                href={site.calendly}
                target="_blank"
                rel="noreferrer noopener"
                className="pill-cta mt-1.5 bg-amber text-ink hover:bg-cream"
              >
                Book your Strategy Session
              </a>
            </Reveal>
            <Reveal
              variant="right"
              delay={120}
              className="relative h-[clamp(260px,36vw,420px)] min-w-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={photos.kitchenDining}
                alt="Interior of a recently purchased Brisbane investment property"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {buyersAgency.investors.blocks.map((block, i) => (
              <Reveal key={block.title} delay={(i % 2) * 110}>
                <div className="card-lift flex h-full flex-col gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-[clamp(22px,3vw,30px)] hover:-translate-y-1 hover:border-amber-light/60">
                  <h3 className="m-0 text-[17px] font-bold text-amber-light">{block.title}</h3>
                  <p className="m-0 text-[13.5px] leading-[1.7] text-cream/75">{block.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your path to success"
        title="Your journey to lucrative deals is a booking away"
        body="Join the clients who are reaping the rewards of their strategic investments."
        action={{ label: "Book your Strategy Session", href: site.calendly, external: true }}
      />

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
