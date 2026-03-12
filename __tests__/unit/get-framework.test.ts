// __tests__/unit/get-framework.test.ts
import { describe, it, expect } from 'vitest';
import { handleGetFramework } from '../../src/tools/get-framework.js';

describe('handleGetFramework', () => {
  it('returns framework details for bsi-grundschutz including control count and categories', () => {
    const result = handleGetFramework({ framework_id: 'bsi-grundschutz' });
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    expect(text).toContain('IT-Grundschutz');
    expect(text).toContain('BSI');
    expect(text).toContain('government');
    // Category table
    expect(text).toContain('ISMS');
    expect(text).toContain('ORP');
  });

  it('returns NO_MATCH for unknown framework', () => {
    const result = handleGetFramework({ framework_id: 'nonexistent-fw' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for missing framework_id', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleGetFramework({});
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });
});
