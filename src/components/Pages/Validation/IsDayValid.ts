type ReturnValidation = '' | 'is-invalid' | string;

/**
 * Given the day and month returns 'is-invalid' if the month and day pair isn't a valid date, otherwise return ''.
 * @param {string} day
 * @param {string} month
 * @return {'' | 'is-invalid'}
 */
const isDayValid = (day: string, month: string): ReturnValidation => {
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
    return (nDay >= 1 && nDay <= maxDay) ? '' : 'is-invalid';
};

export default isDayValid;
