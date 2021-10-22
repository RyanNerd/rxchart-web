import Frak from 'frak/lib/components/Frak';
import {ResidentRecord} from 'types/RecordTypes';

export interface IResidentProvider {
    setApiKey: (apiKey: string) => void;
    search: (options: Record<string, unknown>) => Promise<ResidentRecord[]>;
    restore: (residentId: number) => Promise<ResidentRecord>;
    read: (id: number) => Promise<ResidentRecord>;
    post: (residentInfo: ResidentRecord) => Promise<ResidentRecord>;
    delete: (residentId: number) => Promise<DeleteResponse>;
}

type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: ResidentRecord[] | ResidentRecord;
    status: number;
    success: boolean;
};

/**
 * ResidentProvider API service connector
 */
const ResidentProvider = (url: string): IResidentProvider => {
    const _baseUrl = url;
    const _frak = Frak();
    let _apiKey = null as string | null;
    return {
        /**
         * Set the apiKey
         * @param {string} apiKey
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Search Interface
         * @param {object} options
         * @returns {Promise<ResidentRecord[]>}
         */
        search: async (options: Record<string, unknown>): Promise<ResidentRecord[]> => {
            const uri = _baseUrl + 'resident/search?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, options);
            if (response.success) {
                return response.data as ResidentRecord[];
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
         * @param {restore_id: number} residentId
         * @returns {Promise<ResidentRecord>}
         */
        restore: async (residentId: number): Promise<ResidentRecord> => {
            const uri = _baseUrl + 'resident/restore?api_key=' + _apiKey;
            const body = {restore_id: residentId};
            const response = await _frak.post<RecordResponse>(uri, body);
            if (response.success) {
                return response.data as ResidentRecord;
            } else {
                throw response;
            }
        },

        /**
         * Read Interface
         * @param {number} id
         * @returns {Promise<Response>}
         */
        read: async (id: number): Promise<ResidentRecord> => {
            const uri = _baseUrl + 'resident/' + id + '?api_key=' + _apiKey;
            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as ResidentRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @param {ResidentRecord} residentInfo
         * @returns {Promise<ResidentRecord>}
         */
        post: async (residentInfo: ResidentRecord): Promise<ResidentRecord> => {
            const uri = _baseUrl + 'resident?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, residentInfo);
            if (response.success) {
                return response.data as ResidentRecord;
            } else {
                throw response;
            }
        },

        /**
         * Delete interface
         * @param {number} residentId
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

export default ResidentProvider;
