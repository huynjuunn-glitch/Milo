# Dama Korea

An independent English-language field-guide hub for Korean heritage sites, history and practical visits.

## Editorial goal

1. Publish original, useful and clearly sourced content suitable for AdSense review.
2. Build sustainable search traffic through distinctive palace, temple, Gyeongju and heritage-planning resources.

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
2. Add or update one Markdown file in `src/content/guides/`.
3. Follow the schema and publication gate in `CONTENT_AUTHORING.md`.
4. Run `npm run build`.
5. Review desktop and mobile output.
6. Run `npm run quality` and commit only after cross-role approval.

## Advertising

The AdSense publisher ID remains in `public/ads.txt` and the global verification script. Ad units should not be added to 404, empty, navigation-only or confirmation pages.
