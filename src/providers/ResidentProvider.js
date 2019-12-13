import Frak from './Frak';

/**
 * ResidentProvider API service connector
 */
export default class ResidentProvider
{
    /**
     * ResidentProvider Constructor
     *
     * @param {string} baseUrl
     * @param {string} apiKey
     */
    constructor(baseUrl, apiKey)
    {
        this._frak = new Frak();
        this._baseURL = baseUrl;
        this._apiKey = apiKey;
    }

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<Response>}
     */
    search( options) {
        let uri = this._baseURL + 'resident/search?api_key=' + this._apiKey;
        return this._frak.post(uri, options)
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
    }

    /**
     * Restore Interface
     *
     * @param {object} record
     * @returns {Promise<Response>}
     */
    restore( record) {
        console.log('record', record);
        let uri = this._baseURL + 'resident/restore?api_key=' + this._apiKey;
        return this._frak.post(uri, record)
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
    }

     /**
     * Query Interface
     *
     * @param {string} value
     * @param {array<string>} columns
     * @returns {Promise<Response>}
     */
    query(value, ...columns)
    {
        let uri = this._baseURL + 'resident/query/'+ value + '?';

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
        uri += 'api_key=' + this._apiKey;

        return this._frak.get(uri)
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
            alert('problem');
        });
    }

    /**
     * Read Interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read(id)
    {
        return this._frak.get(this._baseURL + 'resident/'+ id + '?api_key=' + this._apiKey)
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
    }

    /**
     * Post interface
     *
     * @param {object} residentInfo
     * @returns {Promise<Response>}
     */
    post(residentInfo)
    {
        return this._frak.post(this._baseURL + 'resident?api_key=' + this._apiKey, residentInfo)
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
    }

    /**
     * Delete interface
     *
     * @param {string | number} residentId
     * @returns {Promise<Response>}
     */
    delete(residentId)
    {
        return this._frak.delete_(this._baseURL + 'resident/' + residentId + '?api_key=' + this._apiKey)
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