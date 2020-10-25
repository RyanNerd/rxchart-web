import {DrugLogRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";

type DeleteResponse = { success: boolean };
type RecordResponse = {
    data: DrugLogRecord[] | DrugLogRecord;
    status: number;
    success: boolean;
};

export interface IMedHistoryProvider {
    delete: (drugId: string | number) => Promise<DeleteResponse>
    post: (drugInfo: DrugLogRecord) => Promise<DrugLogRecord>
    read: (id: string | number) => Promise<DrugLogRecord>
    search: (options: object) => Promise<DrugLogRecord[]>
    setApiKey: (apiKey: string) => void
}

/**
 * MedHistoryProvider API Connector
 */
const MedHistoryProvider = (baseurl: string): IMedHistoryProvider => {
    const _baseUrl = baseurl;
    const _frak = Frak();
    let _apiKey = null as string | null
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
         * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
         * @param {object} options
         * @returns {Promise<DrugLogRecord[]>}
         */
        search: async (options: object): Promise<DrugLogRecord[]> => {
            const uri = _baseUrl + 'medhistory/search?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, options);
                if (response.success) {
                    return response.data as DrugLogRecord[];
                } else {
                    if (response.status === 404) {
                        return [] as DrugLogRecord[];
                    } else {
                        throw response;
                    }
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Read interface
         * @param {string | number} id
         * @returns {Promise<DrugLogRecord[]>}
         */
        read: async (id: string | number): Promise<DrugLogRecord> => {
            const uri = _baseUrl + 'medhistory/' + id + '?api_key=' + _apiKey;
            try {
                const response = await _frak.get<RecordResponse>(uri);
                if (response.success) {
                    return response.data as DrugLogRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Post interface
         * @param {DrugLogRecord} drugInfo
         * @returns {Promise<DrugLogRecord>}
         */
        post: async (drugInfo: DrugLogRecord): Promise<DrugLogRecord> => {
            const uri =_baseUrl + 'medhistory?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, drugInfo);
                if (response.success) {
                    return response.data as DrugLogRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Delete interface
         * @param {string | number} drugId
         * @return {Promise<DeleteResponse>}
         */
        delete: async (drugId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'medhistory/' + drugId + '?api_key=' + _apiKey;
            try {
                const response = await _frak.delete<RecordResponse>(uri);
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
}

export default MedHistoryProvider;
