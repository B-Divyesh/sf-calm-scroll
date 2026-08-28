# Adversarial first-read review 1 — Calm Scroll

**Verdict: FAIL**

Reviewed 28 August 2026 at <https://calm-scroll.sociobot.in/> in fresh Chromium contexts at 390×844 and 1440×900. The live `release.json` identifies source commit `4f03685d319c2ea8dfb2f5d9992432928729381e`. There are 70 findings: 6 blocking, 47 unlisted-claim findings, and 17 other findings. A pass requires zero.

## First 30 seconds

Before scrolling, my answers were:

- **What it does:** apparently a Chrome extension that stops autoplay, parallax, animated scrolling, and sticky motion.
- **For whom:** not stated. The screen says “the page you came to read,” but never names people who experience vestibular discomfort or screen-induced motion sickness.
- **What to click first:** “Download for Chrome.” On a phone, that downloads an extension ZIP that mobile Chrome cannot install.

The exact copy that failed the audience test was “Put restless web pages on hold.” followed by “Calm Scroll freezes parallax, autoplay, animated scrolling, and sticky motion—without rewriting the page you came to read.” The first is metaphorical; neither names the intended reader. This is blocking under the first-screen rule.

## Findings

### Blocking

#### F-1-1 — The first screen does not say who the product is for

- **Location/quote:** landing h1, “Put restless web pages on hold.”; lede, “Calm Scroll freezes parallax, autoplay, animated scrolling, and sticky motion—without rewriting the page you came to read.”
- **Why this fails:** a cold visitor can infer the mechanism but not whether it is for ordinary distraction, accessibility, or motion-triggered discomfort. The metaphorical h1 does not name the job in the visitor’s words.
- **Fix:** use h1 “Stop page motion while you read.” Follow with “For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects.”

#### F-1-2 — The phone’s primary action cannot produce the advertised result

- **Location/quote:** 390 px first screen, “Download v1” and “Download for Chrome.”
- **Why this fails:** both actions download an unpacked Manifest V3 ZIP. Chrome on Android and iOS cannot install it, and the first screen does not say “desktop.” A phone visitor has no usable first action.
- **Fix:** label the desktop requirement beside the CTA. On mobile, replace the primary action with “Copy desktop install link” and state “Install on desktop Chrome or Chromium.” Keep a one-click browser demo available on every device.

#### F-1-3 — There is no demo, and the supposed demo URL uses real storage

- **Location/evidence:** no “Try it with sample data” action exists. `/demo` and `/?demo=1` both render the landing page. There is no demo banner, realistic used state, Reset demo, Start for real, or `.factory/demo.md`.
- **Sandbox failure:** opening `/?demo=1&license=review-sample-token` wrote the real keys `sb_license:calm-scroll` and `sb_license:calm-scroll:verdict`, then requested `https://api.sociobot.in/api/v1/products/calm-scroll/verify?...`. There is no `demo:` namespace.
- **Why this fails:** the product cannot be tried in one click, and a verifier using the documented demo convention can mutate normal site storage and make a live API request.
- **Fix:** add a first-screen “Try it with sample data” link to `/demo`. Show a real sample page with autoplay, animation, transform, and sticky elements plus the actual extension controls already reporting them. Add the persistent banner “Demo — sample data, nothing is saved,” Reset demo, and Start for real. Isolate all demo state under `demo:` keys or memory, prevent billing/API calls, test reset and real-data isolation, and document it in `.factory/demo.md`.

#### F-1-4 — The required claim registry is absent

- **Location/evidence:** `.factory/claims.json` does not exist. Therefore there were zero declared claim commands to run and no `@claim:<id>` coverage. `npm test` passing does not make the visitor-facing claims registered or fully tested.
- **Why this fails:** every product, privacy, pricing, offline, and reproducibility statement is untracked; the review cannot establish that every claim has exactly one sandbox test.
- **Fix:** add `.factory/claims.json`, one entry per claim below, with an observable clean-sandbox test. Remove claims that cannot be tested.

#### F-1-5 — The paid checkout link is dead

- **Location/quote:** landing button “Buy Supporter edition,” linking to `https://api.sociobot.in/api/v1/products/calm-scroll/checkout`.
- **Evidence:** a followed GET returned HTTP 404 on 28 August 2026.
- **Why this fails:** the site advertises a $12 purchase but the purchase path ends at an error.
- **Fix:** point the button at a working Sociobot hosted checkout route and add a live link test that follows the redirect to a 200 checkout page without creating a charge.

#### F-1-6 — Unknown routes impersonate the home page instead of returning a designed 404

