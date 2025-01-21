import { XER } from '../xer';

/**
 * Represents a financial template within the XER schema.
 */
export class FinancialTemplate {
	/**
	 * The XER instance associated with this financial template.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the financial template.
	 */
	public fintmplId: number;

	/**
	 * The name of the financial template.
	 */
	public fintmplName: string;

	/**
	 * Indicates whether this financial template is the default.
	 */
	public defaultFlag: Boolean;

	/**
	 * Constructs a new instance of the FinancialTemplate class.
	 *
	 * @param _xer - The XER instance to associate with this financial template.
	 * @param header - An array of header strings.
	 * @param row - An array of row strings corresponding to the header.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.fintmplId = Number(row[header.indexOf('fintmpl_id')]);
		this.fintmplName = row[header.indexOf('fintmpl_name')];
		this.defaultFlag = row[header.indexOf('default_flag')] === 'Y';
	}
}
