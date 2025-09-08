import { Tasks } from './classes/tasks.class';
import { parse, parseStream } from './utilities/parser';
import { serializeXER } from './utilities/serializer';
import type { CurrencyType } from './schemas/currency-type';
import type { FinancialTemplate } from './schemas/financial-template';
import type { MemoType } from './schemas/memo-type';
import type { OBS } from './schemas/obs';
import type { UdfType } from './schemas/udf-type';
import type { Role } from './schemas/role';
import type { Project } from './schemas/project';
import type { RoleRate } from './schemas/role-rate';
import type { Calendar } from './schemas/calendar';
import type { ScheduleOption } from './schemas/schedule-option';
import type { ProjWBS } from './schemas/proj-wbs';
import type { Resource } from './schemas/resource';
import type { ActivityCodeType } from './schemas/activity-code-type';
import type { ResourceLevelList } from './schemas/resource-level-list';
import type { ResourceRate } from './schemas/resource-rate';
import type { ResourceRole } from './schemas/resource-role';
import type { ActivityCode } from './schemas/activity-code';
import type { TaskActivityCode } from './schemas/task-activity-code';
import type { TaskMemo } from './schemas/task-memo';
import type { TaskPredecessor } from './schemas/task-predecessor';
import type { TaskResource } from './schemas/task-resource';
import type { UdfValue } from './schemas/udf-value';
import type { Task } from './schemas/task';
import { SCHEMA_REGISTRY } from './schemas/schema-registry';
import type { XERData, SchemaConstructor } from './types/schema';
import { Table } from './types/table';
import { findRowByColumn, getColumnIndex, setCell, createHeaderProxy } from './utilities/header';
import type { Phase } from './schemas/phase';
import type { ApplyActOptions } from './schemas/apply-act-options';
import type { Document } from './schemas/document';

/**
 * Represents a Primavera XER file parser and data container.
 * This class implements the XERData interface and manages all entities found in an XER file.
 *
 * @class XER
 * @implements {XERData}
 *
 * @property {Table[]} tables - Raw tables extracted from the XER file
 * @property {CurrencyType[]} currencyTypes - Currency types defined in the project
 * @property {FinancialTemplate[]} financialTemplates - Financial templates configurations
 * @property {MemoType[]} memoTypes - Types of memos that can be attached to tasks
 * @property {OBS[]} obs - Organizational Breakdown Structure elements
 * @property {UdfType[]} udfTypes - User Defined Field type definitions
 * @property {Role[]} roles - Project roles definitions
 * @property {Project[]} projects - Project data
 * @property {RoleRate[]} roleRates - Rate definitions for roles
 * @property {Calendar[]} calendars - Calendar definitions
 * @property {ScheduleOption[]} scheduleOptions - Schedule configuration options
 * @property {ProjWBS[]} projWBS - Project Work Breakdown Structure elements
 * @property {Resource[]} resources - Resource definitions
 * @property {ActivityCodeType[]} activityCodeTypes - Activity code type definitions
 * @property {ResourceLevelList[]} resourceLevelLists - Resource level assignments
 * @property {ResourceRate[]} resourceRates - Resource rate definitions
 * @property {ResourceRole[]} resourceRoles - Resource role assignments
 * @property {Tasks} tasks - Project tasks
 * @property {ActivityCode[]} activityCodes - Activity code assignments
 * @property {TaskMemo[]} taskMemos - Task memo assignments
 * @property {TaskPredecessor[]} taskPredecessors - Task dependency relationships
 * @property {TaskResource[]} taskResources - Task resource assignments
 * @property {TaskActivityCode[]} taskActivityCodes - Task activity code assignments
 * @property {UdfValue[]} udfValues - User Defined Field values
 *
 * @throws {Error} If XER file parsing fails
 */
export class XER implements XERData {
	public tables: Table[] = [];
	private headerLine: string | undefined;
	public currencyTypes: CurrencyType[] = [];
	public financialTemplates: FinancialTemplate[] = [];
	public memoTypes: MemoType[] = [];
	public obs: OBS[] = [];
	public udfTypes: UdfType[] = [];
	public roles: Role[] = [];
	public projects: Project[] = [];
	public roleRates: RoleRate[] = [];
	public calendars: Calendar[] = [];
	public scheduleOptions: ScheduleOption[] = [];
	public projWBS: ProjWBS[] = [];
	public resources: Resource[] = [];
	public activityCodeTypes: ActivityCodeType[] = [];
	public resourceLevelLists: ResourceLevelList[] = [];
	public resourceRates: ResourceRate[] = [];
	public resourceRoles: ResourceRole[] = [];
	public tasks: Tasks = new Tasks([]);
	public activityCodes: ActivityCode[] = [];
	public taskMemos: TaskMemo[] = [];
	public taskPredecessors: TaskPredecessor[] = [];
	public taskResources: TaskResource[] = [];
	public taskActivityCodes: TaskActivityCode[] = [];
	public udfValues: UdfValue[] = [];
	public phases: Phase[] = [];
	public applyActOptions: ApplyActOptions[] = [];
	public documents: Document[] = [];

