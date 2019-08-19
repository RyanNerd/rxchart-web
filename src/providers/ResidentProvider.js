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
     * Query Interface
     *
     * @param {string} value
     * @param {string} column
     * @returns {Promise<Response>}
     */
    query(value, column)
    {
        let uri = this._baseURL + 'resident/query/'+ value + '?';
        if (value !== '*') {
            uri += '?column=' + column;
        }
        uri += 'api_key=' + this._apiKey;

        return this._frak.get(uri)
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