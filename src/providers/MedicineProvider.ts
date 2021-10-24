import Frak from 'frak/lib/components/Frak';
import {MedicineRecord} from 'types/RecordTypes';

export interface IMedicineProvider {
    setApiKey: (apiKey: string) => void;
    search: (options: Record<string, unknown>) => Promise<MedicineRecord[]>;
    read: (id: number | string) => Promise<MedicineRecord>;
    post: (drugInfo: MedicineRecord) => Promise<MedicineRecord>;
    delete: (drugId: string | number) => Promise<DeleteResponse>;
}

export type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: MedicineRecord[] | MedicineRecord;
    status: number;
    success: boolean;
};

/**
 * MedicineProvider API connector
 * @param baseUrl The base URL to use (derived from the .env file)
 */
const MedicineProvider = (baseUrl: string): IMedicineProvider => {
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
         * @param {object} options A multi-shaped options object when the fetch is performed
         * @returns {Promise<MedicineRecord[]>}
         */
        search: async (options: Record<string, unknown>): Promise<MedicineRecord[]> => {
            const uri = _baseUrl + 'medicine/search?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, options);
            if (response.success) {
                return response.data as MedicineRecord[];
            } else {
                if (response.status === 404) {
                    return [] as MedicineRecord[];
                }
                throw response;
            }
        },

        /**
         * Read interface
         * @param {string | number} id The PK of the Medicine table
         * @returns {Promise<MedicineRecord>}
         */
        read: async (id: number | string): Promise<MedicineRecord> => {
            const uri = _baseUrl + 'medicine/' + id + '?api_key=' + _apiKey;
            const response = await _frak.get<RecordResponse>(uri);
            if (response.success) {
                return response.data as MedicineRecord;
            } else {
                throw response;
            }
        },

        /**
         * Post interface
         * @param {MedicineRecord} medInfo The Medicine record object
         * @returns {Promise<MedicineRecord>}
         */
        post: async (medInfo: MedicineRecord): Promise<MedicineRecord> => {
            const uri = _baseUrl + 'medicine?api_key=' + _apiKey;
            const response = await _frak.post<RecordResponse>(uri, medInfo);
            if (response.success) {
                return response.data as MedicineRecord;
            } else {
                throw response;
            }
        },

        /**
         * Delete interface
         * @param {string | number} medId The PK of the Medicine table
         * @returns {Promise<DeleteResponse>}
         */
        delete: async (medId: string | number): Promise<DeleteResponse> => {
            const uri = _baseUrl + 'medicine/' + medId + '?api_key=' + _apiKey;
            const response = await _frak.delete<RecordResponse>(uri);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default MedicineProvider;
