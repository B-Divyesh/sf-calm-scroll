export {};

const route = new URL(window.location.href);
if (route.pathname === '/' && route.searchParams.get('demo') === '1') {
  window.location.replace('/demo/?demo=1');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
}

const announcement = document.getElementById('route-announcement');
const focusHeading = (heading: HTMLElement) => {
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
  if (announcement) announcement.textContent = `${heading.textContent?.trim() ?? 'Page'} opened`;
};

for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
  link.addEventListener('click', () => {
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname !== window.location.pathname) {
      sessionStorage.setItem('calm-scroll:focus-route', destination.pathname);
      return;
    }
    if (!destination.hash || link.classList.contains('skip-link')) return;
    const target = document.querySelector<HTMLElement>(destination.hash);
    if (!target) return;
    const heading = target.matches('h1, h2, h3') ? target : target.querySelector<HTMLElement>('h1, h2, h3');
    window.setTimeout(() => {
      focusHeading(heading ?? target);
    }, 0);
  });
}

window.addEventListener('pageshow', (event) => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const requested = sessionStorage.getItem('calm-scroll:focus-route');
  const shouldFocus = !window.location.hash && (requested === window.location.pathname || event.persisted || navigation?.type === 'back_forward');
  if (!shouldFocus) return;
  sessionStorage.removeItem('calm-scroll:focus-route');
  const heading = document.querySelector<HTMLElement>('main h1');
  if (heading) window.setTimeout(() => focusHeading(heading), 0);
});
