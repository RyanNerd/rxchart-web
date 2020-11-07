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
    setApi: (apiKey: string) => void
}

/**
 * Determines and returns the initial global state when the app starts or when a user logs out
 */
const getInitialState = () => {
    const baseUrl = process.env.REACT_APP_BASEURL || '';
    const providers = {
        authenticationProvider: AuthenticationProvider(baseUrl),
        medHistoryProvider: MedHistoryProvider(baseUrl),
        medicineProvider: MedicineProvider(baseUrl),
        residentProvider: ResidentProvider(baseUrl),
        /**
         * Helper function that sets the API key for ALL providers
         * @param {string} apiKey
         */
        setApi: (apiKey: string) => {
            providers.medHistoryProvider.setApiKey(apiKey);
            providers.medicineProvider.setApiKey(apiKey);
            providers.residentProvider.setApiKey(apiKey)
        }
    } as IProviders;

    return {
        activeResident: null,
        apiKey: null,
        authManager: AuthManager(providers.authenticationProvider),
        deleteClient: null,
        development: process.env.REACT_APP_DEVELOPMENT === 'true',
        drugLogList: [] as DrugLogRecord[],
        errorDetails: undefined,
        medicineList: [] as MedicineRecord[],
        medicineManager: MedicineMananger(providers.medicineProvider, providers.medHistoryProvider),
        otcList: [] as MedicineRecord[],
        providers,
        refreshClients: false,
        refreshMedicine: null,
        residentList: [] as ResidentRecord[],
        residentManager: ResidentManager(providers.residentProvider),
        updateClient: null
    } as State;
}

export default getInitialState;
