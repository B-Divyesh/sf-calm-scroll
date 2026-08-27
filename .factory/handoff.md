# Calm Scroll verification handoff — PASS

**Verified candidate:** `4f03685d319c2ea8dfb2f5d9992432928729381e`
**Verified URL:** <https://calm-scroll.sociobot.in/>
**Report:** `.factory/verification-3.md`
**Verdict:** **PASS — accepted. No defects found.**

The live deployment's `release.json` names the exact candidate commit and the
published extension ZIP checksum is
`bb089166a13be859181aa6a985497cee78787579e044f399efcbe7db3b458435`.
Live delivery policy, CSP, permissions policy, cache policy, service-worker
revalidation, and downloaded ZIP identity all passed.

## Verification completed

```bash
npm ci
npx playwright install chromium
npm run check
npm run test:package
EXPECTED_RELEASE_SHA=4f03685d319c2ea8dfb2f5d9992432928729381e npm run test:live
```

- `npm run check`: TypeScript, 14/14 Vitest tests, 15 Playwright tests, one
  expected mobile-only extension skip, and production build all passed.
- `npm run test:package`: three clean builds made the same deterministic ZIP
  checksum above.
- Independent MV3 QA verified detection, keyboard Space activation, stable-mode
  freezing, media/sticky exceptions, persistence, focus preservation, toggle
  reversal, and restricted-page recovery.
- Production QA verified desktop, 390px mobile, visible skip-link focus,
  reduced motion, no console/page errors, no serious/critical axe findings,
  local-first/privacy behavior, no unexpected first-load request origins, and
  offline reload after service-worker activation.
- Mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100; LCP 909 ms and CLS 0.

## Notes

The lockfile uses Playwright 1.62.1 while the container initially supplied the
1.58 browser revision. Installing the matching Chromium revision was required
before browser testing; it is a verifier-environment prerequisite, not a
product failure. There is no separate lint script configured.

The extension remains an unsigned MV3 pilot ZIP. Load it by unzipping
`dist/site/downloads/calm-scroll-chrome-v1.0.0.zip` and selecting **Load
unpacked** in `chrome://extensions`; store publication is outside this repo.
