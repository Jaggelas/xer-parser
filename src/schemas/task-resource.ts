import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';
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
	public xer: XER;
	public taskrsrcId: number;
	public taskId: number;
	public projId: number;
	public costQtyLinkFlag: boolean;
	public roleId: number;
	public acctId?: number;
	public rsrcId: number;
	public pobsId?: number;
	public skillLevel: number;
	public remainQty: number;
	public targetQty: number;
	public remainQtyPerHr: number;
	public targetLagDrtnHrCnt: number;
	public targetQtyPerHr: number;
	public actOtQty: number;
	public actRegQty: number;
	public relagDrtnHrCnt: number;
	public otFactor?: number;
	public costPerQty: number;
	public targetCost: number;
	public actRegCost: number;
	public actOtCost: number;
	public remainCost: number;
	public actStartDate?: Date;
	public actEndDate?: Date;
	public restartDate: Date;
	public reendDate: Date;
	public targetStartDate: Date;
	public targetEndDate: Date;
	public remLateStartDate: Date;
	public remLateEndDate: Date;
	public rollupDatesFlag: boolean;
	public targetCrv?: number;
	public remainCrv?: number;
	public actualCrv?: number;
	public tsPendActEndFlag?: boolean;
	public guid: string;
	public rateType: string;
	public actThisPerCost: number;
	public actThisPerQty: number;
	public curvId?: number;
	public rsrcType: string;
	public costPerQtySourceType: string;
	public createUser: string;
	public createDate: Date;
	public hasRsrchours: boolean;
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
		this.targetLagDrtnHrCnt = Number(
			row[header.indexOf('target_lag_drtn_hr_cnt')]
		);
		this.targetQtyPerHr = Number(row[header.indexOf('target_qty_per_hr')]);
		this.actOtQty = Number(row[header.indexOf('act_ot_qty')]);
		this.actRegQty = Number(row[header.indexOf('act_reg_qty')]);
		this.relagDrtnHrCnt = Number(row[header.indexOf('relag_drtn_hr_cnt')]);
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
	}

	public get resource(): Resource | undefined {
		return this.xer.resources.find((r) => r.rsrcId === this.rsrcId);
	}
}
