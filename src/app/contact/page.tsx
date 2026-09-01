import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { contacts, photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call 0423 584 690, email info@qland.com.au, or visit us at Brisbane Technology Park, Suite 7A, 88 Brandl St, Eight Mile Plains QLD.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Contact Us · QLand Property",
    description:
      "Get in touch with the QLand Property team in Eight Mile Plains, Brisbane.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <PageHero
        eyebrow="Get in touch"
        title="Contact us"
        lede="Call, email, or send the form below, whichever suits. We answer every enquiry ourselves."
        image={photos.facadeEvening}
        ctas={[
          { label: `Call ${site.phone}`, href: site.phoneHref, external: true },
          { label: "Book a free call", href: site.calendly, external: true, variant: "ghost" },
        ]}
      />

      <section className="gutter-x band-y">
        <div className="shell grid grid-cols-1 items-start gap-[clamp(28px,5vw,64px)] mdx:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          {/* Details */}
          <Reveal variant="left" className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-amber-dark">Office</span>
              <address className="m-0 text-[14.5px] leading-[1.8] font-medium text-body-strong not-italic">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.line3}
              </address>
            </div>

            <div className="flex flex-col gap-2">
              <span className="eyebrow text-amber-dark">General enquiries</span>
              <a
                href={site.emailHref}
                className="text-[14.5px] font-bold text-body-strong hover:text-amber-dark"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="text-[14.5px] font-bold text-body-strong hover:text-amber-dark"
              >
                {site.phone}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow text-amber-dark">Direct</span>
              {contacts.map((person, i) => (
                <div
                  key={person.name}
                  style={{ transitionDelay: `${200 + i * 110}ms` }}
                  className="stagger-item flex flex-col gap-1 rounded-2xl border border-line bg-white p-5"
                >
                  <span className="text-[15px] font-bold">{person.name}</span>
                  <span className="text-[12px] font-bold tracking-[0.08em] text-amber-dark uppercase">
                    {person.role}
                  </span>
                  <span className="mt-1 flex flex-col gap-0.5 text-[13.5px] font-semibold">
                    <a href={person.phoneHref} className="text-body-strong hover:text-amber-dark">
                      {person.phone}
                    </a>
                    <a
                      href={person.emailHref}
                      className="break-all text-body-strong hover:text-amber-dark"
                    >
                      {person.email}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal
            variant="right"
            delay={120}
            className="rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(28px,4vw,44px)]"
          >
            <div className="mb-6 flex flex-col gap-2">
              <h2 className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.02em]">
                Send us a message
              </h2>
              <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">
                Leave your details and we will get back to you shortly.
              </p>
            </div>
            <EnquiryForm
              source="contact"
              submitLabel="Submit"
              successMessage="Thanks for submitting! We will be in touch shortly."
              fields={[
                { name: "name", label: "Name", autoComplete: "name" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                { name: "email", label: "Email", type: "email", autoComplete: "email" },
                { name: "address", label: "Address", autoComplete: "street-address" },
                { name: "subject", label: "Subject", wide: true },
                { name: "message", label: "Message", type: "textarea", wide: true },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
