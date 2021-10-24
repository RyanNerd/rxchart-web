import Frak from 'frak/lib/components/Frak';
import {DrugLogRecord, PillboxRecord} from 'types/RecordTypes';

export interface IPillboxProvider {
    setApiKey: (apiKey: string) => void;
    search: (options: Record<string, unknown>) => Promise<PillboxRecord[]>;
    read: (id: number | string) => Promise<PillboxRecord>;
    post: (drugInfo: PillboxRecord) => Promise<PillboxRecord>;
    delete: (drugId: string | number) => Promise<DeleteResponse>;
    log: (pillboxId: number) => Promise<DrugLogRecord[]>;
}

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

/**
 * PillboxProvider API connector
 * @param {string} baseUrl The base URL to use (determined from the .env file)
 */
const PillboxProvider = (baseUrl: string): IPillboxProvider => {
    const _baseUrl = baseUrl;
    const _frak = Frak();
    let _apiKey = null as string | null;
    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key to use
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Search Interface
         * @param {object} options A multi-shaped object indicating the options to use to fetch
         * @returns {Promise<PillboxRecord[]>}
         */
        search: async (options: Record<string, unknown>): Promise<PillboxRecord[]> => {
            const uri = _baseUrl + 'pillbox/search?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, options);
            if (response.success) {
                return response.data as PillboxRecord[];
            } else {
                if (response.status === 404) {
                    return [] as PillboxRecord[];
                }
                throw response;
            }
        },

        /**
         * Read interface
         * @param {string | number} id The PK of the Pillbox table
         * @returns {Promise<PillboxRecord>}
         */
        read: async (id: number | string): Promise<PillboxRecord> => {
            const uri = _baseUrl + 'pillbox/' + id + '?api_key=' + _apiKey;

            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as PillboxRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @param {PillboxRecord} pillboxInfo The Pillbox record
         * @returns {Promise<PillboxRecord>}
         */
        post: async (pillboxInfo: PillboxRecord): Promise<PillboxRecord> => {
            const uri = _baseUrl + 'pillbox?api_key=' + _apiKey;

            const response = await _frak.post<RecordResponse>(uri, pillboxInfo);
            if (response.success) {
                return response.data as PillboxRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @returns {Promise<PillboxRecord>}
         * @param {number} pillboxId The PK of the Pillbox table
         */
        log: async (pillboxId: number): Promise<DrugLogRecord[]> => {
            const uri = _baseUrl + 'pillbox/log?api_key=' + _apiKey;

            const response = await _frak.post<LogResponse>(uri, {pillbox_id: pillboxId});
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        },

        /**
         * Delete interface
         * @param {string | number} pillboxId The PK for the Pillbox table
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (pillboxId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'pillbox/' + pillboxId + '?api_key=' + _apiKey;
            const response = await _frak.delete<RecordResponse>(uri);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default PillboxProvider;
