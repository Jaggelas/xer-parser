import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';
import {Project} from './project';

export class ActivityCodeType {
	public xer: XER;
	public actvCodeTypeId: number;
	public actvShortLen: number;
	public seqNum: number;
	public actvCodeType: string;
	public projId?: number;
	public wbsId: number;
	public actvCodeTypeScope: string;
	public exportFlag: boolean;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.actvCodeTypeId = Number(row[header.indexOf('actv_code_type_id')]);
		this.actvShortLen = Number(row[header.indexOf('actv_short_len')]);
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.actvCodeType = row[header.indexOf('actv_code_type')];
		this.projId = optionalNumber(row[header.indexOf('proj_id')]);
		this.wbsId = Number(row[header.indexOf('wbs_id')]);
		this.actvCodeTypeScope = row[header.indexOf('actv_code_type_scope')];
		this.exportFlag = row[header.indexOf('export_flag')] === 'Y';
	}

	public get activityCodeType(): ActivityCodeType {
		return this.xer.activityCodeTypes.find((activityCodeType) => activityCodeType.actvCodeTypeId === this.actvCodeTypeId)!;
	}

	public get project(): Project {
		return this.xer.projects.find((project) => project.projId === this.projId)!;
	}
}
