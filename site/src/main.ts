export {};

const PRODUCT = 'calm-scroll';
const API_BASE = 'https://api.sociobot.in/api/v1';
const LICENSE_KEY = `sb_license:${PRODUCT}`;
const VERDICT_KEY = `${LICENSE_KEY}:verdict`;
const DAY = 24 * 60 * 60 * 1000;

type Verdict = { valid: boolean; reason: string; expires_at?: string | null };
type CachedVerdict = Verdict & { checkedAt: number; token: string };

const form = document.querySelector<HTMLFormElement>('#license-form');
const input = document.querySelector<HTMLInputElement>('#license-token');
const status = document.querySelector<HTMLElement>('#license-status');
const unlock = document.querySelector<HTMLElement>('#supporter-unlock');

function setStatus(message: string, state: 'quiet' | 'good' | 'bad' = 'quiet'): void {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

function setUnlocked(isUnlocked: boolean): void {
  if (unlock) unlock.hidden = !isUnlocked;
  document.documentElement.dataset.supporter = String(isUnlocked);
  document.dispatchEvent(new CustomEvent('calm-license', { detail: { unlocked: isUnlocked } }));
}

function readCachedVerdict(): CachedVerdict | undefined {
  try {
    const value = localStorage.getItem(VERDICT_KEY);
    return value ? JSON.parse(value) as CachedVerdict : undefined;
  } catch {
    return undefined;
  }
}

async function verifyLicense(token: string, force = false): Promise<void> {
  const cached = readCachedVerdict();
  const fresh = cached && cached.token === token && Date.now() - cached.checkedAt < DAY;
  if (fresh && !force) {
    setUnlocked(cached.valid);
    setStatus(cached.valid ? 'Supporter license active.' : 'This license is no longer active.', cached.valid ? 'good' : 'bad');
    return;
  }

  if (cached?.token === token && cached.valid) setUnlocked(true);
  setStatus(navigator.onLine ? 'Checking the stored license…' : 'Offline. Using the last saved license status.');
  if (!navigator.onLine) return;

  try {
    const response = await fetch(`${API_BASE}/products/${PRODUCT}/verify?license=${encodeURIComponent(token)}`, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('verification unavailable');
    const verdict = await response.json() as Verdict;
    const next: CachedVerdict = { ...verdict, token, checkedAt: Date.now() };
    localStorage.setItem(VERDICT_KEY, JSON.stringify(next));
    setUnlocked(verdict.valid);
    if (verdict.valid) setStatus('Supporter license active.', 'good');
    else setStatus('License no longer active. Check the token or purchase again.', 'bad');
  } catch {
    setStatus('License check is temporarily unavailable. The free extension still works; try again when online.');
  }
}

function captureReturnedLicense(): string | null {
  const url = new URL(location.href);
  const returned = url.searchParams.get('license');
  if (!returned) return localStorage.getItem(LICENSE_KEY);
  localStorage.setItem(LICENSE_KEY, returned.trim());
  url.searchParams.delete('license');
  history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  return returned.trim();
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const token = input?.value.trim() ?? '';
  if (!token) {
    input?.setAttribute('aria-invalid', 'true');
    setStatus('Paste the license token from your receipt, then choose Restore.', 'bad');
    input?.focus();
    return;
  }
  input?.removeAttribute('aria-invalid');
  localStorage.setItem(LICENSE_KEY, token);
  void verifyLicense(token, true);
});

window.addEventListener('online', () => {
  const token = localStorage.getItem(LICENSE_KEY);
  if (token) void verifyLicense(token);
});

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));

const storedToken = captureReturnedLicense();
if (storedToken) void verifyLicense(storedToken);
