import {MedicineRecord} from '../types/RecordTypes';
import Frak from "frak/lib/components/Frak";
import {ProviderTypes} from '../types/ProviderTypes';

type DeleteResponse = ProviderTypes.Medicine.DeleteResponse;
type RecordResponse = ProviderTypes.Medicine.RecordResponse;

/**
 * MedicineProvider API connector
 */
const MedicineProvider = {
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    setBaseUrl: (url: string): void => {
        if (url.length === 0) {
            throw new Error('baseUrl cannot be empty');
        }
        MedicineProvider._baseUrl = url;
    },

    setApiKey: (apiKey: string): void => {
        if (apiKey.length === 0) {
            throw new Error('apiKey cannot be empty');
        }
        MedicineProvider._apiKey = apiKey;
    },

    /**
     * Set the apiKey to null
     */
    reset: (): void => {
        MedicineProvider._apiKey = null;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<MedicineRecord[]>}
     */
    search: async (options: object): Promise<MedicineRecord[]> => {
        const uri = MedicineProvider._baseUrl + 'medicine/search?api_key=' + MedicineProvider._apiKey;
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
        const apiKey = MedicineProvider._apiKey;
        const uri = MedicineProvider._baseUrl + 'medicine/' + id + '?api_key=' + apiKey;
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
        const apiKey = MedicineProvider._apiKey;
        const uri = MedicineProvider._baseUrl + 'medicine?api_key=' + apiKey;
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
        const apiKey = MedicineProvider._apiKey;
        const uri = MedicineProvider._baseUrl + 'medicine/' + drugId + '?api_key=' + apiKey;
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
    },
};

export default MedicineProvider;
