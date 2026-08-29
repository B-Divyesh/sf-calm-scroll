# Adversarial first-read review 4 — Calm Scroll

**Verdict: FAIL**

Reviewed 29 August 2026 against <https://calm-scroll.sociobot.in/> from fresh Chromium contexts at 390 × 844 and 1440 × 900. The deployed `release.json` identifies `7d73f2fd4523c913bb640a78ee6ea6de06279e7c`, matching this checkout. There is one minor finding. This review's required verdict is `FAIL` whenever any finding remains.

## First 30 seconds

Before scrolling at both widths, the answers were clear:

- **What it does:** a browser extension that stops common page motion while I read.
- **For whom:** people made uncomfortable by page motion.
- **What to click first:** **Try it with sample data**. It opens a usable browser demo without installing a desktop extension.

The first screen makes this explicit: “Stop page motion while you read.”, “For people made uncomfortable by page motion…”, and “Try it with sample data”. The 390 px view keeps the action fully visible and labels the install path “Install on desktop Chrome or Chromium.” The desktop view uses the product-specific mechanical clamp artwork and industrial controls; it does not resemble a generic SaaS landing page.

## Findings

### Minor

#### F-4-1 — Terms makes an unregistered legal/product promise

- **Quote/location:** Terms → Free software: “The extension is free software under the MIT License. You may inspect, modify, and redistribute it under that license.”
- **Why this is a finding:** a visitor can rely on this as a licensing and redistribution promise. `.factory/claims.json` has no `license`/`MIT` entry, and no `@claim:` test checks that the distributed extension and its licensing terms remain under MIT. The existing `LICENSE` file supports the statement, but the factory contract requires every visitor-facing claim to be explicitly listed and tested.
- **Concrete fix:** add a `mit-license` claim that names Terms and README/License as applicable, with a tagged static test asserting the shipped `LICENSE` is MIT and that the Terms copy exactly matches it; or remove the Free software section and keep only the existing license link.

## Demo, storage, and privacy verification

From a fresh context, the hero action redirected in one click to `/demo/?demo=1`. The first demo screen already showed a used sample page: a sticky sample navigation bar, autoplay marker, moving sample, and the interactive Stable mode controls. The persistent banner said “Demo — sample data, nothing is saved.” and exposed **Reset demo** and **Start for real**.

I enabled Stable mode, reset it, and exited it. Demo state used only `demo:calm-scroll:sample`; Reset removed that key; the exit removed it too. The clean-context tagged test proves the same behavior at both viewports. The live request log for landing → demo → Stable mode → reset contained only `https://calm-scroll.sociobot.in` requests. The live offline test waited for active service-worker control, reloaded `/demo/` offline, and operated Stable mode successfully.

## Claims and clean-clone verification

Fresh clone used: `/tmp/calm-scroll-review-4-oeHnU5`. `npm ci` completed with zero reported vulnerabilities. Every command listed in `.factory/claims.json` was run independently:

| Claim | Result |
| --- | --- |
| `demo-isolation` | pass, desktop and 390 px |
| `demo-responsive` | pass, desktop and 390 px |
| `sample-motion-controls` | pass, desktop and 390 px |
| `sample-exceptions` | pass, desktop and 390 px |
| `local-settings` | pass on desktop Chromium; phone skipped because unpacked extensions are desktop-only |
| `extension-desktop-chromium` | pass on desktop Chromium; phone skipped because unpacked extensions are desktop-only |
| `private-first-load` | pass, desktop and 390 px |
| `offline-demo` | pass, desktop and 390 px |
| `health-boundary` | pass, desktop and 390 px |

`npm test` passed in the clean clone (22 Vitest tests and the full 44-test Playwright run, with only the expected desktop-extension skips). `npm run build` passed and produced `dist/site/` and `dist/extension/chrome-mv3/`. The built extension ZIP checksum was `bb331214c05faf071b74096e2c6acc3a8526f9821be0cf97661cc2d9bc513531`.

`EXPECTED_RELEASE_SHA=7d73f2fd4523c913bb640a78ee6ea6de06279e7c npm run test:live` also passed. It verified the deployed release identity, response headers, immutable assets, ZIP checksum, both viewports, Axe serious/critical findings, same-origin requests, demo isolation/reset, Back focus, HTTP 404, and offline demo operation.

## Copy audit

