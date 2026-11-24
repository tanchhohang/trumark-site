// Build-time only. Package each crop with the wordmark so both are available
// when the matching stylesheet unblocks the first paint.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function image(filename: string, type: string) {
  const bytes = readFileSync(join(process.cwd(), "assets", filename));
  return `url("data:image/${type};base64,${bytes.toString("base64")}")`;
}
const mark = image("tma-mark.a7103cc11cad.png", "png");

function artwork(crop: string, file: string, media: string) {
  const css = `:root { --tma-mark: ${mark}; --rock: ${image(file, "webp")}; }\n`;
  const hash = createHash("sha256").update(css).digest("hex").slice(0, 12);
  return { filename: `${crop}.${hash}.css`, media, css };
}

export const openingStyles = [
  artwork("desktop-rock", "rock-desktop.005d15a0b259.webp", "(width > 700px)"),
  artwork("mobile-rock", "rock-mobile.3d4dd25ab5c5.webp", "(max-width: 700px)"),
];
