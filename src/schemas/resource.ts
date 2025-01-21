import { optionalNumber, optionalString } from '../utilities/string-convert';
import { XER } from '../xer';
import { Calendar } from './calendar';

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
export class Resource {
	public xer: XER;
	public rsrcId: number;
	public parentRsrcId?: number;
	public clndrId: number;
	public roleId?: number;
	public shiftId?: number;
	public userId?: number;
	public pobsId?: number;
	public guid: string;
	public rsrcSeqNum: number;
	public emailAddr?: string;
	public employeeCode?: string;
	public officePhone?: string;
	public otherPhone?: string;
	public rsrcName: string;
	public rsrcShortName: string;
	public rsrcTitleName?: string;
	public defQtyPerHr: number;
	public costQtyType: string;
	public otFactor?: number;
	public activeFlag: boolean;
	public autoComputeActFlag: boolean;
	public defCostQtyLinkFlag: boolean;
	public otFlag: boolean;
	public currId: number;
	public unitId?: number;
	public rsrcType: string;
	public locationId?: number;
	public rsrcNotes?: string;
	public loadTasksFlag: boolean;
	public levelFlag: boolean;
	public lastChecksum?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.rsrcId = Number(row[header.indexOf('rsrc_id')]);
		this.parentRsrcId = optionalNumber(
			row[header.indexOf('parent_rsrc_id')]
		);
		this.clndrId = Number(row[header.indexOf('clndr_id')]);
		this.roleId = optionalNumber(row[header.indexOf('role_id')]);
		this.shiftId = optionalNumber(row[header.indexOf('shift_id')]);
		this.userId = optionalNumber(row[header.indexOf('user_id')]);
		this.pobsId = optionalNumber(row[header.indexOf('pobs_id')]);
		this.guid = row[header.indexOf('guid')];
		this.rsrcSeqNum = Number(row[header.indexOf('rsrc_seq_num')]);
		this.emailAddr = optionalString(row[header.indexOf('email_addr')]);
		this.employeeCode = optionalString(
			row[header.indexOf('employee_code')]
		);
		this.officePhone = optionalString(row[header.indexOf('office_phone')]);
		this.otherPhone = optionalString(row[header.indexOf('other_phone')]);
		this.rsrcName = row[header.indexOf('rsrc_name')];
		this.rsrcShortName = row[header.indexOf('rsrc_short_name')];
		this.rsrcTitleName = optionalString(
			row[header.indexOf('rsrc_title_name')]
		);
		this.defQtyPerHr = Number(row[header.indexOf('def_qty_per_hr')]);
		this.costQtyType = row[header.indexOf('cost_qty_type')];
		this.otFactor = optionalNumber(row[header.indexOf('ot_factor')]);
		this.activeFlag = row[header.indexOf('active_flag')] === 'Y';
		this.autoComputeActFlag =
			row[header.indexOf('auto_compute_act_flag')] === 'Y';
		this.defCostQtyLinkFlag =
			row[header.indexOf('def_cost_Qty_link_flag')] === 'Y';
		this.otFlag = row[header.indexOf('ot_flag')] === 'Y';
		this.currId = Number(row[header.indexOf('curr_id')]);
		this.unitId = optionalNumber(row[header.indexOf('unit_id')]);
		this.rsrcType = row[header.indexOf('rsrc_type')];
		this.locationId = optionalNumber(row[header.indexOf('location_id')]);
		this.rsrcNotes = optionalString(row[header.indexOf('rsrc_notes')]);
		this.loadTasksFlag = row[header.indexOf('load_tasks_flag')] === 'Y';
		this.levelFlag = row[header.indexOf('level_flag')] === 'Y';
		this.lastChecksum = optionalNumber(
			row[header.indexOf('last_checksum')]
		);
	}

	public get calendar(): Calendar | undefined {
		return this.xer.calendars.find(
			(calendar) => calendar.clndrId === this.clndrId
		);
	}
}
