# Calm Scroll review 1 handoff

## Outcome

Adversarial first-read review 1 is complete. Verdict: **FAIL** with 70 findings, including six blocking findings. The complete evidence, copy audit, claim inventory, rewrites, and fixes are in `.factory/review-1.md`.

No product code was modified. The prior handoff was read before being replaced by this review handoff.

## Verification performed

- Opened the live site cold in fresh Chromium contexts at 390×844 and 1440×900.
- Inspected `/`, `/demo`, `/?demo=1`, `/privacy/`, `/terms/`, `/supporter/`, and an unknown route.
- Crawled every discovered landing-page link; the Sociobot checkout returned 404.
- Recorded request/storage behavior for the landing page, the absent demo convention, offline reload, and the unpacked extension.
- Ran the factory `verify-url.sh` and direct axe-core checks at mobile and desktop sizes; no baseline accessibility violations or console errors were found.
- Cloned the repository locally into `/tmp/calm-review-XKHnNE` and ran `npm ci && npm test`: 14 Vitest tests and 15 Playwright tests passed, with one expected mobile extension skip. The Playwright web server completed the build.
- Read `.factory/brief.json`, `.factory/design.md`, the previous `.factory/handoff.md`, all landing/legal/supporter source, README, tests, routing configuration, and live release metadata.

## Required next work

Start with F-1-1 through F-1-6: fix the first screen, mobile action, isolated sample demo, claim registry, checkout, and real 404. Then resolve every unlisted claim and remaining copy/structure finding. Re-run the entire review from a fresh context; do not treat the generic passing test suite as claim coverage.
