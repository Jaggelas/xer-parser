import type { ActivityCode } from '../schemas/activity-code';
import type { ActivityCodeType } from '../schemas/activity-code-type';
import type { Calendar } from '../schemas/calendar';
import type { CurrencyType } from '../schemas/currency-type';
import type { FinancialTemplate } from '../schemas/financial-template';
import type { MemoType } from '../schemas/memo-type';
import type { OBS } from '../schemas/obs';
import type { ProjWBS } from '../schemas/proj-wbs';
import type { Project } from '../schemas/project';
import type { Resource } from '../schemas/resource';
import type { ResourceLevelList } from '../schemas/resource-level-list';
import type { ResourceRate } from '../schemas/resource-rate';
import type { ResourceRole } from '../schemas/resource-role';
import type { Role } from '../schemas/role';
import type { RoleRate } from '../schemas/role-rate';
import type { ScheduleOption } from '../schemas/schedule-option';
import type { Task } from '../schemas/task';
import type { TaskActivityCode } from '../schemas/task-activity-code';
import type { TaskMemo } from '../schemas/task-memo';
import type { TaskPredecessor } from '../schemas/task-predecessor';
import type { TaskResource } from '../schemas/task-resource';
import type { UdfType } from '../schemas/udf-type';
import type { UdfValue } from '../schemas/udf-value';

export interface XERData {
	currencyTypes: CurrencyType[];
	financialTemplates: FinancialTemplate[];
	memoTypes: MemoType[];
	obs: OBS[];
	udfTypes: UdfType[];
	roles: Role[];
	projects: Project[];
	roleRates: RoleRate[];
	calendars: Calendar[];
	scheduleOptions: ScheduleOption[];
	projWBS: ProjWBS[];
	resources: Resource[];
	activityCodeTypes: ActivityCodeType[];
	resourceLevelLists: ResourceLevelList[];
	resourceRates: ResourceRate[];
	resourceRoles: ResourceRole[];
	tasks: Task[];
	activityCodes: ActivityCode[];
	taskMemos: TaskMemo[];
	taskPredecessors: TaskPredecessor[];
	taskResources: TaskResource[];
	taskActivityCodes: TaskActivityCode[];
	udfValues: UdfValue[];
}

// The map should be a dictionary of table names to their respective property maps
export type SchemaMap = {
	version: number;
	map: [string, keyof XERData][];
};

// Constructor interface for schema classes to ensure they can be instantiated by the loader
// Uses a type-only import to avoid runtime circular dependencies
export interface SchemaConstructor<T> {
	new (xer: import('../xer').XER, header: string[], row: string[]): T;
}
