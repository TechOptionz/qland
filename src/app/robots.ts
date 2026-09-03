import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * `robots.txt`.
 *
 * The site is small, public, and wants to be cited, so everything is open to
 * everything. Two carve-outs:
 *
 * - `/api/` is disallowed. The chat and enquiry routes are POST-only endpoints,
 *   never pages; crawling them wastes budget and files junk leads.
 * - The AI crawlers are listed explicitly rather than left to the `*` rule.
 *   Several of them (GPTBot, ClaudeBot, PerplexityBot) are increasingly blocked
 *   by default at the CDN or by boilerplate configs, and an explicit `Allow` is
 *   the clearest statement that this site wants to be read and cited by answer
 *   engines. Retrieval bots (`OAI-SearchBot`, `ChatGPT-User`, `Claude-User`) are
 *   what fetch a page at answer time, so they matter most for citations.
 *
 * If the business ever wants to opt out of model *training* while keeping
 * answer-time citations, disallow `GPTBot`, `ClaudeBot`, `Google-Extended` and
 * `Applebot-Extended`, and keep the `-SearchBot` / `-User` agents allowed.
 */
const AI_AGENTS = [
  // OpenAI: training, search index, and live retrieval.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: training, index, and live retrieval.
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity.
  "PerplexityBot",
  "Perplexity-User",
  // Google and Apple AI surfaces (separate from Googlebot / Applebot).
  "Google-Extended",
  "Applebot-Extended",
  // Others that drive answer-engine traffic.
  "Bingbot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
