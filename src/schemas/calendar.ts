import { Duration } from '../classes/duration.class';
import { CalendarProperties } from '../types/calendar-properties';
import { Unit } from '../types/unit.type';
import { parseCalendarData } from '../utilities/calendar-data-parser';
import { optionalDate, optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';
import dayjs, { Dayjs } from '../utilities/dayjs';

/**
 * Represents a Calendar in the XER schema.
 */
export class Calendar {
	/**
	 * The XER instance associated with this calendar.
	 */
	public xer: XER;

	/**
	 * The unique identifier for the calendar.
	 */
	public clndrId: number;

	/**
	 * Indicates whether this calendar is the default calendar.
	 */
	public defaultFlag: boolean;

	/**
	 * The name of the calendar.
	 */
	public clndrName: string;

	/**
	 * The project ID associated with the calendar, if any.
	 */
	public projId?: number;

	/**
	 * The base calendar ID, if any.
	 */
	public baseClndrId?: number;

	/**
	 * The date when the calendar was last changed, if any.
	 */
	public lastChngDate?: Dayjs;

	/**
	 * The type of the calendar.
	 */
	public clndrType: string;

	/**
	 * The number of hours in a day for the calendar.
	 */
	public dayHrCnt: number;

	/**
	 * The number of hours in a week for the calendar.
	 */
	public weekHrCnt: number;

	/**
	 * The number of hours in a month for the calendar.
	 */
	public monthHrCnt: number;

	/**
	 * The number of hours in a year for the calendar.
	 */
	public yearHrCnt: number;

	/**
	 * Indicates whether the calendar is private to the resource.
	 */
	public rsrcPrivate: boolean;

	/**
	 * The calendar data as a string.
	 */
	public clndrData: string;

	public properties: CalendarProperties;

	/**
	 * Constructs a new Calendar instance.
	 *
	 * @param _xer - The XER instance associated with this calendar.
	 * @param header - The header row from the XER file.
	 * @param row - The data row from the XER file.
	 */
	constructor(_xer: XER, header: string[], row: string[]) {
		this.xer = _xer;
		this.clndrId = Number(row[header.indexOf('clndr_id')]);
		this.defaultFlag = row[header.indexOf('default_flag')] === 'Y';
		this.clndrName = row[header.indexOf('clndr_name')];
		this.projId = optionalNumber(row[header.indexOf('proj_id')]);
		this.baseClndrId = optionalNumber(row[header.indexOf('base_clndr_id')]);
		this.lastChngDate = optionalDate(row[header.indexOf('last_chng_date')]);
		this.clndrType = row[header.indexOf('clndr_type')];
		this.dayHrCnt = Number(row[header.indexOf('day_hr_cnt')]);
		this.weekHrCnt = Number(row[header.indexOf('week_hr_cnt')]);
		this.monthHrCnt = Number(row[header.indexOf('month_hr_cnt')]);
		this.yearHrCnt = Number(row[header.indexOf('year_hr_cnt')]);
		this.rsrcPrivate = row[header.indexOf('rsrc_private')] === 'Y';
		this.clndrData = row[header.indexOf('clndr_data')];
		this.properties = parseCalendarData(this.clndrData);
	}

	/**
	 * Gets the project associated with this calendar.
	 *
	 * @returns The project associated with this calendar.
	 */
	public get project(): Project {
		return this.xer.projects.find(
			(project) => project.projId === this.projId
		)!;
	}

	/**
	 * Determines if a given date falls within working hours according to the calendar's schedule.
	 * 
	 * @param date - The date to check against the calendar's working hours
	 * @returns A boolean indicating whether the given date is within working hours
	 * 
	 * Working hours are determined by:
	 * 1. Checking if the day has any shifts defined
	 * 2. Verifying the date is not marked as an exception
	 * 3. Confirming the time falls within a defined shift's start and finish times
	 */
	public isWorkingHour(date: Dayjs): boolean {
		// Day-of-week: 0 (Sunday) .. 6 (Saturday); properties.weekdays uses 0..6
		const day = date.day();
		const shifts = this.properties.weekdays[day] ?? [];

		const isException = this.properties.exceptionSet?.has(date.format('YYYY-MM-DD'))
			|| this.properties.exceptions.some((ex) => ex.date.isSame(date, 'day'));

		if (shifts.length === 0 || isException) {
			return false;
		}

		const shift = shifts.find((shift) => shift.inShift(date));

		return !!shift;
	}

	/**
	 * Returns true if the specified date has working shifts and is not an exception day.
	 */
	public isWorkingDay(date: Dayjs): boolean {
		const day = date.day();
		const shifts = this.properties.weekdays[day] ?? [];
		const isException = this.properties.exceptionSet?.has(date.format('YYYY-MM-DD'))
			|| this.properties.exceptions.some((ex) => ex.date.isSame(date, 'day'));
		return shifts.length > 0 && !isException;
	}

	/**
	 * Returns the concrete working shift intervals for the given date.
	 */
	public getWorkingShifts(date: Dayjs): Array<{ start: Dayjs; end: Dayjs }> {
		const day = date.day();
		const shifts = this.properties.weekdays[day] ?? [];
		const isException = this.properties.exceptionSet?.has(date.format('YYYY-MM-DD'))
			|| this.properties.exceptions.some((ex) => ex.date.isSame(date, 'day'));
		if (isException || shifts.length === 0) return [];
		return shifts.map((s) => ({ start: s.shiftStart(date), end: s.shiftFinish(date) }));
	}

	/**
	 * Find the first working instant at or after the given date.
	 */
	public nextWorkingMoment(date: Dayjs, inclusive = true): Dayjs {
		let cursor = date.clone();
		for (let guard = 0; guard < 366; guard++) { // safety guard across a year
			const shifts = this.getWorkingShifts(cursor);
			for (const { start, end } of shifts) {
				if (cursor.isSame(start) || cursor.isBefore(start)) return start;
				if (inclusive && cursor.isBefore(end)) return cursor;
				if (!inclusive && cursor.isBefore(end)) return cursor;
			}
			cursor = cursor.add(1, 'day').startOf('day');
		}
		return date;
	}

	/**
	 * Snap a moment to a working instant.
	 * - start: snap to the start of the next working shift if outside
	 * - end: snap to the end of the previous working shift if outside
	 * - nearest: snap to whichever (previous end or next start) is closer
	 */
	public clampToWorking(date: Dayjs, mode: 'start' | 'end' | 'nearest' = 'nearest'): Dayjs {
		const inHour = this.isWorkingHour(date);
		if (inHour) return date;

		const next = this.nextWorkingMoment(date, true);

		// Internal helper: previous working shift end before date
	const previousWorkingEnd = (): Dayjs | null => {
			let cursor = date.clone();
			for (let guard = 0; guard < 366; guard++) {
				const shifts = this.getWorkingShifts(cursor);
				for (let i = shifts.length - 1; i >= 0; i--) {
					const { start, end } = shifts[i];
		    if (date.isSame(end) || date.isAfter(end)) return end;
		    if (date.isAfter(start)) return start;
				}
				cursor = cursor.subtract(1, 'day').startOf('day');
			}
			return null;
		};

		if (mode === 'start') return next;
		const prev = previousWorkingEnd();
		if (mode === 'end') return prev ?? next;

		// nearest
		if (!prev) return next;
	const distPrev = Math.abs(date.diff(prev));
	const distNext = Math.abs(next.diff(date));
		return distPrev <= distNext ? prev : next;
	}

	/**
	 * Compute working time between two instants. Returns hours (default) or minutes with precision.
	 */
	public workingHoursBetween(from: Dayjs, to: Dayjs, precision: 'hour' | 'minute' = 'hour'): number {
		if (from.isSame(to)) return 0;
		const forward = from.isBefore(to);
		const start = forward ? from.clone() : to.clone();
		const end = forward ? to.clone() : from.clone();

		let minutes = 0;
		let cursor = start.clone();
		while (cursor.isBefore(end, 'day') || cursor.isSame(end, 'day')) {
			const shifts = this.getWorkingShifts(cursor);
			for (const { start: s, end: e } of shifts) {
				const overlapStart = dayjs.max(s, start);
				const overlapEnd = dayjs.min(e, end);
				if (overlapEnd.isAfter(overlapStart)) {
					minutes += overlapEnd.diff(overlapStart, 'minute');
				}
			}
			cursor = cursor.add(1, 'day').startOf('day');
		}

		if (precision === 'minute') return forward ? minutes : -minutes;
		const hours = minutes / 60;
		return forward ? hours : -hours;
	}

	/**
	 * Get the duration between two dates taking in account the calendar properties and exceptions
	 * This takes in account the shift hours in a day and the exceptions which are non working days to calculate the hours difference
	 * The duration is returned in hours new Duration(hrs, this, 'H')
	 *
	 * @param {Task} task Other task to compare to
	 */
	public duration(from: Dayjs, to: Dayjs): Duration {

		if (from.isSame(to, 'minute')) {
			return new Duration(0, this, 'h');
		}

		let current = (from.isBefore(to) ? from : to).clone();
		const finish = to.isAfter(from) ? to : from;

		let hours = 0;

		while (current.isSameOrBefore(finish, 'days')) {
			const day = current.day();
			const shifts = this.properties.weekdays[day] ?? [];

			const exceptions = this.properties.exceptions.filter((exception) => {
				return exception.date.isSame(current, 'day');
			});

			if (shifts.length === 0 || exceptions.length > 0) {
				current = current.add(1, 'day');
				continue;
			}

			shifts.forEach((shift) => {
				const shiftStart = shift.shiftStart(current);
				const shiftFinish = shift.shiftFinish(current);

				if (current.isSame(shiftStart, 'hour') || current.isBefore(shiftStart, 'hour')) {
					if (finish.isSame(shiftFinish, 'hour') || finish.isAfter(shiftFinish, 'hour')) {
						hours += shiftFinish.diff(shiftStart, 'hour');
					} else if (finish.isAfter(shiftStart, 'hour')) {
						hours += finish.diff(shiftStart, 'hour');
					}
				} else if (current.isAfter(shiftStart, 'hour')) {
					if (finish.isSame(shiftFinish, 'hour') || finish.isAfter(shiftFinish, 'hour')) {
						hours += shiftFinish.diff(current, 'hour');
					} else if (finish.isAfter(current, 'hour')) {
						hours += finish.diff(current, 'hour');
					}
				} else {}

			})

			current = current.add(1, 'day').startOf('day');

		}

		return new Duration(hours, this, 'h');

	}

	/**
	 * Adds a duration to a date taking in account the calendar properties and exceptions
	 * This takes in account the shift hours in a day and the exceptions which are non working days to calculate the new date
	 *
	 * @param {Date} from The date to add the duration to
	 * @param {Duration} duration The duration to add
	 * @returns {Date} The new date after adding the duration
	 */
	public addToDate(from: Dayjs, qty: number, unit: Unit): Dayjs {
		if (qty <= 0) return from.clone(); // No shift needed

		// Convert desired quantity to minutes to minimize precision drift
		const qtyInMinutes = this.unitConvert(unit, 'm', qty);
		let added = 0; // minutes accumulated
		let cursor = from.clone();

		// Safety guard to avoid infinite loops (e.g., calendars with no shifts)
		let dayGuard = 0;
		const maxDays = 366 * 10; // 10 years

		while (added < qtyInMinutes && dayGuard < maxDays) {
			const shifts = this.getWorkingShifts(cursor);
			for (const { start, end } of shifts) {
				if (added >= qtyInMinutes) break;
				if (cursor.isBefore(end)) {
					const intervalStart = dayjs.max(start, cursor);
					const available = end.diff(intervalStart, 'minute');
					const need = qtyInMinutes - added;
					if (available >= need) {
						return intervalStart.clone().add(need, 'minute');
					}
					// consume whole interval
					added += available;
					cursor = end.clone();
				}
			}
			if (added < qtyInMinutes) {
				cursor = cursor.add(1, 'day').startOf('day');
				dayGuard++;
			}
		}

		// If we exit due to guard, return the best-effort cursor
		return cursor;
	}
	  

	// Convert the value from one unit to another using calendar's hour totals
	public unitConvert(from: Unit, to: Unit, value: number): number {
		const normalize = (u: Unit): 'y' | 'M' | 'w' | 'd' | 'h' | 'm' => {
			switch (u) {
				case 'year':
				case 'years':
				case 'y':
					return 'y';
				case 'month':
				case 'months':
				case 'M':
					return 'M';
				case 'week':
				case 'weeks':
				case 'w':
					return 'w';
				case 'day':
				case 'days':
				case 'd':
					return 'd';
				case 'hour':
				case 'hours':
				case 'h':
					return 'h';
				case 'minute':
				case 'minutes':
				case 'm':
					return 'm';
				default:
					throw new Error('Invalid unit');
			}
		};

		const f = normalize(from);
		const t = normalize(to);

		// Hours per canonical unit according to this calendar
		const hoursPerUnit: Record<'y' | 'M' | 'w' | 'd' | 'h' | 'm', number> = {
			y: this.yearHrCnt || 2000,
			M: this.monthHrCnt || 80,
			w: this.weekHrCnt || 40,
			d: this.dayHrCnt || 8,
			h: 1,
			m: 1 / 60
		};

		if (f === t) return value;

		// Convert input to hours, then from hours to target unit
		let valueInHours: number;
		if (f === 'h') {
			valueInHours = value;
		} else if (f === 'm') {
			valueInHours = value / 60;
		} else {
			valueInHours = value * hoursPerUnit[f];
		}

		if (t === 'h') return valueInHours;
		if (t === 'm') return valueInHours * 60;
		return valueInHours / hoursPerUnit[t];
	}
}
