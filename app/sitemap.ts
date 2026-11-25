import type { MetadataRoute } from "next";

// Required for `output: "export"`: emits out/sitemap.xml at build time.
export const dynamic = "force-static";

// Same resolution as app/layout.tsx, so set SITE_URL at build time.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.SITE_URL || process.env.CF_PAGES_URL ||
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", siteUrl).href }];
}
