import { optionalDate, optionalNumber, optionalString } from '../utilities/string-convert';
import { getColumnIndex } from '../utilities/header';
import { XER } from '../xer';
import { TaskResource } from './task-resource';
import { TaskPredecessor } from './task-predecessor';
import { ProjWBS } from './proj-wbs';
import { TaskMemo } from './task-memo';
import { Calendar } from './calendar';
import { TaskActivityCode } from './task-activity-code';
import { Duration } from '../classes/duration.class';
import { Project } from './project';
import dayjs, { Dayjs } from '../utilities/dayjs';
import { BaseSchema } from './base-schema';


export type TaskType = 'TT_Task' | 'TT_LOE' | 'TT_Mile' | 'TT_Rsrc' | 'TT_FinMile';

export type TaskStatusCode = 'TK_Complete' | 'TK_Active' | 'TK_NotStart';

/**
 * Represents a Task entity from an XER file.
 * This class contains all task-related information including dates, resource allocations, and relationships.
 */
export class Task extends BaseSchema {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the task
	 */
	public taskId!: number;
	/**
	 * Project identifier this task belongs to
	 */
	public projId!: number;
	/**
	 * Work Breakdown Structure identifier
	 */
	public wbsId!: number;
	/**
	 * Calendar identifier associated with this task
	 */
	public clndrId!: number;
	/**
	 * Physical completion percentage of the task
	 */
	public physCompletePct!: number;
	/**
	 * Indicates if feedback is revised
	 */
	public revFdbk!: boolean;
	/**
	 * Estimated weight of the task
	 */
	public estWt!: number;
	/**
	 * Indicates if the task plan is locked
	 */
	public lockPlan!: boolean;
	/**
	 * Indicates if actual values are automatically computed
	 */
	public autoComputeAct!: boolean;
	/**
	 * Type of completion percentage calculation
	 */
	public completePctType!: string;
	/**
	 * Type of task
	 */
	public taskType!: TaskType;
	/**
	 * Type of duration
	 */
	public durationType!: string;
	/**
	 * Current status of the task
	 */
	public statusCode!: TaskStatusCode;
	/**
	 * Task code identifier
	 */
	public taskCode!: string;
	/**
	 * Name of the task
	 */
	public taskName!: string;
	/**
	 * Optional resource identifier
	 */
	public rsrcId?: number;
	/**
	 * Total float in hours
	 */
	public totalFloat!: Duration;
	/**
	 * Free float in hours
	 */
	public freeFloat!: Duration;
	/**
	 * Remaining duration in hours
	 */
	public remainDrtn!: Duration;
	/**
	 * Actual work quantity
	 */
	public actWorkQty!: number;
	/**
	 * Remaining work quantity
	 */
	public remainWorkQty!: number;
	/**
	 * Target work quantity
	 */
	public targetWorkQty!: number;
	/**
	 * Target duration in hours
	 */
	public targetDrtn!: Duration;
	/**
	 * Target equipment quantity
	 */
	public targetEquipQty!: number;
	/**
	 * Actual equipment quantity
	 */
	public actEquipQty!: number;
	/**
	 * Remaining equipment quantity
	 */
	public remainEquipQty!: number;
	/**
	 * Constraint date
	 */
	public cstrDate?: Dayjs;
	/**
	 * Actual start date
	 */
	public actStartDate?: Dayjs;
	/**
	 * Actual end date
	 */
	public actEndDate?: Dayjs;
	/**
	 * Late start date
	 */
	public lateStartDate!: Dayjs;
	/**
	 * Late end date
	 */
	public lateEndDate!: Dayjs;
	/**
	 * Expected end date
	 */
	public expectEndDate?: Dayjs;
	/**
	 * Early start date
	 */
	public earlyStartDate!: Dayjs;
	/**
	 * Early end date
	 */
	public earlyEndDate!: Dayjs;
	/**
	 * Restart date
	 */
	public restartDate!: Dayjs;
	/**
	 * Reend date
	 */
	public reendDate!: Dayjs;
	/**
	 * Target start date
	 */
	public targetStartDate!: Dayjs;
	/**
	 * Target end date
	 */
	public targetEndDate!: Dayjs;
	/**
	 * Remaining late start date
	 */
	public remLateStartDate!: Dayjs;
	/**
	 * Remaining late end date
	 */
	public remLateEndDate!: Dayjs;
	/**
	 * Constraint type
	 */
	public cstrType?: string;
	/**
	 * Priority type
	 */
	public priorityType!: string;
	/**
	 * Suspend date
	 */
	public suspendDate?: Dayjs;
	/**
	 * Resume date
	 */
	public resumeDate?: Dayjs;
	/**
	 * Float path
	 */
	public floatPath?: number;
	/**
	 * Float path order
	 */
	public floatPathOrder?: number;
	/**
	 * Global unique identifier
	 */
	public guid!: string;
	/**
	 * Template global unique identifier
	 */
	public tmplGuid?: string;
	/**
	 * Constraint date 2
	 */
	public cstrDate2?: Dayjs;
	/**
	 * Constraint type 2
	 */
	public cstrType2?: string;
	/**
	 * Indicates if task is on the driving path
	 */
	public drivingPath!: boolean;
	/**
	 * Actual this period work quantity
	 */
	public actThisPerWorkQty!: number;
	/**
	 * Actual this period equipment quantity
	 */
	public actThisPerEquipQty!: number;
	/**
	 * External early start date
	 */
	public externalEarlyStartDate?: Dayjs;
	/**
	 * External late end date
	 */
	public externalLateEndDate?: Dayjs;
	/**
	 * Create date of the task
	 */
	public createDate!: Dayjs;
	/**
	 * Update date of the task
	 */
	public updateDate!: Dayjs;
	/**
	 * User who created the task
	 */
	public createUser!: string;
	/**
	 * User who updated the task
	 */
	public updateUser!: string;
	/**
	 * Location identifier
	 */
	public locationId?: number;
	/**
	 * Critical path number
	 */
	public crtPathNum?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		// Populate all mapped scalar fields
		this.populateFrom('TASK', header, row);
		// Construct Duration objects from raw hours
		this.totalFloat = new Duration(row[header.indexOf('total_float_hr_cnt')], this.calendar, 'h');
		this.freeFloat = new Duration(row[header.indexOf('free_float_hr_cnt')], this.calendar, 'h');
		this.remainDrtn = new Duration(row[header.indexOf('remain_drtn_hr_cnt')], this.calendar, 'h');
		this.targetDrtn = new Duration(row[header.indexOf('target_drtn_hr_cnt')], this.calendar, 'h');
		// Optional columns not always present
		{
			const idx = getColumnIndex(header, 'rsrc_id');
			this.rsrcId = idx >= 0 ? optionalNumber(row[idx]) : this.rsrcId;
		}
		{
			const idx = getColumnIndex(header, 'cstr_type');
			this.cstrType = idx >= 0 ? optionalString(row[idx]) : this.cstrType;
		}
		{
			const sIdx = getColumnIndex(header, 'suspend_date');
			const rIdx = getColumnIndex(header, 'resume_date');
			this.suspendDate = sIdx >= 0 ? optionalDate(row[sIdx]) : this.suspendDate;
			this.resumeDate = rIdx >= 0 ? optionalDate(row[rIdx]) : this.resumeDate;
		}
		{
			const tIdx = getColumnIndex(header, 'tmpl_guid');
			const d2Idx = getColumnIndex(header, 'cstr_date2');
			const t2Idx = getColumnIndex(header, 'cstr_type2');
			this.tmplGuid = tIdx >= 0 ? optionalString(row[t2Idx]) : this.tmplGuid;
			this.cstrDate2 = d2Idx >= 0 ? optionalDate(row[d2Idx]) : this.cstrDate2;
			this.cstrType2 = t2Idx >= 0 ? optionalString(row[t2Idx]) : this.cstrType2;
		}
		{
			const eeIdx = getColumnIndex(header, 'external_early_start_date');
			const elIdx = getColumnIndex(header, 'external_late_end_date');
			this.externalEarlyStartDate = eeIdx >= 0 ? optionalDate(row[eeIdx]) : this.externalEarlyStartDate;
			this.externalLateEndDate = elIdx >= 0 ? optionalDate(row[elIdx]) : this.externalLateEndDate;
		}
		{
			const locIdx = getColumnIndex(header, 'location_id');
			const crtIdx = getColumnIndex(header, 'crt_path_num');
			this.locationId = locIdx >= 0 ? optionalNumber(row[locIdx]) : this.locationId;
			this.crtPathNum = crtIdx >= 0 ? optionalNumber(row[crtIdx]) : this.crtPathNum;
		}
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}

	public get taskResources(): TaskResource[] {
		return this.xer.taskResources.filter((tr) => tr.taskId === this.taskId);
	}

	public get taskPredecessors(): TaskPredecessor[] {
		return this.xer.taskPredecessors.filter(
			(tp) => tp.taskId === this.taskId
		);
	}

	public get wbs(): ProjWBS | undefined {
		return this.xer.projWBS.find((projWBS) => projWBS.wbsId === this.wbsId);
	}

	public get taskMemos(): TaskMemo[] {
		return this.xer.taskMemos.filter(
			(taskMemo) => taskMemo.taskId === this.taskId
		);
	}

	public get calendar(): Calendar | undefined {
		return this.xer.calendars.find(
			(calendar) => calendar.clndrId === this.clndrId
		);
	}

	public get taskActivityCodes(): TaskActivityCode[] {
		return this.xer.taskActivityCodes.filter(
			(taskActivityCode) => taskActivityCode.taskId === this.taskId
		);
	}

	/**
	 * Returns the distribution of hours per day for the task between the start and finish dates.
	 * @param start Start date
	 * @param finish Finish date
	 * @returns Object containing the start date and an array of hours per day
	 */
	public distributionHrs(start: Dayjs, finish: Dayjs): { start: Dayjs; distribution: number[] } {
		
		const calendar = this.calendar ?? this.project.calendar;
		
		if (!calendar) {
			throw new Error('No calendar found for task or project');
		}

		const exceptionStrings = calendar.properties.exceptions.map((exception) => exception.date.format('YYYY-MM-DD'));
		const totalDays = Math.abs(finish.diff(start, 'day'));
		const distribution = new Array(totalDays).fill(0);
		let currentDate = start;

		let index = 0;
		while (currentDate.isBefore(finish)) {
			
			if (exceptionStrings.includes(currentDate.format('YYYY-MM-DD'))) {
				distribution[index] = 0;
			} else {
				const from = dayjs.max(currentDate.startOf('day'), start);
				const to = dayjs.min(currentDate.endOf('day'), finish);

				distribution[index] = calendar.duration(from, to).hours;
			}

			index++;
			currentDate = currentDate.add(1, 'day');
		}

		return { start, distribution };
	}

}
