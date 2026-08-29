# Adversarial first-read review 6 — Calm Scroll

**Verdict: FAIL**

Reviewed 29 August 2026 against <https://calm-scroll.sociobot.in/> from fresh Chromium contexts at 390 × 844 and 1440 × 900. The deployed `release.json` identifies source commit `f91aa9902b48ea515397f6731ad4e6c2a944f075`, matching this checkout. There is one minor finding. A pass requires zero findings.

## First 30 seconds

Before scrolling, my answers were the same at both widths:

- **What it does:** a browser extension that stops common page motion while I read.
- **For whom:** people made uncomfortable by page motion.
- **What to click first:** **Try it with sample data**. It is usable on the phone; the alternative is clearly labeled **Install on desktop Chromium**.

This passes. The first screen states “Stop page motion while you read.”, “For people made uncomfortable by page motion…”, and “Try it with sample data”. On the 390 px screen, the action and all three product facts are visible before scrolling. The desktop screen adds the original mechanical-clamp illustration. The heavy rules, safety-yellow controls, newsprint surface, and inspection labels form a distinct motion-control identity rather than a generic SaaS template.

## Findings

### Minor

#### F-6-1 — Every public route emits an unsupported Permissions-Policy warning

- **Exact location/quote:** the response header configured in `public/staticwebapp.config.json` includes `web-share=()`. Fresh Chromium contexts on `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` each log: “Error with Permissions-Policy header: Unrecognized feature: 'web-share'.”
- **Why this is a finding:** the browser reports invalid delivery configuration on every first load. The visitor-facing pages still work, but a clean production load is not console-clean. The existing route test records only messages whose type is `error`, so this repeated `warning` is invisible to the quality gate.
- **Concrete fix:** remove the unsupported `web-share=()` directive from `Permissions-Policy`. Extend the public-route browser test to fail on `Permissions-Policy` warnings as well as console errors, then run that check against production.

## Demo and sandbox verification

The landing action reached `/demo/?demo=1` in one click. The first 390 × 844 screen already showed **Sample motion report**, exact counts, **Turn off Stable mode**, and the start of a realistic local-news article. Stable mode was already on. The desktop first screen showed the report and article together.

The persistent banner read “Demo — sample data, nothing is saved.” and exposed **Reset demo** and **Start for real**. I seeded `real:review-6=preserve` before entering the demo. Entry created only `demo:calm-scroll:sample`; Reset removed only that demo key; Start for real also left the real sentinel untouched. Reset restored the initial stabilized state and returned focus to the Stable mode switch.

The landing → demo → Reset → exit request log contained only `https://calm-scroll.sociobot.in` requests. The registered offline test also reloaded and operated the demo after service-worker activation and browser offline mode. No demo state reached extension storage or a remote origin.

## Claims verification

I cloned the reviewed commit to `/tmp/calm-scroll-review6-clean-j9Uo7b`, ran `npm ci`, and ran every command in `.factory/claims.json` independently. The first attempted command before installing dependencies in that clone failed during environment setup; after `npm ci` in the clone, every listed command completed as follows:

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `demo-isolation` | pass, desktop + 390 px | Only the demo namespace was created; Reset and exit removed it. |
| `demo-responsive` | pass, desktop + 390 px | Query entry, first-viewport report/control, reset, and width assertions passed. |
| `sample-motion-controls` | pass, desktop + 390 px | Exact counts, all five motion types, later motion, and retained article text passed. |
| `sample-exceptions` | pass, desktop + 390 px | Media and sticky exceptions remained independent; disabling Stable mode restored the sample. |
| `local-settings` | pass desktop; expected phone skip | The unpacked extension exported, cleared, imported, and reapplied a hostname rule without a remote request. |
| `extension-data-private` | pass desktop; expected phone skip | Full-lifecycle request logging found no remote request containing page, form, history, or scan sentinels. |
| `extension-desktop-chromium` | pass desktop; expected phone skip | The unpacked MV3 build loaded in Chromium and reported the seeded motion. |
| `private-first-load` | pass, desktop + 390 px | Landing-to-demo traffic remained same-origin. |
| `offline-demo` | pass, desktop + 390 px | The controlled demo reloaded offline and Stable mode remained operable. |
| `health-boundary` | pass, desktop + 390 px | Landing and Terms retained the non-clinical wording. |
| `mit-license` | pass, desktop + 390 px | Repository, packaged extension, README, and Terms license statements matched. |

