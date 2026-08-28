export type SiteRule = {
  enabled: boolean;
  allowMedia: boolean;
  keepSticky: boolean;
};

export type SiteRules = Record<string, SiteRule>;

export const DEFAULT_RULE: SiteRule = {
  enabled: false,
  allowMedia: false,
  keepSticky: false
};

export function normalizeHostname(input: string): string {
  try {
    return new URL(input).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return input.toLowerCase().replace(/^www\./, '');
  }
}

export function ruleFor(rules: SiteRules | undefined, hostname: string): SiteRule {
  return { ...DEFAULT_RULE, ...(rules?.[normalizeHostname(hostname)] ?? {}) };
}

export function updateRule(rules: SiteRules | undefined, hostname: string, patch: Partial<SiteRule>): SiteRules {
  const key = normalizeHostname(hostname);
  return {
    ...(rules ?? {}),
    [key]: { ...ruleFor(rules, key), ...patch }
  };
}

export function countEnabledSites(rules: SiteRules | undefined): number {
  return Object.values(rules ?? {}).filter((rule) => rule.enabled).length;
}

export function exportRules(rules: SiteRules | undefined): string {
  return JSON.stringify({ version: 1, siteRules: rules ?? {} }, null, 2);
}

export function importRules(value: string, existing: SiteRules = {}, mode: 'merge' | 'replace' = 'merge'): SiteRules {
  const parsed = JSON.parse(value) as { version?: unknown; siteRules?: unknown };
  if (parsed.version !== 1 || !parsed.siteRules || typeof parsed.siteRules !== 'object' || Array.isArray(parsed.siteRules)) throw new Error('Choose a Calm Scroll settings file.');
  const incoming: SiteRules = {};
  for (const [hostname, rule] of Object.entries(parsed.siteRules as Record<string, unknown>)) {
    if (!rule || typeof rule !== 'object') throw new Error('A saved site setting is not valid.');
    const value = rule as Partial<SiteRule>;
    if (typeof value.enabled !== 'boolean' || typeof value.allowMedia !== 'boolean' || typeof value.keepSticky !== 'boolean') throw new Error('A saved site setting is incomplete.');
    incoming[normalizeHostname(hostname)] = { enabled: value.enabled, allowMedia: value.allowMedia, keepSticky: value.keepSticky };
  }
  return mode === 'replace' ? incoming : { ...existing, ...incoming };
}
