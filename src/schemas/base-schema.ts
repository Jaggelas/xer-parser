import type { XER } from '../xer';
import { schemaMaps } from './file_schemas';
import { matchesVersion, type PropertyType } from '../types/schema';
import { optionalNumber, optionalString, optionalDate } from '../utilities/string-convert';

// PropertyType imported from types/schema

/**
 * BaseSchema: common mapper to populate entity properties from the typed file schema.
 *
 * Usage pattern for a derived schema class:
 *   export class Project extends BaseSchema { 
 *     constructor(xer: XER, header: string[], row: string[]) {
 *       super(xer);
 *       this.populateFrom('PROJECT', header, row);
 *       // Add any custom computed/complex fields here
 *     }
 *   }
 */
export abstract class BaseSchema {
    public xer: XER;

    constructor(xer: XER) {
        this.xer = xer;
    }

    /**
     * Populate this entity from schema mapping for the given table name.
     * - Converts by PropertyType.
     * - Heuristic: for TEXT/OTEXT values equal to 'Y'/'N' and property names ending with 'Flag', converts to boolean.
     * - Optional types (O*) map empty/undefined to undefined via optional helpers.
     */
    protected populateFrom(tableName: string, header: string[], row: string[]): void {
    // Resolve the active schema by matching XER.version (falls back to first schema map)
    const version = (this.xer as any).version as number | undefined ?? 0;
    const active = schemaMaps.find((sm) => matchesVersion(sm.version as any, version)) || schemaMaps[0];
        const table = active.map.find((m) => m.table[0] === tableName);
        if (!table) return;

        for (const [colHeader, prop, type] of table.columns as [string, string, PropertyType][]) {
            const idx = header.indexOf(colHeader);
            if (idx < 0) continue;
            const raw = row[idx];
            let value: any = undefined;

            switch (type) {
                case 'NUMBER':
                    value = Number(raw);
                    break;
                case 'ONUMBER':
                    value = optionalNumber(raw);
                    break;
                case 'DATE':
                    // required date – keep as string if empty to avoid invalid date
                    value = optionalDate(raw);
                    break;
                case 'ODATE':
                    value = optionalDate(raw);
                    break;
                case 'TEXT':
                    value = raw;
                    break;
                case 'OTEXT':
                    value = optionalString(raw);
                    break;
            }

            // Heuristic: Convert Y/N strings to boolean for TEXT/OTEXT.
            // Many XER columns encode booleans as 'Y'/'N' even if not named '*Flag'.
            if ((type === 'TEXT' || type === 'OTEXT') && (raw === 'Y' || raw === 'N')) {
                value = raw === 'Y';
            }

            (this as any)[prop] = value;
        }
    }
}