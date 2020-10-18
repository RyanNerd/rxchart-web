import {ResidentRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";
import {ProviderTypes} from '../types/ProviderTypes';

export interface IResidentProvider {
    setApiKey: (apiKey: string) => void
    search: (options: object) => Promise<ResidentRecord[]>
    restore: (residentId: number) => Promise<ResidentRecord>
    read: (id: number) => Promise<ResidentRecord>
    post: (residentInfo: ResidentRecord) => Promise<ResidentRecord>
    delete: (residentId: number) => Promise<DeleteResponse>
}

type RecordResponse = ProviderTypes.Resident.RecordResponse;
type DeleteResponse = ProviderTypes.Resident.DeleteResponse;

/**
 * ResidentProvider API service connector
 */
const ResidentProvider = (url: string): IResidentProvider => {
    const _baseUrl = url;
    let _apiKey = null as string | null;

    return {

        /**
         * Set the apiKey
         *
         * @param apiKey
         */
        setApiKey: (apiKey: string): void => {
            if (apiKey.length === 0) {
                throw new Error('apiKey cannot be empty');
            }
            _apiKey = apiKey;
        },

        /**
         * Search Interface
         *
         * @param {object} options
         * @returns {Promise<ResidentRecord[]>}
         */
        search: async (options: object): Promise<ResidentRecord[]> => {
            const uri = _baseUrl + 'resident/search?api_key=' + _apiKey;
            try {
                const response = await Frak.post<RecordResponse>(uri, options);
                if (response.success) {
                    return response.data as ResidentRecord[];
                } else {
                    if (response.status === 404) {
                        return [];
                    }
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Restore Interface
         *
         * @param {restore_id: number} residentId
         * @returns {Promise<ResidentRecord>}
         */
        restore: async (residentId: number): Promise<ResidentRecord> => {
            const uri = _baseUrl + 'resident/restore?api_key=' + _apiKey;
            const body = {restore_id: residentId};
            try {
                const response = await Frak.post<RecordResponse>(uri, body);
                if (response.success) {
                    return response.data as ResidentRecord;
                }
                throw response;
            } catch (err) {
                throw err;
            }
        },

        /**
         * Read Interface
         *
         * @param {number} id
         * @returns {Promise<Response>}
         */
        read: async (id: number): Promise<ResidentRecord> => {
            const uri = _baseUrl + 'resident/' + id + '?api_key=' + _apiKey;
            try {
                const response = await Frak.get<RecordResponse>(uri);
                if (response.success) {
                    return response.data as ResidentRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Post interface
         *
         * @param {ResidentRecord} residentInfo
         * @returns {Promise<ResidentRecord>}
         */
        post: async (residentInfo: ResidentRecord): Promise<ResidentRecord> => {
            const uri = _baseUrl + 'resident?api_key=' + _apiKey;
            try {
                const response = await Frak.post<RecordResponse>(uri, residentInfo);
                if (response.success) {
                    return response.data as ResidentRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Delete interface
         *
         * @param {number} residentId
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (residentId: number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'resident/' + residentId + '?api_key=' + _apiKey;
            try {
                const response = await Frak.delete<DeleteResponse>(uri);
                if (response.success) {
                    return response;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        }
    }
};

export default ResidentProvider;
