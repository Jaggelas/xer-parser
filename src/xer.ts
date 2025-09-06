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
import { SCHEMA_REGISTRY } from './schemas/schema-registry';
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
		for (const e of SCHEMA_REGISTRY) {
			this.loadCollection(e.table, e.key as keyof XER, e.ctor as SchemaConstructor<any>, e.wrap as any);
		}
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
