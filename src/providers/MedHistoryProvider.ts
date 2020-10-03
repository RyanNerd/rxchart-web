import {DrugLogRecord} from "../types/RecordTypes";
import Frak from "./Frak";
import {ProviderTypes} from "../types/ProviderTypes";

/**
 * MedHistoryProvider API Connector
 */
const MedHistoryProvider = {
    _frak: Frak,
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * @constructor
     * @param {object} rxFrak
     */
    init: (
        rxFrak: {
            frak: typeof Frak,
            baseUrl: string,
            apiKey: string
        }) =>
    {
        MedHistoryProvider._frak = rxFrak.frak;
        MedHistoryProvider._baseUrl = rxFrak.baseUrl;
        MedHistoryProvider._apiKey = rxFrak.apiKey;
        return MedHistoryProvider;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<Response>}
     */
    search: (options: object): Promise<DrugLogRecord[]> => {
        const apiKey = MedHistoryProvider._apiKey;
        let uri = MedHistoryProvider._baseUrl + 'medhistory/search?api_key=' + apiKey;
        return MedHistoryProvider._frak.post<ProviderTypes.MedHistory.RecordResponse>(uri, options)
        .then((response: any) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [] as DrugLogRecord[];
                }
                throw new Error(response.toString());
            }
        })
        .catch((err: any) => {
            console.error(err);
            alert('problem -- see console log');
        });
    },

    /**
     * Read interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read: (id: string | number): Promise<DrugLogRecord[]> => {
        const apiKey = MedHistoryProvider._apiKey;
        return MedHistoryProvider._frak.get<ProviderTypes.MedHistory.RecordResponse>(MedHistoryProvider._baseUrl + 'medhistory/'+ id + '?api_key=' + apiKey)
        .then((response: any) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err: Error) => {
            console.error(err);
            alert('problem');
        });
    },

    /**
     * Post interface
     *
     * @param {object} drugInfo
     * @returns {Promise<Response>}
     */
    post: (drugInfo: DrugLogRecord): Promise<DrugLogRecord> => {
        const apiKey = MedHistoryProvider._apiKey;
        return MedHistoryProvider._frak.post<ProviderTypes.MedHistory.RecordResponse>(MedHistoryProvider._baseUrl + 'medhistory?api_key=' + apiKey, drugInfo)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err: any) => {
            return err;
        });
    },

    /**
     * Delete interface
     *
     * @param {string | number} drugId
     */
    delete: (drugId: string | number): Promise<ProviderTypes.MedHistory.DeleteResponse> => {
        const apiKey = MedHistoryProvider._apiKey;
        const baseUrl = MedHistoryProvider._baseUrl;
        return MedHistoryProvider._frak.delete<ProviderTypes.MedHistory.RecordResponse>(baseUrl + 'medhistory/' + drugId + '?api_key=' + apiKey)
        .then((response) => {
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            console.log('MedHistoryProvider.delete() error -- see console log', err);
            return err;
        });
    }
}

export default MedHistoryProvider;