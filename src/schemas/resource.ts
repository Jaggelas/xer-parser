import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';
import {Calendar} from './calendar';

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
		this.parentRsrcId = optionalNumber(row[header.indexOf('parent_rsrc_id')]);
		this.clndrId = Number(row[header.indexOf('clndr_id')]);
		this.roleId = optionalNumber(row[header.indexOf('role_id')]);
		this.shiftId = optionalNumber(row[header.indexOf('shift_id')]);
		this.userId = optionalNumber(row[header.indexOf('user_id')]);
		this.pobsId = optionalNumber(row[header.indexOf('pobs_id')]);
		this.guid = row[header.indexOf('guid')];
		this.rsrcSeqNum = Number(row[header.indexOf('rsrc_seq_num')]);
		this.emailAddr = optionalString(row[header.indexOf('email_addr')]);
		this.employeeCode = optionalString(row[header.indexOf('employee_code')]);
		this.officePhone = optionalString(row[header.indexOf('office_phone')]);
		this.otherPhone = optionalString(row[header.indexOf('other_phone')]);
		this.rsrcName = row[header.indexOf('rsrc_name')];
		this.rsrcShortName = row[header.indexOf('rsrc_short_name')];
		this.rsrcTitleName = optionalString(row[header.indexOf('rsrc_title_name')]);
		this.defQtyPerHr = Number(row[header.indexOf('def_qty_per_hr')]);
		this.costQtyType = row[header.indexOf('cost_qty_type')];
		this.otFactor = optionalNumber(row[header.indexOf('ot_factor')]);
		this.activeFlag = row[header.indexOf('active_flag')] === 'Y';
		this.autoComputeActFlag = row[header.indexOf('auto_compute_act_flag')] === 'Y';
		this.defCostQtyLinkFlag = row[header.indexOf('def_cost_Qty_link_flag')] === 'Y';
		this.otFlag = row[header.indexOf('ot_flag')] === 'Y';
		this.currId = Number(row[header.indexOf('curr_id')]);
		this.unitId = optionalNumber(row[header.indexOf('unit_id')]);
		this.rsrcType = row[header.indexOf('rsrc_type')];
		this.locationId = optionalNumber(row[header.indexOf('location_id')]);
		this.rsrcNotes = optionalString(row[header.indexOf('rsrc_notes')]);
		this.loadTasksFlag = row[header.indexOf('load_tasks_flag')] === 'Y';
		this.levelFlag = row[header.indexOf('level_flag')] === 'Y';
		this.lastChecksum = optionalNumber(row[header.indexOf('last_checksum')]);
	}

	public get calendar(): Calendar | undefined {
		return this.xer.calendars.find((calendar) => calendar.clndrId === this.clndrId);
	}
}
