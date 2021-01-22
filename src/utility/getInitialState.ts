import AuthenticationProvider, {IAuthenticationProvider} from "../providers/AuthenticationProvider";
import MedHistoryProvider, {IMedHistoryProvider} from "../providers/MedHistoryProvider";
import MedicineMananger from "../managers/MedicineManager";
import MedicineProvider, {IMedicineProvider} from "../providers/MedicineProvider";
import ResidentManager from "../managers/ResidentManager";
import ResidentProvider, {IResidentProvider} from "../providers/ResidentProvider";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "../types/RecordTypes";
import {State} from "reactn/default";
import AuthManager from "../managers/AuthManager";

export interface IProviders {
    authenticationProvider: IAuthenticationProvider
    residentProvider: IResidentProvider
    medicineProvider: IMedicineProvider
    medHistoryProvider: IMedHistoryProvider
    setApi: (apiKey: string) => Promise<void>
}

/**
 * Determines and returns the initial global state when the app starts or when a user logs out
 */
const getInitialState = () => {
    const baseUrl = process.env.REACT_APP_BASEURL || '';
    const errorDetail = (baseUrl.length === 0) ?
        'The BASEURL environment variable is not set in the .env file or the .env file is missing' : undefined;
    const providers = {
        authenticationProvider: AuthenticationProvider(baseUrl),
        medHistoryProvider: MedHistoryProvider(baseUrl),
        medicineProvider: MedicineProvider(baseUrl),
        residentProvider: ResidentProvider(baseUrl),
        /**
         * Helper function that sets the API key for ALL providers
         * @param {string} apiKey
         */
        setApi: async (apiKey: string): Promise<void>  => {
            providers.medHistoryProvider.setApiKey(apiKey);
            providers.medicineProvider.setApiKey(apiKey);
            providers.residentProvider.setApiKey(apiKey);
        }
    } as IProviders;

    return {
        activeResident: null,
        activeTabKey: 'login',
        apiKey: null,
        auth: null,
        authManager: AuthManager(providers.authenticationProvider),
        client: null,
        development: process.env.REACT_APP_DEVELOPMENT === 'true',
        drugLog: null,
        drugLogList: [] as DrugLogRecord[],
        errorDetails: errorDetail,
        login: null,
        loginFailed: false,
        logout: false,
        medicine: null,
        medicineList: [] as MedicineRecord[],
        medicineManager: MedicineMananger(providers.medicineProvider, providers.medHistoryProvider),
        otcList: [] as MedicineRecord[],
        otcMedicine: null,
        providers,
        residentList: [] as ResidentRecord[],
        residentManager: ResidentManager(providers.residentProvider)
    } as State;
}

export default getInitialState;
