import { Duration } from '../classes/duration.class';
import { CalendarProperties } from '../types/calendar-properties';
import { Unit } from '../types/unit.type';
import { parseCalendarData } from '../utilities/calendar-data-parser';
import { optionalDate, optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';
import moment, { Moment } from 'moment';

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
	public lastChngDate?: Moment;

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
	public isWorkingHour(date: Moment): boolean {
		const day = date.day();
		const shifts = this.properties.weekdays[day];

		const exceptions = this.properties.exceptions.filter((exception) => {
			return moment(exception.date).isSame(date, 'date');
		});

		if (shifts.length === 0 || exceptions.length > 0) {
			return false;
		}

		const shift = shifts.find((shift) => shift.inShift(date));

		return !!shift;
	}

	/**
	 * Get the duration between two dates taking in account the calendar properties and exceptions
	 * This takes in account the shift hours in a day and the exceptions which are non working days to calculate the hours difference
	 * The duration is returned in hours new Duration(hrs, this, 'H')
	 *
	 * @param {Task} task Other task to compare to
	 */
	public duration(from: Moment, to: Moment): Duration {

		if (from === to) {
			return new Duration(0, this, 'h');
		}

		const current = from.isBefore(to) ? from : to;
		const finish = from.isAfter(from) ? to : from;

		let hours = 0;

		while (current.isSameOrBefore(finish, 'days')) {
			const day = current.day();
			const shifts = this.properties.weekdays[day];

			const exceptions = this.properties.exceptions.filter((exception) => {
				return moment(exception.date).isSame(current, 'date');
			});

			if (shifts.length === 0 || exceptions.length > 0) {
				current.add(1, 'days');
				continue;
			}

			shifts.forEach((shift) => {
				const shiftStart = shift.shiftStart(current);
				const shiftFinish = shift.shiftFinish(current);

				if (current.isSameOrBefore(shiftStart, 'hours') && finish.isSameOrAfter(shiftFinish, 'hours')) {
					hours += shiftFinish.diff(shiftStart, 'hours');
				} else if (current.isSameOrBefore(shiftStart, 'hours') && finish.isSameOrBefore(shiftFinish, 'hours') && finish.isSameOrAfter(shiftStart, 'hours')) {
					hours += finish.diff(shiftStart, 'hours');
				} else if (current.isSameOrAfter(shiftStart, 'hours') && finish.isSameOrAfter(shiftFinish, 'hours') && current.isSameOrBefore(shiftFinish, 'hours')) {
					hours += shiftFinish.diff(current, 'hours');
				} else if (current.isSameOrAfter(shiftStart, 'hours') && finish.isSameOrBefore(shiftFinish, 'hours')) {
					hours += finish.diff(current, 'hours');
				} else {}

			})

			current.add(1, 'days');

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
	public addToDate(from: Date | Moment, qty: number, unit: Unit): Moment {
		const finish = moment(from);
		console.log('Starting Date ', from);
		let hoursLeft = this.unitConvert(unit, 'hour', qty);

		while (hoursLeft > 0) {

			if(this.isWorkingHour(finish)) {
				hoursLeft--;
			}

			finish.add(1, 'hours');
			console.log({
				hoursLeft,
				finish: finish.format('YYYY-MM-DD HH:mm')
			})
		}

		return finish;
	}

	//Converts the value from one unit to another
	//Taking in account the Hours / Day, Hours / Week, Hours / Month and Hours / Year from the calendar
	public unitConvert(from: Unit, to: Unit, value: number): number {
		switch (from) {
			case 'year':
			case 'years':
			case 'y':
				switch (to) {
					case 'year':
					case 'years':
					case 'y':
						return value;
					case 'month':
					case 'months':
					case 'M':
						return (
							(value * (this?.monthHrCnt || 80)) /
							(this?.yearHrCnt || 2000)
						);
					case 'week':
					case 'weeks':
					case 'w':
						return (
							(value * (this.weekHrCnt || 40)) /
							(this.yearHrCnt || 2000)
						);
					case 'day':
					case 'days':
					case 'd':
						return (
							(value * (this.dayHrCnt || 8)) /
							(this.yearHrCnt || 2000)
						);
					case 'hour':
					case 'hours':
					case 'h':
						return value * (this.yearHrCnt || 2000);
					case 'minute':
					case 'minutes':
					case 'm':
						return value * (this.yearHrCnt || 2000) * 60;
					default:
						throw new Error('Invalid unit');
				}
				case 'month':
					case 'months':
					case 'M':
				switch (to) {
					case 'year':
					case 'years':
					case 'y':
						return (
							(value * (this.yearHrCnt || 2000)) /
							(this.monthHrCnt || 80)
						);
						case 'month':
							case 'months':
							case 'M':
						return value;
					case 'week':
					case 'weeks':
					case 'w':
						return (
							(value * (this.weekHrCnt || 40)) /
							(this.monthHrCnt || 80)
						);
					case 'day':
					case 'days':
					case 'd':
						return (
							(value * (this.dayHrCnt || 8)) /
							(this.monthHrCnt || 80)
						);
					case 'hour':
					case 'hours':
					case 'h':
						return value * (this.monthHrCnt || 80);
					case 'minute':
					case 'minutes':
						case 'm':
						return value * (this.monthHrCnt || 80) * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'week':
			case 'weeks':
			case 'w':
				switch (to) {
					case 'year':
					case 'years':
					case 'y':
						return (
							(value * (this.yearHrCnt || 2000)) /
							(this.weekHrCnt || 40)
						);
					case 'month':
					case 'months':
						case 'M':
						return (
							(value * (this.monthHrCnt || 80)) /
							(this.weekHrCnt || 40)
						);
					case 'week':
					case 'weeks':
					case 'w':
						return value;
					case 'day':
					case 'days':
					case 'd':
						return (
							(value * (this.dayHrCnt || 8)) /
							(this.weekHrCnt || 40)
						);
					case 'hour':
					case 'hours':
					case 'h':
						return value * (this.weekHrCnt || 40);
					case 'minute':
					case 'minutes':
						case 'm':
						return value * (this.weekHrCnt || 40) * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'day':
			case 'days':
			case 'd':
				switch (to) {
					case 'year':
					case 'years':
					case 'y':
						return (
							(value * (this.yearHrCnt || 2000)) /
							(this.dayHrCnt || 8)
						);
					case 'month':
					case 'months':
						case 'M':
						return (
							(value * (this.monthHrCnt || 80)) /
							(this.dayHrCnt || 8)
						);
					case 'week':
					case 'weeks':
					case 'w':
						return (
							(value * (this.weekHrCnt || 40)) /
							(this.dayHrCnt || 8)
						);
					case 'day':
					case 'days':
					case 'd':
						return value;
					case 'hour':
					case 'hours':
					case 'h':
						return value * (this.dayHrCnt || 8);
					case 'minute':
					case 'minutes':
						case 'm':
						return value * (this.dayHrCnt || 8) * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'hour':
			case 'hours':
			case 'h':
				switch (to) {
					case 'year':
					case 'years':
					case 'y':
						return value / (this.yearHrCnt || 2000);
					case 'month':
					case 'months':
						case 'M':
						return value / (this.monthHrCnt || 80);
					case 'week':
					case 'weeks':
					case 'w':
						return value / (this.weekHrCnt || 40);
					case 'day':
					case 'days':
					case 'd':
						return value / (this.dayHrCnt || 8);
					case 'hour':
					case 'hours':
					case 'h':
						return value;
					case 'minute':
					case 'minutes':
						case 'm':
						return value * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'minute':
			case 'minutes':
				case 'm':
				switch (to) {
					case 'year':
					case 'years':
					case 'y':
						return (
							value / ((this.yearHrCnt || 2000) * 60)
						);
					case 'month':
					case 'months':
						case 'M':
						return (
							value / ((this.monthHrCnt || 80) * 60)
						);
					case 'week':
					case 'weeks':
					case 'w':
						return value / ((this.weekHrCnt || 40) * 60);
					case 'day':
					case 'days':
					case 'd':
						return value / ((this.dayHrCnt || 8) * 60);
					case 'hour':
					case 'hours':
					case 'h':
						return value / 60;
					case 'minute':
					case 'minutes':
						case 'm':
						return value;
					default:
						throw new Error('Invalid unit');
				}
			default:
				throw new Error('Invalid unit');
		}
	}
}
