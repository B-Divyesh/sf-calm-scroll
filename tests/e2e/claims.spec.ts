import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium, expect, test } from '@playwright/test';

const fixture = `<!doctype html><html lang="en" style="scroll-behavior:smooth"><head><title>Motion fixture</title><style>
  @keyframes drift { from { opacity:.8 } to { opacity:1 } }
  .animated { animation:drift 2s infinite alternate; transition:opacity 2s }
  .transformed { transform:translateX(20px) }
  .sticky { position:sticky; top:0 }
</style></head><body><main><h1>Motion fixture</h1><div class="animated">Animated</div><div class="transformed">Transformed</div><nav class="sticky">Sticky</nav></main></body></html>`;

async function openExtension() {
  const userDataDir = await mkdtemp(join(tmpdir(), 'calm-scroll-claim-'));
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium', headless: true,
    args: [`--disable-extensions-except=${resolve('.output/chrome-mv3')}`, `--load-extension=${resolve('.output/chrome-mv3')}`]
  });
  let [worker] = context.serviceWorkers();
  if (!worker) worker = await context.waitForEvent('serviceworker');
  const extensionId = new URL(worker.url()).host;
  const page = await context.newPage();
  await page.route('**/motion-fixture.html', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: fixture }));
  await page.goto('http://127.0.0.1:4173/motion-fixture.html');
  const popup = await context.newPage();
  await popup.goto(`chrome-extension://${extensionId}/popup.html`);
  return { context, page, popup, userDataDir, worker };
}

test('@claim:demo-isolation uses only the demo namespace and resets it', async ({ page }) => {
  const claimRegistry = JSON.parse(await readFile('.factory/claims.json', 'utf8')) as Array<{ id: string; where: string }>;
  expect(claimRegistry.find((claim) => claim.id === 'demo-isolation')?.where).toContain('README');
  expect(await readFile('README.md', 'utf8')).toContain('Try the isolated sample at <https://calm-scroll.sociobot.in/?demo=1>.');
  await page.goto('/?demo=1');
  await expect(page.getByText('Demo — sample data, nothing is saved.')).toBeVisible();
  await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:calm-scroll:sample']);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:calm-scroll:sample'))).toBeNull();
  await page.locator('#stable-toggle').click();
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('demo:calm-scroll:sample'))).toBeNull();
});

test('@claim:sample-motion-controls stops all sample motion and preserves text', async ({ page }) => {
  await page.goto('/demo/');
  await expect(page.locator('#autoplay-count')).toHaveText('1');
  await expect(page.locator('#animation-count')).toHaveText('1');
  await expect(page.locator('#transform-count')).toHaveText('1');
  await expect(page.locator('#sticky-count')).toHaveText('1');
  await expect(page.locator('#smooth-count')).toHaveText('Yes');
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('smooth');
  const copy = await page.locator('#sample-copy').textContent();
  await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  await expect(page.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'true');
  expect(await page.locator('.sample-animation').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.locator('.sample-moving').evaluate((el) => getComputedStyle(el).transform)).toBe('none');
  expect(await page.locator('.sample-sticky').evaluate((el) => getComputedStyle(el).position)).toBe('static');
  expect(await page.locator('.sample-autoplay').evaluate((el) => getComputedStyle(el).visibility)).toBe('hidden');
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
  await page.getByRole('button', { name: 'Add later motion' }).click();
  await expect(page.locator('#animation-count')).toHaveText('2');
  expect(await page.locator('.late-animation').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.locator('#sample-copy').textContent()).toBe(copy);
});

test('@claim:sample-exceptions restore only the selected sample behavior', async ({ page }) => {
  await page.goto('/demo/');
  await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  await page.getByLabel('Allow media playback').check();
  expect(await page.locator('.sample-autoplay').evaluate((el) => getComputedStyle(el).visibility)).toBe('visible');
  expect(await page.locator('.sample-sticky').evaluate((el) => getComputedStyle(el).position)).toBe('static');
  await page.getByLabel('Keep sticky layers').check();
  expect(await page.locator('.sample-sticky').evaluate((el) => getComputedStyle(el).position)).toBe('sticky');
  await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  expect(await page.locator('.sample-animation').evaluate((el) => getComputedStyle(el).animationName)).not.toBe('none');
  expect(await page.locator('.sample-moving').evaluate((el) => getComputedStyle(el).transform)).not.toBe('none');
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('smooth');
});

test('@claim:demo-responsive works from the query entry point at phone and desktop sizes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?demo=1');
  await expect(page).toHaveURL(/\/demo\/\?demo=1$/);
  await expect(page.getByText('Demo — sample data, nothing is saved.')).toBeVisible();
  const animationBox = await page.locator('.sample-animation').boundingBox();
  const addButtonBox = await page.getByRole('button', { name: 'Add later motion' }).boundingBox();
  expect(animationBox).not.toBeNull();
  expect(addButtonBox).not.toBeNull();
  expect(animationBox!.y + animationBox!.height).toBeLessThanOrEqual(addButtonBox!.y);
  await page.getByRole('switch', { name: 'Turn on Stable mode' }).click();
  await expect(page.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'true');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'false');
  const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(width.scroll).toBeLessThanOrEqual(width.client);
});

