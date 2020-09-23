export type ResidentRecord = {
    Id : null | number,
    UserId: number,
    LastName: string,
    FirstName: string,
    DOB_YEAR: number,
    DOB_MONTH: number,
    DOB_DAY: number,
    Created: null | Date,
    Updated: null | Date,
    deleted_at: null | Date,
}

export type DrugLogRecord = {
    Id: null | number,
    MedicineId: number,
    Updated: Date
}

export const initialState = {
    development: process.env.REACT_APP_DEVELOPMENT === 'true',
    activeResident: null,
    residentList: null,
    medicineList: null,
    otcList: null,
    drugLogList: null,
    apiKey: null,
    baseUrl: process.env.REACT_APP_BASEURL,
    providers: {
        residentProvider: null,
        medicineProvider: null,
        medHistoryProvider: null
    }
};

export const newDrugInfo = {
    Id: null,
    Barcode: "",
    ResidentId: null,
    Drug: "",
    Strength: "",
    Directions: "",
    Notes: ""
};
