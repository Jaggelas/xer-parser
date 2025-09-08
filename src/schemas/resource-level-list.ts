import { XER } from '../xer';
import { BaseSchema } from './base-schema';

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
export class ResourceLevelList extends BaseSchema {
	/**
	 * Creates an instance of ResourceLevelList.
	 */
	public xer: XER;
	/**
	 * Unique identifier for the resource level list
	 */
	public rsrcLevelListId!: number;
	/**
	 * Associated schedule options identifier
	 */
	public schedoptionsId!: number;
	/**
	 * Resource identifier this level list belongs to
	 */
	public rsrcId!: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('RSRCLEVELLIST', header, row);
	}
}
