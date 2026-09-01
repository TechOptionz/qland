/**
 * Single source of truth for the site-wide copy, links, and imagery.
 *
 * Global content (contact details, navigation, the service summary, reviews)
 * lives here; the longer per-page copy lives in `src/lib/pages.ts`. Both are
 * transcribed from qland.com.au so the wording matches what the business
 * already publishes.
 */

export const site = {
  name: "QLand Property",
  /** Canonical origin. Used for metadata and for the Aleesa lead origin. */
  url: "https://qland.com.au",
  host: "qland.com.au",
  phone: "0423 584 690",
  phoneHref: "tel:0423584690",
  email: "info@qland.com.au",
  emailHref: "mailto:info@qland.com.au",
  calendly: "https://calendly.com/qland-booking/book-your-call",
  address: {
    line1: "Brisbane Technology Park",
    line2: "Suite 7A, 88 Brandl St",
    line3: "Eight Mile Plains 4113 QLD",
    inline:
      "Brisbane Technology Park · Suite 7A, 88 Brandl St, Eight Mile Plains QLD",
  },
  social: {
    facebook: "https://www.facebook.com/QLANDPropertyGroup",
    linkedin: "https://www.linkedin.com/in/nabil-q-a968bbb6/",
    tiktok: "https://www.tiktok.com/@qlandproperties?lang=en",
    instagram: "https://www.instagram.com/qland_property/",
  },
} as const;

/** Named contacts, as published on the property management and contact pages. */
export const contacts = [
  {
    name: "Nabil Qureshi",
    role: "Director & Buyers Agent",
    phone: "0423 584 690",
    phoneHref: "tel:0423584690",
    email: "nabil-qureshi@qland.com.au",
    emailHref: "mailto:nabil-qureshi@qland.com.au",
  },
  {
    name: "Karen",
    role: "Property Management & Admin",
    phone: "0402 294 086",
    phoneHref: "tel:0402294086",
    email: "admin@qland.com.au",
    emailHref: "mailto:admin@qland.com.au",
  },
] as const;

/* ---------------------------------------------------------------------------
   Imagery
   --------------------------------------------------------------------------- */

/**
 * Builds a Wix media URL for one of the photographs already published on
 * qland.com.au.
 *
 * `fit` is used rather than `fill` so the source keeps its own aspect ratio —
 * every call site crops with `object-cover`, and `next/image` re-encodes and
 * resizes from there. `static.wixstatic.com` is allowlisted in
 * `next.config.ts`.
 */
export function wix(file: string, width = 1600): string {
  return `https://static.wixstatic.com/media/${file}/v1/fit/w_${width},h_${width},q_85/${file}`;
}

