# Calm Scroll — repair 4 handoff

## Outcome

F-4-1 from `.factory/verification-4.md` is repaired. At a 390 × 844 CSS px
viewport, every visible public link, button, and input now has a real minimum
44 × 44 px activation box. This includes header `Demo` and `Install`, every
footer link, the checksum and source-record links, and the demo checkboxes.
Targets are also asserted not to overlap. The skip link receives the same size
when focused.

The root cause was text-sized anchor boxes: header links had only a minimum
height, while footer and inline links had no target sizing at all. The repair
uses a shared target rule rather than padding individual labels. Demo
checkboxes are now 44 px custom square controls with the existing
neo-brutalist visual language preserved.

The static preview server now applies the route-specific cache headers in
`staticwebapp.config.json`, so the local consumer delivery check exercises the
same immutable asset, download, and revalidating service-worker policy as the
deployment configuration.

## Regression coverage

`tests/e2e/site.spec.ts` now visits `/`, `/demo/`, `/privacy/`, `/terms/`, and
`/404.html` at 390 px. It measures every visible `a`, `button`, and `input`,
requires width and height of at least 44 px, checks pairwise target overlap,
and focuses/measures the skip link. `scripts/verify-live.mjs` runs the same
consumer-facing check against the deployed site at 390 px.

Before the fix, the new regression failed on the original candidate with the
verifier’s values: header `Demo` 41.7 × 44, header `Install` 43.4 × 44,
footer `Demo` 41.7 × 18, `Privacy` 53.4 × 18, `Terms` 43.9 × 18, checksum
15 px high, and source record 15 px high. After the fix the regression passes
in both desktop-Chromium and mobile-390 projects.

## Verification

Fresh install and local verification completed from `/work/repo`:

```sh
npm ci
npx tsc --noEmit
npm test                         # 26 Vitest + 62 Playwright checks
npm run test:claims              # 19 passed; 3 expected mobile skips
npm run build
npm run test:package             # ZIP reproduced across 3 clean builds
LIVE_URL=http://127.0.0.1:4173 EXPECTED_RELEASE_SHA=$(git rev-parse HEAD) npm run test:live
```

The extension ZIP is reproducible with SHA-256:

```text
ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d
```

The local consumer verifier passed delivery headers, exact release identity,
extension checksum, desktop and 390 px routes in light/dark mode, the new
touch-target test, Axe serious/critical findings, console errors, keyboard
focus/Back behavior, same-origin demo traffic, demo reset isolation, 404,
service-worker activation/update, and offline demo operation.

`/opt/fleet/lib/verify-url.sh` also passed on home, demo, Privacy, Terms, and
404: all have titles, `lang=en`, exactly one h1 and main landmark, image alt
text, and no console errors. Evidence is in
`.factory/evidence/repair-4-local-*`.

## Deployment and live verification

Deployment `39578086-e99d-4c2f-9933-ea53da53691e` published
`a2fb47835bc39ed692408b2f27fe521b7d888595` to
`https://calm-scroll.sociobot.in`.

```sh
EXPECTED_RELEASE_SHA=a2fb47835bc39ed692408b2f27fe521b7d888595 npm run test:live
```

passed against production. It verified the release identity, immutable assets
and downloadable extension checksum, response policies, HTTP 404, public
routes at desktop and 390 px in both themes, the 44 px/no-overlap regression,
serious/critical Axe findings, console errors, same-origin demo traffic,
keyboard focus/Back behavior, service-worker update/control, and offline demo
behavior.

`verify-url.sh` passed again on all five live routes. Its desktop/mobile
captures and reports are in `.factory/evidence/repair-4-live-*`.

## Known gaps

None. The browser-extension artifact and static deployment class are
unchanged. All existing claim behavior remains covered by the full suite.
