"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainLinks, serviceLinks } from "@/lib/site";
import logo from "../../public/assets/qland-logo.png";

/** Entries shown before the Services dropdown, and after it. */
const BEFORE = mainLinks.slice(0, 2); // Home, Our Difference
const AFTER = mainLinks.slice(2); // About Us, Reviews, Boutique Chevron Island

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const close = () => setMenuOpen(false);

  // "/" only matches itself; every other entry also matches its sub-paths.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const servicesActive = serviceLinks.some((link) => isActive(link.href));

  // Close the mobile menu when the route changes — otherwise it stays open
  // over the page the reader just navigated to.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Condense the bar once the page has moved, and drive the progress rail along
  // its bottom edge. Both read the same scroll position, so they share one
  // rAF-throttled listener; the rail is written straight to the DOM to keep the
  // per-frame work off React.
  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 8);

      const rail = progressRef.current;
      if (rail) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        rail.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const deskLink = (href: string) =>
    isActive(href)
      ? "text-amber-ink underline decoration-amber decoration-2 underline-offset-8"
      : "hover:text-amber-dark";

  return (
    <header
      className={`gutter-x sticky top-0 z-50 flex flex-wrap items-center justify-between gap-6 border-b border-line backdrop-blur-md transition-[padding,background-color,box-shadow] duration-300 ease-out ${
        scrolled
          ? "bg-cream/92 py-2 shadow-[0_10px_30px_rgba(22,19,14,0.08)]"
          : "bg-cream/95 py-3.5 shadow-none"
      }`}
    >
      {/* Reading progress. Anchored to the header's bottom border so it reads as
          the border filling in rather than a separate stripe. */}
      <div
        ref={progressRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left scale-x-0 bg-amber"
      />

      <Link href="/" className="flex items-center" aria-label="QLand Property home">
        <Image
          src={logo}
          alt="QLand Property"
          priority
          className={`w-auto transition-[height] duration-300 ease-out ${
            scrolled ? "h-10" : "h-12"
          }`}
        />
      </Link>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-line text-lg text-ink nav:hidden"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Desktop navigation */}
      <nav
        aria-label="Main"
        className="hidden items-center gap-[clamp(12px,1.6vw,24px)] text-[13.5px] font-semibold tracking-[0.02em] nav:flex"
      >
        {BEFORE.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={deskLink(link.href)}
          >
            {link.label}
          </Link>
        ))}

        {/* Hover/focus dropdown — CSS-only so it works before hydration. */}
        <div className="group relative">
          <button
            type="button"
            className={`flex cursor-pointer items-center gap-1.5 font-semibold group-hover:text-amber-dark ${
              servicesActive
                ? "text-amber-ink underline decoration-amber decoration-2 underline-offset-8"
                : ""
            }`}
            aria-haspopup="true"
          >
            Services
            <span aria-hidden className="text-[9px] text-muted-soft">
              ▼
            </span>
          </button>
          <div className="invisible absolute top-full -left-4 z-60 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
            <div className="flex min-w-[220px] flex-col gap-0.5 rounded-xl border border-line bg-white p-2 shadow-[0_16px_40px_rgba(22,19,14,0.12)]">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-lg px-3.5 py-2.5 whitespace-nowrap hover:bg-tint ${
                    isActive(link.href) ? "bg-tint text-amber-ink" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {AFTER.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={deskLink(link.href)}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/contact"
          className="rounded-full bg-amber px-[22px] py-[11px] font-bold text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Contact Us
        </Link>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="rise-in mt-3 flex basis-full flex-col gap-1 border-t border-line pt-2.5 pb-3.5 text-[15px] font-semibold [animation-duration:320ms] nav:hidden"
        >
          {BEFORE.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-[10px] px-2 py-3 ${isActive(link.href) ? "text-amber-ink" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <span className="px-2 pt-3 pb-1 text-[11px] font-extrabold tracking-[0.16em] text-muted-soft uppercase">
            Services
          </span>
          {serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-[10px] py-3 pr-2 pl-5 ${
                isActive(link.href) ? "text-amber-ink" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {AFTER.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-[10px] px-2 py-3 ${isActive(link.href) ? "text-amber-ink" : ""}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={close}
            className="mt-2.5 rounded-full bg-amber px-[22px] py-3.5 text-center font-bold text-ink"
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  );
}
