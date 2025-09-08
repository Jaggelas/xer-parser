import { Shift } from '../classes/shift.class';
import { CalendarProperties } from '../types/calendar-properties';
import dayjs from './dayjs';

/**
 * Parses calendar data string into a structured CalendarProperties object.
 *
 * @param data - Raw calendar data string containing shift and exception information
 * @returns CalendarProperties object containing parsed shift schedules and exceptions
 *
 * The parser processes two main categories:
 * - DaysOfWeek: Contains shift timings for each day of the week (1-7)
 * - Exceptions: Contains special calendar dates with their shift schedules
 *
 * The input string is expected to follow a specific format:
 * - Shifts are defined with start (s|HH:mm) and finish (f|HH:mm) times
 * - Days are marked with (0||N()) where N is 1-7
 * - Exceptions are marked with (d|N)() where N is the day number
 *
 * @example
 * ```typescript
 * const data = "DaysOfWeek()(0||1())s|09:00f|17:00";
 * const result = parseCalendarData(data);
 *  Result: {
 *    shifts: { 1: [{start: "09:00", finish: "17:00", durationHrs: 8}], 2: [], ... },
 *    exceptions: []
 *  }
 * ```
 */
export const parseCalendarData = (data: string): CalendarProperties => {
	// Remove odd delimiter chars (ASCII 127 shown as \u007F here) and whitespace
	const cleaned = data.replace(/[\u007F\s]+/g, '');
	const lines = cleaned.split('()').join('()/n').split('/n');

	const properties: CalendarProperties = {
		weekdays: [[], [], [], [], [], [], []],
		exceptions: []
	};

	let activeCategory: 'DaysOfWeek' | 'Exceptions' | '' = '';
	let activeDayIndex: number | undefined;
	lines.forEach((line: string) => {
		if (line.includes('DaysOfWeek()')) {
			activeCategory = 'DaysOfWeek';
			return;
		}

		if (line.includes('Exceptions()')) {
			activeCategory = 'Exceptions';
			return;
		}

		//Are we in the DaysOfWeek category
		if (activeCategory === 'DaysOfWeek') {
			if (line.match(/\(0\|\|[1-7]\(\)/gm)) {
				activeDayIndex = Number(line.match(/[1-7]/)?.[0]);
				return;
			} else {
				if (activeDayIndex == null) {
					return;
				}
				const start = line.match(/s\|[0-9]{2}:[0-9]{2}/);
				const finish = line.match(/f\|[0-9]{2}:[0-9]{2}/);
				if (start && finish) {
					const startTime = start[0].split('|')[1];
					const finishTime = finish[0].split('|')[1];
					properties.weekdays[activeDayIndex-1].push(new Shift(startTime, finishTime));
				}
			}
		}

		//Are we in the Exceptions category
		if (activeCategory === 'Exceptions') {
			if (line.match(/\(d\|[0-9]*\)\(\)/)) {
				const matchedString = line.match(/d\|[0-9]*/)?.[0]!;
				const n = Number(matchedString.split('|')[1]);
				// Primavera stores Excel-style serial dates (days since 1899-12-30)
				const base = dayjs('1899-12-30');
				const date = base.add(n, 'day').startOf('day');
				properties.exceptions.push({
					date,
					shifts: []
				});
			}
		}
	});

	return properties;
};
