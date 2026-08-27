import { beforeEach, describe, expect, it } from 'vitest';
import { scanDocument, totalMotion } from '../src/core/scanner';

describe('motion scanner', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = '<head></head><body></body>';
  });

  it('counts inspectable motion categories', () => {
    document.head.innerHTML = `<style>
      html { scroll-behavior: smooth; }
      .animated { animation-name: pulse; animation-duration: 2s; }
      .shifted { transform: translateX(12px); }
      .sticky { position: sticky; top: 0; }
    </style>`;
    document.body.innerHTML = `
      <video autoplay></video>
      <div class="animated">animated</div>
      <div class="shifted">shifted</div>
      <div class="sticky">sticky</div>`;

    const report = scanDocument(document);
    expect(report.autoplayMedia).toBe(1);
    expect(report.animatedElements).toBeGreaterThanOrEqual(1);
    expect(report.transformedElements).toBe(1);
    expect(report.stickyLayers).toBe(1);
    expect(report.smoothScroll).toBe(true);
    expect(totalMotion(report)).toBeGreaterThanOrEqual(5);
  });

  it('ignores hidden and extension-owned nodes', () => {
    document.body.innerHTML = `
      <div style="display:none; transform:translateX(1px)"></div>
      <div data-calm-scroll-ui style="position:fixed"></div>`;
    expect(totalMotion(scanDocument(document))).toBe(0);
  });
});
