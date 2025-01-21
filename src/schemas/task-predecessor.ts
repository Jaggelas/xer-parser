import { optionalString } from '../utilities/string-convert';
import { XER } from '../xer';
import { Task } from './task';
import { Project } from './project';

/**
 * Represents a predecessor relationship between tasks in a project schedule
 * @class
 * @property {XER} xer - The parent XER object containing all project data
 * @property {number} taskPredId - Unique identifier for the predecessor relationship
 * @property {number} taskId - Identifier of the task that has the predecessor
 * @property {number} predTaskId - Identifier of the predecessor task
 * @property {number} projId - Identifier of the project containing the task
 * @property {number} predProjId - Identifier of the project containing the predecessor task
 * @property {string} predType - Type of predecessor relationship (e.g., Finish-to-Start, Start-to-Start)
 * @property {number} lagHrCnt - Lag time in hours between the predecessor and successor tasks
 * @property {string} [comments] - Optional comments about the predecessor relationship
 * @property {string} floatPath - Float path indicator
 * @property {string} aref - Activity reference
 * @property {string} arls - Activity relationship line style
 */
export class TaskPredecessor {
	public xer: XER;
	public taskPredId: number;
	public taskId: number;
	public predTaskId: number;
	public projId: number;
	public predProjId: number;
	public predType: string;
	public lagHrCnt: number;
	public comments?: string;
	public floatPath: string;
	public aref: string;
	public arls: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.taskPredId = Number(row[header.indexOf('task_pred_id')]);
		this.taskId = Number(row[header.indexOf('task_id')]);
		this.predTaskId = Number(row[header.indexOf('pred_task_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.predProjId = Number(row[header.indexOf('pred_proj_id')]);
		this.predType = row[header.indexOf('pred_type')];
		this.lagHrCnt = Number(row[header.indexOf('lag_hr_cnt')]);
		this.comments = optionalString(row[header.indexOf('comments')]);
		this.floatPath = row[header.indexOf('float_path')];
		this.aref = row[header.indexOf('aref')];
		this.arls = row[header.indexOf('arls')];
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.predProjId
		)!;
	}

	public get task(): Task | undefined {
		return this.xer.tasks.find((task) => task.taskId === this.predTaskId);
	}
}
