# Dama Korea

An independent English-language guide for international visitors and residents navigating Korea.

## Editorial goal

1. Publish original, useful and clearly sourced content suitable for AdSense review.
2. Grow sustainable search traffic around travel, connectivity, banking, housing and everyday life in Korea.

The site does not present third-party API data as original publisher content. Time-sensitive guides show a checked date and link to the organizations responsible for current rules.

## Technology

- Astro static site generation
- Plain CSS
- Markdown-ready structured guide data
- Automatic XML sitemap
- Cloudflare Pages deployment

Every public route is generated as complete HTML during the build. JavaScript is not required to read core content.

## Local development

```bash
npm install
npm run dev
```

## Quality check

```bash
npm run build
```

This runs Astro diagnostics before generating the production site in `dist/`.

## Publishing workflow

1. Research and verify the guide.
2. Add or update guide metadata in `src/data/guides.js`.
3. Add the structured article body and official sources in `src/data/guideDetails.js`.
4. Run `npm run build`.
5. Review desktop and mobile output.
6. Commit and push to `main` only after approval.

## Advertising

The AdSense publisher ID remains in `public/ads.txt` and the global verification script. Ad units should not be added to 404, empty, navigation-only or confirmation pages.
