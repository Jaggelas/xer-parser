import { XER } from '../xer';

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
export class ResourceRole {
	public xer: XER;
	public rsrcId: number;
	public roleId: number;
	public skillLevel: number;
	public roleShortName: string;
	public roleName: string;
	public rsrcShortName: string;
	public rsrcName: string;
	public rsrcType: string;
	public rsrcRoleId: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.rsrcId = Number(row[header.indexOf('rsrc_id')]);
		this.roleId = Number(row[header.indexOf('role_id')]);
		this.skillLevel = Number(row[header.indexOf('skill_level')]);
		this.roleShortName = row[header.indexOf('role_short_name')];
		this.roleName = row[header.indexOf('role_name')];
		this.rsrcShortName = row[header.indexOf('rsrc_short_name')];
		this.rsrcName = row[header.indexOf('rsrc_name')];
		this.rsrcType = row[header.indexOf('rsrc_type')];
		this.rsrcRoleId = Number(row[header.indexOf('rsrc_role_id')]);
	}
}
