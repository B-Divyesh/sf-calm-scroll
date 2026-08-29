# Calm Scroll polish 3 retry 1 handoff

## Outcome

All findings from `review-1.md`, `review-2.md`, and `review-3.md` remain closed. The controller’s offline-demo failure is fixed at its service-worker and test roots in repair commit `908acfb69139463abcce962221f0e8311f5f794c`.

- The offline claim creates a fresh browser context and explicitly awaits service-worker registration, activation, readiness, and page control before going offline.
- The offline reload proves the cached title, heading, demo banner, motion report, JavaScript switch behavior, and computed stopped animation.
- The service worker precaches the Vite-fingerprinted CSS and JavaScript discovered from built pages. It no longer returns home HTML for a missing asset.
- The sample now has real smooth scrolling that Stable mode stops and restores. The late animation is inserted after Stable mode is on.
- The moving sample label and “Add later motion” button no longer overlap on a 390 px screen. The responsive claim asserts their geometry.
- The catalog now reads: “Try Stable mode on sample page motion before installing the extension.” It is verb-first and 70 characters.
- The WXT MV3 extension, static deployment class, isolated `?demo=1` path, legal routes, real HTTP 404, and product-specific industrial visual system remain unchanged.

## Clean-clone verification

Fresh clone: `/tmp/calm-scroll-polish3-retry1-clean-cskiKf` at `908acfb69139463abcce962221f0e8311f5f794c`.

Passed from that clone:

- `npm ci` with zero audit vulnerabilities.
- Every command in `.factory/claims.json` independently: `demo-isolation`, `demo-responsive`, `sample-motion-controls`, `sample-exceptions`, `local-settings`, `extension-desktop-chromium`, `private-first-load`, `offline-demo`, and `health-boundary`.
- `npx tsc --noEmit`.
- `npm test`: 22 Vitest tests passed; 41 Playwright tests passed; 3 mobile-only unpacked-extension tests skipped as intended.
- `npm run build`: produced `dist/site/` and `dist/extension/chrome-mv3/`.
- `npm run test:package`: three builds produced identical ZIP bytes with SHA-256 `bb331214c05faf071b74096e2c6acc3a8526f9821be0cf97661cc2d9bc513531`.

The offline claim also passed 10 consecutive fresh-context repetitions across desktop Chromium and the 390 px project. No retry or enlarged Playwright timeout is used.

## Accessibility, visual, and performance evidence

Playwright Axe checks cover home, demo, Privacy, Terms, and 404 at desktop and 390 px. Local and live checks found zero serious or critical violations, zero browser console errors, one h1 and one main landmark per route, complete labels/alt text, visible focus, reduced-motion handling, and no horizontal overflow.

Evidence is stored under:

- `.factory/evidence/polish-3-retry1-local-home/`, `local-demo/`, `local-privacy/`, `local-terms/`, and `local-404/`.
- `.factory/evidence/polish-3-retry1-live-home/`, `live-demo/`, `live-privacy/`, `live-terms/`, and `live-404/`.

The final mobile screenshots were inspected directly. The demo controls are separated and the persistent banner, reset, exit, report, and Stable mode control remain visible.

Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 0.9 s, CLS 0, TBT 30 ms, total transfer 26 KiB.

## Deployment and cold production check

Deployment `47181a76-049b-486d-b511-e7e6fcc04563` published `dist/site/` through `/opt/fleet/lib/deploy-static.sh calm-scroll dist/site`.

`EXPECTED_RELEASE_SHA=908acfb69139463abcce962221f0e8311f5f794c npm run test:live` passed against <https://calm-scroll.sociobot.in>. It verified the release identity, ZIP checksum, security/cache headers, all public routes at both viewports, complete semantic shells, Axe, the isolated demo/reset flow, same-origin requests, mobile control separation, route and Back focus, designed HTTP 404, and an operational offline reload after awaited activation/control.

Cold screenshots and verifier JSON were recorded after deployment. The live demo at <https://calm-scroll.sociobot.in/?demo=1> was opened in a fresh browser context and rechecked online and offline.

## Known gaps

None.
