# Adversarial first-read review 5 — Calm Scroll

**Verdict: FAIL**

Reviewed 29 August 2026 against <https://calm-scroll.sociobot.in/> from fresh Chromium contexts at 390 × 844 and 1440 × 900. The deployed `release.json` identifies source commit `232dceef4fd55807644e4612a0ee9a54e4c431e5`, matching the review base. There are three blocking findings and one minor finding. A pass requires zero findings and no untested claim.

## First 30 seconds

Before scrolling, my answers were the same at both widths:

- **What it does:** a browser extension that stops common page motion while I read.
- **For whom:** people made uncomfortable by page motion.
- **What to click first:** **Try it with sample data**. It is the only immediately usable path on a phone; installation is correctly labeled for desktop Chrome or Chromium.

This part passes. The exact first-screen copy is “Stop page motion while you read.”, “For people made uncomfortable by page motion…”, and “Try it with sample data”. At 390 px the action and all three product facts are visible without horizontal overflow. The mechanical-clamp illustration, hard rules, safety yellow, and control-panel layout are product-specific rather than a generic SaaS template.

## Findings

### Blocking

#### F-5-1 — The dark theme has serious contrast failures

- **Location/quote:** live home and demo with the operating system color scheme set to dark. Affected text includes “Not medical treatment”, “Try the motion controls first.”, “Know the limits.”, “Demo — sample data, nothing is saved.”, “Reset demo”, “Start for real”, “sample.news”, “Motion allowed”, “Moving transform”, and “Animation sample”.
- **Evidence:** Axe reported `color-contrast` as serious at both 390 × 844 and 1440 × 900. Measured pairs include white on light blue at **2.44:1**, off-white on yellow at **1.29:1**, off-white on pale blue at **1.13:1**, and off-white on pale green at **1.06:1**. The contract requires 4.5:1 for normal text and 3:1 for large text/UI. Current tests create no dark-color-scheme context, so the defect is invisible to `npm test` and `npm run test:live`.
- **Why this fails:** the site follows the OS dark preference, so these are shipped states rather than an optional theme preview. Important demo controls and the medical boundary become difficult to read for the audience this accessibility product targets.
- **Concrete fix:** set explicit dark text on yellow/pale sample surfaces, choose a banner blue that supports white at 4.5:1, and keep the boundary heading on a genuinely dark background. Add Axe coverage for every public route at both widths with `colorScheme: 'light'` and `colorScheme: 'dark'`, failing on every contrast violation.

#### F-5-2 — The first demo screen does not show Calm Scroll’s controls or a used result

- **Location/quote:** first viewport after **Try it with sample data**, `/demo/?demo=1`. It says “Motion allowed” and shows boxes labeled “Autoplay sample”, “Moving transform”, and “Animation sample”.
- **Evidence:** at 390 × 844, the motion-control panel starts at y=1184 and **Turn on Stable mode** starts at y=1656. At 1440 × 900, the panel starts at y=1150 and the switch at y=1185. Neither the report nor the primary control is in the first viewport. The initial state explicitly says motion is allowed. The visible sample is a labeled test fixture with one paragraph, not a realistic page already being handled by the product.
- **Why this fails:** after the promised one click, a phone visitor still has to scroll more than a viewport and click again before seeing Calm Scroll operate. The mandatory demo rule says the first screen must already show the product being used with realistic sample data. Missing or weak demo behavior is blocking.
- **Concrete fix:** put a compact real motion report and **Turn on Stable mode** control beside or above the sample so both fit in the initial 390 × 844 viewport. Seed a realistic article page with recognizable navigation, media, and moving/sticky elements. Drive the demo through shared scanner/stabilization code, or add a contract proving the demo and extension produce the same report and result, so the sample is the product rather than a separate CSS simulation.

#### F-1-31 — The extension-data privacy claim is still not registered or fully tested

