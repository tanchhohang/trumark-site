import type { Metadata } from "next";
import { openingState } from "../features/hero/opening-state";
import { openingStyles } from "../features/hero/opening-styles";
import "./globals.css";

// Set SITE_URL at build time (e.g. https://yourdomain.com). Share previews
// need an absolute image URL, so this must match the live domain.
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const title = "Trumark";
const description =
  "Trumark is a creative and technology partner specialising in branding, custom software, and backend systems.";
const shareImage = {
  url: "/assets/og-image.92791006f52b.jpg",
  width: 1200,
  height: 1200,
  alt: "Trumark Agency",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: {
      url: "/assets/favicon.ba011fa9694c.png",
      type: "image/png",
      sizes: "256x256",
    },
    apple: "/assets/apple-touch-icon.86ddef2711c2.png",
  },
  title,
  description,
  openGraph: {
    type: "website",
    siteName: title,
    title,
    description,
    url: "/",
    images: [shareImage],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [shareImage.url],
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script>{openingState}</script>
        <link
          rel="preload"
          as="font"
          type="font/ttf"
          href="/assets/space-grotesk.697a7905c71f.ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/assets/alte-haas.3523ae4c0729.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/assets/manrope.a30ddcd34970.woff2"
          crossOrigin="anonymous"
        />
        {openingStyles.map(({ filename, media }) => (
          <link
            key={filename}
            rel="stylesheet"
            href={`/opening/${filename}`}
            media={media}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}