# QLand Property

Next.js implementation of the **Qland Property Website Redesign** Claude Design
project (`Qland Home.dc.html` and `Boutique Chevron Island.dc.html`).

- **`/`** — home: hero, Our Difference, Services, Welcome, Reviews, featured
  project banner, footer, and the floating site assistant.
- **`/boutique-chevron-island`** — project page: hero, highlights, gallery,
  location, and the register-interest form.

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

**Register-interest form.** `/api/register` validates the submission and
currently only writes it to the server log — wire it to your CRM, a
transactional email, or a database before launch. The endpoint is marked with a
`NOTE:` comment at `src/app/api/register/route.ts`.

**Missing media.** The Boutique Chevron Island renders were not part of the
design export, so those gallery slots show labelled placeholders — see
`public/assets/README.md` for how to fill them in.

## Content

Copy, links, reviews, and the assistant's system prompt all live in
`src/lib/site.ts`.
