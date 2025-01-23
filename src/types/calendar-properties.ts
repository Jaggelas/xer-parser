export type Shift = {
	start: string;
	finish: string;
	durationHrs: number;
};

export type CalendarProperties = {
	weekdays: Array<Shift>[];
	exceptions: Array<{
		date: Date;
		shifts: Array<Shift> | null;
	}>;
};
