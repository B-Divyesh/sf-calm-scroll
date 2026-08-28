# Calm Scroll demo

Open <https://calm-scroll.sociobot.in/demo/> or `/demo/` locally. The landing page’s “Try it with sample data” action opens the same route.

The sample includes an autoplay indicator, an animation, a transformed block, a sticky sample navigation bar, smooth scrolling, and a button that adds a later animation. Stable mode changes only those sample elements. The two exception controls restore media visibility or sticky positioning independently.

Demo state is stored only as `demo:calm-scroll:sample` in `localStorage`. It never reads extension settings, license keys, or production data. “Reset demo” removes that key. “Start for real” returns to the landing page.
