import { optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';
import { ActivityCodeType } from './activity-code-type';

/**
 * Represents an activity code in the XER schema.
 */
export class ActivityCode {
	/**
	 * The XER instance associated with this activity code.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the activity code.
	 */
	public actvCodeId: number;

	/**
	 * The unique identifier for the parent activity code, if any.
	 */
	public parentActvCodeId?: number;

	/**
	 * The unique identifier for the activity code type.
	 */
	public actvCodeTypeId: number;

	/**
	 * The name of the activity code.
	 */
	public actvCodeName: string;

	/**
	 * The short name of the activity code.
	 */
	public shortName: string;

	/**
	 * The sequence number of the activity code.
	 */
	public seqNum: number;

	/**
	 * The color associated with the activity code.
	 */
	public color: number;

	/**
	 * The total number of assignments for the activity code.
	 */
	public totalAssignments: number;

	/**
	 * Constructs an instance of ActivityCode.
	 * @param _xer - The XER instance.
	 * @param header - The header row of the XER data.
	 * @param row - The data row corresponding to this activity code.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.actvCodeId = Number(row[header.indexOf('actv_code_id')]);
		this.parentActvCodeId = optionalNumber(
			row[header.indexOf('parent_actv_code_id')]
		);
		this.actvCodeTypeId = Number(row[header.indexOf('actv_code_type_id')]);
		this.actvCodeName = row[header.indexOf('actv_code_name')];
		this.shortName = row[header.indexOf('short_name')];
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.color = Number(row[header.indexOf('color')]);
		this.totalAssignments = Number(
			row[header.indexOf('total_assignments')]
		);
	}

	/**
	 * Gets the parent activity code, if any.
	 * @returns The parent activity code or undefined if there is no parent.
	 */
	public get parentActivityCode(): ActivityCode | undefined {
		return this.xer.activityCodes.find(
			(activityCode) => activityCode.actvCodeId === this.parentActvCodeId
		);
	}

	/**
	 * Gets the activity code type.
	 * @returns The activity code type.
	 */
	public get activityCodeType(): ActivityCodeType {
		return this.xer.activityCodeTypes.find(
			(activityCodeType) =>
				activityCodeType.actvCodeTypeId === this.actvCodeTypeId
		)!;
	}
}
