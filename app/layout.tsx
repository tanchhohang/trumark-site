import type { Metadata } from "next";
import { openingState } from "../features/hero/opening-state";
import { openingStyles } from "../features/hero/opening-styles";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: "data:," },
  title: "Trumark — Design and development",
  description:
    "Trumark is a creative and technology partner specialising in branding, custom software, and backend systems.",
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
