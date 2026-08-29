import { scanDocument } from '../../src/core/scanner';

type DemoState = { stable: boolean; allowMedia: boolean; keepSticky: boolean; late: boolean };
const KEY = 'demo:calm-scroll:sample';
const defaults: DemoState = { stable: true, allowMedia: false, keepSticky: false, late: false };
let state: DemoState = { ...defaults };
document.documentElement.classList.add('demo-document');
const get = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

function sampleReport() {
  const wasStable = state.stable;
  if (wasStable) {
    document.documentElement.classList.remove('stable-document');
    document.body.classList.remove('is-stable');
  }
  const report = scanDocument(document, get('sample-browser'));
  if (wasStable) {
    document.documentElement.classList.add('stable-document');
    document.body.classList.add('is-stable');
  }
  return report;
}

function render(persist = true) {
  document.documentElement.classList.toggle('stable-document', state.stable);
  document.body.classList.toggle('is-stable', state.stable); document.body.classList.toggle('allow-media', state.allowMedia); document.body.classList.toggle('keep-sticky', state.keepSticky);
  const toggle = get<HTMLButtonElement>('stable-toggle'); toggle.setAttribute('aria-checked', String(state.stable)); toggle.textContent = state.stable ? 'Turn off Stable mode' : 'Turn on Stable mode';
  get<HTMLInputElement>('allow-media').disabled = !state.stable; get<HTMLInputElement>('allow-media').checked = state.allowMedia;
  get<HTMLInputElement>('keep-sticky').disabled = !state.stable; get<HTMLInputElement>('keep-sticky').checked = state.keepSticky;
  get('demo-state').textContent = state.stable ? 'Stable mode on' : 'Motion allowed'; get('demo-note').textContent = state.stable ? 'Stable mode is on. Turn it off to restore sample motion.' : 'Stable mode is off. Turn it on to steady this sample.';
  get('late-motion').innerHTML = state.late ? '<div class="late-animation">Later animation</div>' : '';
  const report = sampleReport();
  get('autoplay-count').textContent = String(report.autoplayMedia);
  get('animation-count').textContent = String(report.animatedElements);
  get('transform-count').textContent = String(report.transformedElements);
  get('sticky-count').textContent = String(report.stickyLayers);
  get('smooth-count').textContent = report.smoothScroll ? 'Yes' : 'No';
  if (persist) save();
}
try { state = { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { state = { ...defaults }; }
get<HTMLButtonElement>('stable-toggle').addEventListener('click', () => { state.stable = !state.stable; if (!state.stable) { state.allowMedia = false; state.keepSticky = false; } render(); });
get<HTMLInputElement>('allow-media').addEventListener('change', (event) => { state.allowMedia = (event.target as HTMLInputElement).checked; render(); });
get<HTMLInputElement>('keep-sticky').addEventListener('change', (event) => { state.keepSticky = (event.target as HTMLInputElement).checked; render(); });
get<HTMLButtonElement>('add-late-motion').addEventListener('click', () => { state.late = true; render(); });
get<HTMLButtonElement>('reset-demo').addEventListener('click', () => { localStorage.removeItem(KEY); state = { ...defaults }; render(false); get<HTMLButtonElement>('stable-toggle').focus(); });
document.querySelector<HTMLAnchorElement>('.demo-banner a[href="/"]')?.addEventListener('click', () => localStorage.removeItem(KEY));
render();
