# Independent verification 3 — PASS

**Work order:** `calm-scroll-verify-3`  
**Date:** 2026-08-27  
**Candidate commit:** `4f03685d319c2ea8dfb2f5d9992432928729381e`  
**Production URL:** <https://calm-scroll.sociobot.in/>  
**Verdict:** **PASS — candidate is accepted.**

## Scope and clean environment

The checkout was clean at the exact candidate SHA before verification. `npm ci`
installed 401 packages with 0 audit vulnerabilities. Node was `v22.23.2` and
npm `10.9.8`. There is no lint script in this repository.

The first browser-suite attempt correctly identified an environment prerequisite:
the lockfile resolves Playwright `1.62.1`, while the preinstalled browser was
Playwright `1.58` revision 1208. All browser tests therefore failed before a
page opened with “Executable doesn't exist … chromium-1234.” I ran the
work-order-prescribed `npx playwright install chromium`, then reran from the
same clean checkout. This was not a product/deployment failure.

Passing commands:

```bash
npm ci
npx playwright install chromium
npm run check
npm run test:package
EXPECTED_RELEASE_SHA=4f03685d319c2ea8dfb2f5d9992432928729381e npm run test:live
```

`npm run check` passed TypeScript, 14/14 Vitest unit/contract tests, and 15
Playwright tests; one extension lifecycle test is intentionally skipped in the
mobile project because Chromium extensions are desktop-only. The exact
production build passed and produced `dist/site/` and
`dist/extension/chrome-mv3/`.

`npm run test:package` passed three clean production builds. The reproducible
extension ZIP SHA-256 was identical each time:

```text
bb089166a13be859181aa6a985497cee78787579e044f399efcbe7db3b458435
```

## End-to-end extension verification

I independently loaded the freshly built unpacked MV3 extension in Chromium
and exercised an ordinary HTTP fixture containing autoplay media, CSS animation
and transition, a transformed element, a sticky element, smooth scrolling, and
a focusable native control.

- The popup detected 5 motion sources.
- Keyboard-only focus plus `Space` enabled the `role=switch` Stable mode.
  Computed results were animation `none`, transform `none`, sticky position
  `static`, root scroll behavior `auto`, and video autoplay `false`.
- The focusable page control remained focusable.
- “Allow media playback” restored the video autoplay property; “Keep fixed and
  sticky layers” restored sticky positioning. Those exceptions persisted after
  reload while transformed content remained frozen.
- Turning Stable mode off restored the transform.
- On `chrome://version/`, the popup displayed the explicit, retryable
  “This page can’t be adjusted” restricted-page state.
- No extension, popup, or fixture console/page errors were emitted.

This covers the brief's normal stable-reading action, per-site exceptions,
motion sources, keyboard use, a recovery path, and the constraint not to break
focus or native media controls.

## Live deployment and browser checks

Fresh production verification confirms the live release identity is exactly
the candidate commit and its archive matches the published checksum:

```text
source_commit: 4f03685d319c2ea8dfb2f5d9992432928729381e
extension SHA-256: bb089166a13be859181aa6a985497cee78787579e044f399efcbe7db3b458435
```

The live policy gate passed. Fresh headers show HTTPS/HSTS,
`X-Content-Type-Options: nosniff`, `Referrer-Policy:
strict-origin-when-cross-origin`, restrictive same-origin CSP with only
`https://api.sociobot.in` in `connect-src`, and a restrictive
Permissions-Policy. HTML revalidates; `/sw.js` revalidates without immutable
caching; fingerprinted assets and the versioned ZIP use
`public, max-age=31536000, immutable`.

Independent Chromium checks against production found:

- Desktop: no console/page errors and no serious/critical axe findings.
  First Tab reaches the visible skip link and Enter targets `#main`.
- 390 × 844 mobile: document width was 390 px with no horizontal overflow;
  exactly one `h1` and one `main` were present.
- `prefers-reduced-motion: reduce`: primary-button transition was `0.00001s`.
- First-load request capture contacted only
  `https://calm-scroll.sociobot.in`; no analytics, font CDN, tracking, or
  third-party runtime request was observed. Source review found the documented
  Sociobot verification endpoint only when a license is supplied.
- Invalid empty license recovery, offline license recovery that preserves the
  free download, returned-license URL cleanup/local storage, and the legal
  pages are covered by the passing browser suite.
- After online service-worker activation and reload, an offline production
  reload rendered the home page successfully.

## Accessibility, privacy, and performance

All public pages have `lang`, title, a single `h1`, `main`, semantic landmarks,
alt text, labels, visible focus treatment, local/system fonts, and legal links.
The extension requests only `storage` and `activeTab` plus HTTP(S) site access;
settings are browser-local hostname rules. No browsing data, analytics, remote
extension work, third-party fonts, or runtime CDN scripts were found.

The generated production output is within budget: initial JS is 2,944 bytes,
CSS 14,860 bytes, and the 768px mobile hero WebP is 37,104 bytes. Mobile
Lighthouse against production (default mobile configuration) scored Performance
100, Accessibility 100, Best Practices 100, SEO 100; FCP 878 ms, LCP 909 ms,
CLS 0, and total transfer 29,006 bytes.

## Defects by severity

None found. There are no known release-blocking, high, medium, or low defects
from this verification.

## Retest command

```bash
npm ci && npx playwright install chromium && npm run check && npm run test:package
EXPECTED_RELEASE_SHA=4f03685d319c2ea8dfb2f5d9992432928729381e npm run test:live
```
