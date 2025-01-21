import { XER } from '../xer';
import { Task } from './task';
import { ActivityCodeType } from './activity-code-type';
import { ActivityCode } from './activity-code';

/**
 * Represents a task activity code relationship in a XER file.
 * Links tasks with activity codes and their types within a project.
 *
 * @class TaskActivityCode
 * @property {XER} xer - The parent XER instance containing all data
 * @property {number} taskId - The unique identifier of the associated task
 * @property {number} actvCodeTypeId - The unique identifier of the activity code type
 * @property {number} actvCodeId - The unique identifier of the activity code
 * @property {number} projId - The unique identifier of the project
 *
 * @property {ActivityCodeType} activityCodeType - Gets the associated activity code type object
 * @property {ActivityCode} activityCode - Gets the associated activity code object
 * @property {Task} task - Gets the associated task object
 */
export class TaskActivityCode {
	public xer: XER;
	public taskId: number;
	public actvCodeTypeId: number;
	public actvCodeId: number;
	public projId: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.taskId = Number(row[header.indexOf('task_id')]);
		this.actvCodeTypeId = Number(row[header.indexOf('actv_code_type_id')]);
		this.actvCodeId = Number(row[header.indexOf('actv_code_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
	}

	public get activityCodeType(): ActivityCodeType {
		return this.xer.activityCodeTypes.find(
			(activityCodeType) =>
				activityCodeType.actvCodeTypeId === this.actvCodeTypeId
		)!;
	}

	public get activityCode(): ActivityCode {
		return this.xer.activityCodes.find(
			(activityCode) => activityCode.actvCodeId === this.actvCodeId
		)!;
	}

	public get task(): Task {
		return this.xer.tasks.find((task) => task.taskId === this.taskId)!;
	}
}
