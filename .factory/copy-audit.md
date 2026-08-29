# Copy audit — polish round 2

Counts treat hyphenated terms and URLs as one word. Controls and headings are included because visitors rely on them. No retained sentence exceeds 22 words. No banned marketing term remains.

## Landing page

| Words | Text | Result |
| ---: | --- | --- |
| 5 | Browser extension for motion-sensitive readers | Pass |
| 6 | Stop page motion while you read. | Pass |
| 17 | For people made uncomfortable by page motion, Calm Scroll pauses autoplay, animation, smooth scrolling, and sticky effects. | Pass |
| 5 | Try it with sample data | Pass |
| 6 | Install on desktop Chrome or Chromium | Pass |
| 7 | The demo fits phone and desktop screens. | Pass; `demo-responsive` |
| 8 | The extension installs on desktop Chrome or Chromium. | Pass; `extension-desktop-chromium` |
| 6 | Extension settings stay in this browser. | Pass; `local-settings` |
| 9 | Calm Scroll reports motion before you choose a change. | Pass; `sample-motion-controls` |
| 3 | Local per-site settings | Pass; `local-settings` |
| 6 | Stable mode turns off again | Pass; `sample-exceptions` |
| 3 | Not medical treatment | Pass; `health-boundary` |
| 7 | See what is moving on each site. | Pass |
| 10 | Use the sample to see the motion Calm Scroll can inspect. | Pass |
| 3 | Inspect the page | Pass |
| 12 | See counts for autoplay media, animations, transforms, sticky layers, and smooth scrolling. | Pass; `sample-motion-controls` |
| 4 | Turn on Stable mode | Pass |
| 9 | One switch pauses media and stops detected page motion. | Pass; `sample-motion-controls` |
| 6 | It also watches for later motion. | Pass; `sample-motion-controls` |
| 3 | Keep needed controls | Pass |
| 11 | Allow media or keep sticky layers when a site needs them. | Pass; `sample-exceptions` |
| 8 | Turn Stable mode off to restore the page. | Pass; `sample-exceptions` |
| 5 | Try the motion controls first. | Pass |
| 10 | Use the sample page to inspect and change real moving elements. | Pass |
| 3 | Open sample demo | Pass |
| 5 | Install the extension on desktop. | Pass |
| 9 | The Chrome Web Store listing is not available yet. | Pass |
| 15 | Download the extension ZIP, unzip it, then load its folder in desktop Chrome’s Developer mode. | Pass |
| 8 | Save the extension ZIP on your desktop computer. | Pass |
| 7 | Visit chrome://extensions and turn on Developer mode. | Pass |
| 11 | Choose Load unpacked, select the unzipped folder, then pin Calm Scroll. | Pass |
| 3 | Download extension ZIP | Pass |
| 5 | Technical: verify the download checksum | Pass |
| 3 | Know the limits. | Pass |
| 14 | Calm Scroll is not a medical device and does not promise a health outcome. | Pass; `health-boundary` |
| 13 | If a site breaks, turn Stable mode off or keep the control it needs. | Pass |
| 5 | Local controls for page motion. | Pass |
| 15 | Built by Param Factory · v1.0.0 · Original illustration provenance in the source record (opens external site). | Pass |

## README

| Words | Text | Result |
| ---: | --- | --- |
| 13 | Calm Scroll is a browser extension for people who find page motion uncomfortable. | Pass |
| 13 | It reports common page motion and offers a reversible Stable mode per site. | Pass; motion claims |
| 6 | Try the isolated sample at https://calm-scroll.sociobot.in/?demo=1. | Pass |
| 7 | It fits phone and desktop screens. | Pass; `demo-responsive` |
| 8 | Install the extension on desktop Chrome or Chromium. | Pass; `extension-desktop-chromium` |
| 10 | Reports autoplay media, animations, transforms, sticky layers, and smooth scrolling. | Pass; `sample-motion-controls` |
| 9 | Applies Stable mode with optional media and sticky-layer exceptions. | Pass; `sample-exceptions` |
| 8 | Saves extension choices in browser-local extension storage. | Pass; `local-settings` |
| 10 | Exports or imports site settings as a local JSON file. | Pass; `local-settings` |
| 8 | Calm Scroll is not a medical device or treatment. | Pass; `health-boundary` |
| 6 | Node.js 22+ and npm are required. | Pass |
| 12 | npm run build creates dist/site/ and the unpacked extension in dist/extension/chrome-mv3/. | Pass |
| 10 | The desktop install ZIP is in dist/site/downloads/. | Pass |
| 8 | Each public claim is listed in .factory/claims.json. | Pass |
| 14 | Run one claim with its listed command or run all checks with npm test. | Pass |
| 9 | After one online visit, the sample demo reloads offline. | Pass; `offline-demo` |
| 10 | Build the project and unzip dist/site/downloads/calm-scroll-chrome-v1.0.0.zip. | Pass |
| 9 | Open chrome://extensions and turn on Developer mode. | Pass |
| 11 | Choose Load unpacked, select the unzipped folder, and pin Calm Scroll. | Pass |
| 11 | The site has no analytics, remote font, or runtime CDN scripts. | Pass; `private-first-load` |
| 6 | See the deployed Privacy and Terms pages. | Pass |
| 7 | Deploy dist/site/ as a static site. | Pass |
| 10 | public/staticwebapp.config.json supplies the static-host headers and styled 404 response. | Pass |
| 4 | MIT. See LICENSE. | Pass |

## Terminology

| Concept | One term |
| --- | --- |
| Main change | Stable mode |
| Saved choice | site setting |
| Browser sample | demo |
| Installable archive | extension ZIP |
| Moving page item | motion |

Removed terms: motion budget, intervention, offender, live specimen, reader-mode/ad-blocker promise, developer-install shorthand, and Supporter-edition marketing.
