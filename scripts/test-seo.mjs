import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Window } from "happy-dom";
import { guides } from "../src/data/guides.ts";
import { allLabContent } from "../src/data/content.ts";

const host = "https://damaheritage.com";
const window = new Window();
const parse = (text, type = "text/html") => new window.DOMParser().parseFromString(text, type);
const read = (file) => fs.readFileSync(path.join("dist", file), "utf8");
const meta = (doc, key) => doc.querySelector(`meta[property="${key}"],meta[name="${key}"]`)?.getAttribute("content");
const schemas = (doc) => [...doc.querySelectorAll('script[type="application/ld+json"]')].map((el) => JSON.parse(el.textContent));
const bodyText = (doc) => doc.body?.textContent ?? "";
const fileFor = (route) => route === "/" ? "index.html" : route === "/404/" ? "404.html" : `${route.slice(1).replace(/\/$/, "")}/index.html`;
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const htmlFiles = walk("dist").filter((file) => file.endsWith(".html"));

const home = parse(read("index.html"));
check(home.querySelector("h1")?.textContent.includes("product photos"), "Content-first homepage heading");
check(!meta(home, "robots")?.includes("noindex"), "Homepage remains indexable");
check(!schemas(home).some((s) => s["@type"] === "WebApplication"), "Homepage is not tool-only schema");
const tool = parse(read("tools/image-prep/index.html"));
const app = schemas(tool).find((s) => s["@type"] === "WebApplication");
check(app?.offers.price === "0" && !app.aggregateRating && !app.review, "Truthful free app data without invented reviews");
const formatTool = parse(read("tools/format-compare/index.html"));
check(meta(formatTool, "robots")?.includes("noindex"), "Functional format tool is not treated as an editorial search landing page");
check(bodyText(formatTool).includes("same original file") && bodyText(formatTool).includes("not uploaded"), "Format tool explains a fair local comparison and privacy boundary");

const descriptions = new Set();
const titles = new Set();
for (const file of htmlFiles) {
  const doc = parse(fs.readFileSync(file, "utf8"));
  const route = new URL(doc.querySelector('link[rel="canonical"]').getAttribute("href")).pathname;
  check(doc.documentElement.lang === "en", `${route}: truthful language`);
  check(doc.querySelector('link[type="application/rss+xml"]')?.getAttribute("href") === "/rss.xml", `${route}: feed discovery`);
  check(doc.querySelectorAll("h1").length === 1, `${route}: one H1`);
  const description = meta(doc, "description");
  check(Boolean(description) && !descriptions.has(description), `${route}: unique description`);
  if (description) descriptions.add(description);
  const title = doc.querySelector("title")?.textContent;
  check(Boolean(title) && !titles.has(title), `${route}: unique title`);
  if (title) titles.add(title);
  const image = meta(doc, "og:image");
  if (image) {
    const location = new URL(image);
    check(location.origin === host && Boolean(meta(doc, "og:image:alt")), `${route}: local descriptive preview`);
    const imageFile = path.join("dist", location.pathname);
    check(fs.existsSync(imageFile), `${route}: preview image exists`);
  }
  for (const anchor of doc.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href");
    if (!href?.startsWith("/") || href.startsWith("//") || href.includes("#")) continue;
    const target = href.includes("?") ? href.split("?")[0] : href;
    const targetFile = target.endsWith(".xml") ? target.slice(1) : fileFor(target.endsWith("/") ? target : `${target}/`);
    check(fs.existsSync(path.join("dist", targetFile)), `${route}: missing link ${href}`);
  }
  const ids = [...doc.querySelectorAll("[id]")].map((el) => el.id);
  check(ids.length === new Set(ids).size, `${route}: duplicate IDs`);
  for (const label of doc.querySelectorAll("label[for]")) check(Boolean(doc.getElementById(label.htmlFor)), `${route}: broken label ${label.htmlFor}`);
}

const sitemap = parse(read("sitemap-0.xml"), "application/xml");
const feed = parse(read("rss.xml"), "application/xml");
check(!feed.querySelector("parsererror"), "Valid RSS");
check(feed.querySelectorAll("item").length === guides.length + allLabContent.length, "RSS contains all editorial content");
check(!sitemap.querySelector("parsererror"), "Valid sitemap XML");
const excluded = /rss\.xml|404|privacy|terms|contact|standards|updates|changelog|start-here|tools\/image-(prep|qa|format-compare)\//;
check(![...sitemap.querySelectorAll("loc")].some((el) => excluded.test(el.textContent)), "Only canonical indexable pages in sitemap");
for (const guide of guides) {
  const route = `/guides/${guide.slug}/`;
  const doc = parse(read(fileFor(route)));
  const data = schemas(doc);
  const article = data.find((s) => s["@type"] === "Article");
  const crumbs = data.find((s) => s["@type"] === "BreadcrumbList");
  check(article?.datePublished === guide.published && article?.dateModified === guide.updated, `${guide.slug}: article dates`);
  check(crumbs?.itemListElement.length === 3, `${guide.slug}: breadcrumbs`);
  check(doc.querySelectorAll('.article-toc a[href^="#section-"]').length === guide.sections.length, `${guide.slug}: section navigation`);
  check(bodyText(doc).includes("How this guide was made") && bodyText(doc).includes("Reference:"), `${guide.slug}: editorial disclosure and source`);
}
for (const item of allLabContent) {
  const base = item.type === "reference" ? "marketplace" : "experiments";
  const route = `/${base}/${item.slug}/`;
  const doc = parse(read(fileFor(route)));
  const data = schemas(doc);
  check(Boolean(data.find((s) => s["@type"] === "Article")), `${route}: article schema`);
  check(Boolean(data.find((s) => s["@type"] === "BreadcrumbList")), `${route}: breadcrumbs schema`);
  check(bodyText(doc).includes("Sources checked"), `${route}: source list`);
  if (item.evidence) check(bodyText(doc).includes("REPRODUCIBLE METHOD"), `${route}: evidence panel`);
}
const etsyReference = parse(read("marketplace/etsy/index.html"));
const etsyText = bodyText(etsyReference);
for (const phrase of ["does not list WebP", "2000 pixels wide and high", "635 pixels", "over 1 MB", "over 300 KB", "sRGB", "not a ranking promise"]) {
  check(etsyText.includes(phrase), `Etsy reference covers ${phrase}`);
}
for (const url of [
  "115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop",
  "25869947521175-How-to-Use-the-Etsy-Search-Visibility-Page",
  "115015628707-How-to-Create-a-Listing",
]) check(etsyReference.querySelector(`a[href*="${url}"]`), `Etsy reference cites ${url}`);
for (const route of ["tools/image-prep", "tools/image-qa"]) {
  const doc = parse(read(`${route}/index.html`));
  check(bodyText(doc).includes("does not include WebP"), `${route}: warns against assuming Etsy accepts WebP`);
}
check(bodyText(formatTool).includes("For Etsy"), "Format comparison page links its result to the destination requirements");
for (const guide of guides.filter((item) => item.relatedLab?.length)) {
  const doc = parse(read(fileFor(`/guides/${guide.slug}/`)));
  for (const related of guide.relatedLab ?? []) {
    check(Boolean(doc.querySelector(`a[href="${related.href}"]`)), `${guide.slug}: links to ${related.href}`);
  }
}
check(!read("robots.txt").includes("Disallow: /"), "Crawl access retained");
check(!fs.existsSync("functions") && !fs.existsSync("src/pages/api"), "Static-only deployment");
await window.happyDOM.close();
console.log(`SEO QA passed: ${checks} checks (content-first homepage, routes, metadata, schema, RSS and sitemap).`);
