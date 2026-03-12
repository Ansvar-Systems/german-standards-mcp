// __tests__/unit/search-by-sector.test.ts
import { describe, it, expect } from 'vitest';
import { handleSearchBySector } from '../../src/tools/search-by-sector.js';

describe('handleSearchBySector', () => {
  it('government sector returns bsi-grundschutz and grundschutz-bund', () => {
    const result = handleSearchBySector({ sector: 'government' });
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz');
    expect(text).toContain('grundschutz-bund');
  });

  it('energy sector returns bsi-kritis', () => {
    const result = handleSearchBySector({ sector: 'energy' });
    expect(result.isError).toBeFalsy();
    const text = result.content[0].text;
    expect(text).toContain('bsi-kritis');
  });

  it('cloud sector returns bsi-c5', () => {
    const result = handleSearchBySector({ sector: 'cloud' });
    expect(result.isError).toBeFalsy();
    const text = result.content[0].text;
    expect(text).toContain('bsi-c5');
  });

  it('with query param returns matching controls within sector frameworks', () => {
    const result = handleSearchBySector({ sector: 'government', query: 'Informationssicherheit' });
    expect(result.isError).toBeFalsy();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz');
    expect(text).toContain('bsi-grundschutz:');
  });

  it('unknown sector returns INVALID_INPUT', () => {
    const result = handleSearchBySector({ sector: 'unknown-sector-xyz' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('missing/empty sector returns INVALID_INPUT', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleSearchBySector({});
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('empty string sector returns INVALID_INPUT', () => {
    const result = handleSearchBySector({ sector: '' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });
});
