import Frak from 'frak/lib/components/Frak';
import {DocumentRecord} from 'types/RecordTypes';

export interface IDocumentProvider {
    setApiKey: (apiKey: string) => void;
    uploadFile: (formData: FormData, clientId: number) => Promise<DocumentUploadRecord>;
    load: (clientId: number) => Promise<DocumentRecord[]>;
}

type DocumentUploadRecord = {
    Id: number | null;
    Size: number;
    FileName: string;
    Type: string | null;
};

type UploadResponse = {
    status: number;
    success: boolean;
    data: null | DocumentUploadRecord;
};

type LoadResponse = {
    status: number;
    success: boolean;
    data: DocumentRecord[];
};

const DocumentProvider = (baseUrl: string): IDocumentProvider => {
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
         * Upload a file as a FormData object. Note that Frak isn't used because the data is not JSON
         * @param {FormData} formData The FormData object containing the name and file
         * @param {number} clientId The Client PK
         * @returns {Promise<DocumentUploadRecord>} A Document record as a promise
         */
        uploadFile: async (formData: FormData, clientId): Promise<DocumentUploadRecord> => {
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
                return responseJSON.data as DocumentUploadRecord;
            } else {
                throw response;
            }
        },

        /**
         * Given a clientId (Resident PK) return all the Document records for the client
         * @param {number} clientId Client (Resident) PK
         * @returns {Promise<DocumentRecord[]>} An array of DocumentRecords
         */
        load: async (clientId: number): Promise<DocumentRecord[]> => {
            const uri = `${_baseUrl}document/load/${clientId}?api_key=${_apiKey}`;
            const response = await _frak.get<LoadResponse>(uri);
            if (response.success) {
                return response.data as DocumentRecord[];
            } else {
                if (response.status === 404) {
                    return [] as DocumentRecord[];
                }
                throw response;
            }
        }
    };
};

export default DocumentProvider;
