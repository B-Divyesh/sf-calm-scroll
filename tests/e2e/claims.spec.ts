import { expect, test } from '@playwright/test';

test('@claim:demo-isolation uses only the demo namespace and resets it', async ({ page }) => {
  await page.goto('/demo/');
  await expect(page.getByText('Demo — sample data, nothing is saved.')).toBeVisible();
  await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:calm-scroll:sample']);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:calm-scroll:sample'))).toBeNull();
});

test('@claim:sample-motion-controls stops all sample motion and preserves text', async ({ page }) => {
  await page.goto('/demo/');
  const copy = await page.locator('#sample-copy').textContent();
  await page.getByRole('button', { name: 'Add later motion' }).click();
  await expect(page.locator('#animation-count')).toHaveText('2');
  await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  await expect(page.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'true');
  expect(await page.locator('.sample-animation').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  expect(await page.locator('.sample-moving').evaluate((el) => getComputedStyle(el).transform)).toBe('none');
  expect(await page.locator('.sample-sticky').evaluate((el) => getComputedStyle(el).position)).toBe('static');
  expect(await page.locator('.sample-autoplay').evaluate((el) => getComputedStyle(el).visibility)).toBe('hidden');
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
});

test('@claim:local-settings has no demo network path and uses local data', async ({ page }) => {
  const requests: string[] = []; page.on('request', (request) => requests.push(request.url()));
  await page.goto('/demo/'); await page.locator('#stable-toggle').evaluate((element: HTMLButtonElement) => element.click());
  expect(await page.evaluate(() => localStorage.getItem('demo:calm-scroll:sample'))).toContain('"stable":true');
  expect(requests.every((url) => new URL(url).origin === new URL(page.url()).origin)).toBe(true);
});

test('@claim:private-first-load makes no third-party requests', async ({ page }) => {
  const requests: string[] = []; page.on('request', (request) => requests.push(request.url()));
  await page.goto('/demo/');
  const origin = new URL(page.url()).origin;
  expect(requests.length).toBeGreaterThan(0); expect(requests.every((url) => new URL(url).origin === origin)).toBe(true);
});

test('@claim:offline-demo reloads after the first visit', async ({ context, page }) => {
  await page.goto('/demo/'); await page.waitForFunction(() => navigator.serviceWorker?.controller !== null);
  await context.setOffline(true); await page.reload(); await expect(page.getByRole('heading', { level: 1 })).toHaveText('Stop sample page motion.');
});

test('@claim:health-boundary keeps the non-clinical wording', async ({ page }) => {
  await page.goto('/'); await expect(page.getByText('Calm Scroll is not a medical device and does not promise a health outcome.')).toBeVisible();
  await page.goto('/terms/'); await expect(page.getByText('Calm Scroll is not a medical device, diagnosis, or treatment.')).toBeVisible();
});