/** Photographs from the live site, named by what they actually show. */
export const photos = {
  facadeDuskDark: wix("4dd231_317f9087595b4262adcfb6c726f92ba6~mv2.jpeg"),
  facadeDuskLight: wix("4dd231_32fe17da54b24b6e8e90a8cdba249967~mv2.jpeg"),
  facadeTwoStorey: wix("4dd231_35f5f63d7b9748428bba0c02bd606ea4~mv2.jpg"),
  facadeEntry: wix("4dd231_44e98f02754243839a7d587acf311b42~mv2.jpg"),
  facadeGarden: wix("4dd231_6678c3f97430468e85ff44063df01035~mv2.jpg"),
  facadeWhiteDusk: wix("4dd231_840690dcdd734e0a97ad604914b8d00e~mv2.jpg"),
  facadePath: wix("4dd231_93d62b466f21462ca01ca0863c0f4ec7~mv2.jpeg"),
  facadeWeatherboard: wix("4dd231_b11fc0dfa9c8473dafa9fb9921721038~mv2.jpeg"),
  facadeEvening: wix("4dd231_b9a1e6ba4e47452ba56d1d33f24336e2~mv2.jpeg"),
  facadeGarage: wix("4dd231_ed7c0d58844c42e48a07e9b18f43ab39~mv2.jpg"),
  facadeSunset: wix("4dd231_f79ce31809cd4affafceadf265dc5611~mv2.jpeg"),

  facadeOne: wix("4dd231_64d8fc3049db474eb2f908f0d3fb38b2~mv2.jpg"),
  facadeTwo: wix("4dd231_d1b2c98af5bb499a9b60b69a39e7eb2c~mv2.jpg"),

  kitchenTimber: wix("4dd231_00896a1dcfa44cfdad469c243a7d94a4~mv2.jpg"),
  livingOpenPlan: wix("4dd231_06fa6c39cf9b4c468d99e3acaaf1a262~mv2.jpg"),
  kitchenWhite: wix("4dd231_224a607ff1624dec8d1c3160294e9ddc~mv2.jpg"),
  kitchenIsland: wix("4dd231_4380f7bd08c1486baa30c74839590cb6~mv2.jpg"),
  benchDetail: wix("4dd231_8612c3fb8e7644c894e8edf7c18c5506~mv2.jpg"),
  kitchenDining: wix("4dd231_9107fd8303ec498082da860349c92824~mv2.jpg"),
  diningNook: wix("4dd231_b72663aab8bb477bb436946caff82e15~mv2.jpg"),
  tileDetail: wix("4dd231_baf356c5632b4814bd5816818a6ab922~mv2.jpg"),
  bathroom: wix("4dd231_cd0f8084d0e846ae8f2b6010dac20768~mv2.jpg"),
  hallway: wix("4dd231_d1ed181bda594a96a2e0591b3fd49ea7~mv2.jpg"),
  hallwayArt: wix("4dd231_dff9325af50b4068b566ec8a42f209df~mv2.jpg"),
  bedroom: wix("4dd231_f64d596fdb444fa8a270fe6607c3cf48~mv2.jpg"),
  livingSofa: wix("4dd231_f88db8b2141b40a9896def7306744605~mv2.jpg"),

  alfresco: wix("4dd231_460547f669594d149d03ef21cfc76593~mv2.jpg"),
  poolHouse: wix("4dd231_55d355c2f1bb4a5a9805fa825be995e5~mv2.jpg"),
  poolDoorway: wix("4dd231_6991835e16f34a8687d8142bf9371319~mv2.jpg"),
  poolAerial: wix("4dd231_b3e63a4e77c84f79a5e5a4f496a0c079~mv2.jpg"),
  outdoorLounge: wix("4dd231_deecc87f356443fc92ea92332ea1775c~mv2.jpg"),

  clientsIndoors: wix("4dd231_63cebd26159d4badb96ed2ee40fc8f0c~mv2.jpg"),
  clientsOutdoors: wix("4dd231_9a578841d4124e2e8fe12d96824b749f~mv2.jpg"),
  team: wix("4dd231_d938ef7de5424389aba5141fcce33df5~mv2.jpg"),
  soldSign: wix("4dd231_eb19aeae537f4eb3b835d5b7e359febd~mv2.jpg"),
} as const;

/** Kept as a named export because the home page's Welcome band references it. */
export const welcomeImage = photos.facadeDuskDark;

/* ---------------------------------------------------------------------------
   Navigation
   --------------------------------------------------------------------------- */

export type NavLink = { label: string; href: string };

/** The Services dropdown, and the "Solutions" column in the footer. */
export const serviceLinks: NavLink[] = [
  { label: "House and Land", href: "/house-and-land" },
  { label: "Buyers Agency", href: "/buyers-agency" },
  { label: "Property Management", href: "/property-management" },
  { label: "Property Sales", href: "/property-sales" },
];

/** Top-level entries, in the order the live site uses. */
export const mainLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Difference", href: "/our-difference" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Boutique Chevron Island", href: "/boutique-chevron-island" },
];

/* ---------------------------------------------------------------------------
   Shared content blocks
   --------------------------------------------------------------------------- */

