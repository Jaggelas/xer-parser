import {XER} from '@/xer';

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
