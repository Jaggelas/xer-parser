// Purpose: Contains the Shift class.

import dayjs, { Dayjs } from "../utilities/dayjs";


export class Shift {

    public durationHrs: number;
    public start: Dayjs;
    public finish: Dayjs;

    constructor(
        public startTime: string,
        public finishTime: string,
    ) {
    this.start = dayjs(startTime, 'HH:mm');
    this.finish = dayjs(finishTime, 'HH:mm');
    this.durationHrs = dayjs(finishTime, 'HH:mm').diff(dayjs(startTime, 'HH:mm'), 'hour');
    }

    /**
     * Determines if a given date falls within the shift's time window
     * @param date - A Dayjs date object to check
     * @returns {boolean} True if the time portion of the date falls between shift start and end times, false otherwise
     */
    inShift(date: Dayjs): boolean {
        const time = date.format('HH:mm');
        return dayjs(time, 'HH:mm').isBetween(this.start, this.finish, 'minute', '[)');
    }

    shiftStart(date: Dayjs): Dayjs {
        return dayjs(date.format('YYYY-MM-DD') + ' ' + this.startTime, 'YYYY-MM-DD HH:mm');
    }

    shiftFinish(date: Dayjs): Dayjs {
        return dayjs(date.format('YYYY-MM-DD') + ' ' + this.finishTime, 'YYYY-MM-DD HH:mm');
    }

}