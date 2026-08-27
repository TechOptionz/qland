/**
 * Shared validation for the site's enquiry forms.
 *
 * Every form (register interest, contact, property management, property sales,
 * house & land qualification) posts the same shape, so the rules live in one
 * place: a name is required, at least one way to reply is required, and an
 * email address — if given — has to look like one.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Field name → maximum accepted length. Anything longer is truncated. */
const LIMITS = {
  source: 60,
  name: 200,
  firstName: 100,
  lastName: 100,
  email: 200,
  phone: 50,
  address: 300,
  postcode: 120,
  subject: 200,
  contactMethod: 60,
  bedrooms: 40,
  budget: 40,
  buyerType: 60,
  message: 4000,
} as const;

export type EnquiryField = keyof typeof LIMITS;

export type Enquiry = Partial<Record<EnquiryField, string>>;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Normalises an untrusted request body into an `Enquiry`, or returns a
 * reader-facing error message. Blank fields are dropped rather than kept as
 * empty strings, so the logged record only carries what was actually filled in.
 */
export function parseEnquiry(body: unknown): { enquiry: Enquiry } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request." };
  }

  const raw = body as Record<string, unknown>;
  const enquiry: Enquiry = {};
  for (const [field, max] of Object.entries(LIMITS) as [EnquiryField, number][]) {
    const value = str(raw[field], max);
    if (value) enquiry[field] = value;
  }

  // A first/last pair and a single "name" field are interchangeable — the
  // forms use whichever the live site uses on that page.
  const name =
    enquiry.name ?? [enquiry.firstName, enquiry.lastName].filter(Boolean).join(" ");

  if (!name) {
    return { error: "Please enter your name." };
  }
  if (!enquiry.email && !enquiry.phone) {
    return { error: "Please leave an email address or a phone number." };
  }
  if (enquiry.email && !EMAIL_RE.test(enquiry.email)) {
    return { error: "That email address looks incomplete." };
  }

  return { enquiry: { ...enquiry, name } };
}
