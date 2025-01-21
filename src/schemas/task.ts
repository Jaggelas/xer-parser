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

/**
 * Represents a Task entity from an XER file.
 * This class contains all task-related information including dates, resource allocations, and relationships.
 *
 * @property {XER} xer - Reference to the parent XER object
 * @property {number} taskId - Unique identifier for the task
 * @property {number} projId - Project identifier this task belongs to
 * @property {number} wbsId - Work Breakdown Structure identifier
 * @property {number} clndrId - Calendar identifier associated with this task
 * @property {number} physCompletePct - Physical completion percentage of the task
 * @property {boolean} revFdbk - Indicates if feedback is revised
 * @property {number} estWt - Estimated weight of the task
 * @property {boolean} lockPlan - Indicates if the task plan is locked
 * @property {boolean} autoComputeAct - Indicates if actual values are automatically computed
 * @property {string} completePctType - Type of completion percentage calculation
 * @property {string} taskType - Type of task
 * @property {string} durationType - Type of duration
 * @property {string} statusCode - Current status of the task
 * @property {string} taskCode - Task code identifier
 * @property {string} taskName - Name of the task
 * @property {number} [rsrcId] - Optional resource identifier
 * @property {number} totalFloatHrCnt - Total float in hours
 * @property {number} freeFloatHrCnt - Free float in hours
 * @property {number} remainDrtnHrCnt - Remaining duration in hours
 * @property {number} actWorkQty - Actual work quantity
 * @property {number} remainWorkQty - Remaining work quantity
 * @property {number} targetWorkQty - Target work quantity
 * @property {Date} [cstrDate] - Constraint date
 * @property {Date} [actStartDate] - Actual start date
 * @property {Date} [actEndDate] - Actual end date
 * @property {Date} lateStartDate - Late start date
 * @property {Date} lateEndDate - Late end date
 * @property {Date} [expectEndDate] - Expected end date
 * @property {string} [cstrType] - Constraint type
 * @property {string} priorityType - Priority type
 * @property {string} guid - Global unique identifier
 * @property {boolean} drivingPath - Indicates if task is on the driving path
 *
 * @method TaskResources - Gets all resources assigned to this task
 * @method taskPredecessors - Gets all predecessor relationships for this task
 * @method wbs - Gets the WBS element this task belongs to
 * @method TaskMemos - Gets all memos associated with this task
 * @method calendar - Gets the calendar associated with this task
 * @method taskActivityCodes - Gets all activity codes associated with this task
 */
export class Task {
	public xer: XER;
	public taskId: number;
	public projId: number;
	public wbsId: number;
	public clndrId: number;
	public physCompletePct: number;
	public revFdbk: boolean;
	public estWt: number;
	public lockPlan: boolean;
	public autoComputeAct: boolean;
	public completePctType: string;
	public taskType: string;
	public durationType: string;
	public statusCode: string;
	public taskCode: string;
	public taskName: string;
	public rsrcId?: number;
	public totalFloatHrCnt: number;
	public freeFloatHrCnt: number;
	public remainDrtnHrCnt: number;
	public actWorkQty: number;
	public remainWorkQty: number;
	public targetWorkQty: number;
	public targetDrtnHrCnt: number;
	public targetEquipQty: number;
	public actEquipQty: number;
	public remainEquipQty: number;
	public cstrDate?: Date;
	public actStartDate?: Date;
	public actEndDate?: Date;
	public lateStartDate: Date;
	public lateEndDate: Date;
	public expectEndDate?: Date;
	public earlyStartDate: Date;
	public earlyEndDate: Date;
	public restartDate: Date;
	public reendDate: Date;
	public targetStartDate: Date;
	public targetEndDate: Date;
	public remLateStartDate: Date;
	public remLateEndDate: Date;
	public cstrType?: string;
	public priorityType: string;
	public suspendDate?: Date;
	public resumeDate?: Date;
	public floatPath?: number;
	public floatPathOrder?: number;
	public guid: string;
	public tmplGuid?: string;
	public cstrDate2?: Date;
	public cstrType2?: string;
	public drivingPath: boolean;
	public actThisPerWorkQty: number;
	public actThisPerEquipQty: number;
	public externalEarlyStartDate?: Date;
	public externalLateEndDate?: Date;
	public createDate: Date;
	public updateDate: Date;
	public createUser: string;
	public updateUser: string;
	public locationId?: number;
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
		this.lockPlan = row[header.indexOf('lock_plan_flag')] === 'y';
		this.autoComputeAct =
			row[header.indexOf('auto_compute_act_flag')] === 'Y';
		this.completePctType = row[header.indexOf('complete_pct_type')];
		this.taskType = row[header.indexOf('task_type')];
		this.durationType = row[header.indexOf('duration_type')];
		this.statusCode = row[header.indexOf('status_code')];
		this.taskCode = row[header.indexOf('task_code')];
		this.taskName = row[header.indexOf('task_name')];
		this.rsrcId = optionalNumber(row[header.indexOf('rsrc_id')]);
		this.totalFloatHrCnt = Number(
			row[header.indexOf('total_float_hr_cnt')]
		);
		this.freeFloatHrCnt = Number(row[header.indexOf('free_float_hr_cnt')]);
		this.remainDrtnHrCnt = Number(
			row[header.indexOf('remain_drtn_hr_cnt')]
		);
		this.actWorkQty = Number(row[header.indexOf('act_work_qty')]);
		this.remainWorkQty = Number(row[header.indexOf('remain_work_qty')]);
		this.targetWorkQty = Number(row[header.indexOf('target_work_qty')]);
		this.targetDrtnHrCnt = Number(
			row[header.indexOf('target_drtn_hr_cnt')]
		);
		this.targetEquipQty = Number(row[header.indexOf('target_equip_qty')]);
		this.actEquipQty = Number(row[header.indexOf('act_equip_qty')]);
		this.remainEquipQty = Number(row[header.indexOf('remain_equip_qty')]);
		this.cstrDate = optionalDate(row[header.indexOf('cstr_date')]);
		this.actStartDate = optionalDate(row[header.indexOf('act_start_date')]);
		this.actEndDate = optionalDate(row[header.indexOf('act_end_date')]);
		this.lateStartDate = new Date(row[header.indexOf('late_start_date')]);
		this.lateEndDate = new Date(row[header.indexOf('late_end_date')]);
		this.expectEndDate = optionalDate(
			row[header.indexOf('expect_end_date')]
		);
		this.earlyStartDate = new Date(row[header.indexOf('early_start_date')]);
		this.earlyEndDate = new Date(row[header.indexOf('early_end_date')]);
		this.restartDate = new Date(row[header.indexOf('restart_date')]);
		this.reendDate = new Date(row[header.indexOf('reend_date')]);
		this.targetStartDate = new Date(
			row[header.indexOf('target_start_date')]
		);
		this.targetEndDate = new Date(row[header.indexOf('target_end_date')]);
		this.remLateStartDate = new Date(
			row[header.indexOf('rem_late_start_date')]
		);
		this.remLateEndDate = new Date(
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
		this.createDate = new Date(row[header.indexOf('create_date')]);
		this.updateDate = new Date(row[header.indexOf('update_date')]);
		this.createUser = row[header.indexOf('create_user')];
		this.updateUser = row[header.indexOf('update_user')];
		this.locationId = optionalNumber(row[header.indexOf('location_id')]);
		this.crtPathNum = optionalNumber(row[header.indexOf('crt_path_num')]);
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
}
