export type Shift = {
	start: string;
	finish: string;
};

export type CalendarProperties = {
	shifts: Array<Shift>[];
	exceptions: Array<{
		date: Date;
		shifts: Array<Shift> | null;
	}>;
};
