"use client";

import { useState } from "react";

/**
 * Background loop for the home hero (`public/assets/brand-loop.mp4`).
 *
 * The video is treated as optional: if it fails to load, or the browser refuses
 * to play it, the element removes itself and the section's dark gradient
 * carries the hero on its own.
 */
export default function HeroVideo({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
    />
  );
}
