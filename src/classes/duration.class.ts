import { Unit } from '../types/unit.type';
import { Calendar } from '../schemas/calendar';

export class Duration {
	private value: number;

	private conversions = {
		Year: {
			Year: (value: number) => value,
			Month: (value: number) =>
				(value * this._calendar.monthHrCnt) / this._calendar.yearHrCnt,
			Week: (value: number) =>
				(value * this._calendar.weekHrCnt) / this._calendar.yearHrCnt,
			Day: (value: number) =>
				(value * this._calendar.dayHrCnt) / this._calendar.yearHrCnt,
			Hour: (value: number) => value * this._calendar.yearHrCnt,
			Minute: (value: number) => value * this._calendar.yearHrCnt * 60
		},
		Month: {
			Year: (value: number) =>
				(value * this._calendar.yearHrCnt) / this._calendar.monthHrCnt,
			Month: (value: number) => value,
			Week: (value: number) =>
				(value * this._calendar.weekHrCnt) / this._calendar.monthHrCnt,
			Day: (value: number) =>
				(value * this._calendar.dayHrCnt) / this._calendar.monthHrCnt,
			Hour: (value: number) => value * this._calendar.monthHrCnt,
			Minute: (value: number) => value * this._calendar.monthHrCnt * 60
		},
		Week: {
			Year: (value: number) =>
				(value * this._calendar.yearHrCnt) / this._calendar.weekHrCnt,
			Month: (value: number) =>
				(value * this._calendar.monthHrCnt) / this._calendar.weekHrCnt,
			Week: (value: number) => value,
			Day: (value: number) =>
				(value * this._calendar.dayHrCnt) / this._calendar.weekHrCnt,
			Hour: (value: number) => value * this._calendar.weekHrCnt,
			Minute: (value: number) => value * this._calendar.weekHrCnt * 60
		},
		Day: {
			Year: (value: number) =>
				(value * this._calendar.yearHrCnt) / this._calendar.dayHrCnt,
			Month: (value: number) =>
				(value * this._calendar.monthHrCnt) / this._calendar.dayHrCnt,
			Week: (value: number) =>
				(value * this._calendar.weekHrCnt) / this._calendar.dayHrCnt,
			Day: (value: number) => value,
			Hour: (value: number) => value * this._calendar.dayHrCnt,
			Minute: (value: number) => value * this._calendar.dayHrCnt * 60
		}
	};

	constructor(
		_value: number | string,
		private _calendar: Calendar,
		private _unit: Unit
	) {
		this.value = typeof _value === 'string' ? Number(_value) : _value;
	}

	/**
	 * Gets the duration value converted to years
	 * @returns {number} The duration value in years
	 */
	get years(): number {
		return this.unitConvert(this._unit, 'Y', this.value);
	}

	/**
	 * Gets the duration value converted to months.
	 * @returns The duration value in months.
	 */
	get months(): number {
		return this.unitConvert(this._unit, 'M', this.value);
	}

	/**
	 * Gets the duration in weeks
	 * @returns Duration in weeks as a number
	 */
	get weeks(): number {
		return this.unitConvert(this._unit, 'W', this.value);
	}

	/**
	 * Gets the duration value converted to days.
	 * @returns {number} The duration value in days.
	 */
	get days(): number {
		return this.unitConvert(this._unit, 'D', this.value);
	}

	/**
	 * Gets the duration in hours.
	 * Converts the current duration value from its unit to hours.
	 * @returns {number} The duration value in hours
	 */
	get hours(): number {
		return this.unitConvert(this._unit, 'H', this.value);
	}

	/**
	 * Gets the duration value in minutes after converting from the current unit.
	 * @returns {number} The duration value in minutes.
	 */
	get minutes(): number {
		return this.unitConvert(this._unit, 'M', this.value);
	}

