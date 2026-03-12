// __tests__/unit/get-control.test.ts
import { describe, it, expect } from 'vitest';
import { handleGetControl } from '../../src/tools/get-control.js';

describe('handleGetControl', () => {
  it('returns full control detail for bsi-grundschutz:ISMS.1.A1', () => {
    const result = handleGetControl({ control_id: 'bsi-grundschutz:ISMS.1.A1' });
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    expect(text).toContain('ISMS.1.A1');
    expect(text).toContain('Informationssicherheit');
    expect(text).toContain('IT-Grundschutz');
    expect(text).toContain('ISMS');
    expect(text).toContain('Basis');
    expect(text).toContain('A.5.1');
  });

  it('returns NO_MATCH for bsi-grundschutz:ZZZ.99.A99', () => {
    const result = handleGetControl({ control_id: 'bsi-grundschutz:ZZZ.99.A99' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for missing control_id', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleGetControl({});
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });
});
