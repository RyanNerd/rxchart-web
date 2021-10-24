import Frak from 'frak/lib/components/Frak';
import {DrugLogRecord} from 'types/RecordTypes';

type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: DrugLogRecord[] | DrugLogRecord;
    status: number;
    success: boolean;
};

export interface IMedHistoryProvider {
    delete: (drugId: string | number) => Promise<DeleteResponse>;
    post: (drugInfo: DrugLogRecord) => Promise<DrugLogRecord>;
    read: (id: string | number) => Promise<DrugLogRecord>;
    search: (options: Record<string, unknown>) => Promise<DrugLogRecord[]>;
    setApiKey: (apiKey: string) => void;
}

/**
 * MedHistoryProvider API Connector
 * @param baseurl The base URL to use (derived from the .env file)
 */
const MedHistoryProvider = (baseurl: string): IMedHistoryProvider => {
    const _baseUrl = baseurl;
    const _frak = Frak();
    let _apiKey = null as string | null;
    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Search Interface
         * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
         * @param {object} options A multi-shaped object used when the fetch is performed
         * @returns {Promise<DrugLogRecord[]>}
         */
        search: async (options: Record<string, unknown>): Promise<DrugLogRecord[]> => {
            const uri = _baseUrl + 'medhistory/search?api_key=' + _apiKey;
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
        },

        /**
         * Read interface
         * @param {string | number} id The PK of the MedHistory table
         * @returns {Promise<DrugLogRecord[]>}
         */
        read: async (id: string | number): Promise<DrugLogRecord> => {
            const uri = _baseUrl + 'medhistory/' + id + '?api_key=' + _apiKey;
            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as DrugLogRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @param {DrugLogRecord} drugInfo The MedHistory (drugLog) record
         * @returns {Promise<DrugLogRecord>}
         */
        post: async (drugInfo: DrugLogRecord): Promise<DrugLogRecord> => {
            const uri = _baseUrl + 'medhistory?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, drugInfo);
            if (response.success) {
                return response.data as DrugLogRecord;
            } else {
                throw response;
            }
        },

        /**
         * Delete interface
         * @param {string | number} drugId The PK for the MedHistory table
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (drugId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'medhistory/' + drugId + '?api_key=' + _apiKey;
            const response = await _frak.delete<RecordResponse>(uri);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default MedHistoryProvider;
