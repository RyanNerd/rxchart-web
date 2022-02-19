/* eslint-disable unicorn/prefer-spread,no-bitwise,space-before-function-paren,no-underscore-dangle */
// noinspection JSUnusedGlobalSymbols
import {ClientRecord, DrugLogRecord, MedicineRecord} from 'types/RecordTypes';

interface IKey {
    /* eslint @typescript-eslint/no-explicit-any: off */
    [key: string]: any;
}

/**
 * Given a numeric string pad zeros to the string
 * @param {string} number_ The number to zero pad
 * @returns {string} The zero padded number
 */
const padZero = (number_: string): string => {
    return ('00' + Number.parseInt(number_)).slice(-2);
};

/**
 * Given the month day and year return the date as a string in the format mm/dd/yyyy
 * @param {string} month The month as a string
 * @param {string} day The day in the month as a string
 * @param {string} year The year as a string
 * @param {boolean} leadingZeros True if leading zeros in the output, otherwise no leading zeros
 * @returns {string} Date in the format of MM/DD/YYYY or M/D/YYYY depending on if leadingZeros is true.
 */
export const dateToString = (month: string, day: string, year: string, leadingZeros?: boolean): string => {
    return leadingZeros ? padZero(month) + '/' + padZero(day) + '/' + year : month + '/' + day + '/' + year;
};

/**
 * Given a ResidentRecord return the resident's DOB as a string.
 * @param {ClientRecord} resident The client record
 * @returns {string} Returns the DOB in the format MM/DD/YYYY
 */
export const clientDOB = (resident: ClientRecord): string => {
    return dateToString(resident.DOB_MONTH.toString(), resident.DOB_DAY.toString(), resident.DOB_YEAR.toString(), true);
};

/**
 * Given a ResidentRecord return the first and last name of the client in the format: first last
 * If the client Nickname field is populated then the format is: first last "nickname"
 * @param {ClientRecord} resident The client record
 * @param {boolean} includeNickname True if nickname should be returned in quotes, no display of the nickname otherwise
 */
export const clientFullName = (resident: ClientRecord, includeNickname = false): string => {
    const clientName = resident.FirstName.trim() + ' ' + resident.LastName.trim();
    return includeNickname && resident?.Nickname && resident?.Nickname.trim().length > 0
        ? clientName + ' "' + resident.Nickname.trim() + '"'
        : clientName;
};

/**
 * Return a random string.
 * @returns {string} The random string
 */
export const randomString = (): string => {
    // prettier-ignore
    return Math
            .random()
            .toString(36)
            .slice(2, 15)
            +
            Math
            .random()
            .toString(36)
            .slice(2, 15);
};

/**
 * Return in hours how long it has been since a drug was last taken.
 * @param {number} drugId The PK of the Medicine table
 * @param {DrugLogRecord[]} drugLogList Array of drugs logged for the client
 * @returns {null | number} Number of hours or null
 */
export const calculateLastTaken = (drugId: number, drugLogList: DrugLogRecord[]): number | null => {
    let diff;
    const filteredDrugs = drugLogList.filter((drug) => drug && drug.MedicineId === drugId);
    const latestDrug = filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs[0] : null;
    if (latestDrug) {
        const date = new Date(latestDrug.Created || '');
        const latestDrugDate = Math.round(date.getTime() / 1000);
        const now = Math.round(Date.now() / 1000);
        diff = Math.round((now - latestDrugDate) / 3600);
    } else {
        diff = null;
    }
    return diff;
};

/**
 * Determine the variant string given the lastTaken hours value.
 * @param {number | null} lastTaken The number of hours since the client took the drug, or null for 8+ hours
 */
export const getLastTakenVariant = (lastTaken: number | null) => {
    if (lastTaken && lastTaken >= 8) return 'light';
    switch (lastTaken) {
        case null:
            return 'primary';
        case 0:
            return 'danger';
        case 1:
            return 'danger';
        case 2:
            return 'danger';
        case 3:
            return 'warning';
        case 4:
            return 'warning';
        case 5:
            return 'warning';
        case 6:
            return 'info';
        case 7:
            return 'info';
    }
    return 'light';
};

/**
 * Bootstrap default colors as an enum
 */
export enum BsColor {
    blue = '#007bff',
    cyan = '#17a2b8',
    danger = '#dc3545',
    dark = '#343a40',
    gray = '#6c757d',
    grayDark = '#343a40',
    grayLight = '#888888', // Custom
    green = '#28a745',
    indigo = '#6610f2',
    info = '#17a2b8',
    light = grayLight, // Override: "#f8f9fa"
    orange = '#fd7e14',
    pink = '#e83e8c',
    primary = '#007bff',
    purple = '#6f42c1',
    red = '#dc3545',
    secondary = '#6c757d',
    success = '#28a745',
    teal = '#20c997',
    warning = '#ffc107',
    warningSoft = '#fff3cd', // Custom
    white = '#fff',
    yellow = '#ffc107',
    yellowLight = '#fff3cd' // Custom
}

