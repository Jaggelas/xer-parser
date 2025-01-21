import {parse} from './utilities/parser';
import {ActivityCode} from './schemas/activity-code';
import {ActivityCodeType} from './schemas/activity-code-type';
import {Calendar} from './schemas/calendar';
import {CurrencyType} from './schemas/currency-type';
import {FinancialTemplate} from './schemas/financial-template';
import {MemoType} from './schemas/memo-type';
import {OBS} from './schemas/obs';
import {ProjWBS} from './schemas/proj-wbs';
import {Project} from './schemas/project';
import {Resource} from './schemas/resource';
import {ResourceLevelList} from './schemas/resource-level-list';
import {ResourceRate} from './schemas/resource-rate';
import {ResourceRole} from './schemas/resource-role';
import {Role} from './schemas/role';
import {RoleRate} from './schemas/role-rate';
import {ScheduleOption} from './schemas/schedule-option';
import {Task} from './schemas/task';
import {TaskActivityCode} from './schemas/task-activity-code';
import {TaskMemo} from './schemas/task-memo';
import {TaskPredecessor} from './schemas/task-predecessor';
import {TaskResource} from './schemas/task-resource';
import {UdfType} from './schemas/udf-type';
import {UdfValue} from './schemas/udf-value';
import {XERData} from './types/schema';
import {Table} from './types/table';

export class XER implements XERData {
	public tables: Table[] = [];
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
	public tasks: Task[] = [];
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
		}

		this.tables = parseResponse.tables!;

		this.loadEntities();
	}

	private loadEntities() {
		this.currencyTypes = this.createCurrencyTypes(this.getTable('CURRTYPE'));
		this.financialTemplates = this.createFinancialTemplates(this.getTable('FINTMPL'));
		this.memoTypes = this.createMemoTypes(this.getTable('MEMOTYPE'));
		this.obs = this.createObs(this.getTable('OBS'));
		this.udfTypes = this.createUDFTypes(this.getTable('UDFTYPE'));
		this.roles = this.createRoles(this.getTable('ROLES'));
		this.roleRates = this.createRoleRates(this.getTable('ROLERATE'));
		this.calendars = this.createCalendars(this.getTable('CALENDAR'));
		this.scheduleOptions = this.createScheduleOptions(this.getTable('SCHEDOPTIONS'));
		this.projWBS = this.createProjWBS(this.getTable('PROJWBS'));
		this.resources = this.createResources(this.getTable('RSRC'));
		this.activityCodeTypes = this.createActivityCodeTypes(this.getTable('ACTVTYPE'));
		this.resourceLevelLists = this.createResourceLevelLists(this.getTable('RSRCLEVELLIST'));
		this.resourceRates = this.createResourceRates(this.getTable('RSRCRATE'));
		this.resourceRoles = this.createResourceRoles(this.getTable('RSRCROLE'));
		this.activityCodes = this.createActivityCodes(this.getTable('ACTVCODE'));
		this.taskMemos = this.createTaskMemos(this.getTable('TASKMEMO'));
		this.taskPredecessors = this.createTaskPredecessors(this.getTable('TASKPRED'));
		this.taskResources = this.createTaskResources(this.getTable('TASKRSRC'));
		this.taskActivityCodes = this.createTaskActivityCodes(this.getTable('TASKACTV'));
		this.udfValues = this.createUDFValues(this.getTable('UDFVALUE'));
		this.tasks = this.createTasks(this.getTable('TASK'));
		this.projects = this.createProjects(this.getTable('PROJECT'));
	}

	private getTable(name: string): Table {
		return this.tables.find((table) => table.name === name) || {name: '', header: [], rows: []};
	}

	private createCurrencyTypes(table: Table): CurrencyType[] {
		return table.rows.map((row) => new CurrencyType(this, table.header, row));
	}

	private createFinancialTemplates(table: Table): FinancialTemplate[] {
		return table.rows.map((row) => new FinancialTemplate(this, table.header, row));
	}

	private createMemoTypes(table: Table): MemoType[] {
		return table.rows.map((row) => new MemoType(this, table.header, row));
	}

	private createObs(table: Table): OBS[] {
		return table.rows.map((row) => new OBS(this, table.header, row));
	}

	private createUDFTypes(table: Table): UdfType[] {
		return table.rows.map((row) => new UdfType(this, table.header, row));
	}

	private createRoles(table: Table): Role[] {
		return table.rows.map((row) => new Role(this, table.header, row));
	}

	private createRoleRates(table: Table): RoleRate[] {
		return table.rows.map((row) => new RoleRate(this, table.header, row));
	}

	private createCalendars(table: Table): Calendar[] {
		return table.rows.map((row) => new Calendar(this, table.header, row));
	}

	private createScheduleOptions(table: Table): ScheduleOption[] {
		return table.rows.map((row) => new ScheduleOption(this, table.header, row));
	}

	private createProjWBS(table: Table): ProjWBS[] {
		return table.rows.map((row) => new ProjWBS(this, table.header, row));
	}

	private createResources(table: Table): Resource[] {
		return table.rows.map((row) => new Resource(this, table.header, row));
	}

	private createActivityCodeTypes(table: Table): ActivityCodeType[] {
		return table.rows.map((row) => new ActivityCodeType(this, table.header, row));
	}

	private createResourceLevelLists(table: Table): ResourceLevelList[] {
		return table.rows.map((row) => new ResourceLevelList(this, table.header, row));
	}

	private createResourceRates(table: Table): ResourceRate[] {
		return table.rows.map((row) => new ResourceRate(this, table.header, row));
	}

	private createResourceRoles(table: Table): ResourceRole[] {
		return table.rows.map((row) => new ResourceRole(this, table.header, row));
	}

	private createTasks(table: Table): Task[] {
		return table.rows.map((row) => new Task(this, table.header, row));
	}

	private createActivityCodes(table: Table): ActivityCode[] {
		return table.rows.map((row) => new ActivityCode(this, table.header, row));
	}

	private createTaskMemos(table: Table): TaskMemo[] {
		return table.rows.map((row) => new TaskMemo(this, table.header, row));
	}

	private createTaskPredecessors(table: Table): TaskPredecessor[] {
		return table.rows.map((row) => new TaskPredecessor(this, table.header, row));
	}

	private createTaskResources(table: Table): TaskResource[] {
		return table.rows.map((row) => new TaskResource(this, table.header, row));
	}

	private createTaskActivityCodes(table: Table): TaskActivityCode[] {
		return table.rows.map((row) => new TaskActivityCode(this, table.header, row));
	}

	private createUDFValues(table: Table): UdfValue[] {
		return table.rows.map((row) => new UdfValue(this, table.header, row));
	}

	private createProjects(table: Table): Project[] {
		return table.rows.map((row) => new Project(this, table.header, row));
	}
}
