# Calm Scroll — polish 5 handoff

## Outcome

Released the round-five repair for Calm Scroll, a local-first Chromium extension
that steadies distracting web-page motion while someone reads. Product repair:
`88c2ef9bfcf77f39e788587ae35ffebabe7719ff`.

The repair closes every item in reviews 1–5 and the controller retry:

- Dark mode now uses explicit high-contrast ink, surface, signal-blue, and
  focus tokens. Axe scans every public route at desktop and phone widths in
  light and dark themes.
- `?demo=1` is an isolated, one-click sample. It opens already stabilized,
  puts its report and stable-mode control in the first phone viewport, and
  keeps the Reset demo and Start for real controls in the persistent banner.
- The sample report now calls the shared scanner used by the extension rather
  than a separate demo-only detector.
- The privacy promise about extension data now has a real unpacked-MV3 claim
  test. It records the full request lifecycle while using seeded page text,
  form input, history, report counts, and Stable mode.
- Public compatibility wording is limited to the tested desktop Chromium
  installation path.

The product retains its motion-utility identity: the mechanical clamp artwork,
ink/yellow/blue palette, dense practical controls, and restrained movement are
unchanged. No new tracking, remote runtime dependency, paid feature, or AI
feature was added.

## Verification

Local evidence is in `.factory/evidence/polish-5-local/`:

- `demo-390-light.png` and `demo-390-dark.png`: the direct demo opens with a
  report, visible Stable mode control, and stabilized sample at 390 × 844.
- `home-1440-dark.png`: the dark landing screen and product-specific clamp art.
- `lighthouse-final.json`: Lighthouse local preview scores are performance 100,
  accessibility 100, best practices 100, and SEO 100; `runtimeError` is null.

From fresh clone `/tmp/calm-scroll-polish5-final-pass-6vKhRf` at
`59cd4bbd8a41c631b3c4d3627d54fc7d3a4076cb`, the exact eleven commands listed
in `.factory/claims.json` all passed, followed by `npm run check` and
`npm run test:package`. The reproducible ZIP SHA-256 was
`ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.
The claim commands cover demo isolation and responsiveness, visible motion
handling and exceptions, local settings, extension data privacy, Chromium
scope, first-load privacy, offline demo use, the health boundary, and MIT
packaging.

The normal local gate also passes:

```sh
npm run check
npm run test:package
```

`npm run check` type-checks, runs unit and browser coverage, then builds the
extension and static site into `dist/`. `npm run test:package` verifies the
deterministic packaged extension ZIP. Browser coverage includes focus/Back
navigation, skip links, route metadata, 404 behavior, legal links, download
links, mobile layout, offline demo reload, and both-theme Axe scans.

## Run and deploy

```sh
npm ci
npm run check
npm run test:package
npm run build
```

Install the generated `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip` in
desktop Chromium with `chrome://extensions` and Developer mode enabled. Try the
site sample directly at `/?demo=1`; its data stays under the `demo:` local
storage namespace and Reset demo clears only that namespace.

Deployment is the static-site work-order path: push `main`, then cold-check the
published release with:

```sh
EXPECTED_RELEASE_SHA="$(git rev-parse HEAD)" npm run test:live
```

The production command checks the release identity before checking
`https://calm-scroll.sociobot.in` in clean browser contexts. It includes the
same both-theme accessibility scan, demo viewport, privacy, routing, 404,
metadata, links, and offline behavior checks used for the repair.

## Documentation and limits

`README.md` explains who the extension is for, development, testing, packaging,
deployment, and its non-medical boundary. `/privacy` and `/terms` are real
routes. `.factory/demo.md` documents the sample and its isolation.
`.factory/polish-5.md` maps every cumulative review ID to its repair and
evidence. The original generated visual assets and their provenance remain
recorded in `.factory/design.md`.

Known gaps: none.
