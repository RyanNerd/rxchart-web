import Frak from './Frak';

/**
 * MedicineProvider API connector
 */
export default class MedicineProvider
{
    /**
     * Constructor
     *
     * @param {string} baseUrl
     * @param {string} apiKey
     */
    constructor(baseUrl, apiKey)
    {
        this._frak = Frak();
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
        let uri = this._baseURL + 'medicine/search?api_key=' + this._apiKey;
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
     * Query interface
     *
     * @param {string} value
     * @param {array<string>}columns
     * @returns {Promise<Response>}
     */
    query(value, ...columns)
    {
        let uri = this._baseURL + 'medicine/query/'+ value + '?';

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

        uri += 'api_key=' + this._apiKey;

        return this._frak.get(uri)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.error(err);
                alert('problem');
            });
    }

    /**
     * Read interface
     *
     * @param {string | number} id
     * @returns {Promise<Response>}
     */
    read(id)
    {
        return this._frak.get(this._baseURL + 'medicine/'+ id + '?api_key=' + this._apiKey)
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
    }

    /**
     * Post interface
     *
     * @param {object} drugInfo
     * @returns {Promise<Response>}
     */
    post(drugInfo)
    {
        return this._frak.post(this._baseURL + 'medicine?api_key=' + this._apiKey, drugInfo)
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
    }

    /**
     * Delete interface
     *
     * @param {string | number} drugId
     * @returns {Promise<Response>}
     */
    delete(drugId)
    {
        return this._frak.delete(this._baseURL + 'medicine/' + drugId + '?api_key=' + this._apiKey)
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