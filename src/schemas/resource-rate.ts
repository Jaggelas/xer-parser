import { optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';

/**
 * Represents a resource rate in Primavera P6.
 * @class
 * @property {XER} xer - The XER object containing all project data.
 * @property {number} rsrcRateId - Unique identifier for the resource rate.
 * @property {number} rsrcId - Identifier of the resource this rate applies to.
 * @property {number} maxQtyPerHr - Maximum quantity of the resource that can be used per hour.
 * @property {number} costPerQty - Standard cost per quantity unit of the resource.
 * @property {Date} startDate - Date from which this rate becomes effective.
 * @property {number} [shiftPeriodId] - Optional identifier for the shift period.
 * @property {number} [costPerQty2] - Optional second cost rate per quantity.
 * @property {number} [costPerQty3] - Optional third cost rate per quantity.
 * @property {number} [costPerQty4] - Optional fourth cost rate per quantity.
 * @property {number} [costPerQty5] - Optional fifth cost rate per quantity.
 */
export class ResourceRate {
	public xer: XER;
	public rsrcRateId: number;
	public rsrcId: number;
	public maxQtyPerHr: number;
	public costPerQty: number;
	public startDate: Date;
	public shiftPeriodId?: number;
	public costPerQty2?: number;
	public costPerQty3?: number;
	public costPerQty4?: number;
	public costPerQty5?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.rsrcRateId = Number(row[header.indexOf('rsrc_rate_id')]);
		this.rsrcId = Number(row[header.indexOf('rsrc_id')]);
		this.maxQtyPerHr = Number(row[header.indexOf('max_qty_per_hr')]);
		this.costPerQty = Number(row[header.indexOf('cost_per_qty')]);
		this.startDate = new Date(row[header.indexOf('start_date')]);
		this.shiftPeriodId = optionalNumber(
			row[header.indexOf('shift_period_id')]
		);
		this.costPerQty2 = optionalNumber(row[header.indexOf('cost_per_qty2')]);
		this.costPerQty3 = optionalNumber(row[header.indexOf('cost_per_qty3')]);
		this.costPerQty4 = optionalNumber(row[header.indexOf('cost_per_qty4')]);
		this.costPerQty5 = optionalNumber(row[header.indexOf('cost_per_qty5')]);
	}
}
