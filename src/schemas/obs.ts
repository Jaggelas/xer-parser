import {XER} from '@/xer';

export class OBS {
	public xer: XER;
	public obsId: number;
	public parentObsId: number;
	public guid: string;
	public seqNum: number;
	public obsName: string;
	public obsDescr: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.obsId = Number(row[header.indexOf('obs_id')]);
		this.parentObsId = Number(row[header.indexOf('parent_obs_id')]);
		this.guid = row[header.indexOf('guid')];
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.obsName = row[header.indexOf('obs_name')];
		this.obsDescr = row[header.indexOf('obs_descr')];
	}
}
