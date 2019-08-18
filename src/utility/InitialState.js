import Frak from "../providers/Frak";

const baseUrl = process.env.REACT_APP_BASEURL;
const development = process.env.REACT_APP_DEVELOPMENT === 'true';

export const initialState = {
    development: development,
    activeDrug: null,
    activeResident: null,
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