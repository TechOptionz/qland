/**
 * Per-page copy, transcribed from qland.com.au.
 *
 * Wording is kept as the business publishes it wherever the live page has real
 * copy. Two exceptions are marked inline: the Property Sales intro (the live
 * page still carries Wix's placeholder paragraph) and the House & Land location
 * blurbs (the live page shows unlabelled Google Maps screenshots rather than
 * text). Both are noted at the point of use.
 *
 * Site-wide content — contact details, navigation, reviews, imagery — lives in
 * `src/lib/site.ts`.
 */

import { photos } from "./site";

/* ---------------------------------------------------------------------------
   /our-difference
   --------------------------------------------------------------------------- */

export const ourDifference = {
  eyebrow: "Our Difference",
  title: "Every home, built with certainty",
  lede: "Fixed pricing, a design you can shape, and a finish that arrives move-in ready. This is what every Qland build includes as standard.",
  /** From the "Luxury as standard" copy on the live page. */
  inclusions: [
    "High ceilings",
    "Ducted air conditioning",
    "Porcelain tiles",
    "Full render",
    "Floor to ceiling tiles",
    "Wall hung vanities",
    "Blinds throughout",
    "Landscaping, driveway and fencing",
    "Letterbox and clothesline",
  ],
  gallery: [
    { src: photos.facadeDuskLight, alt: "Rendered single-storey facade at dusk" },
    { src: photos.kitchenIsland, alt: "Kitchen with stone island bench and stools" },
    { src: photos.facadeTwoStorey, alt: "Two-storey home lit from inside at dusk" },
    { src: photos.bathroom, alt: "Bathroom with wall hung vanity and brass tapware" },
    { src: photos.livingOpenPlan, alt: "Open plan living opening to the backyard" },
    { src: photos.facadeGarden, alt: "Completed home with established landscaping" },
    { src: photos.benchDetail, alt: "Kitchen benchtop detail with floor to ceiling tiling" },
    { src: photos.facadeSunset, alt: "Qland facade photographed at sunset" },
  ],
} as const;

/* ---------------------------------------------------------------------------
   /house-and-land
   --------------------------------------------------------------------------- */

