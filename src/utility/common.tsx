import {DrugLogRecord, ResidentRecord} from "./InitialState";

/**
 * Given a ResidentRecord return the resident's DOB as a string.
 *
 * @param {ResidentRecord} resident
 * @return {string}
 */
export const DOB = (resident: ResidentRecord): string => {
    return DateToString(resident.DOB_MONTH, resident.DOB_DAY,resident.DOB_YEAR);
};

/**
 * Given the month day and year return the date as a string in the format mm/dd/yyyy
 *
 * @param {number} month
 * @param {number} day
 * @param {number} year
 * @return {string}
 */
export const DateToString = (month: number, day: number, year: number): string => {
    return  month + '/' + day + '/' + year;
}

/**
 * Given a ResidentRecord return the first and last name of the resident in the format: first last
 *
 * @param resident
 */
export const FullName = (resident: ResidentRecord): string => {
    return resident.FirstName.trim() + ' ' + resident.LastName.trim();
};

// VALIDATION Functions START
/**
 * Given a month numeric return 'is-invalid' if the number isn't between 1 and 12, otherwise return ''.
 *
 * @param month
 * @returns {string}
 */
export const isMonthValid = (month: number): string => {
    return (month >= 1 && month <= 12) ? '' : 'is-invalid';
};

/**
 * Given the day and month returns 'is-invalid' if the month and day pair isn't a valid date, otherwise return ''.
 *
 * @param day
 * @param month
 * @return {string}
 */
export const isDayValid = (day: string, month: string): string => {
    let maxDay = 28;
    const nMonth = parseInt(month);
    const nDay = parseInt(day);
    if (nMonth ===1
        || nMonth === 3
        || nMonth === 5
        || nMonth === 7
        || nMonth === 8
        || nMonth === 10
        || nMonth === 11
        || nMonth === 12) {
        maxDay = 31;
    }

    if (nMonth === 4
        || nMonth === 6
        || nMonth === 9) {
        maxDay = 30;
    }

    return (nDay >=1 && nDay <= maxDay) ? '' : 'is-invalid';
};

/**
 * Returns 'is-invalid' if the year is not valid using the isDOB flag to determine the valid range.
 *
 * @param {string} year
 * @param {boolean} isDOB
 * @return {string}
 */
export const isYearValid = (year: string, isDOB: boolean): string => {
    const nYear = parseInt(year);
    if (isDOB) {
        const today = new Date();
        const todayYear = today.getFullYear();
        return (nYear <= todayYear && nYear >= 1900) ? '' : 'is-invalid';
    }

    return (nYear >= 1900 && nYear <= 9999) ? '' : 'is-invalid';
};
// VALIDATION Functions END

/**
 * Return a random string.
 * @return {string}
 */
export const randomString: string = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

/**
 * Return in hours how long it has been since a drug was last taken.
 * @param {number} drugId
 * @param {array<object>} drugLogList
 * @returns {null | number}
 */
export const calculateLastTaken = (drugId: number, drugLogList:Array<DrugLogRecord>): number | null => {
    let diff = null;
    const filteredDrugs = drugLogList.filter(drug => drug.MedicineId === drugId);
    const latestDrug = filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs[0] : null;
    if (latestDrug) {
        const latestDrugDate = Math.round((new Date(latestDrug.Updated)).getTime() / 1000);
        const now = Math.round((new Date()).getTime() / 1000);
        diff = Math.round((now - latestDrugDate) / 3600);
    }
    return diff;
};
