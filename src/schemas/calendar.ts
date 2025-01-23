import { CalendarProperties } from '../types/calendar-properties';
import { Unit } from '../types/unit.type';
import { parseCalendarData } from '../utilities/calendar-data-parser';
import { optionalDate, optionalNumber } from '../utilities/string-convert';
import { XER } from '../xer';
import { Project } from './project';

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
	 * Get the difference between two dates taking in account the calendar properties and exceptions
	 * This takes in account the Shift Hours to calculate the hours difference
	 *
	 * @param {Task} task Other task to compare to
	 */
	public dif(from: Date, to: Date, unit: Unit): number {
		if (unit === 'Year' || unit === 'Years' || unit === 'Y') {
		}
	}
}
