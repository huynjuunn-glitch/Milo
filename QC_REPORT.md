# Image workspace verification — 2026-09-07

## Completed

- Image-core tests: 88 assertion groups, including geometry invariants, guide examples, malformed/oversized/animated headers, filenames and ZIP roundtrip.
- Workspace DOM tests: 17 checks using simulated canvas/decoder. Includes preserved exports after rejected additions, cancellation, ZIP reuse, BFCache URL lifetime, settings, preview serialization and full-batch limits.
- Astro check: 0 errors, 0 warnings. Static production build: 15 pages.
- Generated-site gate: 11 sitemap URLs, 36 valid schema blocks, distinct titles/descriptions, canonicals, labels, local links and no image network transport in the workspace.
- npm audit production dependencies: 0 reported vulnerabilities at verification time.
- Independent read-only engine, editorial/policy and QC agent reviews; reported code defects addressed and QC rechecked.

## Actual browser checks

Tested in the Codex Chromium-based in-app browser, at default desktop viewport and a 390 × 844 viewport override. This is not a physical-phone or cross-browser certification.

- Sample batch creates three real PNG images; sequential preparation creates three JPG outputs.
- Crop previews render all three aspect ratios.
- ZIP downloaded to disk; all three entries were opened with an independent image decoder and confirmed as JPEG, 2000 × 2000, with expected product-001/002/003 names.
- WebP fill/upscale output generated with MUG-QC sequence names; individual WebP downloaded.
- PNG output generated and downloaded; quality control disabled appropriately.
- Downloaded PNG and WebP files were selected through the visible file-picker control and successfully decoded/prepared again.
- Saved settings were restored after page navigation/reload.
- Mobile first screen shows photo input; measured document scroll width did not exceed its client width. Added direct output-settings link for the mobile layout.
- Guide navigation and return worked without console errors. Development browser did not retain active batch on return; no promise is made that browser history preserves a batch.

## Boundaries and remaining work

- At the September 7 pre-release checkpoint, the rewrite had not yet been pushed. Production verification is recorded below.
- Physical iOS/Android, Safari/Firefox, very large images and memory pressure on low-end devices remain outside this manual test sample.
- No actual AdSense approval, production traffic, geographic mix or weekly return rate has been established. Technical correctness is not evidence of those outcomes.
- Existing AdSense verification identifiers remain; advertising/analytics scripts remain disabled. Review applicable consent requirements before enabling advertising.
- Current support channel is public GitHub issues (account required), not a private inbox.

## Production verification — September 8, 2026

- Release `0be7dead93e54fccf1cb3c79a03a095b68746f49` was pushed to `main`; the GitHub Cloudflare Pages check completed successfully. The canonical domain serves Dama Image Prep rather than Dama Workshop.
- All 14 non-error HTML routes, robots.txt, ads.txt, sitemap files, favicon and referenced production CSS/JavaScript returned HTTP 200. An unknown route and the retired fraction-calculator route returned genuine branded HTTP 404 responses.
- No advertising or analytics script was found in the fetched pages. Cloudflare injects Rocket Loader; the workspace initialized and completed the tested actions with it present.
- In the live Chromium-based in-app browser, three sample photos were prepared as 2000 × 2000 JPGs; all three crop-preview shapes rendered. A saved filename prefix survived reload; test settings were then removed.
- A narrow viewport rendered the mobile layout without horizontal document overflow. No console warnings or errors were captured during the checked workflow. This is not physical-device or cross-browser certification.
- The live ZIP action reached the download-requested state, but the browser automation download event timed out and a new local ZIP was not confirmed. Production file-receipt verification therefore remains unverified; the earlier local ZIP decode checks above must not be represented as a live download pass.
