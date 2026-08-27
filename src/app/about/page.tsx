import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand, Gallery, NumberCard, SectionHeading } from "@/components/sections";
import { about } from "@/lib/pages";
import { contacts, photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "QLand Property buys, builds, and manages property across Brisbane and South East Queensland — buyers agency, house and land, and long-term management.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Us — QLand Property",
    description:
      "What we do: buyers agency, building, property management, and clear guidance for owner-occupiers.",
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <PageHero
        eyebrow="About Us"
        title="Buying, building, and managing property in South East Queensland"
        lede="One team across the whole journey — finding the property, building the home, and looking after it once you own it."
        image={photos.clientsOutdoors}
        ctas={[
          { label: "Schedule a free call", href: site.calendly, external: true },
          { label: "Read the reviews", href: "/reviews", variant: "ghost" },
        ]}
      />

      {/* What we do */}
      <section className="gutter-x shell band-y">
        <SectionHeading eyebrow="What We Do" title="Four ways we work with clients" />
        <div className="mt-11 grid grid-cols-1 gap-[18px] sm:grid-cols-2 wide:grid-cols-4">
          {about.whatWeDo.map((item, i) => (
            <NumberCard
              key={item.num}
              num={item.num}
              title={item.title}
              body={item.body}
              href={item.href}
              delay={i * 90}
            />
          ))}
        </div>
      </section>

      {/* Promises */}
      <section className="gutter-x band-y-sm bg-ink text-cream">
        <div className="shell grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1fr_minmax(0,1fr)]">
          <Reveal variant="left" className="flex flex-col items-start gap-5">
            <span className="eyebrow text-amber-light">Our promise</span>
            <h2 className="section-title">The same four things, every time</h2>
            <ul className="m-0 flex flex-wrap gap-2.5 p-0">
              {about.promises.map((promise, i) => (
                <li
                  key={promise}
                  style={{ transitionDelay: `${200 + i * 90}ms` }}
                  className="stagger-item list-none rounded-full border border-amber-light/50 px-[18px] py-2.5 text-[13px] font-bold text-amber-light"
                >
                  {promise}
                </li>
              ))}
            </ul>
            <p className="m-0 max-w-[52ch] text-[14.5px] leading-[1.75] text-cream/80">
              Whether you are buying your first home, upgrading, or adding to a portfolio, the
              price is fixed, the design is yours, and the house is ready to live in on
              handover day.
            </p>
          </Reveal>
          <Reveal
            variant="right"
            delay={120}
            className="relative h-[clamp(260px,36vw,420px)] min-w-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={photos.clientsIndoors}
              alt="Clients at home after handover"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="gutter-x shell band-y">
        <SectionHeading
          eyebrow="The team"
          title="Who you will be dealing with"
          lede="A small team, which is why you get the same people from the first call through to handover and beyond."
        />
        <div className="mt-9 grid grid-cols-1 gap-5 mdx:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal
            variant="scale"
            className="relative h-[clamp(240px,32vw,380px)] min-w-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={photos.team}
              alt="The QLand Property team"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <div className="flex flex-col gap-4">
            {contacts.map((person, i) => (
              <Reveal key={person.name} variant="right" delay={i * 110}>
                <div className="card-lift flex h-full flex-col gap-1 rounded-2xl border border-line bg-white p-6 hover:-translate-y-1 hover:border-amber">
                  <span className="text-[17px] font-bold">{person.name}</span>
                  <span className="text-[12px] font-bold tracking-[0.08em] text-amber-dark uppercase">
                    {person.role}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] font-semibold">
                    <a href={person.phoneHref} className="text-body-strong hover:text-amber-dark">
                      {person.phone}
                    </a>
                    <a href={person.emailHref} className="text-body-strong hover:text-amber-dark">
                      {person.email}
                    </a>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="gutter-x shell pb-[clamp(44px,6vw,80px)]">
        <SectionHeading
          eyebrow="Our work"
          title="Homes we have delivered"
          lede="A selection of completed Qland builds across Brisbane and South East Queensland."
        />
        <div className="mt-9">
          <Gallery images={about.gallery} />
        </div>
      </section>

      <CtaBand
        title="Start with a free strategy session"
        body="Tell us where you are up to and we will map out the next step — buying, building, or managing."
      />

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
