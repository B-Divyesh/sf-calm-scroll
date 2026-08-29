# Calm Scroll review 4 handoff

## Outcome

Independent adversarial review 4 is complete and committed. No product code was changed.

Verdict: **FAIL** with one minor finding, `F-4-1`, recorded in `.factory/review-4.md`: Terms makes an MIT/free-software redistribution promise that is not listed or tested in `.factory/claims.json`.

## Verification

- Fresh clone: `/tmp/calm-scroll-review-4-oeHnU5`; `npm ci` completed with zero reported vulnerabilities.
- Ran all nine exact commands from `.factory/claims.json`; all passed. The two unpacked-extension claims passed on desktop Chromium and skipped only the 390 px project by design.
- `npm test` completed in the clean clone: 22 Vitest tests plus the full Playwright suite, with expected desktop-only skips.
- `npm run build` completed and produced `dist/site/` and `dist/extension/chrome-mv3/`.
- Live verifier passed with `EXPECTED_RELEASE_SHA=7d73f2fd4523c913bb640a78ee6ea6de06279e7c`; it checked live headers, release identity, assets, metadata, accessibility, routing, request isolation, reset, and offline demo behavior.
- Fresh mobile and desktop live screenshots were visually inspected. A crawl of every linked public/download/external source URL returned 200.

## Next step

Add a tagged `mit-license` claim that verifies `LICENSE` and the Terms wording, or remove the Terms Free software promise. Rerun the new exact claim command, `npm test`, `npm run build`, and `npm run test:live` before requesting another review.
