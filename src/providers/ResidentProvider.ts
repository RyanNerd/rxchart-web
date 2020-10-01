import {ResidentRecord} from "../types/RecordTypes";
import Frak from "./Frak";

/**
 * ResidentProvider API service connector
 */
const ResidentProvider = {
    _frak: Frak,
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * ResidentProvider Constructor
     *
     * @param {object} rxFrak
     */
    init: (
        rxFrak: {
            frak: typeof Frak,
            baseUrl: string,
            apiKey: string
        }
    ) => {
        ResidentProvider._frak = rxFrak.frak;
        ResidentProvider._baseUrl = rxFrak.baseUrl;
        ResidentProvider._apiKey = rxFrak.apiKey;
        return ResidentProvider;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<Response>}
     */
    search: (options: object) => {
        let uri = ResidentProvider._baseUrl + 'resident/search?api_key=' + ResidentProvider._apiKey;
        return ResidentProvider._frak.post(uri, options)
        .then((response: any) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [];
                }
                throw new Error(response.toString());
            }
        })
        .catch((err: ErrorEvent) => {
            console.log('ResidentProvider.search()', err);
            alert('ResidentProvider.search() error -- see console log');
            return err;
        });
    },

    /**
     * Restore Interface
     *
     * @param {object} record
     * @returns {Promise<Response>}
     */
    restore: (record: {restore_id: number }) => {
        let uri = ResidentProvider._baseUrl + 'resident/restore?api_key=' + ResidentProvider._apiKey;
        return ResidentProvider._frak.post(uri, record)
        .then((response: {success: boolean, data: ResidentRecord | ResidentRecord[], status: number}) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    throw new Error('Record not found to restore.');
                }
                throw new Error(response.toString());
            }
        })
        .catch((err: ErrorEvent) => {
            console.log('ResidentProvider.restore()', err);
            alert('ResidentProvider.restore() error -- see console log');
        });
    },

    /**
     * Read Interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read: (id: string | number) => {
        return ResidentProvider._frak.get(ResidentProvider._baseUrl + 'resident/'+ id + '?api_key=' + ResidentProvider._apiKey)
        .then((response: {success: boolean, data: object| object[]}) => {
            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.toString());
            }
        })
        .catch((err: ErrorEvent) => {
            console.log('ResidentProvider.read()', err);
            alert('ResidentProvider.read() error -- see console log');
        });
    },

    /**
     * Post interface
     *
     * @param {object} residentInfo
     * @returns {Promise<Response>}
     */
    post: (residentInfo: ResidentRecord) => {
        return ResidentProvider._frak.post(ResidentProvider._baseUrl + 'resident?api_key=' + ResidentProvider._apiKey, residentInfo)
        .then((response: {success: boolean, data: object | object[]}) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err: ErrorEvent) => {
            return err;
        })
    },

    /**
     * Delete interface
     *
     * @param {string | number} residentId
     * @returns {Promise<Response>}
     */
    delete: (residentId: string | number) => {
        return ResidentProvider._frak.delete(ResidentProvider._baseUrl + 'resident/' + residentId + '?api_key=' + ResidentProvider._apiKey)
        .then((response: {success: boolean}) => {
            if (response.success) {
                return response;
            } else {
                throw response;
            }
        })
        .catch((err: ErrorEvent) => {
            console.log('ResidentProvider.delete()', err);
        });
    }
}

export default ResidentProvider;
