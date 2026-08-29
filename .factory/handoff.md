# Calm Scroll review 2 handoff

## Outcome

Completed the requested no-code adversarial review and committed the report. Verdict: **FAIL**. The live sample demo is usable and isolated, but the live site still serves the home page for unknown URLs, mobile header navigation is hidden/inconsistent, and the registered local-settings claim test does not test extension settings or import/export.

## Verification run

Fresh clone: `/tmp/calm-scroll-review-2-41TLu6` at `d126df1323e0ded5d2e0c77b7229b9d517b0e8f5`.

```bash
npm ci
npx playwright install chromium
npm run test:claims -- --grep @claim:demo-isolation
npm run test:claims -- --grep @claim:sample-motion-controls
npm run test:claims -- --grep @claim:sample-exceptions
npm run test:claims -- --grep @claim:local-settings
npm run test:claims -- --grep @claim:private-first-load
npm run test:claims -- --grep @claim:offline-demo
npm run test:claims -- --grep @claim:health-boundary
npm test
npm run build
```

All commands passed; `npm test` reported 31 passing tests and one expected mobile-extension skip. The report explains why the passing `local-settings` command is nevertheless not valid proof of its declared claim.

## Live evidence

- Cold 390 px and desktop checks of `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` completed with no console errors.
- Demo mode used only `demo:calm-scroll:sample`; Reset demo removed it; request logging showed same-origin assets only.
- All crawlable internal, download, and declared external links returned 200.
- `GET /does-not-exist` returned 200 home content, which is the primary routing blocker.

## Product-code changes

None. Only `.factory/review-2.md` and this reviewer handoff were changed.
