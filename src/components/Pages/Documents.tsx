import {ChangeEvent} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useGlobal, useState} from 'reactn';

export enum UploadFileErrorCode {
    Ok,
    file_selection_cancelled,
    max_file_size_exceeded
}

const Documents = () => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [isBusy, setIsIsBusy] = useState(false);
    const defaultFileLabelText = 'Select a File to Upload';
    const [uploadedFileName, setUploadedFileName] = useState(defaultFileLabelText);
    const [invalidMaxSize, setInvalidMaxSize] = useState(false);
    const [providers] = useGlobal('providers');
    const documentProvider = providers.documentProvider;

    /**
     * Handle when the user clicked the Select a File to Upload component
     * @param {React.ChangeEvent<HTMLInputElement>} fileInputEvent The file InputElement
     * @returns {Promise<void>}
     */
    const handleFileUpload = async (fileInputEvent: ChangeEvent<HTMLInputElement>) => {
        if (fileInputEvent) {
            const target = fileInputEvent.target as HTMLInputElement;
            const files = target.files;
            // Must be only one file
            if (files && files.length === 1) {
                const file = files[0];
                // Max file size is 100MB
                if (file.size <= 104_857_600) {
                    setIsIsBusy(true);
                    try {
                        // See: https://www.slimframework.com/docs/v4/cookbook/uploading-files.html
                        const formData = new FormData();
                        formData.append('single_file', file);
                        setUploadedFileName(file.name);
                        const documentRecord = await documentProvider.uploadFile(formData, 1092);
                        // TODO: Insert the record into the Document table
                        alert('documentRecord: ' + JSON.stringify(documentRecord));
                    } catch (error) {
                        await setErrorDetails(error);
                    }
                    setIsIsBusy(false);
                } else {
                    setInvalidMaxSize(true);
                }
            } else {
                setUploadedFileName(defaultFileLabelText);
            }
        }
    };

    return (
        <Row as={Form}>
            <Form.File
                className={invalidMaxSize ? 'is-invalid' : ''}
                disabled={isBusy}
                id="custom-file"
                label={uploadedFileName}
                custom
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFileUpload(event)}
            />
            <div className="invalid-feedback">File exceeds maximum size allowed</div>
        </Row>
    );
};

export default Documents;
