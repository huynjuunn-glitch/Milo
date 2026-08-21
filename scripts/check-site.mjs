import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const contentRoot = path.resolve('src/content/guides');
const publicRoot = path.resolve('public');
const publisherId = 'ca-pub-5504483871402657';
const expectedGuides = new Set([
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
const requiredBaseRoutes = new Set([
  '/', '/start-here/', '/seoul-palaces/', '/gyeongju/', '/korean-temples/',
  '/visit/', '/culture/', '/tools/', '/about/', '/contact/', '/privacy/', '/terms/',
]);
const sitemapExcluded = new Set(['/404/', '/contact/', '/privacy/', '/terms/']);
const accessibleTableRoutes = new Set([
  '/guides/seoul-palace-comparison/',
  '/guides/how-to-read-korean-temple/',
  '/guides/using-korean-maps-for-heritage-sites/',
  '/guides/korea-heritage-trip-planning-checklist/',
]);
const expectedRedirects = new Map([
  ['/guides/first-trip-korea-checklist', '/guides/korea-heritage-trip-planning-checklist/'],
  ['/guides/first-trip-korea-checklist/', '/guides/korea-heritage-trip-planning-checklist/'],
  ['/guides/naver-map-for-foreigners', '/guides/using-korean-maps-for-heritage-sites/'],
  ['/guides/naver-map-for-foreigners/', '/guides/using-korean-maps-for-heritage-sites/'],
]);
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
const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/.test(file));
const sitemapUrls = new Set(sitemapFiles.flatMap((file) => [...fs.readFileSync(file, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname)));
const adsTextPath = path.join(root, 'ads.txt');
if (!fs.existsSync(adsTextPath) || !fs.readFileSync(adsTextPath, 'utf8').includes(`google.com, pub-${publisherId.replace('ca-pub-', '')}, DIRECT`)) {
  failures.push('ads.txt is missing or does not contain the expected publisher record.');
}

const publicRedirectsPath = path.join(publicRoot, '_redirects');
const builtRedirectsPath = path.join(root, '_redirects');
if (!fs.existsSync(publicRedirectsPath) || !fs.existsSync(builtRedirectsPath)) {
  failures.push('Cloudflare _redirects is missing from public/ or dist/.');
} else {
  const publicRedirects = fs.readFileSync(publicRedirectsPath, 'utf8');
  const builtRedirects = fs.readFileSync(builtRedirectsPath, 'utf8');
  if (publicRedirects !== builtRedirects) failures.push('Built _redirects does not match public/_redirects.');
  const redirectRules = publicRedirects.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/));
  const firstWildcardIndex = redirectRules.findIndex(([source]) => source.includes('*') || source.includes(':'));
  for (const [source, destination] of expectedRedirects) {
    const ruleIndex = redirectRules.findIndex(([candidate]) => candidate === source);
    const rule = redirectRules[ruleIndex];
    if (!rule || rule[1] !== destination || rule[2] !== '301') {
      failures.push(`Missing exact 301 redirect: ${source} -> ${destination}`);
    }
    if (firstWildcardIndex !== -1 && ruleIndex > firstWildcardIndex) {
      failures.push(`Exact redirect must appear before wildcard rules: ${source}`);
    }
  }
}

for (const required of requiredBaseRoutes) {
  if (!routes.has(required)) failures.push(`Missing required route: ${required}`);
}
for (const route of sitemapExcluded) {
  if (sitemapUrls.has(route)) failures.push(`Excluded route appears in sitemap: ${route}`);
}

