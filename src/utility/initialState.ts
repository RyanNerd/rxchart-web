import {DrugLogRecord, MedicineRecord, ResidentRecord} from "../types/RecordTypes";
import {State} from "reactn/default";

export const initialState = {
    activeResident: null,
    apiKey: null,
    baseUrl: process.env.REACT_APP_BASEURL,
    development: process.env.REACT_APP_DEVELOPMENT === 'true',
    drugLogList: [] as DrugLogRecord[],
    medicineList: [] as MedicineRecord[],
    otcList: [] as MedicineRecord[],
    providers: {
        residentProvider: null,
        medicineProvider: null,
        medHistoryProvider: null
    },
    residentList: [] as ResidentRecord[]
} as State;
