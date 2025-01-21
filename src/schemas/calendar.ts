import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';
import {Project} from './project';

export class Calendar {
	public xer: XER;
	public clndrId: number;
	public defaultFlag: boolean;
	public clndrName: string;
	public projId?: number;
	public baseClndrId?: number;
	public lastChngDate?: Date;
	public clndrType: string;
	public dayHrCnt: number;
	public weekHrCnt: number;
	public monthHrCnt: number;
	public yearHrCnt: number;
	public rsrcPrivate: boolean;
	public clndrData: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.clndrId = Number(row[header.indexOf('clndr_id')]);
		this.defaultFlag = row[header.indexOf('default_flag')] === 'Y';
		this.clndrName = row[header.indexOf('clndr_name')];
		this.projId = optionalNumber(row[header.indexOf('proj_id')]);
		this.baseClndrId = optionalNumber(row[header.indexOf('base_clndr_id')]);
		this.lastChngDate = optionalDate(row[header.indexOf('last_chng_date')]);
		this.clndrType = row[header.indexOf('clndr_type')];
		this.dayHrCnt = Number(row[header.indexOf('day_hr_cnt')]);
		this.weekHrCnt = Number(row[header.indexOf('week_hr_cnt')]);
		this.monthHrCnt = Number(row[header.indexOf('month_hr_cnt')]);
		this.yearHrCnt = Number(row[header.indexOf('year_hr_cnt')]);
		this.rsrcPrivate = row[header.indexOf('rsrc_private')] === 'Y';
		this.clndrData = row[header.indexOf('clndr_data')];
	}

	public get project(): Project {
		return this.xer.projects.find((project) => project.projId === this.projId)!;
	}
}