No listed claim test failed, and no visitor-facing product claim was left untested. Maintainer setup/build statements in README were separately confirmed by the full clean-clone gates.

## Copy audit

Counts split on whitespace; hyphenated terms, URLs, and code paths count as one word. Repeated header/footer labels are listed once. No sentence exceeds 22 words. No banned marketing adjective, unexplained jargon, metaphor or mood heading, inconsistent product term, or non-result-naming action remains. There are no copy findings.

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
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | `sample-motion-controls` |
| 5 | Try it with sample data | pass; result-naming action |
| 4 | Install on desktop Chromium | `extension-desktop-chromium` |
| 7 | The demo fits phone and desktop screens. | `demo-responsive` |
| 6 | The extension installs on desktop Chromium. | `extension-desktop-chromium` |
| 6 | Extension settings stay in this browser. | `local-settings` |
| 9 | Calm Scroll reports motion before you choose a change. | `sample-motion-controls` |
| 3 | Local per-site settings | `local-settings` |
| 5 | Stable mode turns off again | `sample-exceptions` |
| 3 | Not medical treatment | `health-boundary` |
| 7 | See what is moving on each site. | pass |
| 11 | Use the sample to see the motion Calm Scroll can inspect. | pass |
| 3 | Inspect the page | pass |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | `sample-motion-controls` |
| 4 | Turn on Stable mode | pass; result-naming control |
| 9 | One switch pauses media and stops detected page motion. | `sample-motion-controls` |
| 6 | It also watches for later motion. | `sample-motion-controls` |
| 3 | Keep needed controls | pass |
| 11 | Allow media or keep sticky layers when a site needs them. | `sample-exceptions` |
| 8 | Turn Stable mode off to restore the page. | `sample-exceptions` |
| 5 | Try the motion controls first. | pass |
| 11 | Use the sample page to inspect and change real moving elements. | pass |
| 3 | Open sample demo | pass; result-naming action |
| 6 | Install the extension in desktop Chromium. | pass |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chromium’s Developer mode. | `extension-desktop-chromium` |
| 3 | Download and unzip | pass |
| 8 | Save the extension ZIP on your desktop computer. | pass |
| 2 | Open extensions | pass |
| 7 | Visit chrome://extensions and turn on Developer mode. | pass |
| 3 | Load the folder | pass |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. | pass |
| 3 | Download extension ZIP | pass; result-naming action |
| 5 | Technical: verify the download checksum | pass; result-naming action |
| 3 | Know the limits. | pass |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | `health-boundary` |
| 14 | If a site breaks, turn Stable mode off or keep the control it needs. | pass; recovery instruction |
| 5 | Local controls for page motion. | pass |
| 1 | Terms | pass; navigation |
| 17 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). | pass |

### README

