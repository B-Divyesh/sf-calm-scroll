# Adversarial first-read review 7 — Calm Scroll

**Verdict: PASS**

Reviewed 29 August 2026 against <https://calm-scroll.sociobot.in/> in fresh
Chromium contexts at 390 × 844 and 1440 × 900. The live release identity is
`be4d3014175c979938fcce59f75f6c6afa9fd550`; the reviewed checkout is
`9ced26256cd0b8cd325b7129cfb67d26add56a8a`, which changes documentation
only. There are zero findings and no untested registered claims.

## First 30 seconds

Before scrolling, at both widths:

- **What it does:** A browser extension that stops common page motion while I
  read.
- **For whom:** People made uncomfortable by page motion.
- **What to click first:** **Try it with sample data**. It is usable on the
  phone and opens an already-stabilized sample; installation is separately and
  accurately labeled for desktop Chromium.

The first screen gives these answers directly in “Stop page motion while you
read.”, “For people made uncomfortable by page motion, Calm Scroll pauses
autoplay, animation, smooth scrolling, and sticky effects.”, and “Try it with
sample data”. The product-specific cut-paper clamp artwork, hard rules, yellow
controls, and blue stable-state banner form a distinct motion-control identity,
not a generic SaaS layout.

## Copy audit

The table records every visitor-facing landing and README sentence, heading,
and action. Navigation labels are short route names rather than sentences.
Hyphenated terms and URLs count as one word. No text is over 22 words, uses a
banned marketing term, relies on a mood/metaphor heading, changes a core term,
or uses a non-result-naming action. Claim locations were matched against
`.factory/claims.json`.

### Landing page

| Words | Text | Check |
| ---: | --- | --- |
| 5 | Browser extension for motion-sensitive readers | Clear audience label |
| 6 | Stop page motion while you read. | Plain job headline |
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | `sample-motion-controls` |
| 5 | Try it with sample data | Result-naming action |
| 4 | Install on desktop Chromium | Accurate install action |
| 7 | The demo fits phone and desktop screens. | `demo-responsive` |
| 6 | The extension installs on desktop Chromium. | `extension-desktop-chromium` |
| 6 | Extension settings stay in this browser. | `local-settings` |
| 9 | Calm Scroll reports motion before you choose a change. | `sample-motion-controls` |
| 3 | Local per-site settings | `local-settings` |
| 5 | Stable mode turns off again | `sample-exceptions` |
| 3 | Not medical treatment | `health-boundary` |
| 7 | See what is moving on each site. | Descriptive section heading |
| 11 | Use the sample to see the motion Calm Scroll can inspect. | Useful instruction |
| 3 | Inspect the page | Descriptive step heading |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | `sample-motion-controls` |
| 4 | Turn on Stable mode | Result-naming step |
| 9 | One switch pauses media and stops detected page motion. | `sample-motion-controls` |
| 6 | It also watches for later motion. | `sample-motion-controls` |
| 3 | Keep needed controls | Descriptive step heading |
| 11 | Allow media or keep sticky layers when a site needs them. | `sample-exceptions` |
| 8 | Turn Stable mode off to restore the page. | `sample-exceptions` |
| 5 | Try the motion controls first. | Descriptive section heading |
| 11 | Use the sample page to inspect and change real moving elements. | Useful instruction |
| 3 | Open sample demo | Result-naming action |
| 6 | Install the extension in desktop Chromium. | Accurate section heading |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chromium’s Developer mode. | Accurate instruction |
| 3 | Download and unzip | Descriptive step heading |
| 8 | Save the extension ZIP on your desktop computer. | Useful instruction |
| 2 | Open extensions | Descriptive step heading |
| 7 | Visit chrome://extensions and turn on Developer mode. | Useful instruction |
| 3 | Load the folder | Descriptive step heading |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. | Useful instruction |
| 3 | Download extension ZIP | Result-naming action |
| 5 | Technical: verify the download checksum | Result-naming action |
| 3 | Know the limits. | Descriptive section heading |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | `health-boundary` |
| 14 | If a site breaks, turn Stable mode off or keep the control it needs. | Clear recovery instruction |
| 5 | Local controls for page motion. | Product description |
| 15 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). | Accurate provenance label |