- **Reopened from review 1; location/quote:** Privacy → Extension data: “It does not send page text, form entries, scan counts, or browsing history to a server.”
- **Evidence:** `local-settings` claims only that settings can be exported/imported without a remote request. Its test installs the request listener **after** `openExtension()` has loaded the fixture and popup, uses no sentinel page text or form values, inspects no request bodies, and observes only the later toggle/export/import flow. `private-first-load` covers the website, not the extension. No claim entry states the quoted non-transmission promise.
- **Why this fails:** this is a broad privacy statement a visitor can rely on. Source inspection found no fetch path and this review’s sampled live flow stayed same-origin, but the claims contract requires the exact published promise to have a clean-sandbox tagged test. The earlier finding was marked fixed without the sentinel/full-lifecycle proof it requested, so it is blocking again under the history rule.
- **Concrete fix:** add an `extension-data-private` claim naming Privacy. Its one tagged unpacked-extension test must attach request logging before any page or popup opens, seed unique strings in page text, a form, scan results, and navigation history, exercise inspection and Stable mode, and assert that no remote request occurs and no URL or request body contains a sentinel.

### Minor

#### F-5-3 — Google Chrome compatibility is broader than the registered claim

- **Location/quote:** landing and README: “The extension installs on desktop Chrome or Chromium.” The install section also says “desktop Chrome’s Developer mode.”
- **Evidence:** `extension-desktop-chromium` says only “The extension installs and runs in desktop Chromium.” Its tagged test launches Playwright’s `channel: 'chromium'`; it never launches Google Chrome.
- **Why this fails:** the published claim names two browser products while the registry and test prove one. A visitor choosing Chrome receives an untested compatibility promise.
- **Concrete fix:** either change all public copy to “desktop Chromium”, or expand the claim to “desktop Chrome and Chromium” and run the unpacked-extension smoke flow once in each browser channel.

## Demo, storage, privacy, and offline evidence

- The landing action reaches `/demo/?demo=1` in one click. The persistent banner, **Reset demo**, and **Start for real** are present.
- A fresh live context was seeded with `real:review-sentinel=keep-me`. Enabling Stable mode added only `demo:calm-scroll:sample`. Reset removed only that demo key, focused the Stable mode switch, and preserved the sentinel. Start for real removed the demo key and again preserved the sentinel.
- The landing → demo → Stable mode → reset → exit flow made 12 requests, all to `https://calm-scroll.sociobot.in`, with no console errors.
- The deployed live verifier passed its service-worker lifecycle and offline demo operation. The exact `offline-demo` claim also passed at both viewport projects from the clean clone.
- These passes do not close F-1-31 because neither flow tests the extension’s quoted handling of page text, form entries, scan counts, or browsing history.

## Claims verification

Every exact command in `.factory/claims.json` ran independently from clean clone `/tmp/calm-scroll-review-5-clean-yOOqm9` after `npm ci`.

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `demo-isolation` | pass, desktop + 390 px | Only the demo key was created in a clean context; reset and exit removed it. |
| `demo-responsive` | pass, desktop + 390 px | Query entry, switch, reset, and no horizontal overflow passed. F-5-2 concerns first-viewport usefulness, which this test does not assert. |
| `sample-motion-controls` | pass, desktop + 390 px | Exact sample counts, stopped sample CSS, late animation, and retained text passed. |
| `sample-exceptions` | pass, desktop + 390 px | Media/sticky exceptions and sample restoration passed. |
| `local-settings` | pass desktop; expected mobile skip | Extension export, clear, replace-import, and rule reapplication passed. It does not prove the broader privacy sentence in F-1-31. |
| `extension-desktop-chromium` | pass desktop; expected mobile skip | Unpacked extension loaded in bundled Chromium and returned a nonzero report. It does not test Google Chrome (F-5-3). |
| `private-first-load` | pass, desktop + 390 px | Website landing-to-demo requests remained same-origin. |
| `offline-demo` | pass, desktop + 390 px | Demo reloaded and operated after explicit service-worker activation/control and offline transition. |
| `health-boundary` | pass, desktop + 390 px | Landing and Terms retained the non-clinical boundary. |
| `mit-license` | pass, desktop + 390 px | Packaged `LICENSE`, repository license, README notice, and Terms wording matched. |

