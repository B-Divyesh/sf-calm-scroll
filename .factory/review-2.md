# Adversarial first-read review 2 — Calm Scroll

**Verdict: FAIL.** Reviewed 29 August 2026 at <https://calm-scroll.sociobot.in/> from fresh Chromium contexts at 390 × 844 and 1440 × 900. The live `release.json` identifies source commit `d126df1323e0ded5d2e0c77b7229b9d517b0e8f5`.

Two prior findings are not actually closed on the live product: an unknown URL still serves the home page, and route chrome is neither consistent nor usable as navigation at 390 px. The registered local-settings claim also has no test of the claimed extension behavior. The sample itself is strong and usable, but the required zero-finding standard is not met.

## First 30 seconds

Before scrolling, on both phone and desktop:

- **What it does:** a browser extension that stops moving page effects while someone reads.
- **For whom:** people made uncomfortable by page motion.
- **What to click first:** “Try it with sample data,” which opens an interactive sample usable on a phone.

This part passes. The first screen states the job, audience, and safe first action without relying on the visitor knowing how to install a desktop extension. The visual system is distinct and product-specific: the clamp illustration, hard rules, yellow stop control, and industrial-control-panel layout support the page-motion job rather than resembling a generic SaaS template.

## Findings

### Blocking

#### F-2-1 — Unknown routes still impersonate the landing page (reopens F-1-6)

- **Location/evidence:** cold `GET https://calm-scroll.sociobot.in/does-not-exist` returned HTTP 200. Its title was “Calm Scroll — Stop page motion while you read,” its sole h1 was “Stop page motion while you read.”, and its canonical was the home URL. The designed `/404.html` exists, but is never reached for an unknown address.
- **Why this fails:** a visitor following a bad link receives a convincing but wrong page instead of an error and recovery path. This is the exact earlier finding that was marked fixed but is still live.
- **Cause in code:** `public/staticwebapp.config.json` has `navigationFallback.rewrite: "/index.html"`; it catches the missing route before the 404 response override can apply.
- **Concrete fix:** remove the unnecessary SPA navigation fallback for this multi-page site (or exclude every real and unknown-route case so a true 404 reaches `responseOverrides.404`). Deploy it, then add a live test that requests an invented path and asserts a 404 response plus “That page was not found.”

#### F-2-2 — The header is inconsistent and hidden on the phone (reopens F-1-51)

- **Location/evidence:** at 390 px the rendered top header contains only “Calm Scroll”; all header navigation is hidden by `site/src/style.css:344`, `.site-header nav a:not(.nav-download) { display: none; }`. There is no replacement menu. On desktop the header also changes between routes: home has “Demo / Install / Privacy”, demo has “Home / Privacy”, privacy has “Demo / Install / Terms”, and terms has “Demo / Install / Privacy”.
- **Why this fails:** a phone visitor must scroll to the footer to reach Privacy or Terms, and route navigation does not provide a stable mental model. The previous review required the same product header/footer content on every route; this is not that fix.
- **Concrete fix:** retain a visible, keyboard-operable compact menu at 390 px and use the same nav set and order on home, demo, privacy, terms, and 404 (for example: Demo, Install, Privacy). Add a 390 px test that tabs to each header link and route-shell assertions that compare the nav labels on all routes.

#### F-2-3 — The `local-settings` claim is not tested by its tagged claim test

- **Location/quote:** `.factory/claims.json`: “Extension site settings stay in browser-local storage and can be exported or imported as a local JSON file.” The only tagged test is `tests/e2e/claims.spec.ts:40`, “@claim:local-settings has no demo network path and uses local data”.
- **Why this fails:** the test opens only `/demo/`, writes `localStorage['demo:calm-scroll:sample']`, and checks its request origin. It never loads the extension, inspects extension storage, exports a JSON file, imports it, or asserts that imported settings take effect. A green test therefore does not prove the visitor-facing claim.
- **Concrete fix:** replace the tagged test with one clean unpacked-extension flow: set a site rule, export it, parse the downloaded JSON, clear extension storage, import that file, reload the fixture, and assert the rule is restored; record all requests and assert none leave the browser. Keep the test under exactly `@claim:local-settings`.

