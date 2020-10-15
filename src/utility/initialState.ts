import {ProviderTypes} from '../types/ProviderTypes';

export const initialState = {
    development: process.env.REACT_APP_DEVELOPMENT === 'true',
    activeResident: null,
    residentList: [],
    medicineList: [],
    otcList: [],
    drugLogList: [],
    apiKey: null,
    baseUrl: process.env.REACT_APP_BASEURL,
    providers: {
        residentProvider: null,
        medicineProvider: null,
        medHistoryProvider: null,
    } as ProviderTypes.Providers,
};
