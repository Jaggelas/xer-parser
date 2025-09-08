// Utilities for working with XER table headers efficiently and safely
import type { Table } from '../types/table';

// Cache header -> index map using WeakMap to avoid leaks. Key is the header array reference.
const headerIndexCache = new WeakMap<string[], Map<string, number>>();

/**
 * Build or retrieve a cached column index map for a given header array.
 */
export function getHeaderIndexMap(header: string[]): Map<string, number> {
  let map = headerIndexCache.get(header);
  if (!map) {
    map = new Map<string, number>();
    for (let i = 0; i < header.length; i++) {
      map.set(header[i], i);
    }
    headerIndexCache.set(header, map);
  }
  return map;
}

/**
 * Get the index for a column name, or -1 if not found.
 */
export function getColumnIndex(header: string[], column: string): number {
  const map = getHeaderIndexMap(header);
  return map.get(column) ?? -1;
}

/**
 * Read a cell value by column name; returns undefined if column missing.
 */
export function getCell(header: string[], row: string[], column: string): string | undefined {
  const idx = getColumnIndex(header, column);
  if (idx < 0) return undefined;
  return row[idx];
}

/**
 * Set a cell value by column name on a row; returns false if column missing.
 */
export function setCell(header: string[], row: string[], column: string, value: string | number | null | undefined): boolean {
  const idx = getColumnIndex(header, column);
  if (idx < 0) return false;
  row[idx] = value == null ? '' : String(value);
  return true;
}

/**
 * Find a row in a table by matching a specific column value (as string comparison).
 * Returns the row and its index, or undefined if not found.
 */
export function findRowByColumn(table: Table, column: string, matchValue: string | number): { row: string[]; index: number } | undefined {
  const idx = getColumnIndex(table.header, column);
  if (idx < 0) return undefined;
  const target = String(matchValue);
  for (let i = 0; i < table.rows.length; i++) {
    if (String(table.rows[i][idx]) === target) return { row: table.rows[i], index: i };
  }
  return undefined;
}

/**
 * Create a Proxy around a header array that overrides indexOf to use the cached header index map.
 * This lets existing schema constructors keep using header.indexOf() but get O(1) lookups.
 */
export function createHeaderProxy(header: string[]): string[] {
  const map = getHeaderIndexMap(header);
  const proxy = new Proxy(header, {
    get(target, prop, receiver) {
      if (prop === 'indexOf') {
        return (name: string) => map.get(name) ?? -1;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  return proxy as unknown as string[];
}