- **Location/evidence:** `/this-route-does-not-exist` returned HTTP 200 with the home title, h1, and body. There is no `404.html` or 404 response override.
- **Why this fails:** visitors cannot tell that a link is invalid, crawlers see false success, and the required styled recovery route is absent.
- **Fix:** add a Calm Scroll-styled 404 page with a home action and configure `responseOverrides.404.rewrite` to `/404.html`.

### Unlisted claims

Every row is a separate unlisted-claim finding. Each fix is to add the quoted claim to `.factory/claims.json` with the stated sandbox assertion, or delete/rewrite the claim. Related duplicate wording may share one claim entry only when its `where` field names every occurrence.

| ID | Exact quote and location | Concrete test/fix |
| --- | --- | --- |
| F-1-7 | Landing: “Calm Scroll freezes parallax, autoplay, animated scrolling, and sticky motion—without rewriting the page you came to read.” | In `/demo`, assert all four motion types stop and page text/structure remain. |
| F-1-8 | Landing: “Calm Scroll checks the page in front of you and shows what it found before you decide.” | Seed known motion elements and assert the report’s categories and counts before enabling Stable mode. |
| F-1-9 | Landing: “See plain counts for autoplay media, animated elements, transforms, sticky layers, and smooth scrolling.” | Assert exact per-category counts against the sample fixture. |
| F-1-10 | Landing: “One switch pauses autoplay and disables motion, including effects added after the page first loads.” | Enable once, add a late animated node, and assert media and both initial/late motion stop. |
| F-1-11 | Landing: “Allow media or keep sticky navigation on the sites that need them.” | Toggle each exception and assert only the selected behavior remains. |
| F-1-12 | Landing: “Each choice stays on this device.” | Reload in the same profile, then inspect extension storage and the request log for no remote persistence. |
| F-1-13 | Landing: “The page remains ordinary HTML.” | Compare DOM nodes/content before and after Stable mode; define what “ordinary” means or replace this vague claim. |
| F-1-14 | Landing: “Keyboard focus and media controls remain available.” | Run keyboard-only focus and native media-control assertions after stabilization. |
| F-1-15 | Landing: “The zip contains only the reproducible extension build.” | Inspect archive entries against an allowlist and reproduce the checksum from two clean builds. |
| F-1-16 | Landing: “Every motion-control and per-site feature is free.” / “All core extension features remain free.” | Exercise every listed control without a license and assert no paywall. |
| F-1-17 | Landing: “A one-time Supporter edition adds a printable site-testing field guide and a supporter mark here—nothing you need for safer reading is paywalled.” | Use a fixture license; assert exact unlocks and that all safety controls remain usable without it. |
| F-1-18 | Landing: “Secure hosted checkout.” / “Sociobot / Dodo is the merchant of record and handles refunds.” | Verify the working hosted origin and response policy; either test refund handling through a fixture or remove the refund claim. |
| F-1-19 | Landing: “The token is stored only in this browser.” | Restore a fixture token and assert browser-only storage plus only the disclosed verification request. |
| F-1-20 | Landing: “It gives you direct, reversible control over common page motion.” | Enable and disable Stable mode; assert original computed behavior is restored. |
| F-1-21 | README: “One switch creates a stable reading mode; a plain motion report and per-site exceptions keep the intervention visible and reversible.” | Test single-switch activation, report visibility, per-site exceptions, and reversal. Replace “intervention.” |
| F-1-22 | README: “Detects autoplay media, CSS animation/transition, transforms, fixed/sticky layers, and smooth scrolling.” | Assert detection of each category in a clean fixture. |
| F-1-23 | README: “Stops animations and smooth scrolling, pauses autoplay without removing media controls, releases sticky layers, and freezes transformed offenders.” | Assert each observable result and preserved controls; replace “offenders” with “moving elements.” |
| F-1-24 | README: “Watches for motion added after initial page load.” | Append motion after load and assert it is detected and stopped. |
| F-1-25 | README: “Reports motion counts in the popup.” | Assert exact seeded counts, not merely that count elements exist. |
| F-1-26 | README: “Stores Stable mode, ‘allow media,’ and ‘keep fixed/sticky layers’ choices per hostname in browser-local storage.” | Assert the exact hostname-scoped schema and no cross-host leakage. |
| F-1-27 | README: “Leaves keyboard focus and native media controls available.” | Assert focus identity and native control operation after stabilization. |
| F-1-28 | README: “Handles restricted browser pages with a clear, retryable error state.” | Open a restricted-page fixture/state, assert the full error, and retry successfully on a permitted page. |
| F-1-29 | README: “The optional $12 Supporter edition funds maintenance and unlocks a printable motion-testing field guide.” / “Every extension motion-control and accessibility feature remains free.” | Test the $12 checkout display, fixture-license unlock, and unlicensed access to every extension control. |
| F-1-30 | README: “There is no analytics, tracking, remote font, or runtime CDN.” | Record the complete landing and extension demo flow and assert only documented same-origin resources plus explicit billing on user action. |
| F-1-31 | README: “The extension stores only per-hostname settings locally; it does not send browsing history, page text, scan results, or form data anywhere.” | Inspect extension storage and request bodies/URLs through the full demo flow with sentinel private values. |
| F-1-32 | README: “Supporter checkout and license verification use only the Sociobot billing API.” / “The checkout URL is slug-based—no provider or product ID is embedded.” | Assert request origins and inspect the final checkout/verification URLs. |
| F-1-33 | README: “A returned or pasted token is stored as `sb_license:calm-scroll`, stripped from the URL, verified no more than daily, and never blocks the free experience while offline.” | Use a fake clock and fixture response; assert key, URL removal, 24-hour call limit, and offline free controls. |
| F-1-34 | README: “`npm run build:site` … places the installable zip plus its SHA-256 sidecar … It also writes `dist/site/release.json`, which records the exact Git commit and archive checksum used for the deployment.” | Run from a clean clone and assert all paths, commit, and checksum. Split the 44-word sentence. |
| F-1-35 | README: “`npm run test:package` runs three clean builds and fails unless the ZIP bytes and lexical central-directory order are identical; it also verifies that the release identity names the current commit and ZIP checksum.” | Register the reproducibility command as a claim test and split the 34-word sentence. |
| F-1-36 | README: “After deployment, `npm run test:live` verifies the CSP, Permissions-Policy, immutable asset/download caching, service-worker revalidation, release identity, and the published ZIP checksum.” | Register the live test or remove this from product claims; split the 30-word sentence. |
| F-1-37 | README: “Its committed `staticwebapp.config.json` sets a restrictive same-origin CSP … one-year immutable caching … and revalidation for HTML/service-worker entry points.” | Assert each response header and cache duration; split the 36-word sentence. |
| F-1-38 | Landing/README: “Free core controls,” “No account,” “Local settings,” and “Calm Scroll is a local-first browser extension …” | Test unlicensed first use, absence of account flow, local storage, and request destinations. |
| F-1-56 | Landing: “Not a reader mode,” “Not an ad blocker,” and “Not medical treatment.” | Define these boundaries in observable terms and assert the extension does not hide page content or advertising and makes no treatment UI claim. |
| F-1-57 | Landing: “Generic reduced-motion preferences are easy for sites to ignore.” | Test representative fixtures that ignore `prefers-reduced-motion`, or replace the general assertion with “Some sites do not follow your reduced-motion setting.” |
| F-1-58 | Landing: “Until the store listing is approved, Chrome labels this a developer install.” | Verify the current store-publication state and the actual Chrome install label, or date and qualify the statement. |
| F-1-59 | Landing/README: “$12 USD · once” / “The optional $12 Supporter edition…” | Assert the displayed and hosted-checkout currency, amount, and one-time billing model. |
| F-1-60 | Landing: “Funds compatibility updates.” | This use-of-funds promise is not product-testable; publish an accountable funding policy or remove it. |
| F-1-61 | Landing: “Calm Scroll is not a medical device and does not promise to prevent nausea.” | Keep this necessary boundary, but register a copy assertion so no build replaces it with a clinical claim. |
| F-1-62 | Landing: “If a site breaks, turn stable mode off for that site or keep the controls it needs.” | Use a fixture that needs media/sticky behavior and assert disable/exception controls restore it. |
| F-1-63 | Landing: “Hero illustration generated for this product with the Factory image model. No people or source artwork used.” | Link the provenance record and assert the shipped asset hash matches it; otherwise remove the unverifiable footer claim. |
| F-1-64 | README: “Calm Scroll is a local-first browser extension for people who find … page movement uncomfortable.” | Test browser-local behavior and keep the audience portion as positioning, not an efficacy claim. |
| F-1-65 | README: “It is a page-motion utility, not a reader mode, ad blocker, medical device, or treatment.” | Add a contract test for retained page content and no ad-specific or clinical behavior. |
| F-1-66 | README: “Comfort outcomes are personal and user-reported.” | Link to the described pilot evidence or rewrite as a limitation: “Calm Scroll does not claim a health outcome.” |
| F-1-67 | README: “Playwright + axe-core for real-browser, 390px, extension lifecycle, console, and accessibility checks.” | Assert these jobs/configurations exist and run, or move the inventory to contributor-only documentation. |
| F-1-68 | README: “Playwright downloads its pinned Chromium on first setup if the browser is not already installed.” | Correct this: the observed setup required the explicit `npx playwright install chromium` command already shown below it. |
| F-1-69 | README: “Chrome internal pages and browser stores do not allow content-script changes. The popup explains this rather than silently failing.” | Run a restricted-page test that asserts both the browser restriction and exact recovery message. |
| F-1-70 | README: “Legal pages, a small offline service worker, sitemap, robots file, responsive images, and extension download are included.” | Assert every named artifact and an offline response from the service worker. |

