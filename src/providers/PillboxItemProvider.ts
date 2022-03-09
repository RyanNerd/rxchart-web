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
    update: (pillboxItemInfo: PillboxItemRecord) => Promise<PillboxItemRecord>;
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
         * PillboxItem Search
         * @see https://www.notion.so/Willow-Framework-Users-Guide-bf56317580884ccd95ed8d3889f83c72
         * @param {object} options Multi-shaped object of options when the fetch is performed
         * @returns {Promise<PillboxItemRecord[]>} An array of pillbox items
         */
        search: async (options: Record<string, unknown>): Promise<PillboxItemRecord[]> => {
            const response = await _frak.post<RecordResponse>(
                `${_baseUrl}pillbox-item/search?api_key=${_apiKey}`,
                options
            );
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
         * PillboxItem Read
         * @param {string | number} id The PK of the PillboxItem table
         * @returns {Promise<PillboxItemRecord[]>} A pillbox item record
         */
        read: async (id: string | number): Promise<PillboxItemRecord> => {
            const response = await _frak.get<RecordResponse>(`${_baseUrl}pillbox-item/${id}?api_key=${_apiKey}`);
            if (response.success) {
                return response.data as PillboxItemRecord;
            } else {
                throw response;
            }
        },

        /**
         * PillboxItem Update - Insert or Update a PillboxItem record given a PillboxItemRecord object
         * @param {PillboxItemRecord} pillboxItemInfo The Pillbox record object
         * @returns {Promise<PillboxItemRecord>} A pillbox item record
         */
        update: async (pillboxItemInfo: PillboxItemRecord): Promise<PillboxItemRecord> => {
            const response = await _frak.post<RecordResponse>(
                `${_baseUrl}pillbox-item?api_key=${_apiKey}`,
                pillboxItemInfo
            );
            if (response.success) {
                return response.data as PillboxItemRecord;
            } else {
                throw response;
            }
        },

        /**
         * PillboxItem Delete - Soft delete a record in the PillboxItem table given the PK
         * @param {string | number} pillboxItemId The PK of the PillboxItem table
         * @returns {Promise<DeleteResponse>} success: true/false
         */
        delete: async (pillboxItemId: string | number): Promise<DeleteResponse> => {
            const response = await _frak.delete<RecordResponse>(
                `${_baseUrl}pillbox-item/${pillboxItemId}?api_key=${_apiKey}`
            );
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default PillboxItemProvider;
