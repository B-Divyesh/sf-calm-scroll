export {};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
}

for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
  link.addEventListener('click', () => {
    const target = document.querySelector<HTMLElement>(link.hash);
    if (!target) return;
    const heading = target.matches('h1, h2, h3') ? target : target.querySelector<HTMLElement>('h1, h2, h3');
    window.setTimeout(() => {
      const destination = heading ?? target; destination.tabIndex = -1; destination.focus({ preventScroll: true });
      const announcement = document.getElementById('route-announcement'); if (announcement) announcement.textContent = destination.textContent?.trim() ?? 'Section opened';
    }, 0);
  });
}
