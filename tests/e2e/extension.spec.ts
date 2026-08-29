import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium, expect, test } from '@playwright/test';

test('the MV3 popup freezes a real page and remembers the site', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'extension lifecycle needs one desktop run');
  const userDataDir = await mkdtemp(join(tmpdir(), 'calm-scroll-e2e-'));
  const extensionPath = resolve('.output/chrome-mv3');
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  });

  try {
    let [worker] = context.serviceWorkers();
    if (!worker) worker = await context.waitForEvent('serviceworker');
    const extensionId = new URL(worker.url()).host;
    const page = await context.newPage();
    await page.route('**/motion-fixture.html', (route) => route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `<!doctype html><html lang="en" style="scroll-behavior:smooth"><head><title>Motion fixture</title><style>
        @keyframes drift { from { opacity:.8 } to { opacity:1 } }
        .animated { animation:drift 2s infinite alternate; transition:opacity 2s }
        .transformed { transform:translateX(20px) }
        .sticky { position:sticky; top:0 }
      </style></head><body><main><h1>Motion fixture</h1><video autoplay muted playsinline aria-label="Autoplay fixture"></video><div class="animated">Animated</div><div class="transformed">Transformed</div><nav class="sticky">Sticky</nav></main></body></html>`
    }));
    await page.goto('http://127.0.0.1:4173/motion-fixture.html');
    await page.bringToFront();

    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup.html`);
    await expect(popup.locator('#hostname')).toHaveText('127.0.0.1');
    await expect(popup.locator('#motion-total')).toHaveText('5');
    await expect(popup.locator('#autoplay-count')).toHaveText('1');
    await expect(popup.locator('#animation-count')).toHaveText('1');
    await expect(popup.locator('#transform-count')).toHaveText('1');
    await expect(popup.locator('#sticky-count')).toHaveText('1');
    await expect(popup.locator('#smooth-count')).toHaveText('Yes');
    await popup.locator('#stable-toggle').focus();
    await popup.locator('#stable-toggle').press('Space');
    await expect(popup.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'true');

    await expect.poll(() => page.locator('.animated').evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
    expect(await page.locator('.transformed').evaluate((element) => getComputedStyle(element).transform)).toBe('none');
    expect(await page.locator('.sticky').evaluate((element) => getComputedStyle(element).position)).toBe('static');
    expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');

    await page.reload();
    await expect.poll(() => page.locator('.transformed').evaluate((element) => getComputedStyle(element).transform)).toBe('none');
  } finally {
    await context.close();
    await rm(userDataDir, { recursive: true, force: true });
  }
});
