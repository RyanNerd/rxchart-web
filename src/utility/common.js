export const DOB = (resident) => {
    return resident.DOB_MONTH + '/' + resident.DOB_DAY + '/' + resident.DOB_YEAR
};

export const FULLNAME = (resident) => {
    return resident.FirstName.trim() + ' ' + resident.LastName.trim();
};

// VALIDATION Functions START
/**
 *
 * @param month
 * @returns {string}
 */
export const isMonthValid = (month) => {
    return (month >= 1 && month <= 12) ? '' : 'is-invalid';
};

export const isDayValid = (day, month) => {
    let maxDay = 28;
    month = parseInt(month);
    day = parseInt(day);
    if (month ===1
        || month === 3
        || month === 5
        || month === 7
        || month === 8
        || month === 10
        || month === 11
        || month === 12) {
        maxDay = 31;
    }

    if (month === 4
        || month === 6
        || month === 9) {
        maxDay = 30;
    }

    return (day >=1 && day <= maxDay) ? '' : 'is-invalid';
};

export const isYearValid = (year, isDOB) => {
    year = parseInt(year);
    if (isDOB) {
        const today = new Date();
        const todayYear = today.getFullYear();
        return (year <= todayYear && year >= 1900) ? '' : 'is-invalid';
    }

    return (year >= 1900 && year <= 9999) ? '' : 'is-invalid';
};
// VALIDATION Functions END
