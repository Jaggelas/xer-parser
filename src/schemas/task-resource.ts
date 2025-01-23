import { Duration } from '../classes/duration.class';
import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';
import { Resource } from './resource';

/**
 * Represents a resource assigned to a task in a project schedule
 * @class
 * @property {XER} xer - Reference to the parent XER object
 * @property {number} taskrsrcId - Unique identifier for the task resource assignment
 * @property {number} taskId - ID of the task this resource is assigned to
 * @property {number} projId - ID of the project this assignment belongs to
 * @property {boolean} costQtyLinkFlag - Indicates if cost and quantity are linked
 * @property {number} roleId - ID of the role assigned
 * @property {number} [acctId] - Optional account ID associated with this assignment
 * @property {number} rsrcId - ID of the resource assigned
 * @property {number} [pobsId] - Optional project WBS ID
 * @property {number} skillLevel - Skill level of the resource for this assignment
 * @property {number} remainQty - Remaining quantity of work
 * @property {number} targetQty - Target quantity of work
 * @property {number} remainQtyPerHr - Remaining quantity per hour
 * @property {number} targetLagDrtnHrCnt - Target lag duration in hours
 * @property {number} targetQtyPerHr - Target quantity per hour
 * @property {number} actOtQty - Actual overtime quantity
 * @property {number} actRegQty - Actual regular time quantity
 * @property {number} relagDrtnHrCnt - Remaining lag duration in hours
 * @property {number} [otFactor] - Optional overtime factor
 * @property {number} costPerQty - Cost per quantity unit
 * @property {number} targetCost - Target cost for the assignment
 * @property {number} actRegCost - Actual regular time cost
 * @property {number} actOtCost - Actual overtime cost
 * @property {number} remainCost - Remaining cost
 * @property {Date} [actStartDate] - Optional actual start date
 * @property {Date} [actEndDate] - Optional actual end date
 * @property {Date} restartDate - Restart date for the assignment
 * @property {Date} reendDate - Reend date for the assignment
 * @property {Date} targetStartDate - Target start date
 * @property {Date} targetEndDate - Target end date
 * @property {Date} remLateStartDate - Remaining late start date
 * @property {Date} remLateEndDate - Remaining late end date
 * @property {boolean} rollupDatesFlag - Indicates if dates should roll up
 * @property {number} [targetCrv] - Optional target curve value
 * @property {number} [remainCrv] - Optional remaining curve value
 * @property {number} [actualCrv] - Optional actual curve value
 * @property {boolean} [tsPendActEndFlag] - Optional timesheet pending actual end flag
 * @property {string} guid - Globally unique identifier
 * @property {string} rateType - Type of rate applied
 * @property {number} actThisPerCost - Actual cost this period
 * @property {number} actThisPerQty - Actual quantity this period
 * @property {number} [curvId] - Optional curve ID
 * @property {string} rsrcType - Resource type
 * @property {string} costPerQtySourceType - Source type for cost per quantity
 * @property {string} createUser - User who created the assignment
 * @property {Date} createDate - Date when assignment was created
 * @property {boolean} hasRsrchours - Indicates if resource has hours
 * @property {number} taskrsrcSumId - Task resource summary ID
 */
