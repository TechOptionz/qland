"use client";

import { useEffect, useRef, useState } from "react";

/** Pixels the loop drifts down over one full viewport of scrolling. */
const PARALLAX_RANGE = 120;

/**
 * Background loop for the home hero (`public/assets/brand-loop.mp4`).
 *
 * The video is treated as optional: if it fails to load, or the browser refuses
 * to play it, the element removes itself and the section's dark gradient
 * carries the hero on its own.
 *
 * While the hero is on screen the loop drifts down at a fraction of the scroll
 * speed, so the headline lifts away from the footage instead of moving with it.
 */
export default function HeroVideo({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    // Only run the transform while the hero is actually visible — once it is
    // scrolled past, the listener does nothing.
    let onScreen = true;

    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);
      el.style.transform = `translate3d(0, ${progress * PARALLAX_RANGE}px, 0) scale(1.12)`;
    };

    const schedule = () => {
      if (onScreen && !frame) frame = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        schedule();
      },
      { threshold: 0 },
    );
    observer.observe(el);

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  if (failed) return null;

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover will-change-transform motion-reduce:hidden"
    />
  );
}
