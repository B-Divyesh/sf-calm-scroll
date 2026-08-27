import { browser } from 'wxt/browser';
import type { PopupStatus } from '../../src/core/messages';
import { totalMotion } from '../../src/core/scanner';
import { ruleFor, updateRule, type SiteRule, type SiteRules } from '../../src/core/rules';

const get = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const loading = get<HTMLElement>('loading');
const error = get<HTMLElement>('error');
const controls = get<HTMLElement>('controls');
const stableToggle = get<HTMLButtonElement>('stable-toggle');
const allowMedia = get<HTMLInputElement>('allow-media');
const keepSticky = get<HTMLInputElement>('keep-sticky');
const exceptions = get<HTMLFieldSetElement>('exceptions');
let tabId: number | undefined;
let current: PopupStatus | undefined;

function render(status: PopupStatus): void {
  current = status;
  loading.hidden = true;
  error.hidden = true;
  controls.hidden = false;
  get('hostname').textContent = status.hostname;

  stableToggle.setAttribute('aria-checked', String(status.rule.enabled));
  stableToggle.querySelector('.toggle-label')!.textContent = status.rule.enabled ? 'Turn off' : 'Turn on';
  get('stable-description').textContent = status.rule.enabled
    ? 'Page motion is being held still on this site.'
    : 'Motion is allowed on this site.';
  exceptions.disabled = !status.rule.enabled;
  allowMedia.checked = status.rule.allowMedia;
  keepSticky.checked = status.rule.keepSticky;

  get('autoplay-count').textContent = String(status.report.autoplayMedia);
  get('animation-count').textContent = String(status.report.animatedElements);
  get('transform-count').textContent = String(status.report.transformedElements);
  get('sticky-count').textContent = String(status.report.stickyLayers);
  get('smooth-count').textContent = status.report.smoothScroll ? 'Yes' : 'No';
  const total = totalMotion(status.report);
  get('motion-total').textContent = String(total);
  get('empty-report').hidden = total !== 0;
  get('report-list').hidden = total === 0;
}

function showError(detail?: string): void {
  loading.hidden = true;
  controls.hidden = true;
  error.hidden = false;
  if (detail) get('error-detail').textContent = detail;
}

async function inspect(): Promise<void> {
  try {
    const tabs = await browser.tabs.query({ currentWindow: true });
    const tab = tabs.find((candidate) => candidate.active && candidate.url?.startsWith('http'))
      ?? tabs.find((candidate) => candidate.url?.startsWith('http'));
    if (!tab?.id || !tab.url?.startsWith('http')) throw new Error('Open an ordinary http or https page, then try again.');
    tabId = tab.id;
    const response = await browser.tabs.sendMessage(tab.id, { type: 'CALM_SCROLL_STATUS' }) as PopupStatus;
    render(response);
  } catch (reason) {
    const detail = reason instanceof Error && reason.message.includes('ordinary') ? reason.message : undefined;
    showError(detail);
  }
}

async function saveAndApply(patch: Partial<SiteRule>): Promise<void> {
  if (!current || tabId === undefined) return;
  stableToggle.disabled = true;
  try {
    const stored = await browser.storage.local.get('siteRules') as { siteRules?: SiteRules };
    const siteRules = updateRule(stored.siteRules, current.hostname, patch);
    const rule = ruleFor(siteRules, current.hostname);
    await browser.storage.local.set({ siteRules });
    const response = await browser.tabs.sendMessage(tabId, { type: 'CALM_SCROLL_APPLY', rule }) as PopupStatus;
    render(response);
    get('saved-message').textContent = rule.enabled ? `Saved for ${current.hostname}.` : `Stable mode off for ${current.hostname}.`;
  } catch {
    showError('The page changed before the setting could be saved. Reload it and try again.');
  } finally {
    stableToggle.disabled = false;
  }
}

stableToggle.addEventListener('click', () => saveAndApply({ enabled: !current?.rule.enabled }));
allowMedia.addEventListener('change', () => saveAndApply({ allowMedia: allowMedia.checked }));
keepSticky.addEventListener('change', () => saveAndApply({ keepSticky: keepSticky.checked }));
get('retry').addEventListener('click', () => {
  error.hidden = true;
  loading.hidden = false;
  void inspect();
});

void inspect();
