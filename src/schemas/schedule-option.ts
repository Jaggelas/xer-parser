import { XER } from '../xer';
import { Project } from './project';
import { BaseSchema } from './base-schema';

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
export class ScheduleOption extends BaseSchema {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the schedule options
	 */
	public schedoptionsId!: number;
	/**
	 * Project ID these schedule options belong to
	 */
	public projId!: number;
	/**
	 * Type of external relationship dependencies
	 */
	public schedOuterDependType!: string;
	/**
	 * Whether open-ended activities are marked critical
	 */
	public schedOpenCriticalFlag!: boolean;
	/**
	 * Whether relationship lag is calculated from early start
	 */
	public schedLagEarlyStartFlag!: boolean;
	/**
	 * Logic retention setting during progress override
	 */
	public schedRetainedLogic!: string;
	/**
	 * Whether to copy plan to forecast dates
	 */
	public schedSetplantoforecast!: boolean;
	/**
	 * Type of float calculation used
	 */
	public schedFloatType!: string;
	/**
	 * Calendar used for relationship lag
	 */
	public schedCalendarOnRelationshipLag!: number;
	/**
	 * Whether to use expected finish dates
	 */
	public schedUseExpectEndFlag!: boolean;
	/**
	 * Progress override setting
	 */
	public schedProgressOverride!: string;
	/**
	 * Float threshold for resource leveling
	 */
	public levelFloatThrsCnt!: number;
	/**
	 * Whether to level resources across projects
	 */
	public levelOuterAssignFlag!: boolean;
	/**
	 * Priority for cross-project resource leveling
	 */
	public levelOuterAssignPriority!: string;
	/**
	 * Resource over-allocation threshold percentage
	 */
	public levelOverAllocPct!: number;
	/**
	 * Whether to level within float
	 */
	public levelWithinFloatFlag!: boolean;
	/**
	 * Whether to preserve scheduled dates during leveling
	 */
	public levelKeepSchedDateFlag!: boolean;
	/**
	 * Whether to level all resources
	 */
	public levelAllRsrcFlag!: boolean;
	/**
	 * Whether to use project end date for float calculations
	 */
	public schedUseProjectEndDateForFloat!: boolean;
	/**
	 * Whether multiple longest path calculation is enabled
	 */
	public enableMultipleLongestPathCalc!: boolean;
	/**
	 * Whether to limit multiple longest path calculations
	 */
	public limitMultipleLongestPathCalc!: boolean;
	/**
	 * Maximum number of longest paths to calculate
	 */
	public maxMultipleLongestPath!: number;
	/**
	 * Whether to use total float for multiple longest paths
	 */
	public useTotalFloatMultipleLongestPaths!: boolean;
	/**
	 * Key activity identifier for longest path calculations
	 */
	public keyActivityForMultipleLongestPaths!: string;
	/**
	 * Prioritized list for resource leveling
	 */
	public LevelPriorityList!: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('SCHEDOPTIONS', header, row);
	}

	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}
}
