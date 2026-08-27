# Independent verification 2 — FAIL

**Work order:** `calm-scroll-verify-2`
**Date:** 2026-08-27
**Candidate supplied for acceptance:** `d016a05ba71ce9e51b423808c6e68b123dea5f4a`
**Live URL:** <https://calm-scroll.sociobot.in/>
**Verdict:** **FAIL — the candidate cannot be identified, checked out, or matched to the deployment. Do not accept/release it.**

## Release blockers

### S1 — Candidate provenance and deployment identity cannot be established

This disposable clean checkout began on `ce31a675b3828e4fca0c043207e203995c2c8625`, the sole `main`/`HEAD` advertised by `origin`. The requested candidate does not exist in this clone or on the stated GitHub repository:

```text
git rev-parse d016a05ba71ce9e51b423808c6e68b123dea5f4a
# fatal: bad object

git fetch origin d016a05ba71ce9e51b423808c6e68b123dea5f4a
# remote error: upload-pack: not our ref

GET /repos/B-Divyesh/sf-calm-scroll/commits/d016...
# 422: No commit found for SHA
```

`git ls-remote origin` advertised only `ce31a675...`. Consequently no clean candidate install, exact candidate build, or candidate/live comparison is possible.

The deployment is not byte-identical to that only available commit's build either: local `index.html` SHA-256 was `81fbe47d…`, live home HTML was `d61c3cb7…`; the local freshly built ZIP was `bb089166…`, live ZIP was `359d4f00…`. (The deployed JS and CSS did match the available commit, so this is not evidence for or against the unavailable candidate.) A deployment-only artifact is not sufficient evidence for the requested Git commit.

### S2 — Required deterministic-package regression test fails on the available repository revision

`npm run test:package` ran two clean production builds and failed because their extension archives differed:

```text
ca8058da2cd58ea89c353b61927dbedf72812294f2db1462a51c8ca76be3aa02
!=
bb089166a13be859181aa6a985497cee78787579e044f399efcbe7db3b458435
```

This contradicts the current handoff's reproducibility claim and leaves the package quality gate red. It was observed on `ce31a675…`, not claimed as a finding against an uncheckoutable SHA.

## Checks completed (supporting evidence only; all local checks use `ce31a675…`)

### Clean install, static checks, tests, and build

```bash
npm ci                         # 401 packages; 0 vulnerabilities
npx playwright install chromium
npx tsc --noEmit               # pass
npm test                        # 14/14 Vitest pass; 15 Playwright pass, 1 expected mobile extension skip
npm run build                   # pass
npm run test:package            # FAIL; hashes above
npm run test:live               # pass
```

No lint script is defined in `package.json`. The exact production build produced `dist/site/`, `.output/chrome-mv3/`, and the pilot ZIP. Initial JS is 2.94 kB raw (1.45 kB gzip) and CSS is 14.86 kB raw (3.97 kB gzip), within the supplied 200 kB/50 kB budgets. A local mobile Lighthouse run (full-page screenshot disabled due a Chromium screenshot-process crash) scored Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP/LCP 1.7 s, TBT 0 ms, CLS 0.

### End-to-end extension evidence from the deployed ZIP

The live downloadable ZIP SHA-256 was `359d4f002cdf5389ef0264f7d4ca0d0d130e6e3596abba822e58e4048d8fd3cd`, matching its published sidecar. I loaded that unpacked MV3 extension in Chromium against a controlled ordinary-page fixture with autoplay video, CSS animation/transition, transform, sticky layer, and smooth scrolling.

- Popup reported 5 sources for `qa.invalid`.
- Keyboard-only Space on the `role=switch` applied Stable mode: animation `none`, transform `none`, sticky `static`, root scroll behavior `auto`, and video autoplay `false`.
- A reload preserved Stable mode; another Space restored `drift`, the 20 px transform, sticky positioning, and smooth scrolling.

### Live site, accessibility, privacy, and recovery evidence

- Desktop and 390 × 844 mobile checks on `/`, `/privacy/`, `/terms/`, and `/supporter/`: each has one `h1`, a `main`, the expected title, no page/console errors, and zero axe serious/critical findings.
- Keyboard-only: first Tab reaches “Skip to main content” with a solid `rgb(21, 94, 239)` outline; Enter navigates to `#main`. The extension popup switch was independently exercised by Space above.
- At 390 px, `scrollWidth === clientWidth === 390`; under reduced motion the primary control's transition duration is `1e-05s`.
- Blank license restore gives the labeled, live recovery text. An invalid token requests only `https://api.sociobot.in/api/v1/products/calm-scroll/verify`, produces “License no longer active…”, and causes no console error. A normal anonymous page load made same-origin requests only.
- After service-worker activation, an offline mobile reload rendered the home `h1` and title successfully.
- Live response policies are healthy: restrictive same-origin CSP with the documented Sociobot `connect-src`, `frame-ancestors 'none'`, restrictive Permissions-Policy, HSTS, `nosniff`, and strict-origin referrer policy. Hashed JS/CSS and the ZIP are `max-age=31536000, immutable`; HTML revalidates and `sw.js` is `no-cache, no-store, must-revalidate`.

## Retest criteria

1. Publish the exact candidate commit to the stated repository (or provide an immutable, auditable artifact/source reference), then permit a clean checkout of it.
2. Redeploy that exact build and provide an observable build identity or byte-comparable artifacts.
3. Repair `npm run test:package` so two clean builds produce the same archive hash, then rerun the package test and this verification.
