import { XER } from '../xer';
import { Task } from './task';
import { ScheduleOption } from './schedule-option';
import { ProjWBS } from './proj-wbs';
import { Duration } from '../classes/duration.class';
import { Calendar } from './calendar';
import { Dayjs } from '../utilities/dayjs';
import { BaseSchema } from './base-schema';

/**
 * Represents a project in Primavera P6 XER format
 * Contains project-level settings, dates, and configuration
 *
 */
export class Project extends BaseSchema {
	/**
	 * Reference to parent XER object containing all project data
	 */
	public xer: XER;
	/**
	 * Unique identifier for the project
	 */
	public projId!: number;
	/**
	 * Fiscal year start month (1-12)
	 */
	public fyStartMonthNum!: number;
	/**
	 * Whether resources can add themselves to the project
	 */
	public rsrcSelfAddFlag!: boolean;
	/**
	 * Whether activities can be marked as complete
	 */
	public allowCompleteFlag!: boolean;
	/**
	 * Whether multiple resources can be assigned to activities
	 */
	public rsrcMultiAssignFlag!: boolean;
	/**
	 * Whether project is checked out
	 */
	public checkoutFlag!: boolean;
	/**
	 * Whether this is an active project
	 */
	public projectFlag!: boolean;
	/**
	 * Whether step completion is enabled
	 */
	public stepCompleteFlag!: boolean;
	/**
	 * Whether costs/quantities are recalculated
	 */
	public costQtyRecalcFlag!: boolean;
	/**
	 * Whether batch summarization is enabled
	 */
	public batchSumFlag!: boolean;
	/**
	 * Character used to separate activity names (ASCII code)
	 * @see https://www.ascii-code.com/
	 */
	public nameSepChar!: number;
	/**
	 * Default percent complete type
	 */
	public defCompletePctType!: string;
	/**
	 * Project short name/code (e.g. "P1")
	 */
	public projShortName!: string;
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
	public clndrId!: number;
	/**
	 * Summary base project ID (optional)
	 * @see Project
	 * @see Task
	 */
	public sumBaseProjId?: number;
	/**
	 * Base for activity codes
	 */
	public taskCodeBase!: string;
	/**
	 * Step increment for activity
	 */
	public taskCodeStep!: string;
	/**
	 * Project priority number
	 */
	public priorityNum!: number;
	/**
	 * Maximum WBS summary level
	 */
	public wbsMaxSumLevel!: number;
	/**
	 * Strategic priority number
	 */
	public strgyPriorityNum!: number;
	/**
	 * Last checksum value (optional)
	 */
	public lastChecksum?: number;
	/**
	 * Critical duration in hours (e.g. 40)
	 */
	public criticalDrtn!: Duration;
	/**
	 * Default cost per quantity
	 */
	public defCostPerHr!: number;
	/**
	 * Last recalculation date
	 */
	public lastRecalcDate!: Dayjs;
	/**
	 * Planned start date
	 */
	public planStartDate!: Dayjs;
	/**
	 * Planned end date (optional)
	 */
	public planEndDate?: Dayjs;
	/**
	 * Scheduled end date (optional)
	 */
	public scdEndDate?: Dayjs;
	/**
	 * Date project was added
	 */
	public addDate!: Dayjs;
	/**
	 * Last task summarization date (optional)
	 */
	public lastTasksumDate?: Dayjs;
	/**
	 * Forecast start date (optional)
	 */
	public fcstStartDate?: Dayjs;
	/**
	 * Default duration type
	 */
	public defDurationType!: string;
	/**
	 * Prefix for activity codes
	 */
	public taskCodePrefix!: string;
	/**
	 * Globally unique identifier
	 */
	public guid!: string;
	/**
	 * Default quantity type
	 */
	public defQtyType!: string;
	/**
	 * Name of user who added project
	 */
	public addByName!: string;
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
	public defRateType!: string;
	/**
	 * Whether to add actual and remaining units
	 */
	public addActRemainFlag!: boolean;
	/**
	 * Whether actuals this period are linked
	 */
	public actThisPerLinkFlag!: boolean;
	/**
	 * Default task type
	 */
	public defTaskType!: string;
	/**
	 * Whether actual percent complete is linked
	 */
	public actPctLinkFlag!: boolean;
	/**
	 * Type of critical path calculation
	 */
	public criticalPathType!: string;
	/**
	 * Whether activity code prefix is used
	 */
	public taskCodePrefixFlag!: boolean;
	/**
	 * Whether dates roll up by default
	 */
	public defRollupDatesFlag!: boolean;
	/**
	 * Whether project baseline is used
	 */
	public useProjectBaselineFlag!: boolean;
	/**
	 * Whether remaining and target are linked
	 */
	public remTargetLinkFlag!: boolean;
	/**
	 * Whether planned dates reset
	 */
	public resetPlannedFlag!: boolean;
	/**
	 * Whether negative actuals are allowed
	 */
	public allowNegActFlag!: boolean;
	/**
	 * Resource assignment summary level
	 */
	public sumAssignLevel!: string;
	/**
	 * Last financial dates ID (optional)
	 */
	public lastFinDatesId?: number;
	/**
	 * Financial period template ID
	 */
	public fintmplDd!: number;
	/**
	 * Last baseline update date (optional)
	 */
	public lastBaselineUpdateDate?: Dayjs;
	/**
	 * External key for integration (optional)
	 */
	public crExternalKey?: string;
	/**
	 * Date actuals were applied (optional)
	 */
	public applyActualsDate?: Dayjs;
	/**
	 * Location ID (optional)
	 */
	public locationId?: number;
	/**
	 * Last schedule calculation date (optional)
	 */
	public lastScheduleDate?: Dayjs;
	/**
	 * Level of loaded scope
	 */
	public loadedScopeLevel!: string;
	/**
	 * Whether project is flagged for export
	 */
	public exportFlag!: boolean;
	/**
	 * New financial dates ID
	 */
	public newFinDatesId!: number;
	/**
	 * Baselines marked for export
	 */
	public baselinesToExport!: string;
	/**
	 * Names of baselines to export (e.g. "Baseline 1, Baseline 2")
	 */
	public baselineNamesToExport!: string;
	/**
	 * Next data date
	 */
	public nextDataDate!: Dayjs;
	/**
	 * Whether period is closed
	 */
	public closePeriodFlag!: boolean;
	/**
	 * Summary refresh date
	 */
	public sumRefreshDate!: Dayjs;
	/**
	 * Whether resource summaries are loaded
	 */
	public trsrcsumLoaded!: boolean;
	/**
	 * Whether summary tasks are loaded
	 */
	public sumtaskLoaded!: boolean;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('PROJECT', header, row);
		// Custom: construct Duration from raw hours
		this.criticalDrtn = new Duration(
			row[header.indexOf('critical_drtn_hr_cnt')],
			this.calendar,
			'h'
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
