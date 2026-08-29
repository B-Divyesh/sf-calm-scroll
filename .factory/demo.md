# Calm Scroll demo

Open <https://calm-scroll.sociobot.in/?demo=1> or `/?demo=1` locally. That isolated entry redirects to `/demo/?demo=1`; `/demo/` also works directly. The landing action uses the query entry.

The demo opens with Stable mode already on. Its first phone viewport shows the report, switch, and a local-news article. The report uses the extension’s shared scanner. The sample includes autoplay media, an animation, a transformed panel, and sticky article navigation. It also includes smooth scrolling and a button that adds a later animation. Stable mode changes only those sample elements. The two exception controls restore media visibility or sticky positioning independently.

Demo state is stored only as `demo:calm-scroll:sample` in `localStorage`. It never reads extension settings, license keys, or production data. “Reset demo” removes that key. “Start for real” returns to the landing page.

After the first online visit, the service worker precaches the demo page and its fingerprinted CSS and JavaScript. The `offline-demo` claim test creates a fresh browser context, awaits registration, activation, and control, then reloads offline and operates Stable mode.
