import { site } from "@/lib/site";
import type { Enquiry } from "@/lib/enquiry";

/**
 * Adapter for the Aleesa Website Form intake.
 *
 * Every enquiry the site captures — the contact, property management,
 * property sales and house & land forms — is filed in the Aleesa CRM as a
 * Lead with `leadSource: "website_form"`, alongside the full submission.
 *
 *   POST {ALEESA_API_URL}/api/v1/integrations/website-form/submit
 *   x-api-key: wform_…
 *   {
 *     "formId":    "contact",
 *     "originUrl": "https://qland.com.au/contact",
 *     "fields":    { "full_name": "…", "email": "…", … }
 *   }
 *
 *   -> 201 { "success": true, "data": { "submissionId": "…", "leadId": "L-…" } }
 *
 * Aleesa derives the contact record from the field *names*, matching
 * `full_name` / `name` and `email` (case-insensitively) — so those two keys
 * are part of the contract, not cosmetic. Everything else is carried through
 * verbatim onto the lead's notes and its submission detail page.
 */

const TIMEOUT_MS = 15_000;

const PATH = "/api/v1/integrations/website-form/submit";

/**
 * Which page a submission came from, so the lead's origin column is a real
 * URL. `source` is set by each `<EnquiryForm source="…">`; anything not
 * listed here still submits, just with the site root as its origin.
 */
const ORIGINS: Record<string, string> = {
  contact: "/contact",
  "house-and-land": "/house-and-land",
  "property-management": "/property-management",
  "property-sales": "/property-sales",
  "boutique-chevron-island": "/boutique-chevron-island",
};

function endpoint(): string {
  const configured = (process.env.ALEESA_API_URL ?? "").replace(/\/+$/, "");
  if (!configured) throw new Error("ALEESA_API_URL is not set");

  // The Aleesa dashboard prints the *full* submit URL, so the variable is
  // easily pasted with the path already on it. Appending blindly would then
  // POST to …/submit/api/v1/integrations/website-form/submit and 404 — from
  // Vercel, with nothing but a logged failure to debug it by.
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;

  return `${base}${PATH}`;
}

/**
 * `Enquiry` field names → the names Aleesa reads. `name` becomes `full_name`
 * so the CRM builds a contact from it; the rest keep their own labels, which
 * are what the submission detail page shows.
 */
const FIELD_NAMES: Partial<Record<keyof Enquiry, string>> = {
  name: "full_name",
  email: "email",
  phone: "phone",
  address: "address",
  postcode: "postcode",
  subject: "subject",
  contactMethod: "preferred_contact",
  bedrooms: "bedrooms",
  budget: "budget",
  buyerType: "buyer_type",
  message: "message",
  source: "form_source",
};

/** Blank entries are dropped so Aleesa never records an empty field. */
function buildFields(enquiry: Enquiry): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const [field, label] of Object.entries(FIELD_NAMES) as [
    keyof Enquiry,
    string,
  ][]) {
    const value = enquiry[field]?.trim();
    if (value) fields[label] = value;
  }

  // firstName/lastName are already folded into `name` by parseEnquiry, so
  // they are deliberately not sent again.
  return fields;
}

/**
 * Files the enquiry in the Aleesa CRM.
 *
 * Returns "skipped" when ALEESA_WEBSITE_FORM_API_KEY is unset, so the site —
 * and every form on it — still runs without it. Throws when the key is
 * configured but Aleesa rejects the submission.
 */
export async function sendEnquiryToAleesa(
  enquiry: Enquiry,
): Promise<"sent" | "skipped"> {
  const apiKey = process.env.ALEESA_WEBSITE_FORM_API_KEY;
  if (!apiKey) return "skipped";

  const source = enquiry.source ?? "website";
  const path = ORIGINS[source] ?? "/";

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // The key travels as a header rather than in the body: Aleesa accepts
      // either, and a header keeps it out of any request-body logging.
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      formId: source,
      originUrl: `${site.url}${path}`,
      fields: buildFields(enquiry),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  const body = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: unknown;
  } | null;

  if (!response.ok || body?.success === false) {
    // 401 here means the key is wrong, revoked, or the Website Form
    // integration was disconnected in the Aleesa dashboard — regenerating the
    // key invalidates the old one immediately.
    const detail = typeof body?.message === "string" ? `: ${body.message}` : "";
    throw new Error(`Aleesa website form responded ${response.status}${detail}`);
  }

  return "sent";
}
