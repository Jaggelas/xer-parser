import { Duration } from '../classes/duration.class';
import { CalendarProperties } from '../types/calendar-properties';
import { parseCalendarData } from '../utilities/calendar-data-parser';
import { optionalDate, optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';
import moment from 'moment';

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
	public lastChngDate?: Date;

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
	 * Get the duration between two dates taking in account the calendar properties and exceptions
	 * This takes in account the shift hours in a day and the exceptions which are non working days to calculate the hours difference
	 * The duration is returned in hours new Duration(hrs, this, 'H')
	 *
	 * @param {Task} task Other task to compare to
	 */
	public duration(from: Date, to: Date): Duration {

		if (from === to) {
			return new Duration(0, this, 'H');
		}

		const current = moment(from).isBefore(to) ? moment(from) : moment(to);
		const finish = moment(to).isAfter(from) ? moment(to) : moment(from);
		
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
				const shiftStart = moment(`${current.format('YYYY-MM-DD')} ${shift.start}`, 'YYYY-MM-DD HH:mm');
				const shiftFinish = moment(`${current.format('YYYY-MM-DD')} ${shift.finish}`, 'YYYY-MM-DD HH:mm');

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

		return new Duration(hours, this, 'H');

	}
}
