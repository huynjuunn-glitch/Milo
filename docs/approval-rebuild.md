# Content and evidence rebuild — 2026-10-20

Goal: improve the site's readiness for AdSense review through useful, original content. No approval percentage or guaranteed outcome is claimed. Publishing is a separate step.

Audience: independent online sellers preparing image files, using free tools without an upload server. Keep English, the static Astro/Cloudflare deployment and the working browser tools.

## Delivery slices

1. Publish reproducible image fixtures, real encoded outputs, byte counts, hashes and image credits. Separate reference-encoder measurements from browser measurements.
2. Rework every guide around a distinct decision or error. Attach the relevant example, explain a workflow that also works in another editor, and consolidate repeated platform facts in the platform references.
3. Show actual results on the homepage. Simplify navigation and guide discovery; repair incorrect tool destinations; replace obsolete moved pages with permanent redirects.
4. Recheck current platform facts, source dates and editorial/privacy statements. Run core, rendered-site and evidence checks plus browser visual/functional review before handoff.

## Acceptance criteria

- Each guide answers a distinct question and gives a complete procedure, interpretation and recovery path.
- Published measurements can be checked against downloadable files, not manually maintained marketing numbers.
- Photographs have verified permission and visible source credits. Synthetic fixtures are identified as synthetic.
- No invented experience, credentials, reviews, users, performance claims or approval scores.
- Existing image tools remain browser-only; no database, paid API, uploads, accounts or background service is introduced.
- Build, processing tests, internal links, metadata, evidence hashes/decoding, redirect targets and viewport checks pass.
- AdSense ownership metadata remains present. `noindex` is not presented as an exemption from AdSense review.

## Design argument

The output files become the page's proof: an image is shown before and after framing, and the same pixels are available in three measured formats. The homepage lets visitors compare framing before opening a full guide. Visual material: a third-party public-domain museum cup photograph and a third-party CC0 coffee photograph, plus identified deterministic text, texture, transparency and noise fixtures. The photographs are not original photography by this project; the controlled comparisons and explanations are the site's contribution. Existing blue/ink palette and system type remain.

Baseline visual inspection found a three-line headline, repeated outlined cards, small labels and no visible homepage images. These are design observations, not Google approval rules.

## Completion checkpoint — 2026-10-21

All four local delivery slices are implemented. Publication has not been performed.

- Six distinct guides now explain framing, thumbnail checks, apparent product scale, format decisions, batch naming and export recovery. Their intent is useful even without this site's tools.
- Three lab notes use downloadable reference files or explicitly labeled calculations. The format comparison covers two licensed photographs and four synthetic inputs; it is not a representative survey of all product photographs.
- The homepage shows real outputs, a keyboard-operable Fit/Fill comparison and measured files. Navigation and guide discovery are simplified.
- Methods, photograph credits, limitations and source corrections are visible. Outdated/unsubstantiated platform details were corrected after checking the linked sources.
- Old generated diagram assets and superseded generators were removed. The two retired policy/change-log routes use permanent redirect declarations rather than conflicting physical pages.
- No dependencies, paid API, upload server, database or authentication were added. English, the domain and browser-only tools remain unchanged.

Verification details and limits: [approval-rebuild-qc.md](approval-rebuild-qc.md).
