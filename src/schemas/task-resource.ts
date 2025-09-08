import { Dayjs } from '../utilities/dayjs';
import { Duration } from '../classes/duration.class';
// no longer need optional converters here; BaseSchema handles conversions
import { XER } from '../xer';
import { Project } from './project';
import { Resource } from './resource';
import { BaseSchema } from './base-schema';

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
export class TaskResource extends BaseSchema {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the task resource assignment
	 */
	public taskrsrcId!: number;
	/**
	 * ID of the task this resource is assigned to
	 */
	public taskId!: number;
	/**
	 * ID of the project this assignment belongs to
	 */
	public projId!: number;
	/**
	 * Indicates if cost and quantity are linked
	 */
	public costQtyLinkFlag!: boolean;
	/**
	 * ID of the role assigned
	 */
	public roleId!: number;
	/**
	 * Optional account ID associated with this assignment
	 */
	public acctId?: number;
	/**
	 * ID of the resource assigned
	 */
	public rsrcId!: number;
	/**
	 * Optional project WBS ID
	 */
	public pobsId?: number;
	/**
	 * Skill level of the resource for this assignment
	 */
	public skillLevel!: number;
	/**
	 * Remaining quantity of work
	 */
	public remainQty!: number;
	/**
	 * Target quantity of work
	 */
	public targetQty!: number;
	/**
	 * Remaining quantity per hour
	 */
	public remainQtyPerHr!: number;
	/**
	 * Target lag duration in hours
	 */
	public targetLag!: Duration;
	/**
	 * Target quantity per hour
	 */
	public targetQtyPerHr!: number;
	/**
	 * Actual overtime quantity
	 */
	public actOtQty!: number;
	/**
	 * Actual regular time quantity
	 */
	public actRegQty!: number;
	/**
	 * Remaining lag duration in hours
	 */
	public relag!: Duration;
	/**
	 * Optional overtime factor
	 */
	public otFactor?: number;
	/**
	 * Cost per quantity unit
	 */
	public costPerQty!: number;
	/**
	 * Target cost for the assignment
	 */
	public targetCost!: number;
	/**
	 * Actual regular time cost
	 */
	public actRegCost!: number;
	/**
	 * Actual overtime cost
	 */
	public actOtCost!: number;
	/**
	 * Remaining cost
	 */
	public remainCost!: number;
	/**
	 * Optional actual start date
	 */
	public actStartDate?: Dayjs;
	/**
	 * Optional actual end date
	 */
	public actEndDate?: Dayjs;
	/**
	 * Remaining start date
	 */
	public restartDate!: Dayjs;
	/**
	 * Remaining end date
	 */
	public reendDate!: Dayjs;
	/**
	 * Target start date
	 */
	public targetStartDate!: Dayjs;
	/**
	 * Target end date
	 */
	public targetEndDate!: Dayjs;
	/**
	 * Remaining late start date
	 */
	public remLateStartDate!: Dayjs;
	/**
	 * Remaining late end date
	 */
	public remLateEndDate!: Dayjs;
	/**
	 * Indicates if dates should roll up
	 */
	public rollupDatesFlag!: boolean;
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
	public guid!: string;
	/**
	 * Type of rate applied
	 */
	public rateType!: string;
	/**
	 * Actual cost this period
	 */
	public actThisPerCost!: number;
	/**
	 * Actual quantity this period
	 */
	public actThisPerQty!: number;
	/**
	 * Optional curve ID
	 */
	public curvId?: number;
	/**
	 * Resource type
	 */
	public rsrcType!: string;
	/**
	 * Source type for cost per quantity unit value
	 */
	public costPerQtySourceType!: string;
	/**
	 * User who created the assignment
	 */
	public createUser!: string;
	/**
	 * Date when assignment was created
	 */
	public createDate!: Dayjs;
	/**
	 * Indicates if resource has hours
	 */
	public hasRsrchours!: boolean;
	/**
	 * Task resource summary ID
	 */
	public taskrsrcSumId!: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('TASKRSRC', header, row);
		// Custom: Duration fields constructed from hours
		this.targetLag = new Duration(
			row[header.indexOf('target_lag_drtn_hr_cnt')],
			this.project.calendar,
			'h'
		);
		this.relag = new Duration(
			row[header.indexOf('relag_drtn_hr_cnt')],
			this.project.calendar,
			'h'
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
