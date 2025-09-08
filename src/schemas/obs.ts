import { XER } from '../xer';
import { BaseSchema } from './base-schema';

/**
 * Represents an OBS (Organizational Breakdown Structure) entity.
 */
export class OBS extends BaseSchema {
	/**
	 * The XER instance associated with this OBS.
	 */
	public xer: XER;

	/**
	 * The unique identifier for this OBS.
	 */
	public obsId!: number;

	/**
	 * The unique identifier for the parent OBS.
	 */
	public parentObsId!: number;

	/**
	 * The globally unique identifier (GUID) for this OBS.
	 */
	public guid!: string;

	/**
	 * The sequence number of this OBS.
	 */
	public seqNum!: number;

	/**
	 * The name of this OBS.
	 */
	public obsName!: string;

	/**
	 * The description of this OBS.
	 */
	public obsDescr!: string;

	/**
	 * Creates an instance of OBS.
	 * @param _xer - The XER instance associated with this OBS.
	 * @param header - The array of header strings.
	 * @param row - The array of row strings corresponding to the header.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('OBS', header, row);
	}
}
