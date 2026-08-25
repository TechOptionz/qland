/**
 * Single source of truth for the copy and links used across the site.
 * Mirrors the content authored in the Claude Design project
 * ("Qland Property Website Redesign").
 */

export const site = {
  name: "QLand Property",
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
    body: "Access exclusive owner-occupier land estates with fixed pricing and luxury inclusions as standard.",
    img: "https://static.wixstatic.com/media/4dd231_d1ed181bda594a96a2e0591b3fd49ea7~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,enc_avif,quality_auto/4dd231_d1ed181bda594a96a2e0591b3fd49ea7~mv2.jpg",
  },
  {
    title: "Buyers Agency",
    body: "Skilled buyers agents guiding you from search to negotiation for a seamless purchase.",
    img: "https://static.wixstatic.com/media/4dd231_c6caf28f53fe4450a13029c904326cdcf000.jpg/v1/fill/w_980,h_551,al_c,q_85,enc_avif,quality_auto/4dd231_c6caf28f53fe4450a13029c904326cdcf000.jpg",
  },
  {
    title: "Property Management",
    body: "Long-term management that protects your investment and keeps tenants happy.",
    img: "https://static.wixstatic.com/media/4dd231_317f9087595b4262adcfb6c726f92ba6~mv2.jpeg/v1/fill/w_980,h_551,al_c,q_85,enc_avif,quality_auto/4dd231_317f9087595b4262adcfb6c726f92ba6~mv2.jpeg",
  },
] as const;

export const welcomeImage =
  "https://static.wixstatic.com/media/4dd231_317f9087595b4262adcfb6c726f92ba6~mv2.jpeg/v1/fill/w_980,h_551,al_c,q_85,enc_avif,quality_auto/4dd231_317f9087595b4262adcfb6c726f92ba6~mv2.jpeg";

export const reviews = [
  {
    name: "Lexi Micski",
    initial: "L",
    text: "Great experience! Nabil made our home-buying experience smooth and stress-free. His team was responsive, professional, and went above and beyond to find us the perfect property.",
  },
  {
    name: "Paul Jenkins",
    initial: "P",
    text: "I found Nabil quite by accident - and I am so glad that I did. He was thorough, professional and got the job done for me. I would highly recommend QLand Property.",
  },
  {
    name: "Ali Khan",
    initial: "A",
    text: "Seamless experience and Nabil is always on hand when we have questions that need answering. Couldn’t ask for more.",
  },
] as const;

export const boutiqueHighlights = [
  {
    label: "The Project",
    title: "Boutique by design",
    body: "A limited collection of residences with the quality finishes Qland builds as standard — high ceilings, ducted air, and premium tiling throughout.",
  },
  {
    label: "The Lifestyle",
    title: "Island living, city close",
    body: "Walk to Surfers Paradise beach, HOTA galleries, and the Thomas Drive dining strip from a quiet riverside street.",
  },
  {
    label: "The Opportunity",
    title: "Owner-occupiers & investors",
    body: "Suited to buyers seeking a premium Gold Coast address with strong long-term growth and rental demand.",
  },
] as const;

export const locationPoints = [
  "5 minutes to Surfers Paradise beach",
  "Walk to HOTA — Home of the Arts",
  "Cafes and dining on Thomas Drive",
  "Close to Gold Coast light rail",
] as const;

/** System prompt for the site assistant. Kept here so the copy lives with the rest of the content. */
export const assistantSystemPrompt = `You are the friendly website assistant for Qland Property, a Brisbane buyers agency and builder (House and Land packages, Buyers Agency, Property Management, Property Sales).

Key facts:
- Fixed-price full-turnkey homes with luxury inclusions as standard (high ceilings, ducted air, porcelain tiles, full render).
- Customizable designs with an in-house designer.
- Free strategy calls booked at ${site.calendly}
- Phone ${site.phone}; email ${site.email}
- Office at ${site.address.line1}, ${site.address.line2}, Eight Mile Plains QLD.

Answer briefly (2-4 sentences), warmly, and steer serious enquiries toward booking a free call. Do not invent prices or availability.`;