### Copy, terminology, and controls

#### F-1-39 — Decorative first-screen lore and slogans carry no usable information

- **Quotes:** “Utility 01,” “Motion belongs under your control,” and “Figure A.”
- **Why this fails:** these labels could appear on a different product and do not name the job or section.
- **Fix:** delete “Utility 01” and “Figure A.” Replace the kicker with “Browser extension for motion-sensitive readers.” Replace the caption with “Calm Scroll reports detected motion before stopping it.”

#### F-1-40 — “A visible motion budget for every site” is jargon, not a section name

- **Location:** landing “How it works” section.
- **Why this fails:** “motion budget” is undefined and sounds like a quota rather than a detector report.
- **Fix:** use “See what is moving on each site.” Rewrite “Generic reduced-motion preferences are easy for sites to ignore” as “Some sites do not follow your reduced-motion setting.”

#### F-1-41 — The static mock-up is mislabeled as live and uses a mood heading

- **Quotes:** “Live interface specimen” and “No mystery switch.”
- **Why this fails:** the specimen has no controls and cannot be used. “Live” is misleading; the heading does not name the content.
- **Fix:** until it is interactive, label it “Example motion report” and use “See what Stable mode changed.” The preferred fix is to make this the real `/demo` UI.

#### F-1-42 — Installation copy assumes technical knowledge

