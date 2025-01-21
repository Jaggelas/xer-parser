import { optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';

/**
 * Represents an activity code type in the XER schema.
 */
export class ActivityCodeType {
	/**
	 * The XER instance associated with this activity code type.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the activity code type.
	 */
	public actvCodeTypeId: number;

	/**
	 * The short length of the activity code type.
	 */
	public actvShortLen: number;

	/**
	 * The sequence number of the activity code type.
	 */
	public seqNum: number;

	/**
	 * The name of the activity code type.
	 */
	public actvCodeType: string;

	/**
	 * The project ID associated with the activity code type (optional).
	 */
	public projId?: number;

	/**
	 * The WBS ID associated with the activity code type.
	 */
	public wbsId: number;

	/**
	 * The scope of the activity code type.
	 */
	public actvCodeTypeScope: string;

	/**
	 * The export flag indicating whether the activity code type should be exported.
	 */
	public exportFlag: boolean;

	/**
	 * Gets the activity code type instance.
	 */
	public get activityCodeType(): ActivityCodeType {
		return this.xer.activityCodeTypes.find(
			(activityCodeType) =>
				activityCodeType.actvCodeTypeId === this.actvCodeTypeId
		)!;
	}

	/**
	 * Gets the project associated with the activity code type.
	 */
	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}

	/**
	 * Constructs an instance of ActivityCodeType.
	 * @param _xer - The XER instance.
	 * @param header - The header row of the XER file.
	 * @param row - The data row of the XER file.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.actvCodeTypeId = Number(row[header.indexOf('actv_code_type_id')]);
		this.actvShortLen = Number(row[header.indexOf('actv_short_len')]);
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.actvCodeType = row[header.indexOf('actv_code_type')];
		this.projId = optionalNumber(row[header.indexOf('proj_id')]);
		this.wbsId = Number(row[header.indexOf('wbs_id')]);
		this.actvCodeTypeScope = row[header.indexOf('actv_code_type_scope')];
		this.exportFlag = row[header.indexOf('export_flag')] === 'Y';
	}
}
