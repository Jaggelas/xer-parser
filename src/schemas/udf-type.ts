import { XER } from '../xer';

/**
 * Represents a User Defined Field Type in the XER system
 * @class
 */
export class UdfType {
	/** Reference to the parent XER object */
	public xer: XER;
	/** Unique identifier for the UDF type */
	public udfTypeId: number;
	/** Name of the table this UDF type belongs to */
	public tableName: string;
	/** Name of the UDF type */
	public udfTypeName: string;
	/** Label for the UDF type */
	public udfTypeLabel: string;
	/** Data type of the UDF */
	public logicalDataType: string;
	/** Flag indicating if this is a super type */
	public superFlag: Boolean;
	/** Expression used for indicators */
	public indicatorExpression: string;
	/** Expression used for summary indicators */
	public summaryIndicatorExpression: string;
	/** Flag indicating if this field should be exported */
	public exportFlag: Boolean;

	/**
	 * Creates a new UdfType instance
	 * @param {XER} _xer - Parent XER object
	 * @param {string[]} header - Array of column headers
	 * @param {string[]} row - Array of data values corresponding to headers
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.udfTypeId = Number(row[header.indexOf('udf_type_id')]);
		this.tableName = row[header.indexOf('table_name')];
		this.udfTypeName = row[header.indexOf('udf_type_name')];
		this.udfTypeLabel = row[header.indexOf('udf_type_label')];
		this.logicalDataType = row[header.indexOf('logical_data_type')];
		this.superFlag = row[header.indexOf('logical_data_type')] === 'Y';
		this.indicatorExpression = row[header.indexOf('indicator_expression')];
		this.summaryIndicatorExpression =
			row[header.indexOf('summary_indicator_expression')];
		this.exportFlag = row[header.indexOf('export_flag')] === 'Y';
	}
}