- **Quotes:** “Chrome labels this a developer install,” “reproducible extension build,” “Manifest V3,” and “View this package’s SHA-256 checksum.”
- **Why this fails:** “developer install,” MV3, reproducibility, and SHA-256 are not explained to the affected reader performing an unusual install.
- **Fix:** use two sentences: “The Chrome Web Store listing is not available yet. Download the ZIP, unzip it, then load the folder in desktop Chrome’s Developer mode.” Put “Verify the download checksum” in a secondary technical-details disclosure.

#### F-1-43 — Supporter copy has a non-section heading and one overlong sentence

- **Quotes:** heading “Keep the controls free. Support the maintenance.”; 23-word sentence “A one-time Supporter edition adds a printable site-testing field guide and a supporter mark here—nothing you need for safer reading is paywalled.”
- **Why this fails:** the heading omits the product/tier and price. The sentence crosses the 22-word hard cap.
- **Fix:** heading “Supporter edition: $12 once.” Body: “Supporter edition adds a printable site-testing field guide and a Supporter badge. Every motion-control feature remains free.”

#### F-1-44 — “Secure hosted checkout” is an unsupported marketing adjective

- **Location:** beneath “Buy Supporter edition.”
- **Why this fails:** “secure” is not quantified or registered, and the linked checkout currently returns 404.
- **Fix:** after repairing the link, use “Checkout opens on Sociobot, the merchant of record.”

#### F-1-45 — Three buttons do not consistently name the result

- **Quotes:** header “Download v1,” install “Get the extension zip,” and form button “Restore.”
- **Why this fails:** “v1” and “Restore” omit the object; “Get” differs from “Download” for the same action.
- **Fix:** use “Download extension ZIP” for both downloads and “Restore license” for the form button and its error copy.

#### F-1-46 — The limitations heading is a slogan

- **Quotes:** “Honest boundary” and “Comfort is personal. Control should not be.”
- **Why this fails:** neither phrase names the section when heard out of context.
- **Fix:** use “Limits of Stable mode.” Keep the concrete medical disclaimer and site-breakage instructions below it.

#### F-1-47 — Product terms change between surfaces

- **Locations:** landing “Stable mode,” README “stable reading mode”; landing “supporter mark,” README “supporter marker”; landing/README “zip,” “ZIP,” “package,” and “extension build” for the same download.
- **Why this fails:** readers cannot be sure these are the same mode, entitlement, or file.
- **Fix:** standardize on “Stable mode,” “Supporter badge,” and “extension ZIP.” Use “package” only when discussing checksum internals.

#### F-1-48 — Five README sentences exceed 22 words

- **Location:** README build/deploy documentation; counts 44, 34, 30, 28, and 36 in the audit below.
- **Why this fails:** each sentence carries multiple independent ideas and exceeds the hard cap.
- **Fix:** split each at the clauses shown in the claim table. For the token sentence, use: “A returned or pasted token is stored as `sb_license:calm-scroll` and removed from the URL. Verification runs at most once per day. Offline use never blocks the free extension.”

