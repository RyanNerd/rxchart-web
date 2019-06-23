import Frak from './Frak';

export default class ResidentProvider
{

    constructor(baseUrl, apiKey)
    {
        this._frak = new Frak();
        this._baseURL = baseUrl;
        this._apiKey = apiKey;
    }

    read(id)
    {
        return this._frak.get(this._baseURL + 'resident/'+ id + '?api_key=' + this._apiKey)
        .then((response) => {
            console.log('response', response);
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
}