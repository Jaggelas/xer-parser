import { describe, it, expect } from 'vitest';
import { XER } from '../src/xer';
import type { ValidationIssue } from '../src/types/validation';

describe('validate() structured output', () => {
  it('returns structured issues with codes and context', () => {
    const content = [
      'ERMHDR\t23.12',
      '%T\tPROJECT',
      '%F\tproj_id\tproj_short_name',
      '%R\t100\tDemo',
      '%T\tTASK',
      '%F\ttask_id\tproj_id\twbs_id\tclndr_id\ttask_code\ttask_name',
      // Referencing missing project 999
      '%R\t1\t999\t1\t10\tTK-1\tBad',
      '%E',
    ].join('\r\n');

    const xer = new XER(content);
  const issues = xer.validate() as ValidationIssue[];

    expect(Array.isArray(issues)).toBe(true);
    expect(issues.length).toBeGreaterThan(0);
    const hasTaskMissingProj = issues.some(i => i.code === 'TASK_MISSING_PROJ' && i.refTable === 'PROJECT');
    expect(hasTaskMissingProj).toBe(true);
  });

  it('autoRefresh option rebuilds entities before validation', () => {
    const content = [
      'ERMHDR\t23.12',
      '%T\tPROJECT',
      '%F\tproj_id\tproj_short_name',
      '%R\t100\tDemo',
      '%T\tTASK',
      '%F\ttask_id\tproj_id\twbs_id\tclndr_id\ttask_code\ttask_name',
      '%R\t1\t999\t1\t10\tTK-1\tBad',
      '%E',
    ].join('\r\n');

    const xer = new XER(content);
  // Insert a project so proj_id 999 becomes valid, but don't call refreshEntities explicitly
    xer.insertRow('PROJECT', { proj_id: 999, proj_short_name: 'Fix' });
  const issues = xer.validate({ autoRefresh: true }) as ValidationIssue[];

    const stillMissingProj = issues.some(i => i.code === 'TASK_MISSING_PROJ');
    expect(stillMissingProj).toBe(false);
  });
});
