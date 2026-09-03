import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * XML sitemap, served at `/sitemap.xml` and referenced from `robots.txt`.
 *
 * Every route is static, so the list is written out rather than crawled. Add a
 * route here whenever one is added under `src/app` — an unlisted page is still
 * crawlable through the nav, but it will be found later and ranked colder.
 *
 * `priority` is relative within the site only: the commercial pages that take
 * enquiries sit above the supporting ones, and the privacy policy sits last.
 */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/house-and-land", priority: 0.9, changeFrequency: "weekly" },
  { path: "/buyers-agency", priority: 0.9, changeFrequency: "monthly" },
  { path: "/boutique-chevron-island", priority: 0.9, changeFrequency: "weekly" },
  { path: "/property-management", priority: 0.8, changeFrequency: "monthly" },
  { path: "/property-sales", priority: 0.8, changeFrequency: "monthly" },
  { path: "/our-difference", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
