import {XER} from '@/xer';

export class ResourceLevelList {
	public xer: XER;
	public rsrcLevelListId: number;
	public schedoptionsId: number;
	public rsrcId: number;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.rsrcLevelListId = Number(row[header.indexOf('rsrc_level_list_id')]);
		this.schedoptionsId = Number(row[header.indexOf('schedoptions_id')]);
		this.rsrcId = Number(row[header.indexOf('rsrc_id')]);
	}
}
