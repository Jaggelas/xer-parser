import { schemaMaps } from '../schemas/file_schemas';
import { SchemaMap } from '../types/schema';
import { Table } from '../types/table';

type ParseResponse = { error: string; tables: null } | { error: null; tables: Table[]; headerLine: string };

export const parse = (xer_file: string): ParseResponse => {
	// Support both LF and CRLF line endings; split rows by tab
	const fileRows: string[][] = xer_file
		.split(/\r?\n/)
		.filter((row) => row.length > 0)
		.map((row) => row.split('\t'));

	let activeSchema: SchemaMap | undefined = undefined;
	let headerLine: string | undefined = undefined;
	let activeTable: Table | undefined = undefined;
	const tables: Table[] = [];

	for (let i = 0; i < fileRows.length; i++) {
		const element = fileRows[i];

		// Identify schema/version header // Always first row
		if (element[0] === 'ERMHDR') {
			const version = parseFloat(element[1]);
			activeSchema = schemaMaps.find((sm) => sm.version === version);
			headerLine = element.join('\t');
			// If schema is unsupported, abort parsing early with a clear error
			if (!activeSchema) {
				return { error: `Unsupported XER version: ${version}`, tables: null };
			}
			continue;
		}

		// Skip until we have a known schema header
		if (!activeSchema) {
			continue;
		}

		// Identify start of a new table
		if (element[0] === '%T') {
			if (activeTable) {
				tables.push(activeTable);
			}
			activeTable = { name: element[1], header: [], rows: [] };
			continue;
		}

		if (!activeTable) {
			continue;
		}

		// Header row
		if (element[0] === '%F') {
			activeTable.header = element.slice(1);
			continue;
		}

		// Data row
		if (element[0] === '%R') {
			activeTable.rows.push(element.slice(1));
			continue;
		}

		// Final line indicating last line of file
		if (element[0] === '%E') {

			continue;
		}
	}

	// Push the final table if present
	if (activeTable) {
		tables.push(activeTable);
	}

	return { error: null, tables, headerLine: headerLine ?? 'ERMHDR\t0' };
};

/**
 * Streaming parser: consumes an AsyncIterable of string or Uint8Array chunks and parses incrementally.
 * This avoids materializing the entire file content in memory.
 */
export const parseStream = async (
	input: AsyncIterable<string | Uint8Array>
): Promise<ParseResponse> => {
	const decoder = new TextDecoder();
	let leftover = '';

	let activeSchema: SchemaMap | undefined = undefined;
	let headerLine: string | undefined = undefined;
	let activeTable: Table | undefined = undefined;
	const tables: Table[] = [];

	const processLine = (line: string) => {
		const element = line.split('\t');

		if (element[0] === 'ERMHDR') {
			const version = parseFloat(element[1]);
			activeSchema = schemaMaps.find((sm) => sm.version === version);
			headerLine = line; // preserve original ERMHDR line
			return;
		}

		if (!activeSchema) {
			return;
		}

		if (element[0] === '%T') {
			if (activeTable) tables.push(activeTable);
			activeTable = { name: element[1], header: [], rows: [] };
			return;
		}

		if (!activeTable) return;

		if (element[0] === '%F') {
			activeTable.header = element.slice(1);
			return;
		}

		if (element[0] === '%R') {
			activeTable.rows.push(element.slice(1));
			return;
		}
	};

	for await (const chunk of input) {
		const text = typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
		leftover += text;
		let idx: number;
		// Process all full lines in the buffer (support both \n and \r\n)
		while ((idx = leftover.search(/\r?\n/)) !== -1) {
			const line = leftover.slice(0, idx);
			// Remove line + its newline (1 or 2 chars)
			const newlineLength = leftover[idx] === '\r' ? 2 : 1;
			leftover = leftover.slice(idx + newlineLength);
			if (line.length === 0) continue;
			processLine(line);
		}
	}

	// Process any trailing line without a newline
	if (leftover.length > 0) {
		processLine(leftover);
		leftover = '';
	}

	// Finalize
	if (!activeSchema) {
		return { error: 'Unsupported XER version', tables: null };
	}
	if (activeTable) tables.push(activeTable);

	return { error: null, tables, headerLine: headerLine ?? 'ERMHDR\t0' };
};
