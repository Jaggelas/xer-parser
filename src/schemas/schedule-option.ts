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
	public xer: XER;
	public schedoptionsId: number;
	public projId: number;
	public schedOuterDependType: string;
	public schedOpenCriticalFlag: boolean;
	public schedLagEarlyStartFlag: boolean;
	public schedRetainedLogic: string;
	public schedSetplantoforecast: boolean;
	public schedFloatType: string;
	public schedCalendarOnRelationshipLag: number;
	public schedUseExpectEndFlag: boolean;
	public schedProgressOverride: string;
	public levelFloatThrsCnt: number;
	public levelOuterAssignFlag: boolean;
	public levelOuterAssignPriority: string;
	public levelOverAllocPct: number;
	public levelWithinFloatFlag: boolean;
	public levelKeepSchedDateFlag: boolean;
	public levelAllRsrcFlag: boolean;
	public schedUseProjectEndDateForFloat: boolean;
	public enableMultipleLongestPathCalc: boolean;
	public limitMultipleLongestPathCalc: boolean;
	public maxMultipleLongestPath: number;
	public useTotalFloatMultipleLongestPaths: boolean;
	public keyActivityForMultipleLongestPaths: string;
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
