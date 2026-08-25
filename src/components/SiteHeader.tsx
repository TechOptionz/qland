"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../public/assets/qland-logo.png";

type NavLink = { label: string; href: string };

const SERVICE_LINKS: NavLink[] = [
  { label: "House and Land", href: "/#services" },
  { label: "Buyers Agency", href: "/#services" },
  { label: "Property Management", href: "/#services" },
];

/**
 * `active` marks the page the header is rendered on, so the current entry
 * is highlighted the way it is in the design.
 */
export default function SiteHeader({
  active,
}: {
  active: "home" | "boutique";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  const isHome = active === "home";
  const contactHref = isHome ? "/#contact" : "#register";

  const mainLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Our Difference", href: "/#difference" },
    { label: "About Us", href: "/#about" },
    { label: "Reviews", href: "/#reviews" },
  ];

  return (
    <header className="gutter-x sticky top-0 z-50 flex flex-wrap items-center justify-between gap-6 border-b border-line bg-cream/95 py-3.5 backdrop-blur-md">
      <Link href="/" className="flex items-center" aria-label="QLand Property home">
        <Image src={logo} alt="QLand Property" priority className="h-12 w-auto" />
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
      <nav className="hidden items-center gap-[clamp(14px,2vw,28px)] text-[13.5px] font-semibold tracking-[0.02em] nav:flex">
        <Link href="/" className={isHome ? "text-amber-dark" : "hover:text-amber-dark"}>
          Home
        </Link>
        <Link href="/#difference" className="hover:text-amber-dark">
          Our Difference
        </Link>

        {/* Hover/focus dropdown — CSS-only so it works before hydration. */}
        <div className="group relative">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1.5 font-semibold group-hover:text-amber-dark"
            aria-haspopup="true"
          >
            Services
            <span aria-hidden className="text-[9px] text-muted-soft">
              ▼
            </span>
          </button>
          <div className="invisible absolute top-full -left-4 z-60 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
            <div className="flex min-w-[220px] flex-col gap-0.5 rounded-xl border border-line bg-white p-2 shadow-[0_16px_40px_rgba(22,19,14,0.12)]">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3.5 py-2.5 whitespace-nowrap hover:bg-tint"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link href="/#about" className="hover:text-amber-dark">
          About Us
        </Link>
        <Link href="/#reviews" className="hover:text-amber-dark">
          Reviews
        </Link>
        <Link
          href="/boutique-chevron-island"
          className={active === "boutique" ? "text-amber-dark" : "hover:text-amber-dark"}
        >
          Boutique Chevron Island
        </Link>
        <Link
          href={contactHref}
          className="rounded-full bg-amber px-[22px] py-[11px] font-bold text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Contact Us
        </Link>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="mt-3 flex basis-full flex-col gap-1 border-t border-line pt-2.5 pb-3.5 text-[15px] font-semibold nav:hidden"
        >
          {mainLinks.slice(0, 2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className={`rounded-[10px] px-2 py-3 ${
                link.label === "Home" && isHome ? "text-amber-dark" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          <span className="px-2 pt-3 pb-1 text-[11px] font-extrabold tracking-[0.16em] text-muted-soft uppercase">
            Services
          </span>
          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className="rounded-[10px] py-3 pr-2 pl-5"
            >
              {link.label}
            </Link>
          ))}

          {mainLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className="rounded-[10px] px-2 py-3"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/boutique-chevron-island"
            onClick={close}
            className={`rounded-[10px] px-2 py-3 ${
              active === "boutique" ? "text-amber-dark" : ""
            }`}
          >
            Boutique Chevron Island
          </Link>
          <Link
            href={contactHref}
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
