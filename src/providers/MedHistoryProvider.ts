/**
 * MedHistoryProvider API Connector
 */

declare type FrakType = {
    post: Function
    get: Function
    delete_: Function
}

const MedHistoryProvider = {
    /** @property {Frak} */
    _frak: null as FrakType | null,
    _baseUrl: null as string | null,
    _apiKey: null as string | null,

    /**
     * @constructor
     * @param {object} rxFrak
     */
    init: (
        rxFrak: {
            frak: FrakType,
            baseUrl: string,
            apiKey: string
        }) =>
    {
        MedHistoryProvider._frak = rxFrak.frak;
        MedHistoryProvider._baseUrl = rxFrak.baseUrl;
        MedHistoryProvider._apiKey = rxFrak.apiKey;
        return MedHistoryProvider;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<Response>}
     */
    search: (options: object) => {
        const apiKey = MedHistoryProvider._apiKey;
        let uri = MedHistoryProvider._baseUrl + 'medhistory/search?api_key=' + apiKey;
        return MedHistoryProvider._frak?.post(uri, options)
        .then((response: {success: boolean, status: number, data: object | Array<object>}) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [];
                }
                throw new Error(response.toString());
            }
        })
        .catch((err: Error) => {
            console.error(err);
            alert('problem -- see console log');
        });
    },

    /**
     * Read interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read: (id: string | number) => {
        const apiKey = MedHistoryProvider._apiKey;
        return MedHistoryProvider._frak?.get(MedHistoryProvider._baseUrl + 'medhistory/'+ id + '?api_key=' + apiKey)
        .then((response: {success: boolean, data: Array<object> | object}) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err: Error) => {
            console.error(err);
            alert('problem');
        });
    },

    /**
     * Post interface
     *
     * @param {object} drugInfo
     * @returns {Promise<Response>}
     */
    post: (drugInfo: object) => {
        const apiKey = MedHistoryProvider._apiKey;
        return MedHistoryProvider._frak?.post(MedHistoryProvider._baseUrl + 'medhistory?api_key=' + apiKey, drugInfo)
            .then((response: {success: boolean, data: Array<object> | object}) => {
                if (response.success) {
                    return response.data;
                } else {
                    throw response;
                }
            })
            .catch((err: Error) => {
                return err;
        });
    },

    /**
     * Delete interface
     *
     * @param {string | number} drugId
     */
    delete: (drugId: string | number) => {
        const apiKey = MedHistoryProvider._apiKey;
        const baseUrl = MedHistoryProvider._baseUrl;
        return MedHistoryProvider._frak?.delete_(baseUrl + 'medhistory/' + drugId + '?api_key=' + apiKey)
            .then((response: {success: boolean}) => {
                if (response.success) {
                    return response;
                } else {
                    throw response;
                }
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }
}

export default MedHistoryProvider;