### README

| Words | Text | Check |
| ---: | --- | --- |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. | Clear audience |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | Motion and exception claims |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/?demo=1. | `demo-isolation` |
| 6 | It fits phone and desktop screens. | `demo-responsive` |
| 6 | Install the extension on desktop Chromium. | `extension-desktop-chromium` |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | `sample-motion-controls` |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | `sample-exceptions` |
| 7 | Saves extension choices in browser-local extension storage. | `local-settings` |
| 10 | Exports or imports site settings as a local JSON file. | `local-settings` |
| 9 | Calm Scroll is not a medical device or treatment. | `health-boundary` |
| 6 | Node.js 22+ and npm are required. | Verified setup requirement |
| 11 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. | Verified clean build |
| 7 | The desktop install ZIP is in dist/site/downloads/. | Verified clean build |
| 7 | Each public claim is listed in .factory/claims.json. | Registry cross-check passed |
| 14 | Run one claim with its listed command or run all checks with npm test. | Both paths verified |
| 9 | After one online visit, the sample demo reloads offline. | `offline-demo` |
| 6 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. | Accurate instruction |
| 7 | Open chrome://extensions and turn on Developer mode. | Accurate instruction |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. | Accurate instruction |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | `private-first-load` |
| 7 | See the deployed Privacy and Terms pages. | Accurate route instruction |
| 6 | Deploy dist/site/ as a static site. | Accurate deployment instruction |
| 9 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | Verified configuration |
| 3 | MIT. See LICENSE. | `mit-license` |

The fenced setup commands are commands, not sentences.

## Demo, privacy, and claims

The first action opened `/demo/?demo=1` in one click. At 390 px the first
viewport already contained the persistent “Demo — sample data, nothing is
saved.” banner, **Reset demo**, **Start for real**, the motion report, the
enabled **Turn off Stable mode** switch, and the start of a realistic local
news article. Desktop showed the report and article together.

With a pre-seeded `real:review-7-sentinel=preserve` local-storage value, the
demo created only `demo:calm-scroll:sample`. Reset and Start for real removed
only the demo value and preserved the real sentinel. Landing → demo → reset →
exit made only same-origin requests and logged no console or page error.
The registered offline flow reloads after service-worker activation and
continues to operate Stable mode. The extension privacy claim attaches request
logging before the fixture or popup opens, seeds page/form/history/scan
sentinels, and passed.

Every registry command was run independently from fresh clone
`/tmp/calm-scroll-review-7-9zsK2V` after `npm ci`:

| Claim | Result |
| --- | --- |
| `demo-isolation` | Pass |
| `demo-responsive` | Pass at desktop and 390 px |
| `sample-motion-controls` | Pass at desktop and 390 px |
| `sample-exceptions` | Pass at desktop and 390 px |
| `local-settings` | Pass in desktop Chromium; phone skip expected |
| `extension-data-private` | Pass in desktop Chromium; phone skip expected |
| `extension-desktop-chromium` | Pass in desktop Chromium; phone skip expected |
| `private-first-load` | Pass at desktop and 390 px |
| `offline-demo` | Pass at desktop and 390 px |
| `health-boundary` | Pass |
| `mit-license` | Pass |

The full clean-clone suite passed: 26 Vitest checks and 62 Playwright checks.
`npm run build` passed. `npm run test:package` produced identical extension
ZIPs across three builds:
`ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.

## Structure, accessibility, links, and scope

- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` have one h1,
  one main landmark, `lang="en"`, route-specific title/description/canonical
  metadata, Open Graph/Twitter metadata, favicon, and Apple touch icon.
- Their titles follow the required pattern. An invented path returned HTTP 404
  with “That page was not found.” and a working home action.
