import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('product contracts', () => {
  it('keeps demo storage isolated and installs a complete offline shell', () => {
    const source = readFileSync('site/src/main.ts', 'utf8');
    const demo = readFileSync('site/src/demo.ts', 'utf8');
    const worker = readFileSync('public/sw.js', 'utf8');
    expect(demo).toContain("demo:calm-scroll:sample");
    expect(demo).toContain('localStorage.removeItem(KEY)');
    expect(source).toContain("navigator.serviceWorker.register('/sw.js')");
    expect(worker).toContain('async function precacheShell()');
    expect(worker).toContain('html.matchAll');
    expect(worker).toContain('event.waitUntil(precacheShell()');
    expect(worker).toContain('self.clients.claim()');
    expect(worker).not.toContain("cached || caches.match('/')");
  });

  it('injects a stable mode that covers all declared motion sources', () => {
    const source = readFileSync('entrypoints/content.ts', 'utf8');
    expect(source).toContain('animation: none !important');
    expect(source).toContain('scroll-behavior: auto !important');
    expect(source).toContain('transform: none !important');
    expect(source).toContain('media.pause()');
    expect(source).toContain('MutationObserver');
  });

  it('derives the demo report from the same scanner as the extension', () => {
    const demo = readFileSync('site/src/demo.ts', 'utf8');
    const content = readFileSync('entrypoints/content.ts', 'utf8');
    expect(demo).toContain("import { scanDocument } from '../../src/core/scanner'");
    expect(demo).toContain("scanDocument(document, get('sample-browser'))");
    expect(content).toContain('report: scanDocument()');
  });

  it('gives every registered claim exactly one matching tagged test', () => {
    const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string }>;
    const source = readFileSync('tests/e2e/claims.spec.ts', 'utf8');
    const tags = [...source.matchAll(/@claim:([a-z0-9-]+)/g)].map((match) => match[1]);
    expect(new Set(tags).size).toBe(tags.length);
    expect(tags.sort()).toEqual(claims.map((claim) => claim.id).sort());
    for (const claim of claims) expect(claim.test).toBe(`npm run test:claims -- --grep @claim:${claim.id}`);
  });

  it('names every published location for the isolated demo claim', () => {
    const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Array<{ id: string; where: string }>;
    const isolation = claims.find((claim) => claim.id === 'demo-isolation');
    expect(isolation?.where).toContain('Demo banner');
    expect(isolation?.where).toContain('Privacy');
    expect(isolation?.where).toContain('README');
    expect(isolation?.where).toContain('.factory/demo.md');
  });

  it('routes unknown static paths through the designed 404 response', () => {
    const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8')) as Record<string, unknown>;
    expect(config).not.toHaveProperty('navigationFallback');
    expect(config).toHaveProperty('responseOverrides.404.rewrite', '/404.html');
  });

  it('keeps the catalog description verb-first and within 120 characters', () => {
    const description = readFileSync('.factory/catalog-description.txt', 'utf8').trim();
    expect(description.length).toBeLessThanOrEqual(120);
    expect(description).toMatch(/^(Stop|Try|Turn|Keep|Read|Use)\b/);
  });

  it('packages the MIT license with the downloadable extension', () => {
    const source = readFileSync('scripts/package-extension.mjs', 'utf8');
    expect(source).toContain("copyFile('LICENSE', 'dist/extension/chrome-mv3/LICENSE')");
    expect(source).toContain("{ path: 'LICENSE', name: 'LICENSE' }");
  });
});
