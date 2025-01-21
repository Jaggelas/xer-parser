import {XER} from '@/xer';
import {Task} from './task';
import {MemoType} from './memo-type';

export class TaskMemo {
	public xer: XER;
	public memoId: number;
	public taskId: number;
	public memoTypeId: number;
	public projId: number;
	public taskMemo: string;

	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.memoId = Number(row[header.indexOf('memo_id')]);
		this.taskId = Number(row[header.indexOf('task_id')]);
		this.memoTypeId = Number(row[header.indexOf('memo_type_id')]);
		this.projId = Number(row[header.indexOf('proj_id')]);
		this.taskMemo = row[header.indexOf('task_memo')];
	}

	public get task(): Task {
		return this.xer.tasks.find((task) => task.taskId === this.taskId)!;
	}

	public get memoType(): MemoType {
		return this.xer.memoTypes.find((memoType) => memoType.memoTypeId === this.memoTypeId)!;
	}
}
