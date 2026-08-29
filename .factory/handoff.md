# Calm Scroll review 3 handoff

## Outcome

Completed the requested adversarial, read-only product review. No product code was changed. The review is **FAIL** because `.factory/review-3.md` records three minor claim-registry/copy coverage findings: an unregistered Chrome Web Store availability statement, an offline claim broader than its test, and a missing README location for the isolation claim.

## Verification performed

- Fresh live Chromium checks at 390 × 844 and 1440 × 900.
- Cold first-screen, one-click demo, Reset, demo-storage isolation, same-origin request log, and responsive-layout checks.
- Live structure checks for home, demo, Privacy, Terms, direct 404, and an invented HTTP-404 route; link crawl; route/Back focus and announcement; console checks.
- Fresh local clone at `/tmp/calm-scroll-review-3-clean`: `npm ci`, every command in `.factory/claims.json`, `npm test`, and `npm run build`.

All nine claim commands passed. `npm test` passed 21 unit/contract tests and 42 browser tests, with two expected mobile skips for desktop-only unpacked-extension tests. `npm run build` produced `dist/site/` and `dist/extension/chrome-mv3/`.

## Files changed

- `.factory/review-3.md` — full review, evidence, copy audit, history recheck, and fixes.
- `.factory/handoff.md` — this handoff.

## Next steps

Resolve F-3-1 through F-3-3 in the review, then rerun the listed claim tests, `npm test`, `npm run build`, and a fresh live cold check. No deployment action was taken.
