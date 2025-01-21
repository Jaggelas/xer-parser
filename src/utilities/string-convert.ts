/**
 * Converts a string to a number if the string is not empty.
 * If the string is empty, returns `undefined`.
 *
 * @param string - The string to convert to a number.
 * @returns The number representation of the string, or `undefined` if the string is empty.
 */
export const optionalNumber = (string: string): number | undefined => {
	return string === '' ? undefined : Number(string);
};

/**
 * Converts a string to a Date object if the string is not empty.
 * If the string is empty, returns undefined.
 *
 * @param string - The string to convert to a Date object.
 * @returns A Date object if the string is not empty, otherwise undefined.
 */
export const optionalDate = (string: string): Date | undefined => {
	return string === '' ? undefined : new Date(string);
};

/**
 * Converts an empty string to `undefined`, otherwise returns the original string.
 *
 * @param string - The string to be converted.
 * @returns The original string if it is not empty, otherwise `undefined`.
 */
export const optionalString = (string: string): string | undefined => {
	return string === '' ? undefined : string;
};
