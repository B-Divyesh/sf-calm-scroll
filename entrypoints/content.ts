import { browser } from 'wxt/browser';
import { defineContentScript } from 'wxt/utils/define-content-script';
import { scanDocument } from '../src/core/scanner';
import { DEFAULT_RULE, normalizeHostname, ruleFor, type SiteRule, type SiteRules } from '../src/core/rules';
import type { CalmMessage, PopupStatus } from '../src/core/messages';

const STYLE_ID = 'calm-scroll-stable-style';
const TRANSFORM_CLASS = 'calm-scroll-freeze-transform';
const STICKY_CLASS = 'calm-scroll-release-sticky';
const marked = new Set<HTMLElement>();
const mediaAutoplay = new Map<HTMLMediaElement, boolean>();
let activeRule: SiteRule = { ...DEFAULT_RULE };
let observer: MutationObserver | undefined;
let rescanTimer: number | undefined;

const stableCss = `
  :root { scroll-behavior: auto !important; scroll-snap-type: none !important; }
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
  .${TRANSFORM_CLASS} { transform: none !important; translate: none !important; rotate: none !important; scale: none !important; }
  .${STICKY_CLASS} { position: static !important; inset: auto !important; }
`;

function mayFreezeTransform(element: HTMLElement): boolean {
  return !element.matches('button, input, select, textarea, video, audio, svg, [contenteditable="true"], [role="dialog"]') &&
    !element.closest('button, input, select, textarea, video, audio, svg, [contenteditable="true"], [role="dialog"]');
}

function freezeOffenders(): void {
  if (!activeRule.enabled || !document.body) return;

  for (const element of document.querySelectorAll<HTMLElement>('body *')) {
    if (element.closest('[data-calm-scroll-ui]')) continue;
    const style = getComputedStyle(element);
    if (style.transform && style.transform !== 'none' && mayFreezeTransform(element)) {
      element.classList.add(TRANSFORM_CLASS);
      marked.add(element);
    }
    if (!activeRule.keepSticky && (style.position === 'fixed' || style.position === 'sticky')) {
      element.classList.add(STICKY_CLASS);
      marked.add(element);
    }
  }

  if (!activeRule.allowMedia) {
    for (const media of document.querySelectorAll<HTMLMediaElement>('video, audio')) {
      if (!mediaAutoplay.has(media)) mediaAutoplay.set(media, media.autoplay);
      media.autoplay = false;
      media.removeAttribute('autoplay');
      if (!media.paused) media.pause();
    }
  }
}

function clearFrozenState(): void {
  for (const element of marked) element.classList.remove(TRANSFORM_CLASS, STICKY_CLASS);
  marked.clear();
  for (const [media, hadAutoplay] of mediaAutoplay) {
    if (hadAutoplay && media.isConnected) media.autoplay = true;
  }
  mediaAutoplay.clear();
}

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.dataset.calmScrollUi = 'true';
  style.textContent = stableCss;
  (document.head || document.documentElement).append(style);
}

function scheduleFreeze(): void {
  window.clearTimeout(rescanTimer);
  rescanTimer = window.setTimeout(freezeOffenders, 80);
}

function applyRule(rule: SiteRule): void {
  activeRule = rule;
  clearFrozenState();
  document.getElementById(STYLE_ID)?.remove();
  observer?.disconnect();

  if (!rule.enabled) return;
  ensureStyle();
  freezeOffenders();
  observer = new MutationObserver(scheduleFreeze);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'autoplay']
  });
}

function status(): PopupStatus {
  return {
    hostname: normalizeHostname(location.hostname),
    rule: activeRule,
    report: scanDocument()
  };
}

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  runAt: 'document_start',
  async main() {
    const hostname = normalizeHostname(location.hostname);
    const stored = await browser.storage.local.get('siteRules') as { siteRules?: SiteRules };
    activeRule = ruleFor(stored.siteRules, hostname);

    const start = () => applyRule(activeRule);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();

    browser.runtime.onMessage.addListener((message: CalmMessage) => {
      if (message.type === 'CALM_SCROLL_STATUS') return Promise.resolve(status());
      if (message.type === 'CALM_SCROLL_APPLY') {
        applyRule(message.rule);
        return Promise.resolve(status());
      }
      return undefined;
    });

    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes.siteRules) return;
      activeRule = ruleFor(changes.siteRules.newValue as SiteRules | undefined, hostname);
      applyRule(activeRule);
    });
  }
});
