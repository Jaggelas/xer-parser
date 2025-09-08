import { Dayjs } from '../utilities/dayjs';
import { XER } from '../xer';
import { BaseSchema } from './base-schema';

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
export class ResourceRate extends BaseSchema {
	/**
	 * The XER object containing all project data.
	 */
	public xer: XER;
	/**
	 * Unique identifier for the resource rate.
	 */
	public rsrcRateId!: number;
	/**
	 * Identifier of the resource this rate applies to.
	 */
	public rsrcId!: number;
	/**
	 * Maximum quantity of the resource that can be used per hour.
	 */
	public maxQtyPerHr!: number;
	/**
	 * Standard cost per quantity unit of the resource.
	 */
	public costPerQty!: number;
	/**
	 * Date from which this rate becomes effective.
	 */
	public startDate!: Dayjs;
	/**
	 * Optional identifier for the shift period.
	 */
	public shiftPeriodId?: number;
	/**
	 * Optional second cost rate per quantity.
	 */
	public costPerQty2?: number;
	/**
	 * Optional third cost rate per quantity.
	 */
	public costPerQty3?: number;
	/**
	 * Optional fourth cost rate per quantity.
	 */
	public costPerQty4?: number;
	/**
	 * Optional fifth cost rate per quantity.
	 */
	public costPerQty5?: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('RSRCRATE', header, row);
	}
}
