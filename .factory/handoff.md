# Calm Scroll polish round 1 handoff

## Outcome

Repaired review base `fbc22f96cbc88f60f7fd1cb37f7a3a24a28c135e` in code commit `ccd3ef90e2a76afe175163d2de51fad4f10f1bdd`. The landing now starts with the accessibility job and audience, `/demo/` is an isolated one-click interactive sample, and the extension has local settings export/import with validation and merge/replace choice.

The dead paid checkout and its unsupported Supporter claims were removed. The free extension’s motion controls remain available. Added real metadata, shared route chrome, focus/announcement handling for internal section navigation, a styled 404 deployment override, legal links, offline demo caching, and a 1200×630 product social image.

Every review ID is mapped to its change and evidence in `.factory/polish-1.md`.

## Verification evidence

- Clean clone: `/tmp/calm-scroll-clean-w2QKEI`, cloned at `ccd3ef90`; `npm ci` installed 401 packages with 0 audit vulnerabilities.
- Clean-clone suite: `npm test` passed 16 Vitest tests and 31 Playwright tests; one mobile extension test skipped by design because Chromium extensions are desktop-only.
- Every registered claim command passed in the clean clone: `demo-isolation`, `sample-motion-controls`, `sample-exceptions`, `local-settings`, `private-first-load`, `offline-demo`, and `health-boundary`.
- `npm run build` passed. Output: initial site JS 0.60 kB raw plus 1.78 kB demo JS; CSS 18.51 kB raw. `dist/site/` and the extension ZIP were produced.
- `npm run test:package` passed three independent builds with identical extension ZIP SHA-256: `bb331214c05faf071b74096e2c6acc3a8526f9821be0cf97661cc2d9bc513531`.
- Browser accessibility: axe serious/critical violations were zero on `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` at desktop and 390px. Tests also cover no overflow, reduced motion, skip link shell, route heading focus, request privacy, and offline demo reload.
- Local static preview returned 200 for `/` and `/demo/`. Static Web Apps is configured to rewrite a real host 404 to `/404.html` using `responseOverrides`.

## Run

```bash
npm ci
npx playwright install chromium
npm test
npm run build
npm run test:package
```

Use `https://calm-scroll.sociobot.in/demo/` after deployment. Reset demo clears `demo:calm-scroll:sample`; it never touches extension or license storage.

## Deployment note

This repository contains the static deployment root and Static Web Apps configuration but no deploy workflow or credentials. Push the committed main branch through the factory deployment work order, then cold-open `/`, `/demo/`, `/privacy/`, `/terms/`, and an unknown route to confirm the configured 404 response and current release identity.

## Known gaps

None in the reviewed product scope. Live deployment confirmation is pending the external factory deployment because no deploy command/configuration is present in this repository.
