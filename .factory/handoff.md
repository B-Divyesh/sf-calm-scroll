# Calm Scroll polish round 4 handoff

## Outcome

Repair commit: `872f8dd96b22becca2e9706bf037b54d5cb5be2c`.

The last review finding, `F-4-1`, is fixed. The MIT/free-software promise is now a declared `mit-license` claim with one tagged browser test. The packaged extension now carries `LICENSE`, and that test proves the shipped license, README pointer, and Terms wording agree.

The catalog sentence is now: “Try sample page motion controls before installing the extension.” It is verb-first and 64 characters.

## Clean-clone verification

Fresh checkout: `/tmp/calm-scroll-polish-4-clean-zxZW4l` at repair commit `872f8dd`.

- `npm ci` — passed; 0 vulnerabilities reported.
- Every exact command in `.factory/claims.json` — passed: `demo-isolation`, `demo-responsive`, `sample-motion-controls`, `sample-exceptions`, `local-settings`, `extension-desktop-chromium`, `private-first-load`, `offline-demo`, `health-boundary`, and `mit-license`.
- `npx tsc --noEmit` — passed.
- `npm test` — passed: 23 Vitest tests and 46 Playwright tests across desktop Chromium and 390 px mobile.
- `npm run build` — passed; produced `dist/site/` and `dist/extension/chrome-mv3/`.
- `npm run test:package` — passed; three clean builds produced the identical extension ZIP: `9a1c9f6d4bd4c564342de621a554a33493cbf3c8615156957aa4a36cb94cdcfd`.
- Local mobile Lighthouse — Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.20 s, CLS 0, TBT 0. Evidence: `.factory/evidence/polish-4-local-home/lighthouse.json`.
- Local desktop and 390 px captures: `.factory/evidence/polish-4-local-home/`, `.factory/evidence/polish-4-local-demo/`, `.factory/evidence/polish-4-local-terms/`, and `.factory/evidence/polish-4-local-404/`.

## Deployment and live verification

- Deployed with the work-order static configuration: `npm ci && npm test && npm run build:site`, then `/opt/fleet/lib/deploy-static.sh calm-scroll dist/site`.
- Azure Static Web Apps deployment `8c9bc77b-ef19-4d27-8a00-abf2d8147939` succeeded to the existing `sf-calm-scroll` app; `https://calm-scroll.sociobot.in/` returned HTTPS 200.
- Cold live `release.json` identified deployment commit `628303cfcb6d0ed65c4e1603ab20e6938bf252a6` and ZIP SHA-256 `9a1c9f6d4bd4c564342de621a554a33493cbf3c8615156957aa4a36cb94cdcfd`.
- `EXPECTED_RELEASE_SHA=628303cfcb6d0ed65c4e1603ab20e6938bf252a6 npm run test:live` — passed. It checked cold browser loading, headers, package checksum, routing/404, 390 px layout, Axe serious/critical issues, same-origin privacy, isolated demo reset, route focus, and offline Stable mode.
- Fresh desktop and mobile captures: `.factory/evidence/polish-4-live-home/`, `.factory/evidence/polish-4-live-demo/`, `.factory/evidence/polish-4-live-terms/`, and `.factory/evidence/polish-4-live-404/`.
- Direct live license check — passed: the Terms MIT promise rendered at `/terms/`, and `LICENSE` extracted from the published extension ZIP byte-matched the repository MIT license.

## Known gaps

None. The product remains a local-first MV3 browser extension with a static landing site. No AI feature is appropriate for this motion-control task, and no paid flow is advertised because no verified checkout is available.
