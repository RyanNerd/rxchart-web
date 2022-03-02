import Frak from 'frak/lib/components/Frak';
import {FileRecord} from 'types/RecordTypes';

export interface IFileProvider {
    setApiKey: (apiKey: string) => void;
    uploadFile: (formData: FormData, clientId: number) => Promise<FileUploadRecord>;
    load: (clientId: number) => Promise<FileRecord[]>;
}

type FileUploadRecord = {
    Id: number | null;
    Size: number;
    FileName: string;
    Type: string | null;
};

type UploadResponse = {
    status: number;
    success: boolean;
    data: null | FileUploadRecord;
};

type LoadResponse = {
    status: number;
    success: boolean;
    data: FileRecord[];
};

const FileProvider = (baseUrl: string): IFileProvider => {
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
         * @returns {Promise<FileUploadRecord>} A FileUploadRecord object as a promise
         */
        uploadFile: async (formData: FormData, clientId): Promise<FileUploadRecord> => {
            const uri = _baseUrl + 'file/upload/' + clientId + '?api_key=' + _apiKey;
            const response = await fetch(uri, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            const responseJSON = (await response.json()) as UploadResponse;
            if (responseJSON.success) {
                return responseJSON.data as FileUploadRecord;
            } else {
                throw response;
            }
        },

        /**
         * Given a clientId (Resident PK) return all the File records for the client
         * @param {number} clientId Client (Resident) PK
         * @returns {Promise<FileRecord[]>} An array of FileRecords
         */
        load: async (clientId: number): Promise<FileRecord[]> => {
            const uri = `${_baseUrl}file/load/${clientId}?api_key=${_apiKey}`;
            const response = await _frak.get<LoadResponse>(uri);
            if (response.success) {
                return response.data as FileRecord[];
            } else {
                if (response.status === 404) {
                    return [] as FileRecord[];
                }
                throw response;
            }
        }
    };
};

export default FileProvider;
