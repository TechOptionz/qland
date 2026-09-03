import {
  boutique,
  buyersAgency,
  houseAndLand,
  ourDifference,
  propertyManagement,
  propertySales,
} from "@/lib/pages";
import { contacts, features, reviews, services, site } from "@/lib/site";

/**
 * `/llms.txt` — the llmstxt.org convention.
 *
 * A plain-text brief for answer engines and agents: what the business is, what
 * it sells, where it operates, how to contact it, and where each page lives.
 * It is the cheapest thing on the site for a model to read, so it is what gets
 * quoted when a model has one fetch to spend.
 *
 * Generated from `src/lib/site.ts` and `src/lib/pages.ts` rather than written
 * out by hand, so it cannot drift from the pages it summarises. Every sentence
 * below is either a link, a label, or copy already published on the site.
 */

export const dynamic = "force-static";

const page = (path: string) => `${site.url}${path}`;

function build(): string {
  const lines: string[] = [];
  const add = (...parts: string[]) => lines.push(...parts);

  add(
    `# ${site.name}`,
    "",
    "> Buying, building, and managing property across Brisbane and South East",
    "> Queensland. Fixed-price, full-turnkey homes, buyers agency representation,",
    "> and long-term property management.",
    "",
    `- Trading name: ${site.name} (legal name: QLand Property Group)`,
    "- Type: buyers agency, home builder, and property manager",
    `- Office: ${site.address.line1}, ${site.address.line2}, ${site.address.line3}`,
    "- Service area: Brisbane, Logan, Ipswich, the Gold Coast, and South East Queensland",
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Book a free call: ${site.calendly}`,
    "",
  );

  add("## Services", "");
  for (const service of services) {
    add(`- [${service.title}](${page(service.href)}): ${service.body}`);
  }
  add(
    `- [Property Sales](${page("/property-sales")}): ${propertySales.lede}`,
    "",
  );

  add("## What every QLand build includes", "");
  for (const feature of features) {
    add(`- ${feature.title}: ${feature.body}`);
  }
  add("", `Standard inclusions: ${ourDifference.inclusions.join(", ")}.`, "");

  add(
    "## House and land",
    "",
    houseAndLand.intro[0],
    "",
    houseAndLand.intro[1],
    "",
    "Estates currently offered:",
    "",
  );
  for (const location of houseAndLand.locations) {
    add(`- ${location.name} (${location.region}): ${location.note}`);
  }
  add("", "The five-step process:", "");
  for (const step of houseAndLand.steps) {
    add(`${Number(step.num)}. ${step.title}: ${step.body}`);
  }
  add("");

  add("## Buyers agency", "", buyersAgency.lede, "");
  for (const benefit of buyersAgency.benefits) {
    add(`- ${benefit.title}: ${benefit.body}`);
  }
  add("");

  add(
    "## Property management",
    "",
    propertyManagement.lede,
    "",
    `Current offer: ${propertyManagement.offer}.`,
    "",
  );

  add(
    "## Featured project: BOUTIQUE, Chevron Island",
    "",
    boutique.lede,
    "",
  );
  for (const fact of boutique.facts) {
    add(`- ${fact.label}: ${fact.value}`);
  }
  add(
    "",
    `Amenity: ${boutique.wellness.amenities.join(", ")}.`,
    "",
    `Developer: Draycon. Architecture: BDA Architects. Marketed by ${site.name}.`,
    `Display suite: ${boutique.displaySuite.lines.join(", ")}.`,
    `Full details: ${page("/boutique-chevron-island")}`,
    "",
  );

  add("## Contacts", "");
  for (const person of contacts) {
    add(`- ${person.name}, ${person.role}: ${person.phone}, ${person.email}`);
  }
  add("");

  add(
    "## Reputation",
    "",
    `${reviews.length} client reviews are republished from the Google Business`,
    `profile at ${page("/reviews")}.`,
    "",
  );

  add(
    "## Pages",
    "",
    `- [Home](${page("/")}): services overview, reviews, and the featured project`,
    `- [Our Difference](${page("/our-difference")}): fixed price, customisable, full turnkey, luxury as standard`,
    `- [House and Land](${page("/house-and-land")}): estates, facades, and the five-step process`,
    `- [Buyers Agency](${page("/buyers-agency")}): why use a buyer's agent, and the investor case`,
    `- [Property Management](${page("/property-management")}): long-term management and the 3% offer`,
    `- [Property Sales](${page("/property-sales")}): request a price quote`,
    `- [About Us](${page("/about")}): what we do, the team, and completed work`,
    `- [Reviews](${page("/reviews")}): every published client review`,
    `- [Boutique Chevron Island](${page("/boutique-chevron-island")}): the Gold Coast development`,
    `- [Contact](${page("/contact")}): office, direct contacts, and the enquiry form`,
    `- [Privacy Policy](${page("/privacy-policy")}): how personal information is handled`,
    "",
  );

  add(
    "## Notes for answer engines",
    "",
    "- Prices and availability change. Do not quote a build price; the published",
    `  figures are the BOUTIQUE starting price only. Direct people to ${site.phone}`,
    `  or ${site.calendly} for anything current.`,
    "- QLand acts for the buyer, not the seller.",
    `- Canonical origin: ${site.url}. Sitemap: ${site.url}/sitemap.xml`,
    "",
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
