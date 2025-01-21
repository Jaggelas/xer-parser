import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';

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
		this.shiftPeriodId = optionalNumber(row[header.indexOf('shift_period_id')]);
		this.costPerQty2 = optionalNumber(row[header.indexOf('cost_per_qty2')]);
		this.costPerQty3 = optionalNumber(row[header.indexOf('cost_per_qty3')]);
		this.costPerQty4 = optionalNumber(row[header.indexOf('cost_per_qty4')]);
		this.costPerQty5 = optionalNumber(row[header.indexOf('cost_per_qty5')]);
	}
}
