import {MedicineRecord} from "../types/RecordTypes";
import Frak from "./Frak";
import {ProviderTypes} from "../types/ProviderTypes";

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
     * @param rxFrak
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
     * @returns {Promise<Response>}
     */
    search: (options: object): Promise<MedicineRecord[]> => {
        let uri = MedicineProvider._baseUrl + 'medicine/search?api_key=' + MedicineProvider._apiKey;
        return MedicineProvider._frak.post<{success: boolean, data: any, status: number}>(uri, options)
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
            console.error(err);
            alert('MedicineProvider.search() error -- see console log');
        });
    },

    /**
     * Read interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read: (id: number | string): Promise<MedicineRecord> => {
        return MedicineProvider._frak.get<{success: boolean, data: any, status: number}>(MedicineProvider._baseUrl + 'medicine/'+ id + '?api_key=' + MedicineProvider._apiKey)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            console.error(err);
            alert('MedicineProvider.read() error -- see console log');
        });
    },

    /**
     * Post interface
     *
     * @param {object} drugInfo
     * @returns {Promise<Response>}
     */
    post: (drugInfo: MedicineRecord): Promise<MedicineRecord> => {
        return MedicineProvider._frak.post<ProviderTypes.Medicine.RecordResponse>(MedicineProvider._baseUrl + 'medicine?api_key=' + MedicineProvider._apiKey, drugInfo)
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
     * @returns {Promise<Response>}
     */
    delete: (drugId: string | number) => {
        return MedicineProvider._frak.delete<ProviderTypes.Medicine.DeleteResponse>(MedicineProvider._baseUrl + 'medicine/' + drugId + '?api_key=' + MedicineProvider._apiKey)
        .then((response) => {
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        })
        .catch((err: ErrorEvent) => {
            console.log('MedicineProvider.delete() error -- see console log', err);
            return err;
        });
    }
}

export default MedicineProvider;