No listed test command failed. F-1-31 is an unlisted broader privacy claim; F-5-3 is public wording broader than its listed claim.

## Copy audit

Counts split rendered text on whitespace; hyphenated forms, URLs, and code paths count as one word. Headings and controls are included because visitors rely on them. No sentence exceeds 22 words. No banned marketing adjective, unexplained jargon, metaphor/mood heading, inconsistent core term, or non-result-naming action appears. Claim flags are recorded even where the words themselves are plain.

### Landing page

| Words | Exact text | Result |
| ---: | --- | --- |
| 4 | Skip to main content | pass |
| 2 | Calm Scroll | pass |
| 1 | Demo | pass; navigation |
| 1 | Install | pass; navigation |
| 1 | Privacy | pass; navigation |
| 5 | Browser extension for motion-sensitive readers | pass |
| 6 | Stop page motion while you read. | pass |
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | plain; registered motion claim |
| 5 | Try it with sample data | pass; result-naming action |
| 6 | Install on desktop Chrome or Chromium | F-5-3 claim scope |
| 7 | The demo fits phone and desktop screens. | registered |
| 8 | The extension installs on desktop Chrome or Chromium. | F-5-3 claim scope |
| 6 | Extension settings stay in this browser. | registered |
| 9 | Calm Scroll reports motion before you choose a change. | registered |
| 3 | Local per-site settings | registered |
| 5 | Stable mode turns off again | registered |
| 3 | Not medical treatment | registered |
| 7 | See what is moving on each site. | pass |
| 11 | Use the sample to see the motion Calm Scroll can inspect. | pass |
| 3 | Inspect the page | pass |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | registered |
| 4 | Turn on Stable mode | pass; result-naming action |
| 9 | One switch pauses media and stops detected page motion. | registered |
| 6 | It also watches for later motion. | registered |
| 3 | Keep needed controls | pass |
| 11 | Allow media or keep sticky layers when a site needs them. | registered |
| 8 | Turn Stable mode off to restore the page. | registered |
| 5 | Try the motion controls first. | pass |
| 11 | Use the sample page to inspect and change real moving elements. | pass |
| 3 | Open sample demo | pass; result-naming action |
| 5 | Install the extension on desktop. | pass |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chrome’s Developer mode. | F-5-3 claim scope |
| 3 | Download and unzip | pass |
| 8 | Save the extension ZIP on your desktop computer. | pass |
| 2 | Open extensions | pass |
| 7 | Visit chrome://extensions and turn on Developer mode. | pass |
| 3 | Load the folder | pass |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. | pass |
| 3 | Download extension ZIP | pass; result-naming action |
| 5 | Technical: verify the download checksum | pass; result-naming action |
| 3 | Know the limits. | pass |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | registered |
| 14 | If a site breaks, turn Stable mode off or keep the control it needs. | pass; recovery instruction |
| 5 | Local controls for page motion. | pass |
| 1 | Terms | pass; navigation |
| 17 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). | pass |

Repeated header/footer navigation uses the same text and result shown above.

### README

