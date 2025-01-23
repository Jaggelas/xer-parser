import { XER } from '../xer';
import { Project } from './project';

/**
 * Represents scheduling options for a project in Primavera P6.
 * Contains various settings and parameters that control how the project schedule is calculated.
 *
 * @property xer - Reference to the parent XER object
 * @property schedoptionsId - Unique identifier for the schedule options
 * @property projId - Project ID these schedule options belong to
 * @property schedOuterDependType - Type of external relationship dependencies
 * @property schedOpenCriticalFlag - Whether open-ended activities are marked critical
 * @property schedLagEarlyStartFlag - Whether relationship lag is calculated from early start
 * @property schedRetainedLogic - Logic retention setting during progress override
 * @property schedSetplantoforecast - Whether to copy plan to forecast dates
 * @property schedFloatType - Type of float calculation used
 * @property schedCalendarOnRelationshipLag - Calendar used for relationship lag
 * @property schedUseExpectEndFlag - Whether to use expected finish dates
 * @property schedProgressOverride - Progress override setting
 * @property levelFloatThrsCnt - Float threshold for resource leveling
 * @property levelOuterAssignFlag - Whether to level resources across projects
 * @property levelOuterAssignPriority - Priority for cross-project resource leveling
 * @property levelOverAllocPct - Resource over-allocation threshold percentage
 * @property levelWithinFloatFlag - Whether to level within float
 * @property levelKeepSchedDateFlag - Whether to preserve scheduled dates during leveling
 * @property levelAllRsrcFlag - Whether to level all resources
 * @property schedUseProjectEndDateForFloat - Whether to use project end date for float calculations
 * @property enableMultipleLongestPathCalc - Whether multiple longest path calculation is enabled
 * @property limitMultipleLongestPathCalc - Whether to limit multiple longest path calculations
 * @property maxMultipleLongestPath - Maximum number of longest paths to calculate
 * @property useTotalFloatMultipleLongestPaths - Whether to use total float for multiple longest paths
 * @property keyActivityForMultipleLongestPaths - Key activity identifier for longest path calculations
 * @property LevelPriorityList - Prioritized list for resource leveling
 */
export class ScheduleOption {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the schedule options
	 */
	public schedoptionsId: number;
	/**
	 * Project ID these schedule options belong to
	 */
	public projId: number;
	/**
	 * Type of external relationship dependencies
	 */
	public schedOuterDependType: string;
	/**
	 * Whether open-ended activities are marked critical
	 */
	public schedOpenCriticalFlag: boolean;
	/**
	 * Whether relationship lag is calculated from early start
	 */
	public schedLagEarlyStartFlag: boolean;
	/**
	 * Logic retention setting during progress override
	 */
	public schedRetainedLogic: string;
	/**
	 * Whether to copy plan to forecast dates
	 */
	public schedSetplantoforecast: boolean;
	/**
	 * Type of float calculation used
	 */
	public schedFloatType: string;
	/**
	 * Calendar used for relationship lag
	 */
	public schedCalendarOnRelationshipLag: number;
	/**
	 * Whether to use expected finish dates
	 */
	public schedUseExpectEndFlag: boolean;
	/**
	 * Progress override setting
	 */
	public schedProgressOverride: string;
	/**
	 * Float threshold for resource leveling
	 */
	public levelFloatThrsCnt: number;
	/**
	 * Whether to level resources across projects
	 */
	public levelOuterAssignFlag: boolean;
	/**
	 * Priority for cross-project resource leveling
	 */
	public levelOuterAssignPriority: string;
	/**
	 * Resource over-allocation threshold percentage
	 */
	public levelOverAllocPct: number;
	/**
	 * Whether to level within float
	 */
	public levelWithinFloatFlag: boolean;
	/**
	 * Whether to preserve scheduled dates during leveling
	 */
	public levelKeepSchedDateFlag: boolean;
	/**
	 * Whether to level all resources
	 */
	public levelAllRsrcFlag: boolean;
	/**
	 * Whether to use project end date for float calculations
	 */
	public schedUseProjectEndDateForFloat: boolean;
	/**
	 * Whether multiple longest path calculation is enabled
	 */
	public enableMultipleLongestPathCalc: boolean;
	/**
	 * Whether to limit multiple longest path calculations
	 */
	public limitMultipleLongestPathCalc: boolean;
	/**
	 * Maximum number of longest paths to calculate
	 */
	public maxMultipleLongestPath: number;
	/**
	 * Whether to use total float for multiple longest paths
	 */
	public useTotalFloatMultipleLongestPaths: boolean;
	/**
	 * Key activity identifier for longest path calculations
	 */
	public keyActivityForMultipleLongestPaths: string;
	/**
	 * Prioritized list for resource leveling
	 */
	public LevelPriorityList: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.schedoptionsId = Number(row[header.indexOf('schedoptions_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.schedOuterDependType =
			row[header.indexOf('sched_outer_depend_type')];
		this.schedOpenCriticalFlag =
			row[header.indexOf('sched_open_critical_flag')] === 'Y';
		this.schedLagEarlyStartFlag =
			row[header.indexOf('sched_lag_early_start_flag')] === 'Y';
		this.schedRetainedLogic = row[header.indexOf('sched_retained_logic')];
		this.schedSetplantoforecast =
			row[header.indexOf('sched_setplantoforecast')] === 'Y';
		this.schedFloatType = row[header.indexOf('sched_float_type')];
		this.schedCalendarOnRelationshipLag = Number(
			row[header.indexOf('sched_calendar_on_relationship_lag')]
		);
		this.schedUseExpectEndFlag =
			row[header.indexOf('sched_use_expect_end_flag')] === 'Y';
		this.schedProgressOverride =
			row[header.indexOf('sched_progress_override')];
		this.levelFloatThrsCnt = Number(
			row[header.indexOf('level_float_thrs_cnt')]
		);
		this.levelOuterAssignFlag =
			row[header.indexOf('level_outer_assign_flag')] === 'Y';
		this.levelOuterAssignPriority =
			row[header.indexOf('level_outer_assign_priority')];
		this.levelOverAllocPct = Number(
			row[header.indexOf('level_over_alloc_pct')]
		);
		this.levelWithinFloatFlag =
			row[header.indexOf('level_within_float_flag')] === 'Y';
		this.levelKeepSchedDateFlag =
			row[header.indexOf('level_keep_sched_date_flag')] === 'Y';
		this.levelAllRsrcFlag =
			row[header.indexOf('level_all_rsrc_flag')] === 'Y';
		this.schedUseProjectEndDateForFloat =
			row[header.indexOf('sched_use_project_end_date_for_float')] === 'Y';
		this.enableMultipleLongestPathCalc =
			row[header.indexOf('enable_multiple_longest_path_calc')] === 'Y';
		this.limitMultipleLongestPathCalc =
			row[header.indexOf('limit_multiple_longest_path_calc')] === 'Y';
		this.maxMultipleLongestPath = Number(
			row[header.indexOf('max_multiple_longest_path')]
		);
		this.useTotalFloatMultipleLongestPaths =
			row[header.indexOf('use_total_float_multiple_longest_paths')] ===
			'Y';
		this.keyActivityForMultipleLongestPaths =
			row[header.indexOf('key_activity_for_multiple_longest_paths')];
		this.LevelPriorityList = row[header.indexOf('LevelPriorityList')];
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}
}
