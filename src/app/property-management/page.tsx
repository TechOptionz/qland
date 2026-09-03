import type { Metadata } from "next";
import Image from "next/image";
import ChatWidget from "@/components/ChatWidget";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeading } from "@/components/sections";
import { propertyManagement } from "@/lib/pages";
import { pageGraph, serviceId, serviceNode } from "@/lib/schema";
import { contacts, photos } from "@/lib/site";

const DESCRIPTION =
  "Fair prices, guaranteed. Long-term property management across Brisbane and South East Queensland. Contact us to save 3% off management fees.";
const SOCIAL_DESCRIPTION =
  "Management that protects your investment and keeps good tenants in place. Fair prices, guaranteed.";

export const metadata: Metadata = {
  title: "Property Management",
  description: DESCRIPTION,
  alternates: { canonical: "/property-management" },
  openGraph: {
    url: "/property-management",
    title: "Property Management · QLand Property",
    description: SOCIAL_DESCRIPTION,
    images: [{ url: photos.livingSofa, alt: "Living room of a QLand managed property" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Management · QLand Property",
    description: SOCIAL_DESCRIPTION,
    images: [photos.livingSofa],
  },
};

const service = serviceNode({
  path: "/property-management",
  name: "Property Management",
  description: propertyManagement.lede,
  serviceType: "Property management",
});

const graph = pageGraph({
  path: "/property-management",
  name: `${propertyManagement.title}: ${propertyManagement.tagline}`,
  description: DESCRIPTION,
  image: photos.livingSofa,
  trail: [{ name: "Property Management", path: "/property-management" }],
  mainEntityId: serviceId("/property-management"),
  extra: [service],
});

export default function PropertyManagementPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={graph} />
      <TopBar />
      <SiteHeader />

      <main id="main" className="flex flex-col">
        <PageHero
          eyebrow={propertyManagement.tagline}
          title={propertyManagement.title}
          lede={propertyManagement.lede}
          image={photos.livingSofa}
          ctas={[
            { label: "Request a proposal", href: "#enquire" },
            { label: `Call ${contacts[0].phone}`, href: contacts[0].phoneHref, external: true, variant: "ghost" },
          ]}
        />

        {/* Offer band */}
        <section className="gutter-x band-y-sm">
          <Reveal variant="scale" className="shell">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] border border-amber/40 bg-tint p-[clamp(24px,4vw,40px)]">
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow text-amber-dark">Current offer</span>
                <span className="text-[clamp(18px,2.2vw,24px)] font-extrabold tracking-[-0.01em]">
                  {propertyManagement.offer}
                </span>
              </div>
              <a href="#enquire" className="pill-cta bg-amber text-ink hover:bg-ink hover:text-cream">
                Claim the discount
              </a>
            </div>
          </Reveal>
        </section>

        {/* What management covers + the people who do it */}
        <section className="gutter-x band-y-sm">
          <div className="shell grid grid-cols-1 items-start gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[1.05fr_minmax(0,1fr)]">
            <Reveal variant="left" className="flex flex-col items-start gap-5">
              <span className="eyebrow text-amber-dark">Who you deal with</span>
              <h2 className="section-title">A small team, on the phone</h2>
              <p className="m-0 text-[14.5px] leading-[1.75] text-body">
                You are not routed through a call centre. Speak to the two people who handle
                your property directly.
              </p>
              <ul className="m-0 flex w-full list-none flex-col gap-3 p-0">
                {contacts.map((person, i) => (
                  <li
                    key={person.name}
                    style={{ transitionDelay: `${200 + i * 110}ms` }}
                    className="stagger-item flex flex-col gap-1 rounded-2xl border border-line bg-white p-5"
                  >
                    <span className="text-[15px] font-bold">{person.name}</span>
                    <span className="text-[12px] font-bold tracking-[0.08em] text-amber-dark uppercase">
                      {person.role}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] font-semibold">
                      <a href={person.phoneHref} className="text-body-strong hover:text-amber-dark">
                        {person.phone}
                      </a>
                      <a href={person.emailHref} className="text-body-strong hover:text-amber-dark">
                        {person.email}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              variant="right"
              delay={120}
              className="relative h-[clamp(280px,38vw,460px)] min-w-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={photos.team}
                alt="The QLand Property team"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquire" className="gutter-x band-y-sm">
          <div className="shell">
            <SectionHeading
              eyebrow="Get a proposal"
              title="Tell us about your property"
              lede="We will come back with a management proposal, including the 3% discount."
            />
            <Reveal
              variant="scale"
              delay={120}
              className="mt-8 rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(28px,5vw,52px)]"
            >
              <EnquiryForm
                source="property-management"
                submitLabel="Send enquiry"
                successMessage="Thank you for your enquiry, we will get back to you shortly."
                fields={[
                  { name: "firstName", label: "First name", autoComplete: "given-name" },
                  { name: "lastName", label: "Last name", autoComplete: "family-name" },
                  { name: "email", label: "Email", type: "email", autoComplete: "email" },
                  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                  {
                    name: "address",
                    label: "Property address",
                    wide: true,
                    autoComplete: "street-address",
                  },
                  {
                    name: "contactMethod",
                    label: "How would you like to be contacted",
                    type: "select",
                    options: ["Phone call", "Email", "Text message"],
                    wide: true,
                  },
                  { name: "message", label: "Comments", type: "textarea", wide: true },
                ]}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
