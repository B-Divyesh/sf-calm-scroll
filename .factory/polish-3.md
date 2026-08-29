# Polish round 3 — final cumulative closure

Base reviewed: `a15931b5360027fea85db18c0c6d607c6e3b3e8c`  
Review report: `3722f13c533c22244838b66667d62fdd6fa76920`  
Repair code commit: `f06666c295fafecbab7802802f729ccb8b7237a4`

## Evidence key

- `Clean`: fresh clone at `/tmp/calm-scroll-polish-3-qvtYir`; `npm ci`, all nine exact claim commands, `npx tsc --noEmit`, `npm test`, `npm run build`, and `npm run test:package` passed.
- `C:<id>`: the exact `@claim:<id>` Playwright test in `tests/e2e/claims.spec.ts`.
- `Suite`: `npm test`; 22 Vitest tests, 41 Playwright passes, and 3 expected mobile skips for desktop-only extension installation.
- `Axe`: the `has an accessible semantic shell` tests use AxeBuilder on every public route at desktop and 390 px.
- `V-home`, `V-demo`, `V-privacy`: local screenshots at `.factory/evidence/polish-3-local-home/`, `.factory/evidence/polish-3-local-demo/`, and `.factory/evidence/polish-3-local-privacy/`.
- `L-home`, `L-demo`, `L-privacy`, `L-404`: cold production checks at `https://calm-scroll.sociobot.in/`, `/demo/?demo=1`, `/privacy/`, and an invented route after deployment.

