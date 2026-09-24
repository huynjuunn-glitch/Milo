import fs from "node:fs";
import path from "node:path";
const root = path.resolve("dist");
const failures = [];
const requireCondition = (condition, message) => {
  if (!condition) failures.push(message);
};
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
const files = walk(root);
const html = files.filter((f) => f.endsWith(".html"));
const paths = new Set(
  files.map((f) => "/" + path.relative(root, f).replaceAll("\\", "/")),
);
const routeFor = (f) => {
  const p = path.relative(root, f).replaceAll("\\", "/");
  return p === "index.html"
    ? "/"
    : p === "404.html"
      ? "/404/"
      : "/" + p.replace(/index\.html$/, "").replace(/\.html$/, "/");
};
const routes = new Set(html.map(routeFor));
const expected = [
  "/",
  "/start-here/",
  "/guides/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/standards/",
  "/changelog/",
  "/updates/",
  "/methodology/",
  "/marketplace/",
  "/marketplace/etsy/",
  "/marketplace/shopify/",
  "/experiments/",
  "/experiments/jpg-png-webp/",
  "/experiments/crop-geometry/",
  "/experiments/browser-limits/",
  "/tools/",
  "/tools/image-prep/",
  "/tools/image-qa/",
  "/tools/format-compare/",
  "/404/",
  "/guides/fit-vs-fill/",
  "/guides/thumbnail-crop-checklist/",
  "/guides/consistent-product-grid/",
  "/guides/file-size-and-quality/",
  "/guides/product-photo-workflow/",
  "/guides/browser-image-troubleshooting/",
];
requireCondition(
  routes.size === expected.length,
  `Expected ${expected.length} pages, found ${routes.size}`,
);
for (const r of expected) requireCondition(routes.has(r), `Missing route ${r}`);
const excluded = new Set([
  "/404/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/standards/",
  "/updates/",
  "/changelog/",
  "/start-here/",
  "/tools/image-prep/",
  "/tools/image-qa/",
  "/tools/format-compare/",
]);
const sitemap = new Set(
  files
    .filter((f) => /sitemap-\d+\.xml$/.test(f))
    .flatMap((f) =>
      [...fs.readFileSync(f, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(
        (m) => new URL(m[1]).pathname,
      ),
    ),
);
for (const route of routes)
  requireCondition(
    sitemap.has(route) !== excluded.has(route),
    `Sitemap inclusion wrong: ${route}`,
  );
const descriptions = new Set();
const titles = new Set();
let jsonCount = 0;
for (const file of html) {
  const text = fs.readFileSync(file, "utf8"),
    route = routeFor(file);
  requireCondition(
    (text.match(/<h1(?:\s[^>]*)?>/g) || []).length === 1,
    `${route}: H1 count`,
  );
  const desc = [
    ...text.matchAll(/<meta[^>]+name="description"[^>]+content="([^"]+)"/g),
  ];
  requireCondition(desc.length === 1, `${route}: description count`);
  if (desc[0]) {
    requireCondition(
      !descriptions.has(desc[0][1]),
      `${route}: duplicate description`,
    );
    descriptions.add(desc[0][1]);
  }
  const title = text.match(/<title>(.*?)<\/title>/)?.[1];
  requireCondition(
    title && !titles.has(title),
    `${route}: duplicate/missing title`,
  );
  titles.add(title);
  const canonical = [
    ...text.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g),
  ];
  requireCondition(
    canonical.length === 1 &&
      canonical[0][1] === `https://damaheritage.com${route}`,
    `${route}: canonical`,
  );
  requireCondition(
    text.includes("ca-pub-5504483871402657"),
    `${route}: publisher meta`,
  );
  requireCondition(
    !/adsbygoogle\.js|googletagmanager|cloudflareinsights\.com/.test(text),
    `${route}: unexpected ad/analytics script`,
  );
  requireCondition(!text.includes("innerHTML"), `${route}: unsafe HTML interpolation`);
  requireCondition(
    !/Dama Workshop|board feet|data-calculator|Workshop Guides|Dama Image Prep/.test(text),
    `${route}: retired content`,
  );
  if (excluded.has(route))
    requireCondition(
      text.includes("noindex, follow"),
      `${route}: expected noindex`,
    );
  else
    requireCondition(
      text.includes("index, follow, max-image-preview:large"),
      `${route}: expected indexable page`,
    );
  for (const m of text.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      JSON.parse(m[1]);
      jsonCount++;
    } catch {
      failures.push(`${route}: invalid JSON-LD`);
    }
  }
  for (const m of text.matchAll(/(?:href|src)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    const target = m[1];
    if (!target.startsWith("/") || target.startsWith("//")) continue;
    requireCondition(
      path.extname(target)
        ? paths.has(target)
        : routes.has(target.endsWith("/") ? target : target + "/"),
      `${route}: missing link ${target}`,
    );
  }
  const ids = [...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  requireCondition(ids.length === new Set(ids).size, `${route}: duplicate IDs`);
  for (const m of text.matchAll(/<label[^>]*for="([^"]+)"/g))
    requireCondition(ids.includes(m[1]), `${route}: broken label ${m[1]}`);
  if (
    (route.startsWith("/guides/") && route !== "/guides/") ||
    (route.startsWith("/marketplace/") && route !== "/marketplace/") ||
    (route.startsWith("/experiments/") && route !== "/experiments/")
  ) {
    requireCondition(
      route.startsWith("/guides/")
        ? text.includes("How this guide was made")
        : text.includes("Sources checked"),
      `${route}: editorial/source disclosure`,
    );
    if (route.startsWith("/guides/"))
      requireCondition(text.includes("Reference:"), `${route}: source`);
  }
}
requireCondition(jsonCount >= html.length * 2, "Missing structured data");
requireCondition(
  fs
    .readFileSync(path.join(root, "ads.txt"), "utf8")
    .includes("pub-5504483871402657"),
  "Publisher ads.txt",
);
requireCondition(
  fs
    .readFileSync(path.join(root, "robots.txt"), "utf8")
    .includes("https://damaheritage.com/sitemap-index.xml"),
  "Robots sitemap",
);
requireCondition(
  !files.some((f) => /social-card|calculators/.test(f)),
  "Retired generated assets",
);
const source = fs.readFileSync("src/scripts/workspace.ts", "utf8");
requireCondition(
  !/fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(source),
  "Image workspace contains a network transport",
);
requireCondition(
  !fs.existsSync("functions") && !fs.existsSync("src/pages/api"),
  "Unexpected server functions",
);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Site QA passed: ${html.length} pages, ${sitemap.size} sitemap URLs, ${jsonCount} valid schema blocks, internal links and labels, static-only workspace.`,
);
