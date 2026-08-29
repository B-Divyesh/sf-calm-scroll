# Calm Scroll — review 7 handoff

## Outcome: PASS

This reviewer pass made no product-code changes. The live product at
<https://calm-scroll.sociobot.in/> passed the full adversarial first-read
check at 390 × 844 and 1440 × 900. The deployed release remains
`be4d3014175c979938fcce59f75f6c6afa9fd550`; this review commit documents the
result only.

## Verified

- Fresh cold visits identified the job, audience, and **Try it with sample
  data** action before scrolling.
- The demo opens already stabilized, exposes the report/control in the first
  phone viewport, uses `demo:` storage only, and Reset/exit preserve a seeded
  real-storage sentinel.
- Demo-flow request logging remained same-origin. The offline demo and
  full-lifecycle extension privacy sentinel test passed.
- All eleven registered claim commands passed independently from a fresh clone
  at `/tmp/calm-scroll-review-7-9zsK2V`.
- `npm test` passed (26 Vitest checks and 62 Playwright checks);
  `npm run build` passed; `npm run test:package` reproduced the extension
  ZIP three times with SHA-256
  `ba5082b9eb0925c5d79fb0500719b41cb43490edfb7f8c096c6bfb14f834d60d`.
- Live route, metadata, link crawl, dark/light accessibility, focus, mobile
  overflow, 404, and console checks passed.

## How to verify

```sh
npm ci
npm test
npm run build
npm run test:package
```

Open <https://calm-scroll.sociobot.in/?demo=1> to inspect the isolated sample.

## Known gaps

None found.
