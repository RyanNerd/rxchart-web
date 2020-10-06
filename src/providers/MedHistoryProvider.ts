import {DrugLogRecord} from "../types/RecordTypes";
import Frak from "./Frak";
import {ProviderTypes} from "../types/ProviderTypes";

type DeleteResponse = ProviderTypes.MedHistory.DeleteResponse;
type RecordResponse = ProviderTypes.MedHistory.RecordResponse;

/**
 * MedHistoryProvider API Connector
 */
const MedHistoryProvider = {
    _frak: Frak,
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * @constructor
     * @param {frak: Frak, baseUrl: string, apiKey: string} rxFrak
     * @return {MedHistoryProvider}
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
     * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
     * @param {object} options
     * @returns {Promise<DrugLogRecord[]>}
     */
    search: (options: object): Promise<DrugLogRecord[]> => {
        const apiKey = MedHistoryProvider._apiKey;
        const uri = MedHistoryProvider._baseUrl + 'medhistory/search?api_key=' + apiKey;
        return MedHistoryProvider._frak.post<RecordResponse>(uri, options)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [] as DrugLogRecord[];
                }
                throw new Error(response.toString());
            }
        })
        .catch((err) => {
            return err;
        });
    },

    /**
     * Read interface
     *
     * @param {string | number} id
     * @returns {Promise<DrugLogRecord[]>}
     */
    read: (id: string | number): Promise<DrugLogRecord[]> => {
        const apiKey = MedHistoryProvider._apiKey;
        const uri = MedHistoryProvider._baseUrl + 'medhistory/' + id + '?api_key=' + apiKey;
        return MedHistoryProvider._frak.get<RecordResponse>(uri)
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
     * @param {DrugLogRecord} drugInfo
     * @returns {Promise<DrugLogRecord>}
     */
    post: (drugInfo: DrugLogRecord): Promise<DrugLogRecord> => {
        const apiKey = MedHistoryProvider._apiKey;
        const uri = MedHistoryProvider._baseUrl + 'medhistory?api_key=' + apiKey;
        return MedHistoryProvider._frak.post<RecordResponse>(uri, drugInfo)
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
     * Delete interface
     *
     * @param {string | number} drugId
     * @return {Promise<DeleteResponse>}
     */
    delete: (drugId: string | number): Promise<DeleteResponse> => {
        const apiKey = MedHistoryProvider._apiKey;
        const uri = MedHistoryProvider._baseUrl + 'medhistory/' + drugId + '?api_key=' + apiKey;
        return MedHistoryProvider._frak.delete<RecordResponse>(uri)
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

export default MedHistoryProvider;
