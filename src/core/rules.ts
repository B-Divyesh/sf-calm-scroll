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
