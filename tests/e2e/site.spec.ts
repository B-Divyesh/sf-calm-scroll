import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/', '/demo/', '/privacy/', '/terms/', '/404.html'];

for (const colorScheme of ['light', 'dark'] as const) {
  for (const path of routes) {
  test(`${path} has an accessible semantic shell in ${colorScheme} mode`, async ({ page }) => {
    const browserIssues: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error' || (message.type() === 'warning' && /Permissions-Policy/i.test(message.text()))) {
        browserIssues.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => browserIssues.push(`pageerror: ${error.message}`));
    await page.emulateMedia({ colorScheme });
    await page.goto(path); await expect(page.locator('main')).toBeVisible(); await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]); expect(browserIssues).toEqual([]);
  });
  }
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

test('every public interactive target has a non-overlapping 44px hit area at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of routes) {
    await page.goto(path);
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
    expect(undersized, `${path} has an interactive target below 44 × 44 CSS pixels`).toEqual([]);

    const overlaps = targets.flatMap((target, index) => targets.slice(index + 1)
      .filter((other) => target.left < other.right && target.right > other.left && target.top < other.bottom && target.bottom > other.top)
      .map((other) => `${target.label} overlaps ${other.label}`));
    expect(overlaps, `${path} has overlapping interactive targets at 390px`).toEqual([]);

    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    const skipBox = await skipLink.boundingBox();
    expect(skipBox?.width).toBeGreaterThanOrEqual(44);
    expect(skipBox?.height).toBeGreaterThanOrEqual(44);
  }
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
  await expect(page.getByRole('link', { name: 'Install on desktop Chromium' })).toBeVisible();
  await expect(page.locator('#install .section-intro > p')).toHaveText('Download the extension ZIP, unzip it, then load its folder in desktop Chromium’s Developer mode.');
  await expect(page.getByText('The Chrome Web Store listing is not available yet.')).toHaveCount(0);
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
  await expect(page.locator('#route-announcement')).toContainText('See a steady page. opened');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect(page.locator('#route-announcement')).toContainText('Stop page motion while you read. opened');
});

test('the demo opens with the report and a stabilized result in the first viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?demo=1');
  await expect(page.locator('#demo-state')).toHaveText('Stable mode on');
  await expect(page.locator('#stable-toggle')).toHaveAttribute('aria-checked', 'true');
  const report = await page.getByRole('heading', { level: 2, name: 'Sample motion report' }).boundingBox();
  const control = await page.getByRole('switch', { name: 'Turn off Stable mode' }).boundingBox();
  expect(report).not.toBeNull();
  expect(control).not.toBeNull();
  expect(report!.y + report!.height).toBeLessThanOrEqual(844);
  expect(control!.y + control!.height).toBeLessThanOrEqual(844);
});
