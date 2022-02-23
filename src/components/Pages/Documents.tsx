import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useGlobal, useState} from 'reactn';
import {ChangeEvent} from 'react';
import decodeBase64ArrayBuffer from 'utility/decodeBase64ArrayBuffer';
import encodeBase64ArrayBuffer from 'utility/encodeBase64ArrayBuffer';

export enum UploadFileErrorCode {
    Ok,
    file_selection_cancelled,
    max_file_size_exceeded
}

const Documents = () => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    // todo: use <Suspense> when system is busy with stuff
    const [busy, setIsBusy] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('Select a File to Upload');
    const [encodedString, setEncodedString] = useState('');
    const [providers] = useGlobal('providers');
    const documentProvider = providers.documentProvider;

    const saveFile = async (content: ArrayBuffer, suggestedFileName?: string) => {
        const options = suggestedFileName ? {suggestedName: suggestedFileName} : undefined;
        const fileHandle = await window.showSaveFilePicker(options);
        const fileStream = await fileHandle.createWritable();
        await fileStream.write(content);
        await fileStream.close();
    };

    const handleSaveEncodedStringToFile = () => {
        // Now decode the string back to an ArrayBuffer
        const decodedArrayBuffer = decodeBase64ArrayBuffer(encodedString);
        // Save the decodedArrayBuffer as a new file
        saveFile(decodedArrayBuffer);
    };

    const uploadFile = async () => {
        try {
            // Bring up the file selector dialog window
            const [fileHandle] = await window.showOpenFilePicker();
            // Get the file object
            const file = (await fileHandle.getFile()) as File;
            if (file.size > 500_000_000) {
                return UploadFileErrorCode.max_file_size_exceeded;
            }
            // Get the file contents as and ArrayBuffer
            const fileArrayBuffer = await file.arrayBuffer();
            // Convert the ArrayBuffer into base64
            const arrayString = encodeBase64ArrayBuffer(fileArrayBuffer);
            alert('base64 encoded: ' + JSON.stringify(arrayString));
            setEncodedString(arrayString);
        } catch (error: unknown) {
            if (error instanceof DOMException && error.message.toLowerCase().includes('the user aborted a request')) {
                return UploadFileErrorCode.file_selection_cancelled;
            }

            if (error instanceof Error) {
                await setErrorDetails(error);
            }
        }
    };

    const handleFileInput = async (fileInputEvent: ChangeEvent<HTMLInputElement>) => {
        if (fileInputEvent) {
            const target = fileInputEvent.target as HTMLInputElement;
            const files = target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const formData = new FormData();
                formData.append('example1', file);
                setUploadedFileName(file.name);
                const fileUploadedSuccessfully = await documentProvider.uploadFile(formData);
                if (!fileUploadedSuccessfully) {
                    setUploadedFileName('File upload failed');
                }
            }
        }
    };

    return (
        <>
            <ButtonGroup className="mb-2" as={Row}>
                <Button size="sm" variant="info" onClick={() => uploadFile()}>
                    Upload new document or file
                </Button>
                <Button className="ml-2" size="sm" variant="info" onClick={() => handleSaveEncodedStringToFile()}>
                    Save encoded string as new file
                </Button>
            </ButtonGroup>
            <Row as={Form}>
                <Form.File
                    id="custom-file"
                    label={uploadedFileName}
                    custom
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleFileInput(event)}
                />
            </Row>
        </>
    );
};

export default Documents;