### Claim-registry findings

Each sentence below is visitor-reliant copy without a matching claim entry whose `where` names that occurrence. The registry must either list the occurrence and an observable test, or the sentence must be removed/reduced to a non-claim instruction.

#### F-2-4 — Device-compatibility promise is unlisted

- **Quote/location:** landing hero: “The demo works on any device.”
- **Why this fails:** a phone visitor can rely on it, but no entry names this claim or tests a phone demo flow.
- **Concrete fix:** add a `demo-any-device` claim and a 390 px clean-context test that follows the hero action, uses Stable mode, and resets the demo; list the landing and README locations.

#### F-2-5 — Account-free promise is unlisted

- **Quote/location:** landing hero: “No account.”
- **Why this fails:** the sentence promises an account-free use path but has no registry entry.
- **Concrete fix:** add an `account-free-demo` claim asserting the demo action completes without an auth request, login form, or account storage, or remove the sentence.

#### F-2-6 — Landing storage promise is not listed at its published location

- **Quote/location:** landing hero: “Settings stay in your browser.”
- **Why this fails:** `local-settings` names only “Privacy and extension popup” in `where`, not this landing occurrence; its test is also inadequate (F-2-3).
- **Concrete fix:** after replacing that test, add “landing hero, Privacy, README, extension popup” to the claim’s `where` field.

#### F-2-7 — The reduced-motion compatibility statement is unlisted

- **Quote/location:** landing “See what is moving on each site.” section: “Some sites do not follow your reduced-motion setting.”
- **Why this fails:** this factual statement motivates installing the product, but there is no fixture or claim entry for it.
- **Concrete fix:** either add a fixture that ignores `prefers-reduced-motion` and proves the extension detects its motion, or replace it with the non-factual instruction “Use the sample to see the motion Calm Scroll can inspect.”

#### F-2-8 — Product-boundary claims are unlisted

- **Quote/location:** landing truth strip: “Not a reader mode or ad blocker.”
- **Why this fails:** the health-boundary entry covers only medical wording; it does not name or test these two product boundaries.
- **Concrete fix:** add a `product-boundaries` claim with a fixture proving Stable mode does not remove article content or target advertisements, and list this landing occurrence; otherwise remove the strip.

#### F-2-9 — README’s core behavior promise is not listed at its published location

- **Quote/location:** README introduction: “It reports common page motion and offers a reversible Stable mode per site.”
- **Why this fails:** the sample-motion and sample-exceptions entries omit README from `where`.
- **Concrete fix:** add README to both relevant `where` fields and have their tagged tests assert the report, enablement, and reversal in the seeded sample.

#### F-2-10 — README’s demo-device promise is unlisted

- **Quote/location:** README introduction: “The demo works on any device.”
- **Why this fails:** it repeats F-2-4 with no matching registry location.
- **Concrete fix:** include README in the proposed `demo-any-device` entry and use the same mobile clean-context test.

#### F-2-11 — README’s extension-install compatibility promise is unlisted

- **Quote/location:** README introduction: “Install the extension on desktop Chrome or Chromium.”
- **Why this fails:** the product makes a browser/platform compatibility claim without a registry entry.
- **Concrete fix:** add an `extension-desktop-chromium` claim with a clean unpacked-extension Chromium smoke test and list the landing and README occurrences.

#### F-2-12 — README feature list is absent from the listed claim locations

- **Quote/location:** README “What it does”: “Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling.”; “Applies Stable mode with optional media and sticky-layer exceptions.”; “Saves extension choices in browser-local extension storage.”; “Exports or imports site settings as a local JSON file.”
- **Why this fails:** the behavior claims are not listed in `where` for `sample-motion-controls`, `sample-exceptions`, or `local-settings`; the final two are also not proved by the present local-settings test.
- **Concrete fix:** add README to each relevant `where`, make the motion fixture assert report values and exceptions, and implement the extension export/import test specified in F-2-3.

### Other findings

#### F-2-13 — Direct route changes leave focus on the document body

