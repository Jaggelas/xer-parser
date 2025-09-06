import type { XER } from '../xer';
import type { SchemaConstructor } from '../types/schema';

import { ActivityCode } from './activity-code';
import { ActivityCodeType } from './activity-code-type';
import { Calendar } from './calendar';
import { CurrencyType } from './currency-type';
import { FinancialTemplate } from './financial-template';
import { MemoType } from './memo-type';
import { OBS } from './obs';
import { ProjWBS } from './proj-wbs';
import { Project } from './project';
import { Resource } from './resource';
import { ResourceLevelList } from './resource-level-list';
import { ResourceRate } from './resource-rate';
import { ResourceRole } from './resource-role';
import { Role } from './role';
import { RoleRate } from './role-rate';
import { ScheduleOption } from './schedule-option';
import { Task } from './task';
import { TaskActivityCode } from './task-activity-code';
import { TaskMemo } from './task-memo';
import { TaskPredecessor } from './task-predecessor';
import { TaskResource } from './task-resource';
import { UdfType } from './udf-type';
import { UdfValue } from './udf-value';
import { Tasks } from '../classes/tasks.class';

type ElementOf<K extends keyof XER> = XER[K] extends Array<infer E> ? E : never;

export type SchemaRegistryEntry<K extends keyof XER> = {
  table: string;
  key: K;
  ctor: SchemaConstructor<ElementOf<K>>;
  wrap?: (items: ElementOf<K>[]) => XER[K];
};

const register = <K extends keyof XER>(e: SchemaRegistryEntry<K>) => e;

export const SCHEMA_REGISTRY = [
  register({ table: 'PROJECT', key: 'projects', ctor: Project }),
  register({ table: 'CURRTYPE', key: 'currencyTypes', ctor: CurrencyType }),
  register({ table: 'FINTMPL', key: 'financialTemplates', ctor: FinancialTemplate }),
  register({ table: 'MEMOTYPE', key: 'memoTypes', ctor: MemoType }),
  register({ table: 'OBS', key: 'obs', ctor: OBS }),
  register({ table: 'UDFTYPE', key: 'udfTypes', ctor: UdfType }),
  register({ table: 'ROLES', key: 'roles', ctor: Role }),
  register({ table: 'ROLERATE', key: 'roleRates', ctor: RoleRate }),
  register({ table: 'CALENDAR', key: 'calendars', ctor: Calendar }),
  register({ table: 'SCHEDOPTIONS', key: 'scheduleOptions', ctor: ScheduleOption }),
  register({ table: 'PROJWBS', key: 'projWBS', ctor: ProjWBS }),
  register({ table: 'RSRC', key: 'resources', ctor: Resource }),
  register({ table: 'ACTVTYPE', key: 'activityCodeTypes', ctor: ActivityCodeType }),
  register({ table: 'RSRCLEVELLIST', key: 'resourceLevelLists', ctor: ResourceLevelList }),
  register({ table: 'RSRCRATE', key: 'resourceRates', ctor: ResourceRate }),
  register({ table: 'RSRCROLE', key: 'resourceRoles', ctor: ResourceRole }),
  register({ table: 'ACTVCODE', key: 'activityCodes', ctor: ActivityCode }),
  register({ table: 'TASKMEMO', key: 'taskMemos', ctor: TaskMemo }),
  register({ table: 'TASKPRED', key: 'taskPredecessors', ctor: TaskPredecessor }),
  register({ table: 'TASKRSRC', key: 'taskResources', ctor: TaskResource }),
  register({ table: 'TASKACTV', key: 'taskActivityCodes', ctor: TaskActivityCode }),
  register({ table: 'UDFVALUE', key: 'udfValues', ctor: UdfValue }),
  register({ table: 'TASK', key: 'tasks', ctor: Task, wrap: (items) => new Tasks(items as Task[]) }),
] as const;