| Words | Exact text | Result |
| ---: | --- | --- |
| 2 | Calm Scroll | pass; document heading |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. | pass |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | motion and exception claims |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/?demo=1. | `demo-isolation` |
| 6 | It fits phone and desktop screens. | `demo-responsive` |
| 6 | Install the extension on desktop Chromium. | `extension-desktop-chromium` |
| 3 | What it does | pass; heading |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | `sample-motion-controls` |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | `sample-exceptions` |
| 7 | Saves extension choices in browser-local extension storage. | `local-settings` |
| 10 | Exports or imports site settings as a local JSON file. | `local-settings` |
| 9 | Calm Scroll is not a medical device or treatment. | `health-boundary` |
| 3 | Run and verify | pass; heading |
| 6 | Node.js 22+ and npm are required. | pass; setup requirement confirmed in clean clone |
| 11 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. | pass; clean build confirmed |
| 7 | The desktop install ZIP is in dist/site/downloads/. | pass; clean build confirmed |
| 7 | Each public claim is listed in .factory/claims.json. | pass; registry cross-check confirmed |
| 14 | Run one claim with its listed command or run all checks with npm test. | pass; both paths confirmed |
| 9 | After one online visit, the sample demo reloads offline. | `offline-demo` |
| 4 | Install on desktop Chromium | pass; heading |
| 6 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. | pass; setup instruction |
| 7 | Open chrome://extensions and turn on Developer mode. | pass; setup instruction |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. | pass; setup instruction |
| 3 | Privacy and deployment | pass; heading |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | `private-first-load` |
| 7 | See the deployed Privacy and Terms pages. | pass |
| 6 | Deploy dist/site/ as a static site. | pass; maintainer instruction |
| 9 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | pass; contract and live response confirmed |
| 1 | License | pass; heading |
| 3 | MIT. See LICENSE. | `mit-license` |

The four fenced commands are commands rather than sentences: `npm ci`, `npx playwright install chromium`, `npm test`, and `npm run build`.

### Terminology

| Concept | One term used |
| --- | --- |
| Main change | Stable mode |
| Saved choice | site setting |
| Browser sample | demo |
| Installable archive | extension ZIP |
| Moving page item | motion |

## Structure, links, accessibility, and delivery

- `/`, `/demo/`, `/privacy/`, `/terms/`, `/404.html`, and a made-up path were checked live. Each rendered `lang="en"`, one `h1`, one `main`, ordered headings, complete route-specific title/description/canonical/OG/Twitter metadata, SVG favicon, and 180 px Apple touch icon.
- Titles are “Calm Scroll — Stop page motion while you read”, “Demo — Calm Scroll”, “Privacy — Calm Scroll”, “Terms — Calm Scroll”, and “Page not found — Calm Scroll”. The social image is 1200 × 630.
- Every route uses the same **Demo / Install / Privacy** header and **Demo / Privacy / Terms** footer. Header navigation and browser Back focused the destination `h1` and updated the polite route announcement. The install hash focused its `h2`.
- A made-up path returned HTTP 404 and the designed “That page was not found.” page. Every intentional internal, download, checksum, source, and provenance link returned 200. `robots.txt` and `sitemap.xml` are present and list all indexable routes.
- Both-theme Axe checks found no serious or critical issue at either width. Reduced motion, keyboard reachability, 44 px primary controls, alt text, contrast, and 390 px overflow checks passed. The only console defect is F-6-1.
- The built site JavaScript totals about 2.2 KB gzip across the main and demo entries, well below the product limit. The live release identity and packaged ZIP checksum match the reviewed commit.

## Earlier-review history

I read every `review-1.md` through `review-5.md`, every `polish-1.md` through `polish-5.md`, the verification records, and the prior handoff. Each earlier finding was checked against current live behavior and current source/tests.

### Review 1

