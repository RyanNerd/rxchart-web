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

export type ReadResponseData = {
    Id: number;
    ResidentId: number;
    UserId: number;
    PinValue: string;
    Image: string;
};

type ReadResponse = {
    data: ReadResponseData;
    status: number;
    success: boolean;
};

export type DeleteResponse = {
    data: null;
    status: number;
    success: boolean;
};

export interface IPinProvider {
    setApiKey: (apiKey: string) => void;
    delete: (pinId: number) => Promise<boolean>;
    generate: (clientId: number) => Promise<GenerateResponseData>;
    read: (pinId: number) => Promise<ReadResponseData>;
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
        },

        read: async (pinId: number): Promise<ReadResponseData> => {
            const uri = _baseUrl + 'pin/' + pinId.toString() + '?api_key=' + _apiKey;

            const response = await _frak.get<ReadResponse>(uri);
            if (response.success) {
                return response.data as ReadResponseData;
            } else {
                throw response;
            }
        },

        delete: async (pinId): Promise<boolean> => {
            const uri = _baseUrl + 'pin/' + pinId.toString() + '?api_key=' + _apiKey;

            const response = await _frak.delete<DeleteResponse>(uri);
            return response.success;
        }
    };
};

export default PinProvider;
