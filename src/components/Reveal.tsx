"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealTag = "div" | "section" | "article" | "aside" | "li" | "span";

type RevealProps = {
  children: ReactNode;
  /** Element the wrapper renders as. Use `section` so the anchor targets stay semantic. */
  as?: RevealTag;
  variant?: RevealVariant;
  /** Milliseconds held back before this element animates — used to stagger grids. */
  delay?: number;
  /**
   * How far into the viewport the element's top edge must travel before it
   * reveals, as a percentage of viewport height. Larger = later. Tall blocks
   * trigger on this; short ones usually hit the visible-fraction rule first.
   */
  offset?: number;
  /** Replay the animation each time the element re-enters the viewport. */
  repeat?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

/**
 * Scroll-triggered entrance wrapper.
 *
 * The hidden state ships in the server-rendered HTML, so there is no flash of
 * un-animated content; `globals.css` restores visibility for reduced-motion
 * users, and `layout.tsx` carries a `<noscript>` override for the no-JS case.
 * Children stay server components — only this wrapper hydrates.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  offset = 12,
  repeat = false,
  className = "",
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rect = entry.boundingClientRect;

          // `bottom < 0` means the element is already above the viewport — a
          // deep link to `#register`, or a restored scroll position. Reveal it
          // rather than leaving it invisible up there.
          if (rect.bottom < 0) {
            setVisible(true);
            if (!repeat) observer.unobserve(entry.target);
            continue;
          }

          // Two ways in, whichever lands first:
          //  • a quarter of the element is on screen — the natural trigger for
          //    cards and text blocks;
          //  • its top edge has climbed past the offset line — which is what
          //    catches blocks taller than the viewport.
          // The fraction rule is load-bearing for anything pinned to the end of
          // the document (the footer strip): scrolled all the way down, its top
          // edge never gets above the offset line, so that test alone would
          // leave it hidden forever.
          const reached =
            entry.intersectionRatio >= 0.25 ||
            rect.top < window.innerHeight * (1 - offset / 100);

          if (entry.isIntersecting && reached) {
            setVisible(true);
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat && !entry.isIntersecting) {
            setVisible(false);
          }
        }
      },
      { threshold: [0, 0.25, 0.6, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [offset, repeat]);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      id={id}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      className={`reveal reveal-${variant}${visible ? " is-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </Tag>
  );
}
