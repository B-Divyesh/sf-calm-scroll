# Polish round 6 — cumulative zero-finding closure

Base candidate: `f91aa9902b48ea515397f6731ad4e6c2a944f075`  
Review report: `73fe490497b535ec2b5c4bf19eacb0062061e90c`

## Evidence key

- `Clean`: fresh clone `/tmp/calm-scroll-polish6-final`; `npm ci`, every command in `.factory/claims.json`, `npm run check`, and `npm run test:package` passed.
- `Claims:<id>`: the one exact Playwright test tagged `@claim:<id>` in `tests/e2e/claims.spec.ts`.
- `Routes`: every public route at 1440 × 900 and 390 × 844 in light and dark modes; Axe serious/critical findings, page errors, console errors, and Permissions-Policy warnings all fail the test.
- `Local`: `/opt/fleet/lib/verify-url.sh` passed for home, demo, Privacy, Terms, and 404. Evidence is under `.factory/evidence/polish-6-local-*`.
- `Lighthouse`: `.factory/evidence/polish-6-local-home/lighthouse.json`; 100 performance, 100 accessibility, 100 best practices, 100 SEO, LCP 1.2 s, CLS 0, TBT 0 ms.
- `Package`: three builds produced the same extension ZIP SHA-256, `ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.
- `Live`: deployment `44097aef-6f42-497b-bb0e-c90d12982b1c` published `8d6c04709324121f0608ba787b70d387e3a30f13`; its exact-release `npm run test:live` passed at <https://calm-scroll.sociobot.in/>. The run covers all five routes, both viewports/themes, demo isolation, offline use, routing, 404, and policy-warning capture. Screenshots are under `.factory/evidence/polish-6-live-*`.

## Review 1 findings

| Finding | Change retained | Evidence |
| --- | --- | --- |
| F-1-1 | The first screen states the reading job and affected audience. | Routes; Local home |
| F-1-2 | The phone-safe demo is first; installation says desktop Chromium. | Claims:demo-responsive; Claims:extension-desktop-chromium |
| F-1-3 | `?demo=1` opens isolated sample data with banner, reset, and real exit. | Claims:demo-isolation; Local demo |
| F-1-4 | Eleven registry entries each have exactly one matching tagged test. | Contract test; all Clean claim runs |
| F-1-5 | The unavailable paid checkout and offer remain absent. | Link/source checks in Gate |
| F-1-6 | Unknown paths return the designed HTTP 404. | styled-404 browser test; Local 404; Live |
| F-1-7 | Stable mode stops every named sample motion source. | Claims:sample-motion-controls |
| F-1-8 | The shared scanner reports motion before a user change. | Claims:sample-motion-controls; scanner contract |
| F-1-9 | Every sample category has an exact count assertion. | Claims:sample-motion-controls |
| F-1-10 | Initial and later-added sample motion stop. | Claims:sample-motion-controls |
| F-1-11 | Media and sticky exceptions work independently. | Claims:sample-exceptions |
| F-1-12 | Demo and real extension storage remain separate. | Claims:demo-isolation; Claims:local-settings |
| F-1-13 | The vague ordinary-HTML promise remains absent. | Copy audit; Gate |
| F-1-14 | Unsupported keyboard/media marketing remains absent; keyboard behavior is regression-tested. | Extension and navigation tests |
| F-1-15 | Reproducibility remains maintainer evidence, not visitor marketing. | Package |
| F-1-16 | Unsupported free-tier scope wording remains absent. | Copy/source checks in Gate |
| F-1-17 | The unavailable Supporter offer remains absent. | Copy/source checks in Gate |
| F-1-18 | Checkout, merchant, security, and refund promises remain absent. | Claims:private-first-load; source checks |
| F-1-19 | License-token UI and storage claims remain absent. | Claims:private-first-load; source checks |
| F-1-20 | Reversal is limited to observable sample recovery. | Claims:sample-exceptions |
| F-1-21 | README uses Stable mode and maps report and reversal claims. | Claims:sample-motion-controls; Claims:sample-exceptions |
| F-1-22 | Every reported motion category is asserted. | Claims:sample-motion-controls |
| F-1-23 | Animation, transforms, sticky layers, media, and smooth scrolling are exercised. | Claims:sample-motion-controls; extension test |
| F-1-24 | The test adds and stops later motion. | Claims:sample-motion-controls |
| F-1-25 | The report uses exact seeded counts. | Claims:sample-motion-controls |
| F-1-26 | Hostname settings persist and survive export, clear, import, and reload. | Claims:local-settings |
| F-1-27 | Keyboard behavior remains covered without an overbroad public promise. | Extension and navigation tests |
| F-1-28 | The popup retains its restricted-page recovery state. | Extension test |
| F-1-29 | Unavailable paid-tier wording remains absent. | Copy/source checks in Gate |
| F-1-30 | Website requests remain same-origin through the demo flow. | Claims:private-first-load |
| F-1-31 | The full extension lifecycle sends no page, form, history, or scan sentinel remotely. | Claims:extension-data-private |
| F-1-32 | Billing API copy and calls remain absent. | Claims:private-first-load; source checks |
| F-1-33 | Token persistence and verification claims remain absent. | Source checks in Gate |
| F-1-34 | The clean build produces every documented site and extension path. | Clean `npm run check` |
| F-1-35 | The extension archive remains byte-reproducible. | Package |
| F-1-36 | Live verification remains maintainer evidence and is executed after deployment. | Live |
| F-1-37 | Delivery headers and caching remain contract- and live-tested. | contract tests; Live |
| F-1-38 | Broad local/free/account wording remains removed or registered. | Claims registry; copy audit |
| F-1-39 | Decorative lore and specimen labels remain absent. | Copy audit; Local home |
| F-1-40 | Section headings name the task directly. | Copy audit; Local home |
| F-1-41 | The first demo screen is a realistic, already-stabilized product state. | first-viewport browser test; Local demo |
| F-1-42 | Installation is concrete and limited to desktop Chromium. | Claims:extension-desktop-chromium |
| F-1-43 | Unavailable Supporter content remains absent. | Copy/source checks in Gate |
| F-1-44 | Unsupported checkout-security wording remains absent. | Copy/source checks in Gate |
| F-1-45 | Download actions consistently name the extension ZIP. | Document and home-copy tests |
| F-1-46 | Limits and recovery text remain concrete. | Claims:health-boundary; Local home |
| F-1-47 | Stable mode, demo, site setting, extension ZIP, and motion remain canonical terms. | `.factory/copy-audit.md` |
| F-1-48 | No audited public sentence exceeds 22 words. | `.factory/copy-audit.md` |
| F-1-49 | Banned marketing words and visitor-facing jargon remain absent. | `.factory/copy-audit.md` |
| F-1-50 | Every route retains its canonical, social, favicon, and touch metadata. | document metadata test; Routes |
| F-1-51 | Every route retains the same visible header and footer. | shared-shell tests; Routes |
| F-1-52 | Route, Back, and hash navigation focus and announce destinations. | route/Back and section-focus tests; Live |
| F-1-53 | External provenance remains visibly identified. | document shell test |
| F-1-54 | Local JSON merge/replace portability remains real. | Claims:local-settings |
| F-1-55 | README retains the direct demo URL and extension ZIP path. | Claims:demo-isolation; README |
| F-1-56 | Unsupported reader/ad-blocker promises remain absent. | Copy audit |
| F-1-57 | Unsupported reduced-motion compatibility wording remains absent. | Copy audit |
| F-1-58 | Stale store-availability wording remains absent. | home-copy test |
| F-1-59 | Unavailable price wording remains absent. | Copy/source checks in Gate |
| F-1-60 | Untestable funding wording remains absent. | Copy/source checks in Gate |
| F-1-61 | The non-medical boundary remains registered and tested. | Claims:health-boundary |
| F-1-62 | Exceptions and complete sample recovery remain asserted. | Claims:sample-exceptions |
| F-1-63 | Original-art provenance remains linked and recorded. | `.factory/design.md`; Local home |
| F-1-64 | Audience copy makes no health-outcome promise. | Copy audit; home-copy test |
| F-1-65 | Unsupported reader/ad-blocker behavior claims remain absent. | Copy audit |
| F-1-66 | User-reported outcome wording remains absent. | Copy audit |
| F-1-67 | Test-stack detail remains maintainer documentation. | README review; Clean |
| F-1-68 | False automatic browser-download wording remains absent. | README review |
| F-1-69 | Restricted-page recovery remains implemented. | Extension test |
| F-1-70 | The demo waits for service-worker control, reloads offline, and still operates. | Claims:offline-demo; Live |

## Review 2 findings

| Finding | Change retained | Evidence |
| --- | --- | --- |
| F-2-1 | No navigation fallback masks missing pages; styled 404 remains real. | styled-404 test; Live |
| F-2-2 | Demo, Install, and Privacy stay visible and keyboard-reachable at 390 px. | compact-header test; Routes |
| F-2-3 | The claim uses a real unpacked-extension export, clear, import, and reapply flow. | Claims:local-settings |
| F-2-4 | Demo report, switch, and sample start fit phone and desktop screens. | Claims:demo-responsive; first-viewport test |
| F-2-5 | The unlisted no-account promise remains absent. | Copy audit |
| F-2-6 | Every local-settings copy location remains listed. | `.factory/claims.json`; Claims:local-settings |
| F-2-7 | The unsupported reduced-motion statement remains absent. | Copy audit |
| F-2-8 | Reader-mode and ad-blocker promises remain absent. | Copy audit |
| F-2-9 | README report and reversal locations remain mapped. | Claims:sample-motion-controls; Claims:sample-exceptions |
| F-2-10 | README device wording remains limited to tested viewports. | Claims:demo-responsive |
| F-2-11 | Compatibility wording remains limited to tested desktop Chromium. | Claims:extension-desktop-chromium |
| F-2-12 | README motion, exception, storage, and JSON statements remain mapped. | Claims:sample-motion-controls; Claims:sample-exceptions; Claims:local-settings |
| F-2-13 | Full-route and Back navigation focus and announce the h1. | route/Back test; Live |
| F-2-14 | Demo, legal, and 404 routes retain complete metadata. | document metadata test; Routes |

## Reviews 3–6 and controller retry

| Finding | Change made or retained | Evidence |
| --- | --- | --- |
| F-3-1 | The stale Web Store availability statement remains absent. | home-copy test |
| F-3-2 | Offline wording remains limited to the sample demo. | Claims:offline-demo |
| F-3-3 | README remains listed for the isolated-demo claim. | claims-location contract; Claims:demo-isolation |
| CTRL-3-1 | Offline testing still awaits registration, activation, page control, reload, and cached operation. | Claims:offline-demo; Live |
| F-4-1 | MIT wording, repository license, and packaged license remain aligned. | Claims:mit-license; Package |
| F-5-1 | Explicit dark-theme tokens retain accessible contrast; Axe covers both themes and widths. | Routes; Lighthouse; Local screenshots |
| F-5-2 | The shared scanner, report, Stable mode switch, and realistic article start remain in the first demo viewport. | Claims:demo-responsive; first-viewport test; Local demo |
| F-5-3 | Public compatibility remains limited to tested desktop Chromium. | Claims:extension-desktop-chromium; copy audit |
| F-6-1 | Removed unsupported `web-share=()` from the response policy. Preview now serves production headers; route and live tests fail on Permissions-Policy warnings, and the live check rejects the token directly. | `uses a console-clean Permissions-Policy`; Routes; Live; `.factory/evidence/polish-6-live-*` |

## Result

Every finding in `review-1.md` through `review-6.md`, including the controller retry, is mapped above. No finding is deferred.
