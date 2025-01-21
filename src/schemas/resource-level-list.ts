import { XER } from '../xer';

/**
 * Represents a resource level list in XER format.
 * This class handles resource level information from XER file data.
 *
 * @class
 * @property {XER} xer - The parent XER object containing this resource level list
 * @property {number} rsrcLevelListId - Unique identifier for the resource level list
 * @property {number} schedoptionsId - Associated schedule options identifier
 * @property {number} rsrcId - Resource identifier this level list belongs to
 */
export class ResourceLevelList {
	public xer: XER;
	public rsrcLevelListId: number;
	public schedoptionsId: number;
	public rsrcId: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.rsrcLevelListId = Number(
			row[header.indexOf('rsrc_level_list_id')]
		);
		this.schedoptionsId = Number(row[header.indexOf('schedoptions_id')]);
		this.rsrcId = Number(row[header.indexOf('rsrc_id')]);
	}
}
