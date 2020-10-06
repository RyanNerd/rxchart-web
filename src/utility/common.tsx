import {DrugLogRecord, ResidentRecord} from "../types/RecordTypes";
import {Variant} from "react-bootstrap/types";

interface IKey {
    [key: string]: any
}

/**
 * Given a ResidentRecord return the resident's DOB as a string.
 *
 * @param {ResidentRecord} resident
 * @return {string}
 */
export const DOB = (resident: ResidentRecord): string => {
    return DateToString(resident.DOB_MONTH.toString(), resident.DOB_DAY.toString(), resident.DOB_YEAR.toString());
};

/**
 * Given the month day and year return the date as a string in the format mm/dd/yyyy
 *
 * @param {string} month
 * @param {string} day
 * @param {string} year
 * @return {string}
 */
export const DateToString = (month: string, day: string, year: string): string => {
    return  month + '/' + day + '/' + year;
}

/**
 * Given a ResidentRecord return the first and last name of the resident in the format: first last
 *
 * @param {ResidentRecord} resident
 */
export const FullName = (resident: ResidentRecord): string => {
    return resident.FirstName.trim() + ' ' + resident.LastName.trim();
};

// VALIDATION Functions START
/**
 * Given a month numeric return 'is-invalid' if the number isn't between 1 and 12, otherwise return ''.
 *
 * @param {string} month
 * @returns {'' | 'is-invalid'}
 */
export const isMonthValid = (month: string): '' | 'is-invalid' => {
    return (parseInt(month) >= 1 && parseInt(month) <= 12) ? '' : 'is-invalid';
};

/**
 * Given the day and month returns 'is-invalid' if the month and day pair isn't a valid date, otherwise return ''.
 *
 * @param {string} day
 * @param {string} month
 * @return {'' | 'is-invalid'}
 */
export const isDayValid = (day: string, month: string): '' | 'is-invalid' => {
    let maxDay = 28;
    const nMonth = parseInt(month);
    const nDay = parseInt(day);
    if (nMonth === 1
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
export const isYearValid = (year: string, isDOB: boolean): '' | 'is-invalid' => {
    const nYear = parseInt(year);
    if (isDOB) {
        const today = new Date();
        const todayYear = today.getFullYear();
        return (nYear <= todayYear && nYear >= todayYear - 125) ? '' : 'is-invalid';
    }

    return (nYear >= 1900 && nYear <= 9999) ? '' : 'is-invalid';
};
// VALIDATION Functions END

/**
 * Return a random string.
 *
 * @return {string}
 */
export const randomString = (): string => {
    return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
};

/**
 * Return in hours how long it has been since a drug was last taken.
 *
 * @param {number} drugId
 * @param {DrugLogRecord[]} drugLogList
 * @returns {null | number}
 */
export const calculateLastTaken = (drugId: number, drugLogList:DrugLogRecord[]): number | null => {
    if (drugLogList === null) {
        return null;
    }
    let diff = null;
    const filteredDrugs = drugLogList.filter(drug => drug && drug.MedicineId === drugId);
    const latestDrug = filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs[0] : null;
    if (latestDrug) {
        const date = new Date(latestDrug.Updated || '');
        const latestDrugDate = Math.round((date).getTime() / 1000);
        const now = Math.round((new Date()).getTime() / 1000);
        diff = Math.round((now - latestDrugDate) / 3600);
    }
    return diff;
};

/**
 * Determine the variant string given the lastTaken hours value.
 *
 * @param {number | null} lastTaken
 * @return {Variant}
 */
export const getLastTakenVariant = (lastTaken: number | null): Variant => {
    let warningColor = 'primary';
    switch (lastTaken) {
        case null: warningColor = 'primary';
            break;
        case 0: warningColor = 'danger';
            break;
        case 1: warningColor = 'danger';
            break;
        case 2: warningColor = 'danger';
            break;
        case 3: warningColor = 'warning';
            break;
        case 4: warningColor = 'warning';
            break;
        case 5: warningColor = 'warning';
            break;
        case 6: warningColor = 'info';
            break;
        case 7: warningColor = 'info';
            break;
        case 8: warningColor = 'info';
            break;
        default: warningColor = 'primary';
    }
    return warningColor;
}

/**
 * Given a date object return true if the date is today.
 *
 * @param {Date} date
 */
export const isToday = (date: Date): boolean => {
    const now = new Date();
    const options = {month: '2-digit', day: '2-digit', year: 'numeric'};
    const nowFull = now.toLocaleString('en-US', options);
    const dateFull = date.toLocaleString('en-US', options);
    return nowFull === dateFull;
}

/**
 * Given a string or Date object return the formatted string of the date: mm/dd/yyyy, hh:mm AM
 *
 * @param {Date | string} date
 * @return {string}
 */
export const getFormattedDate = (date: Date | string): string => {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Return an object in an array that matches the object.propName === searchValue
 *
 * @param {IKey} objectList
 * @param {string} propName
 * @param {any} searchValue
 * @return Object
 */
export const getObjectByProperty = (objectList: IKey, propName: string, searchValue: any): object => {
    return objectList.find((obj: IKey) => (obj[propName] === searchValue));
}
