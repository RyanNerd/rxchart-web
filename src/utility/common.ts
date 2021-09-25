import {Variant} from "react-bootstrap/types";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "types/RecordTypes";

interface IKey {
    [key: string]: any
}

/**
 * Given a ResidentRecord return the resident's DOB as a string.
 * @param {ResidentRecord} resident
 * @return {string}
 */
export const clientDOB = (resident: ResidentRecord): string => {
    return dateToString(resident.DOB_MONTH.toString(), resident.DOB_DAY.toString(), resident.DOB_YEAR.toString(), true);
};

/**
 * Given the month day and year return the date as a string in the format mm/dd/yyyy
 * @param month {string}
 * @param day {string}
 * @param year {string}
 * @param leadingZeros {?boolean}
 * @return {string}
 */
export const dateToString = (month: string, day: string, year: string, leadingZeros?: boolean): string => {
    const padZero = (num: string) => {
        return ('00' + parseInt(num)).slice(-2);
    }

    if (leadingZeros) {
        return padZero(month) + '/' + padZero(day) + '/' + year;
    } else {
        return month + '/' + day + '/' + year;
    }
}

/**
 * Given a ResidentRecord return the first and last name of the client in the format: first last
 * If the client Nickname field is populated then the format is: first last "nickname"
 * @param {ResidentRecord} resident
 */
export const clientFullName = (resident: ResidentRecord): string => {
    const clientName = resident.FirstName.trim() + ' ' + resident.LastName.trim();
    if (resident?.Nickname && resident?.Nickname.trim().length > 0) {
        return clientName + ' "' + resident.Nickname.trim() + '"';
    } else {
        return clientName;
    }
};

/**
 * Return a random string.
 * @return {string}
 */
export const randomString = (): string => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
};

/**
 * Return in hours how long it has been since a drug was last taken.
 * @param {number} drugId
 * @param {DrugLogRecord[]} drugLogList
 * @returns {null | number}
 */
export const calculateLastTaken = (drugId: number, drugLogList: DrugLogRecord[]): number | null => {
    if (drugLogList === null) {
        return null;
    }
    let diff;
    const filteredDrugs = drugLogList.filter(drug => drug && drug.MedicineId === drugId);
    const latestDrug = filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs[0] : null;
    if (latestDrug) {
        const date = new Date(latestDrug.Created || '');
        const latestDrugDate = Math.round((date).getTime() / 1000);
        const now = Math.round((new Date()).getTime() / 1000);
        diff = Math.round((now - latestDrugDate) / 3600);
    } else {
        diff = null;
    }
    return diff;
};

/**
 * Determine the variant string given the lastTaken hours value.
 * @param {number | null} lastTaken
 * @return {Variant}
 */
export const getLastTakenVariant = (lastTaken: number | null): Variant => {
    let variant;
    switch (lastTaken) {
        case null:
            variant = 'primary';
            break;
        case 0:
            variant = 'danger';
            break;
        case 1:
            variant = 'danger';
            break;
        case 2:
            variant = 'danger';
            break;
        case 3:
            variant = 'warning';
            break;
        case 4:
            variant = 'warning';
            break;
        case 5:
            variant = 'warning';
            break;
        case 6:
            variant = 'info';
            break;
        case 7:
            variant = 'info';
            break;
        default:
            variant = 'primary';
    }
    return (lastTaken && lastTaken >= 8) ? 'light' : variant;
}

/**
 * Given the variant string return the corresponding hexcolor string
 * @param {Variant} variant
 */
export const getBsColor = (variant: Variant): string => {
    const lcVariant = variant.toLowerCase();
    let hexColor;
    switch (lcVariant) {
        case 'primary':
            hexColor = '#0275D8';
            break;
        case 'success':
            hexColor = '#5CB85C';
            break;
        case 'info':
            hexColor = '#5BC0DE';
            break;
        case 'warning':
            hexColor = '#F0AD4E';
            break;
        case 'danger':
            hexColor = '#D9534F';
            break;
        case 'inverse':
            hexColor = '#292B2C';
            break;
        case 'faded':
            hexColor = '#F7F7F7';
            break;
        case 'light':
            hexColor = '#888888'; // Custom color
            break
        default:
            throw new Error('variant ' + variant + ' is invalid.');
    }
    return hexColor;
}

/**
 * Given a date object return true if the date is today.
 * @param {Date} dateIn
 * @return {boolean}
 */
export const isToday = (dateIn: Date): boolean => {
    const date = new Date(dateIn);
    const now = new Date();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    } as Intl.DateTimeFormatOptions;
    const nowFull = now.toLocaleString('en-US', options);
    const dateFull = date.toLocaleString('en-US', options);
    return nowFull === dateFull;
}

/**
 * Return an object containing the day, month, and year as numbers and a date indicating now or a given date
 * @param {Date} inDate
 * @return {month: number, day: number, year: number, now: Date}
 */
