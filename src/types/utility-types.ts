import { Dayjs } from "dayjs";

// Keys of T whose values are Dayjs instances
export type DayjsProps<T> = {
    [K in keyof T]: T[K] extends Dayjs ? K : never;
}[keyof T];

/**
 * @deprecated Use DayjsProps<T> instead.
 */
export type MomentProps<T> = DayjsProps<T>;

export type Change<T> = {[k in keyof T]?: {old: T[k], new: T[k]}};
