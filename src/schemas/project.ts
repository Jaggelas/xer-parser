import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';
import { Task } from './task';
import { ScheduleOption } from './schedule-option';
import { ProjWBS } from './proj-wbs';

/**
 * Represents a project in Primavera P6 XER format
 * Contains project-level settings, dates, and configuration
 *
 * @property xer - Reference to parent XER object containing all project data
 * @property projId - Unique identifier for the project
 * @property fyStartMonthNum - Fiscal year start month (1-12)
 * @property rsrcSelfAddFlag - Whether resources can add themselves to the project
 * @property allowCompleteFlag - Whether activities can be marked as complete
 * @property rsrcMultiAssignFlag - Whether multiple resources can be assigned to activities
 * @property checkoutFlag - Whether project is checked out
 * @property projectFlag - Whether this is an active project
 * @property stepCompleteFlag - Whether step completion is enabled
 * @property costQtyRecalcFlag - Whether costs/quantities are recalculated
 * @property batchSumFlag - Whether batch summarization is enabled
 * @property nameSepChar - Character used to separate activity names
 * @property defCompletePctType - Default percent complete type
 * @property projShortName - Project short name/code
 * @property acctId - Account ID (optional)
 * @property origProjId - Original project ID if copied (optional)
 * @property sourceProjId - Source project ID if imported (optional)
 * @property baseTypeId - Baseline type ID (optional)
 * @property clndrId - Calendar ID
 * @property sumBaseProjId - Summary base project ID (optional)
 * @property taskCodeBase - Base for activity codes
 * @property taskCodeStep - Step increment for activity codes
 * @property priorityNum - Project priority number
 * @property wbsMaxSumLevel - Maximum WBS summary level
 * @property strgyPriorityNum - Strategic priority number
 * @property lastChecksum - Last checksum value (optional)
 * @property criticalDrtnHrCnt - Critical duration in hours
 * @property defCostPerQty - Default cost per quantity
 * @property lastRecalcDate - Last recalculation date
 * @property planStartDate - Planned start date
 * @property planEndDate - Planned end date (optional)
 * @property scdEndDate - Scheduled end date (optional)
 * @property addDate - Date project was added
 * @property lastTasksumDate - Last task summarization date (optional)
 * @property fcstStartDate - Forecast start date (optional)
 * @property defDurationType - Default duration type
 * @property taskCodePrefix - Prefix for activity codes
 * @property guid - Globally unique identifier
 * @property defQtyType - Default quantity type
 * @property addByName - Name of user who added project
 * @property webLocalRootPath - Local web root path (optional)
 * @property projUrl - Project URL (optional)
 * @property defRateType - Default rate type
 * @property addActRemainFlag - Whether to add actual and remaining units
 * @property actThisPerLinkFlag - Whether actuals this period are linked
 * @property defTaskType - Default task type
 * @property actPctLinkFlag - Whether actual percent complete is linked
 * @property criticalPathType - Type of critical path calculation
 * @property taskCodePrefixFlag - Whether activity code prefix is used
 * @property defRollupDatesFlag - Whether dates roll up by default
 * @property useProjectBaselineFlag - Whether project baseline is used
 * @property remTargetLinkFlag - Whether remaining and target are linked
 * @property resetPlannedFlag - Whether planned dates reset
 * @property allowNegActFlag - Whether negative actuals are allowed
 * @property sumAssignLevel - Resource assignment summary level
 * @property lastFinDatesId - Last financial dates ID (optional)
 * @property fintmplDd - Financial period template ID
 * @property lastBaselineUpdateDate - Last baseline update date (optional)
 * @property crExternalKey - External key for integration (optional)
 * @property applyActualsDate - Date actuals were applied (optional)
 * @property locationId - Location ID (optional)
 * @property lastScheduleDate - Last schedule calculation date (optional)
 * @property loadedScopeLevel - Level of loaded scope
 * @property exportFlag - Whether project is flagged for export
 * @property newFinDatesId - New financial dates ID
 * @property baselinesToExport - Baselines marked for export
 * @property baselineNamesToExport - Names of baselines to export
 * @property nextDataDate - Next data date
 * @property closePeriodFlag - Whether period is closed
 * @property sumRefreshDate - Summary refresh date
 * @property trsrcsumLoaded - Whether resource summaries are loaded
 * @property sumtaskLoaded - Whether summary tasks are loaded
 *
 * @method tasks - Gets all tasks associated with this project
 * @method wbs - Gets all WBS elements associated with this project
 * @method scheduleOptions - Gets schedule options associated with this project
 */
