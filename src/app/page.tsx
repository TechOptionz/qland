import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { features, reviews, services, site, welcomeImage } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` opts out of the "%s · QLand Property" template — the brand is
  // already in the title, and the home page should not read as a sub-page.
  title: {
    absolute: "QLand Property — Buyer Centric Agency in Brisbane",
  },
  description:
    "Buying, building, and managing property across Brisbane and South East Queensland. Fixed-price, full-turnkey homes, expert buyers agency support, and long-term property management.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "QLand Property — Buyer Centric Agency in Brisbane",
    description:
      "A seamless home buying journey. QLand delivers expert support through buying, renting, and long-term property management.",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      {/* Hero — above the fold, so it uses the CSS `rise-in` cascade rather than
          a scroll trigger and plays before hydration. */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <HeroVideo src="/assets/brand-loop.mp4" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,19,14,0.82)_0%,rgba(22,19,14,0.55)_45%,rgba(22,19,14,0.1)_85%)]" />
        <div className="gutter-x shell relative flex flex-col items-start gap-[26px] py-[clamp(60px,9vw,120px)]">
          <span className="rise-in inline-flex items-center gap-2.5 rounded-full border border-amber-light/50 px-[18px] py-2 text-xs font-bold tracking-[0.18em] text-amber-light uppercase">
            Buying · Building · Managing Property
          </span>
          <h1 className="rise-in m-0 max-w-[13ch] text-[clamp(30px,4.2vw,52px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-pretty [animation-delay:120ms]">
            Buyer Centric Agency
          </h1>
          <p className="rise-in m-0 max-w-[44ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed font-medium text-cream/85 [animation-delay:240ms]">
            A seamless home buying journey. QLand delivers expert support through buying,
            renting, and long-term property management.
          </p>
          <div className="rise-in mt-1.5 flex flex-wrap gap-3.5 [animation-delay:360ms]">
            <a
              href={site.calendly}
              target="_blank"
              rel="noreferrer noopener"
              className="pill-cta bg-amber text-ink hover:bg-cream"
            >
              Schedule a free call
            </a>
            <Link
              href="/about"
              className="pill-cta border-[1.5px] border-cream/40 font-semibold text-cream hover:border-amber-light hover:text-amber-light"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Difference */}
      <section id="difference" className="gutter-x shell band-y">
        <Reveal className="mb-11 flex flex-col gap-3">
          <span className="eyebrow text-amber-dark">Our Difference</span>
          <h2 className="section-title max-w-[22ch]">Every home, built with certainty</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 wide:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.num} delay={i * 90}>
              <div className="card-lift flex h-full flex-col gap-3.5 rounded-[18px] border border-line bg-white px-[26px] py-[30px] hover:-translate-y-1 hover:border-amber hover:shadow-[0_14px_34px_rgba(240,166,60,0.14)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-lg font-extrabold text-amber-dark">
                  {f.num}
                </span>
                <h3 className="m-0 text-[17px] font-bold">{f.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.65] text-body">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="gutter-x band-y bg-ink text-cream">
        <div className="shell flex flex-col gap-11">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal variant="left" className="flex flex-col gap-3">
              <span className="eyebrow text-amber-light">Services</span>
              <h2 className="section-title">Your property journey starts here</h2>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <a
                href={site.calendly}
                target="_blank"
                rel="noreferrer noopener"
                className="border-b-2 border-amber-light pb-[3px] text-[15px] font-bold text-amber-light transition-colors hover:border-cream hover:text-cream"
              >
                Book your FREE strategy session →
              </a>
            </Reveal>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            {services.map((s, i) => (
              <Reveal key={s.title} variant="scale" delay={i * 110}>
                <Link
                  href={s.href}
                  className="group card-lift relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[18px] bg-ink-soft text-cream hover:-translate-y-1.5"
                >
                  <Image
                    src={s.img}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover opacity-60 transition-[opacity,scale] duration-500 ease-out group-hover:scale-105 group-hover:opacity-75"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,19,14,0)_35%,rgba(22,19,14,0.92)_100%)]" />
                  <span className="relative flex flex-col gap-2 p-[26px]">
                    <span className="text-lg font-extrabold">{s.title}</span>
                    <span className="text-[13px] leading-relaxed text-cream/80">{s.body}</span>
                    <span className="mt-1.5 text-[13.5px] font-bold text-amber-light transition-transform duration-300 group-hover:translate-x-1">
                      Learn more →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section id="about" className="gutter-x band-y">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-[clamp(28px,5vw,72px)]">
          <Reveal variant="left" className="overflow-hidden rounded-[20px]">
            <Image
              src={welcomeImage}
              alt="Handing over the keys to a new home"
              width={980}
              height={735}
              sizes="(max-width: 720px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal variant="right" delay={120} className="flex flex-col items-start gap-5">
            <span className="eyebrow text-amber-dark">Welcome</span>
            <h2 className="section-title">Welcome to Your Path to Homeownership</h2>
            <p className="m-0 text-[14.5px] leading-[1.75] text-body">
              Are you ready to embark on your journey to owning a property that perfectly
              suits your needs and dreams? We&apos;re here to guide you through every step,
              whether you&apos;re a first-time home buyer, a seasoned investor, or simply
              seeking a new place to call home.
            </p>
            <a
              href={site.calendly}
              target="_blank"
              rel="noreferrer noopener"
              className="pill-cta mt-1.5 bg-amber text-ink hover:bg-ink hover:text-cream"
            >
              Book your FREE strategy session now
            </a>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section
        id="reviews"
        className="gutter-x band-y-sm border-y border-line bg-white"
      >
        <div className="shell flex flex-col gap-7">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow text-amber-dark">Our Customers</span>
              <h2 className="section-title">What our clients say</h2>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <div className="flex items-center gap-3 rounded-[14px] border border-line bg-cream px-[18px] py-3">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line bg-white text-lg font-extrabold text-[#4285F4]">
                  G
                </span>
                <span className="flex flex-col">
                  <span className="flex items-center gap-2 text-[15px] font-extrabold">
                    5.0{" "}
                    <span className="tracking-[2px] text-amber" aria-hidden>
                      ★★★★★
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-body">Google Reviews</span>
                </span>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 wide:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <Reveal key={r.name} delay={i * 100}>
                <div className="card-lift flex h-full flex-col gap-2.5 rounded-2xl border border-line bg-cream p-5 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_12px_28px_rgba(22,19,14,0.07)]">
                  <span
                    className="text-[13px] tracking-[3px] text-amber"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </span>
                  <p className="m-0 text-[13.5px] leading-[1.7] text-body-strong">{r.text}</p>
                  <div className="mt-auto flex items-center gap-3 pt-1">
                    <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-amber text-[15px] font-extrabold text-ink">
                      {r.initial}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-bold">{r.name}</span>
                      <span className="text-xs font-semibold text-muted">Google review</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal variant="fade" className="self-start">
            <Link
              href="/reviews"
              className="border-b-2 border-amber pb-[3px] text-[14.5px] font-bold text-amber-ink transition-colors hover:border-ink hover:text-ink"
            >
              Read all {reviews.length} reviews →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured project banner */}
      <section id="boutique" className="gutter-x pb-[clamp(56px,8vw,110px)]">
        <Reveal variant="scale" className="shell mt-[clamp(56px,8vw,110px)]">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-[linear-gradient(110deg,#F0A63C,#F6B352)] p-[clamp(32px,5vw,56px)]">
            <div className="flex max-w-[46ch] flex-col gap-2">
              <span className="eyebrow text-ink/65">Featured Project</span>
              <span className="text-[clamp(20px,2.4vw,28px)] font-extrabold tracking-[-0.02em]">
                Boutique Chevron Island
              </span>
              <p className="m-0 text-sm leading-relaxed font-medium text-ink/75">
                42 resident-only residences on the Gold Coast, from $1,220,000.
              </p>
            </div>
            <Link
              href="/boutique-chevron-island"
              className="pill-cta bg-ink text-cream hover:bg-cream hover:text-ink"
            >
              Explore the project
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
