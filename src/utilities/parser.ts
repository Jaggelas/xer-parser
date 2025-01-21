import {schemaMaps} from '../schemas/file_schemas';
import {SchemaMap} from '../types/schema';
import {Table} from '../types/table';

type ParseResponse = {error: string; tables: null} | {error: null; tables: Table[]};

export const parse = (xer_file: string): ParseResponse => {
	const fileRows: string[][] = xer_file.split('\r\n').map((row) => row.split('\t'));

	let activeSchema: SchemaMap | undefined = undefined;
	let activeTable: Table | undefined = undefined;
	const tables: Table[] = [];

	for (let i = 0; i < fileRows.length; i++) {
		const element = fileRows[i];

		if (element[0] === 'ERMHDR') {
			const version = parseFloat(element[1]);
			activeSchema = schemaMaps.find((sm) => sm.version === version);
		}

		if (activeSchema == null) {
			return {error: 'Unsupported XER version', tables: null};
		}

		if (element[0] === '%T') {
			if (activeTable != null) {
				tables.push(activeTable);
			}
			activeTable = {name: element[1], header: [], rows: []};
		}

		if (activeTable == null) {
			continue;
		}

		if (element[0] === '%F') {
			activeTable.header = element.slice(1);
		}

		if (element[0] === '%R') {
			activeTable.rows.push(element.slice(1));
		}
	}

	return {error: null, tables};
};
