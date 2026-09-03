# QLand Property

Next.js implementation of the **Qland Property Website Redesign** Claude Design
project (`Qland Home.dc.html` and `Boutique Chevron Island.dc.html`).

## Pages

| Route | Content |
|---|---|
| `/` | Hero, Our Difference, Services, Welcome, Reviews, featured project banner, site assistant |
| `/our-difference` | The four build promises, the "luxury as standard" inclusions, recent-build gallery |
| `/house-and-land` | Estate access, the two facades, current locations, the 5-step process, qualification form |
| `/buyers-agency` | Eight reasons to use a buyer's agent, plus the investor sections |
| `/property-management` | Fair-prices positioning, the 3% offer, named contacts, proposal form |
| `/property-sales` | Price-quote request |
| `/about` | What We Do, the four promises, the team, portfolio gallery |
| `/reviews` | All Google reviews |
| `/contact` | Office and direct contacts, contact form |
| `/privacy-policy` | Full policy text |
| `/boutique-chevron-island` | BOUTIQUE project page: hero, key facts, three design bands, amenity, location, enquiry form, creators, disclaimer |
| `not-found` | Themed 404 with links back into the site |

Every page sets its own `title`, `description`, canonical URL, Open Graph and
Twitter card block; the root layout supplies the `%s · QLand Property` title
template.

## Search, answer engines, and structured data

Three generated routes, plus a schema.org graph on every page. None of it
duplicates page copy by hand — it is all derived from `src/lib/site.ts` and
`src/lib/pages.ts`, so it cannot drift from what the pages actually say.

| Route | Source | Purpose |
|---|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` | Every route, with relative priorities. Add a route here when you add a page. |
| `/robots.txt` | `src/app/robots.ts` | Opens the site to search *and* AI crawlers by name, disallows `/api/`, points at the sitemap. |
| `/llms.txt` | `src/app/llms.txt/route.ts` | The [llmstxt.org](https://llmstxt.org) brief: the business, services, estates, contacts, and page index as plain text. |

`src/lib/schema.ts` builds the JSON-LD. The root layout emits the stable
`Organization` (a `RealEstateAgent` + `HomeAndConstructionBusiness`) and
`WebSite` nodes once; each page emits its own `WebPage`/`BreadcrumbList` and
refers back by `@id`. Pages add what they are actually about:

- `/house-and-land` — `Service`, an `ItemList` of the six estates, and the
  five-step process as a `HowTo`.
- `/buyers-agency`, `/property-management`, `/property-sales` — `Service`, with
  the eight buyer's-agent reasons as an `OfferCatalog`.
- `/boutique-chevron-island` — the development as `Product` + `ApartmentComplex`
  with the amenity list, unit count, address, and the "from $1,220,000"
  `AggregateOffer`.
- `/contact` — `ContactPage` + `LocalBusiness`; `/about` — `AboutPage`;
  `/reviews` — `CollectionPage` + the reviews as an `ItemList`.

Two things to keep an eye on:

- **The rating is asserted, not fetched.** The `aggregateRating` on the
  organisation says 5.0 across `site.reviews`, which is what `/reviews`
  already claims in its own copy. Keep it in step with the live Google Business
  Profile. Google does not show star snippets for a business reviewing itself,
  so this earns knowledge-graph and answer-engine value, not stars in results.
- **Postcode.** `site.ts` gives the office as Eight Mile Plains 4113 and the
  privacy policy text says 4122. The structured data uses 4113. Worth settling
  in the copy, since an inconsistent NAP weakens local ranking.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Anthropic SDK.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Deploying to Vercel

The repo is a stock Next.js app, so Vercel needs no extra configuration —
import the project and it builds with the detected defaults (`npm run build`,
output `.next`). The only optional setting is the environment variable below.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `ALEESA_WEBHOOK_URL` | No | Aleesa webhook server origin. With `ALEESA_WEBCHAT_API_KEY`, the site assistant is Aleesa Web Chat. |
| `ALEESA_WEBCHAT_API_KEY` | No | Aleesa Web Chat tenant key. Server-only secret. |
| `ALEESA_API_URL` | No | Aleesa API origin (`https://api.aleesa.ai`) — a different host from the webhook one. |
| `ALEESA_WEBSITE_FORM_API_KEY` | No | Aleesa Website Form key. Set it and every enquiry is filed in the Aleesa CRM. Server-only secret. |
| `ANTHROPIC_API_KEY` | No | Fallback assistant, used only when the two `ALEESA_WEBCHAT` variables are unset. |

None are required to run the site — without them the widget answers with the
"call us / book a call" fallback and enquiries are only written to the server
log. Set the Aleesa variables before launch; logs are not durable storage.

