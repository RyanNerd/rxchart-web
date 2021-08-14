import {PillboxItemRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";

type DeleteResponse = { success: boolean };
type RecordResponse = {
    data: PillboxItemRecord[] | PillboxItemRecord;
    status: number;
    success: boolean;
};

export interface IPillboxItemProvider {
    delete: (drugId: string | number) => Promise<DeleteResponse>
    post: (pillboxItemInfo: PillboxItemRecord) => Promise<PillboxItemRecord>
    read: (id: string | number) => Promise<PillboxItemRecord>
    search: (options: object) => Promise<PillboxItemRecord[]>
    setApiKey: (apiKey: string) => void
}

/**
 * PillboxItemProvider API Connector
 */
const PillboxItemProvider = (baseurl: string): IPillboxItemProvider => {
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
         * @returns {Promise<PillboxItemRecord[]>}
         */
        search: async (options: object): Promise<PillboxItemRecord[]> => {
            const uri = _baseUrl + 'pillbox-item/search?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, options);
                if (response.success) {
                    return response.data as PillboxItemRecord[];
                } else {
                    if (response.status === 404) {
                        return [] as PillboxItemRecord[];
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
         * @returns {Promise<PillboxItemRecord[]>}
         */
        read: async (id: string | number): Promise<PillboxItemRecord> => {
            const uri = _baseUrl + 'pillbox-item/' + id + '?api_key=' + _apiKey;
            try {
                const response = await _frak.get<RecordResponse>(uri);
                if (response.success) {
                    return response.data as PillboxItemRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Post interface
         * @param {PillboxItemRecord} pillboxItemInfo
         * @returns {Promise<PillboxItemRecord>}
         */
        post: async (pillboxItemInfo: PillboxItemRecord): Promise<PillboxItemRecord> => {
            const uri = _baseUrl + 'pillbox-item?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, pillboxItemInfo);
                if (response.success) {
                    return response.data as PillboxItemRecord;
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
            const uri = _baseUrl + 'pillbox-item/' + drugId + '?api_key=' + _apiKey;
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

export default PillboxItemProvider;
