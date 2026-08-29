# Adversarial first-read review 3 — Calm Scroll

**Verdict: FAIL**

Reviewed 29 August 2026 from fresh Chromium contexts at 390 × 844 and 1440 × 900. The live `release.json` identifies `a15931b5360027fea85db18c0c6d607c6e3b3e8c`, the checked-out commit. This is not a functional failure: the product is clear and tryable. It fails the stated acceptance bar because three published statements are absent from, or broader than, the claims registry.

## First 30 seconds

Before scrolling, at both widths:

- **What it does:** a browser extension that stops common moving page effects while I read.
- **For whom:** people made uncomfortable by page motion.
- **What to click first:** **Try it with sample data**. It opens an interactive sample without asking me to install a desktop extension.

This passes. The first screen says all three things directly: “Stop page motion while you read.”, “For people made uncomfortable by page motion…”, and “Try it with sample data”. At 390 px, all three header links remain visible, the initial width is exactly 390 px, and the first action has a 44 px-sized, result-naming target. The industrial clamp illustration, yellow control treatment, hard rules, and restrained type are distinct from a generic SaaS template and fit the motion-control task.

## Findings

### Minor

#### F-3-1 — Store-availability claim has no registered proof

- **Quote/location:** landing, Install section: “The Chrome Web Store listing is not available yet.”
- **Why this is a finding:** this is a factual availability statement a visitor can rely on, but no entry in `.factory/claims.json` identifies or tests it. It can become stale without a signal in CI.
- **Concrete fix:** delete the sentence and begin the instruction “Download the extension ZIP, unzip it, then load its folder in desktop Chrome’s Developer mode.” This is sufficient and avoids an unnecessary time-sensitive claim. Alternatively, add a `store-unavailable` claim with a static test that asserts the site provides no store-install path and name the Install section in `where`.

#### F-3-2 — Privacy page overstates the tested offline scope

- **Quote/location:** Privacy → Website data: “It caches public files for offline reading.”
- **Why this is a finding:** `offline-demo` promises and tests only “The sample demo reloads offline after the first visit.” Its tagged test opens `/demo/`, goes offline, and reloads that route. It does not establish that every public file, or general offline reading, is cached. The broader privacy sentence is therefore an unlisted claim.
- **Concrete fix:** replace it with “After one online visit, the sample demo reloads offline.”, which is the exact registered and observed behavior. If whole-site offline reading is intended, change the registry wording and test each named public route and its required assets after an offline reload.

#### F-3-3 — README’s isolation assertion is not named in the claim location list

- **Quote/location:** README line 6: “Try the isolated sample at <https://calm-scroll.sociobot.in/?demo=1>.”
- **Why this is a finding:** the word “isolated” is a privacy promise. `demo-isolation` tests the behavior correctly, but its `where` field lists “Demo banner, Privacy, .factory/demo.md” and omits this README occurrence. The registry is meant to identify every published location of each claim.
- **Concrete fix:** add `README` to `demo-isolation.where`; retain its existing clean-context test, which already observes only `demo:calm-scroll:sample` and Reset removal.

## Demo and sandbox verification

From a fresh context, the landing CTA took one click to `https://calm-scroll.sociobot.in/demo/?demo=1`. Its first screen already displayed a realistic used state: autoplay, animation, transform, sticky layer, smooth-scroll report, counts, and the Stable mode switch. The persistent banner read “Demo — sample data, nothing is saved.” and included **Reset demo** and **Start for real**.

At both 390 px and desktop, enabling Stable mode changed only `demo:calm-scroll:sample`; the animation’s computed name became `none`. Reset removed the sole key and returned focus to **Turn on Stable mode**. The captured request log for landing → demo → Stable mode → reset contained only `https://calm-scroll.sociobot.in` requests. No real extension storage key was present or read in the demo context.

## Claims and clean-clone verification

I cloned the candidate into `/tmp/calm-scroll-review-3-clean`, ran `npm ci`, and ran every command in `.factory/claims.json` independently. All passed:

| Claim | Result |
| --- | --- |
| `demo-isolation` | pass, desktop and 390 px |
| `demo-responsive` | pass, desktop and 390 px |
| `sample-motion-controls` | pass, desktop and 390 px |
| `sample-exceptions` | pass, desktop and 390 px |
| `local-settings` | pass on desktop Chromium; mobile project skipped because unpacked extensions are desktop-only |
| `extension-desktop-chromium` | pass on desktop Chromium; mobile project skipped because unpacked extensions are desktop-only |
| `private-first-load` | pass, desktop and 390 px |
| `offline-demo` | pass, desktop and 390 px |
| `health-boundary` | pass, desktop and 390 px |

