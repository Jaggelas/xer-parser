import moment from 'moment';
import { XER } from './xer';

export { XER } from './xer';

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

const file = Bun.file(
	'C:\\Users\\jvandermerwe\\OneDrive - Base Toliara SARL\\Desktop\\Primavera Migrate\\10001_2025-01-15.xer'
);
const fileText = await file.text();
const xer = new XER(fileText);


const calendar = xer.calendars[0];
//console.dir(calendar.properties.weekdays, { depth: null });
console.log(calendar.duration(moment('2025-02-25 08:00'), moment('2025-03-01 19:00')).days)

//console.log(calendar.addToDate(moment('2025-01-22 08:00'),1,'h'));
