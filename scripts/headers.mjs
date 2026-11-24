// Cloudflare Pages reads this file from the export root. Next's inline bootstrap
// varies per build, so calculate its hashes only after static export completes.
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const hashes = { script: new Set(), style: new Set() };
for (const file of await readdir("out", { recursive: true })) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(join("out", file), "utf8");
  for (const [, tag, attributes, content] of html.matchAll(
    /<(script|style)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
  )) {
    if (!content || /\bsrc\s*=/.test(attributes)) continue;
    hashes[tag].add(
      `'sha256-${createHash("sha256").update(content).digest("base64")}'`,
    );
  }
}
const policy = [
  "default-src 'none'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "connect-src 'none'",
  "img-src 'self' data:",
  "font-src 'self'",
  ["script-src", "'self'", ...hashes.script].join(" "),
  ["style-src", "'self'", ...hashes.style].join(" "),
  "style-src-attr 'unsafe-inline'",
].join("; ");
const headers = `/*
  Content-Security-Policy: ${policy}
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Cache-Control: no-cache

/_next/static/*
  ! Cache-Control
  Cache-Control: public, max-age=31536000, immutable

/opening/*
  ! Cache-Control
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  ! Cache-Control
  Cache-Control: public, max-age=31536000, immutable
`;
if (headers.split("\n").some((line) => line.length > 2000))
  throw Error("Cloudflare Pages header line exceeds 2000 characters");
await writeFile("out/_headers", headers);
console.log(
  "Generated static headers with",
  hashes.script.size,
  "script hashes.",
);
