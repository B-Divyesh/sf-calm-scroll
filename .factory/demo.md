# Calm Scroll demo

Open <https://calm-scroll.sociobot.in/?demo=1> or `/?demo=1` locally. That isolated entry redirects to `/demo/?demo=1`; `/demo/` also works directly. The landing action uses the query entry.

The sample includes an autoplay indicator, an animation, a transformed block, a sticky sample navigation bar, smooth scrolling, and a button that adds a later animation. Stable mode changes only those sample elements. The two exception controls restore media visibility or sticky positioning independently.

Demo state is stored only as `demo:calm-scroll:sample` in `localStorage`. It never reads extension settings, license keys, or production data. “Reset demo” removes that key. “Start for real” returns to the landing page.
