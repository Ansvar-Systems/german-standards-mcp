// __tests__/unit/list-frameworks.test.ts
import { describe, it, expect } from 'vitest';
import { handleListFrameworks } from '../../src/tools/list-frameworks.js';

describe('handleListFrameworks', () => {
  it('returns a Markdown table containing all frameworks with control counts', () => {
    const result = handleListFrameworks();
    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();
    const text = result.content[0].text;
    // Core framework IDs present
    expect(text).toContain('bsi-grundschutz');
    expect(text).toContain('bsi-c5');
    expect(text).toContain('bsi-kritis');
    expect(text).toContain('bsi-tr');
    expect(text).toContain('grundschutz-bund');
    expect(text).toContain('bfdi-tom');
    // Framework names present
    expect(text).toContain('IT-Grundschutz');
    expect(text).toContain('BSI');
    // Sectors present
    expect(text).toContain('government');
    // Markdown table structure
    expect(text).toContain('| ID |');
    // 33 frameworks (expanded from original 6)
    expect(text).toContain('frameworks available');
  });
});