		// Fast ID maps (lazy-initialized on first use)
		private _taskById?: Map<number, Task>;
		private _projectById?: Map<number, Project>;
		private _calendarById?: Map<number, Calendar>;

	constructor(_ser_file: string) {
		const parseResponse = parse(_ser_file);
		if (parseResponse.error) {
			throw new Error(parseResponse.error);
		} else {
			const ok = parseResponse as unknown as { tables: Table[]; headerLine?: string };
			this.tables = ok.tables;
			this.headerLine = ok.headerLine;
		}

		this.loadEntities();
	}

	/** Parsed XER file version from ERMHDR (e.g., 23.12). Returns 0 if unknown. */
	public get version(): number {
		if (this.headerLine && this.headerLine.startsWith('ERMHDR')) {
			const parts = this.headerLine.split('\t');
			if (parts.length >= 2) {
				const v = parseFloat(parts[1]);
				return Number.isFinite(v) ? v : 0;
			}
		}
		return 0;
	}

	/**
	 * Build an XER instance from a streaming source (AsyncIterable of chunks), avoiding full-file buffering.
	 */
	static async fromStream(source: AsyncIterable<string | Uint8Array>): Promise<XER> {
		const instance = Object.create(XER.prototype) as XER;
		instance.tables = [];
		instance.currencyTypes = [];
		instance.financialTemplates = [];
		instance.memoTypes = [];
		instance.obs = [];
		instance.udfTypes = [];
		instance.roles = [];
		instance.projects = [];
		instance.roleRates = [];
		instance.calendars = [];
		instance.scheduleOptions = [];
		instance.projWBS = [];
		instance.resources = [];
		instance.activityCodeTypes = [];
		instance.resourceLevelLists = [];
		instance.resourceRates = [];
		instance.resourceRoles = [];
		instance.tasks = new Tasks([]);
		instance.activityCodes = [];
		instance.taskMemos = [];
		instance.taskPredecessors = [];
		instance.taskResources = [];
		instance.taskActivityCodes = [];
		instance.udfValues = [];
		instance.phases = [];
		instance.applyActOptions = [];
		instance.documents = [];

		const parseResponse = await parseStream(source);
		if (parseResponse.error) {
			throw new Error(parseResponse.error);
		} else {
			const ok = parseResponse as unknown as { tables: Table[]; headerLine?: string };
			instance.tables = ok.tables;
			instance.headerLine = ok.headerLine;
		}
		instance.loadEntities();
		return instance;
	}

	/**
	 * Serialize the current in-memory representation back to XER text.
	 * Note: this reflects the raw tables; if you mutate entity objects, ensure corresponding table rows are updated.
	 */
	public toXERString(options?: { version?: number; lineEnding?: '\\r\\n' | '\\n' }): string {
		return serializeXER(this.tables, { ...options, headerLine: this.headerLine });
	}


	// Type-safe helper to load a collection and assign to a property
	private loadCollection<K extends keyof XER, Elem>(
		this: XER,
		tableName: string,
		assignTo: K,
		Ctor: SchemaConstructor<Elem>,
		wrap?: (items: Elem[]) => XER[K]
	): void {
		const table = this.getTable(tableName);
		const header = createHeaderProxy(table.header);
		const items = table.rows.map((row) => new Ctor(this, header, row));
		const value = (wrap ? wrap(items) : (items as unknown as XER[K]));
		this[assignTo] = value as XER[K];
	}

	private loadEntities() {
		for (const e of SCHEMA_REGISTRY) {
			this.loadCollection(e.table, e.key as keyof XER, e.ctor as SchemaConstructor<any>, e.wrap as any);
		}

		// Invalidate caches
		this._taskById = undefined;
		this._projectById = undefined;
		this._calendarById = undefined;
	}

	private getTable(name: string): Table {
		return (
			this.tables.find((table) => table.name === name) || {
				name: '',
				header: [],
				rows: []
			}
		);
	}

