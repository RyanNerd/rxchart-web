import {DrugLogRecord, MedicineRecord, ResidentRecord} from "../types/RecordTypes";
import {Variant} from "react-bootstrap/types";

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
 * Given a ResidentRecord return the first and last name of the resident in the format: first last
 * @param {ResidentRecord} resident
 */
export const clientFullName = (resident: ResidentRecord): string => {
    return resident.FirstName.trim() + ' ' + resident.LastName.trim();
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
 * Return an object containing the day, month, and year as numbers and a date indicating now
 * @return {month: number, day: number, year: number, now: Date}
 */
export const getMDY = (): { month: number, day: number, year: number, now: Date } => {
    const now = new Date();
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
 * Given the MedicineId return the name of the drug
 * @param {number} id
 * @param {MedicineRecord[]} list
 * @return {string}
 */
export const getDrugName = (id: number, list: MedicineRecord[]): string => {
    const drug = getObjectByProperty<MedicineRecord>(list, 'Id', id);
    return drug ? drug.Drug : '[not found]';
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
