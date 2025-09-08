import { Dayjs } from "dayjs";
import { Shift } from "../classes/shift.class";



export type CalendarProperties = {
	weekdays: Array<Shift>[];
	exceptions: Array<{
		date: Dayjs;
		shifts: Array<Shift> | null;
	}>;
};
