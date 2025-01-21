import {XER} from '@/xer';

export class UdfType {
	public xer: XER;
	public udfTypeId: number;
	public tableName: string;
	public udfTypeName: string;
	public udfTypeLabel: string;
	public logicalDataType: string;
	public superFlag: Boolean;
	public indicatorExpression: string;
	public summaryIndicatorExpression: string;
	public exportFlag: Boolean;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.udfTypeId = Number(row[header.indexOf('udf_type_id')]);
		this.tableName = row[header.indexOf('table_name')];
		this.udfTypeName = row[header.indexOf('udf_type_name')];
		this.udfTypeLabel = row[header.indexOf('udf_type_label')];
		this.logicalDataType = row[header.indexOf('logical_data_type')];
		this.superFlag = row[header.indexOf('logical_data_type')] === 'Y';
		this.indicatorExpression = row[header.indexOf('indicator_expression')];
		this.summaryIndicatorExpression = row[header.indexOf('summary_indicator_expression')];
		this.exportFlag = row[header.indexOf('export_flag')] === 'Y';
	}
}
