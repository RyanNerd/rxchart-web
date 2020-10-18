import AuthenticationProvider from "../providers/AuthenticationProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import MedicineProvider from "../providers/MedicineProvider";
import ResidentManager from "./ResidentManager";
import ResidentProvider from "../providers/ResidentProvider";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "../types/RecordTypes";
import {State} from "reactn/default";

const getInitialState = () => {
    const baseUrl = process.env.REACT_APP_BASEURL || '';

    const providers = {
        authenticationProvider: AuthenticationProvider(baseUrl),
        medHistoryProvider: MedHistoryProvider(baseUrl),
        medicineProvider: MedicineProvider(baseUrl),
        residentProvider: ResidentProvider(baseUrl)
    };

    return {
        activeResident: null,
        apiKey: null,
        development: process.env.REACT_APP_DEVELOPMENT === 'true',
        drugLogList: [] as DrugLogRecord[],
        medicineList: [] as MedicineRecord[],
        otcList: [] as MedicineRecord[],
        providers,
        residentList: [] as ResidentRecord[],
        residentManager: ResidentManager(providers)
    } as State;
}

export default getInitialState;