let adsenseScriptCount = 0;
let adsenseUnitCount = 0;
let jsonLdCount = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/g) || []).length;
  const canonicals = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/g)].map((match) => match[1]);
  const canonicalCount = canonicals.length;
  const descriptionCount = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/g) || []).length;
  const publisherMetaCount = (html.match(new RegExp(`<meta[^>]+name=["']google-adsense-account["'][^>]+content=["']${publisherId}["']`, 'g')) || []).length;
  if (h1Count !== 1) failures.push(`${route} has ${h1Count} h1 elements.`);
  if (canonicalCount !== 1) failures.push(`${route} has ${canonicalCount} canonical links.`);
  if (canonicalCount === 1) {
    const canonical = new URL(canonicals[0]);
    if (canonical.origin !== 'https://damaheritage.com' || canonical.pathname !== route) failures.push(`${route} has an unexpected canonical URL: ${canonicals[0]}`);
  }
  if (descriptionCount !== 1) failures.push(`${route} has ${descriptionCount} meta descriptions.`);
  if (publisherMetaCount !== 1) failures.push(`${route} has ${publisherMetaCount} valid AdSense publisher meta tags.`);

  const pageAdsenseScripts = (html.match(/<script[^>]+src=["'][^"']*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"']*["']/gi) || []).length;
  const pageAdsenseUnits = (html.match(/class=["'][^"']*adsbygoogle[^"']*["']/gi) || []).length;
  adsenseScriptCount += pageAdsenseScripts;
  adsenseUnitCount += pageAdsenseUnits;

  const structuredData = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdCount += 1;
    try {
      structuredData.push(JSON.parse(match[1]));
    } catch (error) {
      failures.push(`${route} has invalid JSON-LD: ${error.message}`);
    }
  }
  if (structuredData.length < 2) failures.push(`${route} is missing global WebSite or Organization JSON-LD.`);
  if (route.startsWith('/guides/')) {
    const article = structuredData.find((item) => item['@type'] === 'Article');
    const breadcrumb = structuredData.find((item) => item['@type'] === 'BreadcrumbList');
    if (!article) failures.push(`${route} is missing Article JSON-LD.`);
    if (!breadcrumb) failures.push(`${route} is missing BreadcrumbList JSON-LD.`);
    if (article?.author?.name !== 'Dama Korea') failures.push(`${route} has an unexpected Article author.`);
    if (!article?.datePublished || !article?.dateModified || !article?.image) failures.push(`${route} has incomplete Article dates or image metadata.`);
    if (pageAdsenseScripts !== 0 || pageAdsenseUnits !== 0) failures.push(`${route} must not load or render ads before CMP setup.`);
    if (!html.includes('<span>Visual: Dama Korea · Original AI-assisted editorial SVG; rights reserved to the extent permitted by law</span>')) {
      failures.push(`${route} is missing the required visual disclosure.`);
    }
    const fullSizeLinks = [...html.matchAll(/<a\b[^>]*class=["'][^"']*article-hero__fullsize[^"']*["'][^>]*>/gi)].map((match) => match[0]);
    if (fullSizeLinks.length !== 1) {
      failures.push(`${route} has ${fullSizeLinks.length} full-size diagram links.`);
    } else {
      const link = fullSizeLinks[0];
      const href = link.match(/href=["']([^"']+)["']/i)?.[1];
      const rel = link.match(/rel=["']([^"']+)["']/i)?.[1]?.split(/\s+/) ?? [];
      const expectedImagePath = article?.image ? new URL(article.image).pathname : undefined;
      if (!expectedImagePath || href !== expectedImagePath) failures.push(`${route} full-size diagram link does not match its Article image.`);
      if (!/target=["']_blank["']/i.test(link) || !rel.includes('noopener') || !rel.includes('noreferrer')) {
        failures.push(`${route} full-size diagram link is missing safe new-tab attributes.`);
      }
    }
    if (!html.includes('class="article-toc article-toc--desktop"') || !html.includes('class="article-toc-mobile"')) {
      failures.push(`${route} is missing desktop or collapsed mobile table-of-contents markup.`);
    }
    if (accessibleTableRoutes.has(route)) {
      const wrapper = html.match(/<section\b[^>]*class=["'][^"']*table-scroll[^"']*["'][^>]*>/i)?.[0] ?? '';
      if (!wrapper || !/tabindex=["']0["']/i.test(wrapper) || !/aria-labelledby=["'][^"']+["']/i.test(wrapper) || !/aria-describedby=["'][^"']+["']/i.test(wrapper)) {
        failures.push(`${route} is missing a named, focusable table scroll region.`);
      }
      if (!/<caption\b[^>]*id=["'][^"']+["']/i.test(html) || !/<th\b[^>]*scope=["']col["']/i.test(html) || !/<th\b[^>]*scope=["']row["']/i.test(html)) {
        failures.push(`${route} is missing an accessible table caption or scoped headers.`);
      }
      if (!html.includes('class="table-scroll-hint"')) failures.push(`${route} is missing table scroll instructions.`);
    }
  }

  const localTargets = [
    ...html.matchAll(/href=["']([^"'#?]+)["']/g),
    ...html.matchAll(/src=["']([^"'#?]+)["']/g),
  ].map((match) => match[1]);
  for (const href of localTargets) {
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

if (adsenseScriptCount !== 0) failures.push(`Build contains ${adsenseScriptCount} AdSense JavaScript tag(s); expected 0 before CMP setup.`);
if (adsenseUnitCount !== 0) failures.push(`Build contains ${adsenseUnitCount} AdSense unit element(s); expected 0 before CMP setup.`);

const sourceFiles = fs.readdirSync(contentRoot).filter((file) => file.endsWith('.md'));
const sourceIds = new Set(sourceFiles.map((file) => file.replace(/\.md$/, '')));
if (sourceFiles.length !== expectedGuides.size) failures.push(`Expected ${expectedGuides.size} guide source files, found ${sourceFiles.length}.`);
for (const id of expectedGuides) {
  if (!sourceIds.has(id)) failures.push(`Missing guide source file: ${id}.md`);
}
for (const id of sourceIds) {
  if (!expectedGuides.has(id)) failures.push(`Unexpected guide source file: ${id}.md`);
}

for (const fileName of sourceFiles) {
  const id = fileName.replace(/\.md$/, '');
  const source = fs.readFileSync(path.join(contentRoot, fileName), 'utf8');
  const draft = /^draft:\s*true\s*$/m.test(source);
  const indexable = /^index:\s*true\s*$/m.test(source);
  const route = `/guides/${id}/`;
  const publicEntry = !draft && indexable;

  if (publicEntry) {
    if (!routes.has(route)) failures.push(`Public guide route is missing: ${route}`);
    if (!sitemapUrls.has(route)) failures.push(`Public guide is missing from sitemap: ${route}`);
  } else {
    if (routes.has(route)) failures.push(`Non-public guide leaked into output: ${route}`);
    if (sitemapUrls.has(route)) failures.push(`Non-public guide leaked into sitemap: ${route}`);
  }

  if (expectedGuides.has(id)) {
    if (!publicEntry) failures.push(`Expected guide is not public: ${id}`);
    if (!/^adStatus:\s*none\s*$/m.test(source)) failures.push(`${id} must keep adStatus: none before CMP setup.`);
    if (!/^publishedAt:\s*2026-08-21\s*$/m.test(source)) failures.push(`${id} has an unexpected publication date.`);
    if (!/^author:\s*\{\s*name:\s*["']Dama Korea["']/m.test(source)) failures.push(`${id} has an unexpected author.`);
    if (!/^\s+kind:\s*original-editorial-diagram\s*$/m.test(source)) failures.push(`${id} is missing the editorial-diagram kind.`);
    if (!/^\s+aiAssisted:\s*true\s*$/m.test(source)) failures.push(`${id} is missing aiAssisted: true.`);
    if (!/^\s+documentary:\s*false\s*$/m.test(source)) failures.push(`${id} is missing documentary: false.`);
  }

  const heroPath = source.match(/^\s+src:\s*["']([^"']+)["']\s*$/m)?.[1];
  if (!heroPath || !fs.existsSync(path.join(publicRoot, heroPath.replace(/^\//, '')))) failures.push(`${id} references a missing hero visual.`);

  const relatedLine = source.match(/^related:\s*\[([^\]]*)\]\s*$/m)?.[1] ?? '';
  const relatedIds = relatedLine.split(',').map((value) => value.trim()).filter(Boolean);
  for (const related of relatedIds) {
    if (!sourceIds.has(related)) failures.push(`${id} references unknown related guide ${related}.`);
  }
}

if (failures.length > 0) {
  console.error(`Site QA failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site QA passed: ${htmlFiles.length} HTML pages, ${expectedGuides.size} public guides, ${sitemapUrls.size} sitemap URLs, ${adsenseScriptCount} AdSense scripts, ${jsonLdCount} JSON-LD blocks.`);