test('@claim:local-settings exports, clears, imports, and reapplies extension rules without remote requests', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'unpacked extensions require desktop Chromium');
  const opened = await openExtension();
  const requests: string[] = [];
  opened.context.on('request', (request) => requests.push(request.url()));
  try {
    await expect(opened.popup.locator('#hostname')).toHaveText('127.0.0.1');
    await opened.popup.locator('#stable-toggle').click();
    await opened.popup.getByLabel('Keep fixed and sticky layers').check();
    await expect.poll(() => opened.page.locator('.transformed').evaluate((element) => getComputedStyle(element).transform)).toBe('none');

    const [download] = await Promise.all([
      opened.popup.waitForEvent('download'),
      opened.popup.getByRole('button', { name: 'Export site settings' }).click()
    ]);
    const downloadPath = await download.path();
    expect(downloadPath).not.toBeNull();
    const exported = await readFile(downloadPath!, 'utf8');
    expect(JSON.parse(exported)).toEqual({ version: 1, siteRules: { '127.0.0.1': { enabled: true, allowMedia: false, keepSticky: true } } });

    await opened.worker.evaluate('chrome.storage.local.clear()');
    await opened.page.reload();
    await expect.poll(() => opened.page.locator('.transformed').evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');
    await opened.popup.getByLabel('Replace current settings').check();
    await opened.popup.locator('#import-settings').setInputFiles({ name: 'calm-scroll-site-settings.json', mimeType: 'application/json', buffer: Buffer.from(exported) });
    await expect(opened.popup.locator('#transfer-status')).toHaveText('Site settings replaced from the local file.');
    expect(await opened.worker.evaluate('chrome.storage.local.get("siteRules")')).toEqual({ siteRules: { '127.0.0.1': { enabled: true, allowMedia: false, keepSticky: true } } });
    await opened.page.reload();
    await expect.poll(() => opened.page.locator('.transformed').evaluate((element) => getComputedStyle(element).transform)).toBe('none');
    expect(requests.every((url) => url.startsWith('chrome-extension://') || url.startsWith('http://127.0.0.1:4173/'))).toBe(true);
  } finally {
    await opened.context.close();
    await rm(opened.userDataDir, { recursive: true, force: true });
  }
});

test('@claim:extension-desktop-chromium loads the packaged extension in Chromium', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'unpacked extensions require desktop Chromium');
  const opened = await openExtension();
  try {
    await expect(opened.popup).toHaveTitle('Calm Scroll controls');
    await expect(opened.popup.locator('#hostname')).toHaveText('127.0.0.1');
    await expect(opened.popup.locator('#motion-total')).not.toHaveText('0');
  } finally {
    await opened.context.close();
    await rm(opened.userDataDir, { recursive: true, force: true });
  }
});

test('@claim:private-first-load makes no third-party requests', async ({ page }) => {
  const requests: string[] = []; page.on('request', (request) => requests.push(request.url()));
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await page.getByRole('switch', { name: 'Turn on Stable mode' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  const origin = new URL(page.url()).origin;
  expect(requests.length).toBeGreaterThan(0); expect(requests.every((url) => new URL(url).origin === origin)).toBe(true);
});

test('@claim:offline-demo reloads after awaited service-worker activation and control', async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    baseURL: 'http://127.0.0.1:4173',
    serviceWorkers: 'allow',
    viewport: testInfo.project.name === 'mobile-390' ? { width: 390, height: 844 } : { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    expect(await readFile('site/privacy/index.html', 'utf8')).toContain('After one online visit, the sample demo reloads offline.');
    await page.goto('/demo/');

    const lifecycle = await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const worker = registration.installing ?? registration.waiting ?? registration.active;
      if (!worker) throw new Error('The service worker registration has no worker.');

      if (worker.state !== 'activated') {
        await new Promise<void>((resolve, reject) => {
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
        await new Promise<void>((resolve, reject) => {
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

      return {
        registrationState: registration.active?.state,
        controlled: navigator.serviceWorker.controller !== null,
        controllerState: navigator.serviceWorker.controller?.state,
        scriptURL: navigator.serviceWorker.controller?.scriptURL
      };
    });
    expect(lifecycle).toEqual({
      registrationState: 'activated',
      controlled: true,
      controllerState: 'activated',
      scriptURL: 'http://127.0.0.1:4173/sw.js'
    });

    await context.setOffline(true);
    const response = await page.reload({ waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle('Demo — Calm Scroll');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Stop sample page motion.');
    await expect(page.getByText('Demo — sample data, nothing is saved.')).toBeVisible();
    await expect(page.locator('#animation-count')).toHaveText('1');
    await page.getByRole('switch', { name: 'Turn on Stable mode' }).click();
    await expect(page.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'true');
    expect(await page.locator('.sample-animation').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    expect(await page.evaluate(() => navigator.serviceWorker.controller?.state)).toBe('activated');
  } finally {
    await context.close();
  }
});

test('@claim:health-boundary keeps the non-clinical wording', async ({ page }) => {
  await page.goto('/'); await expect(page.getByText('Calm Scroll is not a medical device and does not promise a health outcome.')).toBeVisible();
  await page.goto('/terms/'); await expect(page.getByText('Calm Scroll is not a medical device, diagnosis, or treatment.')).toBeVisible();
});

test('@claim:mit-license keeps the published MIT license and terms aligned', async ({ page }) => {
  const [license, shippedLicense, readme] = await Promise.all([
    readFile('LICENSE', 'utf8'),
    readFile('dist/extension/chrome-mv3/LICENSE', 'utf8'),
    readFile('README.md', 'utf8')
  ]);
  expect(shippedLicense).toBe(license);
  expect(license).toContain('Permission is hereby granted, free of charge, to any person obtaining a copy');
  expect(license).toContain('to use, copy, modify, merge, publish, distribute, sublicense, and/or sell');
  expect(license).toContain('The above copyright notice and this permission notice shall be included');
  expect(readme).toContain('MIT. See [LICENSE](./LICENSE).');

  await page.goto('/terms/');
  await expect(page.getByRole('heading', { level: 2, name: 'Free software' })).toBeVisible();
  await expect(page.getByText('The extension is free software under the MIT License. You may inspect, modify, and redistribute it under that license.')).toBeVisible();
});
