import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';
import { TaskResource } from './task-resource';
import { TaskPredecessor } from './task-predecessor';
import { ProjWBS } from './proj-wbs';
import { TaskMemo } from './task-memo';
import { Calendar } from './calendar';
import { TaskActivityCode } from './task-activity-code';
import { Duration } from '../classes/duration.class';
import { Project } from './project';
import moment, { Moment } from 'moment';


export type TaskType = 'TT_Task' | 'TT_LOE' | 'TT_Mile' | 'TT_Rsrc' | 'TT_FinMile';

export type TaskStatusCode = 'TK_Complete' | 'TK_Active' | 'TK_NotStart';

/**
 * Represents a Task entity from an XER file.
 * This class contains all task-related information including dates, resource allocations, and relationships.
 */
export class Task {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the task
	 */
	public taskId: number;
	/**
	 * Project identifier this task belongs to
	 */
	public projId: number;
	/**
	 * Work Breakdown Structure identifier
	 */
	public wbsId: number;
	/**
	 * Calendar identifier associated with this task
	 */
	public clndrId: number;
	/**
	 * Physical completion percentage of the task
	 */
	public physCompletePct: number;
	/**
	 * Indicates if feedback is revised
	 */
	public revFdbk: boolean;
	/**
	 * Estimated weight of the task
	 */
	public estWt: number;
	/**
	 * Indicates if the task plan is locked
	 */
	public lockPlan: boolean;
	/**
	 * Indicates if actual values are automatically computed
	 */
	public autoComputeAct: boolean;
	/**
	 * Type of completion percentage calculation
	 */
	public completePctType: string;
	/**
	 * Type of task
	 */
	public taskType: TaskType;
	/**
	 * Type of duration
	 */
	public durationType: string;
	/**
	 * Current status of the task
	 */
	public statusCode: TaskStatusCode;
	/**
	 * Task code identifier
	 */
	public taskCode: string;
	/**
	 * Name of the task
	 */
	public taskName: string;
	/**
	 * Optional resource identifier
	 */
	public rsrcId?: number;
	/**
	 * Total float in hours
	 */
	public totalFloat: Duration;
	/**
	 * Free float in hours
	 */
	public freeFloat: Duration;
	/**
	 * Remaining duration in hours
	 */
	public remainDrtn: Duration;
	/**
	 * Actual work quantity
	 */
	public actWorkQty: number;
	/**
	 * Remaining work quantity
	 */
	public remainWorkQty: number;
	/**
	 * Target work quantity
	 */
	public targetWorkQty: number;
	/**
	 * Target duration in hours
	 */
	public targetDrtn: Duration;
	/**
	 * Target equipment quantity
	 */
	public targetEquipQty: number;
	/**
	 * Actual equipment quantity
	 */
	public actEquipQty: number;
	/**
	 * Remaining equipment quantity
	 */
	public remainEquipQty: number;
	/**
	 * Constraint date
	 */
	public cstrDate?: Moment;
	/**
	 * Actual start date
	 */
	public actStartDate?: Moment;
	/**
	 * Actual end date
	 */
	public actEndDate?: Moment;
	/**
	 * Late start date
	 */
	public lateStartDate: Moment;
	/**
	 * Late end date
	 */
	public lateEndDate: Moment;
	/**
	 * Expected end date
	 */
	public expectEndDate?: Moment;
	/**
	 * Early start date
	 */
	public earlyStartDate: Moment;
	/**
	 * Early end date
	 */
	public earlyEndDate: Moment;
	/**
	 * Restart date
	 */
	public restartDate: Moment;
	/**
	 * Reend date
	 */
	public reendDate: Moment;
	/**
	 * Target start date
	 */
	public targetStartDate: Moment;
	/**
	 * Target end date
	 */
	public targetEndDate: Moment;
	/**
	 * Remaining late start date
	 */
	public remLateStartDate: Moment;
	/**
	 * Remaining late end date
	 */
	public remLateEndDate: Moment;
	/**
	 * Constraint type
	 */
	public cstrType?: string;
	/**
	 * Priority type
	 */
	public priorityType: string;
	/**
	 * Suspend date
	 */
	public suspendDate?: Moment;
	/**
	 * Resume date
	 */
	public resumeDate?: Moment;
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
	public guid: string;
	/**
	 * Template global unique identifier
	 */
	public tmplGuid?: string;
	/**
	 * Constraint date 2
	 */
	public cstrDate2?: Moment;
	/**
	 * Constraint type 2
	 */
	public cstrType2?: string;
	/**
	 * Indicates if task is on the driving path
	 */
	public drivingPath: boolean;
	/**
	 * Actual this period work quantity
	 */
	public actThisPerWorkQty: number;
	/**
	 * Actual this period equipment quantity
	 */
	public actThisPerEquipQty: number;
	/**
	 * External early start date
	 */
	public externalEarlyStartDate?: Moment;
	/**
	 * External late end date
	 */
	public externalLateEndDate?: Moment;
	/**
	 * Create date of the task
	 */
	public createDate: Moment;
	/**
	 * Update date of the task
	 */
	public updateDate: Moment;
	/**
	 * User who created the task
	 */
	public createUser: string;
	/**
	 * User who updated the task
	 */
	public updateUser: string;
	/**
	 * Location identifier
	 */
	public locationId?: number;
	/**
	 * Critical path number
	 */
	public crtPathNum?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.taskId = Number(row[header.indexOf('task_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.wbsId = Number(row[header.indexOf('wbs_id')]);
		this.clndrId = Number(row[header.indexOf('clndr_id')]);
		this.physCompletePct = Number(row[header.indexOf('phys_complete_pct')]);
		this.revFdbk = row[header.indexOf('rev_fdbk_flag')] === 'Y';
		this.estWt = Number(row[header.indexOf('est_wt')]);
	this.lockPlan = row[header.indexOf('lock_plan_flag')] === 'Y';
		this.autoComputeAct =
			row[header.indexOf('auto_compute_act_flag')] === 'Y';
		this.completePctType = row[header.indexOf('complete_pct_type')];
		this.taskType = row[header.indexOf('task_type')] as TaskType;
		this.durationType = row[header.indexOf('duration_type')];
		this.statusCode = row[header.indexOf('status_code')] as TaskStatusCode;
		this.taskCode = row[header.indexOf('task_code')];
		this.taskName = row[header.indexOf('task_name')];
		this.rsrcId = optionalNumber(row[header.indexOf('rsrc_id')]);
		this.totalFloat = new Duration(
			row[header.indexOf('total_float_hr_cnt')],
			this.calendar,
			'h'
		);
		this.freeFloat = new Duration(
			row[header.indexOf('free_float_hr_cnt')],
			this.calendar,
			'h'
		);
		this.remainDrtn = new Duration(
			row[header.indexOf('remain_drtn_hr_cnt')],
			this.calendar,
			'h'
		);
		this.actWorkQty = Number(row[header.indexOf('act_work_qty')]);
		this.remainWorkQty = Number(row[header.indexOf('remain_work_qty')]);
		this.targetWorkQty = Number(row[header.indexOf('target_work_qty')]);
		this.targetDrtn = new Duration(
			row[header.indexOf('target_drtn_hr_cnt')],
			this.calendar,
			'h'
		);
		this.targetEquipQty = Number(row[header.indexOf('target_equip_qty')]);
		this.actEquipQty = Number(row[header.indexOf('act_equip_qty')]);
		this.remainEquipQty = Number(row[header.indexOf('remain_equip_qty')]);
		this.cstrDate = optionalDate(row[header.indexOf('cstr_date')]);
		this.actStartDate = optionalDate(row[header.indexOf('act_start_date')]);
		this.actEndDate = optionalDate(row[header.indexOf('act_end_date')]);
		this.lateStartDate = moment(row[header.indexOf('late_start_date')]);
		this.lateEndDate = moment(row[header.indexOf('late_end_date')]);
		this.expectEndDate = optionalDate(
			row[header.indexOf('expect_end_date')]
		);
		this.earlyStartDate = moment(row[header.indexOf('early_start_date')]);
		this.earlyEndDate = moment(row[header.indexOf('early_end_date')]);
		this.restartDate = moment(row[header.indexOf('restart_date')]);
		this.reendDate = moment(row[header.indexOf('reend_date')]);
		this.targetStartDate = moment(
			row[header.indexOf('target_start_date')]
		);
		this.targetEndDate = moment(row[header.indexOf('target_end_date')]);
		this.remLateStartDate = moment(
			row[header.indexOf('rem_late_start_date')]
		);
		this.remLateEndDate = moment(
			row[header.indexOf('rem_late_end_date')]
		);
		this.cstrType = optionalString(row[header.indexOf('cstr_type')]);
		this.priorityType = row[header.indexOf('priority_type')];
		this.suspendDate = optionalDate(row[header.indexOf('suspend_date')]);
		this.resumeDate = optionalDate(row[header.indexOf('resume_date')]);
		this.floatPath = optionalNumber(row[header.indexOf('float_path')]);
		this.floatPathOrder = optionalNumber(
			row[header.indexOf('float_path_order')]
		);
		this.guid = row[header.indexOf('guid')];
		this.tmplGuid = optionalString(row[header.indexOf('tmpl_guid')]);
		this.cstrDate2 = optionalDate(row[header.indexOf('cstr_date2')]);
		this.cstrType2 = optionalString(row[header.indexOf('cstr_type2')]);
		this.drivingPath = row[header.indexOf('driving_path_flag')] === 'Y';
		this.actThisPerWorkQty = Number(
			row[header.indexOf('act_this_per_work_qty')]
		);
		this.actThisPerEquipQty = Number(
			row[header.indexOf('act_this_per_equip_qty')]
		);
		this.externalEarlyStartDate = optionalDate(
			row[header.indexOf('external_early_start_date')]
		);
		this.externalLateEndDate = optionalDate(
			row[header.indexOf('external_late_end_date')]
		);
		this.createDate = moment(row[header.indexOf('create_date')]);
		this.updateDate = moment(row[header.indexOf('update_date')]);
		this.createUser = row[header.indexOf('create_user')];
		this.updateUser = row[header.indexOf('update_user')];
		this.locationId = optionalNumber(row[header.indexOf('location_id')]);
		this.crtPathNum = optionalNumber(row[header.indexOf('crt_path_num')]);
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}

	public get TaskResources(): TaskResource[] {
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

	public get TaskMemos(): TaskMemo[] {
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
	public distributionHrs(start: Moment, finish: Moment): {start: Moment, distribution: number[]} {
		
		const calendar = this.calendar ?? this.project.calendar;
		
		if (!calendar) {
			throw new Error('No calendar found for task or project');
		}

		const exceptionStrings = calendar.properties.exceptions.map((exception) => exception.date.format("YYYY-MM-DD"));
		const distribution = new Array(Math.abs(start.diff(finish, 'days'))).fill(0);
		const currentDate = start.clone();

		let index = 0;
		while (currentDate.isBefore(finish)) {
			
			if (exceptionStrings.includes(currentDate.format("YYYY-MM-DD"))) {
				distribution[index] = 0;
			} else {
				const from = moment.max(currentDate.clone().startOf('day'), start);
				const to = moment.min(currentDate.clone().endOf('day'), finish);

				distribution[index] = calendar.duration(from, to).hours;
			}

			index++;
			currentDate.add(1, 'day');
		}

		return {start, distribution};
	}

}