Counts treat a hyphenated term and a URL as one word. Headings, controls, and navigation are included because a cold visitor relies on them. No landing or README text exceeds 22 words. No banned marketing adjective, unexplained jargon, mood heading, inconsistent core term, or non-result-naming action was found. Canonical terms remain **Stable mode**, **demo**, **site setting**, **extension ZIP**, and **motion**.

### Landing page

| Words | Text | Result |
| ---: | --- | --- |
| 4 | Skip to main content |
| 2 | Calm Scroll |
| 1 | Demo |
| 1 | Install |
| 1 | Privacy |
| 5 | Browser extension for motion-sensitive readers |
| 6 | Stop page motion while you read. |
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | `sample-motion-controls` |
| 5 | Try it with sample data |
| 6 | Install on desktop Chrome or Chromium |
| 7 | The demo fits phone and desktop screens. | `demo-responsive` |
| 8 | The extension installs on desktop Chrome or Chromium. | `extension-desktop-chromium` |
| 6 | Extension settings stay in this browser. | `local-settings` |
| 9 | Calm Scroll reports motion before you choose a change. | `sample-motion-controls` |
| 3 | Local per-site settings | `local-settings` |
| 5 | Stable mode turns off again | `sample-exceptions` |
| 3 | Not medical treatment | `health-boundary` |
| 7 | See what is moving on each site. |
| 10 | Use the sample to see the motion Calm Scroll can inspect. |
| 3 | Inspect the page |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | `sample-motion-controls` |
| 4 | Turn on Stable mode |
| 9 | One switch pauses media and stops detected page motion. | `sample-motion-controls` |
| 6 | It also watches for later motion. | `sample-motion-controls` |
| 3 | Keep needed controls |
| 11 | Allow media or keep sticky layers when a site needs them. | `sample-exceptions` |
| 8 | Turn Stable mode off to restore the page. | `sample-exceptions` |
| 5 | Try the motion controls first. |
| 10 | Use the sample page to inspect and change real moving elements. |
| 3 | Open sample demo |
| 5 | Install the extension on desktop. |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chrome’s Developer mode. |
| 3 | Download and unzip |
| 8 | Save the extension ZIP on your desktop computer. |
| 3 | Open extensions |
| 7 | Visit chrome://extensions and turn on Developer mode. |
| 3 | Load the folder |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. |
| 3 | Download extension ZIP |
| 5 | Technical: verify the download checksum |
| 3 | Know the limits. |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | `health-boundary` |
| 13 | If a site breaks, turn Stable mode off or keep the control it needs. |
| 5 | Local controls for page motion. |
| 1 | Terms |
| 15 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). |

### README

| Words | Text | Result |
| ---: | --- | --- |
| 2 | Calm Scroll |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | motion/exception claims |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/?demo=1. | `demo-isolation` |
| 7 | It fits phone and desktop screens. | `demo-responsive` |
| 8 | Install the extension on desktop Chrome or Chromium. | `extension-desktop-chromium` |
| 4 | What it does |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | `sample-motion-controls` |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | `sample-exceptions` |
| 8 | Saves extension choices in browser-local extension storage. | `local-settings` |
| 10 | Exports or imports site settings as a local JSON file. | `local-settings` |
| 8 | Calm Scroll is not a medical device or treatment. | `health-boundary` |
| 3 | Run and verify |
| 6 | Node.js 22+ and npm are required. |
| 12 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. |
| 10 | The desktop install ZIP is in dist/site/downloads/. |
| 8 | Each public claim is listed in .factory/claims.json. | maintainer instruction |
| 14 | Run one claim with its listed command or run all checks with npm test. | maintainer instruction |
| 9 | After one online visit, the sample demo reloads offline. | `offline-demo` |
| 7 | Install on desktop Chrome or Chromium |
| 10 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. |
| 9 | Open chrome://extensions and turn on Developer mode. |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. |
| 3 | Privacy and deployment |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | `private-first-load` |
| 6 | See the deployed Privacy and Terms pages. |
| 7 | Deploy dist/site/ as a static site. | maintainer instruction |
| 10 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | maintainer instruction |
| 1 | License |
| 4 | MIT. See LICENSE. | repository notice; see F-4-1 for the broader Terms promise |

## Structure, links, accessibility, and scope

