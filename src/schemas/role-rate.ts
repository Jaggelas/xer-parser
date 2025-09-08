import { Dayjs } from '../utilities/dayjs';
import { XER } from '../xer';
import { BaseSchema } from './base-schema';

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
export class RoleRate extends BaseSchema {
	/**
	 * The parent XER instance.
	 */
	public xer: XER;
	/**
	 * Unique identifier for the role rate.
	 */
	public roleRateId!: number;
	/**
	 * Reference to the associated role.
	 */
	public roleId!: number;
	/**
	 * Primary cost per quantity.
	 */
	public costPerQty!: number;
	/**
	 * Optional secondary cost per quantity.
	 */
	public costPerQty2?: number;
	/**
	 * Optional tertiary cost per quantity.
	 */
	public costPerQty3?: number;
	/**
	 * Optional quaternary cost per quantity.
	 */
	public costPerQty4?: number;
	/**
	 * Optional quinary cost per quantity.
	 */
	public costPerQty5?: number;
	/**
	 * The date when this rate becomes effective.
	 */
	public startDate!: Dayjs;
	/**
	 * Maximum quantity allowed per hour.
	 */
	public maxQtyPerHr!: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('ROLERATE', header, row);
	}
}
