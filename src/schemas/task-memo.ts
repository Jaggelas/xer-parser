import { XER } from '../xer';
import { Task } from './task';
import { MemoType } from './memo-type';

/**
 * Represents a task memo in the XER file structure.
 * Contains information about memos associated with tasks including their types and project relationships.
 *
 * @class
 * @property {XER} xer - Reference to the parent XER object containing all data
 * @property {number} memoId - Unique identifier for the memo
 * @property {number} taskId - ID of the task this memo is associated with
 * @property {number} memoTypeId - ID of the memo type
 * @property {number} projId - ID of the project this memo belongs to
 * @property {string} taskMemo - The actual memo text content
 *
 * @property {Task} task - Gets the associated Task object (getter)
 * @property {MemoType} memoType - Gets the associated MemoType object (getter)
 */
export class TaskMemo {
	/**
	 * Reference to the parent XER object containing all data
	 */
	public xer: XER;
	/**
	 * Unique identifier for the memo
	 */
	public memoId: number;
	/**
	 * ID of the task this memo is associated with
	 */
	public taskId: number;
	/**
	 * ID of the memo type
	 */
	public memoTypeId: number;
	/**
	 * ID of the project this memo belongs to
	 */
	public projId: number;
	/**
	 * The actual memo text content
	 */
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
		return this.xer.memoTypes.find(
			(memoType) => memoType.memoTypeId === this.memoTypeId
		)!;
	}
}
