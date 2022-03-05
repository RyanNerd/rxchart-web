import FileGrid from 'components/Pages/Grids/FileGrid';
import DisabledSpinner from 'components/Pages/ListGroups/DisabledSpinner';
import FileEdit from 'components/Pages/Modals/FileEdit';
import {RX_TAB_KEY} from 'components/Pages/RxPage';
import {ChangeEvent} from 'react';
import Form from 'react-bootstrap/Form';
import React, {useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {FileRecord} from 'types/RecordTypes';

interface IProps {
    rxTabKey: string;
}

const Files = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [invalidMaxSize, setInvalidMaxSize] = useState(false);
    const [isBusy, setIsIsBusy] = useState(false);
    const [providers] = useGlobal('providers');
    const [showEditFile, setShowEditFile] = useState<FileRecord | null>(null);
    const defaultFileLabelText = 'Select a File to Upload';
    const [uploadedFileName, setUploadedFileName] = useState(defaultFileLabelText);
    const fileProvider = providers.fileProvider;
    const activeRxTab = props.rxTabKey;

    const saveFile = async (fileRecord: FileRecord) => {
        return await fileProvider.update(fileRecord);
    };

    /**
     * Rehydrates the fileList for the active client
     * @returns {Promise<void>}
     */
    const refreshFileList = async () => {
        const loadedFileList = await fileProvider.load(activeClient?.clientInfo.Id as number);
        await setActiveClient({...(activeClient as TClient), fileList: loadedFileList});
    };

    /**
     * Handle when the user clicked the Select a File to Upload component
     * @param {React.ChangeEvent<HTMLInputElement>} fileInputEvent The file InputElement
     * @link https://www.slimframework.com/docs/v4/cookbook/uploading-files.html
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
                        const formData = new FormData();
                        formData.append('single_file', file);
                        setUploadedFileName(file.name);
                        await fileProvider.uploadFile(formData, activeClient?.clientInfo.Id as number);
                        await refreshFileList();
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
                {isBusy && <DisabledSpinner />}
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

            {activeClient && (
                <Form.Group>
                    <FileGrid
                        fileList={activeClient.fileList}
                        onDelete={(d) => alert('delete: ' + d)}
                        onDownload={(fileRecord) => fileProvider.download(fileRecord as FileRecord)}
                        onEdit={(f) => setShowEditFile(f)}
                    />
                </Form.Group>
            )}

            <FileEdit
                fileInfo={showEditFile as FileRecord}
                show={showEditFile !== null}
                onClose={async (f) => {
                    setShowEditFile(null);
                    if (f) {
                        const updatedFile = await saveFile(f);
                        if (updatedFile) {
                            await refreshFileList();
                        }
                    }
                }}
                onHide={() => setShowEditFile(null)}
            />
        </Form>
    );
};

export default Files;