	//Converts the value from one unit to another
	//Taking in account the Hours / Day, Hours / Week, Hours / Month and Hours / Year from the calendar
	private unitConvert(from: Unit, to: Unit, value: number): number {
		switch (from) {
			case 'Year':
			case 'Years':
			case 'Y':
				switch (to) {
					case 'Year':
					case 'Years':
					case 'Y':
						return value;
					case 'Month':
					case 'Months':
					case 'm':
						return (
							(value * this._calendar.monthHrCnt) /
							this._calendar.yearHrCnt
						);
					case 'Week':
					case 'Weeks':
					case 'W':
						return (
							(value * this._calendar.weekHrCnt) /
							this._calendar.yearHrCnt
						);
					case 'Day':
					case 'Days':
					case 'D':
						return (
							(value * this._calendar.dayHrCnt) /
							this._calendar.yearHrCnt
						);
					case 'Hour':
					case 'Hours':
					case 'H':
						return value * this._calendar.yearHrCnt;
					case 'Minute':
					case 'Minutes':
					case 'M':
						return value * this._calendar.yearHrCnt * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'Month':
			case 'Months':
			case 'm':
				switch (to) {
					case 'Year':
					case 'Years':
					case 'Y':
						return (
							(value * this._calendar.yearHrCnt) /
							this._calendar.monthHrCnt
						);
					case 'Month':
					case 'Months':
					case 'm':
						return value;
					case 'Week':
					case 'Weeks':
					case 'W':
						return (
							(value * this._calendar.weekHrCnt) /
							this._calendar.monthHrCnt
						);
					case 'Day':
					case 'Days':
					case 'D':
						return (
							(value * this._calendar.dayHrCnt) /
							this._calendar.monthHrCnt
						);
					case 'Hour':
					case 'Hours':
					case 'H':
						return value * this._calendar.monthHrCnt;
					case 'Minute':
					case 'Minutes':
					case 'M':
						return value * this._calendar.monthHrCnt * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'Week':
			case 'Weeks':
			case 'W':
				switch (to) {
					case 'Year':
					case 'Years':
					case 'Y':
						return (
							(value * this._calendar.yearHrCnt) /
							this._calendar.weekHrCnt
						);
					case 'Month':
					case 'Months':
					case 'm':
						return (
							(value * this._calendar.monthHrCnt) /
							this._calendar.weekHrCnt
						);
					case 'Week':
					case 'Weeks':
					case 'W':
						return value;
					case 'Day':
					case 'Days':
					case 'D':
						return (
							(value * this._calendar.dayHrCnt) /
							this._calendar.weekHrCnt
						);
					case 'Hour':
					case 'Hours':
					case 'H':
						return value * this._calendar.weekHrCnt;
					case 'Minute':
					case 'Minutes':
					case 'M':
						return value * this._calendar.weekHrCnt * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'Day':
			case 'Days':
			case 'D':
				switch (to) {
					case 'Year':
					case 'Years':
					case 'Y':
						return (
							(value * this._calendar.yearHrCnt) /
							this._calendar.dayHrCnt
						);
					case 'Month':
					case 'Months':
					case 'm':
						return (
							(value * this._calendar.monthHrCnt) /
							this._calendar.dayHrCnt
						);
					case 'Week':
					case 'Weeks':
					case 'W':
						return (
							(value * this._calendar.weekHrCnt) /
							this._calendar.dayHrCnt
						);
					case 'Day':
					case 'Days':
					case 'D':
						return value;
					case 'Hour':
					case 'Hours':
					case 'H':
						return value * this._calendar.dayHrCnt;
					case 'Minute':
					case 'Minutes':
					case 'M':
						return value * this._calendar.dayHrCnt * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'Hour':
			case 'Hours':
			case 'H':
				switch (to) {
					case 'Year':
					case 'Years':
					case 'Y':
						return value / this._calendar.yearHrCnt;
					case 'Month':
					case 'Months':
					case 'm':
						return value / this._calendar.monthHrCnt;
					case 'Week':
					case 'Weeks':
					case 'W':
						return value / this._calendar.weekHrCnt;
					case 'Day':
					case 'Days':
					case 'D':
						return value / this._calendar.dayHrCnt;
					case 'Hour':
					case 'Hours':
					case 'H':
						return value;
					case 'Minute':
					case 'Minutes':
					case 'M':
						return value * 60;
					default:
						throw new Error('Invalid unit');
				}
			case 'Minute':
			case 'Minutes':
			case 'M':
				switch (to) {
					case 'Year':
					case 'Years':
					case 'Y':
						return value / (this._calendar.yearHrCnt * 60);
					case 'Month':
					case 'Months':
					case 'm':
						return value / (this._calendar.monthHrCnt * 60);
					case 'Week':
					case 'Weeks':
					case 'W':
						return value / (this._calendar.weekHrCnt * 60);
					case 'Day':
					case 'Days':
					case 'D':
						return value / (this._calendar.dayHrCnt * 60);
					case 'Hour':
					case 'Hours':
					case 'H':
						return value / 60;
					case 'Minute':
					case 'Minutes':
					case 'M':
						return value;
					default:
						throw new Error('Invalid unit');
				}
			default:
				throw new Error('Invalid unit');
		}
	}
}
