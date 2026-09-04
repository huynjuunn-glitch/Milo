import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const failures = [];
const expectedToolCount = 13;
const expectedGuideCount = 6;
const publisherId = 'ca-pub-5504483871402657';
const requiredRoutes = new Set(['/', '/tools/', '/guides/', '/about/', '/standards/', '/changelog/', '/contact/', '/privacy/', '/terms/', '/404/']);
const excludedFromSitemap = new Set(['/404/', '/contact/', '/privacy/', '/terms/']);

if (!fs.existsSync(root)) {
  console.error('dist/ does not exist. Run npm run build first.');
  process.exit(1);
}

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(target) : [target];
});

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const outputPaths = new Set(files.map((file) => `/${path.relative(root, file).replaceAll('\\', '/')}`));
const routeForFile = (file) => {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative.replace(/\.html$/, '/')}`;
};
const routes = new Set(htmlFiles.map(routeForFile));
const toolRoutes = [...routes].filter((route) => route.startsWith('/tools/') && route !== '/tools/');
const guideRoutes = [...routes].filter((route) => route.startsWith('/guides/') && route !== '/guides/');
const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/.test(file));
const sitemapUrls = new Set(sitemapFiles.flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname)));

for (const route of requiredRoutes) if (!routes.has(route)) failures.push(`Missing required route: ${route}`);
for (const route of excludedFromSitemap) if (sitemapUrls.has(route)) failures.push(`Excluded route appears in sitemap: ${route}`);
if (toolRoutes.length !== expectedToolCount) failures.push(`Expected ${expectedToolCount} calculator pages, found ${toolRoutes.length}.`);
if (guideRoutes.length !== expectedGuideCount) failures.push(`Expected ${expectedGuideCount} guide pages, found ${guideRoutes.length}.`);

const adsTextPath = path.join(root, 'ads.txt');
if (!fs.existsSync(adsTextPath) || !fs.readFileSync(adsTextPath, 'utf8').includes(`google.com, pub-${publisherId.replace('ca-pub-', '')}, DIRECT`)) {
  failures.push('ads.txt is missing or has the wrong publisher record.');
}

let jsonLdCount = 0;
let adsenseScriptCount = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/g) || []).length;
  const descriptions = html.match(/<meta[^>]+name="description"[^>]+content="[^"]+"/g) || [];
  const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  const publisherTags = html.match(new RegExp(`<meta[^>]+name="google-adsense-account"[^>]+content="${publisherId}"`, 'g')) || [];
  if (h1Count !== 1) failures.push(`${route} has ${h1Count} h1 elements.`);
  if (descriptions.length !== 1) failures.push(`${route} has ${descriptions.length} meta descriptions.`);
  if (canonicals.length !== 1) failures.push(`${route} has ${canonicals.length} canonical links.`);
  if (canonicals.length === 1) {
    const canonical = new URL(canonicals[0]);
    if (canonical.origin !== 'https://damaheritage.com' || canonical.pathname !== route) failures.push(`${route} has an unexpected canonical: ${canonicals[0]}`);
  }
  if (publisherTags.length !== 1) failures.push(`${route} has ${publisherTags.length} valid AdSense publisher tags.`);
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    jsonLdCount += 1;
    try { JSON.parse(match[1]); } catch (error) { failures.push(`${route} has invalid JSON-LD: ${error.message}`); }
  }
  const pageAdsScripts = html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g) || [];
  adsenseScriptCount += pageAdsScripts.length;
  if (route.startsWith('/tools/') && route !== '/tools/') {
    if (!html.includes('data-calculator=')) failures.push(`${route} is missing calculator markup.`);
    if (!html.includes('Calculation method') || !html.includes('Assumptions and limitations')) failures.push(`${route} is missing supporting method content.`);
    if (!html.includes('Verified ') || !html.includes('Testing standard')) failures.push(`${route} is missing its public verification record.`);
    if (!html.includes('Reference foundation') || !html.includes('target="_blank"')) failures.push(`${route} is missing primary references.`);
  }
  if (route.startsWith('/guides/') && route !== '/guides/') {
    if (!html.includes('How this guide was made')) failures.push(`${route} is missing its editorial disclosure.`);
    if (!html.includes('Primary references') || !html.includes('target="_blank"')) failures.push(`${route} is missing primary references.`);
  }

  const localTargets = [
    ...html.matchAll(/href="([^"#?]+)"/g),
    ...html.matchAll(/src="([^"#?]+)"/g),
  ].map((match) => match[1]);
  for (const href of localTargets) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(href) || !href.startsWith('/')) continue;
    let target = href.replace(/\/{2,}/g, '/');
    if (path.extname(target)) {
      if (!outputPaths.has(target)) failures.push(`${route} links to missing asset ${target}`);
    } else {
      if (!target.endsWith('/')) target += '/';
      if (!routes.has(target)) failures.push(`${route} links to missing route ${target}`);
    }
  }
}

if (adsenseScriptCount !== 0) failures.push(`Build contains ${adsenseScriptCount} AdSense script references; expected 0 before consent setup.`);
if (jsonLdCount < htmlFiles.length * 2) failures.push(`Only ${jsonLdCount} JSON-LD blocks were found across ${htmlFiles.length} pages.`);
if (sitemapUrls.size !== routes.size - excludedFromSitemap.size) failures.push(`Expected ${routes.size - excludedFromSitemap.size} sitemap URLs, found ${sitemapUrls.size}.`);

if (failures.length) {
  console.error(`Site QA failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site QA passed: ${htmlFiles.length} HTML pages, ${toolRoutes.length} calculators, ${guideRoutes.length} guides, ${sitemapUrls.size} sitemap URLs and ${jsonLdCount} JSON-LD blocks.`);
