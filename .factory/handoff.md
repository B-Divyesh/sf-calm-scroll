# Calm Scroll repair handoff — PASS

## Release repaired

**Work order:** `calm-scroll-repair-2`

**Verifier report repaired:** `257be2da3fe9abd8f50a6bfb3ae9841391ca3659` / `.factory/verification-2.md`

**Product:** browser extension plus static landing site
**Deployment root:** `dist/site/`

The supplied historical candidate `d016a05ba71ce9e51b423808c6e68b123dea5f4a` genuinely does not exist, so it cannot be made auditable retroactively. This repair publishes a new, auditable candidate: the repair code commit is `b22230eb47cb1669645be063e23acfd7d90bf852`; every production build now writes `dist/site/release.json` with its exact source commit and the SHA-256 of the downloadable extension. `npm run test:live` validates that identity, and `EXPECTED_RELEASE_SHA=<commit> npm run test:live` requires an exact live/source match.

## Findings repaired

1. **S1 provenance/deployment identity:** `scripts/release-metadata.mjs` generates a same-origin release identity after every production package. It names the Git commit, download path, and archive checksum. The live policy test rejects malformed metadata, a ZIP mismatch, or an optionally supplied expected commit.
2. **S2 non-deterministic extension archive:** `archiver.file()` queued filesystem reads and could write otherwise identical files in completion order. `scripts/package-extension.mjs` now reads each lexically sorted payload before appending it, fixing central-directory order as well as ZIP timestamps/modes. `test:package` builds three clean times, checks byte-identical SHA-256 values, parses the central directory to require lexical entry order, and verifies the generated release metadata against the current Git commit and ZIP.
3. **Keyboard regression coverage:** the real MV3 test now focuses the popup `role=switch` and activates Stable mode with Space before asserting freeze and reload persistence.

## Verification evidence

Run in a clean dependency install on 2026-08-27:

```bash
npm ci                                      # 401 packages; 0 vulnerabilities
npx playwright install chromium             # required browser binary
npx tsc --noEmit                            # pass (no separate lint script is configured)
npm test                                    # 14 Vitest passed; 15 Playwright passed, 1 expected mobile-only skip
npm run build                               # pass; produces dist/site and dist/extension/chrome-mv3
npm run test:package                        # pass; 3 clean builds
```

All three package builds produced:

```text
bb089166a13be859181aa6a985497cee78787579e044f399efcbe7db3b458435  calm-scroll-chrome-v1.0.0.zip
```

Playwright exercises the desktop MV3 extension, 390 × 844 mobile layout, reduced motion, keyboard switch activation, license/offline free-download recovery, console errors, and axe serious/critical issues on home, privacy, terms, and supporter pages. The existing response-policy and delivery checks remain intact; the live check now also verifies `/release.json`.

Local Lighthouse (Chrome desktop, local production preview, full-page screenshot disabled because Chromium crashes while capturing it): Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.3 s, LCP 0.3 s, TBT 0 ms, CLS 0. Built initial JavaScript is 2,944 bytes and CSS 14,860 bytes, within the product budgets.

## Deployment and consumer verification

Deployed `dist/site/` with `/opt/fleet/lib/deploy-static.sh calm-scroll /work/repo/dist/site` on 2026-08-27. Azure Static Web Apps deployment `221e1049-36dd-460c-a70b-048c542ae45b` succeeded and `https://calm-scroll.sociobot.in/release.json` reports source commit `9115873962a4450c4b0a3492ec842b9392f83496` and the checksum above. The following exact live gate passed against that deployed commit:

```bash
EXPECTED_RELEASE_SHA=9115873962a4450c4b0a3492ec842b9392f83496 npm run test:live
```

The consumer package is `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip`; unzip it and load its contents through Chrome’s **Load unpacked** flow. The package is an unsigned MV3 pilot archive, as before; browser-store publication and billing registration remain factory operations.

## Known boundaries

- The old unresolvable SHA remains historical evidence only; acceptance must use the new committed and deployed release identity.
- No analytics, remote fonts, third-party runtime scripts, or new permissions were added. All extension functionality remains local-first and free.
