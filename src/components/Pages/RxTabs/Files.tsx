import FileGrid from 'components/Pages/Grids/FileGrid';
import {RX_TAB_KEY} from 'components/Pages/RxPage';
import {ChangeEvent} from 'react';
import Form from 'react-bootstrap/Form';
import React, {useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';

interface IProps {
    activeClient: TClient;
    rxTabKey: string;
}

const Files = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [isBusy, setIsIsBusy] = useState(false);
    const defaultFileLabelText = 'Select a File to Upload';
    const [uploadedFileName, setUploadedFileName] = useState(defaultFileLabelText);
    const [invalidMaxSize, setInvalidMaxSize] = useState(false);
    const [providers] = useGlobal('providers');
    const documentProvider = providers.fileProvider;
    const fileList = props.activeClient.fileList;

    const clientInfo = props.activeClient.clientInfo;
    const activeRxTab = props.rxTabKey;

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
                        const documentRecord = await documentProvider.uploadFile(formData, clientInfo.Id as number);

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

    if (activeRxTab !== RX_TAB_KEY.Document) return null;

    return (
        <Form>
            <Form.Group>
                <Form.File
                    className={invalidMaxSize ? 'is-invalid' : ''}
                    style={{width: '25%'}}
                    disabled={isBusy}
                    id="custom-file"
                    label={uploadedFileName}
                    custom
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleFileUpload(event)}
                />
                <div className="invalid-feedback">File exceeds maximum size allowed</div>
            </Form.Group>

            {
                <Form.Group>
                    <FileGrid
                        fileList={fileList}
                        onDelete={(d) => alert('delete: ' + d)}
                        onDownload={(d) => alert('download: ' + d)}
                        onEdit={(f) => alert('Edit: ' + f)}
                    />
                </Form.Group>
            }
        </Form>
    );
};

export default Files;
