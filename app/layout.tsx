import type { Metadata } from "next";
import { openingState } from "../features/hero/opening-state";
import { openingStyles } from "../features/hero/opening-styles";
import "./globals.css";

// Set SITE_URL at build time (e.g. https://yourdomain.com). Share previews
// need an absolute image URL, so this must match the live domain.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.SITE_URL || process.env.CF_PAGES_URL ||
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
const title = "Trumark";
const searchTitle = "Trumark";
const description =
  "Trumark is a creative agency in Kathmandu, Nepal. We shape brand strategy, design visual identities and build websites and custom software. Explore our work.";
const shareImage = {
  url: "/assets/rock-share.dbf3429adddd.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Rock artwork from the Trumark homepage",
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
  title: searchTitle,
  description,
  verification: { google: "MvocZ_zEwNd8NTooYDecq_qQd86z9A9Q-8BoZbZyW_k" },
  openGraph: {
    type: "website",
    siteName: title,
    title,
    description,
    url: "/",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage],
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