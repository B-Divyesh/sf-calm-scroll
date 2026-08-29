# Calm Scroll adversarial review 5 handoff

## Outcome

Review-only work completed against live release `232dceef4fd55807644e4612a0ee9a54e4c431e5`. No product code was changed.

Verdict: **FAIL** with three blocking findings and one minor finding in `.factory/review-5.md`:

- F-5-1: serious dark-theme contrast failures on home and demo.
- F-5-2: the initial demo viewport does not show the report/control or an already-used product result.
- F-1-31: reopened because the extension-data non-transmission promise still lacks its sentinel/full-lifecycle claim test.
- F-5-3: public Google Chrome compatibility wording is broader than the Chromium-only claim and test.

## Verification completed

- Fresh mobile and desktop live contexts at 390 × 844 and 1440 × 900.
- Every exact `.factory/claims.json` command from clean clone `/tmp/calm-scroll-review-5-clean-yOOqm9`: passed.
- `npm test`: passed (23 Vitest, 43 Playwright passes, 3 expected mobile skips).
- `npm run build`: passed and produced both site and extension distributions.
- `npm run test:package`: passed; three identical ZIP builds, SHA-256 `9a1c9f6d4bd4c564342de621a554a33493cbf3c8615156957aa4a36cb94cdcfd`.
- `npm run test:live`: passed delivery, default-theme accessibility, privacy, routing, and offline checks.
- Independent demo sentinel test: non-demo storage survived enable/reset/exit; only the demo key was added/removed; requests stayed same-origin.
- Route metadata, focus/Back behavior, real HTTP 404, downloads, internal links, and external links were checked live.
- Independent Axe scan with `colorScheme: 'dark'`: serious contrast failures reproduced at both widths.

## Next steps

Address the four review findings without weakening the light theme or demo isolation. Add both-theme accessibility coverage and the missing claim tests before the next live review. Re-run the exact commands and checks listed in `.factory/review-5.md` after deployment.
