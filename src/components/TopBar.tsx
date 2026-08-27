import { site } from "@/lib/site";

/**
 * The address / phone / email strip above the header. Hidden on narrow screens,
 * as in the design — the same details are repeated in the footer.
 */
export default function TopBar() {
  return (
    <div className="gutter-x hidden flex-wrap justify-between gap-x-6 gap-y-2 bg-ink py-2 text-xs font-medium tracking-[0.04em] text-cream sm:flex">
      <span>{site.address.inline}</span>
      <span className="flex gap-5">
        <a href={site.phoneHref} className="text-amber-light hover:text-cream">
          {site.phone}
        </a>
        <a href={site.emailHref} className="text-amber-light hover:text-cream">
          {site.email}
        </a>
      </span>
    </div>
  );
}
