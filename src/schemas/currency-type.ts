import { XER } from '../xer';
import { BaseSchema } from './base-schema';

/**
 * Represents a currency type with various formatting and identification properties.
 */
export class CurrencyType extends BaseSchema {
	/**
	 * The XER instance associated with this currency type.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the currency.
	 */
	public currId!: number;

	/**
	 * The number of decimal digits used in the currency.
	 */
	public decimalDigitCnt!: number;

	/**
	 * The symbol used to represent the currency.
	 */
	public currSymbol!: string;

	/**
	 * The symbol used to represent the decimal point in the currency.
	 */
	public decimalSymbol!: string;

	/**
	 * The symbol used to group digits in the currency.
	 */
	public digitGroupSymbol!: string;

	/**
	 * The format type for positive currency values.
	 */
	public posCurrFmtType!: string;

	/**
	 * The format type for negative currency values.
	 */
	public negCurrFmtType!: string;

	/**
	 * The type of the currency.
	 */
	public currType!: string;

	/**
	 * The short name of the currency.
	 */
	public currShortName!: string;

	/**
	 * The number of digits in each group for the currency.
	 */
	public groupDigitCnt!: number;

	/**
	 * The base exchange rate for the currency.
	 */
	public baseExchRate!: number;

	/**
	 * Constructs a new instance of the CurrencyType class.
	 *
	 * @param _xer - The XER instance associated with this currency type.
	 * @param header - The header row containing column names.
	 * @param row - The data row containing currency information.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('CURRTYPE', header, row);
	}
}
