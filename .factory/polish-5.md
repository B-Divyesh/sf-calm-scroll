# Polish round 5 — cumulative zero-finding closure

Base reviewed: `232dceef4fd55807644e4612a0ee9a54e4c431e5`  
Review report: `3cc005a7da3ab4365d2628617e1660d530f3abb7`  
Repair commit: `88c2ef9bfcf77f39e788587ae35ffebabe7719ff`

## Evidence key

- `Clean`: final fresh clone `/tmp/calm-scroll-polish5-final-pass-6vKhRf` at `59cd4bbd8a41c631b3c4d3627d54fc7d3a4076cb`; every exact claim command, `npm run check`, and `npm run test:package` passed.
- `C:<id>`: the one exact tagged claim test in `tests/e2e/claims.spec.ts`.
- `A11y`: the public-route browser suite runs Axe at 1440 × 900 and 390 × 844 in both light and dark color schemes.
- `D-first`: `the demo opens with the report and a stabilized result in the first viewport`.
- `Screens`: `.factory/evidence/polish-5-local/demo-390-light.png`, `demo-390-dark.png`, and `home-1440-dark.png`.
- `Live`: cold production verification at `https://calm-scroll.sociobot.in` with `npm run test:live`; it checks release identity, privacy, routes, accessibility in both themes, offline use, and the first demo viewport.

## Review 1 findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the direct reading job headline and audience sentence. | A11y; Screens; Live |
| F-1-2 | Retained the phone-safe demo first; narrowed install wording to desktop Chromium. | C:demo-responsive; C:extension-desktop-chromium; Screens |
| F-1-3 | Retained query entry, isolated `demo:` key, banner, reset, exit, and demo guide. | C:demo-isolation; Screens |
| F-1-4 | Expanded the registry to eleven claims with exactly one tagged test each. | product-contract claim-tag test; Clean |
| F-1-5 | Kept checkout and paid-offer copy removed. | source/copy audit; Live |
| F-1-6 | Retained the styled HTTP 404 without a navigation fallback. | styled-404 test; Live |
| F-1-7 | Retained observable stopping of every named sample source. | C:sample-motion-controls |
| F-1-8 | The shared scanner now supplies the visible demo report before any user change. | C:sample-motion-controls; shared-scanner contract; Screens |
| F-1-9 | Exact autoplay, animation, transform, sticky, and smooth-scroll counts remain asserted. | C:sample-motion-controls |
| F-1-10 | Initial and later-added motion remain stopped by Stable mode. | C:sample-motion-controls |
| F-1-11 | Media and sticky exceptions remain independent. | C:sample-exceptions |
| F-1-12 | Demo state and browser-local extension rules remain separate. | C:demo-isolation; C:local-settings |
| F-1-13 | The vague ordinary-HTML promise remains absent. | copy audit |
| F-1-14 | Unsupported keyboard/media marketing remains absent; keyboard tests remain. | extension and navigation suite |
| F-1-15 | Reproducibility remains maintainer evidence, not visitor marketing. | package verification |
| F-1-16 | Unsupported free-tier scope promises remain absent. | copy audit |
| F-1-17 | The unavailable Supporter offer remains absent. | copy audit |
| F-1-18 | Checkout, merchant, security, and refund claims remain absent. | source/privacy suite |
| F-1-19 | License-token UI and storage claims remain absent. | source/privacy suite |
| F-1-20 | Reversal remains bounded to observed sample recovery. | C:sample-exceptions |
| F-1-21 | README keeps Stable mode wording and mapped behavior. | C:sample-motion-controls; C:sample-exceptions |
| F-1-22 | Every reported motion category remains asserted. | C:sample-motion-controls |
| F-1-23 | Animation, transform, sticky, media, and smooth-scroll handling remain observable. | C:sample-motion-controls; extension suite |
| F-1-24 | The later-motion fixture and assertion remain. | C:sample-motion-controls |
| F-1-25 | Report counts remain exact browser assertions. | C:sample-motion-controls |
| F-1-26 | Hostname rules, export/import, and restoration remain real MV3 behavior. | C:local-settings; rules unit tests |
| F-1-27 | Keyboard behavior remains regression-tested without unsupported copy. | extension suite |
| F-1-28 | The popup retains a retryable restricted-page state. | extension suite |
| F-1-29 | Unavailable paid-tier wording remains absent. | copy audit |
| F-1-30 | Website same-origin privacy behavior remains registered and tested. | C:private-first-load |
| F-1-31 | Added the exact `extension-data-private` claim. Its unpacked-MV3 test logs requests before the fixture tab or popup opens, seeds page, form, history, and scan values, then inspects and enables Stable mode. | C:extension-data-private; Clean; Live |
| F-1-32 | Billing API copy and calls remain absent. | source/privacy suite |
| F-1-33 | Token persistence and verification claims remain absent. | source/privacy suite |
| F-1-34 | README build paths remain aligned with output. | Clean build |
| F-1-35 | Deterministic ZIP verification remains. | package verification |
| F-1-36 | Live verification remains maintainer documentation. | `scripts/verify-live.mjs`; Live |
| F-1-37 | Delivery configuration remains factual and contract-tested. | contracts; Live |
| F-1-38 | Broad local/free/account language remains removed or registered. | claims registry; copy audit |
| F-1-39 | Decorative lore and fake specimen wording remain absent. | copy audit |
| F-1-40 | Section headings still name the task directly. | copy audit |
| F-1-41 | Reworked the sample into a seeded local-news article that opens already stabilized. | D-first; C:sample-motion-controls; Screens |
| F-1-42 | Installation steps are plain and explicitly desktop Chromium. | C:extension-desktop-chromium; Screens |
| F-1-43 | Supporter content remains absent. | copy audit |
| F-1-44 | Unsupported checkout-security wording remains absent. | copy audit |
| F-1-45 | Download actions still name the extension ZIP result. | document suite |
| F-1-46 | Non-medical limit and recovery language remain concrete. | C:health-boundary; Screens |
| F-1-47 | Canonical terms remain recorded. | copy audit |
| F-1-48 | Audited visitor copy remains at 22 words or fewer. | copy audit |
| F-1-49 | Banned marketing and internal jargon remain absent. | copy audit |
| F-1-50 | Every route retains canonical, social, icon, and touch metadata. | document suite; Live |
| F-1-51 | Shared header/footer remain visible at mobile and desktop widths. | header suite; A11y |
| F-1-52 | Route, Back, and hash navigation retain focus and polite announcements. | route/Back suite; Live |
| F-1-53 | External provenance remains visibly identified. | document suite |
| F-1-54 | Local JSON merge/replace remains real and reversible. | C:local-settings |
| F-1-55 | README retains the direct demo URL and desktop ZIP path. | C:demo-isolation; document suite |
| F-1-56 | Reader/ad-blocker promises remain absent. | copy audit |
| F-1-57 | Unsupported reduced-motion compatibility claims remain absent. | copy audit |
| F-1-58 | Store-availability wording remains absent. | home-copy suite |
| F-1-59 | Unavailable price wording remains absent. | copy audit |
| F-1-60 | Untestable funding wording remains absent. | copy audit |
| F-1-61 | The non-medical boundary remains registered. | C:health-boundary |
| F-1-62 | Exceptions and full recovery remain asserted. | C:sample-exceptions |
| F-1-63 | Original-art provenance remains linked and recorded. | design record; Screens |
| F-1-64 | Audience copy still makes no health-outcome promise. | copy audit |
| F-1-65 | Unsupported reader/ad-blocker behavior claims remain absent. | copy audit |
| F-1-66 | User-reported health-outcome language remains absent. | copy audit |
| F-1-67 | Test-stack detail remains maintainer documentation. | README review |
| F-1-68 | Automatic browser-download wording remains absent. | README review |
| F-1-69 | Restricted-page recovery remains implemented. | extension suite |
| F-1-70 | Offline demo activation, reload, and cached Stable mode remain deterministic. | C:offline-demo; Live |

