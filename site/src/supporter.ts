export {};

type CachedVerdict = { valid: boolean; checkedAt: number; token: string };

const locked = document.querySelector<HTMLElement>('#supporter-locked');
const guide = document.querySelector<HTMLElement>('#supporter-guide');

function show(unlocked: boolean): void {
  if (locked) locked.hidden = unlocked;
  if (guide) guide.hidden = !unlocked;
}

try {
  const raw = localStorage.getItem('sb_license:calm-scroll:verdict');
  const cached = raw ? JSON.parse(raw) as CachedVerdict : undefined;
  show(Boolean(cached?.valid));
} catch {
  show(false);
}

document.addEventListener('calm-license', (event) => {
  show(Boolean((event as CustomEvent<{ unlocked: boolean }>).detail.unlocked));
});

document.querySelector('#print-guide')?.addEventListener('click', () => window.print());
