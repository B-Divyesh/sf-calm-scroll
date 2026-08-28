# Calm Scroll

Calm Scroll is a browser extension for people who find page motion uncomfortable.
It reports common page motion and offers a reversible Stable mode per site.

Try the isolated sample at <https://calm-scroll.sociobot.in/demo/>. The demo works on any device. Install the extension on desktop Chrome or Chromium.

## What it does

- Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling.
- Applies Stable mode with optional media and sticky-layer exceptions.
- Saves extension choices in browser-local extension storage.
- Exports or imports site settings as a local JSON file.

Calm Scroll is not a reader mode, ad blocker, medical device, or treatment.

## Run and verify

Node.js 22+ and npm are required.

```bash
npm ci
npx playwright install chromium
npm test
npm run build
```

`npm run build` creates `dist/site/` and the unpacked extension in `dist/extension/chrome-mv3/`. The desktop install ZIP is in `dist/site/downloads/`.

Each public claim is listed in `.factory/claims.json`. Run one claim with its listed command or run all checks with `npm test`.

## Install on desktop Chrome or Chromium

1. Build the project and unzip `dist/site/downloads/calm-scroll-chrome-v1.0.0.zip`.
2. Open `chrome://extensions` and turn on Developer mode.
3. Choose **Load unpacked**, select the unzipped folder, and pin Calm Scroll.

## Privacy and deployment

The site has no analytics, remote font, or runtime CDN scripts. See the deployed [Privacy](https://calm-scroll.sociobot.in/privacy/) and [Terms](https://calm-scroll.sociobot.in/terms/) pages.

Deploy `dist/site/` as a static site. `public/staticwebapp.config.json` supplies the static-host headers and styled 404 response.

## License

MIT. See [LICENSE](./LICENSE).
