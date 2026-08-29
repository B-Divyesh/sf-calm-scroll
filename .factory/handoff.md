# Calm Scroll — review 6 handoff

## Outcome

Completed the sixth adversarial first-read review against production release `f91aa9902b48ea515397f6731ad4e6c2a944f075`. The verdict is **FAIL** with one minor finding and no blocking findings.

The remaining issue is F-6-1: every public route logs `Error with Permissions-Policy header: Unrecognized feature: 'web-share'.` The source is `web-share=()` in `public/staticwebapp.config.json`. Product code was not modified.

## What passed

- Cold 390 px and desktop screens clearly state the job, audience, and first action.
- The one-click demo opens already stabilized with report, control, and realistic sample content in the first phone viewport.
- Reset and exit remove only `demo:calm-scroll:sample`; a seeded real-storage value remains untouched.
- Landing/demo traffic is same-origin; the offline demo works after service-worker activation and control.
- Every registered claim command passes from a clean clone.
- Both-theme Axe scans, routing, Back/focus announcements, metadata, 404, link crawl, mobile overflow, reduced motion, full tests, build, deterministic package verification, and the live verifier pass.
- Every finding from reviews 1–5 and the controller retry was checked live and in current code; none regressed.

## Verification

Clean clone: `/tmp/calm-scroll-review6-clean-j9Uo7b`.

```sh
npm ci
npm run test:claims -- --grep @claim:<id>  # repeated for all eleven IDs
npm test
npm run build
npm run test:package
EXPECTED_RELEASE_SHA=f91aa9902b48ea515397f6731ad4e6c2a944f075 npm run test:live
```

Results: 25 Vitest checks passed; 56 Playwright checks passed with four expected phone-project skips for unpacked-extension checks; build passed; three package builds reproduced SHA-256 `ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`; live verification passed.

## Next step

Remove the unsupported `web-share=()` Permissions-Policy directive, make the route test reject Permissions-Policy warnings, deploy, and repeat a cold live console check. This review made documentation-only changes.
