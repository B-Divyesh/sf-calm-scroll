# Polish round 4 — cumulative zero-finding closure

Base reviewed: `7d73f2fd4523c913bb640a78ee6ea6de06279e7c`  
Review report: `9ef5715c7a7a87dc490e4db1d068eceaf0232a00`  
Repair commit: `872f8dd96b22becca2e9706bf037b54d5cb5be2c`

## Evidence key

- `Clean`: fresh clone `/tmp/calm-scroll-polish-4-clean-zxZW4l`; `npm ci`, all ten exact claim commands, `npx tsc --noEmit`, `npm test`, `npm run build`, and `npm run test:package` passed.
- `C:<id>`: the one exact `@claim:<id>` test in `tests/e2e/claims.spec.ts`; every command from `.factory/claims.json` was run independently from `Clean`.
- `Suite`: `npm test` passed 23 Vitest and 46 Playwright checks, including axe on every public route at desktop and 390 px.
- `Package`: `npm run test:package` reproduced the ZIP three times with SHA-256 `9a1c9f6d4bd4c564342de621a554a33493cbf3c8615156957aa4a36cb94cdcfd`.
- `L-home`, `L-demo`, `L-terms`, `L-404`: local desktop and mobile screenshots in `.factory/evidence/polish-4-local-*`. `L-home` also holds Lighthouse 100/100/100/100 evidence.
- `Live`: the deployed URL is checked cold with `EXPECTED_RELEASE_SHA=<published-main-commit> npm run test:live` after the work-order deployment publishes. Its output and current evidence are appended before handoff.

