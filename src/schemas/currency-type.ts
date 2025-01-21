import { XER } from '../xer';

/**
 * Represents a currency type with various formatting and identification properties.
 */
export class CurrencyType {
	/**
	 * The XER instance associated with this currency type.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the currency.
	 */
	public currId: number;

	/**
	 * The number of decimal digits used in the currency.
	 */
	public decimalDigitCnt: number;

	/**
	 * The symbol used to represent the currency.
	 */
	public currSymbol: string;

	/**
	 * The symbol used to represent the decimal point in the currency.
	 */
	public decimalSymbol: string;

	/**
	 * The symbol used to group digits in the currency.
	 */
	public digitGroupSymbol: string;

	/**
	 * The format type for positive currency values.
	 */
	public posCurrFmtType: string;

	/**
	 * The format type for negative currency values.
	 */
	public negCurrFmtType: string;

	/**
	 * The type of the currency.
	 */
	public currType: string;

	/**
	 * The short name of the currency.
	 */
	public currShortName: string;

	/**
	 * The number of digits in each group for the currency.
	 */
	public groupDigitCnt: number;

	/**
	 * The base exchange rate for the currency.
	 */
	public baseExchRate: number;

	/**
	 * Constructs a new instance of the CurrencyType class.
	 *
	 * @param _xer - The XER instance associated with this currency type.
	 * @param header - The header row containing column names.
	 * @param row - The data row containing currency information.
	 */
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
