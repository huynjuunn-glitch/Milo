# Dama Workshop — Cloudflare Pages deployment

The GitHub repository `huynjuunn-glitch/Milo` is connected to Cloudflare Pages. A push to `main` triggers the production build and deployment.

## Cloudflare build settings

- Framework preset: Astro
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 22.16.0, pinned in `.node-version` (Astro requires Node 22.12 or later)

`npm run build` runs Astro diagnostics, generates `dist/` and then invokes the site QA script through the `postbuild` lifecycle. A failed route, metadata, redirect, structured-data, image or advertising-state check therefore stops the Cloudflare build.

No API key is required by the current static site.

## Before pushing

1. Run `npm run quality` locally. It uses the same build and post-build checks as Cloudflare Pages.
2. Confirm that Astro reports zero errors and warnings.
3. Review the home page, calculator library, two calculators and one guide at desktop and mobile widths.
4. Verify `dist/sitemap-index.xml`, `robots.txt`, `ads.txt` and redirects.
5. Check `git diff` and ensure no environment file or generated `dist/` output is included.

## After Cloudflare deploys

1. Open `https://damaheritage.com/` in a private browser window.
2. Check `/tools/`, at least two calculator URLs, `/guides/`, a guide URL and `/about/`.
3. Confirm that an intentionally invalid URL renders the custom 404 page.
4. Submit the generated sitemap at `https://damaheritage.com/sitemap-index.xml` in Google Search Console.
5. Inspect representative URLs in Search Console before requesting an AdSense review.
