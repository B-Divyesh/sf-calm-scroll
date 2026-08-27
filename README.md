# Calm Scroll

Calm Scroll is a local-first browser extension for people who find parallax, autoplay, animated scrolling, sticky motion, and other page movement uncomfortable. One switch creates a stable reading mode; a plain motion report and per-site exceptions keep the intervention visible and reversible.

It is a page-motion utility, not a reader mode, ad blocker, medical device, or treatment. Comfort outcomes are personal and user-reported.

## What v1 does

- Detects autoplay media, CSS animation/transition, transforms, fixed/sticky layers, and smooth scrolling.
- Stops animations and smooth scrolling, pauses autoplay without removing media controls, releases sticky layers, and freezes transformed offenders.
- Watches for motion added after initial page load.
- Reports motion counts in the popup.
- Stores Stable mode, “allow media,” and “keep fixed/sticky layers” choices per hostname in browser-local storage.
- Leaves keyboard focus and native media controls available.
- Handles restricted browser pages with a clear, retryable error state.

The optional $12 Supporter edition funds maintenance and unlocks a printable motion-testing field guide. Every extension motion-control and accessibility feature remains free.

## Stack and layout

- WXT + TypeScript, Chrome Manifest V3 extension
- Vite + vanilla TypeScript static landing site
- Vitest for unit/contract tests
- Playwright + axe-core for real-browser, 390px, extension lifecycle, console, and accessibility checks

Key paths:

- `entrypoints/` — MV3 content script, popup, and local service worker
- `src/core/` — motion scan and per-site rule logic
- `site/` — landing, privacy, terms, Supporter field guide, and license flow
- `assets/src/` — original generated hero source and prompt metadata
- `.factory/design.md` — product-specific visual system and asset provenance
- `dist/site/` — static deployment root after build
- `dist/extension/chrome-mv3/` — unpacked extension build

## Develop and verify

Requires Node.js 22+ and npm.

```bash
npm install
npm run dev          # WXT extension development
npm run dev:site     # landing site at the printed local URL
npm test             # unit + Chromium + axe + 390px + unpacked-extension tests
npm run build        # clean reproducible build
npm run check        # typecheck, test, and build
```

`npm run build:site` is also standalone: it builds the extension, writes the static site to `dist/site/`, and places the installable zip at `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip`.

Playwright downloads its pinned Chromium on first setup if the browser is not already installed:

```bash
npx playwright install chromium
```

## Install the extension build

1. Run `npm run build` and unzip `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip`.
2. Open `chrome://extensions`, turn on Developer mode, and choose **Load unpacked**.
3. Select the unzipped directory and pin Calm Scroll.
4. Open an ordinary `http` or `https` page, select the extension, inspect its motion count, and turn on Stable mode.

Chrome internal pages and browser stores do not allow content-script changes. The popup explains this rather than silently failing.

## Privacy and billing

There is no analytics, tracking, remote font, or runtime CDN. The extension stores only per-hostname settings locally; it does not send browsing history, page text, scan results, or form data anywhere. See the shipped [`/privacy`](https://calm-scroll.sociobot.in/privacy/) and [`/terms`](https://calm-scroll.sociobot.in/terms/) pages.

Supporter checkout and license verification use only the Sociobot billing API. The checkout URL is slug-based—no provider or product ID is embedded. A returned or pasted token is stored as `sb_license:calm-scroll`, stripped from the URL, verified no more than daily, and never blocks the free experience while offline.

## Deployment

Deploy `dist/site/` as the static root. Its `index.html` is at that root; legal pages, immutable hashed CSS/JS, a small offline service worker, sitemap, robots file, responsive images, and extension download are included. Infrastructure, DNS, billing registration, and store publication are intentionally outside this repository.

## License

MIT. See [LICENSE](./LICENSE).