		// ---------- ID maps ----------
		public get taskById(): Map<number, Task> {
			if (!this._taskById) {
				const map = new Map<number, Task>();
				// tasks may be wrapped in Tasks; iterate as array
				for (const t of this.tasks as unknown as Task[]) map.set(t.taskId, t);
				this._taskById = map;
			}
			return this._taskById;
		}

		public get projectById(): Map<number, Project> {
			if (!this._projectById) {
				const map = new Map<number, Project>();
				for (const p of this.projects) map.set(p.projId, p);
				this._projectById = map;
			}
			return this._projectById;
		}

		public get calendarById(): Map<number, Calendar> {
			if (!this._calendarById) {
				const map = new Map<number, Calendar>();
				for (const c of this.calendars) map.set(c.clndrId, c);
				this._calendarById = map;
			}
			return this._calendarById;
		}

		// ---------- Write-back helpers (raw table updates) ----------
			/** Generic update by table + id column. */
			public updateRow(tableName: string, idColumn: string, id: string | number, patch: Record<string, string | number | null | undefined>): boolean {
				const table = this.tables.find(t => t.name === tableName);
				if (!table) return false;
				const found = findRowByColumn(table, idColumn, id);
				if (!found) return false;
				for (const [k, v] of Object.entries(patch)) setCell(table.header, found.row, k, v);
				return true;
			}

			/** Generic insert; values mapped into existing header. Missing cols left empty. */
			public insertRow(tableName: string, values: Record<string, string | number | null | undefined>): void {
				const table = this.tables.find(t => t.name === tableName);
				if (!table) throw new Error(`${tableName} table not found`);
				const row = Array.from({ length: table.header.length }, () => '');
				for (const [k, v] of Object.entries(values)) setCell(table.header, row, k, v);
				table.rows.push(row);
			}

			/** Generic delete by id column. */
			public deleteRow(tableName: string, idColumn: string, id: string | number): boolean {
				const table = this.tables.find(t => t.name === tableName);
				if (!table) return false;
				const idxCol = getColumnIndex(table.header, idColumn);
				if (idxCol < 0) return false;
				const before = table.rows.length;
				table.rows = table.rows.filter(r => String(r[idxCol]) !== String(id));
				return table.rows.length !== before;
			}
		/** Update a TASK row by task_id using a partial of column=>value. Returns true if updated. */
		public updateTaskRow(taskId: number, patch: Partial<Record<string, string | number | null | undefined>>): boolean {
			return this.updateRow('TASK', 'task_id', taskId, patch);
		}

		/** Insert a new TASK row from a dictionary of column=>value; ensures required id columns exist in header. */
		public insertTaskRow(values: Record<string, string | number | null | undefined>): void {
			this.insertRow('TASK', values);
		}

		/** Delete a TASK row by task_id. Returns true if a row was removed. */
		public deleteTaskRow(taskId: number): boolean {
				return this.deleteRow('TASK', 'task_id', taskId);
		}

			// PROJECT helpers
			public updateProjectRow(projId: number, patch: Record<string, string | number | null | undefined>): boolean {
				return this.updateRow('PROJECT', 'proj_id', projId, patch);
			}
			public insertProjectRow(values: Record<string, string | number | null | undefined>): void {
				this.insertRow('PROJECT', values);
			}
			public deleteProjectRow(projId: number): boolean {
				return this.deleteRow('PROJECT', 'proj_id', projId);
			}

			// CALENDAR helpers
			public updateCalendarRow(clndrId: number, patch: Record<string, string | number | null | undefined>): boolean {
				return this.updateRow('CALENDAR', 'clndr_id', clndrId, patch);
			}
			public insertCalendarRow(values: Record<string, string | number | null | undefined>): void {
				this.insertRow('CALENDAR', values);
			}
			public deleteCalendarRow(clndrId: number): boolean {
				return this.deleteRow('CALENDAR', 'clndr_id', clndrId);
			}

			// TASKPRED helpers
			public updateTaskPredecessorRow(taskPredId: number, patch: Record<string, string | number | null | undefined>): boolean {
				return this.updateRow('TASKPRED', 'task_pred_id', taskPredId, patch);
			}
			public insertTaskPredecessorRow(values: Record<string, string | number | null | undefined>): void {
				this.insertRow('TASKPRED', values);
			}
			public deleteTaskPredecessorRow(taskPredId: number): boolean {
				return this.deleteRow('TASKPRED', 'task_pred_id', taskPredId);
			}

