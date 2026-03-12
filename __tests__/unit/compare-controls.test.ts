// __tests__/unit/compare-controls.test.ts
import { describe, it, expect } from 'vitest';
import { handleCompareControls } from '../../src/tools/compare-controls.js';

describe('handleCompareControls', () => {
  it('compares controls across bsi-grundschutz and bsi-c5 for "Informationssicherheit"', () => {
    const result = handleCompareControls({
      query: 'Informationssicherheit',
      framework_ids: ['bsi-grundschutz', 'bsi-c5'],
    });
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz');
    expect(text).toContain('bsi-c5');
    expect(text).toContain('Informationssicherheit');
  });

  it('returns INVALID_INPUT for fewer than 2 frameworks', () => {
    const result = handleCompareControls({
      query: 'Informationssicherheit',
      framework_ids: ['bsi-grundschutz'],
    });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for empty framework_ids array', () => {
    const result = handleCompareControls({
      query: 'Informationssicherheit',
      framework_ids: [],
    });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('returns INVALID_INPUT for more than 4 frameworks', () => {
    const result = handleCompareControls({
      query: 'Informationssicherheit',
      framework_ids: ['bsi-grundschutz', 'bsi-c5', 'bsi-kritis', 'bsi-tr', 'bfdi-tom'],
    });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT when framework_ids is missing', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleCompareControls({ query: 'Informationssicherheit' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('returns INVALID_INPUT when query is missing', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleCompareControls({ framework_ids: ['bsi-grundschutz', 'bsi-c5'] });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });
});
