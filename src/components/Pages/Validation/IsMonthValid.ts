type ReturnValidation = '' | 'is-invalid' | string;

/**
 * Given a month numeric return 'is-invalid' if the number isn't between 1 and 12, otherwise return ''.
 * @param {string} month
 * @returns {'' | 'is-invalid'}
 */
const isMonthValid = (month: string): ReturnValidation => {
    // tslint:disable-next-line:radix
    return (parseInt(month) >= 1 && parseInt(month) <= 12) ? '' : 'is-invalid';
};

export default isMonthValid;
