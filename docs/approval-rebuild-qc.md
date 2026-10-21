# Local rebuild quality review — 2026-10-21

## Scope and verdict

Local implementation is ready for publication review. This is a software/content readiness verdict, not an AdSense approval prediction. No push, deployment, application or account change was made.

## Verified

- `npm run quality`: image core 88 assertion groups; 36 unique evidence images and one ZIP; Astro check with zero errors/warnings; 27 built pages, 18 sitemap URLs and 77 schema blocks; 1,080 SEO checks; 17 simulated workspace DOM checks; format comparison and framing-demo DOM tests.
- HTTP smoke check: all 26 directory pages returned 200 from the local preview; an unknown route returned 404. The build also includes the dedicated 404 document.
- Evidence QA decodes files and checks dimensions, MIME/format, byte counts and SHA-256, lossless PNG pixels, alpha handling, actual ZIP entry names and exported bytes.
- New framing behavior was extracted to a small testable module. No-JS rendering retains both downloads and the default photograph without offering inert controls. Switching updates the real image, alternative text and live caption. Missing component is a safe no-op.
- Mutation check: reversing the Fit/Fill condition caused the new framing test to fail on the first switch. Restored the condition, then passed the complete quality suite.
- Actual Aside browser: homepage radio click and keyboard ArrowRight switched Fit to Fill; the tool link opened Image Prep. Three sample inputs were prepared successfully at 2000 × 2000. Browser ZIP download completed as `dama-product-photos.zip`, 139,767 bytes. These browser samples are separate from the reference-encoder evidence files.
- Real Chromium renders inspected at home widths 1440, 1024, 768, 390 and 320; article at 1440 and 390. Viewed the fold and scrolling contact sheets. No horizontal overflow, clipped heading or broken image was observed in these views.
- Source design lint: zero failures/warnings. Homepage render inspection: zero failures with the documented exceptions below; one non-blocking video warning. Article render inspection similarly excludes inappropriate landing-page picture-count/display-heading rules.

## Design exceptions and critique

The design-taste workflow led to visible real output examples and simpler navigation instead of additional box-and-text promotional sections.

- `still-page`: the operating system requests reduced motion; browser `matchMedia('(prefers-reduced-motion: reduce)').matches` returned true. Suppression preserves the accessibility preference rather than forcing animations to satisfy a counter. Non-reduced-motion choreography exists in CSS but was not certified by that reduced-motion run.
- `eyebrow`: the mobile inspector classifies the primary “Open Image Prep” action as an eyebrow above the next section. Screenshot review confirms it is a functional, normally capitalized button, not a decorative label.
- `no-footage`: no video was added. The subject is a pixel/file comparison; downloadable unchanged still images are the relevant evidence. Unrelated footage would add weight without answering the question.
- Article `few-pictures`/`focal-point`: two side-by-side exports directly answer the guide question. A readable article headline and two relevant images are retained instead of padding a technical article with unrelated photography to meet a landing-page heuristic.
- Article grey-text warning: supporting header text is measured at 5.8:1, above normal-text AA contrast. Main prose now uses the full ink token and a 65-character measure.

ROUND 3

Seen in one second: a product-photo framing statement with the actual cup image inside it.

Idea (one sentence): let readers inspect the actual files behind an image recommendation.

Live thing: Fit/Fill radio comparison, followed by working local image tools.

Layout words by section: hero=sentence / framing=split demonstration / format=specimens and table / guides=index / requirements=reference links.

Scores: design 6.5 · usability 8 · creativity 7 · content 8 → overall 7.2.

Caps applied: fewer than four distinct photographic subjects; this is intentionally a focused evidence site rather than a photography-led campaign. The score is a subjective design critique, not a Google quality score or approval probability.

Remaining visual limitations:

1. The desktop framing introduction sits low beside the taller output image; the mobile introduction precedes the large demonstration. Both are readable, but the proof is not all above the fold.
2. Photography has only two third-party source subjects. More genuinely distinct tests may be useful later; unrelated stock imagery is not a substitute.
3. Motion was not measured in a non-reduced-motion runtime. No essential content depends on animation.

## Boundaries and next publication checks

- Automated SEO tests prove metadata/link consistency, not indexing, ranking, traffic or AdSense approval.
- Browser testing covered the installed Chromium runtime and emulated widths, not physical iOS/Android devices or every browser.
- Platform claims have cited checks, not live seller-account upload tests. Reference-encoder bytes are not browser-quality or marketplace benchmarks; memory values are explicitly calculations rather than measured device RAM.
- AdSense publisher metadata is retained, but the logged-in browser account did not expose the user's AdSense review details. Publisher/account ownership and exact review findings remain unverified.
- GitHub source links and Cloudflare `_redirects` declarations must be verified on the public deployment after a separately authorized push. A local Astro preview does not execute Cloudflare redirect rules.
- Reapplication should use the deployed revision, not the old public version. There is no defensible numerical approval probability for this site.
