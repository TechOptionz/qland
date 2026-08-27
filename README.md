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

Every page sets its own `title`, `description`, canonical URL, and Open Graph
block; the root layout supplies the `%s · QLand Property` title template.

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
| `ANTHROPIC_API_KEY` | No | Powers the site assistant via `/api/chat`. Without it the widget still opens and answers with the "call us / book a call" fallback. |

Copy `.env.example` to `.env.local` for local development, and add the same key
under **Project → Settings → Environment Variables** in Vercel.

## Notes on the port

**Responsive behaviour.** The design switched layouts by measuring
`window.innerWidth` in component state. That is reimplemented as CSS media
queries so the correct layout is server-rendered and there is no hydration
flash. The thresholds are declared as Tailwind breakpoints in
`src/app/globals.css`: `sm` 640px, `mdx` 860px, `nav` 960px, `wide` 1100px.

**Site assistant.** The design called `window.claude.complete`, which only
exists inside a Claude artifact. `/api/chat` replaces it with a server-side
Anthropic Messages API call (`claude-opus-5`, low effort — replies are short) so
the key is never exposed to the browser. Any API failure returns an empty reply
and the widget shows the contact fallback rather than an error.

**Enquiry forms.** Every form on the site is a `<EnquiryForm>` posting to
`/api/enquiry`, tagged with a `source` naming the page it came from. Validation
lives in `src/lib/enquiry.ts`. The endpoint **currently only writes the
submission to the server log** — wire it to your CRM, a transactional email, or
a database before launch; it is marked with a `NOTE:` comment.

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
