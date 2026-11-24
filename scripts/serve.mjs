// Local static preview with the same ordered _headers rules as the host.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
async function readRules() {
  const rules = [];
  for (const line of (await readFile(resolve(root, "_headers"), "utf8")).split(
    "\n",
  )) {
    if (!line.trim()) continue;
    if (line.startsWith("/")) rules.push({ pattern: line.trim(), headers: [] });
    else rules.at(-1).headers.push(line.trim());
  }
  return rules;
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".rtf": "application/rtf",
  ".ico": "image/x-icon",
};
const server = createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const url = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = resolve(root, `.${url}`, url.endsWith("/") ? "index.html" : "");
    if (!file.startsWith(root + sep) || url === "/_headers") {
      res.writeHead(404).end();
      return;
    }
    for (const { pattern, headers } of await readRules()) {
      if (
        !(pattern.endsWith("*")
          ? url.startsWith(pattern.slice(0, -1))
          : url === pattern)
      )
        continue;
      for (const header of headers) {
        if (header.startsWith("! ")) res.removeHeader(header.slice(2));
        else {
          const colon = header.indexOf(":");
          res.setHeader(header.slice(0, colon), header.slice(colon + 1).trim());
        }
      }
    }
    if (!(await stat(file).catch(() => null))?.isFile()) {
      res.statusCode = 404;
      res.setHeader("Cache-Control", "no-cache");
      file = resolve(root, "404.html");
    }
    res.setHeader(
      "Content-Type",
      types[extname(file)] ?? "application/octet-stream",
    );
    res.setHeader("Content-Length", (await stat(file)).size);
    if (req.method === "HEAD") res.end();
    else
      createReadStream(file)
        .on("error", () => res.destroy())
        .pipe(res);
  } catch {
    res.writeHead(400).end();
  }
});
server.listen(Number(process.env.PORT || 4173), "127.0.0.1", () => {
  console.log(
    `Serving static export at http://127.0.0.1:${server.address().port}`,
  );
});
