import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const pages = ['site/index.html', 'site/demo/index.html', 'site/privacy/index.html', 'site/terms/index.html', 'site/404.html', 'entrypoints/popup/index.html'];
const publicPages = pages.filter((path) => path.startsWith('site/'));

describe('document accessibility baseline', () => {
  for (const path of pages) {
    it(`${path} has the required semantic shell`, () => {
      const dom = new JSDOM(readFileSync(path, 'utf8'));
      const doc = dom.window.document;
      expect(doc.documentElement.lang).toBe('en');
      expect(doc.title.trim().length).toBeGreaterThan(4);
      expect(doc.querySelectorAll('h1')).toHaveLength(1);
      expect(doc.querySelectorAll('main')).toHaveLength(1);
      for (const image of doc.querySelectorAll('img')) expect(image.hasAttribute('alt')).toBe(true);
      for (const input of doc.querySelectorAll('input')) {
        expect(doc.querySelector(`label[for="${input.id}"]`) || input.closest('label')).toBeTruthy();
      }
    });
  }

  it('ships no third-party runtime scripts or font CDNs', () => {
    for (const path of pages) {
      const html = readFileSync(path, 'utf8');
      expect(html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
      expect(html).not.toMatch(/<script[^>]+src=["']https?:\/\//);
    }
  });

  it('provides complete route metadata and the product social image', () => {
    for (const path of publicPages) {
      const doc = new JSDOM(readFileSync(path, 'utf8')).window.document;
      expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBeTruthy();
      expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/^https:\/\/calm-scroll\.sociobot\.in\//);
      for (const property of ['og:title', 'og:description', 'og:image']) expect(doc.querySelector(`meta[property="${property}"]`)?.getAttribute('content')).toBeTruthy();
      for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) expect(doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content')).toBeTruthy();
      expect(doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href')).toBe('/assets/apple-touch-icon.png');
    }
  });

  it('uses one shared header and footer link order on every site route', () => {
    for (const path of publicPages) {
      const doc = new JSDOM(readFileSync(path, 'utf8')).window.document;
      expect([...doc.querySelectorAll('.site-header nav a')].map((link) => link.textContent?.trim())).toEqual(['Demo', 'Install', 'Privacy']);
      expect([...doc.querySelectorAll('.site-footer nav a')].map((link) => link.textContent?.trim())).toEqual(['Demo', 'Privacy', 'Terms']);
      expect(doc.querySelector('#route-announcement[aria-live="polite"]')).toBeTruthy();
    }
  });

  it('defines visible focus and reduced-motion treatments', () => {
    const css = readFileSync('site/src/style.css', 'utf8');
    expect(css).toContain(':focus-visible');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('scroll-behavior: auto');
  });
});