#### F-1-49 — README uses avoidable internal jargon

- **Quotes:** “intervention,” “transformed offenders,” “browser-local storage,” “lexical central-directory order,” and “revalidation for HTML/service-worker entry points.”
- **Why this fails:** the product and privacy descriptions mix user documentation with implementation language.
- **Fix:** use “change,” “moving elements,” and “the browser’s extension storage” in user-facing sections. Move archive ordering and cache-revalidation details to a “Release verification” subsection for maintainers.

### Structure and navigation

#### F-1-50 — Required canonical, social, and touch metadata is incomplete

- **Evidence:** every inspected route lacks a canonical link and Apple touch icon. Home has no `og:image` or Twitter card metadata. Privacy and Terms have no Open Graph metadata. Supporter additionally has no meta description.
- **Why this fails:** shared links have no product image and duplicate/fallback URLs are not identified.
- **Fix:** add per-route canonical URLs, Open Graph title/description and a real 1200×630 Calm Scroll image, Twitter card metadata, an SVG favicon, and a 180 px Apple touch icon. Add a plain supporter description.

#### F-1-51 — Header and footer content is inconsistent across routes

- **Evidence:** the home header exposes section links and download; legal/supporter headers expose only a sibling legal link or Back home. Home footer has a one-liner/source/provenance; legal/supporter footers have only the wordmark and Privacy/Terms. No footer shows “Built by Param Factory” and a version/build id as required.
- **Why this fails:** navigation and release identity disappear when a visitor follows a legal or supporter link.
- **Fix:** use one shared header (wordmark, Demo, Install, Privacy) and one shared footer (product one-liner, Privacy, Terms, “Built by Param Factory,” version/build id) on every route.

#### F-1-52 — Navigation does not move focus or announce the destination

- **Location/code:** home uses hash links and static pages; there is no route-focus handler or route announcement region. Clicking “How it works” changes the fragment/scroll only.
- **Why this fails:** keyboard and screen-reader visitors are not placed at the new section/page heading as required.
- **Fix:** on internal route or section navigation, focus the destination heading with `tabindex="-1"` and announce its title through a dedicated `aria-live="polite"` region. Add an end-to-end back/forward focus test.

#### F-1-53 — External links are not identified as external

- **Locations:** “Source” and “Buy Supporter edition.”
- **Why this fails:** both leave the product origin without saying so.
- **Fix:** append visible “(opens external site)” text or an accessible external-link label. Do not rely on an icon alone.

### Missed leverage

#### F-1-54 — Site preferences cannot be backed up or moved

- **Location:** extension settings are stored per hostname only in one browser profile.
- **Why this matters:** the brief expects users to keep Stable mode on at least five sites. A normal user changing profiles or computers loses every exception, while cloud sync would conflict with the local-first promise.
- **Fix:** add “Export site settings” and “Import site settings” as a local JSON file, with schema validation, an explicit overwrite/merge choice, and tests proving no network request. AI would not improve the core job and is not indicated here.

### Minor documentation gap

#### F-1-55 — README does not give a demo URL or a direct production install link

- **Location:** README install section.
- **Why this fails:** a visitor must build locally before trying the artifact, and verifiers have no standard sandbox entry point.
- **Fix:** after implementing the demo, add `https://calm-scroll.sociobot.in/demo` and the live extension ZIP URL, clearly labeling the ZIP as a desktop developer install.

## Copy audit

Counts treat a hyphenated term as one word and ignore punctuation/symbols. The landing audit includes headings, controls, factual fragments, hidden unlock copy, and runtime status/error sentences because visitors can encounter all of them. Flags refer to findings above. Only the five README rows and one landing row marked `>22` breach the hard cap.