export class TaskResource {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the task resource assignment
	 */
	public taskrsrcId: number;
	/**
	 * ID of the task this resource is assigned to
	 */
	public taskId: number;
	/**
	 * ID of the project this assignment belongs to
	 */
	public projId: number;
	/**
	 * Indicates if cost and quantity are linked
	 */
	public costQtyLinkFlag: boolean;
	/**
	 * ID of the role assigned
	 */
	public roleId: number;
	/**
	 * Optional account ID associated with this assignment
	 */
	public acctId?: number;
	/**
	 * ID of the resource assigned
	 */
	public rsrcId: number;
	/**
	 * Optional project WBS ID
	 */
	public pobsId?: number;
	/**
	 * Skill level of the resource for this assignment
	 */
	public skillLevel: number;
	/**
	 * Remaining quantity of work
	 */
	public remainQty: number;
	/**
	 * Target quantity of work
	 */
	public targetQty: number;
	/**
	 * Remaining quantity per hour
	 */
	public remainQtyPerHr: number;
	/**
	 * Target lag duration in hours
	 */
	public targetLag: Duration;
	/**
	 * Target quantity per hour
	 */
	public targetQtyPerHr: number;
	/**
	 * Actual overtime quantity
	 */
	public actOtQty: number;
	/**
	 * Actual regular time quantity
	 */
	public actRegQty: number;
	/**
	 * Remaining lag duration in hours
	 */
	public relag: Duration;
	/**
	 * Optional overtime factor
	 */
	public otFactor?: number;
	/**
	 * Cost per quantity unit
	 */
	public costPerQty: number;
	/**
	 * Target cost for the assignment
	 */
	public targetCost: number;
	/**
	 * Actual regular time cost
	 */
	public actRegCost: number;
	/**
	 * Actual overtime cost
	 */
	public actOtCost: number;
	/**
	 * Remaining cost
	 */
	public remainCost: number;
	/**
	 * Optional actual start date
	 */
	public actStartDate?: Date;
	/**
	 * Optional actual end date
	 */
	public actEndDate?: Date;
	/**
	 * Remaining start date
	 */
	public restartDate: Date;
	/**
	 * Remaining end date
	 */
	public reendDate: Date;
	/**
	 * Target start date
	 */
	public targetStartDate: Date;
	/**
	 * Target end date
	 */
	public targetEndDate: Date;
	/**
	 * Remaining late start date
	 */
	public remLateStartDate: Date;
	/**
	 * Remaining late end date
	 */
	public remLateEndDate: Date;
	/**
	 * Indicates if dates should roll up
	 */
	public rollupDatesFlag: boolean;
	/**
	 * Optional target curve value
	 */
	public targetCrv?: number;
	/**
	 * Optional remaining curve value
	 */
	public remainCrv?: number;
	/**
	 * Optional actual curve value
	 */
	public actualCrv?: number;
	/**
	 * Optional timesheet pending actual end flag
	 */
	public tsPendActEndFlag?: boolean;
	/**
	 * Globally unique identifier
	 */
	public guid: string;
	/**
	 * Type of rate applied
	 */
	public rateType: string;
	/**
	 * Actual cost this period
	 */
	public actThisPerCost: number;
	/**
	 * Actual quantity this period
	 */
	public actThisPerQty: number;
	/**
	 * Optional curve ID
	 */
	public curvId?: number;
	/**
	 * Resource type
	 */
	public rsrcType: string;
	/**
	 * Source type for cost per quantity unit value
	 */
	public costPerQtySourceType: string;
	/**
	 * User who created the assignment
	 */
	public createUser: string;
	/**
	 * Date when assignment was created
	 */
	public createDate: Date;
	/**
	 * Indicates if resource has hours
	 */
	public hasRsrchours: boolean;
	/**
	 * Task resource summary ID
	 */
	public taskrsrcSumId: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.taskrsrcId = Number(row[header.indexOf('taskrsrc_id')]);
		this.taskId = Number(row[header.indexOf('task_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.costQtyLinkFlag =
			row[header.indexOf('cost_qty_link_flag')] === 'Y';
		this.roleId = Number(row[header.indexOf('role_id')]);
		this.acctId = optionalNumber(row[header.indexOf('acct_id')]);
		this.rsrcId = Number(row[header.indexOf('rsrc_id')]);
		this.pobsId = optionalNumber(row[header.indexOf('pobs_id')]);
		this.skillLevel = Number(row[header.indexOf('skill_level')]);
		this.remainQty = Number(row[header.indexOf('remain_qty')]);
		this.targetQty = Number(row[header.indexOf('target_qty')]);
		this.remainQtyPerHr = Number(row[header.indexOf('remain_qty_per_hr')]);
		this.targetQtyPerHr = Number(row[header.indexOf('target_qty_per_hr')]);
		this.actOtQty = Number(row[header.indexOf('act_ot_qty')]);
		this.actRegQty = Number(row[header.indexOf('act_reg_qty')]);
		this.otFactor = optionalNumber(row[header.indexOf('ot_factor')]);
		this.costPerQty = Number(row[header.indexOf('cost_per_qty')]);
		this.targetCost = Number(row[header.indexOf('target_cost')]);
		this.actRegCost = Number(row[header.indexOf('act_reg_cost')]);
		this.actOtCost = Number(row[header.indexOf('act_ot_cost')]);
		this.remainCost = Number(row[header.indexOf('remain_cost')]);
		this.actStartDate = optionalDate(row[header.indexOf('act_start_date')]);
		this.actEndDate = optionalDate(row[header.indexOf('act_end_date')]);
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
		this.rollupDatesFlag = row[header.indexOf('rollup_dates_flag')] === 'Y';
		this.targetCrv = optionalNumber(row[header.indexOf('target_crv')]);
		this.remainCrv = optionalNumber(row[header.indexOf('remain_crv')]);
		this.actualCrv = optionalNumber(row[header.indexOf('actual_crv')]);
		this.tsPendActEndFlag =
			optionalString(row[header.indexOf('ts_pend_act_end_flag')]) === 'Y';
		this.guid = row[header.indexOf('guid')];
		this.rateType = row[header.indexOf('rate_type')];
		this.actThisPerCost = Number(row[header.indexOf('act_this_per_cost')]);
		this.actThisPerQty = Number(row[header.indexOf('act_this_per_qty')]);
		this.curvId = optionalNumber(row[header.indexOf('curv_id')]);
		this.rsrcType = row[header.indexOf('rsrc_type')];
		this.costPerQtySourceType =
			row[header.indexOf('cost_per_qty_source_type')];
		this.createUser = row[header.indexOf('create_user')];
		this.createDate = new Date(row[header.indexOf('create_date')]);
		this.hasRsrchours = row[header.indexOf('has_rsrchours')] === 'Y';
		this.taskrsrcSumId = Number(row[header.indexOf('taskrsrc_sum_id')]);
		this.targetLag = new Duration(
			row[header.indexOf('target_lag_drtn_hr_cnt')],
			this.project.calendar,
			'H'
		);
		this.relag = new Duration(
			row[header.indexOf('relag_drtn_hr_cnt')],
			this.project.calendar,
			'H'
		);
	}

	public get resource(): Resource | undefined {
		return this.xer.resources.find((r) => r.rsrcId === this.rsrcId);
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}
}
