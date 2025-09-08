import { XER } from '../xer';
import { BaseSchema } from './base-schema';

/**
 * Represents a MemoType in the XER schema.
 */
export class MemoType extends BaseSchema {
	/**
	 * The XER instance associated with this MemoType.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the memo type.
	 */
	public memoTypeId!: number;

	/**
	 * The sequence number of the memo type.
	 */
	public seqNum!: number;

	/**
	 * Flag indicating if the memo type is associated with EPS (Enterprise Project Structure).
	 */
	public epsFlag!: Boolean;

	/**
	 * Flag indicating if the memo type is associated with a project.
	 */
	public projFlag!: Boolean;

	/**
	 * Flag indicating if the memo type is associated with WBS (Work Breakdown Structure).
	 */
	public wbsFlag!: Boolean;

	/**
	 * Flag indicating if the memo type is associated with a task.
	 */
	public taskFlag!: Boolean;

	/**
	 * The description or name of the memo type.
	 */
	public memoType!: string;

	/**
	 * Constructs a new MemoType instance.
	 *
	 * @param _xer - The XER instance to associate with this MemoType.
	 * @param header - The array of header strings from the XER file.
	 * @param row - The array of row strings corresponding to the header.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('MEMOTYPE', header, row);
	}
}
