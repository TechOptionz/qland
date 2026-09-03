import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";
import { photos, site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const DESCRIPTION =
  "Buying, building, and managing property across Brisbane and South East Queensland. Fixed-price, full-turnkey homes and expert buyers agency support.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "QLand Property · Buyer Centric Agency",
    template: "%s · QLand Property",
  },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: "QLand Property Group",
  category: "Real Estate",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
    url: "/",
    title: "QLand Property · Buyer Centric Agency",
    description:
      "A seamless home buying journey. QLand delivers expert support through buying, renting, and long-term property management.",
    images: [
      {
        url: photos.facadeDuskDark,
        width: 1600,
        height: 1600,
        alt: "A completed QLand home photographed at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QLand Property · Buyer Centric Agency",
    description:
      "A seamless home buying journey. QLand delivers expert support through buying, renting, and long-term property management.",
    images: [photos.facadeDuskDark],
  },
  // `max-image-preview:large` is what lets Google use the full-width photo in
  // results and Discover; without it the site is capped at a thumbnail.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Stops iOS Safari from auto-linking (and restyling) the address and phone
  // numbers in the top bar and footer, which are already real links.
  formatDetection: { telephone: false, address: false, email: false },
  icons: { icon: "/assets/qland-logo.png", apple: "/assets/qland-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#16130E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={montserrat.variable}>
      <head>
        {/* The gallery and hero photography is served from Wix. Warming the
            connection early shaves a round trip off the largest paint. */}
        <link rel="preconnect" href="https://static.wixstatic.com" />
        <link rel="dns-prefetch" href="https://static.wixstatic.com" />
        {/* Business, site, and review nodes — emitted once, referenced by `@id`
            from every page's own graph. */}
        <JsonLd data={siteGraph} />
      </head>
      <body>
        {/* Scroll reveals start hidden in the HTML. Without JS the observer
            never runs, so force everything visible for those readers. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
