import {SchemaMap} from '../types/schema';

export const schemaMaps: SchemaMap[] = [
	{
		version: 23.12,
		map: [
			['CURRTYPE', 'currencyTypes'],
			['FINTMPL', 'financialTemplates'],
			['MEMOTYPE', 'memoTypes'],
			['OBS', 'obs'],
			['UDFTYPE', 'udfTypes'],
			['ROLES', 'roles'],
			['PROJECT', 'projects'],
			['ROLERATE', 'roleRates'],
			['CALENDAR', 'calendars'],
			['SCHEDOPTIONS', 'scheduleOptions'],
			['PROJWBS', 'projWBS'],
			['RSRC', 'resources'],
			['ACTVTYPE', 'activityCodeTypes'],
			['RSRCLEVELLIST', 'resourceLevelLists'],
			['RSRCRATE', 'resourceRates'],
			['RSRCROLE', 'resourceRoles'],
			['TASK', 'tasks'],
			['ACTVCODE', 'activityCodes'],
			['TASKMEMO', 'taskMemos'],
			['TASKPRED', 'taskPredecessors'],
			['TASKRSRC', 'taskResources'],
			['TASKACTV', 'taskActivityCodes'],
			['UDFVALUE', 'udfValues']
		]
	}
];