`npm test` passed: 21 unit/contract tests and 42 browser tests, with the two expected mobile skips for desktop-only unpacked-extension checks. `npm run build` passed and produced `dist/site/` and `dist/extension/chrome-mv3/`. The live request log also independently confirmed same-origin-only first load and demo use. No claim test failed; F-3-1 through F-3-3 are registry/copy coverage failures, not test failures.

## Copy audit

Word counts treat a hyphenated word and a URL as one word. No landing or README sentence exceeds 22 words. No banned marketing adjective, jargon, metaphorical heading, inconsistent core term, or non-result-naming button was found. “Stable mode”, “demo”, “site setting”, “extension ZIP”, and “motion” are used consistently.

### Landing page

| Words | Text | Result |
| ---: | --- | --- |
| 4 | Skip to main content | pass |
| 2 | Calm Scroll | pass |
| 1 | Demo | pass |
| 1 | Install | pass |
| 1 | Privacy | pass |
| 5 | Browser extension for motion-sensitive readers | pass |
| 6 | Stop page motion while you read. | pass |
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | pass |
| 5 | Try it with sample data | pass |
| 6 | Install on desktop Chrome or Chromium | pass |
| 7 | The demo fits phone and desktop screens. | registered |
| 8 | The extension installs on desktop Chrome or Chromium. | registered |
| 6 | Extension settings stay in this browser. | registered |
| 9 | Calm Scroll reports motion before you choose a change. | registered |
| 3 | Local per-site settings | registered |
| 5 | Stable mode turns off again | registered |
| 3 | Not medical treatment | registered |
| 7 | See what is moving on each site. | pass |
| 10 | Use the sample to see the motion Calm Scroll can inspect. | pass |
| 3 | Inspect the page | pass |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | registered |
| 4 | Turn on Stable mode | pass |
| 9 | One switch pauses media and stops detected page motion. | registered |
| 6 | It also watches for later motion. | registered |
| 3 | Keep needed controls | pass |
| 11 | Allow media or keep sticky layers when a site needs them. | registered |
| 8 | Turn Stable mode off to restore the page. | registered |
| 5 | Try the motion controls first. | pass |
| 10 | Use the sample page to inspect and change real moving elements. | pass |
| 3 | Open sample demo | pass |
| 5 | Install the extension on desktop. | pass |
| 9 | The Chrome Web Store listing is not available yet. | **F-3-1** |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chrome’s Developer mode. | registered |
| 3 | Download and unzip | pass |
| 8 | Save the extension ZIP on your desktop computer. | pass |
| 2 | Open extensions | pass |
| 7 | Visit chrome://extensions and turn on Developer mode. | pass |
| 3 | Load the folder | pass |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. | pass |
| 3 | Download extension ZIP | pass |
| 5 | Technical: verify the download checksum | pass |
| 3 | Know the limits. | pass |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | registered |
| 13 | If a site breaks, turn Stable mode off or keep the control it needs. | pass |
| 5 | Local controls for page motion. | pass |
| 1 | Terms | pass |
| 15 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). | pass |

### README

| Words | Text | Result |
| ---: | --- | --- |
| 2 | Calm Scroll | pass |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. | pass |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | registered |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/?demo=1. | **F-3-3** |
| 7 | It fits phone and desktop screens. | registered |
| 8 | Install the extension on desktop Chrome or Chromium. | registered |
| 4 | What it does | pass |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | registered |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | registered |
| 8 | Saves extension choices in browser-local extension storage. | registered |
| 10 | Exports or imports site settings as a local JSON file. | registered |
| 8 | Calm Scroll is not a medical device or treatment. | registered |
| 3 | Run and verify | pass |
| 6 | Node.js 22+ and npm are required. | pass |
| 12 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. | pass |
| 10 | The desktop install ZIP is in dist/site/downloads/. | pass |
| 8 | Each public claim is listed in .factory/claims.json. | pass |
| 14 | Run one claim with its listed command or run all checks with npm test. | pass |
| 9 | After one online visit, the sample demo reloads offline. | registered |
| 7 | Install on desktop Chrome or Chromium | pass |
| 10 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. | pass |
| 9 | Open chrome://extensions and turn on Developer mode. | pass |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. | pass |
| 3 | Privacy and deployment | pass |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | registered |
| 6 | See the deployed Privacy and Terms pages. | pass |
| 7 | Deploy dist/site/ as a static site. | pass |
| 10 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | pass |
| 1 | License | pass |
| 4 | MIT. See LICENSE. | pass |

