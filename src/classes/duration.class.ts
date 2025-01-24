import { Unit } from '../types/unit.type';
import { Calendar } from '../schemas/calendar';

export class Duration {
	private value: number;

	constructor(
		_value: number | string,
		private _calendar: Calendar | undefined,
		private _unit: Unit
	) {
		this.value = typeof _value === 'string' ? Number(_value) : _value;
	}

	/**
	 * Gets the duration value converted to years
	 * @returns {number} The duration value in years
	 */
	get years(): number {
		return this._calendar ? this._calendar.unitConvert(this._unit, 'y', this.value) : 0;
	}

	/**
	 * Gets the duration value converted to months.
	 * @returns The duration value in months.
	 */
	get months(): number {
		return this._calendar ? this._calendar.unitConvert(this._unit, 'M', this.value) : 0;
	}

	/**
	 * Gets the duration in weeks
	 * @returns Duration in weeks as a number
	 */
	get weeks(): number {
		return this._calendar ? this._calendar.unitConvert(this._unit, 'w', this.value) : 0;
	}

	/**
	 * Gets the duration value converted to days.
	 * @returns {number} The duration value in days.
	 */
	get days(): number {
		return this._calendar ? this._calendar.unitConvert(this._unit, 'd', this.value) : 0;
	}

	/**
	 * Gets the duration in hours.
	 * Converts the current duration value from its unit to hours.
	 * @returns {number} The duration value in hours
	 */
	get hours(): number {
		return this._calendar ? this._calendar.unitConvert(this._unit, 'h', this.value) : 0;
	}

	/**
	 * Gets the duration value in minutes after converting from the current unit.
	 * @returns {number} The duration value in minutes.
	 */
	get minutes(): number {
		return this._calendar ? this._calendar.unitConvert(this._unit, 'm', this.value) : 0;
	}

	add(val: Duration | number): Duration {
		const v = typeof val === 'number' ? val : val.hours;
		return new Duration(this.hours + v, this._calendar, 'h');
	}
	
}
