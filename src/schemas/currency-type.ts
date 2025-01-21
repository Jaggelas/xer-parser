import {XER} from '@/xer';

export class CurrencyType {
	public xer: XER;
	public currId: number;
	public decimalDigitCnt: number;
	public currSymbol: string;
	public decimalSymbol: string;
	public digitGroupSymbol: string;
	public posCurrFmtType: string;
	public negCurrFmtType: string;
	public currType: string;
	public currShortName: string;
	public groupDigitCnt: number;
	public baseExchRate: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.currId = Number(row[header.indexOf('curr_id')]);
		this.decimalDigitCnt = Number(row[header.indexOf('decimal_digit_cnt')]);
		this.currSymbol = row[header.indexOf('curr_symbol')];
		this.decimalSymbol = row[header.indexOf('decimal_symbol')];
		this.digitGroupSymbol = row[header.indexOf('digit_group_symbol')];
		this.posCurrFmtType = row[header.indexOf('pos_curr_fmt_type')];
		this.negCurrFmtType = row[header.indexOf('neg_curr_fmt_type')];
		this.currType = row[header.indexOf('curr_type')];
		this.currShortName = row[header.indexOf('curr_short_name')];
		this.groupDigitCnt = Number(row[header.indexOf('group_digit_cnt')]);
		this.baseExchRate = Number(row[header.indexOf('base_exch_rate')]);
	}
}