			// TASKRSRC helpers
			public updateTaskResourceRow(taskrsrcId: number, patch: Record<string, string | number | null | undefined>): boolean {
				return this.updateRow('TASKRSRC', 'taskrsrc_id', taskrsrcId, patch);
			}
			public insertTaskResourceRow(values: Record<string, string | number | null | undefined>): void {
				this.insertRow('TASKRSRC', values);
			}
			public deleteTaskResourceRow(taskrsrcId: number): boolean {
				return this.deleteRow('TASKRSRC', 'taskrsrc_id', taskrsrcId);
			}

				// RSRC helpers
				public updateResourceRow(rsrcId: number, patch: Record<string, string | number | null | undefined>): boolean {
					return this.updateRow('RSRC', 'rsrc_id', rsrcId, patch);
				}
				public insertResourceRow(values: Record<string, string | number | null | undefined>): void {
					this.insertRow('RSRC', values);
				}
				public deleteResourceRow(rsrcId: number): boolean {
					return this.deleteRow('RSRC', 'rsrc_id', rsrcId);
				}

				// ACTVCODE helpers
				public updateActivityCodeRow(actvCodeId: number, patch: Record<string, string | number | null | undefined>): boolean {
					return this.updateRow('ACTVCODE', 'actv_code_id', actvCodeId, patch);
				}
				public insertActivityCodeRow(values: Record<string, string | number | null | undefined>): void {
					this.insertRow('ACTVCODE', values);
				}
				public deleteActivityCodeRow(actvCodeId: number): boolean {
					return this.deleteRow('ACTVCODE', 'actv_code_id', actvCodeId);
				}

				// UDFVALUE helpers
				public updateUdfValueRow(udfTypeId: number, fkId: number, patch: Record<string, string | number | null | undefined>): boolean {
					// UDFVALUE has a composite key (udf_type_id, fk_id); fall back to linear search
					const table = this.tables.find(t => t.name === 'UDFVALUE');
					if (!table) return false;
					const typeIdx = getColumnIndex(table.header, 'udf_type_id');
					const fkIdx = getColumnIndex(table.header, 'fk_id');
					if (typeIdx < 0 || fkIdx < 0) return false;
					let updated = false;
					for (const row of table.rows) {
						if (Number(row[typeIdx]) === udfTypeId && Number(row[fkIdx]) === fkId) {
							for (const [k, v] of Object.entries(patch)) setCell(table.header, row, k, v);
							updated = true;
						}
					}
					return updated;
				}
				public insertUdfValueRow(values: Record<string, string | number | null | undefined>): void {
					this.insertRow('UDFVALUE', values);
				}
				public deleteUdfValueRows(udfTypeId: number, fkId: number): number {
					const table = this.tables.find(t => t.name === 'UDFVALUE');
					if (!table) return 0;
					const typeIdx = getColumnIndex(table.header, 'udf_type_id');
					const fkIdx = getColumnIndex(table.header, 'fk_id');
					if (typeIdx < 0 || fkIdx < 0) return 0;
					const before = table.rows.length;
					table.rows = table.rows.filter(r => !(Number(r[typeIdx]) === udfTypeId && Number(r[fkIdx]) === fkId));
					return before - table.rows.length;
				}