The separate Privacy sentence “It caches public files for offline reading.” is F-3-2. It is not part of the landing/README count required above.

## Structure, links, and accessibility checks

Live checks covered `/`, `/demo/`, `/privacy/`, `/terms/`, `/404.html`, and an invented path.

- Every route had `lang="en"`, one h1, one `main`, a route-specific title, description, canonical URL, Open Graph/Twitter title/description/image, favicon, and Apple touch icon.
- Headers were consistently **Demo / Install / Privacy** and footers consistently exposed Demo, Privacy, and Terms. All stayed visible at 390 px.
- An invented path returned HTTP 404 and the designed “That page was not found.” recovery page.
- Header navigation and browser Back moved focus to the destination h1 and announced it in the polite live region.
- The live crawl returned HTTP 200 for every internal page, demo/query entry, download, checksum, and legal route. External provenance/source links were visibly labeled as external.
- No console or page errors occurred during cold landing, demo, route, or Back checks. The project suite’s axe checks found no serious or critical violations; the live manual shell check confirmed visible focus and no horizontal overflow.

## Earlier-review history

I read `review-1.md`, `review-2.md`, `polish-1.md`, `polish-2.md`, all three verification records, and the previous handoff. I rechecked every earlier finding in live output and current code rather than accepting its prior status.