export const getMDY = (inDate?: Date): { month: number, day: number, year: number, now: Date } => {
    const now = inDate ? new Date(inDate) : new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return {month, day, year, now};
}

/**
 * Given a string or Date object return the formatted string of the date: mm/dd/yyyy, hh:mm AM
 * @param {Date | string} date
 * @return {string}
 */
export const getFormattedDate = (date: Date | string): string => {
    const dt = (typeof date === 'string') ? new Date(date) : date;
    return dt.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    } as Intl.DateTimeFormatOptions);
}

/**
 * Given a date return true if the date is in the future, false otherwise.
 * @param {Date} dateIn
 * @return {boolean}
 */
export const isDateFuture = (dateIn: Date): boolean => {
    const nowMDY = getMDY();
    const dateMDY = getMDY(dateIn);
    //  ('00' + parseInt(num)).slice(-2);
    const nowString = nowMDY.year.toString() + ('00' + nowMDY.month).slice(-2) + ('00' + nowMDY.day).slice(-2);
    const dateString = dateMDY.year.toString() + ('00' + dateMDY.month).slice(-2) + ('00' + dateMDY.day).slice(-2);
    return parseInt(dateString) > parseInt(nowString);
}

/**
 * Return an object in an array that matches the object.propName === searchValue
 * @param {IKey} objectList
 * @param {string} propName
 * @param {any} searchValue
 * @return {Object | undefined}
 */
export const getObjectByProperty = <T>(objectList: IKey, propName: string, searchValue: any): T | undefined => {
    return objectList.find((obj: IKey) => (obj[propName] === searchValue));
}

/**
 * Given the MedicineId, and medicineList return the name of the drug
 * @param {number} medicineId
 * @param {MedicineRecord[]} medicineList
 * @retirm {string | undefined}
 */
export const getDrugName = (medicineId: number, medicineList: MedicineRecord[]): string | undefined => {
    return getMedicineRecord(medicineId, medicineList)?.Drug;
}

/**
 * Given the Id of the Medicine return the medicine record
 * @param {number} medicineId
 * @param {MedicineRecord[]} medicineList
 * @return {MedicineRecord | undefined}
 */
export const getMedicineRecord = (medicineId: number, medicineList: MedicineRecord[]): MedicineRecord | undefined => {
    return getObjectByProperty<MedicineRecord>(medicineList, 'Id', medicineId);
}

/**
 * Given the searchText and activeDrug determine if the search is valid and return true if so, otherwise false.
 * @param {string} searchText
 * @param {MedicineRecord} drug
 * @returns {boolean}
 */
export const isSearchValid = (searchText: string, drug: MedicineRecord): boolean => {
    const textLen = searchText ? searchText.length : 0;
    let searched;
    const c = searchText.substr(0, 1);
    // Is the first character a digit? If so, search the Barcode otherwise search the Drug name
    if (c >= '0' && c <= '9') {
        searched = drug.Barcode;
    } else {
        searched = drug.Drug;
    }
    return searched?.substr(0, textLen).toLowerCase() === searchText.substr(0, textLen).toLowerCase();
}

/**
 * Returns a string of a drug that soft matches in the given drugList if found, otherwise returns a null;
 * @param {string} searchText
 * @param {array<{Barcode: string, Drug: string}>} drugList
 * @returns {null | string}
 */
export const searchDrugs = (searchText: string, drugList: MedicineRecord[]) => {
    const textLen = searchText ? searchText.length : 0;
    if (textLen > 0 && drugList && drugList.length > 0) {
        let drugMatch;
        const c = searchText.substr(0, 1);
        // Is the first character a digit? If so, search the Barcode otherwise search the Drug name
        if (c >= '0' && c <= '9') {
            drugMatch = drugList.filter(drug =>
                (drug.Barcode?.substr(0, textLen).toLowerCase() === searchText.toLowerCase())
            );
        } else {
            drugMatch =
                drugList.filter(drug =>
                    (drug.Drug.substr(0, textLen).toLowerCase() === searchText.toLowerCase())
                );
        }
        if (drugMatch && drugMatch.length > 0) {
            return drugMatch[0];
        }
    }
    return null;
}

/**
 * Given the drugLogList this returns a filtered list of drugLogList records that are populated with In or Out
 * for today's date.
 * @param {DrugLogRecord[]} drugLogList
 */
export const getCheckoutList = (drugLogList: DrugLogRecord[]) => {
    return drugLogList.filter((drug) => {
        const isThisDay = (drug: DrugLogRecord) => {
            return drug && drug.Updated && isToday(new Date(drug.Updated));
        }
        return ((drug.Out && drug.Out > 0) || (drug.In && drug.In > 0)) && isThisDay(drug);
    });
}

