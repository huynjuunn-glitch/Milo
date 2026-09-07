# Dama Image Prep

English product-photo batch preparation at damaheritage.com. Astro static output, GitHub → Cloudflare Pages. No server-side photo processing, database, authentication or paid API.

## Workflows

- Batch fit/pad or positioned fill/crop; JPEG/PNG/WebP export.
- Three illustrative thumbnail center crops of prepared output.
- Sanitized prefix + sequence filenames, individual downloads and streamed ZIP assembly.
- Optional versioned localStorage recipe (including prefix, never selected photos).

## Development

`npm ci`, `npm run dev`, `npm run quality`.

The quality gate checks pure image geometry, header rejection, naming and ZIP roundtrips; then Astro types/build, generated metadata, routes, labels, internal links and advertising state. It does not replace real-device browser validation.

## Structure

- `src/scripts/image-core.ts`: pure validation, header inspection, geometry and naming.
- `src/scripts/workspace.ts`: browser file lifecycle, canvas, UI, previews and exports.
- `src/pages/index.astro`: working surface; global styles in `src/styles/global.css`.
- `src/data/guides.ts`: original technical guide content; shared static guide routes.
- `scripts/test-images.mjs` and `scripts/check-site.mjs`: automated quality gates.

Input limits: 20 images, 20 MB each, 100 MB total, 24 MP each. Output: 64–4096 px per edge, 12 MP each, 100 MB total. Decimal MB. Static JPEG/PNG/WebP only. Bounds reduce risk; device memory still matters.

The AdSense publisher meta tag and ads.txt are retained. No ad/analytics scripts ship. Consent and privacy configuration must be reviewed before any are enabled. No claim of guaranteed approval or traffic.
