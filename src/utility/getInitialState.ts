import AuthenticationProvider, {IAuthenticationProvider} from "../providers/AuthenticationProvider";
import MedHistoryProvider, {IMedHistoryProvider} from "../providers/MedHistoryProvider";
import MedicineManager from "../managers/MedicineManager";
import MedicineProvider, {IMedicineProvider} from "../providers/MedicineProvider";
import ResidentManager from "../managers/ResidentManager";
import ResidentProvider, {IResidentProvider} from "../providers/ResidentProvider";
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, ResidentRecord} from "../types/RecordTypes";
import {State} from "reactn/default";
import AuthManager from "../managers/AuthManager";
import PillboxProvider, {IPillboxProvider} from "../providers/PillboxProvider";
import PillboxItemProvider, {IPillboxItemProvider} from "../providers/PillboxItemProvider";

export interface IProviders {
    authenticationProvider: IAuthenticationProvider
    residentProvider: IResidentProvider
    medicineProvider: IMedicineProvider
    medHistoryProvider: IMedHistoryProvider
    pillboxProvider: IPillboxProvider
    pillboxItemProvider: IPillboxItemProvider
    setApi: (apiKey: string) => Promise<void>
}

/**
 * Determines and returns the initial global state when the app starts or when a user logs out.
 * @throws {Error}
 */
const getInitialState = () => {
    const baseUrl = process.env.REACT_APP_BASEURL;

    if (!baseUrl || baseUrl.length === 0) {
        throw new Error('The BASEURL environment variable is not set in the .env file or the .env file is missing');
    }

    const errorDetail = undefined;
    const providers = {
        authenticationProvider: AuthenticationProvider(baseUrl),
        medHistoryProvider: MedHistoryProvider(baseUrl),
        medicineProvider: MedicineProvider(baseUrl),
        residentProvider: ResidentProvider(baseUrl),
        pillboxProvider: PillboxProvider(baseUrl),
        pillboxItemProvider: PillboxItemProvider(baseUrl),

        /**
         * Helper function that sets the API key for ALL providers
         * @param {string} apiKey
         */
        setApi: async (apiKey: string): Promise<void>  => {
            providers.medHistoryProvider.setApiKey(apiKey);
            providers.medicineProvider.setApiKey(apiKey);
            providers.residentProvider.setApiKey(apiKey);
            providers.pillboxProvider.setApiKey(apiKey);
            providers.pillboxItemProvider.setApiKey(apiKey);
        }
    } as IProviders;

    return {
        activeResident: null,
        activeTabKey: 'login',
        __auth: null,
        authManager: AuthManager(providers.authenticationProvider),
        __client: null,
        development: process.env.REACT_APP_DEVELOPMENT === 'true',
        __drugLog: null,
        drugLogList: [] as DrugLogRecord[],
        __errorDetails: errorDetail,
        signIn: {apiKey: null, organization: null, success: null},
        __medicine: null,
        __pillbox: null,
        __pillboxItem: null,
        pillboxItemList: [] as PillboxItemRecord[],
        medicineList: [] as MedicineRecord[],
        medicineManager: MedicineManager(
            providers.medicineProvider,
            providers.medHistoryProvider,
            providers.pillboxProvider,
            providers.pillboxItemProvider
        ),
        otcList: [] as MedicineRecord[],
        __otcMedicine: null,
        providers,
        residentList: [] as ResidentRecord[],
        residentManager: ResidentManager(providers.residentProvider)
    } as State;
}

export default getInitialState;
