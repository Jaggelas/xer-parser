import {XER} from '@/xer';

export class FinancialTemplate {
	public xer: XER;
	public fintmplId: number;
	public fintmplName: string;
	public defaultFlag: Boolean;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.fintmplId = Number(row[header.indexOf('fintmpl_id')]);
		this.fintmplName = row[header.indexOf('fintmpl_name')];
		this.defaultFlag = row[header.indexOf('default_flag')] === 'Y';
	}
}
