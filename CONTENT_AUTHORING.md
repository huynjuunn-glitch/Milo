# Dama Korea guide authoring

Each guide lives in one file under `src/content/guides/`. Keep `draft: true`, `index: false` and `adStatus: none` until research, source-link, visual-metadata, schema and publication checks are complete.

Assign the guide to the editorial desk that matches its section. Desk bylines are topical publishing labels within Dama Korea, not separate people, credentials or fieldwork claims. Their public definitions live in `src/data/contributors.ts`.

Every guide must state its `editorialValue`: the reader question it solves, the original synthesis or tool it adds, and the limits readers still need to verify. These statements must describe the actual page rather than make generic quality claims.

## Publication requirements

- Use the real publication, update and source-check dates. Never backdate or invent a visit.
- Add a licensed hero visual with width, height, credit, license and alt text. Current SVG schematics must declare `kind: original-editorial-diagram`, `aiAssisted: true` and `documentary: false`.
- Give every source a precise role and checked date. Cite consequential claims near the relevant paragraph in the Markdown body.
- Add at least two useful `atAGlance` facts, one change-log item and only relevant related-guide slugs.
- Choose article-specific modules. Do not force every guide into the same sequence.
- When the guide is finished, set `draft: false` and `index: true`, while keeping `adStatus: none`.

## Advertising state

The current site uses only the publisher meta tag and `public/ads.txt` for AdSense ownership and review verification. It must not load AdSense JavaScript or request ads while a certified consent management platform is not configured.

`adStatus: review` may be introduced only after the required certified CMP is configured and the corresponding reviewed script implementation is added. `adStatus: article` is reserved for a later, approved ad-placement review. Until then, all guides remain `adStatus: none`.

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

Run `npm run quality` before requesting review. The command validates the content schema, builds the static site, checks guide routes, links, visuals, JSON-LD and sitemap inclusion, and confirms that no AdSense JavaScript is present.
