import {PillboxRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";

export interface IPillboxProvider {
    setApiKey: (apiKey: string) => void
    search: (options: object) => Promise<PillboxRecord[]>
    read: (id: number | string) => Promise<PillboxRecord>
    post: (drugInfo: PillboxRecord) => Promise<PillboxRecord>
    delete: (drugId: string | number) => Promise<DeleteResponse>
}

type DeleteResponse = { success: boolean };
type RecordResponse = {
    data: PillboxRecord[] | PillboxRecord;
    status: number;
    success: boolean;
};

/**
 * PillboxProvider API connector
 */
const PillboxProvider = (baseUrl: string): IPillboxProvider => {
    const _baseUrl = baseUrl;
    const _frak = Frak();
    let _apiKey = null as string | null;
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
         * @param {object} options
         * @returns {Promise<PillboxRecord[]>}
         */
        search: async (options: object): Promise<PillboxRecord[]> => {
            const uri = _baseUrl + 'pillbox/search?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, options);
                if (response.success) {
                    return response.data as PillboxRecord[];
                } else {
                    if (response.status === 404) {
                        return [] as PillboxRecord[];
                    }
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Read interface
         * @param {string | number} id
         * @returns {Promise<PillboxRecord>}
         */
        read: async (id: number | string): Promise<PillboxRecord> => {
            const uri = _baseUrl + 'pillbox/' + id + '?api_key=' + _apiKey;
            try {
                const response = await _frak.get<RecordResponse>(uri);
                if (response.success) {
                    return response.data as PillboxRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Post interface
         * @param {PillboxRecord} drugInfo
         * @returns {Promise<PillboxRecord>}
         */
        post: async (drugInfo: PillboxRecord): Promise<PillboxRecord> => {
            const uri = _baseUrl + 'medicine?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, drugInfo);
                if (response.success) {
                    return response.data as PillboxRecord;
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
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (drugId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'pillbox/' + drugId + '?api_key=' + _apiKey;
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

export default PillboxProvider;
