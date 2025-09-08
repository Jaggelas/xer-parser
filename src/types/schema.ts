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
import type { Phase } from '../schemas/phase';
import type { ApplyActOptions } from '../schemas/apply-act-options';
import type { Document } from '../schemas/document';

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
	phases: Phase[];
	applyActOptions: ApplyActOptions[];
	documents: Document[];
}

// The map should be a dictionary of table names to their respective property maps
export type VersionSpec = number | number[] | { min: number; max?: number };

export type SchemaMap = {
	version: VersionSpec;
	map: AnyPropertyMap[];
};

// Helper: get the element/entity type from an XERData collection (which are arrays)
type EntityOf<K extends keyof XERData> = XERData[K] extends ReadonlyArray<infer U> ? U : never;

// Property map specialized for a particular XERData collection key K
type PropertyMapFor<K extends keyof XERData> = {
	table: [string, K];
	// columns: [ header, key-of-entity, property-type ]
	columns: [string, keyof EntityOf<K>, PropertyType][];
};

// Union of all possible property maps for any collection in XERData. Using this
// avoids collapsing keys to the intersection (e.g., only 'xer') when authoring
// heterogeneous arrays like SchemaMap.map.
type AnyPropertyMap = { [K in keyof XERData]: PropertyMapFor<K> }[keyof XERData];

export type PropertyType = 'TEXT' | 'OTEXT' | 'NUMBER' | 'ONUMBER' | 'DATE' | 'ODATE' | 'DURATION' | 'ODURATION' | 'BOOLEAN' | 'OBOOLEAN';

// Constructor interface for schema classes to ensure they can be instantiated by the loader
// Uses a type-only import to avoid runtime circular dependencies
export interface SchemaConstructor<T> {
	new (xer: import('../xer').XER, header: string[], row: string[]): T;
}

// Helper: determine if a given version matches a version spec
export function matchesVersion(spec: VersionSpec, version: number): boolean {
	if (typeof spec === 'number') return version === spec;
	if (Array.isArray(spec)) return spec.includes(version);
	const { min, max } = spec;
	if (max == null) return version >= min;
	return version >= min && version <= max;
}
