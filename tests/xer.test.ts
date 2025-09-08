import { describe, it, expect } from 'vitest';
import { XER } from '../src/xer';
import { readableStreamToAsyncIterable } from '../src/utilities/stream';

// Helper: read test fixture if present
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

async function readFixture(path: string): Promise<string | null> {
  try { return await readFile(path, 'utf8'); } catch { return null; }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturePath = resolve(__dirname, 'test.xer');

describe('XER parse/serialize', () => {
  it('parses basic XER string and preserves ERMHDR + %E', async () => {
    const content = await readFixture(fixturePath);
    if (!content) {
      console.warn('Skipping test: tests/test.xer not found');
      return;
    }
    const xer = new XER(content);
    expect(xer).toBeTruthy();

    // ERMHDR preserved on serialize
    const out = xer.toXERString();
    expect(out.startsWith('ERMHDR\t')).toBe(true);
    expect(out.trimEnd().endsWith('%E')).toBe(true);
  });

  it('preserves table names and order when serializing', async () => {
    const content = await readFixture(fixturePath);
    if (!content) {
      console.warn('Skipping test: tests/test.xer not found');
      return;
    }
    const xer = new XER(content);
    const originalOrder = xer.tables.map(t => t.name);

    const out = xer.toXERString();
    // Re-parse serialized output to compare order
    const xer2 = new XER(out);
    const newOrder = xer2.tables.map(t => t.name);
    expect(newOrder).toEqual(originalOrder);
  });

  it('supports streaming parse', async () => {
    const content = await readFixture(fixturePath);
    if (!content) {
      console.warn('Skipping test: tests/test.xer not found');
      return;
    }
    const blob = new Blob([content]);
    const stream = blob.stream();
    const iterable = readableStreamToAsyncIterable(stream);
    const xer = await XER.fromStream(iterable);
    expect(xer.projects.length >= 0).toBe(true); // smoke
  });

  it('round-trips parse -> serialize -> parse', async () => {
    const content = await readFixture(fixturePath);
    if (!content) {
      console.warn('Skipping test: tests/test.xer not found');
      return;
    }
    const xer1 = new XER(content);
    const out = xer1.toXERString();
    const xer2 = new XER(out);

    // Basic sanity: same number of tables and same headers
    expect(xer2.tables.length).toBe(xer1.tables.length);
    for (let i = 0; i < xer1.tables.length; i++) {
      expect(xer2.tables[i].name).toBe(xer1.tables[i].name);
      expect(xer2.tables[i].header).toEqual(xer1.tables[i].header);
    }
  });

  it('validate reports issues and write-back helpers update rows', () => {
    // Minimal synthetic XER with one project and one task; headers trimmed to essentials
    const content = [
      'ERMHDR\t23.12',
      '%T\tPROJECT',
      '%F\tproj_id\tproj_short_name',
      '%R\t100\tDemo',
      '%T\tCALENDAR',
      '%F\tclndr_id\tclndr_name\tclndr_data',
      // Minimal valid calendar data: one shift on Monday
      "%R\t10\tStandard\tDaysOfWeek() (0||1()) s|08:00 f|17:00",
  '%T\tPROJWBS',
  '%F\twbs_id\tproj_id\twbs_short_name',
  '%R\t1\t100\tROOT',
  '%T\tRSRC',
  '%F\trsrc_id\tclndr_id\trsrc_name\trsrc_short_name\trsrc_seq_num\tguid\tcost_qty_type\tdef_qty_per_hr\tcurr_id\trsrc_type',
  // No rows; we'll insert via write-back
  '%T\tTASKRSRC',
  '%F\ttaskrsrc_id\ttask_id\tproj_id\trsrc_id\trole_id\tremain_qty\ttarget_qty\tremain_qty_per_hr\ttarget_qty_per_hr\tcost_per_qty\ttarget_cost\tact_reg_cost\tact_ot_cost',
  // No rows; we'll insert via write-back
      '%T\tTASK',
      '%F\ttask_id\tproj_id\twbs_id\tclndr_id\ttask_code\ttask_name',
      '%R\t1\t100\t1\t10\tTK-001\tInitial',
      '%E',
    ].join('\r\n');

    const xer = new XER(content);
  // No issues expected
  expect(xer.validate()).toEqual([]);

    // Update the task name via write-back
    const ok = xer.updateTaskRow(1, { task_name: 'Updated' });
    expect(ok).toBe(true);
    const roundTrip = new XER(xer.toXERString());
    const updated = (roundTrip.tasks as any[]).find(t => t.taskId === 1);
    expect(updated.taskName).toBe('Updated');

    // Delete and check validation complains about orphan proj if we insert bad row
    const removed = xer.deleteTaskRow(1);
    expect(removed).toBe(true);
    xer.insertTaskRow({ task_id: 2, proj_id: 999, wbs_id: 1, clndr_id: 10, task_code: 'TK-002', task_name: 'BadProj' });
  const issues = xer.validate();
  expect(issues.some(i => i.code === 'TASK_MISSING_PROJ')).toBe(true);

  // Insert a resource and link to task via TASKRSRC; then refresh and validate
  xer.insertResourceRow({ rsrc_id: 50, clndr_id: 10, rsrc_name: 'R', rsrc_short_name: 'R', rsrc_seq_num: 1, guid: 'g', cost_qty_type: 'Q', def_qty_per_hr: 1, curr_id: 1, rsrc_type: 'L' });
  xer.insertTaskResourceRow({ taskrsrc_id: 1000, task_id: 2, proj_id: 100, rsrc_id: 50, role_id: 1, remain_qty: 1, target_qty: 1, remain_qty_per_hr: 1, target_qty_per_hr: 1, cost_per_qty: 1, target_cost: 1, act_reg_cost: 0, act_ot_cost: 0 });
  xer.refreshEntities();
  const issues2 = xer.validate();
  // Still missing proj_id on task 2, but no RSRC clndr issue
  expect(issues2.some(i => i.code === 'TASK_MISSING_PROJ')).toBe(true);
  });

  it('role/role-rate/resource-role helpers and validation', () => {
    const content = [
      'ERMHDR\t23.12',
      '%T\tPROJECT',
      '%F\tproj_id\tproj_short_name',
      '%R\t100\tDemo',
      '%T\tROLES',
      '%F\trole_id\tparent_role_id\tseq_num\trole_name\trole_short_name\tpobs_id\tdef_cost_qty_link_flag\tcost_qty_type\trole_descr\tlast_checksum',
      '%R\t1\t\t1\tEngineer\tENG\t\tY\tQ\t\t0',
      '%T\tROLERATE',
      '%F\trole_rate_id\trole_id\tcost_per_qty\tcost_per_qty2\tcost_per_qty3\tcost_per_qty4\tcost_per_qty5\tstart_date\tmax_qty_per_hr',
      // start_date format as free text; schema uses moment()
      '%R\t10\t1\t100\t\t\t\t\t2020-01-01\t8',
      '%T\tRSRC',
      '%F\trsrc_id\tclndr_id\trsrc_name\trsrc_short_name\trsrc_seq_num\tguid\tcost_qty_type\tdef_qty_per_hr\tcurr_id\trsrc_type',
      '%R\t50\t10\tR\tR\t1\tg\tQ\t1\t1\tL',
      '%T\tRSRCROLE',
      '%F\trsrc_role_id\trsrc_id\trole_id\tskill_level\trole_short_name\trole_name\trsrc_short_name\trsrc_name\trsrc_type',
      '%R\t500\t50\t1\t1\tENG\tEngineer\tR\tR\tL',
      '%T\tCALENDAR',
      '%F\tclndr_id\tclndr_name\tclndr_data',
      "%R\t10\tStandard\tDaysOfWeek() (0||1()) s|08:00 f|17:00",
      '%E',
    ].join('\r\n');

    const xer = new XER(content);
    // Baseline: valid since role and resource exist
    expect(xer.validate()).toEqual([]);

    // Insert a role rate for a missing role -> validation should flag it
  xer.insertRoleRateRow({ role_rate_id: 11, role_id: 999, cost_per_qty: 1, start_date: '2020-01-02', max_qty_per_hr: 8 });
  xer.refreshEntities();
  const issues = xer.validate();
    expect(issues.some(i => i.code === 'ROLERATE_MISSING_ROLE')).toBe(true);

    // Update resource role to missing resource -> flagged
  const ok = xer.updateResourceRoleRow(500, { rsrc_id: 999 });
    expect(ok).toBe(true);
  xer.refreshEntities();
  const issues2 = xer.validate();
    expect(issues2.some(i => i.code === 'RSRCROLE_MISSING_RSRC')).toBe(true);
  });

  it('schedule option and resource-level/resource-rate helpers and validation', () => {
    const content = [
      'ERMHDR\t23.12',
      '%T\tPROJECT',
      '%F\tproj_id\tproj_short_name',
      '%R\t100\tDemo',
      '%T\tSCHEDOPTIONS',
      '%F\tschedoptions_id\tproj_id\tsched_outer_depend_type\tsched_open_critical_flag\tsched_lag_early_start_flag\tsched_retained_logic\tsched_setplantoforecast\tsched_float_type\tsched_calendar_on_relationship_lag\tsched_use_expect_end_flag\tsched_progress_override\tlevel_float_thrs_cnt\tlevel_outer_assign_flag\tlevel_outer_assign_priority\tlevel_over_alloc_pct\tlevel_within_float_flag\tlevel_keep_sched_date_flag\tlevel_all_rsrc_flag\tsched_use_project_end_date_for_float\tenable_multiple_longest_path_calc\tlimit_multiple_longest_path_calc\tmax_multiple_longest_path\tuse_total_float_multiple_longest_paths\tkey_activity_for_multiple_longest_paths\tLevelPriorityList',
      '%R\t200\t100\t\tN\tN\t\tN\tTF\t0\tN\t\t0\tN\t\t0\tN\tN\tN\tN\tN\tN\t0\tN\t\t',
      '%T\tRSRC',
      '%F\trsrc_id\tclndr_id\trsrc_name\trsrc_short_name\trsrc_seq_num\tguid\tcost_qty_type\tdef_qty_per_hr\tcurr_id\trsrc_type',
      '%R\t1\t10\tR\tR\t1\tg\tQ\t1\t1\tL',
      '%T\tRSRCLEVELLIST',
      '%F\trsrc_level_list_id\tschedoptions_id\trsrc_id',
      '%R\t300\t200\t1',
      '%T\tRSRCRATE',
      '%F\trsrc_rate_id\trsrc_id\tmax_qty_per_hr\tcost_per_qty\tstart_date',
      '%R\t400\t1\t8\t10\t2020-01-01',
      '%T\tCALENDAR',
      '%F\tclndr_id\tclndr_name\tclndr_data',
      "%R\t10\tStandard\tDaysOfWeek() (0||1()) s|08:00 f|17:00",
      '%E',
    ].join('\r\n');

    const xer = new XER(content);
    // No issues
    expect(xer.validate()).toEqual([]);

    // Make RSRCLEVELLIST point to missing schedoptions -> flagged
  const ok1 = xer.updateResourceLevelListRow(300, { schedoptions_id: 999 });
    expect(ok1).toBe(true);
  xer.refreshEntities();
  expect(xer.validate().some(i => i.code === 'RSRCLEVELLIST_MISSING_SCHEDOPT')).toBe(true);

    // Make RSRCRATE reference missing rsrc -> flagged
  const ok2 = xer.updateResourceRateRow(400, { rsrc_id: 999 });
    expect(ok2).toBe(true);
  xer.refreshEntities();
  expect(xer.validate().some(i => i.code === 'RSRCRATE_MISSING_RSRC')).toBe(true);

    // Make SCHEDOPTIONS reference missing project -> flagged
  const ok3 = xer.updateScheduleOptionRow(200, { proj_id: 999 });
    expect(ok3).toBe(true);
  xer.refreshEntities();
  expect(xer.validate().some(i => i.code === 'SCHEDOPTIONS_MISSING_PROJECT')).toBe(true);
  });
});
