import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const linkClass = "text-cream/80 transition-colors hover:text-amber-light";

const socials = [
  {
    label: "Facebook",
    href: site.social.facebook,
    path: "M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H7.6V13h2.7v8h3.2z",
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    path: "M6.94 8.5H3.56V20.4h3.38V8.5zM5.25 3.2a2 2 0 100 4 2 2 0 000-4zM20.44 13.3c0-3.3-1.76-4.9-4.1-4.9-1.9 0-2.75 1-3.22 1.75V8.5H9.75V20.4h3.37v-6.2c0-1.6.6-2.6 2-2.6 1.3 0 1.95.9 1.95 2.6v6.2h3.37v-7.1z",
  },
  {
    label: "TikTok",
    href: site.social.tiktok,
    path: "M16.6 3c.3 2.4 1.7 3.9 4.1 4.1v2.8c-1.5.1-2.9-.3-4.3-1.2v5.8c0 4-2.9 6.5-6.3 6.5-3.1 0-5.6-2.4-5.6-5.5 0-3.3 2.9-5.8 6.5-5.4v2.9c-.4-.1-.8-.1-1.2-.1-1.5.1-2.5 1.2-2.5 2.7 0 1.5 1.1 2.6 2.6 2.6 1.7 0 2.8-1.2 2.8-3.2V3h3.9z",
  },
] as const;

const socialLinkClass =
  "flex h-[38px] w-[38px] items-center justify-center rounded-full border border-amber-light/40 text-amber-light transition-colors hover:bg-amber-light hover:text-ink";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="gutter-x mt-auto bg-ink pt-[clamp(48px,7vw,90px)] pb-9 text-cream"
    >
      <div className="shell flex flex-col gap-12">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-9">
          <div className="stagger-item flex flex-col gap-4">
            <span className="text-xl font-extrabold tracking-[0.06em]">
              <span className="text-amber-light">QLAND</span> PROPERTY
            </span>
            <p className="m-0 max-w-[30ch] text-[13.5px] leading-relaxed text-cream/65">
              Buying, building, and managing property across Brisbane and South East
              Queensland.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={socialLinkClass}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer noopener"
                className={socialLinkClass}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className="stagger-item flex flex-col gap-3 text-sm"
            style={{ transitionDelay: "110ms" }}
          >
            <span className="text-xs font-extrabold tracking-[0.16em] text-amber-light uppercase">
              About
            </span>
            <Link href="/#about" className={linkClass}>
              About us
            </Link>
            <Link href="/#difference" className={linkClass}>
              Our Difference
            </Link>
            <Link href="/#reviews" className={linkClass}>
              Reviews
            </Link>
            <Link href="/#about" className={linkClass}>
              FAQs
            </Link>
          </div>

          <div
            className="stagger-item flex flex-col gap-3 text-sm"
            style={{ transitionDelay: "220ms" }}
          >
            <span className="text-xs font-extrabold tracking-[0.16em] text-amber-light uppercase">
              Solutions
            </span>
            <Link href="/#services" className={linkClass}>
              House and Land
            </Link>
            <Link href="/#services" className={linkClass}>
              Buyers Agency
            </Link>
            <Link href="/#services" className={linkClass}>
              Property Management
            </Link>
            <Link href="/#services" className={linkClass}>
              Property Sales
            </Link>
          </div>

          <div
            className="stagger-item flex flex-col gap-3 text-sm"
            style={{ transitionDelay: "330ms" }}
          >
            <span className="text-xs font-extrabold tracking-[0.16em] text-amber-light uppercase">
              Get in touch
            </span>
            <a href={site.emailHref} className={linkClass}>
              {site.email}
            </a>
            <a href={site.phoneHref} className={linkClass}>
              {site.phone}
            </a>
            <span className="leading-relaxed text-cream/65">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.line3}
            </span>
          </div>
        </Reveal>

        <Reveal
          variant="fade"
          className="flex flex-wrap justify-between gap-3 border-t border-cream/15 pt-[22px] text-[12.5px] text-cream/55"
        >
          <span>©{new Date().getFullYear()} by QLAND</span>
          <span className="flex gap-5">
            <Link href="/#contact" className="hover:text-cream">
              Website terms of use
            </Link>
            <Link href="/#contact" className="hover:text-cream">
              Privacy Policy
            </Link>
          </span>
        </Reveal>
      </div>
    </footer>
  );
}

/** Slim footer used on the project page. */
export function ProjectFooter() {
  return (
    <footer className="gutter-x mt-auto bg-ink py-9 text-cream">
      <Reveal
        variant="fade"
        className="shell flex flex-wrap items-center justify-between gap-4"
      >
        <span className="text-base font-extrabold tracking-[0.06em]">
          <span className="text-amber-light">QLAND</span> PROPERTY
        </span>
        <span className="flex gap-5 text-[13px] font-semibold">
          <a href={site.emailHref} className={linkClass}>
            {site.email}
          </a>
          <a href={site.phoneHref} className={linkClass}>
            {site.phone}
          </a>
        </span>
        <span className="text-[12.5px] text-cream/55">
          ©{new Date().getFullYear()} by QLAND
        </span>
      </Reveal>
    </footer>
  );
}
