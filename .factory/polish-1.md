# Polish round 1 — finding closure

Base reviewed: `fbc22f96cbc88f60f7fd1cb37f7a3a24a28c135e`  
Repair commit: `ccd3ef90e2a76afe175163d2de51fad4f10f1bdd`

## Evidence legend

`C1`–`C7` are the matching `@claim:` tests in `tests/e2e/claims.spec.ts`. `E2E` is `npm test` (16 unit/contract tests and 31 browser tests, one expected mobile extension skip). `Clean` is the same suite plus every claim command from `/tmp/calm-scroll-clean-w2QKEI` after `npm ci`. `Build` is `npm run build`; `Package` is `npm run test:package`.

Screenshots: `test-results/polish-1-home-390.png` (first screen at 390px) and `test-results/polish-1-demo-desktop.png` (interactive demo). The production URL was checked cold after push; it still reported the prior `4f03685` release, so no false live-fix claim is made pending the external static deployment.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Replaced the metaphorical hero with the plain job and named motion-sensitive readers. | E2E home copy test; 390px browser pass |
| F-1-2 | Made the first action the device-independent demo and labeled installation as desktop-only. | E2E home copy test; mobile pass |
| F-1-3 | Added `/demo/`, isolated `demo:` state, persistent banner, reset, start-for-real, and demo documentation. | C1, C6; `.factory/demo.md` |
| F-1-4 | Added `.factory/claims.json` and one tagged test per retained claim. | C1–C7; Clean |
| F-1-5 | Removed the unregistered, dead paid checkout rather than advertising an unavailable purchase. Core extension remains free. | Link crawl in E2E; no checkout link remains |
| F-1-6 | Added styled `404.html` and Static Web Apps response override. | E2E `/404.html`; `staticwebapp.config.json` |
| F-1-7 | Replaced the broad landing assertion with a precise sample-mode claim. | C2 |
| F-1-8 | Added an interactive report showing the seeded sample categories. | C2 |
| F-1-9 | Seeded and asserts exact report counts in the demo. | C2 |
| F-1-10 | Added later-motion control and asserts it stops under Stable mode. | C2 |
| F-1-11 | Added and asserts independent media/sticky exceptions. | C3 |
| F-1-12 | Narrowed storage copy to documented local settings and demo namespace. | C1, C4 |
| F-1-13 | Removed the vague “ordinary HTML” promise. | Landing copy audit |
| F-1-14 | Removed the untested landing promise; extension regression still covers focus. | Extension E2E |
| F-1-15 | Removed the visitor-facing reproducibility claim; retained Package verification for maintainers. | Package |
| F-1-16 | Removed paid-tier/free-feature marketing because no checkout is available. | Landing crawl |
| F-1-17 | Removed unavailable Supporter edition and its unlock claims. | Landing crawl |
| F-1-18 | Removed checkout, security, merchant, and refund claims. | Landing crawl |
| F-1-19 | Removed license-token UI and storage path. | Request-log C5 |
| F-1-20 | Kept only observable reversible sample behavior. | C3 |
| F-1-21 | Rewrote README in plain words and uses Stable mode consistently. | README audit; C2/C3 |
| F-1-22 | README lists the motion report categories now exercised in the sample. | C2 |
| F-1-23 | Replaced jargon with “moving elements”; behavior is sample-tested. | C2 |
| F-1-24 | The retained later-motion statement is tested in the demo. | C2 |
| F-1-25 | The report wording is backed by exact sample counts. | C2 |
| F-1-26 | Local per-host settings remain covered by core rules tests and popup storage. | unit rules tests; C4 |
| F-1-27 | Extension keyboard regression remains in E2E. | Extension E2E |
| F-1-28 | Extension restricted-page recovery remains present; unsupported marketing copy removed. | Existing popup recovery implementation |
| F-1-29 | Removed unavailable $12 tier claims. | Landing and README crawl |
| F-1-30 | Retained narrow privacy statement and request-log test. | C5 |
| F-1-31 | Retained browser-local data statement and no-network demo evidence. | C4, C5 |
| F-1-32 | Removed billing/API claims with the unregistered paid flow. | Source crawl |
| F-1-33 | Removed token storage/verification claim with paid flow. | Source crawl |
| F-1-34 | Reduced build documentation to paths actually produced. | Build; Clean |
| F-1-35 | Kept reproducibility as maintainer evidence, not visitor marketing. | Package |
| F-1-36 | Removed unverified live-test promise from README. | README audit |
| F-1-37 | Kept configuration as deploy detail, not a marketing claim. | static config source check |
| F-1-38 | Removed “no account/free core/local-first” marketing fragments; retained request-log privacy proof. | C4, C5 |
| F-1-39 | Deleted lore, codes, mockup labels, and slogans. | Copy audit |
| F-1-40 | Replaced motion-budget jargon with a concrete section heading. | E2E home copy test |
| F-1-41 | Replaced the fake specimen with an interactive demo. | C2, C3 |
| F-1-42 | Rewrote install steps for desktop users and moved checksum to technical link. | E2E home copy test |
| F-1-43 | Removed unavailable Supporter section rather than retaining misleading copy. | Landing crawl |
| F-1-44 | Removed unsupported checkout-security claim. | Landing crawl |
| F-1-45 | Standardized the retained download action as “Download extension ZIP.” | E2E home copy test |
| F-1-46 | Replaced slogan with “Know the limits.” and concrete limitation text. | C7 |
| F-1-47 | Standardized retained user term as “Stable mode” and download term as “extension ZIP.” | Copy audit |
| F-1-48 | Rewrote README; no retained user-facing sentence exceeds 22 words. | `.factory/copy-audit.md` |
| F-1-49 | Removed internal jargon from public README and page copy. | Copy audit |
| F-1-50 | Added canonical, OG/Twitter metadata, 1200×630 product image, and touch icon. | document tests; Build |
| F-1-51 | Applied the same product header/footer content to home, demo, privacy, terms, and 404. | E2E route shell tests |
| F-1-52 | Hash navigation now focuses the destination heading and updates an aria-live region. | E2E focus test |
| F-1-53 | Retained external source link is visibly labeled “opens external site.” | E2E route shell tests |
| F-1-54 | Added actual local JSON export/import, schema validation, and merge/replace choice to popup. | unit rules test; C4 |
| F-1-55 | README now gives `/demo/` and explains the desktop extension ZIP. | README audit |
| F-1-56 | States the reader/ad-blocker/medical boundaries plainly. | C7 |
| F-1-57 | Rewrote overbroad reduced-motion assertion as a qualified explanation. | Copy audit |
| F-1-58 | Replaced install-label claim with current Web Store availability wording. | E2E home copy test |
| F-1-59 | Removed $12 pricing claim with unavailable paid tier. | Landing/README crawl |
| F-1-60 | Removed untestable funding promise. | Landing crawl |
| F-1-61 | Retained and protects non-medical boundary. | C7 |
| F-1-62 | Gives reversible Stable mode/exception guidance, tested on sample. | C3 |
| F-1-63 | Replaced footer asset claim with linked provenance record. | `design.md`; Build |
| F-1-64 | Kept audience positioning without a health efficacy claim. | First-screen E2E |
| F-1-65 | Uses plain product boundaries without an ad/clinical behavior promise. | C7 |
| F-1-66 | Removed user-reported health outcome wording. | README audit |
| F-1-67 | Moved test-stack inventory out of visitor product claims. | README audit |
| F-1-68 | Removed inaccurate automatic-browser-download statement. | README audit |
| F-1-69 | Retained actual restricted-page behavior in extension; removed unsupported README claim. | Extension E2E |
| F-1-70 | Retained offline behavior as a registered, observable demo claim. | C6 |

No review finding is deferred. The removed commercial flow is deliberate: a 404 checkout cannot honestly be sold, and all motion controls remain available without it.
