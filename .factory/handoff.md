# Calm Scroll polish 3 handoff

## Outcome

This repair closes every cumulative finding from `review-1.md`, `review-2.md`, and `review-3.md`. The repair code commit is `f06666c295fafecbab7802802f729ccb8b7237a4`.

- Removed the stale Chrome Web Store availability sentence instead of retaining a time-sensitive untested claim.
- Narrowed Privacy's offline statement to the exact demo route that is tested offline.
- Added the README's isolated-demo assertion to `demo-isolation.where` and guarded it in the exact claim test.
- Updated the catalog description to the verb-first, 10-word sentence: “Try a sample that stops page motion while you read.”
- Preserved the MV3 extension, static landing site, isolated `?demo=1` flow, original neo-brutalist control-panel identity, shared route shell, metadata, legal pages, and real HTTP 404.

## Exact verification evidence

Fresh remote clone: `/tmp/calm-scroll-polish-3-qvtYir` at `f06666c295fafecbab7802802f729ccb8b7237a4`.

Passed from that clone:

- `npm ci`
- Every command in `.factory/claims.json` independently: `demo-isolation`, `demo-responsive`, `sample-motion-controls`, `sample-exceptions`, `local-settings`, `extension-desktop-chromium`, `private-first-load`, `offline-demo`, and `health-boundary`.
- `npx tsc --noEmit`
- `npm test`: 22 Vitest tests passed; 41 Playwright tests passed; 3 mobile-only MV3 tests skipped as intended because unpacked extensions require desktop Chromium.
- `npm run build`: produced `dist/site/` and `dist/extension/chrome-mv3/`.
- `npm run test:package`: three clean builds produced the identical ZIP checksum `bb331214c05faf071b74096e2c6acc3a8526f9821be0cf97661cc2d9bc513531`.

Local visual evidence was reviewed at:

- `.factory/evidence/polish-3-local-home/screenshot-desktop.png`
- `.factory/evidence/polish-3-local-home/screenshot-mobile.png`
- `.factory/evidence/polish-3-local-demo/screenshot-desktop.png`
- `.factory/evidence/polish-3-local-demo/screenshot-mobile.png`
- `.factory/evidence/polish-3-local-privacy/screenshot-desktop.png`

The full finding map is in `.factory/polish-3.md`. Local AxeBuilder checks cover home, demo, Privacy, Terms, and 404 at desktop and 390 px with zero serious or critical violations.

## Deployment and final cold check

Deployed `dist/site/` with `/opt/fleet/lib/deploy-static.sh calm-scroll dist/site`. Azure Static Web Apps deployment `c11c4093-1e9b-40e0-a21d-756577f397a6` completed successfully. `EXPECTED_RELEASE_SHA=686c3601d80ad5479318497933c8f9eea15eee68 npm run test:live` passed: release identity, SHA-256 `bb331214c05faf071b74096e2c6acc3a8526f9821be0cf97661cc2d9bc513531`, CSP, cache policy, headers, ZIP sidecar, and the invented-route HTTP 404 all matched.

Cold production evidence is stored under `.factory/evidence/polish-3-live-home/`, `polish-3-live-demo/`, `polish-3-live-privacy/`, `polish-3-live-terms/`, and `polish-3-live-404/`. `/opt/fleet/lib/verify-url.sh` reported zero console errors; `lang="en"`; one h1 and main landmark; no images missing alt text; and no unlabeled buttons on home, `?demo=1`, Privacy, Terms, and 404.

Live AxeBuilder checks at 1440 px and 390 px found zero serious or critical violations on home, demo, Privacy, Terms, and 404. A fresh 390 px demo check recorded the banner, only `demo:calm-scroll:sample` after use, Reset removal, `390 === scrollWidth`, same-origin-only requests, and the designed 404. A desktop cold check confirmed header navigation and Back focus/announce the destination heading, the exact narrowed Privacy sentence, absence of the stale cache sentence, and offline reload of `/demo/` after its first online visit.

## Known gaps

None. The Chrome Web Store listing is intentionally not advertised; installation remains the documented desktop Chromium developer-install ZIP path.
