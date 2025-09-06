import { Table } from '../types/table';

/**
 * Serialize XER tables back into a .xer file string.
 * Emits ERMHDR and then each table with %T, %F, and %R rows in the order provided.
 * Finally emits %E at the end of the file.
 *
 * Note: version defaults to 23.12; pass a different value if needed.
 */
export function serializeXER(
  tables: Table[],
  options?: { headerLine?: string; version?: number; lineEnding?: '\\r\\n' | '\\n' }
): string {
  const version = options?.version ?? 23.12;
  const EOL = options?.lineEnding ?? '\r\n';

  const lines: string[] = [];
  const header = options?.headerLine ?? `ERMHDR\t${version}`;
  lines.push(header);

  // Preserve table and column order as provided in `tables` (same as source by default)
  for (const table of tables) {
    lines.push(`%T\t${table.name}`);
    lines.push(['%F', ...table.header].join('\t'));
    for (const row of table.rows) {
      lines.push(['%R', ...row].join('\t'));
    }
  }
  // End of file marker
  lines.push('%E');

  return lines.join(EOL) + EOL; // file ends with newline
}
