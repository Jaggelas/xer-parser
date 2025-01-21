import {
	optionalDate,
	optionalNumber,
	optionalString
} from '../utilities/string-convert';
import { XER } from '../xer';

/**
 * Represents a User Defined Field (UDF) value in an XER file.
 * UDFs allow for custom data fields to be associated with various project elements.
 *
 * @class
 * @property {XER} xer - Reference to the parent XER object
 * @property {number} udfTypeId - The unique identifier for the UDF type
 * @property {number} fkId - Foreign key ID referencing the associated project element
 * @property {number} projId - The project identifier this UDF belongs to
 * @property {Date} [udfDate] - Optional date value for the UDF
 * @property {number} [udfNumber] - Optional numeric value for the UDF
 * @property {string} [udfText] - Optional text value for the UDF
 * @property {number} [udfCodeId] - Optional code identifier value for the UDF
 */
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