| Words | Exact text | Result |
| ---: | --- | --- |
| 2 | Calm Scroll | pass |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. | pass |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | registered |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/?demo=1. | registered |
| 6 | It fits phone and desktop screens. | registered |
| 8 | Install the extension on desktop Chrome or Chromium. | F-5-3 claim scope |
| 3 | What it does | pass |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | registered |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | registered |
| 7 | Saves extension choices in browser-local extension storage. | registered |
| 10 | Exports or imports site settings as a local JSON file. | registered |
| 9 | Calm Scroll is not a medical device or treatment. | registered |
| 3 | Run and verify | pass |
| 6 | Node.js 22+ and npm are required. | pass; setup requirement |
| 11 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. | pass; maintainer instruction |
| 7 | The desktop install ZIP is in dist/site/downloads/. | pass; maintainer instruction |
| 7 | Each public claim is listed in .factory/claims.json. | contradicted by F-1-31/F-5-3 |
| 14 | Run one claim with its listed command or run all checks with npm test. | pass; maintainer instruction |
| 9 | After one online visit, the sample demo reloads offline. | registered |
| 6 | Install on desktop Chrome or Chromium | F-5-3 claim scope |
| 6 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. | pass; setup instruction |
| 7 | Open chrome://extensions and turn on Developer mode. | pass; setup instruction |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. | pass; setup instruction |
| 3 | Privacy and deployment | pass |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | registered |
| 7 | See the deployed Privacy and Terms pages. | pass |
| 6 | Deploy dist/site/ as a static site. | pass; maintainer instruction |
| 9 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | pass; maintainer instruction |
| 1 | License | pass |
| 3 | MIT. See LICENSE. | registered |

Commands in the fenced setup block are commands, not sentences: `npm ci`, `npx playwright install chromium`, `npm test`, and `npm run build`.

### Terminology

| Concept | Consistent term |
| --- | --- |
| Main change | Stable mode |
| Saved choice | site setting |
| Browser sample | demo |
| Installable archive | extension ZIP |
| Moving page item | motion |

## Structure, links, accessibility, and delivery

- Home, Demo, Privacy, Terms, and 404 each expose `lang="en"`, one h1, one main landmark, a route-specific title/description/canonical, OG/Twitter metadata, favicon, Apple touch icon, and the same **Demo / Install / Privacy** header and **Demo / Privacy / Terms** footer.
- Titles are “Calm Scroll — Stop page motion while you read”, “Demo — Calm Scroll”, “Privacy — Calm Scroll”, “Terms — Calm Scroll”, and “Page not found — Calm Scroll”.
- Header navigation and browser Back focus the destination h1 and update the polite announcement. Hash navigation focuses the section heading.
- A made-up route returned HTTP 404 with “That page was not found.” and a working home action.
- All internal pages, the query demo entry, ZIP, checksum, and GitHub links returned 200. The provenance link briefly returned GitHub 429 in the browser crawl and returned 200 on immediate `curl -L` retry; it is rate-limited, not dead.
- `robots.txt`, `sitemap.xml`, security headers, local assets, reduced-motion CSS, and service-worker delivery are present. First-load site JavaScript is about 2 KB gzip per entry, below the limit.
- Default-theme Axe checks passed on every route at both widths. Dark-theme contrast fails as F-5-1.
- The visual system is distinct and matches `.factory/design.md`; no generic gradient hero or three-card SaaS shell was found.

## Earlier-review history

All earlier reviews, polish reports, and the prior handoff were read. Each earlier ID was checked against the live release and current source/tests rather than accepted from its status label.

### Review 1

