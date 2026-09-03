/**
 * Schema.org structured data for the site.
 *
 * Everything here is *derived* from the copy that already lives in
 * `src/lib/site.ts` and `src/lib/pages.ts` — no new marketing claims are made.
 * The graph exists so search engines and answer engines (Google AI Overviews,
 * ChatGPT Search, Perplexity, Claude) can read the business, its services, its
 * service area, and the Boutique listing as facts rather than inferring them
 * from prose.
 *
 * Layout: the root layout emits the stable `Organization` + `WebSite` nodes
 * once; each page emits its own `WebPage`/`BreadcrumbList` (plus a `Service` or
 * listing node where relevant) and refers back to the shared nodes by `@id`.
 */

import {
  boutique,
  buyersAgency,
  houseAndLand,
  ourDifference,
  propertyManagement,
  propertySales,
} from "./pages";
import { contacts, photos, reviews, services, site } from "./site";

type Node = Record<string, unknown>;

/** Absolute URL for a site-relative path. Remote (Wix) URLs pass through. */
export function absolute(path: string): string {
  if (path.startsWith("http")) return path;
  return path === "/" ? site.url : `${site.url}${path}`;
}

/* Stable `@id`s, so nodes cross-reference instead of repeating themselves. */
export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
const pageId = (path: string) => `${absolute(path)}#webpage`;

/** E.164 form of the published numbers — what Google expects for `telephone`. */
const e164 = (au: string) => `+61${au.replace(/\s+/g, "").slice(1)}`;

/* ---------------------------------------------------------------------------
   Shared nodes
   --------------------------------------------------------------------------- */

const postalAddress: Node = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.line2}, ${site.address.line1}`,
  addressLocality: "Eight Mile Plains",
  addressRegion: "QLD",
  postalCode: "4113",
  addressCountry: "AU",
};

const auAddress = (locality: string): Node => ({
  "@type": "PostalAddress",
  addressLocality: locality,
  addressRegion: "QLD",
  addressCountry: "AU",
});

/** Suburbs and cities the site says it works in, as places rather than words. */
const areaServed: Node[] = [
  { "@type": "AdministrativeArea", name: "South East Queensland" },
  { "@type": "City", name: "Brisbane", address: auAddress("Brisbane") },
  { "@type": "City", name: "Gold Coast", address: auAddress("Gold Coast") },
  { "@type": "City", name: "Logan", address: auAddress("Logan") },
  { "@type": "City", name: "Ipswich", address: auAddress("Ipswich") },
  ...houseAndLand.locations.map((location) => ({
    "@type": "Place",
    name: location.name,
    address: auAddress(location.name),
  })),
];

/** The named people the contact and property management pages publish. */
const people: Node[] = contacts.map((person) => ({
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  telephone: e164(person.phone),
  email: person.email,
  worksFor: { "@id": ORG_ID },
}));

/** The four service pages, as an offer catalogue hanging off the business. */
const offerCatalog: Node = {
  "@type": "OfferCatalog",
  name: "QLand Property services",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "House and Land",
        url: absolute("/house-and-land"),
        description: services[0].body,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Buyers Agency",
        url: absolute("/buyers-agency"),
        description: services[1].body,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Property Management",
        url: absolute("/property-management"),
        description: propertyManagement.lede,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Property Sales",
        url: absolute("/property-sales"),
        description: propertySales.lede,
      },
    },
  ],
};

/**
 * The Google reviews the site republishes.
 *
 * `/reviews` states the profile sits at 5.0, and every review transcribed into
 * `site.reviews` is a five-star one, so that is what is asserted here. Keep the
 * rating and the count in step with the live Google Business Profile — a rating
 * that overstates the profile is a structured-data policy breach.
 */
const reviewNodes: Node[] = reviews.map((review) => ({
  "@type": "Review",
  author: { "@type": "Person", name: review.name },
  reviewBody: review.text,
  reviewRating: {
    "@type": "Rating",
    ratingValue: 5,
    bestRating: 5,
    worstRating: 1,
  },
  itemReviewed: { "@id": ORG_ID },
}));

const aggregateRating: Node = {
  "@type": "AggregateRating",
  ratingValue: 5,
  bestRating: 5,
  worstRating: 1,
  reviewCount: reviews.length,
  itemReviewed: { "@id": ORG_ID },
};

/**
 * The business itself. Dual-typed because QLand both acts as an agency and
 * builds the homes — the two types carry different queries in answer engines.
 */
export const organizationNode: Node = {
  "@type": ["RealEstateAgent", "HomeAndConstructionBusiness"],
  "@id": ORG_ID,
  name: site.name,
  legalName: "QLand Property Group",
  alternateName: "QLAND",
  url: site.url,
  description:
    "Buying, building, and managing property across Brisbane and South East Queensland. Fixed-price, full-turnkey homes and expert buyers agency support.",
  slogan: "Buyer Centric Agency",
  logo: {
    "@type": "ImageObject",
    "@id": `${site.url}/#logo`,
    url: absolute("/assets/qland-logo.png"),
    caption: site.name,
  },
  image: [photos.facadeDuskDark, photos.kitchenIsland, photos.poolAerial],
  telephone: e164(site.phone),
  email: site.email,
  address: postalAddress,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.address.line2}, Eight Mile Plains QLD 4113`,
  )}`,
  areaServed,
  currenciesAccepted: "AUD",
  knowsAbout: [
    "Buyers agency",
    "House and land packages",
    "Fixed-price home building",
    "Property management",
    "Property sales",
    "Brisbane property market",
    "First Home Owners Grant",
    "Property investment",
  ],
  knowsLanguage: "en-AU",
  employee: people,
  contactPoint: contacts.map((person) => ({
    "@type": "ContactPoint",
    contactType: person.role,
    name: person.name,
    telephone: e164(person.phone),
    email: person.email,
    areaServed: "AU",
    availableLanguage: "en-AU",
  })),
  hasOfferCatalog: offerCatalog,
  aggregateRating,
  review: reviewNodes,
  sameAs: [
    site.social.facebook,
    site.social.linkedin,
    site.social.tiktok,
    site.social.instagram,
  ],
  potentialAction: {
    "@type": "ReserveAction",
    name: "Schedule a free call",
    target: {
      "@type": "EntryPoint",
      urlTemplate: site.calendly,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
  },
};

