import {ProvidersType} from "../types/FrakTypes";

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
    } as ProvidersType
};