export const houseAndLand = {
  intro: [
    "At Qland Property, we have made significant investments in building strong relationships with land developers, granting us access to a diverse selection of blocks in exclusive owner-occupier-focused land estates.",
    "Similar to our build-only option, we offer complete peace of mind with fixed pricing and luxury inclusions as standard. Simply share your preferred location with us, and one of our experts will efficiently source and negotiate the perfect block of land while collaborating with you to match it with your dream floorplan.",
  ],
  facades: [
    {
      name: "Fascade 1",
      img: photos.facadeOne,
      alt: "Single-storey Fascade 1 home at dusk",
      specs: ["3 Bed", "2 Bath", "2 Living Rooms", "2 Garage"],
    },
    {
      name: "Fascade 2",
      img: photos.facadeTwo,
      alt: "Two-storey Fascade 2 home at dusk",
      specs: ["4 Bed", "2 Bath", "2 Living Rooms", "2 Garage"],
    },
  ],
  /**
   * The live page marks these six suburbs with outlined Google Maps
   * screenshots. The boundaries are reproduced here as text — the screenshots
   * are neither on-theme nor ours to redistribute.
   */
  locations: [
    { name: "Park Ridge", region: "Logan", note: "Established owner-occupier estates, 30 minutes to the Brisbane CBD." },
    { name: "Logan Reserve", region: "Logan", note: "Family estates beside Stoneleigh Reserve Park and the Logan River." },
    { name: "Chambers Flat", region: "Logan", note: "Larger blocks on the Logan River, between Munruben and Logan Village." },
    { name: "Jimboomba", region: "Logan", note: "Semi-rural acreage living with a growing town centre." },
    { name: "Greenbank", region: "Logan", note: "Bordering Spring Mountain and the Greenbank reserves." },
    { name: "Ripley", region: "Ipswich", note: "The Ripley Valley priority development area, one of the fastest-growing corridors in the country." },
  ],
  steps: [
    {
      num: "01",
      title: "Financial Evaluation",
      subtitle: "Determine Your Borrowing Capacity",
      body: "Commence the journey by undergoing a meticulous pre-qualification process. Our adept team will swiftly assess your borrowing capacity for your home loan with a minimal deposit. Following this, we present a curated selection of property options, aligning with your budget, including suitable locations and home designs.",
    },
    {
      num: "02",
      title: "Secure Finance Approval",
      subtitle: "Grants and approvals, handled",
      body: "Once you've pinpointed the house and land package that resonates with you, the property is secured. Simultaneously, our finance manager diligently works on organising your finance and securing approvals for the First Home Owners Grant or Great Start Grant, ensuring a seamless progression toward your homeownership.",
    },
    {
      num: "03",
      title: "Select Your Ideal Land & Floor Plan",
      subtitle: "Take charge of the selection",
      body: "Identify the optimal block that suits your preferences, and finalise the design elements such as layout, landscaping, and colour schemes to tailor your dream home to perfection.",
    },
    {
      num: "04",
      title: "Construction of Your Bespoke Residence",
      subtitle: "Bid farewell to the rental trap",
      body: "Enter the exciting phase of witnessing your vision materialise into a tangible reality. Bid farewell to the Rental Trap as our accomplished builders take charge. With council approvals swiftly handled, construction begins promptly, culminating in the realisation of your brand new home.",
    },
    {
      num: "05",
      title: "Relocate to Your Brand-New Abode",
      subtitle: "Move in and enjoy it",
      body: "Reap the rewards of your efforts! Step into your brand-new home, breaking free from the confines of renting. Experience the fulfilment of homeownership and savour the outcomes of our streamlined process that transforms your aspirations into a tangible reality.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
   /buyers-agency
   --------------------------------------------------------------------------- */

export const buyersAgency = {
  title: "Why Use a Buyer’s Agent: Your Key to a Smarter Property Purchase",
  lede: "Are you considering buying a property? While you might be tempted to go solo, partnering with a Buyer’s Agency can make all the difference in your real estate journey. At Qland Property, we’re here to share why using a Buyer’s Agency is a smart move:",
  benefits: [
    {
      num: "01",
      title: "Unlock Exclusive Properties",
      body: "Gain access to a wide range of properties, including exclusive listings and hidden gems not publicly available.",
    },
    {
      num: "02",
      title: "Property Search",
      body: "Save time with a tailored search that aligns with your preferences and budget, ensuring your dream home is within reach.",
    },
    {
      num: "03",
      title: "Expert Market Insights",
      body: "Navigate the market confidently with our Buyer’s Agents’ valuable local market knowledge and analysis.",
    },
    {
      num: "04",
      title: "Skilled Negotiation",
      body: "Leave negotiations to us — our experience ensures you get the best deal and favourable terms.",
    },
    {
      num: "05",
      title: "Your Dedicated Advocates",
      body: "We prioritise your goals and interests, providing unbiased advocacy throughout the buying process.",
    },
    {
      num: "06",
      title: "Minimise Risks, Maximise Success",
      body: "Our expertise minimises risks, offering a smooth and hassle-free buying experience.",
    },
    {
      num: "07",
      title: "Time and Stress Saver",
      body: "We handle paperwork and administrative tasks, saving you time and reducing stress.",
    },
    {
      num: "08",
      title: "Professional Network",
      body: "Access top-notch service from our network of professionals — lenders, inspectors, and attorneys.",
    },
  ],
  investors: {
    eyebrow: "Investors",
    title: "Unleash Your Investment Potential in Brisbane",
    lede: "In the dynamic landscape of Brisbane’s booming real estate market, now is the opportune moment to secure your stake. At QLAND Property, we are more than just buyer’s agents; we are your strategic partners, dedicated to unlocking the full potential of your investments.",
    blocks: [
      {
        title: "Your Perfect Fit Property Awaits",
        body: "In the race to secure a property in Brisbane’s thriving market, the right guidance is paramount. Welcome to QLAND Property, where your investment aspirations meet unparalleled expertise. As seasoned buyers’ agents in Brisbane, we understand that aligning with the right agent is the key to success.",
      },
      {
        title: "Elevate Your Returns: Unlocking 30% Growth",
        body: "What if we told you that securing a property with a projected growth of 30% is not only possible but a reality for many of our clients? Our success lies in a potent combination of in-depth knowledge of the Brisbane market and analytical prowess. We specialise in identifying undervalued suburbs with substantial growth potential, crafting strategies that not only secure properties below market value but also elevate your portfolio to unprecedented heights.",
      },
      {
        title: "Don’t Leave Your Investment to Chance",
        body: "In a market saturated with uncertainties and opportunistic real estate agents, QLAND Property stands out as a beacon of reliability. Our fulfillment stems from securing the most lucrative deals for our clients. As skilled negotiators, we advocate for your interests, ensuring you don’t fall prey to hasty decisions or inflated prices.",
      },
      {
        title: "Your Path to Success: Booking Away",
        body: "Ready to explore some of the best investment properties in Brisbane? Your journey to lucrative deals is just a booking away. Join the ranks of our satisfied clients who are not only happy but also reaping the rewards of their strategic investments.",
      },
    ],
  },
} as const;

/* ---------------------------------------------------------------------------
   /property-management
   --------------------------------------------------------------------------- */

export const propertyManagement = {
  title: "Property Management",
  tagline: "Fair Prices, Guaranteed",
  offer: "Contact us so you can save 3% off Property Management Fees",
  lede: "Long-term management that protects your investment and keeps good tenants in place. Tell us about your property and we’ll come back with a management proposal.",
} as const;

/* ---------------------------------------------------------------------------
   /property-sales
   --------------------------------------------------------------------------- */

export const propertySales = {
  title: "Property Sales",
  tagline: "Fair Prices, Guaranteed",
  /**
   * The live page still carries Wix's stock placeholder paragraph here, so this
   * intro is written in the brand's voice from what the rest of the site says
   * about the sales service. Replace it with the client's own wording.
   */
  lede: "Thinking of selling? Share a few details about your property and we’ll come back with a price quote and a plan to take it to market.",
} as const;

/* ---------------------------------------------------------------------------
   /about
   --------------------------------------------------------------------------- */

export const about = {
  whatWeDo: [
    {
      num: "01",
      title: "Buyers Agency",
      body: "Learn how we help you find and secure the right property.",
      href: "/buyers-agency",
    },
    {
      num: "02",
      title: "Building",
      body: "Explore your build options and design pathways.",
      href: "/house-and-land",
    },
    {
      num: "03",
      title: "Property Management",
      body: "Understand how we care for your investment.",
      href: "/property-management",
    },
    {
      num: "04",
      title: "Owner-Occupier",
      body: "Get clear guidance on buying to live in, upgrading, or building.",
      href: "/house-and-land",
    },
  ],
  /** The four promises the live About page repeats under the service cards. */
  promises: [
    "Fixed Price",
    "Move in Ready",
    "Fully Customisable",
    "Luxury as standard",
  ],
  gallery: [
    { src: photos.kitchenTimber, alt: "Timber and stone butler’s pantry" },
    { src: photos.poolHouse, alt: "Swimming pool alongside a completed Qland home" },
    { src: photos.facadeEntry, alt: "Front entry with a timber pivot door" },
    { src: photos.bedroom, alt: "Main bedroom with a rattan bedhead" },
    { src: photos.alfresco, alt: "Covered alfresco with planter boxes" },
    { src: photos.kitchenWhite, alt: "White and timber kitchen with integrated appliances" },
    { src: photos.poolAerial, alt: "Aerial view of a plunge pool and tropical planting" },
    { src: photos.outdoorLounge, alt: "Outdoor lounge setting in a landscaped courtyard" },
    { src: photos.diningNook, alt: "Dining nook with a pendant light" },
  ],
} as const;

/* ---------------------------------------------------------------------------
   /reviews
   --------------------------------------------------------------------------- */

export const reviewsPage = {
  eyebrow: "Our Customers",
  title: "What our clients say",
  lede: "Every review below is published on our Google Business profile by a client we have bought, built, or managed for.",
} as const;

/* ---------------------------------------------------------------------------
   /privacy-policy
   --------------------------------------------------------------------------- */

export type PolicySection = {
  heading: string;
  paragraphs?: readonly string[];
  intro?: string;
  items?: readonly string[];
  outro?: string;
};

export const privacyPolicy: readonly PolicySection[] = [
  {
    heading: "About Us",
    paragraphs: [
      "QLand Property Group (“we,” “us,” “our”) operates from 88 Brandl St, Eight Mile Plains, QLD, 4122. We are committed to protecting your privacy and handling your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).",
    ],
  },
  {
    heading: "About This Privacy Policy",
    paragraphs: [
      "This Privacy Policy explains how we collect, use, store, and share your personal information in the course of delivering our real estate services under the Form 6 Appointment of Agent.",
    ],
  },
  {
    heading: "What Personal Information We Collect",
    intro:
      "We collect personal information directly from you when you appoint us as your agent, engage with our website, or communicate with us in relation to our services. This may include:",
    items: [
      "Contact Details: Full name, phone number, email address, residential address.",
      "Property Details: Information about your property, including floorplans, title references, tenancy records, and inspection reports.",
      "Identification: Driver’s license or passport details for verification purposes.",
      "Financial Information: Bank account details, payment and billing information (processed securely, often via third-party providers).",
      "Digital Data: Information you submit via forms on our website, app usage data, or marketing interactions.",
      "Survey & Feedback Data: Collected during promotions, reviews, or service improvement surveys.",
    ],
  },
  {
    heading: "How We Use Your Information",
    intro:
      "Your personal information is used for legitimate purposes related to the services we provide, including but not limited to:",
    items: [
      "Preparing and executing Form 6 and agency agreements.",
      "Managing, advertising, and leasing or selling your property.",
      "Coordinating repairs, inspections, and maintenance.",
      "Complying with obligations under the Residential Tenancies and Rooming Accommodation Act 2008 or other applicable legislation.",
      "Sending service-related notifications, updates, and marketing communications (you may opt-out at any time).",
      "Processing payments and issuing statements or invoices.",
      "Improving our website, customer service, and business offerings.",
      "Conducting market research, client surveys, and promotions.",
      "Protecting our business and preventing fraudulent activity.",
    ],
  },
  {
    heading: "Sharing and Disclosure of Information",
    intro:
      "We may disclose your personal information to trusted third parties where necessary to deliver our services, including:",
    items: [
      "Tenants, buyers, sellers, or their authorised representatives.",
      "Tradespeople, contractors, and property service providers.",
      "Professional advisers (solicitors, accountants, conveyancers).",
      "Government and regulatory bodies, where required by law.",
      "Technology providers and marketing agencies acting on our behalf.",
      "Third-party payment processors and tenancy databases.",
      "Entities involved in potential business transactions such as mergers or acquisitions.",
    ],
    outro:
      "All third parties are expected to handle your information in accordance with privacy laws and only for authorised purposes.",
  },
  {
    heading: "Marketing and Communication Choices",
    intro: "You have the right to manage how we communicate with you:",
    items: [
      "You can opt-out of marketing emails by using the unsubscribe link or by contacting us at info@qland.com.au.",
      "Even if you opt out of marketing, you may still receive essential service-related updates.",
    ],
  },
  {
    heading: "Storage, Retention and Security",
    paragraphs: [
      "We take reasonable steps to safeguard your personal information from loss, misuse, unauthorised access, and modification. Information may be stored electronically or in secure physical files.",
      "We retain your information only as long as necessary to fulfil the purpose it was collected for, or as required by law (e.g. audit, dispute resolution, or legal compliance). Secure destruction procedures are followed once data is no longer needed.",
    ],
  },
  {
    heading: "Overseas Data Transfer",
    paragraphs: [
      "In some cases, your information may be stored or processed outside Australia (e.g. by cloud service providers). We ensure appropriate safeguards are in place to protect your data during any such transfer.",
    ],
  },
  {
    heading: "Access and Correction",
    paragraphs: [
      "You have the right to request access to, or correction of, the personal information we hold about you. To do so, please contact us using the details below.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this policy from time to time to reflect changes in our operations or legal requirements. We encourage you to review this document regularly for any updates.",
    ],
  },
];
