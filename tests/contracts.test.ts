import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('product contracts', () => {
  it('keeps license verification non-blocking and product-scoped', () => {
    const source = readFileSync('site/src/main.ts', 'utf8');
    expect(source).toContain("sb_license:${PRODUCT}");
    expect(source).toContain('/verify?license=');
    expect(source).toContain('history.replaceState');
    expect(source).toContain('24 * 60 * 60 * 1000');
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
