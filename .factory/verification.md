# Independent verification 1 — FAIL

**Work order:** `calm-scroll-verify-1`
**Date:** 2026-08-27
**Candidate:** `e900ae072f3150371878addd156f775b1c3fdb32`
**Live URL:** <https://calm-scroll.sociobot.in/>
**Verdict:** **FAIL — do not release/accept until the production delivery-policy defects below are resolved.**

## Scope and environment

Verification began with a clean checkout at the candidate SHA and `npm ci` (401 packages; audit reported 0 vulnerabilities). The clean container did not initially contain the Playwright Chromium revision specified by the lockfile, so `npx playwright install chromium` was run before the browser suite was rerun. This is a test-environment prerequisite, not a product failure.

Commands run successfully:

```bash
npm ci
npx playwright install chromium
npx tsc --noEmit
npm test
npm run build
```

Results:

- TypeScript: pass.
- Vitest: 14/14 pass.
- Playwright: 15 pass, 1 expected skip (the extension lifecycle test is intentionally desktop-only).
- Exact production build: pass; `dist/site/`, `dist/extension/chrome-mv3/`, and the Chrome pilot zip were produced.
- Mobile local Lighthouse, with full-page screenshot disabled to avoid a Chromium screenshot-process crash: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.2 s, TBT 0 ms, CLS 0.

## Independent end-to-end evidence

I loaded the built MV3 extension in Chromium and routed a representative ordinary HTTP page containing an autoplay video, CSS animation and transition, transformed element, sticky layer, and smooth scrolling. The popup reported 5 motion sources. Keyboard-only Space activation of the `role=switch` control applied Stable mode: animation `none`, transform `none`, sticky position `static`, root scroll behavior `auto`, and autoplay property `false`. A second Space restored the original animation, transform, sticky behavior, scroll behavior, and autoplay.

The live site was separately exercised on desktop and a 390 × 844 mobile viewport:

- Home, privacy, terms, and supporter pages each had exactly one visible `h1`; axe found no serious or critical violations on any of them.
- The first Tab reaches the skip link, which has a solid visible focus outline; Enter moves to `#main`.
- At 390 px the document width was exactly 390 px (no horizontal overflow). With reduced motion, the primary-button transition duration was `0.00001s`.
- Empty license restore reports the labeled recovery message. Offline restore reports the offline state and leaves the free download usable. After service-worker activation and an online reload, an offline reload rendered the home `h1` successfully.
- No console errors or page errors occurred. Source and a clean browser request trace found no tracking or third-party runtime/font/CDN requests. The only outbound requests observed followed an intentionally pasted test license token and went solely to the documented `https://api.sociobot.in` verification endpoint.
- The extension manifest requests only `storage` and `activeTab`, plus HTTP(S) host access. Source inspection found browser-local hostname rules, no analytics, remote extension work, or remote fonts/scripts.

## Candidate/live identity

The live home HTML SHA-256 exactly matched the fresh candidate build:

```text
c0d9d81530134011e4457a6a5aefca1ff002eae6f9c25ad88d669bbd2171386f
```

The live `main-Crzz5pQG.js` and `style-2HifDLED.css` also matched the built files byte-for-byte. The downloaded live zip and a fresh zip have different archive-level hashes because the packaging process writes timestamps, but their complete extracted path-and-file-SHA256 manifests are identical; the deployed extension contents therefore match the candidate build.

## Release-blocking defects

### S2 — Fingerprinted static assets are not cached immutably in production

The delivery contract requires long-lived immutable caching for hashed assets. Fresh `HEAD` responses from the live deployment returned this header for the fingerprinted JS, fingerprinted CSS, responsive AVIF, and extension zip:

```text
Cache-Control: public, must-revalidate, max-age=30
```

Examples checked: `/assets/main-Crzz5pQG.js`, `/assets/style-2HifDLED.css`, `/assets/calm-scroll-hero-768.avif`, and `/downloads/calm-scroll-chrome-v1.0.0.zip`.

Set an immutable, long-lived cache policy for fingerprinted build assets and the versioned zip; retain a short revalidation policy only for HTML/service-worker entry points. This is a production/deployment configuration change, not a code change made by this verifier.

### S2 — Live pages have no Content-Security-Policy

The home, privacy, terms, supporter, service-worker, asset, and zip responses contained HSTS, `X-Content-Type-Options`, and a referrer policy, but no `Content-Security-Policy` header (nor a CSP meta policy in the HTML). The site stores an optional license token in `localStorage`; a restrictive CSP is required defense in depth and is part of the requested browser response-policy review.

Deploy a CSP that permits only same-origin assets and the documented Sociobot checkout/verification endpoints as required, then re-run the interactive license and service-worker checks.

### S3 — The documented extension checksum is not the deployed artifact and builds are not byte-reproducible

`.factory/handoff.md` previously documented `a211412f4f8eb6431d68b5805448340a9fd86e47893ab3258d723185f7e76f76`. The actual live download SHA-256 is `b919937733081a13e40ae05a66d643fd1dfe5875ea4af420f5b33b4c9d37fe14`; a fresh exact candidate build produced `08141feabb0c2890861f611d59bbe063d31a08995fd3cab617c51eff2e090310`. Contents are equivalent, but the published integrity value is false and the archive is timestamp-dependent. Publish the actual deployed checksum or make packaging deterministic before presenting a checksum to users.

## Response-policy observations

Positive live headers: HTTPS, `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Content-Type-Options: nosniff`. Negative policy findings are the two S2 defects above. No redirects or console failures were observed for the tested public routes.

## Retest criteria

1. Configure immutable caching for versioned/fingerprinted assets and zip downloads.
2. Add and validate a restrictive production CSP without breaking license checkout/verification or service-worker offline reload.
3. Correct the published checksum and make the release archive deterministic, or stop publishing a reproducibility claim.
4. Re-run this verification against the new deployed artifact.
