import ClientProvider, {IClientProvider} from 'providers/ClientProvider';
import FileProvider, {IFileProvider} from 'providers/FileProvider';
import PinProvider, {IPinProvider} from 'providers/PinProvider';
import {State} from 'reactn/default';
import {ClientRecord, MedicineRecord} from 'types/RecordTypes';
import AuthenticationProvider, {IAuthenticationProvider} from '../providers/AuthenticationProvider';
import MedHistoryProvider, {IMedHistoryProvider} from '../providers/MedHistoryProvider';
import MedicineProvider, {IMedicineProvider} from '../providers/MedicineProvider';
import PillboxItemProvider, {IPillboxItemProvider} from '../providers/PillboxItemProvider';
import PillboxProvider, {IPillboxProvider} from '../providers/PillboxProvider';

export interface IProviders {
    authenticationProvider: IAuthenticationProvider;
    clientProvider: IClientProvider;
    fileProvider: IFileProvider;
    medHistoryProvider: IMedHistoryProvider;
    medicineProvider: IMedicineProvider;
    pillboxItemProvider: IPillboxItemProvider;
    pillboxProvider: IPillboxProvider;
    pinProvider: IPinProvider;
    setApi: (apiKey: string) => Promise<void>;
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

    const providers = {
        authenticationProvider: AuthenticationProvider(baseUrl),
        clientProvider: ClientProvider(baseUrl),
        fileProvider: FileProvider(baseUrl),
        medHistoryProvider: MedHistoryProvider(baseUrl),
        medicineProvider: MedicineProvider(baseUrl),
        pillboxItemProvider: PillboxItemProvider(baseUrl),
        pillboxProvider: PillboxProvider(baseUrl),
        pinProvider: PinProvider(baseUrl),

        /**
         * Helper function that sets the API key for ALL providers
         * @param {string} apiKey The API key as returned from the web service
         */
        setApi: async (apiKey: string): Promise<void> => {
            await providers.clientProvider.setApiKey(apiKey);
            await providers.fileProvider.setApiKey(apiKey);
            await providers.medHistoryProvider.setApiKey(apiKey);
            await providers.medicineProvider.setApiKey(apiKey);
            await providers.pillboxItemProvider.setApiKey(apiKey);
            await providers.pillboxProvider.setApiKey(apiKey);
            await providers.pinProvider.setApiKey(apiKey);
        }
    } as IProviders;

    return {
        __errorDetails: undefined,
        activeClient: null,
        activeTabKey: 'login',
        clientList: [] as ClientRecord[],
        otcList: [] as MedicineRecord[],
        preferences: null,
        providers,
        signIn: {apiKey: null, organization: null, success: null}
    } as State;
};

export default getInitialState;
