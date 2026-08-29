# Calm Scroll polish round 2 handoff

## Outcome

All findings from review rounds 1 and 2 are resolved in the browser-extension artifact and its static product site. The neo-brutalist motion-control identity is preserved. No AI or paid flow was added because neither serves the brief; the previously broken unregistered checkout remains removed.

The one-click sample entry is <https://calm-scroll.sociobot.in/?demo=1>. It opens a realistic isolated demo, shows the persistent demo banner, and provides Reset demo and Start for real. Both exit actions discard `demo:calm-scroll:sample`; extension settings remain separate in `chrome.storage.local`.

## Main changes

- Removed the SPA navigation fallback so unknown URLs return the designed 404 response.
- Standardized Demo / Install / Privacy header navigation across home, demo, Privacy, Terms, and 404; it remains visible and keyboard-reachable at 390 px.
- Added shared cross-page and Back navigation focus plus polite route announcements.
- Completed canonical, Open Graph, Twitter, favicon, and touch metadata on every route.
- Reworked `.factory/claims.json` to nine precise claims and enforced one test tag per claim.
- Replaced the false `local-settings` surrogate with an unpacked-MV3 test of set → export → parse → clear → import → reload → restored behavior, with request recording.
- Rewrote or removed every claim sentence identified by review 2 and updated the full copy audit.
- Pinned Playwright and its core to the worker-provided `1.58.2` browser version.

Every finding-to-change-to-evidence mapping is in `.factory/polish-2.md`.

## Verification

Fresh clone: `/tmp/calm-scroll-polish-2-EbQd76` at implementation commit `03b70d73f1eff9029554011422082fa03f6d6617`.

```bash
npm ci
npm run test:claims -- --grep @claim:demo-isolation
npm run test:claims -- --grep @claim:demo-responsive
npm run test:claims -- --grep @claim:sample-motion-controls
npm run test:claims -- --grep @claim:sample-exceptions
npm run test:claims -- --grep @claim:local-settings
npm run test:claims -- --grep @claim:extension-desktop-chromium
npm run test:claims -- --grep @claim:private-first-load
npm run test:claims -- --grep @claim:offline-demo
npm run test:claims -- --grep @claim:health-boundary
npm test
npm run build
npm run test:package
```

Every command passed. `npm test` reported 21 unit/contract passes and 41 browser passes. Three mobile project skips are expected for unpacked desktop-extension tests. Axe found no serious or critical issue on five routes at both viewports. The nine claim commands passed independently. The package test produced identical bytes across three clean builds: SHA-256 `bb331214c05faf071b74096e2c6acc3a8526f9821be0cf97661cc2d9bc513531`.

Local production Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.1 s, CLS 0, total blocking time 0 ms. Built initial assets are 2.00 kB site JS, 18.69 kB CSS, and 16.8 kB mobile AVIF hero—well below the product budgets.

Local verification screenshots:

- `.factory/evidence/polish-2-local-home/screenshot-mobile.png`
- `.factory/evidence/polish-2-local-home/screenshot-desktop.png`
- `.factory/evidence/polish-2-local-demo/screenshot-mobile.png`
- `.factory/evidence/polish-2-local-demo/screenshot-desktop.png`

## Live deployment

Deployment and cold production evidence are recorded after the documentation commit is pushed. The required live checks are `npm run test:live`, `/opt/fleet/lib/verify-url.sh` for home and `?demo=1`, and explicit cold requests for all routes plus an invented path.

## Run locally

```bash
npm ci
npm test
npm run build
npm run preview:site
```

The deployment root is `dist/site/`; the unpacked extension is `dist/extension/chrome-mv3/`.

## Known gaps and next steps

None in repository scope. Chrome Web Store publication remains outside this repository and is stated plainly on the install section.
