/**
 * MedicineProvider API connector
 */
const MedicineProvider = {
    /** @property {Frak} */
    _frak: null,
    _baseUrl: null,
    _apiKey: null,

    /**
     * MedicineProvider constructor
     * 
     * @constructor
     * @param rxFrak
     */
    init: (rxFrak) => {
        MedicineProvider._frak = rxFrak.frak;
        MedicineProvider._apiKey = rxFrak.apiKey;
        MedicineProvider._baseUrl = rxFrak.baseUrl;
        return MedicineProvider;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<Response>}
     */
    search: ( options) => {
        let uri = MedicineProvider._baseUrl + 'medicine/search?api_key=' + MedicineProvider._apiKey;
        return MedicineProvider._frak.post(uri, options)
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
        return MedicineProvider._frak.get(MedicineProvider._baseUrl + 'medicine/'+ id + '?api_key=' + MedicineProvider._apiKey)
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
        return MedicineProvider._frak.post(MedicineProvider._baseUrl + 'medicine?api_key=' + MedicineProvider._apiKey, drugInfo)
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

    /**
     * Delete interface
     *
     * @param {string | number} drugId
     * @returns {Promise<Response>}
     */
    delete: (drugId) => {
        return MedicineProvider._frak.delete_(MedicineProvider._baseUrl + 'medicine/' + drugId + '?api_key=' + MedicineProvider._apiKey)
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

export default MedicineProvider;
