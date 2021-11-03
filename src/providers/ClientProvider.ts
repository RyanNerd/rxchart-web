import Frak from 'frak/lib/components/Frak';
import {ClientRecord} from 'types/RecordTypes';

export interface IClientProvider {
    setApiKey: (apiKey: string) => void;
    search: (options: Record<string, unknown>) => Promise<ClientRecord[]>;
    restore: (residentId: number) => Promise<ClientRecord>;
    read: (id: number) => Promise<ClientRecord>;
    post: (residentInfo: ClientRecord) => Promise<ClientRecord>;
    delete: (residentId: number) => Promise<DeleteResponse>;
}

type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: ClientRecord[] | ClientRecord;
    status: number;
    success: boolean;
};

/**
 * ResidentProvider API service connector
 * @param {string} url The url to use
 */
const ClientProvider = (url: string): IClientProvider => {
    const _baseUrl = url;
    const _frak = Frak();
    let _apiKey = null as string | null;
    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key to use
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Search Interface
         * @param {object} options Multi shaped object for the fetch request
         * @returns {Promise<ClientRecord[]>}
         */
        search: async (options: Record<string, unknown>): Promise<ClientRecord[]> => {
            const uri = _baseUrl + 'resident/search?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, options);
            if (response.success) {
                return response.data as ClientRecord[];
            } else {
                if (response.status === 404) {
                    return [];
                } else {
                    throw response;
                }
            }
        },

        /**
         * Restore Interface
         * @param {number} residentId PK of the Resident table
         * @returns {Promise<ClientRecord>}
         */
        restore: async (residentId: number): Promise<ClientRecord> => {
            const uri = _baseUrl + 'resident/restore?api_key=' + _apiKey;
            const body = {restore_id: residentId};
            const response = await _frak.post<RecordResponse>(uri, body);
            if (response.success) {
                return response.data as ClientRecord;
            } else {
                throw response;
            }
        },

        /**
         * Read Interface
         * @param {number} id PK of the Resident table
         * @returns {Promise<Response>}
         */
        read: async (id: number): Promise<ClientRecord> => {
            const uri = _baseUrl + 'resident/' + id + '?api_key=' + _apiKey;
            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as ClientRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @param {ClientRecord} residentInfo The client object
         * @returns {Promise<ClientRecord>}
         */
        post: async (residentInfo: ClientRecord): Promise<ClientRecord> => {
            const uri = _baseUrl + 'resident?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, residentInfo);
            if (response.success) {
                return response.data as ClientRecord;
            } else {
                throw response;
            }
        },

        /**
         * Delete interface
         * @param {number} residentId PK of the Resident table
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (residentId: number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'resident/' + residentId + '?api_key=' + _apiKey;
            const response = await _frak.delete<DeleteResponse>(uri);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default ClientProvider;
