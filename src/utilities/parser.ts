import { schemaMaps } from '../schemas/file_schemas';
import { SchemaMap } from '../types/schema';
import { Table } from '../types/table';

type ParseResponse = { error: string; tables: null } | { error: null; tables: Table[] };

export const parse = (xer_file: string): ParseResponse => {
	// Support both LF and CRLF line endings; split rows by tab
	const fileRows: string[][] = xer_file
		.split(/\r?\n/)
		.filter((row) => row.length > 0)
		.map((row) => row.split('\t'));

	let activeSchema: SchemaMap | undefined = undefined;
	let activeTable: Table | undefined = undefined;
	const tables: Table[] = [];

	for (let i = 0; i < fileRows.length; i++) {
		const element = fileRows[i];

		// Identify schema/version header
		if (element[0] === 'ERMHDR') {
			const version = parseFloat(element[1]);
			activeSchema = schemaMaps.find((sm) => sm.version === version);
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

		if (element[0] === '%F') {
			activeTable.header = element.slice(1);
			continue;
		}

		if (element[0] === '%R') {
			activeTable.rows.push(element.slice(1));
			continue;
		}
	}

	// Push the final table if present
	if (activeTable) {
		tables.push(activeTable);
	}

	return { error: null, tables };
};
