import ClientManager from 'managers/ClientManager';
import ClientProvider, {IClientProvider} from 'providers/ClientProvider';
import DocumentProvider, {IDocumentProvider} from 'providers/DocumentProvider';
import {State} from 'reactn/default';
import {ClientRecord, MedicineRecord} from 'types/RecordTypes';
import AuthManager from '../managers/AuthManager';
import MedicineManager from '../managers/MedicineManager';
import AuthenticationProvider, {IAuthenticationProvider} from '../providers/AuthenticationProvider';
import MedHistoryProvider, {IMedHistoryProvider} from '../providers/MedHistoryProvider';
import MedicineProvider, {IMedicineProvider} from '../providers/MedicineProvider';
import PillboxItemProvider, {IPillboxItemProvider} from '../providers/PillboxItemProvider';
import PillboxProvider, {IPillboxProvider} from '../providers/PillboxProvider';
import PinProvider, {IPinProvider} from 'providers/PinProvider';

export interface IProviders {
    authenticationProvider: IAuthenticationProvider;
    clientProvider: IClientProvider;
    documentProvider: IDocumentProvider;
    medicineProvider: IMedicineProvider;
    medHistoryProvider: IMedHistoryProvider;
    pillboxProvider: IPillboxProvider;
    pillboxItemProvider: IPillboxItemProvider;
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
        documentProvider: DocumentProvider(baseUrl),
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
            await providers.documentProvider.setApiKey(apiKey);
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
        authManager: AuthManager(providers.authenticationProvider),
        clientList: [] as ClientRecord[],
        clientManager: ClientManager(providers.clientProvider),
        medicineManager: MedicineManager(
            providers.medicineProvider,
            providers.medHistoryProvider,
            providers.pillboxProvider,
            providers.pillboxItemProvider
        ),
        otcList: [] as MedicineRecord[],
        preferences: null,
        providers,
        signIn: {apiKey: null, organization: null, success: null}
    } as State;
};

export default getInitialState;