## Review 1 findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the direct job headline and audience-specific first sentence. | Suite home-copy test; L-home; Live |
| F-1-2 | Kept the phone-safe one-click demo first and installation explicitly desktop-only. | C:demo-responsive; C:extension-desktop-chromium; L-home; Live |
| F-1-3 | Kept `?demo=1`, isolated `demo:` storage, banner, reset, real exit, and demo guide. | C:demo-isolation; L-demo; Live |
| F-1-4 | Expanded the registry to ten claims and retained the one-tag-per-claim contract. | `gives every registered claim exactly one matching tagged test`; Clean |
| F-1-5 | Kept the unavailable checkout and paid offer removed. | Suite source/link checks; Live |
| F-1-6 | Kept the designed HTTP 404 and no navigation fallback. | `an unknown route returns the styled 404 response`; L-404; Live |
| F-1-7 | Kept the sample-bounded statement that Stable mode stops each advertised motion source. | C:sample-motion-controls; L-demo; Live |
| F-1-8 | Kept the seeded report visible before a Stable mode change. | C:sample-motion-controls; L-demo; Live |
| F-1-9 | Kept exact asserted counts for autoplay, animation, transform, sticky, and smooth scrolling. | C:sample-motion-controls; L-demo |
| F-1-10 | Kept one-switch handling of initial and later-added sample motion. | C:sample-motion-controls; L-demo |
| F-1-11 | Kept independent media and sticky exceptions. | C:sample-exceptions; L-demo |
| F-1-12 | Kept browser-local extension rules separate from demo state. | C:local-settings; C:demo-isolation; Live |
| F-1-13 | Kept the vague ordinary-HTML promise removed. | `.factory/copy-audit.md`; L-home |
| F-1-14 | Kept unsupported keyboard/media marketing removed while retaining keyboard regression coverage. | Suite extension/navigation tests; L-demo |
| F-1-15 | Kept reproducibility as maintainer evidence, not visitor copy. | Package; L-home |
| F-1-16 | Kept unsupported free-tier promises removed. | Suite source crawl; L-home |
| F-1-17 | Kept the unavailable Supporter offer removed. | Suite source crawl; L-home |
| F-1-18 | Kept checkout, merchant, security, and refund promises removed. | C:private-first-load; Suite source crawl |
| F-1-19 | Kept license-token UI and storage removed. | C:private-first-load; Suite source crawl |
| F-1-20 | Kept reversibility bounded to observable sample recovery. | C:sample-exceptions; L-demo |
| F-1-21 | Kept README Stable mode wording and listed behavior locations. | C:sample-motion-controls; C:sample-exceptions |
| F-1-22 | Kept every reported motion category covered by an exact sample assertion. | C:sample-motion-controls |
| F-1-23 | Kept observable stop behavior for animation, transforms, sticky layers, media, and smooth scrolling. | C:sample-motion-controls; Suite extension test |
| F-1-24 | Kept the later-animation fixture and assertion. | C:sample-motion-controls |
| F-1-25 | Kept exact report-count assertions. | C:sample-motion-controls |
| F-1-26 | Kept hostname rules, local export/import, and restoration. | C:local-settings; `tests/rules.test.ts` |
| F-1-27 | Kept keyboard behavior regression-tested without overbroad copy. | Suite extension/navigation tests |
| F-1-28 | Kept the popup restricted-page retry state. | Suite extension test |
| F-1-29 | Kept unavailable paid-tier language removed. | Suite source crawl |
| F-1-30 | Kept the narrow same-origin privacy statement. | C:private-first-load; Live |
| F-1-31 | Kept no-remote-request coverage while exporting, importing, and applying a site rule. | C:local-settings |
| F-1-32 | Kept billing API copy and calls removed. | C:private-first-load; Suite source crawl |
| F-1-33 | Kept token persistence and verification copy removed. | Suite source crawl |
| F-1-34 | Kept README build paths aligned with actual build output. | Clean `npm run build` |
| F-1-35 | Kept deterministic package verification. | Package |
| F-1-36 | Kept live verification as maintainer documentation. | `scripts/verify-live.mjs`; Live |
| F-1-37 | Kept delivery configuration factual and contract-tested. | `tests/contracts.test.ts`; Live |
| F-1-38 | Kept broad local/free/account fragments removed or registered. | `.factory/copy-audit.md`; Clean |
| F-1-39 | Kept decorative lore and fake specimen language removed. | `.factory/copy-audit.md`; L-home |
| F-1-40 | Kept the direct task-naming section heading. | Suite home-copy test; L-home |
| F-1-41 | Kept the realistic, interactive used sample. | C:sample-motion-controls; L-demo |
| F-1-42 | Kept plain desktop installation steps. | C:extension-desktop-chromium; L-home |
| F-1-43 | Kept unavailable Supporter content removed. | Suite source crawl |
| F-1-44 | Kept unsupported checkout-security copy removed. | Suite source crawl |
| F-1-45 | Kept result-naming extension ZIP actions. | Suite home-copy test; L-home |
| F-1-46 | Kept concrete non-medical limit and recovery wording. | C:health-boundary; L-home; Live |
| F-1-47 | Kept canonical terms in the copy audit. | `.factory/copy-audit.md` |
| F-1-48 | Kept every audited public sentence at 22 words or fewer. | `.factory/copy-audit.md` |
| F-1-49 | Kept visitor-facing internal jargon removed. | `.factory/copy-audit.md` |
| F-1-50 | Kept complete per-route canonical, social, favicon, and touch metadata. | `provides complete route metadata and the product social image`; Live |
| F-1-51 | Kept one shared header and footer across public routes. | shared header/footer tests; L-terms; Live |
| F-1-52 | Kept hash, route, and Back focus plus polite announcement behavior. | `route navigation and browser Back focus and announce the page heading`; Live |
| F-1-53 | Kept visibly labeled external provenance links. | shared header/footer tests; L-home |
| F-1-54 | Kept real local JSON merge/replace backup and restoration. | C:local-settings |
| F-1-55 | Kept the direct demo URL and desktop ZIP path in README. | C:demo-isolation; L-home |
| F-1-56 | Kept plain limits without reader/ad-blocker promises. | `.factory/copy-audit.md`; C:health-boundary |
| F-1-57 | Kept the unsupported reduced-motion assertion replaced with a sample instruction. | `.factory/copy-audit.md` |
| F-1-58 | Kept the time-sensitive store-availability sentence removed. | Suite home-copy test; L-home |
| F-1-59 | Kept unavailable $12 wording removed. | Suite source crawl |
| F-1-60 | Kept untestable funding language removed. | Suite source crawl |
| F-1-61 | Kept the non-medical boundary protected. | C:health-boundary; L-home |
| F-1-62 | Kept exception and reversal recovery proven in the sample. | C:sample-exceptions; L-demo |
| F-1-63 | Kept original-art provenance linked and recorded. | `.factory/design.md`; L-home |
| F-1-64 | Kept audience wording free of health-outcome claims. | Suite home-copy test; `.factory/copy-audit.md` |
| F-1-65 | Kept unsupported reader/ad-blocker boundary promises removed. | `.factory/copy-audit.md` |
| F-1-66 | Kept user-reported health-outcome language removed. | Suite source crawl |
| F-1-67 | Kept test-stack detail as maintainer documentation. | README review |
| F-1-68 | Kept automatic-browser-download wording removed. | README review |
| F-1-69 | Kept restricted-page recovery implemented without unsupported public copy. | Suite extension test |
| F-1-70 | Kept a complete precached demo shell and deterministic offline lifecycle. | C:offline-demo; L-demo; Live |

