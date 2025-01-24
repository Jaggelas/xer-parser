import { Moment } from "moment";
import { Shift } from "../classes/shift.class";



export type CalendarProperties = {
	weekdays: Array<Shift>[];
	exceptions: Array<{
		date: Moment;
		shifts: Array<Shift> | null;
	}>;
};