### Landing page and runtime copy

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 2 | Calm Scroll | — |
| 3 | How it works | — |
| 2 | Supporter edition | — |
| 2 | Download v1 | F-1-45 |
| 2 | Utility 01 | F-1-39 |
| 5 | Motion belongs under your control | F-1-39 |
| 6 | Put restless web pages on hold. | F-1-1, F-1-39 |
| 18 | Calm Scroll freezes parallax, autoplay, animated scrolling, and sticky motion—without rewriting the page you came to read. | F-1-1, F-1-7 |
| 3 | Download for Chrome | F-1-2 |
| 3 | See 3-step install | — |
| 3 | Free core controls | F-1-16, F-1-38 |
| 3 | Chrome / Chromium MV3 | F-1-42 |
| 2 | No account | F-1-38 |
| 2 | Local settings | F-1-38, F-1-49 |
| 2 | Figure A | F-1-39 |
| 7 | Motion is inspected, then held—not hidden. | F-1-39 |
| 4 | Not a reader mode | — |
| 4 | Not an ad blocker | — |
| 3 | Not medical treatment | — |
| 4 | Your page, held still | F-1-39 |
| 2 | CS / 02 | F-1-39 |
| 7 | A visible motion budget for every site. | F-1-40 |
| 9 | Generic reduced-motion preferences are easy for sites to ignore. | F-1-40 |
| 17 | Calm Scroll checks the page in front of you and shows what it found before you decide. | F-1-8 |
| 3 | Inspect the page | — |
| 14 | See plain counts for autoplay media, animated elements, transforms, sticky layers, and smooth scrolling. | F-1-9 |
| 3 | Hold it steady | F-1-39 |
| 15 | One switch pauses autoplay and disables motion, including effects added after the page first loads. | F-1-10 |
| 3 | Keep useful controls | — |
| 12 | Allow media or keep sticky navigation on the sites that need them. | F-1-11 |
| 6 | Each choice stays on this device. | F-1-12 |
| 3 | Live interface specimen | F-1-41 |
| 3 | No mystery switch. | F-1-41 |
| 3 | Stable mode / on | F-1-47 |
| 2 | Motion found | — |
| 1 | 07 | — |
| 3 | on example.page | — |
| 2 | Autoplay media | — |
| 1 | 1 | — |
| 2 | Animations / transitions | — |
| 1 | 3 | — |
| 2 | Moving transforms | — |
| 1 | 2 | — |
| 3 | Fixed / sticky layers | — |
| 1 | 1 | — |
| 3 | Held still now | — |
| 5 | The page remains ordinary HTML. | F-1-13 |
| 7 | Keyboard focus and media controls remain available. | F-1-14 |
| 2 | CS / 03 | F-1-39 |
| 6 | Install the pilot in three steps. | — |
| 12 | Until the store listing is approved, Chrome labels this a developer install. | F-1-42 |
| 8 | The zip contains only the reproducible extension build. | F-1-15, F-1-42, F-1-47 |
| 3 | Download and unzip | — |
| 8 | Save Calm Scroll v1 somewhere you will keep. | — |
| 2 | Open extensions | — |
| 8 | Visit chrome://extensions and switch on Developer mode. | F-1-42 |
| 2 | Load unpacked | F-1-42 |
| 8 | Choose the unzipped folder, then pin Calm Scroll. | — |
| 4 | Get the extension zip | F-1-45, F-1-47 |
| 4 | Version 1.0.0 | — |
| 2 | Manifest V3 | F-1-42 |
| 5 | View this package’s SHA-256 checksum | F-1-42, F-1-47 |
| 3 | Optional / one time | — |
| 4 | Keep the controls free. | F-1-43 |
| 3 | Support the maintenance. | F-1-43 |
| 7 | Every motion-control and per-site feature is free. | F-1-16 |
| 23 | A one-time Supporter edition adds a printable site-testing field guide and a supporter mark here—nothing you need for safer reading is paywalled. | **>22; F-1-17, F-1-43, F-1-47** |
| 3 | $12 USD · once | — |
| 6 | All core extension features remain free | F-1-16 |
| 4 | Printable motion-testing field guide | — |
| 3 | Funds compatibility updates | F-1-17 |
| 3 | Buy Supporter edition | F-1-5, F-1-53 |
| 3 | Secure hosted checkout. | F-1-18, F-1-44 |
| 10 | Sociobot / Dodo is the merchant of record and handles refunds. | F-1-18 |
| 2 | Already purchased? | F-1-45 |
| 4 | Paste your license token | — |
| 1 | Restore | F-1-45 |
| 8 | The token is stored only in this browser. | F-1-19 |
| 3 | No license stored. | — |
| 7 | The free extension is ready to use. | — |
| 3 | Supporter edition active | — |
| 5 | Open the printable field guide | — |
| 2 | Honest boundary | F-1-46 |
| 3 | Comfort is personal. | F-1-46 |
| 4 | Control should not be. | F-1-46 |
| 14 | Calm Scroll is not a medical device and does not promise to prevent nausea. | — |
| 10 | It gives you direct, reversible control over common page motion. | F-1-20 |
| 17 | If a site breaks, turn stable mode off for that site or keep the controls it needs. | F-1-47 |
| 6 | A local-first utility from Param Factory. | F-1-38, F-1-49 |
| 1 | Privacy | — |
| 1 | Terms | — |
| 1 | Source | F-1-53 |
| 11 | Hero illustration generated for this product with the Factory image model. | — |
| 6 | No people or source artwork used. | — |
| 3 | Supporter license active. | — |
| 6 | This license is no longer active. | — |
| 4 | Checking the stored license… | — |
| 1 | Offline. | — |
| 6 | Using the last saved license status. | — |
| 4 | License no longer active. | — |
| 6 | Check the token or purchase again. | — |
| 5 | License check is temporarily unavailable. | — |
| 9 | The free extension still works; try again when online. | — |
| 10 | Paste the license token from your receipt, then choose Restore. | F-1-45 |

