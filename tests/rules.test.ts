import { describe, expect, it } from 'vitest';
import { countEnabledSites, exportRules, importRules, normalizeHostname, ruleFor, updateRule } from '../src/core/rules';

describe('per-site rules', () => {
  it('normalizes equivalent hostnames without touching subdomains', () => {
    expect(normalizeHostname('https://www.Example.com/reading')).toBe('example.com');
    expect(normalizeHostname('news.example.com')).toBe('news.example.com');
  });

  it('creates a complete rule and preserves later exceptions', () => {
    const enabled = updateRule(undefined, 'https://www.example.com/a', { enabled: true });
    expect(ruleFor(enabled, 'example.com')).toEqual({ enabled: true, allowMedia: false, keepSticky: false });

    const excepted = updateRule(enabled, 'example.com', { allowMedia: true });
    expect(ruleFor(excepted, 'www.example.com')).toEqual({ enabled: true, allowMedia: true, keepSticky: false });
    expect(countEnabledSites(excepted)).toBe(1);
  });

  it('returns a safe disabled default for a new site', () => {
    expect(ruleFor({}, 'new.example')).toEqual({ enabled: false, allowMedia: false, keepSticky: false });
  });

  it('exports and imports local settings with an explicit merge or replace choice', () => {
    const saved = { 'example.com': { enabled: true, allowMedia: false, keepSticky: true } };
    expect(importRules(exportRules(saved), { 'other.example': { enabled: true, allowMedia: false, keepSticky: false } })).toMatchObject(saved);
    expect(importRules(exportRules(saved), { 'other.example': { enabled: true, allowMedia: false, keepSticky: false } }, 'replace')).toEqual(saved);
    expect(() => importRules('{"version":2}')).toThrow('Choose a Calm Scroll settings file.');
  });
});