- **Location/evidence:** in a fresh 390 px context, following the visible Demo link to `/demo/` resulted in `document.activeElement === document.body`; Back likewise left focus on `body`. The new route’s h1 was present but never focused or announced. Hash navigation has a focus handler, but full-page route navigation does not.
- **Why this fails:** keyboard and screen-reader users do not receive the required route-change destination. This is separate from the repaired hash-link case in F-1-52.
- **Concrete fix:** use a small shared route script that focuses the route h1 on document navigation (without stealing focus from a same-document fragment/skip link) and updates an `aria-live="polite"` announcement. Add a browser test for header navigation and browser Back.

#### F-2-14 — Legal, demo, and 404 routes have incomplete social metadata; 404 lacks canonical metadata

- **Location/evidence:** live `/demo/`, `/privacy/`, and `/terms/` each contain only `twitter:card`, not `twitter:title`, `twitter:description`, or `twitter:image`. `/404.html` lacks canonical, Open Graph, Twitter, and apple-touch metadata entirely.
- **Why this fails:** these routes do not meet the stated per-route title/description/canonical/OG/Twitter metadata contract, and a shared legal/demo link can produce incomplete previews.
- **Concrete fix:** add canonical, OG title/description/image, Twitter title/description/image, and the touch icon to every static route, including 404; extend `tests/documents.test.ts` to inspect each generated page.

## Demo, privacy, and claim evidence

- The landing action opens `/demo/` in one click. Its first screen already contains a realistic moving sample, motion report, Stable mode control, and the persistent “Demo — sample data, nothing is saved.” banner.
- In a fresh live context, enabling Stable mode stored only `demo:calm-scroll:sample`; animation, transform, sticky positioning, autoplay sample, and a later animation changed as advertised. Reset demo removed that key and returned focus to the Stable mode control. No console errors occurred.
- The live demo request log contained only the product origin: HTML, local JS, local CSS, and the module-preload script. No third-party request was observed.
- A clean clone at `d126df1323e0ded5d2e0c77b7229b9d517b0e8f5` passed every command in `.factory/claims.json`: `demo-isolation`, `sample-motion-controls`, `sample-exceptions`, `local-settings`, `private-first-load`, `offline-demo`, and `health-boundary` (two viewport projects each). `npm test` also passed 31 tests with one expected mobile-extension skip, and `npm run build` produced `dist/`.
- Passing command status does not close F-2-3: the asserted observable behavior for `local-settings` does not match its registered wording.

## History verification

Read: `.factory/review-1.md`, `.factory/polish-1.md`, `.factory/verification.md`, `.factory/verification-2.md`, `.factory/verification-3.md`, and the prior handoff.

- **Actually confirmed:** F-1-1 through F-1-5, F-1-7 through F-1-50, F-1-52 through F-1-55, and F-1-56 through F-1-70 have evidence in the live site/code sufficient for this review, subject to the new registry-location and local-settings-test findings above. The hero, device-independent demo, clear desktop label, removal of the dead checkout, local import/export implementation, mobile layout, local assets, legal pages, and visual identity all remain present.
- **Not confirmed / regressed:** F-1-6 is F-2-1; F-1-51 is F-2-2. F-1-52 was fixed for same-document section links only; F-2-13 records the still-missing route-change behavior required by the current checklist.

## Structure checks

Home, demo, privacy, terms, and the direct `/404.html` page each have one h1, a main landmark, readable titles, no console errors, local assets, visible focus styling, and working internal/external links. The link crawl returned 200 for all navigable links and downloads. `robots.txt`, `sitemap.xml`, favicon, service worker, CSP, referrer policy, and cache policies are live. The exact missing-route check is nevertheless blocking (F-2-1). No AI feature is expected by the brief; an AI addition would be decorative rather than useful. Local JSON import/export supplies the meaningful portability feature implied by the brief.

## Copy audit

Counts treat a hyphenated term and a URL as one word. Repeated rendered strings are marked with their occurrence count. Code commands are not sentences; all other visitor-facing landing and README text is included.

### Landing page

