import {ResidentRecord} from "../types/RecordTypes";
import Frak from "./Frak";
import {ProviderTypes} from "../types/ProviderTypes";

type RecordResponse = ProviderTypes.Resident.RecordResponse;
type DeleteResponse = ProviderTypes.Resident.DeleteResponse;

/**
 * ResidentProvider API service connector
 */
const ResidentProvider = {
    _frak: Frak,
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * ResidentProvider Constructor
     *
     * @param {frak: Frak, baseUrl: string, apiKey: string} rxFrak
     */
    init: (
        rxFrak: {
            frak: typeof Frak,
            baseUrl: string,
            apiKey: string
        }
    ) => {
        ResidentProvider._frak = rxFrak.frak;
        ResidentProvider._baseUrl = rxFrak.baseUrl;
        ResidentProvider._apiKey = rxFrak.apiKey;
        return ResidentProvider;
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
            const response = await ResidentProvider._frak.post<RecordResponse>(uri, options);
            if (response.success) {
                return response.data;
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
    restore: async (residentId: number): Promise<ResidentRecord | any> => {
        const uri = ResidentProvider._baseUrl + 'resident/restore?api_key=' + ResidentProvider._apiKey;
        const body = {restore_id: residentId};
        try {
            const response = await ResidentProvider._frak.post<RecordResponse>(uri, body);
            if (response.success) {
                return response.data;
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
    read: async (id: number): Promise<ResidentRecord | any> => {
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident/' + id + '?api_key=' + apiKey;
        try {
            const response = await ResidentProvider._frak.get<RecordResponse>(uri);
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
     * Post interface
     *
     * @param {ResidentRecord} residentInfo
     * @returns {Promise<ResidentRecord>}
     */
    post: async (residentInfo: ResidentRecord): Promise<ResidentRecord | any> => {
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident?api_key=' + apiKey;
        try {
            const response = await ResidentProvider._frak.post<RecordResponse>(uri, residentInfo);
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
            const response = await ResidentProvider._frak.delete<DeleteResponse>(uri);
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

export default ResidentProvider;