export const websiteNode: Node = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: "en-AU",
  publisher: { "@id": ORG_ID },
};

/** Emitted once, from the root layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationNode, websiteNode],
};

/* ---------------------------------------------------------------------------
   Per-page builders
   --------------------------------------------------------------------------- */

export type Crumb = { name: string; path: string };

function breadcrumbNode(path: string, trail: Crumb[]): Node {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absolute(path)}#breadcrumb`,
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/**
 * Wraps a page's nodes in a graph with its `WebPage` and `BreadcrumbList`.
 *
 * `type` narrows the page for answer engines — `AboutPage` and `ContactPage`
 * are read directly by Google for "about" and "contact" intents.
 */
export function pageGraph({
  path,
  name,
  description,
  type = "WebPage",
  image,
  trail = [],
  extra = [],
  mainEntityId,
}: {
  path: string;
  name: string;
  description: string;
  type?: string | string[];
  image?: string;
  trail?: Crumb[];
  extra?: Node[];
  mainEntityId?: string;
}) {
  const webPage: Node = {
    "@type": type,
    "@id": pageId(path),
    url: absolute(path),
    name,
    description,
    inLanguage: "en-AU",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    breadcrumb: { "@id": `${absolute(path)}#breadcrumb` },
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: absolute(image) } }
      : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumbNode(path, trail), ...extra],
  };
}

/** The `@id` `serviceNode` gives a page's service, for `mainEntity` references. */
export const serviceId = (path: string) => `${absolute(path)}#service`;

/** A single service, provided by the business, in the areas the site names. */
export function serviceNode({
  path,
  name,
  description,
  serviceType,
  catalog,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  catalog?: {
    name: string;
    items: readonly { name: string; description: string }[];
  };
}): Node {
  return {
    "@type": "Service",
    "@id": serviceId(path),
    name,
    description,
    serviceType,
    url: absolute(path),
    provider: { "@id": ORG_ID },
    areaServed,
    audience: {
      "@type": "Audience",
      audienceType: "Property buyers and investors",
    },
    ...(catalog
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: catalog.name,
            itemListElement: catalog.items.map((item, i) => ({
              "@type": "Offer",
              position: i + 1,
              itemOffered: {
                "@type": "Service",
                name: item.name,
                description: item.description,
              },
            })),
          },
        }
      : {}),
  };
}

