# Independent verification 5 — PASS

**Work order:** `calm-scroll-verify-5`  
**Date:** 2026-08-29  
**Candidate commit:** `be4d3014175c979938fcce59f75f6c6afa9fd550`  
**Production URL:** <https://calm-scroll.sociobot.in/>  
**Verdict:** **PASS — the deployed candidate meets the acceptance contract.**

## Cold first-read and one-click demo

In a fresh 390 × 844 Chromium context, the first viewport stated:

- **What it does:** “Stop page motion while you read.”
- **For whom:** “For people made uncomfortable by page motion…”
- **What to do first:** one visible `Try it with sample data` action.

That action opened `/demo/?demo=1` in one click. The persistent banner read
“Demo — sample data, nothing is saved.” The demo began with Stable mode on,
the animation computed as `none`, no horizontal overflow, and only the
`demo:calm-scroll:sample` storage namespace. The cold flow emitted seven
same-origin requests and no console or page errors. This passes the
plain-words and demo-sandbox gates.

## Claims gate — PASS

`.factory/claims.json` is present with 11 claims. Per the required ordering,
the first exact claim command was invoked before install and could not resolve
`@playwright/test`, because a clean checkout has no installed dependencies.
After the clean locked install (`npm ci`), every exact declared command passed
from the shipped demo entry point:

```sh
npm run test:claims -- --grep @claim:demo-isolation
npm run test:claims -- --grep @claim:demo-responsive
npm run test:claims -- --grep @claim:sample-motion-controls
npm run test:claims -- --grep @claim:sample-exceptions
npm run test:claims -- --grep @claim:local-settings
npm run test:claims -- --grep @claim:extension-data-private
npm run test:claims -- --grep @claim:extension-desktop-chromium
npm run test:claims -- --grep @claim:private-first-load
npm run test:claims -- --grep @claim:offline-demo
npm run test:claims -- --grep @claim:health-boundary
npm run test:claims -- --grep @claim:mit-license
```

The final Playwright status was `passed`; no claim assertion failed. The
registry maps the visible privacy, offline, demo, desktop-install, behavior,
health-boundary, and MIT statements in the landing page/README to observable
tests. No unlisted visitor-facing claim was found in that copy review.

## Clean local verification — PASS

```sh
npm ci
npx tsc --noEmit
npm test
npm run build
npm run test:package
```

- TypeScript passed.
- `npm test`: 26 Vitest tests passed; 58 Playwright tests passed; 4 mobile
  extension tests were intentionally skipped because unpacked extensions need
  desktop Chromium.
- The exact production build passed and produced `dist/site/` and the MV3
  archive. Initial website JavaScript is 2.00 kB (0.94 kB gzip), demo
  JavaScript 3.37 kB (1.29 kB gzip), and CSS 21.33 kB (5.16 kB gzip), all
  comfortably within the static-product budgets. The extension bundle is
  26.81 kB.
- `npm run test:package` rebuilt three times and reproduced
  `calm-scroll-chrome-v1.0.0.zip` with SHA-256
  `ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.

The optional Lighthouse CLI could not start Chrome in this container (browser
tab crash); this is an environment-tool limitation, not a product failure.
The independently observed built bundle sizes above meet the applicable
bundle budgets, while the browser and Axe checks below completed in the
preinstalled Playwright Chromium.

## End-to-end, accessibility, and recovery — PASS

- A fresh unpacked MV3 extension scanned a representative ordinary page with
  smooth scroll and a transformed reading element. Stable mode restored that
  element to `transform: none` after reload.
- A malformed local settings file produced the readable JSON parse error
  `Expected property name or '}'...`; importing a valid replacement immediately
  recovered with `Site settings added from the local file.` and reapplied the
  rule. This covers invalid input and recovery without a reload.
- The full suite exercised autoplay media, CSS animation, transforms, sticky
  layers, smooth scrolling, later-added motion, per-site media/sticky
  exceptions, export/import, reset, offline reload, and keyboard Space on the
  Stable mode switch.
- Independent Axe scans of `/`, `/demo/`, `/privacy/`, `/terms/`, and
  `/404.html` at 390 px, dark scheme, and reduced motion found zero
  serious/critical violations and zero console/page errors. The repository's
  live verifier additionally covered desktop and 390 px in both light and dark
  schemes.
- Keyboard Tab on production moved focus to the skip link, which had a visible
  `4px` blue focus outline and a 199.2 × 46.3 px target. The live verifier and
  local suite also passed focus restoration on route navigation/Back and the
  44 px non-overlapping target regression across all public routes.

## Production, privacy, delivery, and headers — PASS

```sh
EXPECTED_RELEASE_SHA=be4d3014175c979938fcce59f75f6c6afa9fd550 npm run test:live
```

This passed against production. `/release.json` reports the requested source
commit and the published ZIP checksum exactly matches the locally reproduced
archive:

```json
{
  "source_commit": "be4d3014175c979938fcce59f75f6c6afa9fd550",
  "extension": {
    "path": "/downloads/calm-scroll-chrome-v1.0.0.zip",
    "sha256": "ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d"
  }
}
```

The supplied `verify-url.sh` passed for home, demo, Privacy, Terms, and 404:
each returned 200 with a title, `lang=en`, one `h1`, a main landmark, image
alt coverage, and no console errors. Response checks confirmed HTTPS, HSTS,
`nosniff`, strict-origin referrer policy, a same-origin CSP with
`frame-ancestors 'none'`, and restrictive Permissions-Policy. HTML
revalidates, fingerprinted assets and the downloadable archive are immutable,
and `/sw.js` revalidates. The live verifier also passed the styled HTTP 404,
service-worker update/control, and offline demo reload.

Fresh request recording for landing → demo found only
`https://calm-scroll.sociobot.in`; the extension privacy claim separately
records requests before the page and popup open and passes with no remote
requests or sentinel data leakage. There are no product server endpoints,
sign-in, billing/unlock calls, or rate-limited API surface in this static
website/MV3 extension, so the API allowance and Entra checks do not apply.

## Defects

None found. The preceding deployment-only concern is resolved by fresh
evidence: production serves the requested candidate identity and passes its
delivery checks.

