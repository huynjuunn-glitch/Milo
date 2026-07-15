# Cloudflare Pages Deployment

The GitHub repository `huynjuunn-glitch/Milo` is connected to Cloudflare Pages. A push to `main` triggers the production build and deployment.

## Cloudflare build settings

- Framework preset: Astro
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 20 or later recommended

No API key is required by the current static site.

## Before pushing

1. Run `npm run build` locally.
2. Confirm that Astro reports zero errors and warnings.
3. Review the home page, one category page and at least two article pages at desktop and mobile widths.
4. Verify `dist/sitemap-index.xml`, `robots.txt`, `ads.txt` and redirects.
5. Check `git diff` and ensure no environment file or generated `dist/` output is included.

## After Cloudflare deploys

1. Open `https://damaheritage.com/` in a private browser window.
2. Check `/start-here/`, `/visit/`, `/live/`, `/culture/` and a guide URL.
3. Confirm that the old `/archive` and `/blog` routes redirect.
4. Submit the generated sitemap at `https://damaheritage.com/sitemap-index.xml` in Google Search Console.
5. Inspect representative URLs in Search Console before requesting an AdSense review.