Copy `.env.example` to `.env.local` for local development, and add the same
values under **Project → Settings → Environment Variables** in Vercel.
`.env.example` carries the full setup steps for each Aleesa connection.

## Notes on the port

**Responsive behaviour.** The design switched layouts by measuring
`window.innerWidth` in component state. That is reimplemented as CSS media
queries so the correct layout is server-rendered and there is no hydration
flash. The thresholds are declared as Tailwind breakpoints in
`src/app/globals.css`: `sm` 640px, `mdx` 860px, `nav` 960px, `wide` 1100px.

**Site assistant.** The design called `window.claude.complete`, which only
exists inside a Claude artifact. `/api/chat` replaces it with a server-side
call, so no key is ever exposed to the browser. Which assistant answers is
decided in one place, `src/lib/chat/provider.ts`:

1. **Aleesa Web Chat** — when `ALEESA_WEBHOOK_URL` and `ALEESA_WEBCHAT_API_KEY`
   are set. Aleesa is *stateful*: it holds the transcript, the knowledge base
   and the agent persona on its side, keyed by a `sessionId` the widget mints
   once per visitor and keeps in `localStorage`. So only the newest visitor
   turn is posted, and the bot is retrained in the Aleesa dashboard
   (Knowledge Base + Chat Agent) rather than in this repo. Every conversation
   lands in the Aleesa inbox, where a human can take over.
2. **Claude** — when only `ANTHROPIC_API_KEY` is set. Stateless: the whole
   conversation is replayed each turn against `assistantSystemPrompt` in
   `src/lib/site.ts` (`claude-opus-5`, low effort — replies are short).
3. **Neither** — the route answers with an empty reply.

An empty reply is a valid answer at every layer, so any provider failure shows
the widget's contact fallback rather than an error.

**Enquiry forms.** Every form on the site is a `<EnquiryForm>` posting to
`/api/enquiry`, tagged with a `source` naming the page it came from. Validation
lives in `src/lib/enquiry.ts`. With `ALEESA_WEBSITE_FORM_API_KEY` set, the
enquiry is filed in the Aleesa CRM as a Lead with source `website_form`
(`src/lib/aleesa-leads.ts`); Aleesa builds the contact from the `full_name` and
`email` field names, so those two keys are part of the contract. Without the
key the submission is only written to the server log.

**Motion.** Sections animate in as they scroll into view. `src/components/Reveal.tsx`
is an IntersectionObserver wrapper; the hidden state ships in the server-rendered
HTML, and `globals.css` plus a `<noscript>` block in `layout.tsx` restore
visibility for reduced-motion and no-JS readers. Above-the-fold copy uses the
plain CSS `rise-in` cascade instead, so it plays before hydration.
`npm run check:motion` walks every page and fails if anything is left invisible.

**Link colour.** `--color-amber-dark` is a decorative accent and only reaches
~2.1:1 on cream. Link text uses `--color-amber-ink` instead, which clears 4.5:1
on every surface it sits on. `npm run check:contrast` enforces this.

**Boutique Chevron Island.** The live page embeds the project's own marketing
site in an iframe (`astonishing-blini-0f41a7.netlify.app`) rather than holding
the content itself. The copy is transcribed from there and the renders were
extracted from the same bundle into `public/assets/boutique/` — see
`public/assets/README.md`. The project site's "watch the film" button has no
film behind it (the source marks it as a placeholder), so it is not reproduced.

## Content

All copy is transcribed from qland.com.au.

- `src/lib/site.ts` — contact details, navigation, imagery, the service summary,
  reviews, and the assistant's system prompt.
- `src/lib/pages.ts` — the longer per-page copy.

Photographs are pulled from the live site's Wix media host through the `wix()`
helper in `src/lib/site.ts`; `static.wixstatic.com` is allowlisted in
`next.config.ts`. Two pieces of copy are **not** verbatim and are marked inline
in `pages.ts`:

- the **Property Sales** intro — the live page still carries Wix's placeholder
  paragraph, so this is written in the brand's voice and should be replaced with
  the client's own wording;
- the **House & Land location blurbs** — the live page marks the six suburbs
  with unlabelled Google Maps screenshots, which are neither on-theme nor ours
  to redistribute, so the boundaries are reproduced as text instead.

The live footer also links "FAQs" and "Website terms of use" to pages that do
not exist. Those links are omitted here rather than pointed at invented content.

Boutique Chevron Island renders are local files under `public/assets/boutique/`;
everything else is served from the live site's Wix media host.

## Checks

```bash
npm run typecheck
npm run check:contrast   # link contrast, needs a server up (BASE=…)
npm run check:motion     # scroll reveals, needs a server up (BASE=…)
```
