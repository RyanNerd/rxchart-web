import FileGrid from 'components/Pages/Grids/FileGrid';
import DisabledSpinner from 'components/Pages/ListGroups/DisabledSpinner';
import DeleteFileModal from 'components/Pages/Modals/DeleteFileModal';
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

/**
 * Document / Files tab component
 * @param {IProps} props The props for this component
 * @returns {JSX.Element | null} The component or null
 */
const RxFiles = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [invalidMaxSize, setInvalidMaxSize] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [providers] = useGlobal('providers');
    const [showEditFile, setShowEditFile] = useState<FileRecord | null>(null);
    const [showDeleteFile, setShowDeleteFile] = useState<FileRecord | null>(null);
    const fileProvider = providers.fileProvider;
    const activeRxTab = props.rxTabKey;

    /**
     * Rehydrates the fileList for the active client
     * @returns {Promise<void>}
     */
    const refreshFileList = async () => {
        try {
            await setActiveClient({
                ...(activeClient as TClient),
                fileList: await fileProvider.load(activeClient?.clientInfo.Id as number)
            });
        } catch (requestError) {
            await setErrorDetails(requestError);
        }
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
                    setIsBusy(true);
                    setInvalidMaxSize(false);
                    try {
                        const formData = new FormData();
                        formData.append('single_file', file);
                        await fileProvider.uploadFile(formData, activeClient?.clientInfo.Id as number);
                        await refreshFileList();
                    } catch (error) {
                        await setErrorDetails(error);
                    }
                    setIsBusy(false);
                } else {
                    setInvalidMaxSize(true);
                }
            }
        }
    };

    if (activeRxTab !== RX_TAB_KEY.Document) return null;

    return (
        <Form>
            <Form.Group>
                {isBusy && <DisabledSpinner className="mx-1" />}
                <Form.File
                    className={invalidMaxSize ? 'is-invalid' : ''}
                    style={{width: '25%'}}
                    disabled={isBusy}
                    id="custom-file"
                    label="Select a File to Upload"
                    custom
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleFileUpload(event)}
                />
                <div className="invalid-feedback">File exceeds maximum size allowed</div>
            </Form.Group>

            {activeClient && (
                <Form.Group>
                    <FileGrid
                        disabled={isBusy}
                        fileList={activeClient.fileList}
                        onDelete={(fileRecord) => setShowDeleteFile(fileRecord)}
                        onDownload={async (fileRecord) => {
                            try {
                                await fileProvider.download(fileRecord);
                            } catch (requestError) {
                                await setErrorDetails(requestError);
                            }
                        }}
                        onEdit={(fileRecord) => setShowEditFile(fileRecord)}
                    />
                </Form.Group>
            )}

            <FileEdit
                fileInfo={showEditFile as FileRecord}
                show={showEditFile !== null}
                onClose={async (f) => {
                    setShowEditFile(null);
                    if (f) {
                        try {
                            await fileProvider.update(f);
                            await refreshFileList();
                        } catch (requestError) {
                            await setErrorDetails(requestError);
                        }
                    }
                }}
                onHide={() => setShowEditFile(null)}
            />

            <DeleteFileModal
                fileRecord={showDeleteFile as FileRecord}
                onSelect={async (fileRecord) => {
                    setShowDeleteFile(null);
                    if (fileRecord?.Id) {
                        try {
                            const success = await fileProvider.delete(fileRecord.Id, true);
                            await (success
                                ? refreshFileList()
                                : setErrorDetails(new Error('Unable to delete file. Id: ' + fileRecord.Id)));
                        } catch (requestError) {
                            await setErrorDetails(requestError);
                        }
                    }
                }}
                show={showDeleteFile !== null}
            />
        </Form>
    );
};

export default RxFiles;