- Home, Demo, Privacy, Terms, and 404 each had one `h1`, one `main`, `lang="en"`, route-specific title/description/canonical/OG/Twitter metadata, favicon, touch icon, and matching theme color.
- Titles follow the route pattern: `Calm Scroll — Stop page motion while you read`, `Demo — Calm Scroll`, `Privacy — Calm Scroll`, `Terms — Calm Scroll`, and `Page not found — Calm Scroll`.
- Headers consistently expose **Demo / Install / Privacy**; footers expose **Demo / Privacy / Terms**, the product line, Param Factory attribution, version, and visibly labeled external provenance.
- Crawl of every landing/legal/404 link returned 200 or an explicit download: internal routes, demo entry, ZIP/checksum, Privacy/Terms, source repository, and provenance record.
- A made-up live URL returned the designed HTTP 404, “That page was not found.”, with a working home action.
- Internal route changes and browser Back focused the destination `h1` and announced it. Live checks found no console/page errors, no 390 px horizontal overflow, and no serious or critical Axe findings.
- The product already supplies the valuable implied import/export capability. An AI feature would not improve the core local, low-motion task and would add unnecessary data handling; no missing-AI finding applies.

## Earlier-review history

Read in full: `review-1.md`, `review-2.md`, `review-3.md`, `polish-1.md`, `polish-2.md`, `polish-3.md`, all verification records, and the previous handoff. The following confirms current live behavior and current code/test coverage rather than accepting prior status labels.

| Earlier finding IDs | Current verification | Result |
| --- | --- | --- |
| F-1-1, F-1-2, F-1-42 | Cold mobile and desktop hero names the job/audience, offers the phone-safe demo first, and limits install to desktop with concrete steps. | fixed |
| F-1-3, F-1-12 | `/demo/?demo=1`, banner, reset, exit, and isolated `demo:` key observed; `@claim:demo-isolation` passed. | fixed |
| F-1-4 | Nine registry entries each have one matching tagged test; all exact commands passed from the fresh clone. | fixed |
| F-1-5, F-1-16–F-1-19, F-1-29, F-1-32–F-1-33, F-1-43–F-1-44, F-1-59–F-1-60 | No checkout, paid tier, Supporter, billing, token, refund, merchant, or funding promise remains in live copy/source. | fixed |
| F-1-6; F-2-1 | Made-up live route returned styled HTTP 404; no navigation fallback is configured. | fixed |
| F-1-7–F-1-11, F-1-20, F-1-22–F-1-25, F-1-41, F-1-62 | Seeded report, exact motion categories, switch behavior, later motion, exceptions, and restoration were observed and passed the two tagged sample tests. | fixed |
| F-1-13–F-1-15, F-1-38–F-1-40, F-1-47–F-1-49, F-1-56–F-1-58, F-1-64–F-1-68 | Current landing/README audit has direct headings, canonical terms, no banned jargon/lore, no broad reader/ad-blocker/health outcome promise, and no sentence over 22 words. | fixed |
| F-1-21, F-1-26–F-1-28, F-1-31, F-1-45, F-1-54–F-1-55, F-1-69; F-2-3 | README uses Stable mode; clean desktop extension flow exported, cleared, imported, reapplied rules with no remote request; ZIP wording/install instructions are consistent. | fixed |
| F-1-30, F-1-46, F-1-61; F-2-5–F-2-12; F-3-2–F-3-3 | Privacy wording now matches registered local/offline claims, the README is listed for isolation, and the non-medical boundary is present on home and Terms. | fixed |
| F-1-34–F-1-37, F-1-50–F-1-53, F-1-63; F-2-13–F-2-14 | Clean build outputs documented paths; metadata/shell/provenance are complete; live route and Back focus/announcement behavior passed. | fixed |
| F-1-70; F-3-1; CTRL-3-1 | The stale store sentence is absent. The live offline demo passed after explicit service-worker activation/control, including Stable mode from cached JavaScript. | fixed |
| F-2-2, F-2-4 | Header stayed visible and keyboard reachable at 390 px; demo controls fit at 390 px and desktop without overflow. | fixed |

No historical finding regressed. F-4-1 is a newly identified claims-registry gap in existing Terms copy.

## What would make this perfect

Register and test the MIT/free-software Terms promise, or remove that promise. Then rerun the exact new claim command, the full clean-clone suite, and the live verifier. With that single gap closed, this review would have zero findings.
