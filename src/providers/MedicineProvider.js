import Frak from './Frak';

export default class MedicineProvider
{

    constructor(baseUrl, apiKey)
    {
        this._frak = new Frak();
        this._baseURL = baseUrl;
        this._apiKey = apiKey;
    }

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
}