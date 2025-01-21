import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';
import {ActivityCodeType} from './activity-code-type';

export class ActivityCode {
	public xer: XER;
	public actvCodeId: number;
	public parentActvCodeId?: number;
	public actvCodeTypeId: number;
	public actvCodeName: string;
	public shortName: string;
	public seqNum: number;
	public color: number;
	public totalAssignments: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.actvCodeId = Number(row[header.indexOf('actv_code_id')]);
		this.parentActvCodeId = optionalNumber(row[header.indexOf('parent_actv_code_id')]);
		this.actvCodeTypeId = Number(row[header.indexOf('actv_code_type_id')]);
		this.actvCodeName = row[header.indexOf('actv_code_name')];
		this.shortName = row[header.indexOf('short_name')];
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.color = Number(row[header.indexOf('color')]);
		this.totalAssignments = Number(row[header.indexOf('total_assignments')]);
	}

	public get parentActivityCode(): ActivityCode | undefined {
		return this.xer.activityCodes.find((activityCode) => activityCode.actvCodeId === this.parentActvCodeId);
	}

	public get activityCodeType(): ActivityCodeType {
		return this.xer.activityCodeTypes.find((activityCodeType) => activityCodeType.actvCodeTypeId === this.actvCodeTypeId)!;
	}
}
