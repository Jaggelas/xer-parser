import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';
import { Task } from './task';
import { ScheduleOption } from './schedule-option';
import { ProjWBS } from './proj-wbs';
import { Duration } from '../classes/duration.class';
import { Calendar } from './calendar';

/**
 * Represents a project in Primavera P6 XER format
 * Contains project-level settings, dates, and configuration
 *
 */
export class Project {
	/**
	 * Reference to parent XER object containing all project data
	 */
	public xer: XER;
	/**
	 * Unique identifier for the project
	 */
	public projId: number;
	/**
	 * Fiscal year start month (1-12)
	 */
	public fyStartMonthNum: number;
	/**
	 * Whether resources can add themselves to the project
	 */
	public rsrcSelfAddFlag: boolean;
	/**
	 * Whether activities can be marked as complete
	 */
	public allowCompleteFlag: boolean;
	/**
	 * Whether multiple resources can be assigned to activities
	 */
	public rsrcMultiAssignFlag: boolean;
	/**
	 * Whether project is checked out
	 */
	public checkoutFlag: boolean;
	/**
	 * Whether this is an active project
	 */
	public projectFlag: boolean;
	/**
	 * Whether step completion is enabled
	 */
	public stepCompleteFlag: boolean;
	/**
	 * Whether costs/quantities are recalculated
	 */
	public costQtyRecalcFlag: boolean;
	/**
	 * Whether batch summarization is enabled
	 */
	public batchSumFlag: boolean;
	/**
	 * Character used to separate activity names (ASCII code)
	 * @see https://www.ascii-code.com/
	 */
	public nameSepChar: number;
	/**
	 * Default percent complete type
	 */
	public defCompletePctType: string;
	/**
	 * Project short name/code (e.g. "P1")
	 */
	public projShortName: string;
	/**
	 * Account ID (optional)
	 */
	public acctId?: number;
	/**
	 * Original project ID if copied (optional)
	 */
	public origProjId?: number;
	/**
	 * Source project ID if imported (optional)
	 */
	public sourceProjId?: number;
	/**
	 * Baseline type ID (optional)
	 */
	public baseTypeId?: number;
	/**
	 * Calendar ID
	 */
	public clndrId: number;
	/**
	 * Summary base project ID (optional)
	 * @see Project
	 * @see Task
	 */
	public sumBaseProjId?: number;
	/**
	 * Base for activity codes
	 */
	public taskCodeBase: string;
	/**
	 * Step increment for activity
	 */
	public taskCodeStep: string;
	/**
	 * Project priority number
	 */
	public priorityNum: number;
	/**
	 * Maximum WBS summary level
	 */
	public wbsMaxSumLevel: number;
	/**
	 * Strategic priority number
	 */
	public strgyPriorityNum: number;
	/**
	 * Last checksum value (optional)
	 */
	public lastChecksum?: number;
	/**
	 * Critical duration in hours (e.g. 40)
	 */
	public criticalDrtn: Duration;
	/**
	 * Default cost per quantity
	 */
	public defCostPerHr: number;
	/**
	 * Last recalculation date
	 */
	public lastRecalcDate: Date;
	/**
	 * Planned start date
	 */
	public planStartDate: Date;
	/**
	 * Planned end date (optional)
	 */
	public planEndDate?: Date;
	/**
	 * Scheduled end date (optional)
	 */
	public scdEndDate?: Date;
	/**
	 * Date project was added
	 */
	public addDate: Date;
	/**
	 * Last task summarization date (optional)
	 */
	public lastTasksumDate?: Date;
	/**
	 * Forecast start date (optional)
	 */
	public fcstStartDate?: Date;
	/**
	 * Default duration type
	 */
	public defDurationType: string;
	/**
	 * Prefix for activity codes
	 */
	public taskCodePrefix: string;
	/**
	 * Globally unique identifier
	 */
	public guid: string;
	/**
	 * Default quantity type
	 */
	public defQtyType: string;
	/**
	 * Name of user who added project
	 */
	public addByName: string;
	/**
	 * Local web root path (optional)
	 */
	public webLocalRootPath?: string;
	/**
	 * Project URL (optional)
	 */
	public projUrl?: string;
	/**
	 * Default rate type
	 */
	public defRateType: string;
	/**
	 * Whether to add actual and remaining units
	 */
	public addActRemainFlag: boolean;
	/**
	 * Whether actuals this period are linked
	 */
	public actThisPerLinkFlag: boolean;
	/**
	 * Default task type
	 */
	public defTaskType: string;
	/**
	 * Whether actual percent complete is linked
	 */
	public actPctLinkFlag: boolean;
	/**
	 * Type of critical path calculation
	 */
	public criticalPathType: string;
	/**
	 * Whether activity code prefix is used
	 */
	public taskCodePrefixFlag: boolean;
	/**
	 * Whether dates roll up by default
	 */
	public defRollupDatesFlag: boolean;
	/**
	 * Whether project baseline is used
	 */
	public useProjectBaselineFlag: boolean;
	/**
	 * Whether remaining and target are linked
	 */
	public remTargetLinkFlag: boolean;
	/**
	 * Whether planned dates reset
	 */
	public resetPlannedFlag: boolean;
	/**
	 * Whether negative actuals are allowed
	 */
	public allowNegActFlag: boolean;
	/**
	 * Resource assignment summary level
	 */
	public sumAssignLevel: string;
	/**
	 * Last financial dates ID (optional)
	 */
	public lastFinDatesId?: number;
	/**
	 * Financial period template ID
	 */
	public fintmplDd: number;
	/**
	 * Last baseline update date (optional)
	 */
	public lastBaselineUpdateDate?: Date;
	/**
	 * External key for integration (optional)
	 */
	public crExternalKey?: string;
	/**
	 * Date actuals were applied (optional)
	 */
	public applyActualsDate?: Date;
	/**
	 * Location ID (optional)
	 */
	public locationId?: number;
	/**
	 * Last schedule calculation date (optional)
	 */
	public lastScheduleDate?: Date;
	/**
	 * Level of loaded scope
	 */
	public loadedScopeLevel: string;
	/**
	 * Whether project is flagged for export
	 */
	public exportFlag: boolean;
	/**
	 * New financial dates ID
	 */
	public newFinDatesId: number;
	/**
	 * Baselines marked for export
	 */
	public baselinesToExport: string;
	/**
	 * Names of baselines to export (e.g. "Baseline 1, Baseline 2")
	 */
	public baselineNamesToExport: string;
	/**
	 * Next data date
	 */
	public nextDataDate: Date;
	/**
	 * Whether period is closed
	 */
	public closePeriodFlag: boolean;
	/**
	 * Summary refresh date
	 */
	public sumRefreshDate: Date;
	/**
	 * Whether resource summaries are loaded
	 */
	public trsrcsumLoaded: boolean;
	/**
	 * Whether summary tasks are loaded
	 */
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
		this.defCostPerHr = Number(row[header.indexOf('def_cost_per_qty')]);
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
		this.criticalDrtn = new Duration(
			row[header.indexOf('critical_drtn_hr_cnt')],
			this.calendar,
			'H'
		);
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

	public get calendar(): Calendar | undefined {
		return this.xer.calendars.find(
			(calendar) => calendar.clndrId === this.clndrId
		);
	}
}
