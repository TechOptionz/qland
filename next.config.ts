import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
    // AVIF first, WebP behind it. The gallery and hero photographs are the
    // heaviest thing on every page, so the format matters to LCP and therefore
    // to ranking.
    formats: ["image/avif", "image/webp"],
    // The Wix source URLs are content-addressed and never change under the same
    // path, so the optimiser can hold each variant for a year.
    minimumCacheTTL: 31536000,
  },
  // Nothing reads it and it advertises the stack to scanners.
  poweredByHeader: false,
};

export default nextConfig;
