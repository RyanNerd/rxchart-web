import Frak from 'frak/lib/components/Frak';
import {DrugLogRecord, PillboxRecord} from 'types/RecordTypes';

type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: PillboxRecord[] | PillboxRecord;
    status: number;
    success: boolean;
};

type LogResponse = {
    success: boolean;
    status: number;
    data: DrugLogRecord[];
};

export interface IPillboxProvider {
    setApiKey: (apiKey: string) => void;
    search: (options: Record<string, unknown>) => Promise<PillboxRecord[]>;
    read: (id: number | string) => Promise<PillboxRecord>;
    update: (drugInfo: PillboxRecord) => Promise<PillboxRecord>;
    delete: (drugId: string | number) => Promise<DeleteResponse>;
    log: (pillboxId: number) => Promise<DrugLogRecord[]>;
    loadList: (clientId: number) => Promise<PillboxRecord[]>;
}

/**
 * PillboxProvider API connector
 * @param {string} baseUrl The base URL to use (determined from the .env file)
 */
const PillboxProvider = (baseUrl: string): IPillboxProvider => {
    const _baseUrl = baseUrl;
    const _frak = Frak();
    let _apiKey = null as string | null;

    /**
     * Pillbox Search
     * @param {object} options A multi-shaped object indicating the options to use to fetch
     * @returns {Promise<PillboxRecord[]>} Array of Pillbox records
     */
    const _search = async (options: Record<string, unknown>): Promise<PillboxRecord[]> => {
        const response = await _frak.post<RecordResponse>(`${_baseUrl}pillbox/search?api_key=${_apiKey}`, options);
        if (response.success) {
            return response.data as PillboxRecord[];
        } else {
            if (response.status === 404) {
                return [] as PillboxRecord[];
            }
            throw response;
        }
    };

    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key to use
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Pillbox Search
         * @param {object} options A multi-shaped object indicating the options to use to fetch
         * @returns {Promise<PillboxRecord[]>} Array of Pillbox records
         */
        search: async (options: Record<string, unknown>): Promise<PillboxRecord[]> => {
            return await _search(options);
        },

        loadList: async (clientId: number) => {
            const searchCriteria = {
                where: [['ResidentId', '=', clientId]],
                orderBy: [['Name', 'asc']]
            };
            return await _search(searchCriteria);
        },

        /**
         * Pillbox Read
         * @param {string | number} id The PK of the Pillbox table
         * @returns {Promise<PillboxRecord>} a pillbox record
         */
        read: async (id: number | string): Promise<PillboxRecord> => {
            const response = await _frak.get<RecordResponse>(`${_baseUrl}pillbox/${id}?api_key=${_apiKey}`);
            if (response.success) {
                return response.data as PillboxRecord;
            } else {
                throw response;
            }
        },

        /**
         * Pillbox Update - Insert or Update the Pilbox table given a PillboxRecord object
         * @param {PillboxRecord} pillboxInfo The Pillbox record
         * @returns {Promise<PillboxRecord>} A pillbox record
         */
        update: async (pillboxInfo: PillboxRecord): Promise<PillboxRecord> => {
            const response = await _frak.post<RecordResponse>(`${_baseUrl}pillbox?api_key=${_apiKey}`, pillboxInfo);
            if (response.success) {
                return response.data as PillboxRecord;
            } else {
                throw response;
            }
        },

        /**
         * Log all the drugs for the given Pillbox id
         * @param {number} pillboxId The PK of the Pillbox table
         * @returns {Promise<PillboxRecord>} A pillbox record
         */
        log: async (pillboxId: number): Promise<DrugLogRecord[]> => {
            const response = await _frak.post<LogResponse>(`${_baseUrl}pillbox/log?api_key=${_apiKey}`, {
                pillbox_id: pillboxId
            });
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        },

        /**
         * Pillbox Delete - Delete a record in the Pillbox table given the PK
         * @param {string | number} pillboxId The PK for the Pillbox table
         * @returns {Promise<DeleteResponse>} Delete response {success: true/false}
         */
        delete: async (pillboxId: string | number): Promise<DeleteResponse> => {
            const response = await _frak.delete<RecordResponse>(`${_baseUrl}pillbox/${pillboxId}?api_key=${_apiKey}`);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default PillboxProvider;