## Review 1 findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the direct job headline and audience-specific lede. | `home offers an immediate demo…`; V-home; L-home |
| F-1-2 | Kept the phone-safe demo as first action and labeled installation desktop-only. | C:demo-responsive, C:extension-desktop-chromium; V-home; L-home |
| F-1-3 | Kept `?demo=1`, isolated `demo:` state, banner, reset, real exit, and demo guide. | C:demo-isolation; V-demo; L-demo |
| F-1-4 | Kept the nine-entry registry and exact-tag contract. | `gives every registered claim…`; Clean; L-home |
| F-1-5 | Kept the unavailable checkout and paid offer removed. | source crawl in Suite; V-home; L-home |
| F-1-6 | Kept the true styled HTTP 404 and no SPA fallback. | `an unknown route…`; V-home; L-404 |
| F-1-7 | Narrowed the motion statement to the interactive sample. | C:sample-motion-controls; V-demo; L-demo |
| F-1-8 | Kept the seeded report visible before Stable mode. | C:sample-motion-controls; V-demo; L-demo |
| F-1-9 | Kept exact counts for every advertised sample category. | C:sample-motion-controls; V-demo; L-demo |
| F-1-10 | Kept one-switch initial and late-motion handling. | C:sample-motion-controls; V-demo; L-demo |
| F-1-11 | Kept independent media and sticky exceptions. | C:sample-exceptions; V-demo; L-demo |
| F-1-12 | Kept browser-local extension rules and separate demo namespace. | C:local-settings, C:demo-isolation; V-demo; L-demo |
| F-1-13 | Kept the vague ordinary-HTML promise removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-14 | Kept unsupported keyboard/media marketing removed; regression coverage remains. | extension and route Suite tests; V-demo; L-demo |
| F-1-15 | Kept reproducibility as maintainer evidence, not visitor copy. | Clean `npm run test:package`; V-home; L-home |
| F-1-16 | Kept unsupported free-tier wording removed. | source crawl in Suite; V-home; L-home |
| F-1-17 | Kept the unavailable Supporter offer removed. | source crawl in Suite; V-home; L-home |
| F-1-18 | Kept checkout, merchant, security, and refund claims removed. | C:private-first-load; V-home; L-home |
| F-1-19 | Kept license-token UI and storage removed. | C:private-first-load; V-demo; L-demo |
| F-1-20 | Kept reversibility bounded to tested sample recovery. | C:sample-exceptions; V-demo; L-demo |
| F-1-21 | Kept README Stable mode wording and named claim locations. | C:sample-motion-controls, C:sample-exceptions; V-home; L-home |
| F-1-22 | Kept every reported motion category asserted. | C:sample-motion-controls; V-demo; L-demo |
| F-1-23 | Kept tested stopping of animation, transforms, sticky layers, and smooth scrolling. | C:sample-motion-controls; V-demo; L-demo |
| F-1-24 | Kept the late-animation fixture and assertion. | C:sample-motion-controls; V-demo; L-demo |
| F-1-25 | Kept exact report-count assertions. | C:sample-motion-controls; V-demo; L-demo |
| F-1-26 | Kept hostname settings, local export/import, and restoration. | C:local-settings; V-home; L-home |
| F-1-27 | Kept keyboard behavior regression-tested without a broad promise. | extension and route Suite tests; V-demo; L-demo |
| F-1-28 | Kept restricted-page retry recovery in the popup. | extension Suite test; V-home; L-home |
| F-1-29 | Kept unavailable paid-tier statements removed. | source crawl in Suite; V-home; L-home |
| F-1-30 | Kept the narrow request-tested privacy statement. | C:private-first-load; V-privacy; L-privacy |
| F-1-31 | Kept no-remote-request export/import coverage. | C:local-settings; V-privacy; L-privacy |
| F-1-32 | Kept billing API calls and copy removed. | C:private-first-load; V-home; L-home |
| F-1-33 | Kept token persistence and verification removed. | source crawl in Suite; V-home; L-home |
| F-1-34 | Kept README build paths aligned with build output. | Clean `npm run build`; V-home; L-home |
| F-1-35 | Kept deterministic ZIP verification. | Clean `npm run test:package`; V-home; L-home |
| F-1-36 | Kept live verification as maintainer documentation. | `scripts/verify-live.mjs`; V-home; L-home |
| F-1-37 | Kept delivery configuration factual and test-covered. | contracts test; V-home; L-home |
| F-1-38 | Kept broad local/free/account fragments removed or registered. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-39 | Kept decorative lore and fake specimen copy removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-40 | Kept the concrete task-naming section heading. | `home offers an immediate demo…`; V-home; L-home |
| F-1-41 | Kept the used, interactive sample instead of a static mock-up. | C:sample-motion-controls; V-demo; L-demo |
| F-1-42 | Kept plain desktop installation steps. | C:extension-desktop-chromium; V-home; L-home |
| F-1-43 | Kept unavailable Supporter content removed. | source crawl in Suite; V-home; L-home |
| F-1-44 | Kept unsupported checkout-security copy removed. | source crawl in Suite; V-home; L-home |
| F-1-45 | Kept result-naming extension ZIP actions. | `home offers an immediate demo…`; V-home; L-home |
| F-1-46 | Kept concrete non-medical limit and recovery language. | C:health-boundary; V-home; L-home |
| F-1-47 | Kept canonical terms in the copy audit. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-48 | Kept every audited public sentence at 22 words or fewer. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-49 | Kept visitor-facing internal jargon removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-50 | Kept complete canonical, social, favicon, and touch metadata. | `provides complete route metadata…`; V-home; L-home |
| F-1-51 | Kept one shared header and footer across all public routes. | shared-shell tests; V-home; L-home |
| F-1-52 | Kept route/hash/Back focus and polite announcement behavior. | `route navigation and browser Back…`; V-demo; L-demo |
| F-1-53 | Kept visible external-link wording. | shared-shell tests; V-home; L-home |
| F-1-54 | Kept local JSON merge/replace backup and restoration. | C:local-settings; V-home; L-home |
| F-1-55 | Kept the direct demo URL and desktop ZIP path in README. | README source assertion in C:demo-isolation; V-home; L-home |
| F-1-56 | Kept plain limits without reader/ad-blocker promises. | `.factory/copy-audit.md`, C:health-boundary; V-home; L-home |
| F-1-57 | Kept the unsupported reduced-motion claim replaced with a sample instruction. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-58 | Removed the time-sensitive store-availability statement and retained install steps. | `home offers an immediate demo…`; V-home; L-home |
| F-1-59 | Kept unavailable $12 wording removed. | source crawl in Suite; V-home; L-home |
| F-1-60 | Kept the untestable funding promise removed. | source crawl in Suite; V-home; L-home |
| F-1-61 | Kept non-medical language protected. | C:health-boundary; V-home; L-home |
| F-1-62 | Kept exception and reversal recovery proved in the sample. | C:sample-exceptions; V-demo; L-demo |
| F-1-63 | Kept original-art provenance linked and recorded. | `.factory/design.md`; V-home; L-home |
| F-1-64 | Kept audience wording free of outcome promises. | copy audit and home test; V-home; L-home |
| F-1-65 | Kept unsupported reader/ad-blocker boundary removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-1-66 | Kept user-reported health-outcome language removed. | source crawl in Suite; V-home; L-home |
| F-1-67 | Kept test-stack detail in maintainer documentation. | README review; V-home; L-home |
| F-1-68 | Kept automatic-browser-download wording removed. | README review; V-home; L-home |
| F-1-69 | Kept restricted-page recovery implemented without unsupported public copy. | extension Suite test; V-home; L-home |
| F-1-70 | Kept offline behavior narrow, registered, and observed. | C:offline-demo; V-privacy; L-demo |

