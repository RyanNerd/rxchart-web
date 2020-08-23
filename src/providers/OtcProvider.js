export const OtcProvider = {
    rxFrak: {frak: null, baseUrl: null, apiKey: null},

    /**
     * OtcProvider constructor
     *
     * @param {object} rxFrak
     * @constructor
     */
    Init: (rxFrak) => {
        this.rxFrak = rxFrak;
    },

    /**
     * Search Interface
     *
     * @param {object} options
     * @returns {Promise<Response>}
     */
    Search: ( options) => {
        let uri = this.rxFrak.baseUrl + 'medicine/search?api_key=' + this.rxFrak.apiKey;
        return this.rxFrak.frak.post(uri, options)
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
}

