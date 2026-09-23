# Seller Operations Lab — Cloudflare Pages deployment

Keep the existing GitHub `huynjuunn-glitch/Milo` → Cloudflare Pages connection. Production branch: `main`; framework: Astro; build command: `npm run build`; public output: `dist`. Node version follows `.node-version`. No Functions, R2, D1, API secret or upload endpoint is required.

Before a production push: run `npm run quality`, review the exact diff, and obtain the operator's go-ahead to replace the live site. Do not commit generated dist, local test outputs or secrets.

After deployment: verify `/`, `/guides/`, a guide, privacy and a genuine unknown-route 404; run a small local-file batch through preparation, crop review, individual/ZIP download and saved-settings reload on desktop and mobile. Test going to a guide and back with a prepared batch. Confirm the deployed response has no injected analytics/ad script before relying on the stated privacy policy.

The canonical domain remains https://damaheritage.com for this rebuild. Retired unrelated URLs should return genuine 404s, not redirect en masse to the homepage. Sitemap: `/sitemap-index.xml`. Review new URLs in Search Console; sitemap submission or indexing does not guarantee AdSense approval.

Cloudflare Pages static asset requests are currently free and unlimited; platform build/file limits still apply. User-selected images are local browser data, not deployed assets or server uploads. Domain registration cost is separate.
