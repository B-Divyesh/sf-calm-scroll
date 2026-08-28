type DemoState = { stable: boolean; allowMedia: boolean; keepSticky: boolean; late: boolean };
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
const KEY = 'demo:calm-scroll:sample';
const defaults: DemoState = { stable: false, allowMedia: false, keepSticky: false, late: false };
let state: DemoState = { ...defaults };
const get = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function render(persist = true) {
  document.body.classList.toggle('is-stable', state.stable); document.body.classList.toggle('allow-media', state.allowMedia); document.body.classList.toggle('keep-sticky', state.keepSticky);
  const toggle = get<HTMLButtonElement>('stable-toggle'); toggle.setAttribute('aria-checked', String(state.stable)); toggle.textContent = state.stable ? 'Turn off Stable mode' : 'Turn on Stable mode';
  get<HTMLInputElement>('allow-media').disabled = !state.stable; get<HTMLInputElement>('allow-media').checked = state.allowMedia;
  get<HTMLInputElement>('keep-sticky').disabled = !state.stable; get<HTMLInputElement>('keep-sticky').checked = state.keepSticky;
  get('demo-state').textContent = state.stable ? 'Stable mode on' : 'Motion allowed'; get('demo-note').textContent = state.stable ? 'Motion stopped. Turn Stable mode off to restore this sample.' : 'Stable mode is off. The sample is unchanged.';
  get('late-motion').innerHTML = state.late ? '<div class="late-animation">Later animation</div>' : ''; get('animation-count').textContent = String(state.late ? 2 : 1); if (persist) save();
}
try { state = { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { state = { ...defaults }; }
get<HTMLButtonElement>('stable-toggle').addEventListener('click', () => { state.stable = !state.stable; if (!state.stable) { state.allowMedia = false; state.keepSticky = false; } render(); });
get<HTMLInputElement>('allow-media').addEventListener('change', (event) => { state.allowMedia = (event.target as HTMLInputElement).checked; render(); });
get<HTMLInputElement>('keep-sticky').addEventListener('change', (event) => { state.keepSticky = (event.target as HTMLInputElement).checked; render(); });
get<HTMLButtonElement>('add-late-motion').addEventListener('click', () => { state.late = true; render(); });
get<HTMLButtonElement>('reset-demo').addEventListener('click', () => { localStorage.removeItem(KEY); state = { ...defaults }; render(false); get<HTMLButtonElement>('stable-toggle').focus(); });
render();