### README copy

| Words | Exact copy | Flag |
| ---: | --- | --- |
| 2 | Calm Scroll | — |
| 22 | Calm Scroll is a local-first browser extension for people who find parallax, autoplay, animated scrolling, sticky motion, and other page movement uncomfortable. | F-1-38, F-1-49 |
| 20 | One switch creates a stable reading mode; a plain motion report and per-site exceptions keep the intervention visible and reversible. | F-1-21, F-1-47, F-1-49 |
| 15 | It is a page-motion utility, not a reader mode, ad blocker, medical device, or treatment. | F-1-49 |
| 6 | Comfort outcomes are personal and user-reported. | — |
| 3 | What v1 does | — |
| 13 | Detects autoplay media, CSS animation/transition, transforms, fixed/sticky layers, and smooth scrolling. | F-1-22 |
| 18 | Stops animations and smooth scrolling, pauses autoplay without removing media controls, releases sticky layers, and freezes transformed offenders. | F-1-23, F-1-49 |
| 8 | Watches for motion added after initial page load. | F-1-24 |
| 6 | Reports motion counts in the popup. | F-1-25 |
| 16 | Stores Stable mode, “allow media,” and “keep fixed/sticky layers” choices per hostname in browser-local storage. | F-1-26, F-1-49 |
| 8 | Leaves keyboard focus and native media controls available. | F-1-27 |
| 10 | Handles restricted browser pages with a clear, retryable error state. | F-1-28 |
| 14 | The optional $12 Supporter edition funds maintenance and unlocks a printable motion-testing field guide. | F-1-29 |
| 8 | Every extension motion-control and accessibility feature remains free. | F-1-29 |
| 3 | Stack and layout | — |
| 6 | WXT + TypeScript, Chrome Manifest V3 extension | — |
| 6 | Vite + vanilla TypeScript static landing site | — |
| 5 | Vitest for unit/contract tests | — |
| 11 | Playwright + axe-core for real-browser, 390px, extension lifecycle, console, and accessibility checks | — |
| 2 | Key paths: | — |
| 9 | `entrypoints/` — MV3 content script, popup, and local service worker | — |
| 8 | `src/core/` — motion scan and per-site rule logic | — |
| 10 | `site/` — landing, privacy, terms, Supporter field guide, and license flow | — |
| 9 | `assets/src/` — original generated hero source and prompt metadata | — |
| 9 | `.factory/design.md` — product-specific visual system and asset provenance | — |
| 7 | `dist/site/` — static deployment root after build | — |
| 6 | `dist/extension/chrome-mv3/` — unpacked extension build | — |
| 3 | Develop and verify | — |
| 6 | Requires Node.js 22+ and npm. | — |
| 44 | `npm run build:site` is also standalone: it builds the extension, writes the static site to `dist/site/`, and places the installable zip plus its SHA-256 sidecar at `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip` and `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip.sha256`. | **>22; F-1-34, F-1-48** |
| 20 | It also writes `dist/site/release.json`, which records the exact Git commit and archive checksum used for the deployment. | F-1-34 |
| 34 | `npm run test:package` runs three clean builds and fails unless the ZIP bytes and lexical central-directory order are identical; it also verifies that the release identity names the current commit and ZIP checksum. | **>22; F-1-35, F-1-48, F-1-49** |
| 30 | After deployment, `npm run test:live` verifies the CSP, Permissions-Policy, immutable asset/download caching, service-worker revalidation, release identity, and the published ZIP checksum (set `LIVE_URL` to target another environment). | **>22; F-1-36, F-1-48, F-1-49** |
| 11 | Set `EXPECTED_RELEASE_SHA` to require an exact deployed commit match. | — |
| 15 | Playwright downloads its pinned Chromium on first setup if the browser is not already installed: | — |
| 4 | Install the extension build | — |
| 13 | Run `npm run build` and unzip `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip`. | — |
| 11 | Open `chrome://extensions`, turn on Developer mode, and choose Load unpacked. | — |
| 8 | Select the unzipped directory and pin Calm Scroll. | — |
| 19 | Open an ordinary `http` or `https` page, select the extension, inspect its motion count, and turn on Stable mode. | — |
| 11 | Chrome internal pages and browser stores do not allow content-script changes. | — |
| 8 | The popup explains this rather than silently failing. | F-1-28 |
| 3 | Privacy and billing | — |
| 10 | There is no analytics, tracking, remote font, or runtime CDN. | F-1-30 |
| 21 | The extension stores only per-hostname settings locally; it does not send browsing history, page text, scan results, or form data anywhere. | F-1-31 |
| 7 | See the shipped `/privacy` and `/terms` pages. | — |
| 11 | Supporter checkout and license verification use only the Sociobot billing API. | F-1-32 |
| 12 | The checkout URL is slug-based—no provider or product ID is embedded. | F-1-32 |
| 28 | A returned or pasted token is stored as `sb_license:calm-scroll`, stripped from the URL, verified no more than daily, and never blocks the free experience while offline. | **>22; F-1-33, F-1-48** |
| 1 | Deployment | — |
| 7 | Deploy `dist/site/` as the static root. | — |
| 36 | Its committed `staticwebapp.config.json` sets a restrictive same-origin CSP (with only the Sociobot verification API in `connect-src`), a restrictive Permissions-Policy, one-year immutable caching for `/assets/*` and versioned downloads, and revalidation for HTML/service-worker entry points. | **>22; F-1-37, F-1-48, F-1-49** |
| 17 | Legal pages, a small offline service worker, sitemap, robots file, responsive images, and extension download are included. | — |
| 12 | Infrastructure, DNS, billing registration, and store publication are intentionally outside this repository. | — |
| 1 | License | — |
| 1 | MIT. | — |
| 2 | See LICENSE. | — |

