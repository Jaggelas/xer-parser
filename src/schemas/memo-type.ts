import {XER} from '@/xer';

export class MemoType {
	public xer: XER;
	public memoTypeId: number;
	public seqNum: number;
	public epsFlag: Boolean;
	public projFlag: Boolean;
	public wbsFlag: Boolean;
	public taskFlag: Boolean;
	public memoType: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.memoTypeId = Number(row[header.indexOf('memo_type_id')]);
		this.seqNum = Number(row[header.indexOf('seq_num')]);
		this.epsFlag = row[header.indexOf('eps_flag')] === 'Y';
		this.projFlag = row[header.indexOf('proj_flag')] === 'Y';
		this.wbsFlag = row[header.indexOf('wbs_flag')] === 'Y';
		this.taskFlag = row[header.indexOf('task_flag')] === 'Y';
		this.memoType = row[header.indexOf('memo_type')];
	}
}
