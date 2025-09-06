import { Tasks } from './classes/tasks.class';
import { parse, parseStream } from './utilities/parser';
import { serializeXER } from './utilities/serializer';
import { ActivityCode } from './schemas/activity-code';
import { ActivityCodeType } from './schemas/activity-code-type';
import { Calendar } from './schemas/calendar';
import { CurrencyType } from './schemas/currency-type';
import { FinancialTemplate } from './schemas/financial-template';
import { MemoType } from './schemas/memo-type';
import { OBS } from './schemas/obs';
import { ProjWBS } from './schemas/proj-wbs';
import { Project } from './schemas/project';
import { Resource } from './schemas/resource';
import { ResourceLevelList } from './schemas/resource-level-list';
import { ResourceRate } from './schemas/resource-rate';
import { ResourceRole } from './schemas/resource-role';
import { Role } from './schemas/role';
import { RoleRate } from './schemas/role-rate';
import { ScheduleOption } from './schemas/schedule-option';
import { Task } from './schemas/task';
import { TaskActivityCode } from './schemas/task-activity-code';
import { TaskMemo } from './schemas/task-memo';
import { TaskPredecessor } from './schemas/task-predecessor';
import { TaskResource } from './schemas/task-resource';
import { UdfType } from './schemas/udf-type';
import { UdfValue } from './schemas/udf-value';
import type { XERData, SchemaConstructor } from './types/schema';
import { Table } from './types/table';

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
		const items = table.rows.map((row) => new Ctor(this, table.header, row));
		const value = (wrap ? wrap(items) : (items as unknown as XER[K]));
		this[assignTo] = value as XER[K];
	}

	private loadEntities() {
		this.loadCollection('PROJECT', 'projects', Project);
		this.loadCollection('CURRTYPE', 'currencyTypes', CurrencyType);
		this.loadCollection('FINTMPL', 'financialTemplates', FinancialTemplate);
		this.loadCollection('MEMOTYPE', 'memoTypes', MemoType);
		this.loadCollection('OBS', 'obs', OBS);
		this.loadCollection('UDFTYPE', 'udfTypes', UdfType);
		this.loadCollection('ROLES', 'roles', Role);
		this.loadCollection('ROLERATE', 'roleRates', RoleRate);
		this.loadCollection('CALENDAR', 'calendars', Calendar);
		this.loadCollection('SCHEDOPTIONS', 'scheduleOptions', ScheduleOption);
		this.loadCollection('PROJWBS', 'projWBS', ProjWBS);
		this.loadCollection('RSRC', 'resources', Resource);
		this.loadCollection('ACTVTYPE', 'activityCodeTypes', ActivityCodeType);
		this.loadCollection('RSRCLEVELLIST', 'resourceLevelLists', ResourceLevelList);
		this.loadCollection('RSRCRATE', 'resourceRates', ResourceRate);
		this.loadCollection('RSRCROLE', 'resourceRoles', ResourceRole);
		this.loadCollection('ACTVCODE', 'activityCodes', ActivityCode);
		this.loadCollection('TASKMEMO', 'taskMemos', TaskMemo);
		this.loadCollection('TASKPRED', 'taskPredecessors', TaskPredecessor);
		this.loadCollection('TASKRSRC', 'taskResources', TaskResource);
		this.loadCollection('TASKACTV', 'taskActivityCodes', TaskActivityCode);
		this.loadCollection('UDFVALUE', 'udfValues', UdfValue);
		this.loadCollection('TASK', 'tasks', Task, (items) => new Tasks(items as Task[]));
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

}
