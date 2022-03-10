import Frak from 'frak/lib/components/Frak';
import {MedicineRecord} from 'types/RecordTypes';

export type DeleteResponse = {success: boolean};
type RecordResponse = {
    data: MedicineRecord[] | MedicineRecord;
    status: number;
    success: boolean;
};

export interface IMedicineProvider {
    setApiKey: (apiKey: string) => void;
    loadList: (clientId: number) => Promise<MedicineRecord[]>;
    search: (options: Record<string, unknown>) => Promise<MedicineRecord[]>;
    read: (id: number | string) => Promise<MedicineRecord>;
    update: (drugInfo: MedicineRecord) => Promise<MedicineRecord>;
    delete: (drugId: string | number) => Promise<DeleteResponse>;
}

/**
 * MedicineProvider API connector
 * @param {string} baseUrl The base URL to use (derived from the .env file)
 */
const MedicineProvider = (baseUrl: string): IMedicineProvider => {
    const _baseUrl = baseUrl;
    const _frak = Frak();
    let _apiKey = null as string | null;

    /**
     * Medicine Search
     * @param {object} options A multi-shaped options object when the fetch is performed
     * @returns {Promise<MedicineRecord[]>} An array of Medicine records
     */
    const _search = async (options: Record<string, unknown>): Promise<MedicineRecord[]> => {
        const response = await _frak.post<RecordResponse>(`${_baseUrl}medicine/search?api_key=${_apiKey}`, options);
        if (response.success) {
            return response.data as MedicineRecord[];
        } else {
            if (response.status === 404) {
                return [] as MedicineRecord[];
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
         * Returns all the Medicine records for the given clientId as a promise
         * @param {number} clientId The PK of the Resident table
         */
        loadList: async (clientId) => {
            const searchCriteria = {
                where: [['ResidentId', '=', clientId]],
                orderBy: [['Drug', 'asc']]
            };
            return await _search(searchCriteria);
        },

        /**
         * Medicine Search
         * @param {object} options A multi-shaped options object when the fetch is performed
         * @returns {Promise<MedicineRecord[]>} An array of Medicine records
         */
        search: async (options: Record<string, unknown>): Promise<MedicineRecord[]> => {
            return await _search(options);
        },

        /**
         * Medicine Read
         * @param {string | number} id The PK of the Medicine table
         * @returns {Promise<MedicineRecord>} Medicine record
         */
        read: async (id: number | string): Promise<MedicineRecord> => {
            const response = await _frak.get<RecordResponse>(`${_baseUrl}medicine/${id}?api_key=${_apiKey}`);
            if (response.success) {
                return response.data as MedicineRecord;
            } else {
                throw response;
            }
        },

        /**
         * Medicine Update - Insert or Update the Medicine table given a MedicineRecord object
         * @param {MedicineRecord} medInfo The Medicine record object
         * @returns {Promise<MedicineRecord>} Medicine record
         */
        update: async (medInfo: MedicineRecord): Promise<MedicineRecord> => {
            const response = await _frak.post<RecordResponse>(`${_baseUrl}medicine?api_key=${_apiKey}`, medInfo);
            if (response.success) {
                return response.data as MedicineRecord;
            } else {
                throw response;
            }
        },

        /**
         * Medicine Delete - Soft delete a Medicine record given the PK
         * @param {string | number} medId The PK of the Medicine table
         * @returns {Promise<DeleteResponse>} Success: true/false
         */
        delete: async (medId: string | number): Promise<DeleteResponse> => {
            const response = await _frak.delete<RecordResponse>(`${_baseUrl}medicine/${medId}?api_key=${_apiKey}`);
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        }
    };
};

export default MedicineProvider;
