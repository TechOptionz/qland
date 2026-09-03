import type { Metadata } from "next";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { CtaBand } from "@/components/sections";
import { reviewsPage } from "@/lib/pages";
import { pageGraph, reviewListNode } from "@/lib/schema";
import { photos, reviews, site } from "@/lib/site";

const DESCRIPTION =
  "5.0 on Google. Read what QLand Property clients say about buying, building, and having their investment managed.";
const SOCIAL_DESCRIPTION =
  "Every review published on our Google Business profile, from clients we have bought, built, or managed for.";

export const metadata: Metadata = {
  title: "Reviews",
  description: DESCRIPTION,
  alternates: { canonical: "/reviews" },
  openGraph: {
    url: "/reviews",
    title: "Reviews · QLand Property",
    description: SOCIAL_DESCRIPTION,
    images: [{ url: photos.clientsIndoors, alt: "QLand clients in their new home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews · QLand Property",
    description: SOCIAL_DESCRIPTION,
    images: [photos.clientsIndoors],
  },
};

/**
 * The reviews are also attached to the organisation node in the root layout —
 * this list repeats them on the page that displays them, which is where Google
 * expects to find review markup.
 */
const graph = pageGraph({
  path: "/reviews",
  name: reviewsPage.title,
  description: DESCRIPTION,
  type: "CollectionPage",
  image: photos.clientsIndoors,
  trail: [{ name: "Reviews", path: "/reviews" }],
  extra: [reviewListNode],
});

export default function ReviewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={graph} />
      <TopBar />
      <SiteHeader />

      <main id="main" className="flex flex-col">
        <PageHero
          eyebrow={reviewsPage.eyebrow}
          title={reviewsPage.title}
          lede={reviewsPage.lede}
          image={photos.clientsIndoors}
          ctas={[{ label: "Schedule a free call", href: site.calendly, external: true }]}
        />

        {/* Rating summary */}
        <section className="gutter-x band-y-sm">
          <Reveal variant="scale" className="shell">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] border border-line bg-white p-[clamp(24px,4vw,40px)]">
              <div className="flex items-center gap-4">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-cream text-2xl font-extrabold text-[#4285F4]">
                  G
                </span>
                <span className="flex flex-col">
                  <span className="flex items-center gap-2.5 text-[22px] font-extrabold">
                    5.0
                    <span className="tracking-[3px] text-amber" aria-hidden>
                      ★★★★★
                    </span>
                  </span>
                  <span className="text-[13px] font-semibold text-body">
                    Based on {reviews.length} Google reviews
                  </span>
                </span>
              </div>
              <p className="m-0 max-w-[40ch] text-[13.5px] leading-relaxed text-body">
                Reviews are transcribed from our Google Business profile and are published there
                in full.
              </p>
            </div>
          </Reveal>
        </section>

        {/* All reviews */}
        <section className="gutter-x shell pb-[clamp(44px,6vw,80px)]">
          <div className="columns-1 gap-4 sm:columns-2 wide:columns-3">
            {reviews.map((review, i) => (
              <Reveal
                key={review.name}
                delay={(i % 3) * 90}
                className="mb-4 inline-block w-full break-inside-avoid"
              >
                <figure className="card-lift m-0 flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_12px_28px_rgba(22,19,14,0.07)]">
                  <span
                    className="text-[13px] tracking-[3px] text-amber"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </span>
                  <blockquote className="m-0 text-[13.5px] leading-[1.75] text-body-strong">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-2 flex items-center gap-3">
                    <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-amber text-[15px] font-extrabold text-ink">
                      {review.initial}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-bold">{review.name}</span>
                      <span className="text-xs font-semibold text-muted">Google review</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand
          title="Ready to start your own?"
          body="Book a free strategy session and we will map out the next step."
        />
      </main>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