export const features = [
  {
    num: "01",
    title: "Fixed Price",
    body: "After signing, your contract price will be locked in, providing peace of mind with a fixed price for every day and every build.",
  },
  {
    num: "02",
    title: "Customizable",
    body: "Choose one of our designs, make some changes, or create your own design with our in house designer to best suit your lifestyle and block of land.",
  },
  {
    num: "03",
    title: "Full Turnkey",
    body: "All of our homes will be “move-in ready,” requiring no additional expenses. From blinds to landscaping to mailbox, everything will be taken care of.",
  },
  {
    num: "04",
    title: "Luxury as standard",
    body: "High ceilings, ducted air, porcelain tiles, full render, floor to ceiling tiles and wall hung vanities to name a few.",
  },
] as const;

export const services = [
  {
    title: "House and Land",
    href: "/house-and-land",
    body: "Access exclusive owner-occupier land estates with fixed pricing and luxury inclusions as standard.",
    img: photos.facadeGarden,
  },
  {
    title: "Buyers Agency",
    href: "/buyers-agency",
    body: "Skilled buyers agents guiding you from search to negotiation for a seamless purchase.",
    img: photos.soldSign,
  },
  {
    title: "Property Management",
    href: "/property-management",
    body: "Long-term management that protects your investment and keeps tenants happy.",
    img: photos.livingSofa,
  },
] as const;

/**
 * Google reviews, transcribed from qland.com.au/general-7. The home page shows
 * the first three; `/reviews` shows all of them.
 */
export const reviews = [
  {
    name: "Raymond Rivera",
    initial: "R",
    text: "Just in time for Christmas 2024, we finally moved to our new home, yay! Thanks to Qland Property for putting all together our dreams into reality. The process was very smooth, from design concept to materials selection to stages of the build, and up to handover. The quality and outcome of the house is beyond our expectation. We feel that the value of our home is more than what we paid for. And to top it all, they managed to include a plunge pool within our budget! All ready for the Queensland summer! If you wish to have the same experience, we strongly recommend contacting Nabil Qureshi from Qland Property.",
  },
  {
    name: "Lexi Micski",
    initial: "L",
    text: "Great experience! Nabil made our home-buying experience smooth and stress-free. His team was responsive, professional, and went above and beyond to find us the perfect property. Their expertise and dedication truly set them apart. I’m so grateful we had Nabil on our side.",
  },
  {
    name: "Beenush Khokhar",
    initial: "B",
    text: "Professional, Prompt & Reassuring are the top 3 words I’d use to describe Qland Property. In managing my investment property Qland have gone above and beyond in ensuring quality tenants and giving me confidence that the property is being looked after. Nabil has industry knowledge and connections, and promptly solve any problems that arise. I wouldn’t hesitate to recommend them. 10/10 service",
  },
  {
    name: "Paul Jenkins",
    initial: "P",
    text: "I found Nabil quite by accident - and I am so glad that I did. He was thorough, professional and got the job done for me. I would highly recommend anyone that is looking for a home on any sort of budget to reach out to Nabil at QLand Property.",
  },
  {
    name: "Ali Khan",
    initial: "A",
    text: "Seamless experience and Nabil is always on hand when we have questions that need answering. Couldn’t ask for more.",
  },
  {
    name: "Shahida Khan",
    initial: "S",
    text: "Nabeel is very concerned & hardworking young man. I found him very gentle, loyal, hardworking person.",
  },
] as const;

/** System prompt for the site assistant. Kept here so the copy lives with the rest of the content. */
export const assistantSystemPrompt = `You are the friendly website assistant for Qland Property, a Brisbane buyers agency and builder (House and Land packages, Buyers Agency, Property Management, Property Sales).

Key facts:
- Fixed-price full-turnkey homes with luxury inclusions as standard (high ceilings, ducted air, porcelain tiles, full render).
- Customizable designs with an in-house designer.
- House and land in Park Ridge, Logan Reserve, Chambers Flat, Jimboomba, Greenbank, and Ripley.
- Free strategy calls booked at ${site.calendly}
- Phone ${site.phone}; email ${site.email}
- Office at ${site.address.line1}, ${site.address.line2}, Eight Mile Plains QLD.

Answer briefly (2-4 sentences), warmly, and steer serious enquiries toward booking a free call. Do not invent prices or availability.`;
