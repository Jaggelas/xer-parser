import { optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';

/**
 * Represents a role rate entity from XER file.
 * @class
 * @property {XER} xer - The parent XER instance.
 * @property {number} roleRateId - Unique identifier for the role rate.
 * @property {number} roleId - Reference to the associated role.
 * @property {number} costPerQty - Primary cost per quantity.
 * @property {number} [costPerQty2] - Optional secondary cost per quantity.
 * @property {number} [costPerQty3] - Optional tertiary cost per quantity.
 * @property {number} [costPerQty4] - Optional quaternary cost per quantity.
 * @property {number} [costPerQty5] - Optional quinary cost per quantity.
 * @property {Date} startDate - The date when this rate becomes effective.
 * @property {number} maxQtyPerHr - Maximum quantity allowed per hour.
 */
export class RoleRate {
	public xer: XER;
	public roleRateId: number;
	public roleId: number;
	public costPerQty: number;
	public costPerQty2?: number;
	public costPerQty3?: number;
	public costPerQty4?: number;
	public costPerQty5?: number;
	public startDate: Date;
	public maxQtyPerHr: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.roleRateId = Number(row[header.indexOf('role_rate_id')]);
		this.roleId = Number(row[header.indexOf('role_id')]);
		this.costPerQty = Number(row[header.indexOf('cost_per_qty')]);
		this.costPerQty2 = optionalNumber(row[header.indexOf('cost_per_qty2')]);
		this.costPerQty3 = optionalNumber(row[header.indexOf('cost_per_qty3')]);
		this.costPerQty4 = optionalNumber(row[header.indexOf('cost_per_qty4')]);
		this.costPerQty5 = optionalNumber(row[header.indexOf('cost_per_qty5')]);
		this.startDate = new Date(row[header.indexOf('start_date')]);
		this.maxQtyPerHr = Number(row[header.indexOf('max_qty_per_hr')]);
	}
}