| ID | Current verification |
| --- | --- |
| F-1-1 | fixed — the cold headline names the reading job and the lede names the affected reader. |
| F-1-2 | fixed — the phone-safe demo is first; installation is explicitly desktop Chromium. |
| F-1-3 | fixed — query entry, banner, isolated key, Reset, exit, and demo guide all work. |
| F-1-4 | fixed — eleven registry entries each have one matching tagged test; all commands pass. |
| F-1-5 | fixed — the dead paid checkout and paid offer remain absent. |
| F-1-6 | fixed — a made-up live route returns the designed HTTP 404. |
| F-1-7 | fixed — all named sample motion sources stop in the tagged test. |
| F-1-8 | fixed — the shared scanner supplies a visible report before any user change. |
| F-1-9 | fixed — exact counts are asserted for every report category. |
| F-1-10 | fixed — initial and later-added sample motion both stop. |
| F-1-11 | fixed — media and sticky exceptions are independently tested. |
| F-1-12 | fixed — demo state and extension settings use separate storage. |
| F-1-13 | fixed — the vague ordinary-HTML promise remains absent. |
| F-1-14 | fixed — unsupported keyboard/media marketing remains absent; keyboard checks pass. |
| F-1-15 | fixed — reproducibility remains maintainer evidence rather than visitor marketing. |
| F-1-16 | fixed — unsupported free-tier scope promises remain absent. |
| F-1-17 | fixed — unavailable Supporter copy remains absent. |
| F-1-18 | fixed — checkout, merchant, security, and refund claims remain absent. |
| F-1-19 | fixed — license-token UI and storage claims remain absent. |
| F-1-20 | fixed — reversal is bounded to observable, tested sample recovery. |
| F-1-21 | fixed — README uses consistent Stable mode wording with mapped tests. |
| F-1-22 | fixed — each reported motion category has an exact assertion. |
| F-1-23 | fixed — sample and extension checks cover all declared motion handling. |
| F-1-24 | fixed — the test adds and stops later motion. |
| F-1-25 | fixed — report assertions use exact seeded counts. |
| F-1-26 | fixed — hostname persistence, export, import, and restoration pass in unpacked MV3. |
| F-1-27 | fixed — keyboard behavior is regression-tested without a broader public promise. |
| F-1-28 | fixed — the popup retains its restricted-page recovery state. |
| F-1-29 | fixed — unavailable paid-tier wording remains absent. |
| F-1-30 | fixed — website request privacy is registered and tested. |
| F-1-31 | fixed — `extension-data-private` now logs the full lifecycle with page, form, history, and scan sentinels. |
| F-1-32 | fixed — billing API copy and calls remain absent. |
| F-1-33 | fixed — token persistence and verification claims remain absent. |
| F-1-34 | fixed — the clean build produces every documented path. |
| F-1-35 | fixed — package verification reproduces identical ZIP bytes three times. |
| F-1-36 | fixed — live verification remains maintainer documentation and passes. |
| F-1-37 | fixed — delivery configuration is contract-tested and observed live, except new F-6-1. |
| F-1-38 | fixed — broad local/free/account language remains removed or registered. |
| F-1-39 | fixed — no decorative lore or fake specimen labels remain. |
| F-1-40 | fixed — section headings name their tasks directly. |
| F-1-41 | fixed — the first demo viewport now shows realistic content, report, and applied result. |
| F-1-42 | fixed — install copy names desktop Chromium and gives concrete steps. |
| F-1-43 | fixed — Supporter content remains absent. |
| F-1-44 | fixed — unsupported checkout-security wording remains absent. |
| F-1-45 | fixed — download actions consistently name the extension ZIP. |
| F-1-46 | fixed — limits and recovery text are concrete. |
| F-1-47 | fixed — canonical product terms remain consistent. |
| F-1-48 | fixed — no audited landing or README sentence exceeds 22 words. |
| F-1-49 | fixed — banned marketing words and internal jargon remain absent. |
| F-1-50 | fixed — every route has complete canonical, social, favicon, and touch metadata. |
| F-1-51 | fixed — header and footer remain consistent at both widths. |
| F-1-52 | fixed — route, Back, and hash navigation move focus and announce destinations. |
| F-1-53 | fixed — external source/provenance links are visibly labeled. |
| F-1-54 | fixed — JSON merge/replace portability is real and tested end to end. |
| F-1-55 | fixed — README provides the direct demo URL and desktop ZIP path. |
| F-1-56 | fixed — unsupported reader/ad-blocker promises remain absent. |
| F-1-57 | fixed — unsupported reduced-motion compatibility claims remain absent. |
| F-1-58 | fixed — stale store-availability wording remains absent. |
| F-1-59 | fixed — unavailable price wording remains absent. |
| F-1-60 | fixed — untestable funding wording remains absent. |
| F-1-61 | fixed — the non-medical boundary is registered and tested. |
| F-1-62 | fixed — exceptions and full sample restoration pass. |
| F-1-63 | fixed — original-art provenance remains linked and recorded. |
| F-1-64 | fixed — audience wording makes no health-outcome promise. |
| F-1-65 | fixed — reader/ad-blocker behavior claims remain absent. |
| F-1-66 | fixed — unsupported user-reported outcome wording remains absent. |
| F-1-67 | fixed — test-stack detail remains maintainer documentation. |
| F-1-68 | fixed — false automatic-browser-download wording remains absent. |
| F-1-69 | fixed — restricted-page recovery remains implemented and tested. |
| F-1-70 | fixed — the full offline-demo lifecycle passes locally and live. |

