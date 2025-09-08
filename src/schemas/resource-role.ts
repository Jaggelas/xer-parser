import { XER } from '../xer';
import { BaseSchema } from './base-schema';

/**
 * Represents a resource role entity in an XER file.
 * @class
 * @property {XER} xer - The parent XER instance this resource role belongs to
 * @property {number} rsrcId - The unique identifier of the resource
 * @property {number} roleId - The unique identifier of the role
 * @property {number} skillLevel - The skill level associated with this resource role
 * @property {string} roleShortName - The abbreviated name of the role
 * @property {string} roleName - The full name of the role
 * @property {string} rsrcShortName - The abbreviated name of the resource
 * @property {string} rsrcName - The full name of the resource
 * @property {string} rsrcType - The type of the resource
 * @property {number} rsrcRoleId - The unique identifier of the resource role combination
 */
export class ResourceRole extends BaseSchema {
	/**
	 * The parent XER instance this resource role belongs to
	 */
	public xer: XER;
	/**
	 * The unique identifier of the resource
	 */
	public rsrcId!: number;
	/**
	 * The unique identifier of the role
	 */
	public roleId!: number;
	/**
	 * The skill level associated with this resource role
	 */
	public skillLevel!: number;
	/**
	 * The abbreviated name of the role
	 */
	public roleShortName!: string;
	/**
	 * The full name of the role
	 */
	public roleName!: string;
	/**
	 * The abbreviated name of the resource
	 */
	public rsrcShortName!: string;
	/**
	 * The full name of the resource
	 */
	public rsrcName!: string;
	/**
	 * The type of the resource
	 */
	public rsrcType!: string;
	/**
	 * The unique identifier of the resource role combination
	 */
	public rsrcRoleId!: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		super(_xer);
		this.xer = _xer;
		this.populateFrom('RSRCROLE', header, row);
	}
}
