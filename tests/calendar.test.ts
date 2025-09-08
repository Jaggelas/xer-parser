import { describe, it, expect } from 'vitest';
import { XER } from '../src/xer';

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturePath = resolve(__dirname, 'test.xer');

async function readFixture(path: string): Promise<string | null> {
  try { return await readFile(path, 'utf8'); } catch { return null; }
}

describe('Calendar utilities', () => {
  it('isWorkingDay / getWorkingShifts / workingHoursBetween basic behaviors', async () => {
    const content = await readFixture(fixturePath);
    if (!content) {
      console.warn('Skipping test: tests/test.xer not found');
      return;
    }
    const xer = new XER(content);

    // Choose a project calendar if available; else the first calendar
    const cal = xer.calendars.find(c => !!c.projId) ?? xer.calendars[0];
    expect(cal).toBeTruthy();

    // Find any planned working day by scanning forward from project start-like dates
    const base = cal.lastChngDate ?? (xer.projects[0]?.planStartDate ?? xer.projects[0]?.fcstStartDate ?? undefined);
    expect(base).toBeTruthy();
    if (!base) return;

    const d0 = base.clone().startOf('day');
    // Probe next few days for a working day
    let probe = d0.clone();
    let foundDay: typeof probe | null = null;
    for (let i = 0; i < 14; i++) {
      if (cal.isWorkingDay(probe)) { foundDay = probe.clone(); break; }
      probe = probe.add(1, 'day');
    }
    expect(foundDay).toBeTruthy();
    if (!foundDay) return;

    const shifts = cal.getWorkingShifts(foundDay.clone());
    expect(Array.isArray(shifts)).toBe(true);

    // If there are shifts, the day should be working.
    if (shifts.length > 0) {
      expect(cal.isWorkingDay(foundDay.clone())).toBe(true);

      // Sum of shift hours equals workingHoursBetween for that day
  const startOfDay = shifts[0].start.clone().startOf('day');
      const endOfDay = startOfDay.clone().endOf('day');
      const wh = cal.workingHoursBetween(startOfDay, endOfDay, 'hour');
      const sum = shifts.reduce((acc, s) => acc + s.end.diff(s.start, 'hours'), 0);
      // allow small FP drift: use close comparison
      expect(Math.abs(wh - sum)).toBeLessThan(0.01);
    }
  });

  it('clampToWorking snaps to valid instants', async () => {
    const content = await readFixture(fixturePath);
    if (!content) {
      console.warn('Skipping test: tests/test.xer not found');
      return;
    }
    const xer = new XER(content);
    const cal = xer.calendars.find(c => !!c.projId) ?? xer.calendars[0];
    expect(cal).toBeTruthy();

    // Pick a midnight which is often outside shifts, then clamp
    const anyDate = (cal.lastChngDate ?? xer.projects[0]?.planStartDate ?? undefined);
    expect(anyDate).toBeTruthy();
    if (!anyDate) return;
    const midnight = anyDate.clone().startOf('day');

    const clampedStart = cal.clampToWorking(midnight, 'start');
    expect(cal.isWorkingHour(clampedStart)).toBe(true);

  const clampedEnd = cal.clampToWorking(midnight, 'end');
  // 'end' may snap to the last working instant of the previous day, which could be outside current day hours
  // Ensure it is either a working instant or equals a shift boundary
  const isWorking = cal.isWorkingHour(clampedEnd);
  const prevShifts = cal.getWorkingShifts(clampedEnd.clone());
  const onBoundary = prevShifts.some(s => s.end.isSame(clampedEnd) || s.start.isSame(clampedEnd));
  expect(isWorking || onBoundary).toBe(true);
  });
});
