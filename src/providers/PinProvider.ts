import Frak from 'frak/lib/components/Frak';

export type GenerateResponseData = {
    pin_id: number;
    client_id: number;
    pin: number;
    pin_array: string[];
};

type GenerateResponse = {
    data: GenerateResponseData;
    status: number;
    success: boolean;
};

export interface IPinProvider {
    setApiKey: (apiKey: string) => void;
    generate: (clientId: number) => Promise<GenerateResponseData>;
}

/**
 * PinProvider API connector
 * @param {string} baseUrl The base URL to use (determined from the .env file)
 */
const PinProvider = (baseUrl: string): IPinProvider => {
    const _baseUrl = baseUrl;
    const _frak = Frak();
    let _apiKey = null as string | null;

    return {
        /**
         * Set the apiKey
         * @param {string} apiKey The API key to use
         */
        setApiKey: (apiKey: string) => {
            _apiKey = apiKey;
        },

        /**
         * Generate PIN
         * @param {number} clientId The clientId to generate the PIN for
         */
        generate: async (clientId: number): Promise<GenerateResponseData> => {
            const uri = _baseUrl + 'pin/generate?api_key=' + _apiKey;

            const response = await _frak.post<GenerateResponse>(uri, {client_id: clientId});
            if (response.success) {
                return response.data as GenerateResponseData;
            } else {
                throw response;
            }
        }
    };
};

export default PinProvider;
