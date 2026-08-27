import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home page is accessible, complete, and error-free', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await expect(page).toHaveTitle(/Calm Scroll/);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('link', { name: /Download for Chrome/ })).toHaveAttribute('download', '');
  await expect(page.locator('.hero-figure img')).toHaveJSProperty('complete', true);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  expect(errors).toEqual([]);
});

test('layout stays within a 390px viewport and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client);
  await expect(page.locator('.nav-download')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const duration = await page.locator('.button-primary').first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThan(0.001);
});

test('license restore exposes validation and offline state without blocking free download', async ({ context, page }) => {
  await page.goto('/#support');
  await page.getByRole('button', { name: 'Restore' }).click();
  await expect(page.locator('#license-token')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#license-status')).toContainText('Paste the license token');

  await context.setOffline(true);
  await page.locator('#license-token').fill('test-offline-token');
  await page.getByRole('button', { name: 'Restore' }).click();
  await expect(page.locator('#license-status')).toContainText('Offline');
  await expect(page.getByRole('link', { name: /Download for Chrome/ })).toBeVisible();
});

test('returned licenses are stored and removed from the address bar', async ({ page }) => {
  await page.route('**/verify?license=returned-token', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null })
  }));
  await page.goto('/?license=returned-token#support');
  await expect(page).toHaveURL('/#support');
  expect(await page.evaluate(() => localStorage.getItem('sb_license:calm-scroll'))).toBe('returned-token');
  await expect(page.locator('#supporter-unlock')).toBeVisible();
});

for (const path of ['/privacy/', '/terms/', '/supporter/']) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  });
}
