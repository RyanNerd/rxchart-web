type ReturnValidation = '' | 'is-invalid' | string;

/**
 * Returns 'is-invalid' if the year is not valid using the isDOB flag to determine the valid range.
 * @param {string} year
 * @param {boolean} isDOB
 * @return {'' | 'is-invalid'}
 */
const isYearValid = (year: string, isDOB: boolean): ReturnValidation => {
    const nYear = parseInt(year);
    if (isDOB) {
        const today = new Date();
        const todayYear = today.getFullYear();
        return (nYear <= todayYear && nYear >= todayYear - 125) ? '' : 'is-invalid';
    }
    return (nYear >= 1900 && nYear <= 9999) ? '' : 'is-invalid';
};

export default isYearValid;

