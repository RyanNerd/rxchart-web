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
            const response = await _frak.post<GenerateResponse>(`${_baseUrl}pin/generate?api_key=${_apiKey}`, {
                client_id: clientId
            });
            if (response.success) {
                return response.data as GenerateResponseData;
            } else {
                throw response;
            }
        },

        /**
         * Pin Read
         * @param {number} pinId - The Pin table PK
         * @returns {Promise<ReadResponseData>} The pseudo Pin table object as a promise
         */
        read: async (pinId: number): Promise<ReadResponseData> => {
            const response = await _frak.get<ReadResponse>(`${_baseUrl}pin/${pinId.toString()}?api_key=${_apiKey}`);
            if (response.success) {
                return response.data as ReadResponseData;
            } else {
                throw response;
            }
        },

        /**
         * Pin Delete - Delete a record in the Pin table given the PK
         * @param {number} pinId The PK to delete in the Pin table
         * @returns {Promise<boolean>} True if successful, false otherwise as a promise
         */
        delete: async (pinId): Promise<boolean> => {
            const response = await _frak.delete<DeleteResponse>(
                `${_baseUrl}pin/${pinId.toString()}?api_key=${_apiKey}`
            );
            return response.success;
        }
    };
};

export default PinProvider;