| ID | Current verification |
| --- | --- |
| F-1-1 | fixed — cold h1 names the job and the lede names the affected reader. |
| F-1-2 | fixed — the phone-safe demo is first and installation says desktop. |
| F-1-3 | fixed — query entry, banner, demo namespace, reset, exit, and guide exist. |
| F-1-4 | fixed — ten registry entries each have one tagged test; all commands passed. |
| F-1-5 | fixed — no paid checkout or offer remains. |
| F-1-6 | fixed — invented live route returns the designed HTTP 404. |
| F-1-7 | fixed for the registered sample behavior; exact test passed. |
| F-1-8 | fixed for the registered sample report; exact counts are visible. |
| F-1-9 | fixed for the seeded sample; exact category counts passed. |
| F-1-10 | fixed — initial and later sample motion stop. |
| F-1-11 | fixed — media and sticky sample exceptions are independent. |
| F-1-12 | fixed — demo state is separate; extension settings use extension storage. |
| F-1-13 | fixed — vague ordinary-HTML claim remains absent. |
| F-1-14 | fixed — unsupported keyboard/media promise remains absent; keyboard regression coverage passes. |
| F-1-15 | fixed — reproducibility is maintainer evidence, not visitor marketing. |
| F-1-16 | fixed — unsupported paid/free-tier promise remains absent. |
| F-1-17 | fixed — unavailable Supporter offer remains absent. |
| F-1-18 | fixed — checkout/security/merchant/refund promises remain absent. |
| F-1-19 | fixed — license-token UI and storage remain absent. |
| F-1-20 | fixed — retained sample reversal is observable and passed. |
| F-1-21 | fixed — README uses Stable mode and mapped motion/exception claims. |
| F-1-22 | fixed for the registered sample report. |
| F-1-23 | fixed in extension regression coverage and sample claim coverage. |
| F-1-24 | fixed — later motion is added and stopped in the claim test. |
| F-1-25 | fixed — report assertions use exact seeded counts. |
| F-1-26 | fixed — per-host persistence, export, import, and restoration passed. |
| F-1-27 | fixed — keyboard behavior remains covered without broad public wording. |
| F-1-28 | fixed — restricted-page recovery remains in popup code and suite coverage. |
| F-1-29 | fixed — paid-tier claims remain absent. |
| F-1-30 | fixed — website privacy claim is registered and request-tested. |
| **F-1-31** | **reopened — the page/form/scan/history non-transmission sentence lacks its required sentinel/full-lifecycle claim test.** |
| F-1-32 | fixed — billing API copy and calls remain absent. |
| F-1-33 | fixed — token verification/persistence claims remain absent. |
| F-1-34 | fixed — clean build produced the documented paths. |
| F-1-35 | fixed — `npm run test:package` reproduced the same ZIP three times. |
| F-1-36 | fixed — live verification remains maintainer documentation and passed. |
| F-1-37 | fixed — delivery configuration is factual and contract-tested. |
| F-1-38 | fixed — broad local/free/account fragments remain removed or narrowed. |
| F-1-39 | fixed — no decorative lore or fake specimen label remains on landing. |
| F-1-40 | fixed — the section heading directly names moving-page inspection. |
| F-1-41 | fixed — the demo is interactive; F-5-2 is the distinct first-viewport requirement. |
| F-1-42 | fixed — install text names desktop and gives concrete steps. |
| F-1-43 | fixed — Supporter section remains absent. |
| F-1-44 | fixed — “secure checkout” copy remains absent. |
| F-1-45 | fixed — retained download action says “Download extension ZIP”. |
| F-1-46 | fixed — limits heading and recovery text are concrete. |
| F-1-47 | fixed — core terms are consistent across landing and README. |
| F-1-48 | fixed — no audited landing/README sentence exceeds 22 words. |
| F-1-49 | fixed — banned marketing words and prior internal jargon remain absent. |
| F-1-50 | fixed — every route has canonical/social/icon metadata. |
| F-1-51 | fixed — route headers and footers are consistent at 390 px and desktop. |
| F-1-52 | fixed — route, Back, and hash focus/announcement behavior passed live. |
| F-1-53 | fixed — external source/provenance links are visibly labeled. |
| F-1-54 | fixed — local JSON merge/replace portability exists and passed. |
| F-1-55 | fixed — README gives the live demo URL and desktop ZIP path. |
| F-1-56 | fixed — unsupported reader/ad-blocker boundary wording remains absent. |
| F-1-57 | fixed — unsupported reduced-motion assertion remains absent. |
| F-1-58 | fixed — stale store-availability sentence remains absent. |
| F-1-59 | fixed — unavailable price claim remains absent. |
| F-1-60 | fixed — untestable funding promise remains absent. |
| F-1-61 | fixed — the non-medical boundary is registered and passed. |
| F-1-62 | fixed — sample exceptions and restoration passed. |
| F-1-63 | fixed — original-art provenance is linked and recorded. |
| F-1-64 | fixed — audience wording promises no health outcome. |
| F-1-65 | fixed — unsupported reader/ad-blocker behavior claim remains absent. |
| F-1-66 | fixed — user-reported health-outcome wording remains absent. |
| F-1-67 | fixed — test-stack detail remains maintainer documentation. |
| F-1-68 | fixed — false automatic-browser-download wording remains absent. |
| F-1-69 | fixed — restricted-page recovery exists without unsupported public copy. |
| F-1-70 | fixed — complete offline demo lifecycle passed locally and live. |

