export interface IDocumentProvider {
    setApiKey: (apiKey: string) => void;
    uploadFile: (formData: FormData, clientId: number) => Promise<DocumentRecord>;
}
type DocumentRecord = {
    Id: number | null;
    Size: number;
    FileName: string;
    Type: string | null;
};

type UploadResponse = {
    status: number;
    success: boolean;
    data: null | DocumentRecord;
};

const DocumentProvider = (baseUrl: string): IDocumentProvider => {
    const _baseUrl = baseUrl;
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
         * Upload a file as a FormData object. Note that Frak isn't used because the data is not JSON
         * @param {FormData} formData The FormData object containing the name and file
         * @param {number} clientId The Client PK
         * @returns {Promise<DocumentRecord>} A Document record as a promise
         */
        uploadFile: async (formData: FormData, clientId): Promise<DocumentRecord> => {
            const uri = _baseUrl + 'document/upload/' + clientId + '?api_key=' + _apiKey;
            const response = await fetch(uri, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            const responseJSON = (await response.json()) as UploadResponse;
            if (responseJSON.success) {
                return responseJSON.data as DocumentRecord;
            } else {
                throw response;
            }
        }
    };
};

export default DocumentProvider;
