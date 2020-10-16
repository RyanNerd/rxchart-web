import {DrugLogRecord, MedicineRecord, ResidentRecord} from "../types/RecordTypes";
import {State} from "reactn/default";
import ResidentProvider from "../providers/ResidentProvider";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import AuthenticationProvider from "../providers/AuthenticationProvider";

const getInitialState = () => {
    const baseUrl = process.env.REACT_APP_BASEURL || '';
    const residentProvider = ResidentProvider;
    const medicineProvider = MedicineProvider;
    const medHistoryProvider = MedHistoryProvider;
    const authenticationProvider = AuthenticationProvider;
    authenticationProvider.setBaseUrl(baseUrl);
    residentProvider.reset();
    residentProvider.setBaseUrl(baseUrl);
    medicineProvider.reset();
    medicineProvider.setBaseUrl(baseUrl);
    medHistoryProvider.reset();
    medHistoryProvider.setBaseUrl(baseUrl);

    return {
        activeResident: null,
        apiKey: null,
        baseUrl,
        development: process.env.REACT_APP_DEVELOPMENT === 'true',
        drugLogList: [] as DrugLogRecord[],
        medicineList: [] as MedicineRecord[],
        otcList: [] as MedicineRecord[],
        providers: {
            authenticationProvider,
            medHistoryProvider,
            medicineProvider,
            residentProvider
        },
        residentList: [] as ResidentRecord[]
    } as State;
}

export default getInitialState;