## Review 2 findings

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-2-1 | Retained the real styled 404 and no navigation fallback. | styled-404 test; Live |
| F-2-2 | Retained visible, keyboard-reachable 390 px navigation. | compact-header test; A11y |
| F-2-3 | Retained the real MV3 export, clear, import, and reapply flow. | C:local-settings |
| F-2-4 | Tightened the demo to fit its report, switch, and sample start in the first phone viewport. | C:demo-responsive; D-first; Screens |
| F-2-5 | The unlisted no-account promise remains absent. | copy audit |
| F-2-6 | Local-settings copy locations remain registered. | claims registry; C:local-settings |
| F-2-7 | Unsupported reduced-motion statements remain absent. | copy audit |
| F-2-8 | Reader/ad-blocker claims remain absent. | copy audit |
| F-2-9 | README report and reversal locations remain mapped. | C:sample-motion-controls; C:sample-exceptions |
| F-2-10 | README device language remains bounded to tested screens. | C:demo-responsive |
| F-2-11 | Reworded all compatibility promises to the tested desktop Chromium target. | C:extension-desktop-chromium; copy audit |
| F-2-12 | README feature locations remain mapped to behavioral tests. | C:sample-motion-controls; C:sample-exceptions; C:local-settings |
| F-2-13 | Focus and announcement behavior remains tested. | route/Back suite; Live |
| F-2-14 | Legal, demo, and 404 metadata remains complete. | document suite; Live |

## Reviews 3 and 4, controller retry, and review 5

| Finding | Change made or retained repair | Evidence |
| --- | --- | --- |
| F-3-1 | Stale store-availability wording remains absent. | home-copy suite |
| F-3-2 | Offline wording remains limited to the sample demo. | C:offline-demo |
| F-3-3 | README remains listed in the demo-isolation claim. | C:demo-isolation; claims registry |
| CTRL-3-1 | Offline testing still awaits registration, activation, control, reload, and cached operation. | C:offline-demo; Live |
| F-4-1 | MIT license packaging and published terms remain aligned. | C:mit-license; package verification |
| F-5-1 | Replaced dark-mode light-blue and pale-surface pairings with explicit surface ink, carbon, on-carbon, focus, and dark signal-blue tokens. Axe now runs every route in both themes and widths locally and live. | A11y; Screens; Live |
| F-5-2 | The demo now opens already stabilized, uses the shared scanner, exposes the report and switch first, and begins a realistic article in the first phone viewport. | D-first; C:demo-responsive; C:sample-motion-controls; Screens; Live |
| F-5-3 | Replaced public “Chrome or Chromium” promises with tested “desktop Chromium” wording. | C:extension-desktop-chromium; copy audit; Live |

## Result

Every ID in `review-1.md` through `review-5.md`, including the controller retry, is mapped above. No finding is deferred.
