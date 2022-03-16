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
    update: (drugInfo: DrugLogRecord) => Promise<DrugLogRecord>;
    read: (id: string | number) => Promise<DrugLogRecord>;
    search: (options: Record<string, unknown>) => Promise<DrugLogRecord[]>;
    loadDrugLogForMedicine: (medicineId: number) => Promise<DrugLogRecord[]>;
    setApiKey: (apiKey: string) => void;
}

/**
 * MedHistoryProvider API Connector
 * @param {string} baseurl The base URL to use (derived from the .env file)
 */
const MedHistoryProvider = (baseurl: string): IMedHistoryProvider => {
    const _baseUrl = baseurl;
    const _frak = Frak();
    let _apiKey = null as string | null;

    /**
     * Drug Log Search
     * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
     * @param {object} options A multi-shaped object used when the fetch is performed
     * @returns {Promise<DrugLogRecord[]>} Array of drug log records
     */
    const _search = async (options: Record<string, unknown>): Promise<DrugLogRecord[]> => {
        const response = await _frak.post<RecordResponse>(`${_baseUrl}medhistory/search?api_key=${_apiKey}`, options);
        if (response.success) {
            return response.data as DrugLogRecord[];
        } else {
            if (response.status === 404) {
                return [] as DrugLogRecord[];
            } else {
                throw response;
            }
        }
    };

    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Drug Log Search
         * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
         * @param {object} options A multi-shaped object used when the fetch is performed
         * @returns {Promise<DrugLogRecord[]>} Array of drug log records
         */
        search: async (options: Record<string, unknown>): Promise<DrugLogRecord[]> => {
            return await _search(options);
        },

        /**
         * For a given medicine PK return all MedHistory DrugLogRecords[]
         * @param {number} medicineId The PK of the Medicine table
         */
        loadDrugLogForMedicine: async (medicineId: number): Promise<DrugLogRecord[]> => {
            const searchCriteria = {where: [['MedicineId', '=', medicineId]]};
            return await _search(searchCriteria);
        },

        /**
         * Drug Log Read
         * @param {string | number} id The PK of the MedHistory table
         * @returns {Promise<DrugLogRecord[]>} Array of drug log records
         */
        read: async (id: string | number): Promise<DrugLogRecord> => {
            const response = await _frak.get<RecordResponse>(`${_baseUrl}medhistory/${id}?api_key=${_apiKey}`);
            if (response.success) {
                return response.data as DrugLogRecord;
            } else {
                throw response;
            }
        },

        /**
         * Drug Log Update - Insert or update the MedHistory table given a DrugLogRecord object
         * @param {DrugLogRecord} drugInfo The MedHistory (drugLog) record
         * @returns {Promise<DrugLogRecord>} Drug log record
         */
        update: async (drugInfo: DrugLogRecord): Promise<DrugLogRecord> => {
            const response = await _frak.post<RecordResponse>(`${_baseUrl}medhistory?api_key=${_apiKey}`, drugInfo);
            if (response.success) {
                return response.data as DrugLogRecord;
            } else {
                throw response;
            }
        },

        /**
         * Drug log Delete - Soft delete a MedHistory record given the PK
         * @param {string | number} drugId The PK for the MedHistory table
         * @returns {Promise<DeleteResponse>} Success: true/false
         */
        delete: async (drugId: string | number): Promise<DeleteResponse> => {
            const response = await _frak.delete<RecordResponse>(`${_baseUrl}medhistory/${drugId}?api_key=${_apiKey}`);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default MedHistoryProvider;
