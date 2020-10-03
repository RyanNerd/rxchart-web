/**
 * Given the last time a drug was taken in hours determine the button color for logging drugs
 * @param {number} lastTaken
 * @returns {string}
 */
const logButtonColor = (lastTaken: number | null | boolean) => {
    if (lastTaken === null || lastTaken === false) {
        return 'primary'
    }
    if (lastTaken <= 1) {
        return 'danger'
    }
    if (lastTaken <= 4) {
        return 'info'
    }
    return 'primary';
}

export default logButtonColor;