## Review 2 findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-2-1 | Kept no navigation fallback and a styled HTTP 404. | `an unknown route…`; V-home; L-404 |
| F-2-2 | Kept consistent visible 390 px navigation. | shared-header and compact-header tests; V-home; L-home |
| F-2-3 | Kept the real unpacked-MV3 export/clear/import/reapply flow. | C:local-settings; V-demo; L-demo |
| F-2-4 | Kept the bounded phone-and-desktop demo claim. | C:demo-responsive; V-home; L-demo |
| F-2-5 | Kept the unlisted no-account promise removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-2-6 | Kept all local-settings locations named in the registry. | C:local-settings; V-privacy; L-privacy |
| F-2-7 | Kept unsupported reduced-motion wording removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-2-8 | Kept reader/ad-blocker claims removed. | `.factory/copy-audit.md`; V-home; L-home |
| F-2-9 | Kept README report/reversal locations named and tested. | C:sample-motion-controls, C:sample-exceptions; V-demo; L-demo |
| F-2-10 | Kept README device wording bounded and registered. | C:demo-responsive; V-home; L-home |
| F-2-11 | Kept desktop Chromium installation proof. | C:extension-desktop-chromium; V-home; L-home |
| F-2-12 | Kept README feature claims mapped to motion, exception, and local-setting tests. | C:sample-motion-controls, C:sample-exceptions, C:local-settings; V-demo; L-demo |
| F-2-13 | Kept focus/announcement behavior on navigation and Back. | `route navigation and browser Back…`; V-demo; L-demo |
| F-2-14 | Kept complete per-route social metadata. | `provides complete route metadata…`; V-privacy; L-privacy |

## Review 3 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-3-1 | Removed the stale Chrome Web Store availability sentence. The install section now begins directly with the usable ZIP instruction. | `home offers an immediate demo and labels desktop installation`; V-home; L-home |
| F-3-2 | Replaced the broad public-file cache claim with “After one online visit, the sample demo reloads offline.” | C:offline-demo; V-privacy; L-privacy and L-demo |
| F-3-3 | Added `README` to `demo-isolation.where` and made the exact claim test assert it. | C:demo-isolation; V-demo; L-demo |

## Result

Every finding in `review-1.md`, `review-2.md`, and `review-3.md` is either removed from visitor copy or covered by the specified observable test. Nothing is deferred.
