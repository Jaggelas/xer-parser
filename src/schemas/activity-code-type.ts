import { XER } from '../xer';
import { BaseSchema } from './base-schema';
import { Project } from './project';

/**
 * Represents an activity code type in the XER schema.
 */
export class ActivityCodeType extends BaseSchema {
	/**
	 * The XER instance associated with this activity code type.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the activity code type.
	 */
	public actvCodeTypeId!: number;

	/**
	 * The short length of the activity code type.
	 */
	public actvShortLen!: number;

	/**
	 * The sequence number of the activity code type.
	 */
	public seqNum!: number;

	/**
	 * The name of the activity code type.
	 */
	public actvCodeType!: string;

	/**
	 * The project ID associated with the activity code type (optional).
	 */
	public projId?: number;

	/**
	 * The WBS ID associated with the activity code type.
	 */
	public wbsId!: number;

	/**
	 * The scope of the activity code type.
	 */
	public actvCodeTypeScope!: string;

	/**
	 * The export flag indicating whether the activity code type should be exported.
	 */
	public exportFlag!: boolean;

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
		super(_xer);
		this.xer = _xer;
		this.populateFrom('ACTVTYPE', header, row);
	}
}
