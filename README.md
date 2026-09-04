# Dama Workshop

Dama Workshop is a static, English-language woodworking calculator library published at `damaheritage.com`. It is built with Astro and deployed through GitHub-connected Cloudflare Pages.

## Commands

```bash
npm install
npm run dev
npm run quality
```

`npm run quality` performs Astro type checks, builds the static site, then checks routes, internal links, metadata, structured data, calculator coverage and retired-topic leakage.

## Architecture

- `src/data/tools.ts` — calculator definitions, explanations, FAQs and relationships
- `src/scripts/calculators.ts` — browser-only calculation logic
- `src/data/guides.ts` — workshop reference guides
- `src/pages/tools/[slug].astro` — generated calculator pages
- `src/pages/guides/[slug].astro` — generated guide pages
- `scripts/check-site.mjs` — production-output quality gate

Calculator inputs remain in the visitor's browser. No user account, database or paid API is required.

## Advertising state

The AdSense ownership meta tag and `ads.txt` record are present. Ad scripts and ad units are intentionally absent until consent-management requirements and approval state are ready.
