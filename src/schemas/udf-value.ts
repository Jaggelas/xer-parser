import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';

export class UdfValue {
	public xer: XER;
	public udfTypeId: number;
	public fkId: number;
	public projId: number;
	public udfDate?: Date;
	public udfNumber?: number;
	public udfText?: string;
	public udfCodeId?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.udfTypeId = Number(row[header.indexOf('udf_type_id')]);
		this.fkId = Number(row[header.indexOf('fk_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.udfDate = optionalDate(row[header.indexOf('udf_date')]);
		this.udfNumber = optionalNumber(row[header.indexOf('udf_number')]);
		this.udfText = optionalString(row[header.indexOf('udf_text')]);
		this.udfCodeId = optionalNumber(row[header.indexOf('udf_code_id')]);
	}
}
