# Calm Scroll — verification 4 handoff

> **FAIL — do not release candidate `72b9963f11448f4d1a67637467e1f69e02d38ce6`.**
> Independent verification found F-4-1: required 390 px mobile touch targets
> are undersized. Header `Demo` measures 41.7 × 44 px, `Install` measures
> 43.4 × 44 px, and footer links are 15–18 px high. The acceptance contract
> requires 44 × 44 px. See `.factory/verification-4.md` for exact evidence.

## Outcome

Round six closes F-6-1 and preserves every earlier repair. The unsupported
`web-share=()` token is gone from the production Permissions-Policy, so cold
loads no longer produce that Chromium warning. The local preview now serves
the same global response headers as production, and both local route tests and
the live verifier reject Permissions-Policy warnings.

The browser-extension artifact and deployment class are unchanged. The direct
job wording, one-click isolated `?demo=1` path, banner/reset/exit behavior,
eleven claim tests, real URLs, focus handling, styled 404, legal routes, mobile
layout, dark-theme contrast, and neo-brutalist motion-control identity remain
intact. `.factory/catalog-description.txt` is now a 73-character verb-first
sentence.

## Verification

Fresh clone: `/tmp/calm-scroll-polish6-final`.

```sh
npm ci
npm run test:claims -- --grep @claim:<id>  # run separately for all 11 IDs
npm run check
npm run test:package
```

All eleven exact claim commands pass. `npm run check` passes TypeScript, 26
Vitest checks, 56 Playwright checks, four expected phone-project skips for
desktop-only unpacked-extension tests, and the production build. Browser tests
cover all public routes at 1440 × 900 and 390 × 844 in both color schemes.
They fail on serious/critical Axe findings, page errors, console errors, or any
Permissions-Policy warning.

`npm run test:package` reproduces the extension archive three times with
SHA-256 `ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.
The site build remains 2.23 KB gzip of first-load JavaScript and 5.01 KB gzip
of CSS. Local mobile Lighthouse scores 100 performance, 100 accessibility,
100 best practices, and 100 SEO; LCP is 1.2 seconds, CLS is 0, and TBT is 0 ms.

`/opt/fleet/lib/verify-url.sh` passes on home, demo, Privacy, Terms, and 404.
Its screenshots and reports are under `.factory/evidence/polish-6-local-*`.
The Lighthouse report is
`.factory/evidence/polish-6-local-home/lighthouse.json`.

## Deployment and live verification

Build and deploy the static artifact with the work-order path:

```sh
npm run build
/opt/fleet/lib/deploy-static.sh calm-scroll dist/site
EXPECTED_RELEASE_SHA="$(git rev-parse HEAD)" npm run test:live
```

The final live check covers response headers, the exact release identity,
archive checksum, all public routes, both widths and themes, Axe, console and
Permissions-Policy warnings, same-origin demo traffic, isolated/reset demo
storage, focus and Back navigation, HTTP 404, and offline operation. Cold live
screenshots and reports are under `.factory/evidence/polish-6-live-*`.

Deployment `44097aef-6f42-497b-bb0e-c90d12982b1c` published source commit
`8d6c04709324121f0608ba787b70d387e3a30f13`. Its exact-release live suite
passed with ZIP SHA-256
`ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.
The observed production Permissions-Policy omits `web-share`, and an invented
URL returns HTTP 404.

## Documentation and remaining work

`.factory/polish-6.md` maps every finding from reviews 1–6 to its repair and
evidence. `.factory/claims.json`, `.factory/demo.md`, `.factory/design.md`,
`README.md`, `LICENSE`, `/privacy/`, and `/terms/` remain current.

Known release-blocking gap: F-4-1 mobile touch targets. Repair every visible
link/control to a non-overlapping 44 × 44 px hit area and rerun the verification
commands in `.factory/verification-4.md`. No product code was changed during
this verification.
