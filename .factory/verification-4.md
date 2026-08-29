# Independent verification 4 — FAIL

**Work order:** `calm-scroll-verify-4`  
**Date:** 2026-08-29  
**Candidate commit:** `72b9963f11448f4d1a67637467e1f69e02d38ce6`  
**Production URL:** <https://calm-scroll.sociobot.in/>  
**Verdict:** **FAIL — do not release this candidate.**

## Release-blocking defect

### F-4-1 — Mobile touch targets miss the 44 × 44 px acceptance requirement (High)

At the required 390 × 844 viewport, independent Chromium measurement of the
live release found visible interactive links below the contract's 44 × 44 CSS
pixel minimum. This affects every public route.

| Location | Control | Measured size |
| --- | --- | --- |
| Header | `Demo` | 41.7 × 44 px |
| Header | `Install` | 43.4 × 44 px |
| Footer | `Demo` | 41.7 × 18 px |
| Footer | `Privacy` | 53.4 × 18 px |
| Footer | `Terms` | 43.9 × 18 px |
| Footer | `Technical: verify the download checksum` | 233.8 × 15 px |
| Footer | source-record link | 213.4 × 15 px |

The demo additionally exposes 22 × 22 px checkbox inputs. Their associated
labels may enlarge their practical click region, but the header and footer
anchors are themselves the activation target and are conclusively undersized.
This violates the attached accessibility and design-principles contract. Give
every link/button a real minimum 44 × 44 px hit area without overlap, then
retest 390 px mobile.

## First-read and demo gate — PASS

Cold-loading production answered the three required questions in plain words:
the headline says “Stop page motion while you read,” the paragraph identifies
people made uncomfortable by page motion, and “Try it with sample data” is a
visible one-click primary action. It opens the isolated demo.

## Claims and clean build — PASS

`.factory/claims.json` exists and has eleven claims. Before dependencies were
installed, the first exact command could not load `@playwright/test`; that is a
clean-checkout setup prerequisite, not a claim assertion failure. After
`npm ci`, every exact claim command passed from the demo entry point:

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

`npx tsc --noEmit`, the repository's `npm test` suite (26 Vitest checks and
60 Playwright checks), exact `npm run build`, and `npm run test:package` all
passed. The package verifier reproduced the extension ZIP across three clean
builds with SHA-256:

```text
ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d
```

Initial page JS is 2.00 KB (0.94 KB gzip), demo JS 3.37 KB (1.29 KB gzip), and
CSS 20.42 KB (5.01 KB gzip), within budget.

## Independent end-to-end checks — PASS except F-4-1

I loaded the unpacked MV3 build in a fresh Chromium profile and exercised an
ordinary fixture with autoplay video, CSS animation, transform, sticky
positioning, smooth scroll, and retained reading text.

- Keyboard `Space` on Stable mode yielded `animation: none`, `transform:
  none`, `position: static`, and `scroll-behavior: auto`; reading text stayed
  intact.
- A malformed local JSON import surfaced a readable parsing error. A subsequent
  valid import succeeded (“Site settings added from the local file.”), proving
  recovery without reload.
- The fresh-profile extension request log contained no remote requests.
- The passing claim suites separately verify per-site exceptions, resettable
  demo isolation, local export/import, privacy, and desktop Chromium install.

At production, `npm run test:live` exited successfully. It checks all five
public routes at desktop and 390 px in light/dark modes, semantic shell,
serious/critical Axe findings, console/page errors, same-origin demo traffic,
focus/Back behavior, HTTP 404, and offline use. An independent live capture
saw only `https://calm-scroll.sociobot.in` during landing-to-demo; no analytics,
remote font, CDN script, or third-party payload was observed. A service-worker
`registration.update()` completed with an active, controlling worker.

## Deployment, headers, and performance — PASS

The live deployment matches the candidate exactly:

```text
release.json source_commit: 72b9963f11448f4d1a67637467e1f69e02d38ce6
published/local ZIP SHA-256: ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d
```

HTML revalidates; fingerprinted assets and the ZIP are immutable; `/sw.js`
revalidates. Headers include HSTS, `nosniff`, strict-origin referrer policy,
same-origin CSP with `frame-ancestors 'none'`, and restrictive
Permissions-Policy. There are no server-side endpoints, sign-in, or
product-unlock calls in this product, so no API allowance applies.

Mobile Lighthouse against production: Performance **97**, Accessibility
**100**, LCP **1,391 ms**, CLS **0**, transfer **26,278 bytes**. Axe has no
serious/critical findings; it does not waive the stricter 44 px requirement.

## Retest

After F-4-1 is repaired, rerun the eleven exact claim commands and:

```sh
npx tsc --noEmit
npm test
npm run build
npm run test:package
EXPECTED_RELEASE_SHA=72b9963f11448f4d1a67637467e1f69e02d38ce6 npm run test:live
```
