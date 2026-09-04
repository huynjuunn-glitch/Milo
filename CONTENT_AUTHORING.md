# Dama Workshop publishing standard

## New calculators

Add one complete definition to `src/data/tools.ts` and one matching calculation handler to `src/scripts/calculators.ts`.

Every calculator must include:

1. A single, narrow workshop problem.
2. Inputs with units and usable defaults.
3. The core formula or algorithm.
4. A worked example whose displayed answer has been verified.
5. Physical assumptions and limitations.
6. At least two genuinely useful FAQs.
7. Three related tools.
8. Invalid-input handling and a mobile-usable result.

Do not publish a calculator whose only value is a generic arithmetic operation already handled by the fraction calculator. Prefer tools that connect multiple workshop decisions or produce a mark/cut sequence.

## New guides

Add a structured entry to `src/data/guides.ts`. A guide must explain a decision that improves use of one or more calculators. It should distinguish mathematical facts, common practice, manufacturer-specific instructions and physical verification.

Never fabricate first-person experience, testing, credentials or an author identity. Do not rewrite another publisher's article. Examples must be presented as calculations, not personal projects.

## Pre-publication checks

- Recalculate every default and worked example independently.
- Test zero, negative, impossible and unusually large inputs.
- Verify all linked related-tool slugs.
- Run `npm run quality`.
- Review at 375px, 768px and desktop widths.
