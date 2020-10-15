import {ProviderTypes} from '../types/ProviderTypes';
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "../types/RecordTypes";
import ResidentProvider from "../providers/ResidentProvider";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";

export const initialState = {
    development: process.env.REACT_APP_DEVELOPMENT === 'true',
    activeResident: null as ResidentRecord | null,
    residentList: [] as ResidentRecord[],
    medicineList: [] as MedicineRecord[],
    otcList: [] as MedicineRecord[],
    drugLogList: [] as DrugLogRecord[],
    apiKey: null as string | null,
    baseUrl: process.env.REACT_APP_BASEURL,
    providers: {
        residentProvider: null as typeof ResidentProvider | null,
        medicineProvider: null as typeof MedicineProvider | null,
        medHistoryProvider: null as typeof MedHistoryProvider | null,
    } as ProviderTypes.Providers,
};
