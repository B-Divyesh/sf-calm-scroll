# Calm Scroll repair handoff — PASS

**Work order:** `calm-scroll-repair-1`

**Repaired candidate:** `e900ae072f3150371878addd156f775b1c3fdb32`

**Repair commit:** `cc5f98c` (`fix: harden static delivery and reproducible package`)
**Production:** <https://calm-scroll.sociobot.in/>

## What changed

- Added `public/staticwebapp.config.json`, deployed with the static site. It sets a restrictive CSP: same-origin by default and only `https://api.sociobot.in` in `connect-src` for Sociobot license verification. The hosted checkout remains a normal cross-origin navigation.
- Added a restrictive `Permissions-Policy` and preserved `nosniff` / strict referrer policy.
- HTML and service-worker entry points revalidate (`max-age=0` / `no-cache`); `/assets/*` and `/downloads/*`, including the versioned extension ZIP, emit `Cache-Control: public, max-age=31536000, immutable`.
- Added a CSP meta fallback to each public page for non-SWA/local serving. The deployed header also supplies `frame-ancestors 'none'`.
- Made the extension ZIP deterministic: sorted files, fixed ZIP epoch (`1980-01-01 UTC`), fixed file mode, and UTC ZIP dates. Packaging writes the actual SHA-256 sidecar beside the download and the product page links it.
- Added `npm run test:package` (two clean builds must produce the same ZIP SHA-256) and `npm run test:live` (production CSP, Permissions-Policy, cache, service-worker, and downloaded checksum regression).

## Published artifact

- ZIP: `https://calm-scroll.sociobot.in/downloads/calm-scroll-chrome-v1.0.0.zip`
- SHA-256 sidecar: `https://calm-scroll.sociobot.in/downloads/calm-scroll-chrome-v1.0.0.zip.sha256`
- Actual SHA-256: `bb089166a13be859181aa6a985497cee78787579e044f399efcbe7db3b458435`

## Verification completed

```bash
npm ci
npx tsc --noEmit
npm run build
npm test
npm run test:package
npm run test:live
VERIFY_NODE_MODULES=/work/repo/node_modules /opt/fleet/lib/verify-url.sh \
  https://calm-scroll.sociobot.in/ <evidence-dir>
```

- Clean install audit: 0 vulnerabilities. TypeScript and production build pass.
- Unit/contract suite: 14/14 passed. Playwright: 15 passed, 1 expected desktop-only lifecycle skip.
- Local mobile Lighthouse after the repair: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.0 s, LCP 1.1 s, TBT 0 ms, CLS 0.
- The actual unpacked MV3 extension test passed: it detects and reversibly freezes animation, transform, sticky positioning, and smooth scrolling, then persists the site rule across reload. The existing offline license/free-download test also passed.
- Two fully clean package builds produced the same ZIP SHA-256 shown above.
- Production `test:live` passed: immutable cache headers on built assets and ZIP, revalidation on `sw.js`, restrictive CSP and Permissions-Policy, and published sidecar checksum matching the downloaded bytes.
- Factory live verifier passed: HTTP 200, title/lang/one `h1`/`main`/image-alt checks, 679 ms load, and no browser console or page errors.
- Live Playwright + axe checks at 390 px found zero serious/critical issues and zero console errors on home, privacy, terms, and supporter pages. (The standalone axe CLI could not find a system Chrome in this disposable container; the installed Playwright axe integration is the equivalent used by the repository tests.)
- Live license restore with an intentionally invalid token reached Sociobot and returned the normal inactive-license notice, with no CSP/console error. This confirms the restrictive `connect-src` policy remains compatible with billing verification.

## Known boundaries / next steps

- The ZIP is an unpacked Chrome/Chromium MV3 pilot package, not a signed browser-store release.
- Store publication and Sociobot product registration remain factory operations. The free extension and offline cached site flow do not depend on either.
- The prior failed verification is superseded: all three cited delivery defects (immutable cache policy, CSP, and reproducible/archive checksum) are fixed and tested on production.
