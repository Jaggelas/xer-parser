import { XER } from '../src/xer';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import dayjs from '../src/utilities/dayjs';

function bench(label: string, fn: () => void, iters = 1): number {
  const t0 = performance.now();
  for (let i = 0; i < iters; i++) fn();
  const t1 = performance.now();
  const ms = t1 - t0;
  console.log(`${label}: ${(ms).toFixed(2)} ms over ${iters} iters`);
  return ms;
}

function main() {
  const xerPath = resolve(__dirname, '..', 'tests', 'test.xer');
  const content = readFileSync(xerPath, 'utf8');
  const xer = new XER(content);
  const cal = xer.calendars.find(c => !!c.projId) ?? xer.calendars[0];
  if (!cal) throw new Error('No calendar');

  // Pick a stable start
  const start = (cal.lastChngDate ?? xer.projects[0]?.planStartDate) ?? dayjs('2025-01-01');

  // Benchmark addToDate across large additions
  bench('addToDate 1,000h', () => {
    cal.addToDate(start, 1000, 'h');
  }, 100);

  bench('addToDate 10,000h', () => {
    cal.addToDate(start, 10000, 'h');
  }, 20);

  // Benchmark workingHoursBetween across year-ish windows
  bench('workingHoursBetween 180 days', () => {
    cal.workingHoursBetween(start, start.add(180, 'day'));
  }, 50);

  bench('workingHoursBetween 365 days', () => {
    cal.workingHoursBetween(start, start.add(365, 'day'));
  }, 20);
}

main();
