import {ResidentRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";
import {ProviderTypes} from '../types/ProviderTypes';

type RecordResponse = ProviderTypes.Resident.RecordResponse;
type DeleteResponse = ProviderTypes.Resident.DeleteResponse;

/**
 * ResidentProvider API service connector
 */
const ResidentProvider = {
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * Set the baseUrl
     *
     * @param {string} url
     */
    setBaseUrl: (url: string): void => {
        if (url.length === 0) {
            throw new Error('baseUrl cannot be empty');
        }
        ResidentProvider._baseUrl = url;
    },

    /**
     * Set the apiKey
     *
     * @param apiKey
     */
    setApiKey: (apiKey: string): void => {
        if (apiKey.length === 0) {
            throw new Error('apiKey cannot be empty');
        }
        ResidentProvider._apiKey = apiKey;
    },

    /**
     * Set the apiKey to null
     */
    reset: (): void => {
        ResidentProvider._apiKey = null;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<ResidentRecord[]>}
     */
    search: async (options: object): Promise<ResidentRecord[]> => {
        const uri = ResidentProvider._baseUrl + 'resident/search?api_key=' + ResidentProvider._apiKey;
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
        const uri = ResidentProvider._baseUrl + 'resident/restore?api_key=' + ResidentProvider._apiKey;
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
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident/' + id + '?api_key=' + apiKey;
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
    post: async (residentInfo: ResidentRecord): Promise<ResidentRecord | any> => {
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident?api_key=' + apiKey;
        try {
            const response = await Frak.post<RecordResponse>(uri, residentInfo);
            if (response.success) {
                return response.data;
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
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident/' + residentId + '?api_key=' + apiKey;
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
    },
};

export default ResidentProvider;
