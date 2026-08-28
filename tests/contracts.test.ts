import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('product contracts', () => {
  it('keeps demo storage isolated and registers offline support', () => {
    const source = readFileSync('site/src/main.ts', 'utf8');
    const demo = readFileSync('site/src/demo.ts', 'utf8');
    expect(demo).toContain("demo:calm-scroll:sample");
    expect(demo).toContain('localStorage.removeItem(KEY)');
    expect(source).toContain("navigator.serviceWorker.register('/sw.js')");
  });

  it('injects a stable mode that covers all declared motion sources', () => {
    const source = readFileSync('entrypoints/content.ts', 'utf8');
    expect(source).toContain('animation: none !important');
    expect(source).toContain('scroll-behavior: auto !important');
    expect(source).toContain('transform: none !important');
    expect(source).toContain('media.pause()');
    expect(source).toContain('MutationObserver');
  });
});
