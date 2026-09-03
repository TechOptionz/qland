import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { privacyPolicy } from "@/lib/pages";
import { pageGraph } from "@/lib/schema";
import { contacts } from "@/lib/site";

const DESCRIPTION =
  "How QLand Property Group collects, uses, stores, and shares personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    url: "/privacy-policy",
    title: "Privacy Policy · QLand Property",
    description: DESCRIPTION,
  },
};

const graph = pageGraph({
  path: "/privacy-policy",
  name: "Privacy Policy",
  description: DESCRIPTION,
  trail: [{ name: "Privacy Policy", path: "/privacy-policy" }],
});

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={graph} />
      <TopBar />
      <SiteHeader />

      <main id="main" className="flex flex-col">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          lede="How we collect, use, store, and share your personal information in the course of delivering our real estate services."
        />

        <section className="gutter-x band-y">
          <div className="shell mx-auto flex max-w-[76ch] flex-col gap-10">
            {privacyPolicy.map((section, i) => (
              <Reveal key={section.heading} delay={i === 0 ? 0 : 60} className="flex flex-col gap-3.5">
                <h2 className="m-0 text-[clamp(19px,2vw,23px)] font-extrabold tracking-[-0.01em]">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="m-0 text-[14.5px] leading-[1.8] text-body">
                    {paragraph}
                  </p>
                ))}

                {section.intro && (
                  <p className="m-0 text-[14.5px] leading-[1.8] text-body">{section.intro}</p>
                )}

                {section.items && (
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[14px] leading-[1.7] text-body"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-amber"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.outro && (
                  <p className="m-0 text-[14.5px] leading-[1.8] text-body">{section.outro}</p>
                )}
              </Reveal>
            ))}

            <Reveal variant="scale" className="rounded-[18px] border border-line bg-white p-7">
              <h2 className="m-0 text-[clamp(19px,2vw,23px)] font-extrabold tracking-[-0.01em]">
                Contact Us
              </h2>
              <p className="mt-3.5 mb-0 text-[14.5px] leading-[1.8] text-body">
                If you have any questions, concerns, or requests relating to this Privacy Policy
                or the way we handle your information, please contact:
              </p>
              <address className="mt-4 mb-0 text-[14.5px] leading-[1.8] font-semibold text-body-strong not-italic">
                QLand Property Group
                <br />
                88 Brandl St, Eight Mile Plains, QLD, Australia, 4113
                <br />
                <a href={contacts[0].emailHref} className="hover:text-amber-dark">
                  {contacts[0].email}
                </a>
              </address>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
