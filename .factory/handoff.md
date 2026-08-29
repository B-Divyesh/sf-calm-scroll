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

## Deploy and final cold check

Deploy `dist/site/` with `/opt/fleet/lib/deploy-static.sh calm-scroll dist/site`. After deployment, cold checks cover the home page, `/?demo=1`, Privacy, Terms, the designed 404, all declared claims, console errors, same-origin requests, focus navigation, metadata, and the service-worker offline demo behavior. `scripts/verify-live.mjs` verifies headers, archive checksum, release identity, cache policy, and HTTP 404.

## Known gaps

None. The Chrome Web Store listing is intentionally not advertised; installation remains the documented desktop Chromium developer-install ZIP path.
