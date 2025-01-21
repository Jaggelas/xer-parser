import {optionalDate, optionalNumber, optionalString} from '@/utilities/string-convert';
import {XER} from '@/xer';
import {Task} from './task';
import {Project} from './project';

export class TaskPredecessor {
	public xer: XER;
	public taskPredId: number;
	public taskId: number;
	public predTaskId: number;
	public projId: number;
	public predProjId: number;
	public predType: string;
	public lagHrCnt: number;
	public comments?: string;
	public floatPath: string;
	public aref: string;
	public arls: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.taskPredId = Number(row[header.indexOf('task_pred_id')]);
		this.taskId = Number(row[header.indexOf('task_id')]);
		this.predTaskId = Number(row[header.indexOf('pred_task_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.predProjId = Number(row[header.indexOf('pred_proj_id')]);
		this.predType = row[header.indexOf('pred_type')];
		this.lagHrCnt = Number(row[header.indexOf('lag_hr_cnt')]);
		this.comments = optionalString(row[header.indexOf('comments')]);
		this.floatPath = row[header.indexOf('float_path')];
		this.aref = row[header.indexOf('aref')];
		this.arls = row[header.indexOf('arls')];
	}

	public get project(): Project {
		return this.xer.projects.find((project) => project.projId === this.predProjId)!;
	}

	public get task(): Task | undefined {
		return this.xer.tasks.find((task) => task.taskId === this.predTaskId);
	}
}
