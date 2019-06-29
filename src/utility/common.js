export const DOB = (resident) => {
    return resident.DOB_MONTH + '/' + resident.DOB_DAY + '/' + resident.DOB_YEAR
};

export const FULLNAME = (resident) => {
    return resident.FirstName.trim() + ' ' + resident.LastName.trim();
};