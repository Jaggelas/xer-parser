import {XER} from '@/xer';
import {Project} from './project';

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
		this.schedOuterDependType = row[header.indexOf('sched_outer_depend_type')];
		this.schedOpenCriticalFlag = row[header.indexOf('sched_open_critical_flag')] === 'Y';
		this.schedLagEarlyStartFlag = row[header.indexOf('sched_lag_early_start_flag')] === 'Y';
		this.schedRetainedLogic = row[header.indexOf('sched_retained_logic')];
		this.schedSetplantoforecast = row[header.indexOf('sched_setplantoforecast')] === 'Y';
		this.schedFloatType = row[header.indexOf('sched_float_type')];
		this.schedCalendarOnRelationshipLag = Number(row[header.indexOf('sched_calendar_on_relationship_lag')]);
		this.schedUseExpectEndFlag = row[header.indexOf('sched_use_expect_end_flag')] === 'Y';
		this.schedProgressOverride = row[header.indexOf('sched_progress_override')];
		this.levelFloatThrsCnt = Number(row[header.indexOf('level_float_thrs_cnt')]);
		this.levelOuterAssignFlag = row[header.indexOf('level_outer_assign_flag')] === 'Y';
		this.levelOuterAssignPriority = row[header.indexOf('level_outer_assign_priority')];
		this.levelOverAllocPct = Number(row[header.indexOf('level_over_alloc_pct')]);
		this.levelWithinFloatFlag = row[header.indexOf('level_within_float_flag')] === 'Y';
		this.levelKeepSchedDateFlag = row[header.indexOf('level_keep_sched_date_flag')] === 'Y';
		this.levelAllRsrcFlag = row[header.indexOf('level_all_rsrc_flag')] === 'Y';
		this.schedUseProjectEndDateForFloat = row[header.indexOf('sched_use_project_end_date_for_float')] === 'Y';
		this.enableMultipleLongestPathCalc = row[header.indexOf('enable_multiple_longest_path_calc')] === 'Y';
		this.limitMultipleLongestPathCalc = row[header.indexOf('limit_multiple_longest_path_calc')] === 'Y';
		this.maxMultipleLongestPath = Number(row[header.indexOf('max_multiple_longest_path')]);
		this.useTotalFloatMultipleLongestPaths = row[header.indexOf('use_total_float_multiple_longest_paths')] === 'Y';
		this.keyActivityForMultipleLongestPaths = row[header.indexOf('key_activity_for_multiple_longest_paths')];
		this.LevelPriorityList = row[header.indexOf('LevelPriorityList')];
	}

	public get project(): Project {
		return this.xer.projects.find((project) => project.projId === this.projId)!;
	}
}
