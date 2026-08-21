import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const expectedDrafts = new Set([
  'gyeongbokgung-first-visit',
  'seoul-palace-comparison',
  'seoul-palace-one-day-route',
  'how-to-read-korean-palace-architecture',
  'jongmyo-shrine-first-visit',
  'gyeongju-without-car',
  'gyeongju-central-heritage-walk',
  'bulguksa-seokguram-visit',
  'korean-temple-etiquette',
  'how-to-read-korean-temple',
  'korea-heritage-trip-planning-checklist',
  'using-korean-maps-for-heritage-sites',
]);
const requiredRoutes = new Set([
  '/', '/start-here/', '/seoul-palaces/', '/gyeongju/', '/korean-temples/',
  '/visit/', '/culture/', '/tools/', '/about/', '/contact/', '/privacy/', '/terms/',
]);
const sitemapExcluded = new Set(['/404/', '/contact/', '/privacy/', '/terms/']);
const ignoredProtocols = /^(?:https?:|mailto:|tel:|data:|javascript:)/;
const failures = [];

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
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative.replace(/\.html$/, '/')}`;
};
const routes = new Set(htmlFiles.map(routeForFile));

for (const required of requiredRoutes) {
  if (!routes.has(required)) failures.push(`Missing required route: ${required}`);
}

const draftFiles = fs.readdirSync(path.resolve('src/content/guides')).filter((file) => file.endsWith('.md'));
const draftIds = new Set(draftFiles.map((file) => file.replace(/\.md$/, '')));
for (const id of expectedDrafts) {
  if (!draftIds.has(id)) failures.push(`Missing guide source file: ${id}.md`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/g) || []).length;
  const canonicalCount = (html.match(/<link[^>]+rel=["']canonical["']/g) || []).length;
  if (h1Count !== 1) failures.push(`${route} has ${h1Count} h1 elements.`);
  if (canonicalCount !== 1) failures.push(`${route} has ${canonicalCount} canonical links.`);

  for (const match of html.matchAll(/href=["']([^"'#?]+)["']/g)) {
    const href = match[1];
    if (ignoredProtocols.test(href) || !href.startsWith('/')) continue;
    let target = href.replace(/\/+/g, '/');
    if (path.extname(target)) {
      if (!outputPaths.has(target)) failures.push(`${route} links to missing asset ${target}`);
      continue;
    }
    if (!target.endsWith('/')) target += '/';
    if (!routes.has(target)) failures.push(`${route} links to missing route ${target}`);
  }
}

for (const id of expectedDrafts) {
  if (routes.has(`/guides/${id}/`)) failures.push(`Draft guide leaked into public output: ${id}`);
}

const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/.test(file));
const sitemapUrls = new Set(sitemapFiles.flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname)));
for (const route of sitemapExcluded) {
  if (sitemapUrls.has(route)) failures.push(`Excluded route appears in sitemap: ${route}`);
}
for (const id of expectedDrafts) {
  if (sitemapUrls.has(`/guides/${id}/`)) failures.push(`Draft guide appears in sitemap: ${id}`);
}

if (failures.length > 0) {
  console.error(`Site QA failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site QA passed: ${htmlFiles.length} HTML pages, ${sitemapUrls.size} sitemap URLs, ${draftFiles.length} private guide drafts.`);
