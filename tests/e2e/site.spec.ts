import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of ['/', '/demo/', '/privacy/', '/terms/', '/404.html']) {
  test(`${path} has an accessible semantic shell`, async ({ page }) => {
    const errors: string[] = []; page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(path); await expect(page.locator('main')).toBeVisible(); await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]); expect(errors).toEqual([]);
  });
}

test('home offers an immediate demo and labels desktop installation', async ({ page }) => {
  await page.goto('/'); await expect(page).toHaveTitle('Calm Scroll — Stop page motion while you read');
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toHaveAttribute('href', '/demo/');
  await expect(page.getByText('The demo works on any device.')).toBeVisible();
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