| Words | Text | Flag |
| ---: | --- | --- |
| 4 | Skip to main content | — |
| 2 × 2 | Calm Scroll | — |
| 1 × 2 | Demo | — |
| 1 | Install | — |
| 1 × 2 | Privacy | — |
| 5 | Browser extension for motion-sensitive readers | — |
| 6 | Stop page motion while you read. | — |
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | — |
| 5 | Try it with sample data | — |
| 6 | Install on desktop Chrome or Chromium | — |
| 6 | The demo works on any device. | F-2-4 |
| 8 | The extension installs on desktop Chrome or Chromium. | F-2-11 |
| 2 | No account. | F-2-5 |
| 5 | Settings stay in your browser. | F-2-6 |
| 9 | Calm Scroll reports motion before you choose a change. | — |
| 3 | Local per-site settings | F-2-6 |
| 6 | Not a reader mode or ad blocker | F-2-8 |
| 3 | Not medical treatment | — |
| 7 | See what is moving on each site. | — |
| 8 | Some sites do not follow your reduced-motion setting. | F-2-7 |
| 8 | Calm Scroll makes the page’s moving parts visible first. | — |
| 3 | Inspect the page | — |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | — |
| 4 | Turn on Stable mode | — |
| 9 | One switch pauses media and stops detected page motion. | — |
| 6 | It also watches for later motion. | — |
| 3 | Keep needed controls | — |
| 11 | Allow media or keep sticky layers when a site needs them. | — |
| 8 | Turn Stable mode off to restore the page. | — |
| 5 | Try the motion controls first. | — |
| 10 | Use the sample page to inspect and change real moving elements. | — |
| 3 | Open sample demo | — |
| 5 | Install the extension on desktop. | — |
| 9 | The Chrome Web Store listing is not available yet. | — |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chrome’s Developer mode. | — |
| 3 | Download and unzip | — |
| 8 | Save the extension ZIP on your desktop computer. | — |
| 2 | Open extensions | — |
| 7 | Visit chrome://extensions and turn on Developer mode. | — |
| 3 | Load the folder | — |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. | — |
| 3 | Download extension ZIP | — |
| 5 | Technical: verify the download checksum | — |
| 3 | Know the limits. | — |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | — |
| 13 | If a site breaks, turn Stable mode off or keep the control it needs. | — |
| 5 | Local controls for page motion. | — |
| 1 | Terms | — |
| 15 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). | — |

### README

| Words | Text | Flag |
| ---: | --- | --- |
| 2 | Calm Scroll | — |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. | — |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | F-2-9 |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/demo/. | — |
| 6 | The demo works on any device. | F-2-10 |
| 8 | Install the extension on desktop Chrome or Chromium. | F-2-11 |
| 4 | What it does | — |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | F-2-12 |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | F-2-12 |
| 8 | Saves extension choices in browser-local extension storage. | F-2-12 |
| 10 | Exports or imports site settings as a local JSON file. | F-2-12 |
| 11 | Calm Scroll is not a reader mode, ad blocker, medical device, or treatment. | F-2-8 |
| 3 | Run and verify | — |
| 6 | Node.js 22+ and npm are required. | — |
| 12 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. | — |
| 10 | The desktop install ZIP is in dist/site/downloads/. | — |
| 8 | Each public claim is listed in .factory/claims.json. | — |
| 14 | Run one claim with its listed command or run all checks with npm test. | — |
| 7 | Install on desktop Chrome or Chromium | — |
| 10 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. | — |
| 9 | Open chrome://extensions and turn on Developer mode. | — |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. | — |
| 3 | Privacy and deployment | — |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | — |
| 6 | See the deployed Privacy and Terms pages. | — |
| 7 | Deploy dist/site/ as a static site. | — |
| 10 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | F-2-1 |
| 1 | License | — |
| 4 | MIT. See LICENSE. | — |

## What would make this perfect

Ship a real unknown-route 404, make one compact but complete header work at 390 px and consistently on every route, and bring every published behavioral/privacy/platform statement into a claim registry whose tagged test proves the exact statement. Then re-run the cold live checks. The core demo and visual treatment already provide a solid first-use experience; these remaining contract failures prevent a PASS.
