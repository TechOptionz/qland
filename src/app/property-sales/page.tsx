import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/sections";
import { propertySales } from "@/lib/pages";
import { pageGraph, serviceId, serviceNode } from "@/lib/schema";
import { photos, site } from "@/lib/site";

const DESCRIPTION =
  "Fair prices, guaranteed. Request a price quote for your property and we will come back with a plan to take it to market.";
const SOCIAL_DESCRIPTION =
  "Thinking of selling? Share a few details and we will come back with a price quote.";

export const metadata: Metadata = {
  title: "Property Sales",
  description: DESCRIPTION,
  alternates: { canonical: "/property-sales" },
  openGraph: {
    url: "/property-sales",
    title: "Property Sales · QLand Property",
    description: SOCIAL_DESCRIPTION,
    images: [{ url: photos.hallwayArt, alt: "Hallway of a completed QLand home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Sales · QLand Property",
    description: SOCIAL_DESCRIPTION,
    images: [photos.hallwayArt],
  },
};

const service = serviceNode({
  path: "/property-sales",
  name: "Property Sales",
  description: propertySales.lede,
  serviceType: "Property sales",
});

const graph = pageGraph({
  path: "/property-sales",
  name: `${propertySales.title}: ${propertySales.tagline}`,
  description: DESCRIPTION,
  image: photos.hallwayArt,
  trail: [{ name: "Property Sales", path: "/property-sales" }],
  mainEntityId: serviceId("/property-sales"),
  extra: [service],
});

export default function PropertySalesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={graph} />
      <TopBar />
      <SiteHeader />

      <main id="main" className="flex flex-col">
        <PageHero
          eyebrow={propertySales.tagline}
          title={propertySales.title}
          lede={propertySales.lede}
          image={photos.hallwayArt}
          ctas={[
            { label: "Request a price quote", href: "#quote" },
            { label: `Call ${site.phone}`, href: site.phoneHref, external: true, variant: "ghost" },
          ]}
        />

        {/* Quote request */}
        <section id="quote" className="gutter-x band-y">
          <Reveal
            variant="scale"
            className="mx-auto flex w-full max-w-[860px] flex-col gap-[22px] rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(28px,5vw,52px)]"
          >
            <div className="flex flex-col gap-2">
              <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">
                Get a price quote
              </h2>
              <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">
                Leave your details and a little about the property. We will send a quote and an
                honest read on what it should achieve.
              </p>
            </div>
            <EnquiryForm
              source="property-sales"
              submitLabel="Request quote"
              successMessage="Thanks for submitting! We’ll send you a price quote soon."
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
                { name: "message", label: "Comments", type: "textarea", wide: true },
              ]}
            />
          </Reveal>
        </section>

        <CtaBand
          title="Prefer to talk it through first?"
          body="Book a free call and we will give you a read on the market before you commit to anything."
        />
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
