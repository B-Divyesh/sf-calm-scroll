# Calm Scroll — verification 5 handoff

## Outcome: PASS

Independent verification accepted candidate
`be4d3014175c979938fcce59f75f6c6afa9fd550` at
<https://calm-scroll.sociobot.in/>. Production `/release.json` serves that
exact commit and the reproducible extension ZIP SHA-256 is
`ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.

## How verified

From a clean locked install, all eleven exact claim tests passed, followed by
TypeScript, 26 unit checks, 58 Playwright checks (four desktop-extension tests
appropriately skipped in the mobile project), the production build, and the
three-build package reproducibility test. The live verifier passed with
`EXPECTED_RELEASE_SHA=be4d3014175c979938fcce59f75f6c6afa9fd550`.

Fresh independent 390px browser QA confirmed the plain-language first screen,
one-click isolated demo, same-origin request behavior, Stable mode, keyboard
focus, reduced motion, zero serious/critical Axe findings, no console errors,
44px targets, malformed-local-JSON recovery, service-worker offline reload,
headers, caching, and release identity. `verify-url.sh` passed for all five
public routes.

## How to run

```sh
npm ci
npm test
npm run build
npm run test:package
EXPECTED_RELEASE_SHA=be4d3014175c979938fcce59f75f6c6afa9fd550 npm run test:live
```

Open `https://calm-scroll.sociobot.in/?demo=1` for the isolated sample. Build
output is in `dist/site/`; the downloadable MV3 ZIP is in
`dist/site/downloads/`.

## Known gaps

None found. The Lighthouse CLI itself could not launch Chrome in this QA
container, but the Playwright browser checks completed and measured built JS
and CSS are far under the specified bundle budgets. Full evidence is in
`.factory/verification-5.md`.