| Earlier finding | Current result and evidence |
| --- | --- |
| F-1-1 | fixed — cold h1 states the direct job and lede names the audience. |
| F-1-2 | fixed — the phone-safe demo is first; install is clearly desktop-only. |
| F-1-3 | fixed — `?demo=1`, banner, reset, exit, and `demo:` isolation observed. |
| F-1-4 | fixed — nine entries, exact-tag contract, and all claim commands passed. |
| F-1-5 | fixed — the broken paid checkout is absent. |
| F-1-6 | fixed — invented live route returned designed HTTP 404. |
| F-1-7 | fixed — declared motion stopping is covered by `sample-motion-controls`. |
| F-1-8 | fixed — seeded sample report is visible before changing it. |
| F-1-9 | fixed — every report category has an exact asserted count. |
| F-1-10 | fixed — Stable mode stops initial and late sample motion. |
| F-1-11 | fixed — media and sticky exceptions are independently tested. |
| F-1-12 | fixed — extension settings and demo storage are separate/local. |
| F-1-13 | fixed — vague ordinary-HTML claim remains removed. |
| F-1-14 | fixed — no unsupported keyboard/media public promise remains. |
| F-1-15 | fixed — reproducibility is maintainer evidence, not visitor copy. |
| F-1-16 | fixed — unsupported free-tier scope claims remain removed. |
| F-1-17 | fixed — unavailable Supporter offer remains removed. |
| F-1-18 | fixed — checkout, merchant, security, and refund claims remain removed. |
| F-1-19 | fixed — license-token UI/storage claim remains removed. |
| F-1-20 | fixed — retained reversal is bounded to registered sample behavior. |
| F-1-21 | fixed — README uses plain Stable mode wording with named claims. |
| F-1-22 | fixed — all motion categories are asserted by the sample claim. |
| F-1-23 | fixed — stop behavior is asserted for all declared sample sources. |
| F-1-24 | fixed — test adds and stops later animation. |
| F-1-25 | fixed — report tests use exact counts. |
| F-1-26 | fixed — desktop claim exercises persistence, export, import, and restoration. |
| F-1-27 | fixed — keyboard behavior remains regression-covered without broad copy. |
| F-1-28 | fixed — restricted-page popup retains clear retryable recovery. |
| F-1-29 | fixed — unavailable paid-tier copy remains absent. |
| F-1-30 | fixed — narrow privacy wording is request-tested. |
| F-1-31 | fixed — extension import/export claim records no remote request. |
| F-1-32 | fixed — billing API claim/calls remain removed. |
| F-1-33 | fixed — token verification/persistence claim remains removed. |
| F-1-34 | fixed — README build paths match current build output. |
| F-1-35 | fixed — package verification remains reproducible-build coverage. |
| F-1-36 | fixed — live verification remains maintainer documentation. |
| F-1-37 | fixed — delivery configuration is factual maintainer documentation. |
| F-1-38 | fixed — broad local/free/account phrases remain narrowed or absent. |
| F-1-39 | fixed — no decorative lore or specimen labels found. |
| F-1-40 | fixed — section headings directly name their tasks. |
| F-1-41 | fixed — demo is seeded, interactive, and already in use on entry. |
| F-1-42 | fixed — install calls out desktop use and gives concrete steps. |
| F-1-43 | fixed — Supporter content remains absent. |
| F-1-44 | fixed — checkout-security wording remains absent. |
| F-1-45 | fixed — ZIP download wording is consistent. |
| F-1-46 | fixed — non-medical boundary and recovery instruction are visible. |
| F-1-47 | fixed — terminology table matches current visitor copy. |
| F-1-48 | fixed — current landing/README audit has no sentence over 22 words. |
| F-1-49 | fixed — no banned internal jargon found. |
| F-1-50 | fixed — all route templates expose complete canonical/social/icon metadata. |
| F-1-51 | fixed — every route has the same visible 390 px header and footer. |
| F-1-52 | fixed — internal navigation and Back focus/announce the destination h1. |
| F-1-53 | fixed — provenance link is visibly labeled external. |
| F-1-54 | fixed — local JSON merge/replace restoration is exercised end to end. |
| F-1-55 | fixed — README gives the live demo URL and desktop ZIP route. |
| F-1-56 | fixed — limits are plain and omit reader/ad-blocker promises. |
| F-1-57 | fixed — unsupported reduced-motion assertion was removed. |
| F-1-58 | fixed — store availability and developer install are stated plainly. |
| F-1-59 | fixed — unavailable $12 claim remains removed. |
| F-1-60 | fixed — untestable funding promise remains removed. |
| F-1-61 | fixed — non-medical language is protected by the health claim. |
| F-1-62 | fixed — sample test proves exceptions and restoration. |
| F-1-63 | fixed — original-art provenance is linked and recorded. |
| F-1-64 | fixed — audience copy names discomfort without efficacy promise. |
| F-1-65 | fixed — unsupported reader/ad-blocker boundary remains removed. |
| F-1-66 | fixed — no user-reported health-outcome wording remains. |
| F-1-67 | fixed — test-stack details stay in maintainer documentation. |
| F-1-68 | fixed — no false automatic-download statement remains. |
| F-1-69 | fixed — restricted-page recovery is implemented without unsupported copy. |
| F-1-70 | fixed — offline behavior is a registered observable demo claim. |
| F-2-1 | fixed — invented live route now returns HTTP 404 and recovery copy. |
| F-2-2 | fixed — all routes use the same visible keyboard-reachable header at 390 px. |
| F-2-3 | fixed — the local-settings claim uses a real unpacked-MV3 export/clear/import/reapply flow. |
| F-2-4 | fixed — compatibility is narrowed to phone and desktop screens and tested. |
| F-2-5 | fixed — the unlisted “No account” promise is gone. |
| F-2-6 | fixed — `local-settings.where` now lists landing, Privacy, README, and popup. |
| F-2-7 | fixed — unsupported reduced-motion statement is gone. |
| F-2-8 | fixed — reader/ad-blocker claim is gone. |
| F-2-9 | fixed — README motion/reversal locations are named and test-backed. |
| F-2-10 | fixed — README device wording matches the tested viewport claim. |
| F-2-11 | fixed — desktop Chromium compatibility has its registered extension test. |
| F-2-12 | fixed — README report, exceptions, local storage, and JSON claims are named/tested. |
| F-2-13 | fixed — cross-route and Back focus/announcement observed live. |
| F-2-14 | fixed — demo, legal, and 404 metadata is complete. |

No earlier finding regressed. F-3-1 through F-3-3 are new, narrower claim-coverage findings.

## Missed leverage

No missing AI feature was found. The brief is a local browser-motion control; adding a Sociobot-key AI step would be decorative and would not improve the first-use job. The product supplies the meaningful implied portability feature—local JSON export/import—and the claim test exercises it end to end.

## What would make this perfect

Remove the stale Web Store availability sentence, narrow the offline sentence to the tested sample-demo scope, and add README to the demo-isolation claim location. Then rerun the three affected claim/copy checks and the cold live review. Nothing else surfaced in this round.
