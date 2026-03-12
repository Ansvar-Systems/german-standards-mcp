// __tests__/unit/search-controls.test.ts
import { describe, it, expect } from 'vitest';
import { handleSearchControls } from '../../src/tools/search-controls.js';

describe('handleSearchControls', () => {
  it('finds controls by German term "Informationssicherheit"', () => {
    const result = handleSearchControls({ query: 'Informationssicherheit' });
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz:');
    expect(text).toContain('total_results');
    expect(text).toContain('| ID |');
  });

  it('finds controls by English term "information security"', () => {
    const result = handleSearchControls({ query: 'information security' });
    expect(result.isError).toBeFalsy();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz:');
    expect(text).toContain('total_results');
  });

  it('filters by framework_id', () => {
    const result = handleSearchControls({ query: 'Informationssicherheit', framework_id: 'bsi-grundschutz' });
    expect(result.isError).toBeFalsy();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz:');
    expect(text).not.toContain('bsi-c5:');
  });

  it('returns NO_MATCH for gibberish', () => {
    const result = handleSearchControls({ query: 'xyzzyqqqfoobarblarg' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for empty query', () => {
    const result = handleSearchControls({ query: '' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for missing query', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleSearchControls({});
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('supports pagination with offset', () => {
    const page1 = handleSearchControls({ query: 'Informationssicherheit', limit: 1, offset: 0 });
    const page2 = handleSearchControls({ query: 'Informationssicherheit', limit: 1, offset: 1 });
    expect(page1.isError).toBeFalsy();
    const text1 = page1.content[0].text;
    expect(text1).toContain('total_results');
    const totalMatch = text1.match(/total_results:\s*(\d+)/);
    if (totalMatch && parseInt(totalMatch[1], 10) > 1) {
      expect(page2.isError).toBeFalsy();
      const text2 = page2.content[0].text;
      expect(text1).not.toBe(text2);
    }
  });
});
