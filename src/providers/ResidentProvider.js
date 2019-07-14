import Frak from './Frak';

export default class ResidentProvider
{
    constructor(baseUrl, apiKey)
    {
        this._frak = new Frak();
        this._baseURL = baseUrl;
        this._apiKey = apiKey;
    }

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
            console.log(err);
            alert('Something went wrong')
        })
    }
}