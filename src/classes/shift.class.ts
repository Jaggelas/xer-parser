// Purpose: Contains the Shift class.

import moment, { Moment } from "moment";


export class Shift {

    public durationHrs: number;
    public start: Moment;
    public finish: Moment;

    constructor(
        public startTime: string,
        public finishTime: string,
    ) {
        this.start = moment(startTime, 'HH:mm');
        this.finish = moment(finishTime, 'HH:mm');
        this.durationHrs = moment(finishTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'hours');
    }

    /**
     * Determines if a given date falls within the shift's time window
     * @param date - A Moment.js date object to check
     * @returns {boolean} True if the time portion of the date falls between shift start and end times, false otherwise
     */
    inShift(date: Moment): boolean {
        const time = date.format('HH:mm');
        return moment(time, 'HH:mm').isBetween(this.start, this.finish, 'minute', '[)');
    }

    shiftStart(date: Moment): Moment {
        return moment(date.format('YYYY-MM-DD') + ' ' + this.startTime, 'YYYY-MM-DD HH:mm');
    }

    shiftFinish(date: Moment): Moment {
        return moment(date.format('YYYY-MM-DD') + ' ' + this.finishTime, 'YYYY-MM-DD HH:mm');
    }

}