## Demo, storage, privacy, and offline evidence

- Fresh home contexts made only same-origin requests for HTML, JS, CSS, and the hero image; local storage stayed empty.
- The absent demo mode is not isolated: the `?demo=1&license=...` check wrote normal license keys and contacted the live Sociobot API, as documented in F-1-3.
- A fresh unpacked-extension profile used a locally fulfilled motion fixture. The full request log contained only the fixture document and `chrome-extension://` popup assets. Enabling Stable mode wrote only `siteRules.127.0.0.1` to `chrome.storage.local`; animation became `none`. This confirms the tested flow did not transmit page data, but the claim remains unlisted under F-1-31.
- After one online load and service-worker activation, a fresh context reloaded the home page offline with status 200, correct title, and h1. This observed result is not a substitute for a registered claim test.

## Claims execution

`.factory/claims.json` is missing, so the declared-claim result is **0 listed / 0 run / every claim above untested in the required registry**. This is not a pass. As a broader check, a clean local clone at `/tmp/calm-review-XKHnNE` completed `npm ci && npm test`: 14 Vitest tests passed; Playwright reported 15 passed and one expected mobile extension skip. The Playwright web server also completed the production build. None of those tests is tagged `@claim:*`.

## History verification

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files, so there are no prior finding IDs to recheck. The earlier `.factory/handoff.md` claimed a PASS for commit `4f03685`; the live release still identifies that commit. Its listed baseline checks were sampled again: landing console errors were zero, axe-core found zero violations at 390 px and desktop, offline reload worked, and release identity matched. That handoff did not test the mandatory demo/claims contract, crawl checkout, or request an unknown route; its “No defects found” conclusion is superseded by this review.

## Structure and accessibility checks

- `/`, `/privacy/`, `/terms/`, and `/supporter/` return 200 with one h1, `lang="en"`, a main landmark, visible focus styling, and no serious/critical axe violations. The landing title follows the required product—job pattern and is under 60 characters.
- `/privacy/` and `/terms/` have route-specific titles and descriptions. `/supporter/` has a route title but no description.
- The SVG favicon, robots file, sitemap, security headers, reduced-motion CSS, responsive 390 px layout, and distinct neo-brutalist Calm Scroll visual identity are present. The design is not a generic SaaS card/gradient template.
- The full discovered-link crawl returned 200 for home/hash routes, extension ZIP/checksum, Privacy, Terms, Supporter, and GitHub Source. The checkout link alone returned 404.
- The factory `verify-url.sh` returned 200, no console errors, title/lang/one h1/main, no missing image alt, and no unlabeled button. Direct axe-core Playwright checks found zero violations at 390×844 and 1440×900. These passes do not offset the findings.

## What would make this perfect

Resolve all 70 findings: lead with the concrete accessibility job and audience; offer a real isolated one-click demo; register and test every retained claim; repair checkout and 404 handling; simplify and standardize the copy; complete route metadata, focus, header, and footer behavior; add local settings import/export; then rerun the full clean-context, clean-clone, request-log, crawl, accessibility, and claim suite. “Perfect” here means that rerun produces zero findings and no untested claim.
