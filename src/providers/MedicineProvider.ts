import {MedicineRecord} from "../types/RecordTypes";
import Frak from "./Frak";
import {ProviderTypes} from "../types/ProviderTypes";

type DeleteResponse = ProviderTypes.Medicine.DeleteResponse;
type RecordResponse = ProviderTypes.Medicine.RecordResponse;

/**
 * MedicineProvider API connector
 */
const MedicineProvider = {
    _frak: Frak,
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * MedicineProvider constructor
     * 
     * @constructor
     * @param {frak: Frak, baseUrl: string, apiKey: string} rxFrak
     * @return {MedicineProvider}
     */
    init: (
        rxFrak: {
        frak: typeof Frak,
        baseUrl: string,
        apiKey: string
    }) => {
        MedicineProvider._frak = rxFrak.frak;
        MedicineProvider._apiKey = rxFrak.apiKey;
        MedicineProvider._baseUrl = rxFrak.baseUrl;
        return MedicineProvider;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<MedicineRecord[]>}
     */
    search: (options: object): Promise<MedicineRecord[]> => {
        const uri = MedicineProvider._baseUrl + 'medicine/search?api_key=' + MedicineProvider._apiKey;
        return MedicineProvider._frak.post<RecordResponse>(uri, options)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [] as MedicineRecord[];
                }
                throw new Error(response.toString());
            }
        })
        .catch((err) => {
            return err;
        });
    },

    /**
     * Read interface
     *
     * @param {string | number} id
     * @returns {Promise<MedicineRecord>}
     */
    read: (id: number | string): Promise<MedicineRecord> => {
        const apiKey = MedicineProvider._apiKey;
        const uri =  MedicineProvider._baseUrl + 'medicine/' + id + '?api_key=' + apiKey;
        return MedicineProvider._frak.get<RecordResponse>(uri)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            return err;
        });
    },

    /**
     * Post interface
     *
     * @param {MedicineRecord} drugInfo
     * @returns {Promise<MedicineRecord>}
     */
    post: (drugInfo: MedicineRecord): Promise<MedicineRecord> => {
        const apiKey = MedicineProvider._apiKey;
        const uri = MedicineProvider._baseUrl + 'medicine?api_key=' + apiKey;
        return MedicineProvider._frak.post<RecordResponse>(uri, drugInfo)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
           return err;
        });
    },

    /**
     * Delete interface
     *
     * @param {string | number} drugId
     * @returns {Promise<DeleteResponse>}
     */
    delete: (drugId: string | number): Promise<DeleteResponse> => {
        const apiKey = MedicineProvider._apiKey;
        const uri = MedicineProvider._baseUrl + 'medicine/' + drugId + '?api_key=' + apiKey;
        return MedicineProvider._frak.delete<RecordResponse>(uri)
        .then((response) => {
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            return err;
        });
    }
}

export default MedicineProvider;
