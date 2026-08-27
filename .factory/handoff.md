# Calm Scroll v1 handoff

Work order: `calm-scroll-build-1`  
Completed: 2026-08-27  
Artifact: WXT TypeScript MV3 extension + Vite static product site

## What was built

- A real Stable mode content script for ordinary HTTP(S) pages. It detects autoplay media, CSS animations/transitions, transforms, fixed/sticky layers, and smooth scrolling; disables those sources; pauses autoplay while retaining media controls; and watches late DOM changes.
- A keyboard-accessible extension popup with loading, restricted-page error, empty report, motion counts, a one-click per-site switch, and local exceptions for media and sticky navigation.
- Browser-local per-hostname storage only. No page text, scan results, history, analytics, remote scripts, or remote fonts.
- A responsive neo-brutalist landing page with install instructions, product boundaries, light/dark treatments, an offline shell, privacy, terms, sitemap, robots file, and a packaged Chrome/Chromium pilot download.
- A $12 one-time Supporter edition through the Sociobot billing contract. The free extension is not gated. The license flow captures and strips returned tokens, stores `sb_license:calm-scroll`, restores pasted tokens, caches verification for at most one day, unlocks optimistically from a valid cache, and reports offline/invalid/revoked states without blocking free use. The paid extra is a printable motion-testing field guide.
- An original Factory-generated hero with prompt/provenance in `.factory/design.md` and `assets/src/calm-scroll-hero.json`. Responsive AVIF/WebP exports are 18–144 KB; no third-party source art was used.

## Build outputs

- Static deploy root: `dist/site/` (`index.html` is at the root)
- Extension directory: `dist/extension/chrome-mv3/`
- Pilot zip: `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip`
- Final zip SHA-256: `a211412f4f8eb6431d68b5805448340a9fd86e47893ab3258d723185f7e76f76`
- Extension unpacked size: 23.60 KB
- Site initial JS: 2.94 KB; total page JS available: 3.41 KB
- Site CSS: 14.86 KB
- Mobile hero: 18 KB AVIF / 37 KB WebP

## Verification

Commands completed successfully:

```bash
npm install
npx tsc --noEmit
npm test
npm run build
npm audit --omit=dev
```

Results:

- Vitest: 14/14 passed.
- Playwright Chromium: 15 passed, 1 intentionally skipped duplicate (extension lifecycle runs once on desktop rather than again in the mobile project).
- Browser extension E2E: real unpacked MV3 build detected motion, enabled Stable mode, froze animation/transform/sticky/smooth-scroll, and persisted across reload.
- axe-core: zero serious or critical findings on home, privacy, terms, and supporter pages at desktop and 390px.
- Browser console/page errors: zero on the landing smoke test.
- Reduced-motion and 390px horizontal-overflow checks passed.
- Dependency audit: zero vulnerabilities after upgrading direct WXT and sharp development dependencies.
- Lighthouse mobile (local production preview): Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9s, LCP 1.1s, TBT 0ms, CLS 0, Speed Index 0.9s.

## Known boundaries

- The downloadable artifact is an unpacked Chrome/Chromium pilot zip, not a signed store package. Store publication is factory work.
- Transform suppression can change layouts that use transforms for positioning. This is why Stable mode is reversible and saved per site; keyboard controls and form/media elements are excluded from direct transform freezing.
- Canvas, WebGL, animated image pixels, and motion inside cross-origin frames are not rewritten. The extension addresses common inspectable page motion without claiming universal or clinical protection.
- Billing will return unavailable until the factory registers the `calm-scroll` product/price and return URL in the Sociobot engine. No product ID or payment-provider code is hardcoded.

## Factory next steps

1. Register the production Sociobot product for slug `calm-scroll`, price $12 USD one time, with return URL `https://calm-scroll.sociobot.in/#support`.
2. Deploy `dist/site/` and verify the hosted checkout return and CORS verification from the production origin.
3. Publish/sign the extension through the target browser store; replace the developer-install copy with the store link when approved.
4. Run the two-week pilot against the brief’s adoption and self-reported abandonment targets, then prioritize site-specific compatibility reports.
