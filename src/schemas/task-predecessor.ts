import { XER } from '../xer';
import { Task } from './task';
import { Project } from './project';
import { Duration } from '../classes/duration.class';
import { BaseSchema } from './base-schema';

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
export class TaskPredecessor extends BaseSchema {
	/**
	 * The parent XER object containing all project data
	 */
	public xer: XER;
	/**
	 * Unique identifier for the predecessor relationship
	 */
	public taskPredId!: number;
	/**
	 * Identifier of the task that has the predecessor
	 */
	public taskId!: number;
	/**
	 * Identifier of the predecessor task
	 */
	public predTaskId!: number;
	/**
	 * Identifier of the project containing the task
	 */
	public projId!: number;
	/**
	 * Identifier of the project containing the predecessor task
	 */
	public predProjId!: number;
	/**
	 * Type of predecessor relationship (e.g., Finish-to-Start, Start-to-Start)
	 */
	public predType!: string;
	/**
	 * Lag time in hours between the predecessor and successor tasks
	 */
	public lag!: Duration;
	/**
	 * Optional comments about the predecessor relationship
	 */
	public comments?: string;
	/**
	 * Float path indicator
	 */
	public floatPath!: string;
	/**
	 * Activity reference
	 */
	public aref!: string;
	/**
	 * Activity relationship line style
	 */
	public arls!: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('TASKPRED', header, row);
		this.lag = new Duration(
			row[header.indexOf('lag_hr_cnt')],
			this.project.calendar,
			'h'
		);
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}

	public get task(): Task | undefined {
		return this.xer.tasks.find((task) => task.taskId === this.predTaskId);
	}
}
