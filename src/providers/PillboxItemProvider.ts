import Frak from 'frak/lib/components/Frak';
import {PillboxItemRecord} from 'types/RecordTypes';

type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: PillboxItemRecord[] | PillboxItemRecord;
    status: number;
    success: boolean;
};

export interface IPillboxItemProvider {
    delete: (drugId: string | number) => Promise<DeleteResponse>;
    post: (pillboxItemInfo: PillboxItemRecord) => Promise<PillboxItemRecord>;
    read: (id: string | number) => Promise<PillboxItemRecord>;
    search: (options: Record<string, unknown>) => Promise<PillboxItemRecord[]>;
    setApiKey: (apiKey: string) => void;
}

/**
 * PillboxItemProvider API Connector
 * @param {string} baseurl The base URL to use (derived from the .env file)
 */
const PillboxItemProvider = (baseurl: string): IPillboxItemProvider => {
    const _baseUrl = baseurl;
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
         * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
         * @param {object} options Multi-shaped object of options when the fetch is performed
         * @returns {Promise<PillboxItemRecord[]>}
         */
        search: async (options: Record<string, unknown>): Promise<PillboxItemRecord[]> => {
            const uri = _baseUrl + 'pillbox-item/search?api_key=' + _apiKey;
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
        },

        /**
         * Read interface
         * @param {string | number} id The PK of the PillboxItem table
         * @returns {Promise<PillboxItemRecord[]>}
         */
        read: async (id: string | number): Promise<PillboxItemRecord> => {
            const uri = _baseUrl + 'pillbox-item/' + id + '?api_key=' + _apiKey;
            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as PillboxItemRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @param {PillboxItemRecord} pillboxItemInfo The Pillbox record object
         * @returns {Promise<PillboxItemRecord>}
         */
        post: async (pillboxItemInfo: PillboxItemRecord): Promise<PillboxItemRecord> => {
            const uri = _baseUrl + 'pillbox-item?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, pillboxItemInfo);
            if (response.success) {
                return response.data as PillboxItemRecord;
            } else {
                throw response;
            }
        },

        /**
         * Delete interface
         * @param {string | number} pillboxItemId The PK of the PillboxItem table
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (pillboxItemId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'pillbox-item/' + pillboxItemId + '?api_key=' + _apiKey;
            const response = await _frak.delete<RecordResponse>(uri);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default PillboxItemProvider;
