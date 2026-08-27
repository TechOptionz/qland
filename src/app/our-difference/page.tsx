import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand, Gallery, NumberCard, SectionHeading } from "@/components/sections";
import { ourDifference } from "@/lib/pages";
import { features, photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Difference",
  description:
    "Fixed price, fully customizable, full turnkey, and luxury as standard — the four things every QLand home includes before you move in.",
  alternates: { canonical: "/our-difference" },
  openGraph: {
    url: "/our-difference",
    title: "Our Difference — QLand Property",
    description:
      "Fixed pricing, a design you can shape, and a finish that arrives move-in ready. What every QLand build includes as standard.",
  },
};

export default function OurDifferencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <PageHero
        eyebrow={ourDifference.eyebrow}
        title={ourDifference.title}
        lede={ourDifference.lede}
        image={photos.facadeWhiteDusk}
        imageAlt=""
        ctas={[
          { label: "Schedule a free call", href: site.calendly, external: true },
          { label: "See house and land", href: "/house-and-land", variant: "ghost" },
        ]}
      />

      {/* The four pillars */}
      <section className="gutter-x shell band-y">
        <SectionHeading
          eyebrow="What you get"
          title="Four promises, on every single build"
        />
        <div className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-2 wide:grid-cols-4">
          {features.map((f, i) => (
            <NumberCard key={f.num} num={f.num} title={f.title} body={f.body} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* Inclusions */}
      <section className="gutter-x band-y bg-ink text-cream">
        <div className="shell grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1fr_minmax(0,1fr)]">
          <Reveal variant="left" className="flex flex-col items-start gap-5">
            <span className="eyebrow text-amber-light">Luxury as standard</span>
            <h2 className="section-title">Included, not upgraded</h2>
            <p className="m-0 max-w-[52ch] text-[14.5px] leading-[1.75] text-cream/80">
              The finishes other builders quote as extras are already in your fixed price.
              Nothing on this list is an upgrade.
            </p>
            <ul className="m-0 grid grid-cols-1 gap-x-8 gap-y-2.5 p-0 text-[13.5px] font-semibold sm:grid-cols-2">
              {ourDifference.inclusions.map((item, i) => (
                <li
                  key={item}
                  style={{ transitionDelay: `${240 + i * 70}ms` }}
                  className="stagger-item flex list-none items-center gap-2.5"
                >
                  <span
                    aria-hidden
                    className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            variant="right"
            delay={120}
            className="relative h-[clamp(260px,36vw,420px)] min-w-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={photos.tileDetail}
              alt="Floor to ceiling tiling with brass wall-mounted tapware"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="gutter-x shell band-y">
        <SectionHeading
          eyebrow="Recent builds"
          title="Homes we have handed over"
          lede="Every photograph below is a completed Qland home, finished to the inclusions on this page."
        />
        <div className="mt-9">
          <Gallery images={ourDifference.gallery} />
        </div>
      </section>

      <CtaBand
        title="See what your fixed price includes"
        body="Book a free strategy session and we will walk you through the inclusions, the designs, and the estates currently available."
      />

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
