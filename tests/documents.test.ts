import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';

const pages = ['site/index.html', 'site/demo/index.html', 'site/privacy/index.html', 'site/terms/index.html', 'site/404.html', 'entrypoints/popup/index.html'];

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

  it('defines visible focus and reduced-motion treatments', () => {
    const css = readFileSync('site/src/style.css', 'utf8');
    expect(css).toContain(':focus-visible');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toContain('scroll-behavior: auto');
  });
});
