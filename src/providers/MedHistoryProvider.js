/**
 * MedHistoryProvider API Connector
 */
const MedHistoryProvider = {
    /** @property {Frak} */
    _frak: null,
    _baseUrl: null,
    _apiKey: null,

    /**
     * @constructor
     * @param {object} rxFrak
     */
    init: (rxFrak) =>
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
    search: ( options) => {
        let uri = MedHistoryProvider._baseUrl + 'medhistory/search?api_key=' + MedHistoryProvider._apiKey;
        return MedHistoryProvider._frak.post(uri, options)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [];
                }
                throw new Error(response.toString());
            }
        })
        .catch((err) => {
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
    read: (id) => {
        return MedHistoryProvider._frak.get(MedHistoryProvider._baseUrl + 'medhistory/'+ id + '?api_key=' + MedHistoryProvider._apiKey)
            .then((response) => {
                if (response.success) {
                    return response.data;
                } else {
                    throw response;
                }
            })
            .catch((err) => {
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
    post: (drugInfo) => {
        return MedHistoryProvider._frak.post(MedHistoryProvider._baseUrl + 'medhistory?api_key=' + MedHistoryProvider._apiKey, drugInfo)
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

    delete: (drugId) => {
        return MedHistoryProvider._frak.delete_(MedHistoryProvider._baseUrl + 'medhistory/' + drugId + '?api_key=' + MedHistoryProvider._apiKey)
            .then((response) => {
                if (response.success) {
                    return response;
                } else {
                    throw response;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default MedHistoryProvider;