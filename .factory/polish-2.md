# Polish round 2 — cumulative finding closure

Base candidate: `d126df1323e0ded5d2e0c77b7229b9d517b0e8f5`  
Review commit: `08ad337b28f3497d168c7d6da26e3cf74d093392`

## Evidence key

- `Clean`: fresh clone `/tmp/calm-scroll-polish-2-EbQd76`; `npm ci`, every command in `.factory/claims.json`, `npm test`, `npm run build`, and `npm run test:package` passed.
- `Suite`: 21 Vitest unit/contract tests and 41 Playwright passes; three mobile-only extension skips are intentional because MV3 installation is desktop-only.
- `C:<id>`: the one exact Playwright test tagged `@claim:<id>`.
- `Axe`: `tests/e2e/site.spec.ts` ran axe on home, demo, Privacy, Terms, and 404 at desktop and 390 px with zero serious or critical violations.
- `Lighthouse`: local production build scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO; LCP 1.1 s, CLS 0, TBT 0 ms.
- `Visual`: `.factory/evidence/polish-2-local-home/screenshot-mobile.png` and `.factory/evidence/polish-2-local-demo/screenshot-desktop.png`.
- `Live`: production checks and screenshot paths are recorded in `.factory/handoff.md` after deployment.

## Review 1 findings

| Finding | Change or retained repair | Evidence |
| --- | --- | --- |
| F-1-1 | The first screen keeps the direct job headline and names people made uncomfortable by page motion. | Suite home-copy test; Visual |
| F-1-2 | The universal first action is the demo; installation is explicitly desktop Chrome or Chromium. | C:demo-responsive; C:extension-desktop-chromium |
| F-1-3 | `/?demo=1` enters the isolated sample with banner, reset, and Start for real; both exits discard demo state. | C:demo-isolation; `.factory/demo.md` |
| F-1-4 | The registry now contains nine claims, and a contract test enforces one matching tag per claim. | `tests/contracts.test.ts`; all nine Clean claim runs |
| F-1-5 | The unregistered dead paid checkout remains removed. | Suite link crawl/source inspection |
| F-1-6 | Removed the SPA fallback so missing paths reach the styled 404 with HTTP 404. | unknown-route browser test; live test in `scripts/verify-live.mjs` |
| F-1-7 | Motion behavior is stated precisely and exercised against the sample. | C:sample-motion-controls |
| F-1-8 | The sample report appears before Stable mode changes anything. | C:sample-motion-controls exact initial counts |
| F-1-9 | Every reported motion category has an asserted sample value. | C:sample-motion-controls |
| F-1-10 | One switch stops initial and later-added sample motion. | C:sample-motion-controls |
| F-1-11 | Media and sticky exceptions remain independent. | C:sample-exceptions |
| F-1-12 | Extension rules are browser-local and the demo uses a separate key. | C:local-settings; C:demo-isolation |
| F-1-13 | The vague “ordinary HTML” claim remains removed. | Copy audit |
| F-1-14 | No broad untested keyboard/media marketing claim remains; keyboard behavior stays regression-tested. | Suite extension and focus tests |
| F-1-15 | Reproducibility is maintainer evidence, not visitor marketing. | Clean `npm run test:package` |
| F-1-16 | No paid/free tier claim remains. | Site and README source inspection |
| F-1-17 | The unavailable Supporter edition remains removed. | Site and README source inspection |
| F-1-18 | Checkout, merchant, security, and refund claims remain removed. | Same-origin request test; source inspection |
| F-1-19 | License-token UI and storage remain removed. | C:private-first-load; source inspection |
| F-1-20 | Reversibility is limited to tested Stable mode behavior. | C:sample-exceptions |
| F-1-21 | README uses plain Stable mode language and lists the behavior claim locations. | C:sample-motion-controls; C:sample-exceptions |
| F-1-22 | Every motion-report category is tested at an exact initial value. | C:sample-motion-controls |
| F-1-23 | Sample and extension tests assert animations, transforms, sticky layers, and smooth scrolling stop. | C:sample-motion-controls; extension lifecycle test |
| F-1-24 | A later animation is inserted and stopped. | C:sample-motion-controls |
| F-1-25 | Seeded report counts are asserted, not just element presence. | C:sample-motion-controls |
| F-1-26 | Per-hostname settings, persistence, export, and import are tested in extension storage. | C:local-settings; rules unit tests |
| F-1-27 | Keyboard focus remains test-covered; no unsupported public promise was reintroduced. | Suite extension and navigation tests |
| F-1-28 | The popup retains its clear restricted-page error and retry action. | popup implementation; Suite |
| F-1-29 | Unavailable paid-tier claims remain removed. | Source inspection |
| F-1-30 | The retained narrow privacy statement is registered and request-tested. | C:private-first-load |
| F-1-31 | The extension test records no remote request while setting, exporting, clearing, importing, and applying a rule. | C:local-settings |
| F-1-32 | Billing API claims and calls remain removed. | Source inspection; C:private-first-load |
| F-1-33 | Token persistence and verification claims remain removed. | Source inspection |
| F-1-34 | Build documentation names paths the build actually produces. | Clean `npm run build` |
| F-1-35 | Three clean package builds produce the same ZIP bytes. | Clean `npm run test:package`; SHA-256 `bb331214…513531` |
| F-1-36 | Live verification is maintainer documentation, not visitor marketing. | `scripts/verify-live.mjs` |
| F-1-37 | Delivery configuration is documented without promotional wording. | config contract test; live verification |
| F-1-38 | Broad “local-first/free core/no account” fragments remain removed or narrowed to registered statements. | Copy audit; claims registry |
| F-1-39 | Decorative lore and fake specimen labels remain absent. | Copy audit; Visual |
| F-1-40 | The section heading directly states the task. | Copy audit |
| F-1-41 | The demo is interactive, seeded, and already in a used state. | C:sample-motion-controls; Visual |
| F-1-42 | Installation states desktop requirements and gives three concrete steps. | C:extension-desktop-chromium; Visual |
| F-1-43 | Unavailable Supporter content remains absent. | Source inspection |
| F-1-44 | Unsupported checkout-security copy remains absent. | Source inspection |
| F-1-45 | The download action consistently says “Download extension ZIP.” | Copy audit; link test |
| F-1-46 | The limit section states the non-medical boundary and recovery action. | C:health-boundary |
| F-1-47 | “Stable mode,” “demo,” “site setting,” and “extension ZIP” remain the canonical terms. | `.factory/copy-audit.md` terminology table |
| F-1-48 | Every landing and README sentence is audited at 22 words or fewer. | `.factory/copy-audit.md` |
| F-1-49 | Internal jargon remains removed from visitor copy. | Copy audit banned-word scan |
| F-1-50 | Every route now has canonical, OG, Twitter, favicon, and PNG touch metadata. | document metadata test |
| F-1-51 | Home, demo, Privacy, Terms, and 404 now share Demo / Install / Privacy headers and matching footers. | shared-shell document and browser tests |
| F-1-52 | Hash, cross-page, and Back navigation focus and announce the destination heading. | route navigation/Back focus test |
| F-1-53 | The retained GitHub provenance link visibly says it opens externally. | shared-shell browser test/source inspection |
| F-1-54 | Local JSON backup supports merge or replace and restores behavior after import. | C:local-settings; rules unit tests |
| F-1-55 | README documents the live `?demo=1` URL and desktop ZIP path. | README source inspection |
| F-1-56 | Product limits remain plain and avoid reader/ad-blocker promises. | Copy audit; C:health-boundary |
| F-1-57 | The untested reduced-motion compatibility statement was replaced with a sample instruction. | Copy audit |
| F-1-58 | Store availability is stated factually; the working developer install is provided. | link crawl; C:extension-desktop-chromium |
| F-1-59 | The unavailable $12 claim remains removed. | Source inspection |
| F-1-60 | The untestable funding promise remains removed. | Source inspection |
| F-1-61 | Non-medical language is protected on landing and Terms. | C:health-boundary |
| F-1-62 | The sample proves reversal and exception recovery. | C:sample-exceptions |
| F-1-63 | Asset provenance stays linked and recorded in the design thesis. | `.factory/design.md`; shared footer test |
| F-1-64 | Audience wording describes discomfort without promising health improvement. | home-copy test; copy audit |
| F-1-65 | The unsupported reader/ad-blocker boundary claim was removed. | Copy audit |
| F-1-66 | No user-reported outcome claim remains. | README and landing source inspection |
| F-1-67 | Test-stack inventory remains maintainer documentation. | README inspection |
| F-1-68 | No automatic browser-download claim remains. | README inspection |
| F-1-69 | Restricted-page recovery remains implemented without unsupported marketing. | popup error implementation; Suite |
| F-1-70 | Offline demo behavior is registered and observed after service-worker activation. | C:offline-demo |