### Review 2

| ID | Current verification |
| --- | --- |
| F-2-1 | fixed — unknown live route returns styled HTTP 404. |
| F-2-2 | fixed — identical header labels remain visible and keyboard reachable at 390 px. |
| F-2-3 | fixed — real unpacked-extension export/clear/import/reapply flow passed. |
| F-2-4 | fixed — bounded 390 px/desktop layout test passed. |
| F-2-5 | fixed — no-account promise remains absent. |
| F-2-6 | fixed for local-settings locations; F-1-31 is a different broader privacy sentence. |
| F-2-7 | fixed — reduced-motion claim remains replaced by a sample instruction. |
| F-2-8 | fixed — reader/ad-blocker claims remain absent. |
| F-2-9 | fixed — README report/reversal locations are named. |
| F-2-10 | fixed — README uses the bounded phone/desktop demo wording. |
| F-2-11 | original Chromium smoke requirement fixed; F-5-3 records the remaining broader Google Chrome wording. |
| F-2-12 | fixed — README motion, exception, and local-settings locations are mapped. |
| F-2-13 | fixed — route and Back focus/announcement passed live. |
| F-2-14 | fixed — legal/demo/404 social metadata is complete. |

### Reviews 3 and 4, plus controller retry

| ID | Current verification |
| --- | --- |
| F-3-1 | fixed — stale Web Store availability sentence remains absent. |
| F-3-2 | fixed — Privacy limits offline wording to the sample demo. |
| F-3-3 | fixed — `demo-isolation.where` names README and its test asserts the occurrence. |
| CTRL-3-1 | fixed — awaited activation/control, offline reload, and cached Stable mode all passed. |
| F-4-1 | fixed — MIT claim is registered; packaged license and published terms passed. |

## Verification summary

- All ten exact claim commands: passed from the clean clone.
- `npm test`: passed, 23 Vitest checks and 43 Playwright passes with 3 expected desktop-extension mobile skips.
- `npm run build`: passed; produced `dist/site/` and `dist/extension/chrome-mv3/`.
- `npm run test:package`: passed; three builds produced SHA-256 `9a1c9f6d4bd4c564342de621a554a33493cbf3c8615156957aa4a36cb94cdcfd`.
- `npm run test:live`: passed for release `232dceef4fd55807644e4612a0ee9a54e4c431e5`.
- Independent dark-theme Axe scan: failed with serious contrast violations on home and demo at both widths (F-5-1).

## Missed leverage

No AI feature is appropriate. The job is deterministic, local page-motion control; sending page content to an AI gateway would add privacy risk without improving the core action. Local JSON import/export already supplies the obvious portability feature implied by long-lived per-site settings. Cloud sync is not an obvious requirement because it would conflict with the local-first privacy position.

## What would make this perfect

Fix and test every dark-theme contrast pair; put the real report and Stable mode control in the first demo viewport with realistic sample content; register and sentinel-test the full extension-data privacy promise; and align the Chrome/Chromium copy with browsers actually tested. Then rerun every claim command, both-theme Axe scans at both widths, the full clean-clone suite/build/package checks, and the live crawl. Nothing else should remain.
