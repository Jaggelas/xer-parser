import { describe, it, expect } from 'vitest';
import { XER } from '../src';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fixturePath = resolve(__dirname, 'test.xer');

describe('New schemas parse', () => {
  it('PHASE rows load', () => {
    const content = readFileSync(fixturePath, 'utf8');
    const xer = new XER(content);
    expect(xer.phases.length).toBeGreaterThan(0);
    const p = xer.phases[0];
    expect(p.phaseId).toBeTypeOf('number');
    expect(typeof p.phaseName).toBe('string');
  });

  it('APPLYACTOPTIONS row loads and Y/N parsed to boolean', () => {
    const content = readFileSync(fixturePath, 'utf8');
    const xer = new XER(content);
    const aao = xer.applyActOptions.find(r => r.projId === 4533);
    expect(aao).toBeTruthy();
    expect(typeof aao!.respectDurationType).toBe('boolean');
  });

  it('DOCUMENT rows load with Y/N flag -> boolean and date parsed', () => {
    const content = readFileSync(fixturePath, 'utf8');
    const xer = new XER(content);
    const d = xer.documents[0];
    expect(d).toBeTruthy();
    expect(typeof d.delivFlag).toBe('boolean');
    // doc_date present in fixture for first row
    expect(d.docDate?.isValid?.()).toBe(true);
  });
});
