// __tests__/unit/list-controls.test.ts
import { describe, it, expect } from 'vitest';
import { handleListControls } from '../../src/tools/list-controls.js';

describe('handleListControls', () => {
  it('lists all controls for bsi-grundschutz with total_results count', () => {
    const result = handleListControls({ framework_id: 'bsi-grundschutz' });
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    expect(text).toContain('total_results:');
    expect(text).toContain('bsi-grundschutz:ISMS.1.A1');
    expect(text).toContain('| ID |');
  });

  it('filters controls by category', () => {
    const result = handleListControls({ framework_id: 'bsi-grundschutz', category: 'ISMS' });
    expect(result.isError).toBeFalsy();
    const text = result.content[0].text;
    expect(text).toContain('bsi-grundschutz:ISMS.1.A1');
    expect(text).not.toContain('bsi-grundschutz:ORP');
  });

  it('returns INVALID_INPUT for missing framework_id', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleListControls({});
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns NO_MATCH for unknown framework', () => {
    const result = handleListControls({ framework_id: 'nonexistent-framework' });
    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('paginates results via limit and offset', () => {
    const page1 = handleListControls({ framework_id: 'bsi-grundschutz', limit: 1, offset: 0 });
    const page2 = handleListControls({ framework_id: 'bsi-grundschutz', limit: 1, offset: 1 });
    expect(page1.isError).toBeFalsy();
    expect(page2.isError).toBeFalsy();
    const text1 = page1.content[0].text;
    const text2 = page2.content[0].text;
    expect(text1).not.toBe(text2);
  });
});
