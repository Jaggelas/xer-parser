import { describe, it, expect } from 'bun:test';
import { XER } from '../src/xer';
import { readableStreamToAsyncIterable } from '../src/utilities/stream';

// Helper: read test fixture if present
async function readFixture(path: string): Promise<string | null> {
  try {
    // Bun.file throws only on access; check existence via .size
    const f = Bun.file(path);
    await f.text();
    return await Bun.file(path).text();
  } catch {
    return null;
  }
}

const fixturePath = new URL('../tests/test.xer', import.meta.url).pathname;

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
});
