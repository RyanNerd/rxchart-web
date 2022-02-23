export interface IDocumentProvider {
    setApiKey: (apiKey: string) => void;
    uploadFile: (formData: FormData) => Promise<boolean>; // todo: Promise<DocumentRecord>
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

        uploadFile: async (formData: FormData): Promise<boolean> => {
            const uri = _baseUrl + 'document/upload?api_key=' + _apiKey;
            const response = await fetch(uri, {
                method: 'POST',
                body: formData
            });

            const responseJSON = (await response.json()) as UploadResponse;
            if (responseJSON.success) {
                alert('data: ' + JSON.stringify(responseJSON.data));
                return true; // TODO: Return a Document record object
            } else {
                throw response;
            }
        }
    };
};

export default DocumentProvider;