type T_BS_Colors = keyof typeof BsColor;

/**
 * Given the variant string return the corresponding hexcolor string
 * @param {T_BS_Colors} variant Reverse lookup for the BsColor enum
 */
export const getBsColor = (variant: T_BS_Colors) => {
    return BsColor[variant];
};

/**
 * Given a date object return true if the date is today.
 * @param {Date} dateIn Date object to check
 * @returns {boolean} True if the given date is today, otherwise false
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
};

interface IMonthDayYear {
    month: number;
    day: number;
    year: number;
    now: Date;
}

/**
 * Return an object containing the day, month, and year as numbers and a date indicating now or a given date
 * @param {Date} inDate Date object to convert
 * @returns {IMonthDayYear} Object containing the current day, month and year, and the date object for `now()`
 */
export const getMDY = (inDate?: Date): IMonthDayYear => {
    const now = inDate ? new Date(inDate) : new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    return {month, day, year, now};
};

/**
 * Given a string or Date object return the formatted string of the date: mm/dd/yyyy, hh:mm AM
 * @param {Date | string} date The date to parse and format
 * @returns {string} The date in the format of MM/DD/YYYY HH:MM am/pm
 */
export const getFormattedDate = (date: Date | string): string => {
    const dt = typeof date === 'string' ? new Date(date) : date;
    return dt.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    } as Intl.DateTimeFormatOptions);
};

/**
 * Given a date return true if the date is in the future, false otherwise.
 * @param {Date} dateIn The date to check
 * @returns {boolean} True if the date is in the future, otherwise false
 */
export const isDateFuture = (dateIn: Date): boolean => {
    const nowMDY = getMDY();
    const dateMDY = getMDY(dateIn);
    //  ('00' + parseInt(num)).slice(-2);
    const nowString = nowMDY.year.toString() + ('00' + nowMDY.month).slice(-2) + ('00' + nowMDY.day).slice(-2);
    const dateString = dateMDY.year.toString() + ('00' + dateMDY.month).slice(-2) + ('00' + dateMDY.day).slice(-2);
    return Number.parseInt(dateString) > Number.parseInt(nowString);
};

/**
 * Return an object in an array that matches the object.propName === searchValue
 * @param {IKey} objectList Any array of {object}
 * @param {string} propertyName The property name to search for
 * @param {any} searchValue The value to search for
 * @returns {Object | undefined} The object searched for or undefined if not found
 */
export const getObjectByProperty = <T>(objectList: IKey, propertyName: string, searchValue: any): T | undefined => {
    return objectList.find((object: IKey) => object[propertyName] === searchValue);
};

/**
 * Given the Id of the Medicine return the medicine record
 * @param {number} medicineId PK of the Medicine table
 * @param {MedicineRecord[]} medicineList Array of medicines
 * @returns {MedicineRecord | undefined} The MedicineRecord if found, otherwise undefined
 */
export const getMedicineRecord = (medicineId: number, medicineList: MedicineRecord[]): MedicineRecord | undefined => {
    return getObjectByProperty<MedicineRecord>(medicineList, 'Id', medicineId);
};

/**
 * Given the MedicineId, and medicineList return the name of the drug
 * @param {number} medicineId PK of the Medicine table
 * @param {MedicineRecord[]} medicineList Array of medicines
 * @returns {string | undefined} The name of the drug as a string, or undefined if not found
 */
export const getDrugName = (medicineId: number, medicineList: MedicineRecord[]): string | undefined => {
    return getMedicineRecord(medicineId, medicineList)?.Drug;
};

/**
 * Returns a string of a drug that soft matches in the given drugList if found, otherwise returns a null;
 * @param {string} searchText The text to search for
 * @param {MedicineRecord[]} drugList Array of medicines
 * @returns {null | string} The drug that matches the search or null if no match found
 */
export const searchDrugs = (searchText: string, drugList: MedicineRecord[]) => {
    const textLength = searchText ? searchText.length : 0;
    if (textLength > 0 && drugList && drugList.length > 0) {
        const c = searchText.slice(0, 1);
        // Is the first character a digit? If so, search the Barcode otherwise search the Drug name
        const drugMatch =
            c >= '0' && c <= '9'
                ? drugList.filter(
                      (drug) =>
                          drug.Barcode?.slice(0, Math.max(0, textLength)).toLowerCase() === searchText.toLowerCase()
                  )
                : drugList.filter(
                      (drug) => drug.Drug.slice(0, Math.max(0, textLength)).toLowerCase() === searchText.toLowerCase()
                  );
        if (drugMatch && drugMatch.length > 0) {
            return drugMatch[0];
        }
    }
    return null;
};