					// Remaining common tables helpers
					// ROLES
					public updateRoleRow(roleId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('ROLES', 'role_id', roleId, patch);
					}
					public insertRoleRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('ROLES', values);
					}
					public deleteRoleRow(roleId: number): boolean {
						return this.deleteRow('ROLES', 'role_id', roleId);
					}

					// ROLERATE
					public updateRoleRateRow(roleRateId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('ROLERATE', 'role_rate_id', roleRateId, patch);
					}
					public insertRoleRateRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('ROLERATE', values);
					}
					public deleteRoleRateRow(roleRateId: number): boolean {
						return this.deleteRow('ROLERATE', 'role_rate_id', roleRateId);
					}

					// RSRCROLE
					public updateResourceRoleRow(rsrcRoleId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('RSRCROLE', 'rsrc_role_id', rsrcRoleId, patch);
					}
					public insertResourceRoleRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('RSRCROLE', values);
					}
					public deleteResourceRoleRow(rsrcRoleId: number): boolean {
						return this.deleteRow('RSRCROLE', 'rsrc_role_id', rsrcRoleId);
					}

					// RSRCLEVELLIST
					public updateResourceLevelListRow(rsrcLevelListId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('RSRCLEVELLIST', 'rsrc_level_list_id', rsrcLevelListId, patch);
					}
					public insertResourceLevelListRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('RSRCLEVELLIST', values);
					}
					public deleteResourceLevelListRow(rsrcLevelListId: number): boolean {
						return this.deleteRow('RSRCLEVELLIST', 'rsrc_level_list_id', rsrcLevelListId);
					}

					// SCHEDOPTIONS
					public updateScheduleOptionRow(schedoptionsId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('SCHEDOPTIONS', 'schedoptions_id', schedoptionsId, patch);
					}
					public insertScheduleOptionRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('SCHEDOPTIONS', values);
					}
					public deleteScheduleOptionRow(schedoptionsId: number): boolean {
						return this.deleteRow('SCHEDOPTIONS', 'schedoptions_id', schedoptionsId);
					}

					// ACTVTYPE
					public updateActivityCodeTypeRow(actvCodeTypeId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('ACTVTYPE', 'actv_code_type_id', actvCodeTypeId, patch);
					}
					public insertActivityCodeTypeRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('ACTVTYPE', values);
					}
					public deleteActivityCodeTypeRow(actvCodeTypeId: number): boolean {
						return this.deleteRow('ACTVTYPE', 'actv_code_type_id', actvCodeTypeId);
					}

					// UDFTYPE
					public updateUdfTypeRow(udfTypeId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('UDFTYPE', 'udf_type_id', udfTypeId, patch);
					}
					public insertUdfTypeRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('UDFTYPE', values);
					}
					public deleteUdfTypeRow(udfTypeId: number): boolean {
						return this.deleteRow('UDFTYPE', 'udf_type_id', udfTypeId);
					}

					// PROJWBS
					public updateProjWbsRow(wbsId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('PROJWBS', 'wbs_id', wbsId, patch);
					}
					public insertProjWbsRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('PROJWBS', values);
					}
					public deleteProjWbsRow(wbsId: number): boolean {
						return this.deleteRow('PROJWBS', 'wbs_id', wbsId);
					}

					// MEMOTYPE
					public updateMemoTypeRow(memoTypeId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('MEMOTYPE', 'memo_type_id', memoTypeId, patch);
					}
					public insertMemoTypeRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('MEMOTYPE', values);
					}
					public deleteMemoTypeRow(memoTypeId: number): boolean {
						return this.deleteRow('MEMOTYPE', 'memo_type_id', memoTypeId);
					}

					// CURRTYPE
					public updateCurrencyTypeRow(currId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('CURRTYPE', 'curr_id', currId, patch);
					}
					public insertCurrencyTypeRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('CURRTYPE', values);
					}
					public deleteCurrencyTypeRow(currId: number): boolean {
						return this.deleteRow('CURRTYPE', 'curr_id', currId);
					}

					// FINTMPL
					public updateFinancialTemplateRow(fintmplId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('FINTMPL', 'fintmpl_id', fintmplId, patch);
					}
					public insertFinancialTemplateRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('FINTMPL', values);
					}
					public deleteFinancialTemplateRow(fintmplId: number): boolean {
						return this.deleteRow('FINTMPL', 'fintmpl_id', fintmplId);
					}

					// RSRCRATE
					public updateResourceRateRow(rsrcRateId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('RSRCRATE', 'rsrc_rate_id', rsrcRateId, patch);
					}
					public insertResourceRateRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('RSRCRATE', values);
					}
					public deleteResourceRateRow(rsrcRateId: number): boolean {
						return this.deleteRow('RSRCRATE', 'rsrc_rate_id', rsrcRateId);
					}

					// OBS
					public updateObsRow(obsId: number, patch: Record<string, string | number | null | undefined>): boolean {
						return this.updateRow('OBS', 'obs_id', obsId, patch);
					}
					public insertObsRow(values: Record<string, string | number | null | undefined>): void {
						this.insertRow('OBS', values);
					}
					public deleteObsRow(obsId: number): boolean {
						return this.deleteRow('OBS', 'obs_id', obsId);
					}

			/** Rebuilds entity arrays from raw tables (e.g., after write-backs). */
			public refreshEntities(): void {
				// Clear existing entities (except raw tables and header)
				this.currencyTypes = [];
				this.financialTemplates = [];
				this.memoTypes = [];
				this.obs = [];
				this.udfTypes = [];
				this.roles = [];
				this.projects = [];
				this.roleRates = [];
				this.calendars = [];
				this.scheduleOptions = [];
				this.projWBS = [];
				this.resources = [];
				this.activityCodeTypes = [];
				this.resourceLevelLists = [];
				this.resourceRates = [];
				this.resourceRoles = [];
				this.tasks = new Tasks([]);
				this.activityCodes = [];
				this.taskMemos = [];
				this.taskPredecessors = [];
				this.taskResources = [];
				this.taskActivityCodes = [];
				this.udfValues = [];
				// Reload with header proxies
				this.loadEntities();
			}

		// ---------- Validation ----------
		/**
		 * Validate structural integrity: missing headers, orphaned references, duplicate IDs.
		 * Returns structured ValidationIssue[] with codes, severity, and context.
		 * If { autoRefresh: true }, entities will be rebuilt from raw tables before validating.
		 */
		public validate(options?: import('./types/validation').ValidateOptions): import('./types/validation').ValidationIssue[] {
			if (options?.autoRefresh) this.refreshEntities();
			const issues: import('./types/validation').ValidationIssue[] = [];
			const push = (issue: import('./types/validation').ValidationIssue) => { issues.push(issue); };
			// Basic header checks for TASK table
			const taskTable = this.tables.find(t => t.name === 'TASK');
			if (taskTable) {
				for (const col of ['task_id','proj_id','wbs_id','clndr_id','task_code','task_name']) {
					if (getColumnIndex(taskTable.header, col) < 0) push({
						severity: 'error', code: 'TASK_MISSING_COLUMN', message: `TASK missing column: ${col}`, table: 'TASK'
					});
				}
				// Duplicate task_id
				const seen = new Set<string>();
				const dup: string[] = [];
				const idIdx = getColumnIndex(taskTable.header, 'task_id');
				if (idIdx >= 0) {
					for (const r of taskTable.rows) {
						const id = r[idIdx];
						if (seen.has(id)) dup.push(id); else seen.add(id);
					}
				}
				if (dup.length) push({ severity: 'error', code: 'TASK_DUPLICATE_ID', message: `Duplicate TASK.task_id: ${Array.from(new Set(dup)).join(', ')}`, table: 'TASK' });
			}

					// Orphans based on raw TASK table (reflects latest write-backs)
				if (taskTable) {
					const projIds = new Set(this.projects.map(p => p.projId));
					const calIds = new Set(this.calendars.map(c => c.clndrId));
					const projIdx = getColumnIndex(taskTable.header, 'proj_id');
					const codeIdx = getColumnIndex(taskTable.header, 'task_code');
					const calIdx = getColumnIndex(taskTable.header, 'clndr_id');
					for (const r of taskTable.rows) {
						const code = codeIdx >= 0 ? r[codeIdx] : '(unknown)';
						if (projIdx >= 0 && !projIds.has(Number(r[projIdx]))) {
							push({ severity: 'error', code: 'TASK_MISSING_PROJ', message: `Task ${code} references missing proj_id ${r[projIdx]}` , table: 'TASK', refTable: 'PROJECT', refId: Number(r[projIdx])});
						}
						if (calIdx >= 0 && !calIds.has(Number(r[calIdx]))) {
							push({ severity: 'error', code: 'TASK_MISSING_CALENDAR', message: `Task ${code} references missing clndr_id ${r[calIdx]}`, table: 'TASK', refTable: 'CALENDAR', refId: Number(r[calIdx])});
						}
					}
				}

					// TASKPRED referential integrity: task_id and pred_task_id must exist
					const predTable = this.tables.find(t => t.name === 'TASKPRED');
					const taskIds = new Set((this.tasks as unknown as Task[]).map(t => t.taskId));
					if (predTable) {
						const taskIdx = getColumnIndex(predTable.header, 'task_id');
						const predIdx = getColumnIndex(predTable.header, 'pred_task_id');
						for (const r of predTable.rows) {
							if (taskIdx >= 0 && !taskIds.has(Number(r[taskIdx]))) push({ severity: 'error', code: 'TASKPRED_MISSING_TASK', message: `TASKPRED references missing task_id ${r[taskIdx]}`, table: 'TASKPRED', refTable: 'TASK', refId: Number(r[taskIdx]) });
							if (predIdx >= 0 && !taskIds.has(Number(r[predIdx]))) push({ severity: 'error', code: 'TASKPRED_MISSING_PRED_TASK', message: `TASKPRED references missing pred_task_id ${r[predIdx]}`, table: 'TASKPRED', refTable: 'TASK', refId: Number(r[predIdx]) });
						}
					}

					// TASKRSRC referential integrity: task_id and rsrc_id must exist
					const taskRsrcTable = this.tables.find(t => t.name === 'TASKRSRC');
					const rsrcIds = new Set(this.resources.map(r => r.rsrcId));
					if (taskRsrcTable) {
						const tIdx = getColumnIndex(taskRsrcTable.header, 'task_id');
						const rIdx = getColumnIndex(taskRsrcTable.header, 'rsrc_id');
						for (const r of taskRsrcTable.rows) {
							if (tIdx >= 0 && !taskIds.has(Number(r[tIdx]))) push({ severity: 'error', code: 'TASKRSRC_MISSING_TASK', message: `TASKRSRC references missing task_id ${r[tIdx]}`, table: 'TASKRSRC', refTable: 'TASK', refId: Number(r[tIdx]) });
							if (rIdx >= 0 && !rsrcIds.has(Number(r[rIdx]))) push({ severity: 'error', code: 'TASKRSRC_MISSING_RESOURCE', message: `TASKRSRC references missing rsrc_id ${r[rIdx]}`, table: 'TASKRSRC', refTable: 'RSRC', refId: Number(r[rIdx]) });
						}
					}

						// TASK to PROJWBS referential integrity: wbs_id must exist
						const wbsIds = new Set(this.projWBS.map(w => w.wbsId));
						if (taskTable) {
							const wIdx = getColumnIndex(taskTable.header, 'wbs_id');
							const codeIdx = getColumnIndex(taskTable.header, 'task_code');
							for (const r of taskTable.rows) {
								if (wIdx >= 0 && !wbsIds.has(Number(r[wIdx]))) {
									const code = codeIdx >= 0 ? r[codeIdx] : '(unknown)';
									push({ severity: 'error', code: 'TASK_MISSING_WBS', message: `Task ${code} references missing wbs_id ${r[wIdx]}`, table: 'TASK', refTable: 'PROJWBS', refId: Number(r[wIdx]) });
								}
							}
						}

						// TASKACTV referential integrity: actv_code_id must exist in ACTVCODE
						const taskActvTable = this.tables.find(t => t.name === 'TASKACTV');
						const actvCodeIds = new Set(this.activityCodes.map(a => a.actvCodeId));
						if (taskActvTable) {
							const aIdx = getColumnIndex(taskActvTable.header, 'actv_code_id');
							for (const r of taskActvTable.rows) {
								if (aIdx >= 0 && !actvCodeIds.has(Number(r[aIdx]))) push({ severity: 'error', code: 'TASKACTV_MISSING_ACTVCODE', message: `TASKACTV references missing actv_code_id ${r[aIdx]}`, table: 'TASKACTV', refTable: 'ACTVCODE', refId: Number(r[aIdx]) });
							}
						}

							// ACTVCODE: parent_actv_code_id and actv_code_type_id must be valid
							if (this.activityCodes.length) {
								const actvSet = new Set(this.activityCodes.map(a => a.actvCodeId));
								const typeSet = new Set(this.activityCodeTypes.map(t => t.actvCodeTypeId));
								for (const a of this.activityCodes) {
									if (a.parentActvCodeId != null && !actvSet.has(a.parentActvCodeId)) push({ severity: 'warn', code: 'ACTVCODE_MISSING_PARENT', message: `ACTVCODE ${a.actvCodeId} missing parent_actv_code_id ${a.parentActvCodeId}`, table: 'ACTVCODE', id: a.actvCodeId, refTable: 'ACTVCODE', refId: a.parentActvCodeId });
									if (!typeSet.has(a.actvCodeTypeId)) push({ severity: 'error', code: 'ACTVCODE_MISSING_TYPE', message: `ACTVCODE ${a.actvCodeId} missing actv_code_type_id ${a.actvCodeTypeId}`, table: 'ACTVCODE', id: a.actvCodeId, refTable: 'ACTVTYPE', refId: a.actvCodeTypeId });
								}
							}

							// RSRC: clndr_id must exist
							if (this.resources.length) {
								const calSet = new Set(this.calendars.map(c => c.clndrId));
								for (const r of this.resources) {
									if (!calSet.has(r.clndrId)) push({ severity: 'error', code: 'RSRC_MISSING_CALENDAR', message: `RSRC ${r.rsrcId} references missing clndr_id ${r.clndrId}`, table: 'RSRC', id: r.rsrcId, refTable: 'CALENDAR', refId: r.clndrId });
								}
							}

							// UDFVALUE: udf_type_id must exist in UDFTYPE
							if (this.udfValues.length) {
								const typeSet = new Set(this.udfTypes.map(u => u.udfTypeId));
								for (const u of this.udfValues) {
									if (!typeSet.has(u.udfTypeId)) push({ severity: 'error', code: 'UDFVALUE_MISSING_TYPE', message: `UDFVALUE missing udf_type_id ${u.udfTypeId}`, table: 'UDFVALUE', refTable: 'UDFTYPE', refId: u.udfTypeId });
								}
							}

										// New relationships
										// ROLES: parent_role_id must reference an existing role
										if (this.roles.length) {
											const roleIds = new Set(this.roles.map(r => r.roleId));
											for (const r of this.roles) {
												if (r.parentRoleId != null && !roleIds.has(r.parentRoleId)) {
													push({ severity: 'warn', code: 'ROLE_MISSING_PARENT', message: `ROLE ${r.roleId} missing parent_role_id ${r.parentRoleId}`, table: 'ROLES', id: r.roleId, refTable: 'ROLES', refId: r.parentRoleId });
												}
											}
										}

										// ROLERATE: role_id must exist in ROLES
										if (this.roleRates.length) {
											const roleIds = new Set(this.roles.map(r => r.roleId));
											for (const rr of this.roleRates) {
												if (!roleIds.has(rr.roleId)) push({ severity: 'error', code: 'ROLERATE_MISSING_ROLE', message: `ROLERATE ${rr.roleRateId} references missing role_id ${rr.roleId}`, table: 'ROLERATE', id: rr.roleRateId, refTable: 'ROLES', refId: rr.roleId });
											}
										}

										// RSRCROLE: rsrc_id must exist in RSRC and role_id in ROLES
										if (this.resourceRoles.length) {
											const roleIds = new Set(this.roles.map(r => r.roleId));
											const rsrcIds2 = new Set(this.resources.map(r => r.rsrcId));
											for (const rr of this.resourceRoles) {
												if (!rsrcIds2.has(rr.rsrcId)) push({ severity: 'error', code: 'RSRCROLE_MISSING_RSRC', message: `RSRCROLE ${rr.rsrcRoleId} references missing rsrc_id ${rr.rsrcId}`, table: 'RSRCROLE', id: rr.rsrcRoleId, refTable: 'RSRC', refId: rr.rsrcId });
												if (!roleIds.has(rr.roleId)) push({ severity: 'error', code: 'RSRCROLE_MISSING_ROLE', message: `RSRCROLE ${rr.rsrcRoleId} references missing role_id ${rr.roleId}`, table: 'RSRCROLE', id: rr.rsrcRoleId, refTable: 'ROLES', refId: rr.roleId });
											}
										}

										// RSRCRATE: rsrc_id must exist in RSRC
										if (this.resourceRates.length) {
											const rsrcIds3 = new Set(this.resources.map(r => r.rsrcId));
											for (const rate of this.resourceRates) {
												if (!rsrcIds3.has(rate.rsrcId)) push({ severity: 'error', code: 'RSRCRATE_MISSING_RSRC', message: `RSRCRATE ${rate.rsrcRateId} references missing rsrc_id ${rate.rsrcId}`, table: 'RSRCRATE', id: rate.rsrcRateId, refTable: 'RSRC', refId: rate.rsrcId });
											}
										}

										// RSRCLEVELLIST: rsrc_id must exist and schedoptions_id must exist
										if (this.resourceLevelLists.length) {
											const rsrcIds4 = new Set(this.resources.map(r => r.rsrcId));
											const schedOptIds = new Set(this.scheduleOptions.map(s => s.schedoptionsId));
											for (const rl of this.resourceLevelLists) {
												if (!rsrcIds4.has(rl.rsrcId)) push({ severity: 'error', code: 'RSRCLEVELLIST_MISSING_RSRC', message: `RSRCLEVELLIST ${rl.rsrcLevelListId} references missing rsrc_id ${rl.rsrcId}`, table: 'RSRCLEVELLIST', id: rl.rsrcLevelListId, refTable: 'RSRC', refId: rl.rsrcId });
												if (!schedOptIds.has(rl.schedoptionsId)) push({ severity: 'error', code: 'RSRCLEVELLIST_MISSING_SCHEDOPT', message: `RSRCLEVELLIST ${rl.rsrcLevelListId} references missing schedoptions_id ${rl.schedoptionsId}`, table: 'RSRCLEVELLIST', id: rl.rsrcLevelListId, refTable: 'SCHEDOPTIONS', refId: rl.schedoptionsId });
											}
										}

										// SCHEDOPTIONS: proj_id must exist in PROJECT
										if (this.scheduleOptions.length) {
											const projIds2 = new Set(this.projects.map(p => p.projId));
											for (const s of this.scheduleOptions) {
												if (!projIds2.has(s.projId)) push({ severity: 'error', code: 'SCHEDOPTIONS_MISSING_PROJECT', message: `SCHEDOPTIONS ${s.schedoptionsId} references missing proj_id ${s.projId}`, table: 'SCHEDOPTIONS', id: s.schedoptionsId, refTable: 'PROJECT', refId: s.projId });
											}
										}

			return issues;
		}

}