/* --- /house-and-land ------------------------------------------------------ */

/** The five-step process, so answer engines can quote the sequence in order. */
export const houseAndLandProcessNode: Node = {
  "@type": "HowTo",
  "@id": `${absolute("/house-and-land")}#process`,
  name: "How a QLand house and land package comes together",
  description: houseAndLand.intro[1],
  step: houseAndLand.steps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.body,
    url: `${absolute("/house-and-land")}#step-${step.num}`,
  })),
};

/** The estates the page names, as a list of places rather than prose. */
export const houseAndLandLocationsNode: Node = {
  "@type": "ItemList",
  "@id": `${absolute("/house-and-land")}#locations`,
  name: "Estate locations",
  itemListElement: houseAndLand.locations.map((location, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Place",
      name: location.name,
      description: location.note,
      address: auAddress(location.name),
    },
  })),
};

/* --- /our-difference ------------------------------------------------------ */

export const inclusionsNode: Node = {
  "@type": "ItemList",
  "@id": `${absolute("/our-difference")}#inclusions`,
  name: "Luxury as standard inclusions",
  description: ourDifference.lede,
  itemListElement: ourDifference.inclusions.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item,
  })),
};

/* --- /buyers-agency ------------------------------------------------------- */

export const buyersAgencyCatalog = {
  name: "Why use a buyer's agent",
  items: buyersAgency.benefits.map((benefit) => ({
    name: benefit.title,
    description: benefit.body,
  })),
};

/* --- /boutique-chevron-island --------------------------------------------- */

export const boutiqueId = `${absolute("/boutique-chevron-island")}#boutique`;

/**
 * The development itself.
 *
 * Dual-typed: `ApartmentComplex` is the accurate description, `Product` is what
 * carries `offers` through validators, so the "from $1,220,000" price is
 * machine-readable. `AggregateOffer.lowPrice` is used rather than a flat price
 * because the published figure is a starting price.
 */
export const boutiqueNode: Node = {
  "@type": ["Product", "ApartmentComplex"],
  "@id": boutiqueId,
  name: "BOUTIQUE Chevron Island",
  description: boutique.lede,
  url: absolute("/boutique-chevron-island"),
  image: Object.values(boutique.images).map((src) => absolute(src)),
  numberOfAccommodationUnits: { "@type": "QuantitativeValue", value: 42 },
  numberOfBedrooms: { "@type": "QuantitativeValue", minValue: 2, maxValue: 3 },
  numberOfBathroomsTotal: 2,
  address: {
    "@type": "PostalAddress",
    streetAddress: boutique.displaySuite.lines[0],
    addressLocality: "Chevron Island",
    addressRegion: "QLD",
    postalCode: "4217",
    addressCountry: "AU",
  },
  amenityFeature: boutique.wellness.amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity,
    value: true,
  })),
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AUD",
    lowPrice: 1220000,
    offerCount: 42,
    availability: "https://schema.org/PreOrder",
    seller: { "@id": ORG_ID },
    url: absolute("/boutique-chevron-island"),
  },
  additionalProperty: boutique.facts.map((fact) => ({
    "@type": "PropertyValue",
    name: fact.label,
    value: fact.value,
  })),
  brand: { "@type": "Brand", name: "BOUTIQUE" },
  architect: { "@type": "Organization", name: "BDA Architects" },
};

/* --- /contact ------------------------------------------------------------- */

/** Repeats the business as a place, so the contact page answers "where are you". */
export const contactPlaceNode: Node = {
  "@type": "LocalBusiness",
  "@id": `${absolute("/contact")}#office`,
  name: `${site.name}, Eight Mile Plains office`,
  parentOrganization: { "@id": ORG_ID },
  url: absolute("/contact"),
  telephone: e164(site.phone),
  email: site.email,
  address: postalAddress,
  image: photos.facadeEvening,
};

/* --- /reviews ------------------------------------------------------------- */

export const reviewListNode: Node = {
  "@type": "ItemList",
  "@id": `${absolute("/reviews")}#reviews`,
  name: "Client reviews",
  itemListElement: reviewNodes.map((review, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: review,
  })),
};