## Review 2 findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-2-1 | Deleted `navigationFallback`; added a production-like local server and unknown-path browser/live assertions for status 404 plus recovery copy. | `an unknown route returns the styled 404 response`; `scripts/verify-live.mjs` |
| F-2-2 | Every route now uses the same header labels and order. At 390 px the nav wraps into a visible, keyboard-reachable row. | shared-header tests; Visual |
| F-2-3 | Replaced the demo surrogate with a real MV3 flow that sets a rule, downloads and parses JSON, clears storage, imports with replace, and proves the rule applies again with no remote request. | C:local-settings |
| F-2-4 | Replaced “any device” with the bounded “phone and desktop screens” claim and tests both configured viewports through `/?demo=1`. | C:demo-responsive |
| F-2-5 | Removed “No account” from the landing instead of retaining an unnecessary unlisted promise. | Copy audit |
| F-2-6 | The local-settings registry location now names the landing hero and product facts, Privacy, README, and popup. | `.factory/claims.json`; C:local-settings |
| F-2-7 | Replaced the unlisted reduced-motion assertion with “Use the sample…” instruction. | Copy audit |
| F-2-8 | Removed the reader-mode/ad-blocker claim from the landing and README. | Copy audit |
| F-2-9 | README is named in both motion and reversal claim locations; tests assert the initial report, enablement, and restoration. | C:sample-motion-controls; C:sample-exceptions |
| F-2-10 | README now uses the bounded phone/desktop wording and is named in that claim. | C:demo-responsive |
| F-2-11 | The registry names landing and README desktop compatibility; a clean Chromium profile loads the packaged extension and reports motion. | C:extension-desktop-chromium |
| F-2-12 | README is named for motion, exception, local storage, export, and import claims; each behavior is asserted. | three matching claim tests |
| F-2-13 | A shared route script records internal navigation, focuses each destination h1, announces it, and handles browser Back. | `route navigation and browser Back focus and announce the page heading` |
| F-2-14 | Added complete route-specific canonical, OG, Twitter, and touch-icon metadata to demo, legal, and 404 pages. | `provides complete route metadata and the product social image` |

No finding is deferred.
