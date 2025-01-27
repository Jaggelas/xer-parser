import { Moment } from "moment";

export type MomentProps<T> = {
    [K in keyof T]: T[K] extends Moment ? K : never;
}[keyof T];

export type Change<T> = {[k in keyof T]?: {old: T[k], new: T[k]}};
