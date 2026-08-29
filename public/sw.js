const CACHE = 'calm-scroll-site-v3';
const PAGES = ['/', '/demo/', '/privacy/', '/terms/', '/404.html'];
const STATIC_ASSETS = ['/assets/calm-scroll-hero-768.webp', '/assets/favicon.svg'];

async function precacheShell() {
  const cache = await caches.open(CACHE);
  await cache.addAll([...PAGES, ...STATIC_ASSETS]);

  // Vite fingerprints the scripts and stylesheet. Discover their built URLs
  // from the cached pages so the first visit installs a complete offline demo.
  const builtAssets = new Set();
  for (const page of PAGES) {
    const response = await cache.match(page);
    if (!response) throw new Error(`Could not cache ${page}`);
    const html = await response.text();
    for (const match of html.matchAll(/(?:href|src)="(\/assets\/[^"?#]+)"/g)) {
      builtAssets.add(match[1]);
    }
  }
  await cache.addAll([...builtAssets]);
}

self.addEventListener('install', (event) => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, response.clone())));
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request, { ignoreSearch: event.request.mode === 'navigate' });
    if (cached) return cached;
    if (event.request.mode === 'navigate') return caches.match('/404.html');
    return Response.error();
  }));
});