## Review 2 findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-2-1 | Kept no navigation fallback and the real styled 404. | unknown-route test; L-404; Live |
| F-2-2 | Kept consistent visible, keyboard-reachable 390 px navigation. | compact-header test; L-home; Live |
| F-2-3 | Kept the real MV3 set/export/clear/import/reapply rule flow. | C:local-settings |
| F-2-4 | Kept the bounded phone-and-desktop claim and no-overlap assertion. | C:demo-responsive; L-demo; Live |
| F-2-5 | Kept the unlisted no-account promise removed. | `.factory/copy-audit.md` |
| F-2-6 | Kept every local-settings copy location named in the registry. | `.factory/claims.json`; C:local-settings |
| F-2-7 | Kept the unsupported reduced-motion factual claim removed. | `.factory/copy-audit.md` |
| F-2-8 | Kept reader/ad-blocker claims removed. | `.factory/copy-audit.md` |
| F-2-9 | Kept README report and reversal locations named and tested. | C:sample-motion-controls; C:sample-exceptions |
| F-2-10 | Kept README device wording bounded and registered. | C:demo-responsive |
| F-2-11 | Kept desktop Chromium installation proof. | C:extension-desktop-chromium |
| F-2-12 | Kept README feature locations mapped to their behavioral tests. | C:sample-motion-controls; C:sample-exceptions; C:local-settings |
| F-2-13 | Kept focus and announcement behavior for navigation and Back. | route/Back focus test; Live |
| F-2-14 | Kept complete metadata on demo, legal, and 404 routes. | route metadata test; L-terms; L-404; Live |

## Review 3 and controller retry findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-3-1 | Kept the stale Chrome Web Store availability statement removed. | Suite home-copy test; L-home |
| F-3-2 | Kept privacy wording narrowed to the testable offline demo reload. | C:offline-demo; L-demo; Live |
| F-3-3 | Kept README listed in the demo-isolation claim location. | C:demo-isolation; `.factory/claims.json` |
| CTRL-3-1 | Kept the awaited registration, activation, control, offline reload, and Stable mode lifecycle. | C:offline-demo; L-demo; Live |

## Review 4 finding

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-4-1 | Added the `mit-license` claim and its exact tagged browser test. The packaging script now copies root `LICENSE` into `dist/extension/chrome-mv3/` and the downloadable ZIP. The test asserts that shipped MIT text, the README pointer, and the exact Terms promise stay aligned. | C:mit-license; `packages the MIT license with the downloadable extension`; Package; L-terms; Live |

## Result

Every ID in `review-1.md`, `review-2.md`, `review-3.md`, `review-4.md`, and the controller retry is mapped above. No finding is deferred. The only new round-4 product change is the fully testable MIT licensing repair; all earlier behavior was re-exercised from a clean clone rather than accepted from an old report.
