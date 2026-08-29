import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/demo/', '/privacy/', '/terms/', '/404.html'];

for (const path of routes) {
  test(`${path} has an accessible semantic shell`, async ({ page }) => {
    const errors: string[] = []; page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(path); await expect(page.locator('main')).toBeVisible(); await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]); expect(errors).toEqual([]);
  });
}

test('all routes use the same complete header navigation', async ({ page }) => {
  for (const path of routes) {
    await page.goto(path);
    const labels = await page.locator('.site-header nav a').allTextContents();
    expect(labels.map((label) => label.trim())).toEqual(['Demo', 'Install', 'Privacy']);
  }
});

test('the compact 390px header remains visible and keyboard reachable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/terms/');
  for (const name of ['Demo', 'Install', 'Privacy']) {
    const link = page.locator('.site-header nav').getByRole('link', { name });
    await expect(link).toBeVisible();
    await link.focus();
    await expect(link).toBeFocused();
  }
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
});

test('an unknown route returns the styled 404 response', async ({ page }) => {
  const response = await page.goto('/nothing-lives-here');
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle('Page not found — Calm Scroll');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('That page was not found.');
});

test('home offers an immediate demo and labels desktop installation', async ({ page }) => {
  await page.goto('/'); await expect(page).toHaveTitle('Calm Scroll — Stop page motion while you read');
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toHaveAttribute('href', '/?demo=1');
  await expect(page.getByText('The demo fits phone and desktop screens.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Install on desktop Chrome or Chromium' })).toBeVisible();
});

test('layout stays within a 390px viewport and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/demo/');
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client); const duration = await page.locator('.button-primary').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThan(0.001);
});

test('internal section navigation gives the destination heading focus', async ({ page }) => {
  await page.goto('/'); await page.locator('.desktop-install').click();
  await expect(page.locator('#install-title')).toBeFocused();
});

test('route navigation and browser Back focus and announce the page heading', async ({ page }) => {
  await page.goto('/');
  await page.locator('.site-header').getByRole('link', { name: 'Demo' }).click();
  await expect(page).toHaveURL(/\/demo\//);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.locator('#route-announcement')).toContainText('Stop sample page motion. opened');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.locator('#route-announcement')).toContainText('Stop page motion while you read. opened');
});
