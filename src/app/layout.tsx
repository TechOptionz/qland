import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qland.com.au"),
  title: {
    default: "QLand Property — Buyer Centric Agency",
    template: "%s · QLand Property",
  },
  description:
    "Buying, building, and managing property across Brisbane and South East Queensland. Fixed-price, full-turnkey homes and expert buyers agency support.",
  openGraph: {
    type: "website",
    siteName: "QLand Property",
    title: "QLand Property — Buyer Centric Agency",
    description:
      "A seamless home buying journey. QLand delivers expert support through buying, renting, and long-term property management.",
  },
  icons: { icon: "/assets/qland-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#16130E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={montserrat.variable}>
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
