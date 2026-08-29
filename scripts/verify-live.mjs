import { createHash } from 'node:crypto';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const origin = (process.env.LIVE_URL ?? 'https://calm-scroll.sociobot.in').replace(/\/$/, '');
const immutable = /(?:^|,)\s*max-age=31536000(?:,|$)/i;

async function request(path) {
  const response = await fetch(`${origin}${path}`);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response;
}

function header(response, name) {
  const value = response.headers.get(name);
  if (!value) throw new Error(`${name} is missing`);
  return value;
}

function expectIncludes(value, expected, label) {
  if (!value.includes(expected)) throw new Error(`${label} must include ${expected}; received ${value}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertMobileTouchTargets(page, path) {
  const targets = await page.locator('a, button, input').evaluateAll((items) => items
    .filter((target) => !target.classList.contains('skip-link'))
    .filter((target) => {
      const style = getComputedStyle(target);
      return style.display !== 'none' && style.visibility !== 'hidden';
    })
    .map((target) => {
      const rect = target.getBoundingClientRect();
      return {
        label: (target.getAttribute('aria-label') || target.textContent || target.id).trim(),
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
      };
    }));
  const undersized = targets.filter((target) => target.width < 44 || target.height < 44);
  assert(undersized.length === 0, `${path} has an interactive target below 44 × 44 CSS pixels: ${JSON.stringify(undersized)}`);
  const overlaps = targets.flatMap((target, index) => targets.slice(index + 1)
    .filter((other) => target.left < other.right && target.right > other.left && target.top < other.bottom && target.bottom > other.top)
    .map((other) => `${target.label} overlaps ${other.label}`));
  assert(overlaps.length === 0, `${path} has overlapping interactive targets at 390px: ${overlaps.join(', ')}`);

  const skipLink = page.locator('.skip-link');
  await skipLink.focus();
  const skipBox = await skipLink.boundingBox();
  assert(skipBox && skipBox.width >= 44 && skipBox.height >= 44, `${path} has a skip link below 44 × 44 CSS pixels`);
}

const home = await request('/');
const csp = header(home, 'content-security-policy');
expectIncludes(csp, "default-src 'self'", 'CSP');
expectIncludes(csp, 'connect-src', 'CSP');
expectIncludes(csp, 'https://api.sociobot.in', 'CSP');
expectIncludes(csp, "frame-ancestors 'none'", 'CSP');
const permissions = header(home, 'permissions-policy');
expectIncludes(permissions, 'camera=()', 'Permissions-Policy');
expectIncludes(permissions, 'geolocation=()', 'Permissions-Policy');
assert(!/(?:^|[,\s])web-share\s*=/.test(permissions), 'Permissions-Policy must not include unsupported web-share');

const html = await home.text();
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css|avif|webp))"/g)].map((match) => match[1]);
if (!assets.length) throw new Error('No built assets found in home HTML');
for (const path of [...new Set(assets)]) {
  const response = await request(path);
  const cache = header(response, 'cache-control');
  if (!immutable.test(cache) || !/\bimmutable\b/i.test(cache)) throw new Error(`${path} is not immutable: ${cache}`);
}

const zipPath = '/downloads/calm-scroll-chrome-v1.0.0.zip';
const zip = await request(zipPath);
const zipCache = header(zip, 'cache-control');
if (!immutable.test(zipCache) || !/\bimmutable\b/i.test(zipCache)) throw new Error(`${zipPath} is not immutable: ${zipCache}`);
const expectedChecksum = (await (await request(`${zipPath}.sha256`)).text()).trim().split(/\s+/)[0];
const actualChecksum = createHash('sha256').update(Buffer.from(await zip.arrayBuffer())).digest('hex');
if (!/^[a-f0-9]{64}$/.test(expectedChecksum) || expectedChecksum !== actualChecksum) {
  throw new Error(`Published ZIP checksum mismatch: expected ${expectedChecksum}, got ${actualChecksum}`);
}

const release = await (await request('/release.json')).json();
if (!/^[a-f0-9]{40}$/.test(release.source_commit ?? '')) {
  throw new Error(`Live release identity has an invalid source_commit: ${release.source_commit}`);
}
if (release.extension?.path !== zipPath || release.extension?.sha256 !== actualChecksum) {
  throw new Error('Live release identity does not match the published extension archive');
}
const expectedRelease = process.env.EXPECTED_RELEASE_SHA;
if (expectedRelease && release.source_commit !== expectedRelease) {
  throw new Error(`Live release commit mismatch: ${release.source_commit} != ${expectedRelease}`);
}

const serviceWorker = await request('/sw.js');
const swCache = header(serviceWorker, 'cache-control');
if (/\bimmutable\b/i.test(swCache)) throw new Error(`/sw.js must revalidate, received ${swCache}`);

const missing = await fetch(`${origin}/calm-scroll-missing-${Date.now()}`);
const missingHtml = await missing.text();
if (missing.status !== 404 || !missingHtml.includes('That page was not found.')) {
  throw new Error(`Unknown route must return the styled 404 response; received ${missing.status}`);
}

const browser = await chromium.launch();
try {
  const routes = ['/', '/demo/', '/privacy/', '/terms/', '/404.html'];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    for (const colorScheme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport, colorScheme });
      const page = await context.newPage();
      for (const path of routes) {
        const browserIssues = [];
        const recordConsole = (message) => {
          if (message.type() === 'error' || (message.type() === 'warning' && /Permissions-Policy/i.test(message.text()))) {
            browserIssues.push(`${message.type()}: ${message.text()}`);
          }
        };
        const recordPageError = (error) => browserIssues.push(`pageerror: ${error.message}`);
        page.on('console', recordConsole);
        page.on('pageerror', recordPageError);
        const response = await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
        assert(response?.ok(), `${path} did not load in Chromium`);
        assert(await page.locator('html[lang="en"]').count() === 1, `${path} must set lang=en`);
        assert(await page.locator('main').count() === 1, `${path} must have one main landmark`);
        assert(await page.locator('h1').count() === 1, `${path} must have one h1`);
        assert((await page.title()).length > 4, `${path} must have a route title`);
        assert(await page.locator('.site-header nav a').allTextContents().then((labels) => labels.map((label) => label.trim()).join('|')) === 'Demo|Install|Privacy', `${path} has inconsistent navigation`);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), `${path} overflows ${viewport.width}px`);
        if (viewport.width === 390) await assertMobileTouchTargets(page, path);
        const accessibility = await new AxeBuilder({ page }).analyze();
        const severe = accessibility.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical');
        assert(severe.length === 0, `${path} has serious or critical Axe violations in ${colorScheme} mode: ${severe.map((item) => item.id).join(', ')}`);
        assert(browserIssues.length === 0, `${path} logged browser errors or Permissions-Policy warnings: ${browserIssues.join(' | ')}`);
        page.removeListener('console', recordConsole);
        page.removeListener('pageerror', recordPageError);
      }
      await context.close();
    }
  }

  const demoContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const demoPage = await demoContext.newPage();
  const demoRequests = [];
  demoPage.on('request', (item) => demoRequests.push(item.url()));
  await demoPage.goto(`${origin}/`, { waitUntil: 'networkidle' });
  await demoPage.getByRole('link', { name: 'Try it with sample data' }).click();
  await demoPage.waitForURL(/\/demo\/\?demo=1$/);
  assert(await demoPage.getByText('Demo — sample data, nothing is saved.').isVisible(), 'The demo banner is missing');
  assert(await demoPage.locator('#demo-state').textContent() === 'Stable mode on', 'The demo does not open in a stabilized state');
  const reportBox = await demoPage.getByRole('heading', { name: 'Sample motion report' }).boundingBox();
  const stableBox = await demoPage.getByRole('switch', { name: 'Turn off Stable mode' }).boundingBox();
  assert(reportBox && reportBox.y + reportBox.height <= 844, 'The demo report is below the first mobile viewport');
  assert(stableBox && stableBox.y + stableBox.height <= 844, 'The Stable mode control is below the first mobile viewport');
  const animationBox = await demoPage.locator('.sample-animation').boundingBox();
  const addButtonBox = await demoPage.getByRole('button', { name: 'Add later motion' }).boundingBox();
  assert(animationBox && addButtonBox && animationBox.y + animationBox.height <= addButtonBox.y, 'Demo motion controls overlap at 390px');
  await demoPage.getByRole('switch', { name: 'Turn off Stable mode' }).click();
  await demoPage.getByRole('switch', { name: 'Turn on Stable mode' }).click();
  assert(await demoPage.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior) === 'auto', 'Stable mode did not stop smooth scrolling');
  assert(JSON.stringify(await demoPage.evaluate(() => Object.keys(localStorage))) === JSON.stringify(['demo:calm-scroll:sample']), 'Demo state escaped its storage namespace');
  await demoPage.getByRole('button', { name: 'Reset demo' }).click();
  assert(await demoPage.evaluate(() => localStorage.length) === 0, 'Reset demo did not remove demo state');
  assert(demoRequests.every((url) => new URL(url).origin === origin), 'The home-to-demo flow made a third-party request');
  await demoContext.close();

  const focusContext = await browser.newContext();
  const focusPage = await focusContext.newPage();
  await focusPage.goto(`${origin}/`);
  await focusPage.locator('.site-header').getByRole('link', { name: 'Demo' }).click();
  assert(await focusPage.locator('h1').evaluate((heading) => heading === document.activeElement), 'Demo navigation did not focus its h1');
  await focusPage.goBack();
  assert(await focusPage.locator('h1').evaluate((heading) => heading === document.activeElement), 'Browser Back did not focus the home h1');
  await focusContext.close();

  const offlineContext = await browser.newContext({ serviceWorkers: 'allow' });
  const offlinePage = await offlineContext.newPage();
  await offlinePage.goto(`${origin}/demo/`);
  const lifecycle = await offlinePage.evaluate(async () => {
    const registration = await navigator.serviceWorker.register('/sw.js');
    const worker = registration.installing ?? registration.waiting ?? registration.active;
    if (!worker) throw new Error('The service worker registration has no worker.');
    if (worker.state !== 'activated') {
      await new Promise((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error('The service worker did not activate.')), 10_000);
        const handleState = () => {
          if (worker.state !== 'activated') return;
          window.clearTimeout(timeout);
          worker.removeEventListener('statechange', handleState);
          resolve();
        };
        worker.addEventListener('statechange', handleState);
        handleState();
      });
    }
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error('The service worker did not take control.')), 10_000);
        const handleControl = () => {
          if (!navigator.serviceWorker.controller) return;
          window.clearTimeout(timeout);
          navigator.serviceWorker.removeEventListener('controllerchange', handleControl);
          resolve();
        };
        navigator.serviceWorker.addEventListener('controllerchange', handleControl);
        handleControl();
      });
    }
    return { registration: registration.active?.state, controller: navigator.serviceWorker.controller?.state };
  });
  assert(lifecycle.registration === 'activated' && lifecycle.controller === 'activated', 'The live service worker was not active and controlling');
  await offlineContext.setOffline(true);
  const offlineResponse = await offlinePage.reload({ waitUntil: 'domcontentloaded' });
  assert(offlineResponse?.status() === 200, 'The demo did not reload offline');
  assert(await offlinePage.locator('#stable-toggle').getAttribute('aria-checked') === 'true', 'The offline demo did not retain its stabilized default');
  await offlinePage.getByRole('switch', { name: 'Turn off Stable mode' }).click();
  await offlinePage.getByRole('switch', { name: 'Turn on Stable mode' }).click();
  assert(await offlinePage.locator('#stable-toggle').getAttribute('aria-checked') === 'true', 'Cached demo JavaScript did not run offline');
  assert(await offlinePage.locator('.sample-animation').evaluate((element) => getComputedStyle(element).animationName) === 'none', 'Cached Stable mode did not work offline');
  await offlineContext.close();
} finally {
  await browser.close();
}

console.log(`Live delivery, browser, accessibility, privacy, routing, and offline checks pass: ${origin} (${release.source_commit}, ${actualChecksum})`);