/**
 * Given the DrugLog record determine if the drug was updated today
 * @param {DrugLogRecord} drug The DrugLog record
 * @returns {null | undefined | boolean} Truthy value if drug log record was updated today
 */
const isThisDay = (drug: DrugLogRecord) => {
    return drug && drug.Updated && isToday(new Date(drug.Updated));
};

/**
 * Given the drugLogList this returns a filtered list of drugLogList records that are populated with In or Out
 * for today's date.
 * @param {DrugLogRecord[]} drugLogList An array of drugs taken
 */
export const getCheckoutList = (drugLogList: DrugLogRecord[]) => {
    return drugLogList.filter((drug) => {
        return ((drug.Out && drug.Out > 0) || (drug.In && drug.In > 0)) && isThisDay(drug);
    });
};

/**
 * Given the day and month returns false if the month and day pair isn't a valid day date, otherwise returns true.
 * @param {string} day The day as a string type for the month to check
 * @param {string} month The month as a string type of the month to check
 * @returns {boolean} Returns true if the month / day are valid values, false otherwise
 */
export const isDayValid = (day: string, month: string): boolean => {
    let maxDay = 28;
    const nMonth = Number.parseInt(month);
    const nDay = Number.parseInt(day);
    if (
        nMonth === 1 ||
        nMonth === 3 ||
        nMonth === 5 ||
        nMonth === 7 ||
        nMonth === 8 ||
        nMonth === 10 ||
        nMonth === 11 ||
        nMonth === 12
    ) {
        maxDay = 31;
    }
    if (nMonth === 4 || nMonth === 6 || nMonth === 9) {
        maxDay = 30;
    }
    return nDay >= 1 && nDay <= maxDay;
};

/**
 * Given a string determine if the string converted to an int is a valid month value (1-12)
 * @param {string} month The month as a string type to check
 * @returns {boolean} True if the given month is between 1 and 12.
 */
export const isMonthValid = (month: string): boolean => {
    return Number.parseInt(month) >= 1 && Number.parseInt(month) <= 12;
};

/**
 * Returns true if the given year is within a valid range
 * @param {string} year The year as a string type to check
 * @param {boolean} isDOB True if the year is considered to be the date of birth year
 * @returns {boolean} True if the given year is valid, otherwise false
 */
export const isYearValid = (year: string, isDOB: boolean): boolean => {
    const nYear = Number.parseInt(year);
    if (isDOB) {
        const today = new Date();
        const todayYear = today.getFullYear();
        return nYear <= todayYear && nYear >= todayYear - 125;
    }
    return nYear >= 1900 && nYear <= 9999;
};

/**
 * A functional wrapper around async/await
 * @link https://dev.to/dewaldels/javascript-async-await-wrapper-22ao
 * @param {Promise<any>} function_ Function to be wrapped
 */
export const asyncWrapper = async <T>(function_: Promise<T>) => {
    try {
        const data = await function_;
        return [null, data];
    } catch (error) {
        return [error, null];
    }
};

export enum SortDirection {
    desc = 1,
    asc = -1,
    skip = 0
}

export interface SortObject {
    [index: string]: SortDirection;
}

interface IArrayGeneric {
    [index: string]: any;
}

/**
 * Determine the sort direction by comparing sort key values
 * @param {number} a Comparison number a
 * @param {number} b Comparison number b
 * @param {SortDirection} direction The SortDirection enum value
 */
const keySort = (a: number, b: number, direction: SortDirection): number => {
    // If the values are the same, do not switch positions.
    if (a === b) {
        return 0;
    }

    // If `b > a`, multiply by -1 to get the reverse direction.
    return a > b ? direction : -1 * direction;
};

/**
 * Sorts an array of objects by column/property.
 * @link https://www.golangprograms.com/javascript-sort-multi-dimensional-array-on-specific-columns.html
 * @param {[{}]} array - The array of objects.
 * @param {SortObject} sortObject e.g. { age: 'desc', name: 'asc' }
 * @returns {[]} The sorted array.
 */
