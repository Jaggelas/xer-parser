// import moment from 'moment';
// import { XER } from './xer';

export { XER } from './xer';
export { Duration } from './classes/duration.class';
export { Tasks } from './classes/tasks.class';

export { ActivityCodeType } from './schemas/activity-code-type';
export { ActivityCode } from './schemas/activity-code';
export { Calendar } from './schemas/calendar';
export { CurrencyType } from './schemas/currency-type';
export { FinancialTemplate } from './schemas/financial-template';
export { MemoType } from './schemas/memo-type';
export { OBS } from './schemas/obs';
export { ProjWBS } from './schemas/proj-wbs';
export { Project } from './schemas/project';
export { ResourceLevelList } from './schemas/resource-level-list';
export { ResourceRate } from './schemas/resource-rate';
export { ResourceRole } from './schemas/resource-role';
export { RoleRate } from './schemas/role-rate';
export { Role } from './schemas/role';
export { ScheduleOption } from './schemas/schedule-option';
export { TaskActivityCode } from './schemas/task-activity-code';
export { TaskMemo } from './schemas/task-memo';
export { TaskPredecessor } from './schemas/task-predecessor';
export { TaskResource } from './schemas/task-resource';
export { Task } from './schemas/task';
export { UdfType } from './schemas/udf-type';
export { UdfValue } from './schemas/udf-value';
export { readableStreamToAsyncIterable } from './utilities/stream';
export { nodeReadableToAsyncIterable } from './utilities/node-stream';
export { serializeXER } from './utilities/serializer';
export * as HeaderUtils from './utilities/header';

// const file = Bun.file(
// 	'C:\\Users\\jvandermerwe\\OneDrive - Base Toliara SARL\\Desktop\\Primavera Migrate\\10001_2025-01-15.xer'
// );
// const fileText = await file.text();
// const xer = new XER(fileText);


// const calendar = xer.calendars[0];
// //console.dir(calendar.properties.weekdays, { depth: null });
// console.log(calendar.duration(moment('2025-02-25 09:00'), moment('2025-03-01 19:00')).hours)

// let startTime = performance.now()
// console.log('Result 1h : ',calendar.addToDate(moment('2025-01-22 09:00'),1,'h'));
// console.log('Result 8h : ',calendar.addToDate(moment('2025-01-22 09:00'),8,'h'));
// console.log('Result 1d : ',calendar.addToDate(moment('2025-01-22 09:00'),1,'d'));
// console.log('Result 5d : ',calendar.addToDate(moment('2025-01-22 09:00'),5,'d'));
// console.log('Result 20d : ',calendar.addToDate(moment('2025-01-22 09:00'),20,'d'));
// console.log(`Call to addToDate took ${performance.now() - startTime} milliseconds`)


// const t1 = xer.tasks[3];
// startTime = performance.now()
// console.log('Distribution : ', t1.distributionHrs(t1.targetStartDate, t1.targetEndDate));
// console.log(`Call to calc distribution took ${performance.now() - startTime} milliseconds`)