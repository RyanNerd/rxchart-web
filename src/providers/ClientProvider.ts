import Frak from 'frak/lib/components/Frak';
import {TClient} from 'reactn/default';
import {ClientRecord} from 'types/RecordTypes';

type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: ClientRecord[] | ClientRecord;
    status: number;
    success: boolean;
};

type LoadResponse = {
    data: TClient;
    success: boolean;
};

export interface IClientProvider {
    delete: (residentId: number) => Promise<DeleteResponse>;
    load: (clientId: number) => Promise<TClient>;
    update: (residentInfo: ClientRecord) => Promise<ClientRecord>;
    read: (id: number) => Promise<ClientRecord>;
    restore: (residentId: number) => Promise<ClientRecord>;
    search: (options: Record<string, unknown>) => Promise<ClientRecord[]>;
    loadList: () => Promise<ClientRecord[]>;
    setApiKey: (apiKey: string) => void;
}

/**
 * ResidentProvider API service connector
 * @param {string} url The url to use
 */
const ClientProvider = (url: string): IClientProvider => {
    const _baseUrl = url;
    const _frak = Frak();
    let _apiKey = null as string | null;

    /**
     * Client Search
     * @param {object} options Multi shaped object for the fetch request
     * @returns {Promise<ClientRecord[]>} An array of client records
     */
    const _search = async (options: Record<string, unknown>): Promise<ClientRecord[]> => {
        const response = await _frak.post<RecordResponse>(`${_baseUrl}resident/search?api_key=${_apiKey}`, options);
        if (response.success) {
            return response.data as ClientRecord[];
        } else {
            if (response.status === 404) {
                return [];
            } else {
                throw response;
            }
        }
    };

    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key to use
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Client Search
         * @param {object} options Multi shaped object for the fetch request
         * @returns {Promise<ClientRecord[]>} An array of client records
         */
        search: async (options: Record<string, unknown>): Promise<ClientRecord[]> => {
            return await _search(options);
        },

        /**
         * Load all client records as a promise ordered by LastName, FirstName
         * @returns {Promise<ClientRecord[]>} An array of client records as a promise
         */
        loadList: async () => {
            const searchCriteria = {
                orderBy: [
                    ['LastName', 'asc'],
                    ['FirstName', 'asc']
                ]
            };
            return await _search(searchCriteria);
        },

        /**
         * Client Restore
         * @param {number} clientId PK of the Resident table
         * @returns {Promise<ClientRecord>} A client record
         */
        restore: async (clientId: number): Promise<ClientRecord> => {
            const uri = _baseUrl + 'client/restore?api_key=' + _apiKey;
            const body = {id: clientId};
            const response = await _frak.post<RecordResponse>(uri, body);
            if (response.success) {
                return response.data as ClientRecord;
            } else {
                throw response;
            }
        },

        /**
         * Client Read
         * @param {number} id PK of the Resident table
         * @returns {Promise<ClientRecord>} A client record
         */
        read: async (id: number): Promise<ClientRecord> => {
            const uri = _baseUrl + 'resident/' + id + '?api_key=' + _apiKey;
            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as ClientRecord;
            } else {
                if (response.status === 404) {
                    return {} as ClientRecord;
                }
                throw response;
            }
        },

        /**
         * Client Update
         * @param {ClientRecord} residentInfo The client object
         * @returns {Promise<ClientRecord>} A client record
         */
        update: async (residentInfo: ClientRecord): Promise<ClientRecord> => {
            const uri = _baseUrl + 'resident?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, residentInfo);
            if (response.success) {
                return response.data as ClientRecord;
            } else {
                throw response;
            }
        },

        /**
         * Client Delete
         * @param {number} residentId PK of the Resident table
         * @returns {Promise<DeleteResponse>} Success: true/false
         */
        delete: async (residentId: number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'resident/' + residentId + '?api_key=' + _apiKey;
            const response = await _frak.delete<DeleteResponse>(uri);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        },

        /**
         * Load all Client info as TClient type
         * @param {number} clientId PK of the Client
         * @returns {Promise<TClient>} A TClient object
         */
        load: async (clientId: number): Promise<TClient> => {
            const uri = _baseUrl + 'client-load/' + clientId + '?api_key=' + _apiKey;
            const response = await _frak.get<LoadResponse>(uri);
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        }
    };
};

export default ClientProvider;
