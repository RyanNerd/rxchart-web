import {MedicineRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";

export interface IMedicineProvider {
    setApiKey: (apiKey: string) => void
    search: (options: object) => Promise<MedicineRecord[]>
    read: (id: number | string) => Promise<MedicineRecord>
    post: (drugInfo: MedicineRecord) => Promise<MedicineRecord>
    delete: (drugId: string | number) => Promise<DeleteResponse>
}

type DeleteResponse = { success: boolean };
type RecordResponse = {
    data: MedicineRecord[] | MedicineRecord;
    status: number;
    success: boolean;
};

/**
 * MedicineProvider API connector
 */
const MedicineProvider = (baseUrl: string) => {
    const _baseUrl = baseUrl;
    let _apiKey = null as string | null;

    return {

        setApiKey: (apiKey: string): void => {
            if (apiKey.length === 0) {
                throw new Error('apiKey cannot be empty');
            }
            _apiKey = apiKey;
        },

        /**
         * Search Interface
         *
         * @param {object} options
         * @returns {Promise<MedicineRecord[]>}
         */
        search: async (options: object): Promise<MedicineRecord[]> => {
            const uri =_baseUrl + 'medicine/search?api_key=' + _apiKey;
            try {
                const response = await Frak.post<RecordResponse>(uri, options);
                if (response.success) {
                    return response.data as MedicineRecord[];
                } else {
                    if (response.status === 404) {
                        return [] as MedicineRecord[];
                    }
                    throw new Error(response.toString());
                }
            } catch (err) {
                throw err;
            }
        },

        /**
         * Read interface
         *
         * @param {string | number} id
         * @returns {Promise<MedicineRecord>}
         */
        read: async (id: number | string): Promise<MedicineRecord> => {
            const uri = _baseUrl + 'medicine/' + id + '?api_key=' + _apiKey;
            try {
                const response = await Frak.get<RecordResponse>(uri);
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
         *
         * @param {MedicineRecord} drugInfo
         * @returns {Promise<MedicineRecord>}
         */
        post: async (drugInfo: MedicineRecord): Promise<MedicineRecord> => {
            const uri = _baseUrl + 'medicine?api_key=' + _apiKey;
            try {
                const response = await Frak.post<RecordResponse>(uri, drugInfo);
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
         *
         * @param {string | number} drugId
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (drugId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'medicine/' + drugId + '?api_key=' + _apiKey;
            try {
                const response = await Frak.delete<RecordResponse>(uri);
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
