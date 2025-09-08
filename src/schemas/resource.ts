import { XER } from '../xer';
import { Calendar } from './calendar';
import { BaseSchema } from './base-schema';

/**
 * Represents a resource in the XER file format.
 * Resources can be labor, materials, or equipment used in project activities.
 *
 * @property xer - Reference to the parent XER object
 * @property rsrcId - Unique identifier for the resource
 * @property parentRsrcId - Optional ID of the parent resource if hierarchical
 * @property clndrId - ID of the calendar associated with this resource
 * @property roleId - Optional role ID assigned to this resource
 * @property shiftId - Optional shift ID assigned to this resource
 * @property userId - Optional user ID linked to this resource
 * @property pobsId - Optional position business structure ID
 * @property guid - Globally unique identifier for the resource
 * @property rsrcSeqNum - Sequence number for the resource
 * @property emailAddr - Optional email address of the resource
 * @property employeeCode - Optional employee code/number
 * @property officePhone - Optional office phone number
 * @property otherPhone - Optional alternative phone number
 * @property rsrcName - Full name of the resource
 * @property rsrcShortName - Abbreviated name of the resource
 * @property rsrcTitleName - Optional title/position name
 * @property defQtyPerHr - Default quantity per hour for the resource
 * @property costQtyType - Type of cost quantity measurement
 * @property otFactor - Optional overtime factor
 * @property activeFlag - Indicates if the resource is active
 * @property autoComputeActFlag - Indicates if actuals are automatically computed
 * @property defCostQtyLinkFlag - Indicates if cost quantity is linked by default
 * @property otFlag - Indicates if overtime is allowed
 * @property currId - Currency ID for resource costs
 * @property unitId - Optional unit of measurement ID
 * @property rsrcType - Type of resource (e.g., labor, material, equipment)
 * @property locationId - Optional location ID for the resource
 * @property rsrcNotes - Optional notes about the resource
 * @property loadTasksFlag - Indicates if tasks can be loaded to this resource
 * @property levelFlag - Indicates if resource leveling is enabled
 * @property lastChecksum - Optional checksum for data integrity
 */
export class Resource extends BaseSchema {
	/**
	 * Reference to the parent XER object
	 */
	public xer: XER;
	/**
	 * Unique identifier for the resource
	 */
	public rsrcId!: number;
	/**
	 * Optional ID of the parent resource if hierarchical
	 */
	public parentRsrcId?: number;
	/**
	 * ID of the calendar associated with this resource
	 */
	public clndrId!: number;
	/**
	 * Optional role ID assigned to this resource
	 */
	public roleId?: number;
	/**
	 * Optional shift ID assigned to this resource
	 */
	public shiftId?: number;
	/**
	 * Optional user ID linked to this resource
	 */
	public userId?: number;
	/**
	 * Optional position business structure ID
	 */
	public pobsId?: number;
	/**
	 * Globally unique identifier for the resource
	 */
	public guid!: string;
	/**
	 * Sequence number for the resource
	 */
	public rsrcSeqNum!: number;
	/**
	 * Optional email address of the resource
	 */
	public emailAddr?: string;
	/**
	 * Optional employee code/number
	 */
	public employeeCode?: string;
	/**
	 * Optional office phone number
	 */
	public officePhone?: string;
	/**
	 * Optional alternative phone number
	 */
	public otherPhone?: string;
	/**
	 * Full name of the resource
	 */
	public rsrcName!: string;
	/**
	 * Abbreviated name of the resource
	 */
	public rsrcShortName!: string;
	/**
	 * Optional title/position name
	 */
	public rsrcTitleName?: string;
	/**
	 * Default quantity per hour for the resource
	 */
	public defQtyPerHr!: number;
	/**
	 * Type of cost quantity measurement
	 */
	public costQtyType!: string;
	/**
	 * Optional overtime factor
	 */
	public otFactor?: number;
	/**
	 * Indicates if the resource is active
	 */
	public activeFlag!: boolean;
	/**
	 * Indicates if actuals are automatically computed
	 */
	public autoComputeActFlag!: boolean;
	/**
	 * Indicates if cost quantity is linked by default
	 */
	public defCostQtyLinkFlag!: boolean;
	/**
	 * Indicates if overtime is allowed
	 */
	public otFlag!: boolean;
	/**
	 * Currency ID for resource costs
	 */
	public currId!: number;
	/**
	 * Optional unit of measurement ID
	 */
	public unitId?: number;
	/**
	 * Type of resource (e.g., labor, material, equipment)
	 */
	public rsrcType!: string;
	/**
	 * Optional location ID for the resource
	 */
	public locationId?: number;
	/**
	 * Optional notes about the resource
	 */
	public rsrcNotes?: string;
	/**
	 * Indicates if tasks can be loaded to this resource
	 */
	public loadTasksFlag!: boolean;
	/**
	 * Indicates if resource leveling is enabled
	 */
	public levelFlag!: boolean;
	/**
	 * Optional checksum for data integrity
	 */
	public lastChecksum?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('RSRC', header, row);
	}

	public get calendar(): Calendar | undefined {
		return this.xer.calendars.find(
			(calendar) => calendar.clndrId === this.clndrId
		);
	}
}