- Header navigation is consistently **Demo / Install / Privacy**; the footer
  consistently exposes **Demo / Privacy / Terms**. Header navigation, browser
  Back, and the install hash moved focus to the destination heading and updated
  the polite announcement.
- Every crawled link returned HTTP 200 or was an explicit hash/download route,
  including the ZIP, checksum, source repository, and provenance record.
- Both light and dark system themes passed Axe serious/critical checks at both
  target widths. Keyboard focus, reduced motion, 44 px targets, alt text,
  contrast, and no horizontal overflow passed. Public routes were
  console-clean. The prior unsupported `web-share` policy is absent.
- The brief implies local control and portability, both supplied by the
  per-site exceptions and real local JSON import/export. An AI gateway would
  add unnecessary page-data handling to a deterministic, local-first job, so
  no AI feature is missing.

## Earlier-review history

Read: every `review-1.md` through `review-6.md`, every `polish-1.md`
through `polish-6.md`, the verification records, and the prior handoff.
Each earlier finding was checked again in live behavior and the current
implementation/tests; the identifiers below are exhaustive.

| Earlier finding IDs | Current confirmation |
| --- | --- |
| F-1-1, F-1-2 | Cold hero names the job and audience; phone-safe demo is first and install is desktop Chromium only. |
| F-1-3, F-1-12 | Query demo, banner, namespace isolation, Reset, and exit preserve real storage. |
| F-1-4 | Eleven registry entries each have one exact tagged observable test. |
| F-1-5, F-1-16–F-1-19, F-1-29, F-1-32–F-1-33, F-1-43–F-1-44, F-1-59–F-1-60 | Paid, checkout, billing, token, merchant, refund, and funding promises remain absent. |
| F-1-6; F-2-1 | A made-up production path returns the designed HTTP 404. |
| F-1-7–F-1-11, F-1-20, F-1-22–F-1-25, F-1-41, F-1-62 | Shared scanner report, five motion types, late motion, exceptions, restoration, realistic sample, and first-viewport control all passed. |
| F-1-13–F-1-15, F-1-38–F-1-40, F-1-47–F-1-49, F-1-56–F-1-58, F-1-64–F-1-68 | Current copy is direct, term-consistent, claim-backed where needed, and has no banned lore/jargon or overlong sentence. |
| F-1-21, F-1-26–F-1-28, F-1-31, F-1-45, F-1-54–F-1-55, F-1-69; F-2-3 | Extension Stable mode, host settings, export/clear/import/reapply, request privacy, download wording, README instructions, and restricted-page recovery are implemented and tested. |
| F-1-30, F-1-46, F-1-61; F-2-5–F-2-12; F-3-2–F-3-3 | Privacy/offline/health wording is narrow, listed, and tested; unsupported copy is absent. |
| F-1-34–F-1-37, F-1-50–F-1-53, F-1-63; F-2-13–F-2-14 | Build paths, reproducibility, metadata, shell, provenance, route focus, Back, and announcements were reconfirmed. |
| F-1-70; F-3-1; CTRL-3-1 | The demo’s activated, controlled offline reload works; stale store wording remains absent. |
| F-2-2, F-2-4 | Complete navigation remains visible/keyboard reachable at 390 px; demo report and control fit the first viewport. |
| F-4-1 | Repository, packaged extension, README, and Terms MIT wording remain aligned. |
| F-5-1 | Both-theme Axe tests passed on all public routes at both widths. |
| F-5-2 | The first demo screen shows an applied result, report, control, and realistic article. |
| F-5-3 | All public browser wording is limited to tested desktop Chromium. |
| F-6-1 | Production `Permissions-Policy` omits `web-share=()`; fresh loads produced no policy warning. |

No earlier finding is unfixed, half-fixed, or regressed.

## What would make this perfect

Nothing actionable surfaced in this review. The current product already
provides the clear cold entry, isolated one-click sample, honest local-first
claims, accessible structure, and durable per-site settings that the brief
calls for.
