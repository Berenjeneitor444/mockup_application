/**
 * Converts a date string in the format "YYYYMMDDHHMMSS" to a Date object.
 *
 * @param {string} dateString - The date string in "YYYYMMDDHHMMSS" format.
 * @returns {Date} - The corresponding Date object.
 * @throws {Error} - If the input string does not have exactly 14 characters.
 *
 * @example
 * const dateString = "20231014000000";
 * const date = convertToDate(dateString);
 * console.log(date); // Outputs: Sat Oct 14 2023 00:00:00 GMT+0000 (Coordinated Universal Time)
 */
export function apiToDate(dateString: string | undefined): Date | undefined {
  // Check that the string has exactly 14 characters
  if (
    !dateString ||
    dateString.length !== 14 ||
    dateString === '00000000000000'
  ) {
    return undefined;
  }

  // Extract parts of the date from the string using slice
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // Months are 0-11 in JavaScript
  const day = parseInt(dateString.slice(6, 8), 10);
  const hours = parseInt(dateString.slice(8, 10), 10);
  const minutes = parseInt(dateString.slice(10, 12), 10);
  const seconds = parseInt(dateString.slice(12, 14), 10);

  // Create a new Date object with the extracted parts
  return new Date(year, month, day, hours, minutes, seconds);
}

/**
 * Converts a Date object to a string in the format "YYYYMMDD000000".
 * Return "00000000000000" if the input date is undefined.
 * @param date
 * @returns
 */
export function dateToApi(date: Date | undefined): string {
  if (
    date &&
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date !== undefined
  ) {
    // Extract parts of the date using destructuring
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-11 in JavaScript
    const day = date.getDate();

    // Pad single-digit values with a leading zero
    const pad = (value: number) => `${value < 10 ? '0' : ''}${value}`;

    // Create a string in the format "YYYYMMDD000000"
    return `${year}${pad(month)}${pad(day)}000000`;
  } else {
    return '00000000000000';
  }
}

/**
 * Converts a Date object to a string in the format "YYYYMMDD".
 * Return "" if the input date is undefined.
 * @param date
 * @returns
 */
export function dateToContract(date: Date | undefined): string {
  if (date && date instanceof Date && !isNaN(date.getTime())) {
    // Extract parts of the date using destructuring
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-11 in JavaScript
    const day = date.getDate();

    // Pad single-digit values with a leading zero
    const pad = (value: number) => `${value < 10 ? '0' : ''}${value}`;

    // Create a string in the format "YYYYMMDD"
    return `${year}${pad(month)}${pad(day)}`;
  } else {
    return '';
  }
}

/**
 * Return whether or not two dates fall into the same day.
 * @param date1
 * @param date2
 * @returns
 */
export function isSameDay(date1: Date | undefined, date2: Date): boolean {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Return whether or not two dates fall into the same month.
 * @param date1
 * @param date2
 * @returns
 */
export function isYesterday(date1: Date | undefined, date2: Date): boolean {
  if (!date1 || !date2) {
    return false;
  }
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() - 1
  );
}
