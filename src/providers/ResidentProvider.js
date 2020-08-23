/**
 * ResidentProvider API service connector
 */
const ResidentProvider = {
    /** @property {Frak | null} */
    _frak: null,
    _baseUrl: null,
    _apiKey: null,

    /**
     * ResidentProvider Constructor
     *
     * @param {object} rxFrak
     */
    init: (rxFrak) => {
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
    search: ( options) => {
        let uri = ResidentProvider._baseUrl + 'resident/search?api_key=' + ResidentProvider._apiKey;
        return ResidentProvider._frak.post(uri, options)
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
     * Restore Interface
     *
     * @param {object} record
     * @returns {Promise<Response>}
     */
    restore: ( record) => {
        let uri = ResidentProvider._baseUrl + 'resident/restore?api_key=' + ResidentProvider._apiKey;
        return ResidentProvider._frak.post(uri, record)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    throw new Error('Record not found to restore.');
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
     * Query Interface
     *
     * @param {string} value
     * @param {array<string>} columns
     * @returns {Promise<Response>}
     */
    query: (value, ...columns) => {
        let uri = ResidentProvider._baseUrl + 'resident/query/'+ value + '?';

        switch (value) {
            case '*':
            {
                break;
            }

            case '-':
            {
                break;
            }

            default:
            {
                uri += 'column_name=' + columns[0] + '&';
                break;
            }
        }

        if (value !== '*') {
            uri += '?column=' + columns;
        }
        uri += 'api_key=' + ResidentProvider._apiKey;

        return ResidentProvider._frak.get(uri)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                if (response.status === 404) {
                    return [];
                }

                throw new Error(response);
            }
        })
        .catch((err) => {
            console.error(err);
            alert('problem');
        });
    },

    /**
     * Read Interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read: (id) => {
        return ResidentProvider._frak.get(ResidentProvider._baseUrl + 'resident/'+ id + '?api_key=' + ResidentProvider._apiKey)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.toString());
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
     * @param {object} residentInfo
     * @returns {Promise<Response>}
     */
    post: (residentInfo) => {
        return ResidentProvider._rxFrak.post(ResidentProvider._baseUrl + 'resident?api_key=' + ResidentProvider._apiKey, residentInfo)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            return err;
        })
    },

    /**
     * Delete interface
     *
     * @param {string | number} residentId
     * @returns {Promise<Response>}
     */
    delete: (residentId) => {
        return ResidentProvider._rxFrak.delete_(ResidentProvider._baseUrl + 'resident/' + residentId + '?api_key=' + ResidentProvider._apiKey)
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

export default ResidentProvider;