### Review 2

| ID | Current verification |
| --- | --- |
| F-2-1 | fixed — unknown routes return the styled HTTP 404. |
| F-2-2 | fixed — complete header navigation remains visible and keyboard reachable at 390 px. |
| F-2-3 | fixed — the tagged claim performs real export, clear, import, and reapplication. |
| F-2-4 | fixed — the demo report and control fit the first phone and desktop screens. |
| F-2-5 | fixed — the unlisted no-account promise remains absent. |
| F-2-6 | fixed — all local-settings copy locations remain listed. |
| F-2-7 | fixed — unsupported reduced-motion wording remains absent. |
| F-2-8 | fixed — reader/ad-blocker claims remain absent. |
| F-2-9 | fixed — README report and reversal locations remain mapped. |
| F-2-10 | fixed — README device wording matches the tested viewports. |
| F-2-11 | fixed — public compatibility is limited to tested desktop Chromium. |
| F-2-12 | fixed — README motion, exception, storage, and JSON statements are mapped. |
| F-2-13 | fixed — route and Back focus/announcements work live. |
| F-2-14 | fixed — legal, demo, and 404 metadata is complete. |

### Reviews 3–5 and controller retry

| ID | Current verification |
| --- | --- |
| F-3-1 | fixed — stale Web Store availability wording remains absent. |
| F-3-2 | fixed — offline wording is limited to the tested sample demo. |
| F-3-3 | fixed — README is named in `demo-isolation.where`. |
| CTRL-3-1 | fixed — activation, control, offline reload, and cached Stable mode pass. |
| F-4-1 | fixed — the MIT promise is registered; repository and packaged license tests pass. |
| F-5-1 | fixed — both-theme Axe scans pass on every public route at both widths. |
| F-5-2 | fixed — the first demo screen contains the report, applied control state, and realistic article start. |
| F-5-3 | fixed — every public compatibility statement says desktop Chromium. |

No earlier finding is reopened. F-6-1 is a new delivery warning in a header that earlier checks accepted because they captured console errors only.

## Full verification summary

- Eleven exact claim commands: all pass from the clean clone.
- `npm test`: 25 Vitest checks passed; 56 Playwright checks passed; four desktop-extension checks skipped only in the phone project.
- `npm run build`: passed and produced `dist/site/` and `dist/extension/chrome-mv3/`.
- `npm run test:package`: passed; three builds produced SHA-256 `ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.
- `EXPECTED_RELEASE_SHA=f91aa9902b48ea515397f6731ad4e6c2a944f075 npm run test:live`: passed.
- Independent live audit: one repeatable console warning remains as F-6-1.

## Missed leverage

No missing leverage finding applies. The extension already supports local JSON import/export for durable per-site settings. Cloud sync would conflict with the local-first privacy model. The core task is deterministic motion control; adding an AI gateway would require sending page information without improving the primary job.

## What would make this perfect

Remove `web-share=()` from the production `Permissions-Policy`, add a regression assertion for policy warnings, deploy, and confirm a warning-free cold load on every public route. Nothing else remains from this round.
