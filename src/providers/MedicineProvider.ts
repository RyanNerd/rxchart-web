import Frak from "frak/lib/components/Frak";
import {MedicineRecord} from 'types/RecordTypes';

export interface IMedicineProvider {
    setApiKey: (apiKey: string) => void
    search: (options: object) => Promise<MedicineRecord[]>
    read: (id: number | string) => Promise<MedicineRecord>
    post: (drugInfo: MedicineRecord) => Promise<MedicineRecord>
    delete: (drugId: string | number) => Promise<DeleteResponse>
}

export type DeleteResponse = { success: boolean };
type RecordResponse = {
    data: MedicineRecord[] | MedicineRecord;
    status: number;
    success: boolean;
};

/**
 * MedicineProvider API connector
 */
const MedicineProvider = (baseUrl: string): IMedicineProvider => {
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
         * @returns {Promise<MedicineRecord[]>}
         */
        search: async (options: object): Promise<MedicineRecord[]> => {
            const uri = _baseUrl + 'medicine/search?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, options);
                if (response.success) {
                    return response.data as MedicineRecord[];
                } else {
                    if (response.status === 404) {
                        return [] as MedicineRecord[];
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
         * @returns {Promise<MedicineRecord>}
         */
        read: async (id: number | string): Promise<MedicineRecord> => {
            const uri = _baseUrl + 'medicine/' + id + '?api_key=' + _apiKey;
            try {
                const response = await _frak.get<RecordResponse>(uri);
                if (response.success) {
                    return response.data as MedicineRecord;
                } else {
                    throw response;
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Post interface
         * @param {MedicineRecord} drugInfo
         * @returns {Promise<MedicineRecord>}
         */
        post: async (drugInfo: MedicineRecord): Promise<MedicineRecord> => {
            const uri = _baseUrl + 'medicine?api_key=' + _apiKey;
            try {
                const response = await _frak.post<RecordResponse>(uri, drugInfo);
                if (response.success) {
                    return response.data as MedicineRecord;
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
            const uri = _baseUrl + 'medicine/' + drugId + '?api_key=' + _apiKey;
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

export default MedicineProvider;
