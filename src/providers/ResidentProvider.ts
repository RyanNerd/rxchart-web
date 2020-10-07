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
    search: (options: object): Promise<ResidentRecord[]> => {
        const uri = ResidentProvider._baseUrl + 'resident/search?api_key=' + ResidentProvider._apiKey;
        return ResidentProvider._frak.post<RecordResponse>(uri, options)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [];
                }
                throw response;
            }
        })
        .catch((err) => {
            return err;
        });
    },

    /**
     * Restore Interface
     *
     * @param {restore_id: number} residentId
     * @returns {Promise<ResidentRecord>}
     */
    restore: (residentId: number): Promise<ResidentRecord> => {
        const uri = ResidentProvider._baseUrl + 'resident/restore?api_key=' + ResidentProvider._apiKey;
        const body = {restore_id: residentId};
        return ResidentProvider._frak.post<RecordResponse>(uri, body)
        .then((response) => {
            if (response.success) {
                return response.data;
            }
            throw response;
        })
        .catch((err) => {
            return err;
        });
    },

    /**
     * Read Interface
     *
     * @param {number} id
     * @returns {Promise<Response>}
     */
    read: (id: number): Promise<ResidentRecord> => {
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident/'+ id + '?api_key=' + apiKey;
        return ResidentProvider._frak.get<RecordResponse>(uri)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            return err;
        });
    },

    /**
     * Post interface
     *
     * @param {ResidentRecord} residentInfo
     * @returns {Promise<ResidentRecord>}
     */
    post: (residentInfo: ResidentRecord): Promise<ResidentRecord> => {
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident?api_key=' + apiKey;
        return ResidentProvider._frak.post<RecordResponse>(uri, residentInfo)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            return err;
        })
    },

    /**
     * Delete interface
     *
     * @param {number} residentId
     * @returns {Promise<DeleteResponse>}
     */
    delete: (residentId: number): Promise<DeleteResponse> => {
        const apiKey = ResidentProvider._apiKey;
        const uri = ResidentProvider._baseUrl + 'resident/' + residentId + '?api_key=' + apiKey;
        return ResidentProvider._frak.delete<DeleteResponse>(uri)
        .then((response) => {
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            return err;
        });
    }
}

export default ResidentProvider;
