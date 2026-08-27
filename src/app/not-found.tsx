import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import TopBar from "@/components/TopBar";
import { SiteFooter } from "@/components/SiteFooter";
import { mainLinks, serviceLinks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <SiteHeader />

      <section className="gutter-x band-y bg-ink text-cream">
        <div className="shell flex flex-col items-start gap-[22px]">
          <span className="rise-in inline-flex items-center gap-2.5 rounded-full border border-amber-light/50 px-[18px] py-2 text-xs font-bold tracking-[0.18em] text-amber-light uppercase">
            404
          </span>
          <h1 className="rise-in m-0 max-w-[20ch] text-[clamp(28px,4.2vw,48px)] leading-[1.1] font-extrabold tracking-[-0.02em] [animation-delay:120ms]">
            We can’t find that page
          </h1>
          <p className="rise-in m-0 max-w-[48ch] text-[clamp(15px,1.3vw,18px)] leading-relaxed font-medium text-cream/85 [animation-delay:240ms]">
            The link may be out of date. Try one of the pages below, or call us on{" "}
            <a href={site.phoneHref} className="font-bold text-amber-light hover:text-cream">
              {site.phone}
            </a>
            .
          </p>
          <div className="rise-in mt-1 flex flex-wrap gap-2.5 [animation-delay:360ms]">
            {[...mainLinks, ...serviceLinks, { label: "Contact Us", href: "/contact" }].map(
              (link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="rounded-full border border-cream/25 px-[18px] py-2.5 text-[13px] font-semibold text-cream transition-colors hover:border-amber-light hover:text-amber-light"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