export const multiSort = (array: IArrayGeneric, sortObject: SortObject): [] => {
    const sortKeys = Object.keys(sortObject);

    return array.sort((a: {[x: string]: number}, b: {[x: string]: number}) => {
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
};

/**
 * Get local storage value given a key.
 * @param {string} key The key for the local storage
 */
export const getStickyState = (key: string) => {
    const item = window.localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : null;
};

/**
 * Set local storage using a key getting
 * @param {string} key The key for the local storage
 * @param {any} value The value to save to local storage (internally this is saved as a JSON string)
 */
export const setStickyState = (key: string, value: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    return getStickyState(key);
};

/**
 * Remove a local storage item given a key
 * @param {string} key The key for the local storage
 */
export const deleteStickyState = (key: string) => {
    return window.localStorage.removeItem(key);
};

/**
 * Given an ArrayBuffer return a base64 string
 * @param {ArrayBuffer} arrayBuffer The arrayBuffer to convert
 * @returns {string} base64 string
 */
export const base64ArrayBuffer = (arrayBuffer: ArrayBuffer) => {
    let base64 = '';
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    const bytes = new Uint8Array(arrayBuffer);
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;

    let a;
    let b;
    let c;
    let d;
    let chunk;

    // Main loop deals with bytes in chunks of 3
    for (let index = 0; index < mainLength; index = index + 3) {
        // Combine the three bytes into a single integer
        // eslint-disable-next-line no-bitwise
        chunk = (bytes[index] << 16) | (bytes[index + 1] << 8) | bytes[index + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        // eslint-disable-next-line no-bitwise
        a = (chunk & 16_515_072) >> 18; // 16515072 = (2^6 - 1) << 18
        // eslint-disable-next-line no-bitwise
        b = (chunk & 258_048) >> 12; // 258048   = (2^6 - 1) << 12
        // eslint-disable-next-line no-bitwise
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        // eslint-disable-next-line no-bitwise
        d = chunk & 63; // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
        chunk = bytes[mainLength];

        // eslint-disable-next-line no-bitwise
        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        // eslint-disable-next-line no-bitwise
        b = (chunk & 3) << 4; // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==';
    } else if (byteRemainder === 2) {
        // eslint-disable-next-line no-bitwise
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        // eslint-disable-next-line no-bitwise
        a = (chunk & 64_512) >> 10; // 64512 = (2^6 - 1) << 10
        // eslint-disable-next-line no-bitwise
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        // eslint-disable-next-line no-bitwise
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
};

interface IBase64 {
    encode: (input: string) => string;
    _utf8_encode: (input: string) => string;
    decode: (input: string) => string;
    _utf8_decode: (utfText: string) => string;
    _keyStr: string;
}

/**
 * Pseudo class implementing base64 encoding and decoding -- avoiding atob() and btoa() and their problems
 * @link https://stackoverflow.com/a/6740027/4323201
 * @type {IBase64}
 */
export const Base64 = {
    // private property
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    // public method for encoding
    encode: (input: string) => {
        let output = '';
        let chr1;
        let chr2;
        let chr3;
        let enc1;
        let enc2;
        let enc3;
        let enc4;
        let index = 0;

        input = Base64._utf8_encode(input);

        while (index < input.length) {
            chr1 = input.codePointAt(index++) as number;
            chr2 = input.codePointAt(index++) as number;
            chr3 = input.codePointAt(index++) as number;

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (Number.isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (Number.isNaN(chr3)) {
                enc4 = 64;
            }

            output =
                output +
                Base64._keyStr.charAt(enc1) +
                Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) +
                Base64._keyStr.charAt(enc4);
        }

        return output;
    },

    // public method for decoding
    decode: (input: string) => {
        let output = '';
        let chr1;
        let chr2;
        let chr3;
        let enc1;
        let enc2;
        let enc3;
        let enc4;
        let index = 0;

        input = input.replace(/[^A-Za-z\d+/=]/g, '');

        while (index < input.length) {
            enc1 = Base64._keyStr.indexOf(input.charAt(index++));
            enc2 = Base64._keyStr.indexOf(input.charAt(index++));
            enc3 = Base64._keyStr.indexOf(input.charAt(index++));
            enc4 = Base64._keyStr.indexOf(input.charAt(index++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCodePoint(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCodePoint(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCodePoint(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: (input: string) => {
        input = input.replace(/\r\n/g, '\n');
        let utftext = '';

        for (let n = 0; n < input.length; n++) {
            const c = input.codePointAt(n) as number;

            if (c < 128) {
                utftext += String.fromCodePoint(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCodePoint((c >> 6) | 192);
                utftext += String.fromCodePoint((c & 63) | 128);
            } else {
                utftext += String.fromCodePoint((c >> 12) | 224);
                utftext += String.fromCodePoint(((c >> 6) & 63) | 128);
                utftext += String.fromCodePoint((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: (utfText: string) => {
        let output = '';
        let index = 0;
        let c;
        let c2;
        let c3;

        while (index < utfText.length) {
            c = utfText.codePointAt(index) as number;

            if (c < 128) {
                output += String.fromCodePoint(c);
                index++;
            } else if (c > 191 && c < 224) {
                c2 = utfText.codePointAt(index + 1) as number;
                output += String.fromCodePoint(((c & 31) << 6) | (c2 & 63));
                index += 2;
            } else {
                c2 = utfText.codePointAt(index + 1) as number;
                c3 = utfText.codePointAt(index + 2) as number;
                output += String.fromCodePoint(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                index += 3;
            }
        }
        return output;
    }
};
