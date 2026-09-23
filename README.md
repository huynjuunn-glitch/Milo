# Seller Operations Lab

Seller Operations Lab is a static Astro site for small online sellers. It combines source-led marketplace references, reproducible image experiments and browser-only product-image tools.

The current deployment target is `https://damaheritage.com` through GitHub and Cloudflare Pages. Image files stay in the visitor's browser; this project has no upload server, database, authentication or paid API.

## Development

```text
npm ci
npm run dev
npm run quality
npm run measure:format
```

`npm run quality` checks image processing, Astro types/build, internal links, metadata, schema, RSS, sitemap and static-only deployment assumptions. It does not replace real-device visual review or Google Search Console checks.

## Structure

- `src/data/guides.ts`: evergreen workflow guides.
- `src/data/content.ts`: marketplace references and experiments.
- `src/pages/tools/`: browser-only tools.
- `src/scripts/image-core.ts`: pure image validation, geometry and naming logic.
- `src/scripts/workspace.ts`: browser file lifecycle, canvas and downloads.
- `scripts/test-*.mjs`: automated QA gates.
- `scripts/measure-format-fixture.mjs`: deterministic reference-encoder byte benchmark used by the format note.

Editorial rules are documented in `CONTENT_AUTHORING.md`. The site does not claim first-hand seller experience, platform affiliation or guaranteed AdSense approval.
