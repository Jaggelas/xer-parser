import { ActivityCode } from '../schemas/activity-code';
import { ActivityCodeType } from '../schemas/activity-code-type';
import { Calendar } from '../schemas/calendar';
import { CurrencyType } from '../schemas/currency-type';
import { FinancialTemplate } from '../schemas/financial-template';
import { MemoType } from '../schemas/memo-type';
import { OBS } from '../schemas/obs';
import { ProjWBS } from '../schemas/proj-wbs';
import { Project } from '../schemas/project';
import { Resource } from '../schemas/resource';
import { ResourceLevelList } from '../schemas/resource-level-list';
import { ResourceRate } from '../schemas/resource-rate';
import { ResourceRole } from '../schemas/resource-role';
import { Role } from '../schemas/role';
import { RoleRate } from '../schemas/role-rate';
import { ScheduleOption } from '../schemas/schedule-option';
import { Task } from '../schemas/task';
import { TaskActivityCode } from '../schemas/task-activity-code';
import { TaskMemo } from '../schemas/task-memo';
import { TaskPredecessor } from '../schemas/task-predecessor';
import { TaskResource } from '../schemas/task-resource';
import { UdfType } from '../schemas/udf-type';
import { UdfValue } from '../schemas/udf-value';

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
