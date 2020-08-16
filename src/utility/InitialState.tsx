import Frak from "../providers/Frak";

export type ResidentRecord = {
    Id : null | number,
    UserId: number,
    LastName: string,
    FirstName: string,
    DOB_YEAR: null | Date,
    DOB_MONTH: null | Date,
    DOB_DAY: null | Date,
    Created: null | Date,
    Updated: null | Date,
    deleted_at: null | Date,
}

const baseUrl = process.env.REACT_APP_BASEURL;
const development = process.env.REACT_APP_DEVELOPMENT === 'true';

let ResidentRecord;
export const initialState = {
    development: development,
    activeDrug: null,
    activeResident: ResidentRecord,
    residentList: null,
    medicineList: null,
    drugLogList: null,
    apiKey: null,
    baseUrl: baseUrl,
    providers: {
        residentProvider: null,
        medicineProvider: null,
        medHistoryProvider: null
    },
    frak: new Frak()
};