import type { Metadata, Viewport } from "next";
import { wedding } from "@/config/wedding";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : wedding.site.url);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: wedding.site.title,
  description: wedding.site.description,
  applicationName: wedding.site.titleEn,
  openGraph: {
    type: "website",
    locale: wedding.site.locale,
    url: SITE_URL,
    siteName: wedding.site.titleEn,
    title: wedding.site.titleEn,
    description: wedding.site.description,
    images: [{ url: wedding.site.ogImage, width: 1200, height: 630, alt: wedding.site.titleEn, type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.site.titleEn,
    description: wedding.site.description,
    images: [wedding.site.ogImage],
  },
  icons: { icon: "/icon.svg" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2a0b10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preload" href="/fonts/tiro-devanagari-hindi.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cormorant-garamond.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/couple/hero-couple.jpg" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
