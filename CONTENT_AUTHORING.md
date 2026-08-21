# Dama Korea guide authoring

Each guide lives in one file under `src/content/guides/`. Keep `draft: true`, `index: false` and `adStatus: none` until research, image rights and editorial QA are complete.

## Publication requirements

- Use the real publication, update and source-check dates. Never backdate or invent a visit.
- Add a licensed hero image with width, height, credit, license, alt text and source URL where applicable.
- Give every source a precise role and checked date. Cite consequential claims near the relevant paragraph in the Markdown body.
- Add at least two useful `atAGlance` facts, one change-log item and only relevant related-guide slugs.
- Choose article-specific modules. Do not force every guide into the same sequence.
- When the guide is finished, set `draft: false` and `index: true`. Use `adStatus: review` for AdSense connection without article ad units; use `article` only after approval and ad-placement review.

## Variable module example

```yaml
modules:
  - type: look-for
    title: "Read the main courtyard"
    intro: "Use three visual clues instead of trying to identify every building."
    items:
      - heading: "Axis"
        text: "Explain the observable feature and why it matters, with an appropriate source."
      - heading: "Scale"
        text: "Explain the second clue without presenting an illustration as documentary evidence."
```

Run `npm run quality` before requesting review. The command validates the content schema, builds the static site, checks required pages and internal links, and confirms that drafts do not enter public output or the sitemap.