/**
 * Given the day and month returns false if the month and day pair isn't a valid day date, otherwise returns true.
 * @param {string} day
 * @param {string} month
 * @return {boolean}
 */
export const isDayValid = (day: string, month: string): boolean => {
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
    return (nDay >= 1 && nDay <= maxDay);
};

/**
 * Given a month numeric return 'is-invalid' if the number isn't between 1 and 12, otherwise return ''.
 * @param {string} month
 * @returns {boolean}
 */
export const isMonthValid = (month: string): boolean => {
    return (parseInt(month) >= 1 && parseInt(month) <= 12);
};

/**
 * Returns 'is-invalid' if the year is not valid using the isDOB flag to determine the valid range.
 * @param {string} year
 * @param {boolean} isDOB
 * @return {boolean}
 */
export const isYearValid = (year: string, isDOB: boolean): boolean => {
    const nYear = parseInt(year);
    if (isDOB) {
        const today = new Date();
        const todayYear = today.getFullYear();
        return (nYear <= todayYear && nYear >= todayYear - 125);
    }
    return (nYear >= 1900 && nYear <= 9999);
};

/**
 * A functional wrapper around async/await
 * @link https://dev.to/dewaldels/javascript-async-await-wrapper-22ao
 * @param {Promise<any>} fn
 * @return {[error: any, data: any]}
 */
export const asyncWrapper = async (fn: Promise<any>) => {
    try {
        const data = await fn;
        return [null, data];
    }
    catch (error) {
        return [error, null];
    }
}

/**
 * A functional wrapper around Promises
 * @link https://github.com/JFDI-Consulting/attempt#or-for-old-style-promise-handling
 * @param {Promise<any>} fn
 */
export const promiseWrapper = async (fn: Promise<any>) => {
    const success = (r: any) => [null, r];
    const fail = (e: any) => [e, null];
    return Promise.resolve().then(await fn).then(success).catch(fail);
}

export enum SortDirection {
    desc = 1,
    asc = -1,
    skip = 0
}

export interface SortObject {
    [index: string]: SortDirection
}

/**
 * Sorts an array of objects by column/property.
 * @todo Figure out how to make this generic
 * @link https://www.golangprograms.com/javascript-sort-multi-dimensional-array-on-specific-columns.html
 * @param {[{}]} array - The array of objects.
 * @param {[index: string]:any} sortObject e.g. { age: 'desc', name: 'asc' }
 * @returns {[]} The sorted array.
 */
export const multiSort = (array: [], sortObject: SortObject): [] => {
    const sortKeys = Object.keys(sortObject);

    /**
     * Determine the sort direction by comparing sort key values
     * @param {number} a
     * @param {number} b
     * @param {number} direction
     * @return {number}
     */
    const keySort = (a: number, b: number, direction: SortDirection): number => {
        // If the values are the same, do not switch positions.
        if (a === b) {
            return 0;
        }

        // If b > a, multiply by -1 to get the reverse direction.
        return a > b ? direction : -1 * direction;
    };

    return array.sort((a, b) => {
        let sorted = 0;
        let index = 0;

        // Loop until sorted (-1 or 1) or until the sort keys have been processed.
        while (sorted === 0 && index < sortKeys.length) {
            const key = sortKeys[index];
            const direction = sortObject[key];
            sorted = keySort(a[key], b[key], direction);
            index++;
        }
        return sorted;
    });
}

/**
 * Bootstrap default colors as an enum
 */
export enum BsColors {
    blue = "#007bff",
    cyan = "#17a2b8",
    danger = "#dc3545",
    dark = "#343a40",
    gray = "#6c757d",
    grayDark = "#343a40",
    green = "#28a745",
    indigo = "#6610f2",
    info = "#17a2b8",
    light = "#f8f9fa",
    orange = "#fd7e14",
    pink = "#e83e8c",
    primary = "#007bff",
    purple = "#6f42c1",
    red = "#dc3545",
    secondary = "#6c757d",
    success = "#28a745",
    teal = "#20c997",
    warning = "#ffc107",
    white = "#fff",
    yellow = "#ffc107"
}

export const getPillboxLogDateString = (pillboxId: number) => {
    const key = 'pillbox-history-' + pillboxId;
    const pbh = window.localStorage.getItem(key);
    return pbh ? JSON.parse(pbh) : null;
}

export const setPillboxLogDate = (pillboxId: number) => {
    const now = JSON.stringify(new Date());
    window.localStorage.setItem('pillbox-history-' + pillboxId, now);
    return getPillboxLogDateString(pillboxId);
}

export const isPillboxLogToday = (pillboxId: number) => {
    const pbh = getPillboxLogDate(pillboxId);
    return pbh ? isToday(new Date(pbh)) : false;
}

export const getPillboxLogDate = (pillboxId: number) => {
    const logDate = getPillboxLogDateString(pillboxId);
    if (logDate) {
        return new Date(logDate);
    }
    return null;
}
