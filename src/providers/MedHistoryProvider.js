import Frak from './Frak';

/**
 * MedHistoryProvider API Connector
 */
export default class MedHistoryProvider
{
    /**
     * @constructor
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
     * Query interface
     *
     * @param {string} value
     * @param {array<string>} columns
     * @returns {Promise<Response>}
     */
    query(value, ...columns)
    {
        let uri = this._baseURL + 'medhistory/query/'+ value + '?';

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
        return this._frak.get(this._baseURL + 'medhistory/'+ id + '?api_key=' + this._apiKey)
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
        return this._frak.post(this._baseURL + 'medhistory?api_key=' + this._apiKey, drugInfo)
        .then((response) => {
            if (response.success) {
                return response.data;
            } else {
                throw response;
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong')
        });
    }

    delete(drugId)
    {
        return this._frak.delete_(this._baseURL + 'medhistory/' + drugId + '?api_key=' + this._apiKey)
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