export class Project {
	public xer: XER;
	public projId: number;
	public fyStartMonthNum: number;
	public rsrcSelfAddFlag: boolean;
	public allowCompleteFlag: boolean;
	public rsrcMultiAssignFlag: boolean;
	public checkoutFlag: boolean;
	public projectFlag: boolean;
	public stepCompleteFlag: boolean;
	public costQtyRecalcFlag: boolean;
	public batchSumFlag: boolean;
	public nameSepChar: number;
	public defCompletePctType: string;
	public projShortName: string;
	public acctId?: number;
	public origProjId?: number;
	public sourceProjId?: number;
	public baseTypeId?: number;
	public clndrId: number;
	public sumBaseProjId?: number;
	public taskCodeBase: string;
	public taskCodeStep: string;
	public priorityNum: number;
	public wbsMaxSumLevel: number;
	public strgyPriorityNum: number;
	public lastChecksum?: number;
	public criticalDrtnHrCnt: number;
	public defCostPerQty: number;
	public lastRecalcDate: Date;
	public planStartDate: Date;
	public planEndDate?: Date;
	public scdEndDate?: Date;
	public addDate: Date;
	public lastTasksumDate?: Date;
	public fcstStartDate?: Date;
	public defDurationType: string;
	public taskCodePrefix: string;
	public guid: string;
	public defQtyType: string;
	public addByName: string;
	public webLocalRootPath?: string;
	public projUrl?: string;
	public defRateType: string;
	public addActRemainFlag: boolean;
	public actThisPerLinkFlag: boolean;
	public defTaskType: string;
	public actPctLinkFlag: boolean;
	public criticalPathType: string;
	public taskCodePrefixFlag: boolean;
	public defRollupDatesFlag: boolean;
	public useProjectBaselineFlag: boolean;
	public remTargetLinkFlag: boolean;
	public resetPlannedFlag: boolean;
	public allowNegActFlag: boolean;
	public sumAssignLevel: string;
	public lastFinDatesId?: number;
	public fintmplDd: number;
	public lastBaselineUpdateDate?: Date;
	public crExternalKey?: string;
	public applyActualsDate?: Date;
	public locationId?: number;
	public lastScheduleDate?: Date;
	public loadedScopeLevel: string;
	public exportFlag: boolean;
	public newFinDatesId: number;
	public baselinesToExport: string;
	public baselineNamesToExport: string;
	public nextDataDate: Date;
	public closePeriodFlag: boolean;
	public sumRefreshDate: Date;
	public trsrcsumLoaded: boolean;
	public sumtaskLoaded: boolean;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.fyStartMonthNum = Number(
			row[header.indexOf('fy_start_month_num')]
		);
		this.rsrcSelfAddFlag =
			row[header.indexOf('rsrc_self_add_flag')] === 'Y';
		this.allowCompleteFlag =
			row[header.indexOf('allow_complete_flag')] === 'Y';
		this.rsrcMultiAssignFlag =
			row[header.indexOf('rsrc_multi_assign_flag')] === 'Y';
		this.checkoutFlag = row[header.indexOf('checkout_flag')] === 'Y';
		this.projectFlag = row[header.indexOf('project_flag')] === 'Y';
		this.stepCompleteFlag =
			row[header.indexOf('step_complete_flag')] === 'Y';
		this.costQtyRecalcFlag =
			row[header.indexOf('cost_qty_recalc_flag')] === 'Y';
		this.batchSumFlag = row[header.indexOf('batch_sum_flag')] === 'Y';
		this.nameSepChar = Number(row[header.indexOf('name_sep_char')]);
		this.defCompletePctType = row[header.indexOf('def_complete_pct_type')];
		this.projShortName = row[header.indexOf('proj_short_name')];
		this.acctId = optionalNumber(row[header.indexOf('acct_id')]);
		this.origProjId = optionalNumber(row[header.indexOf('orig_proj_id')]);
		this.sourceProjId = optionalNumber(
			row[header.indexOf('source_proj_id')]
		);
		this.baseTypeId = optionalNumber(row[header.indexOf('base_type_id')]);
		this.clndrId = Number(row[header.indexOf('clndr_id')]);
		this.sumBaseProjId = optionalNumber(
			row[header.indexOf('sum_base_proj_id')]
		);
		this.taskCodeBase = row[header.indexOf('task_code_base')];
		this.taskCodeStep = row[header.indexOf('task_code_step')];
		this.priorityNum = Number(row[header.indexOf('priority_num')]);
		this.wbsMaxSumLevel = Number(row[header.indexOf('wbs_max_sum_level')]);
		this.strgyPriorityNum = Number(
			row[header.indexOf('strgy_priority_num')]
		);
		this.lastChecksum = optionalNumber(
			row[header.indexOf('last_checksum')]
		);
		this.criticalDrtnHrCnt = Number(
			row[header.indexOf('critical_drtn_hr_cnt')]
		);
		this.defCostPerQty = Number(row[header.indexOf('def_cost_per_qty')]);
		this.lastRecalcDate = new Date(row[header.indexOf('last_recalc_date')]);
		this.planStartDate = new Date(row[header.indexOf('plan_start_date')]);
		this.planEndDate = optionalDate(row[header.indexOf('plan_end_date')]);
		this.scdEndDate = optionalDate(row[header.indexOf('scd_end_date')]);
		this.addDate = new Date(row[header.indexOf('add_date')]);
		this.lastTasksumDate = optionalDate(
			row[header.indexOf('last_tasksum_date')]
		);
		this.fcstStartDate = optionalDate(
			row[header.indexOf('fcst_start_date')]
		);
		this.defDurationType = row[header.indexOf('def_duration_type')];
		this.taskCodePrefix = row[header.indexOf('task_code_prefix')];
		this.guid = row[header.indexOf('guid')];
		this.defQtyType = row[header.indexOf('def_qty_type')];
		this.addByName = row[header.indexOf('add_by_name')];
		this.webLocalRootPath = optionalString(
			row[header.indexOf('web_local_root_path')]
		);
		this.projUrl = optionalString(row[header.indexOf('proj_url')]);
		this.defRateType = row[header.indexOf('def_rate_type')];
		this.addActRemainFlag =
			row[header.indexOf('add_act_remain_flag')] === 'Y';
		this.actThisPerLinkFlag =
			row[header.indexOf('act_this_per_link_flag')] === 'Y';
		this.defTaskType = row[header.indexOf('def_task_type')];
		this.actPctLinkFlag = row[header.indexOf('act_pct_link_flag')] === 'Y';
		this.criticalPathType = row[header.indexOf('critical_path_type')];
		this.taskCodePrefixFlag =
			row[header.indexOf('task_code_prefix_flag')] === 'Y';
		this.defRollupDatesFlag =
			row[header.indexOf('def_rollup_dates_flag')] === 'Y';
		this.useProjectBaselineFlag =
			row[header.indexOf('use_project_baseline_flag')] === 'Y';
		this.remTargetLinkFlag =
			row[header.indexOf('rem_target_link_flag')] === 'Y';
		this.resetPlannedFlag =
			row[header.indexOf('reset_planned_flag')] === 'Y';
		this.allowNegActFlag =
			row[header.indexOf('allow_neg_act_flag')] === 'Y';
		this.sumAssignLevel = row[header.indexOf('sum_assign_level')];
		this.lastFinDatesId = optionalNumber(
			row[header.indexOf('last_fin_dates_id')]
		);
		this.fintmplDd = Number(row[header.indexOf('fintmpl_id')]);
		this.lastBaselineUpdateDate = optionalDate(
			row[header.indexOf('last_baseline_update_date')]
		);
		this.crExternalKey = optionalString(
			row[header.indexOf('cr_external_key')]
		);
		this.applyActualsDate = optionalDate(
			row[header.indexOf('apply_actuals_date')]
		);
		this.locationId = optionalNumber(row[header.indexOf('location_id')]);
		this.lastScheduleDate = optionalDate(
			row[header.indexOf('last_schedule_date')]
		);
		this.loadedScopeLevel = row[header.indexOf('loaded_scope_level')];
		this.exportFlag = row[header.indexOf('export_flag')] === 'Y';
		this.newFinDatesId = Number(row[header.indexOf('new_fin_dates_id')]);
		this.baselinesToExport = row[header.indexOf('baselines_to_export')];
		this.baselineNamesToExport =
			row[header.indexOf('baseline_names_to_export')];
		this.nextDataDate = new Date(row[header.indexOf('next_data_date')]);
		this.closePeriodFlag = row[header.indexOf('close_period_flag')] === 'Y';
		this.sumRefreshDate = new Date(row[header.indexOf('sum_refresh_date')]);
		this.trsrcsumLoaded = row[header.indexOf('trsrcsum_loaded')] === 'Y';
		this.sumtaskLoaded = row[header.indexOf('sumtask_loaded')] === 'Y';
	}

	public get tasks(): Task[] {
		return this.xer.tasks.filter((task) => task.projId === this.projId);
	}

	public get wbs(): ProjWBS[] {
		return this.xer.projWBS.filter(
			(projWBS) => projWBS.projId === this.projId
		);
	}

	public get scheduleOptions(): ScheduleOption {
		return this.xer.scheduleOptions.find(
			(scheduleOption) => scheduleOption.projId === this.projId
		)!;
	}
}
