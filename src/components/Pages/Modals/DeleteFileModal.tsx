import Confirm from 'components/Pages/Modals/Confirm';
import Alert from 'react-bootstrap/Alert';
import React from 'reactn';
import {FileRecord} from 'types/RecordTypes';
import {BsColor} from 'utility/common';

interface IProps {
    fileRecord: FileRecord;
    onSelect: (fileRecord: FileRecord | null) => void;
    show: boolean;
}

/**
 * Confirmation modal for when a drug log record is to be deleted
 * @param {IProps} props This props for this component
 */
const DeleteFileModal = (props: IProps) => {
    const {onSelect, fileRecord, show} = props;

    if (!fileRecord) return null;

    const fileName = fileRecord.FileName;
    const description = fileRecord.Description;

    return (
        <Confirm.Modal
            size="lg"
            onSelect={(isAccepted) => onSelect(isAccepted ? fileRecord : null)}
            show={show}
            yesButtonProps={{variant: 'danger'}}
        >
            <Confirm.Header>
                <Confirm.Title>
                    <b>PERMANENTLY Delete</b> {fileName}{' '}
                </Confirm.Title>
            </Confirm.Header>
            <Confirm.Body>
                <Alert variant="secondary">
                    <p>
                        <b style={{color: BsColor.danger}}>Permanently Delete: </b> <i>{fileName}</i>
                    </p>
                    {description && (
                        <p>
                            <b>Description:</b> {description}
                        </p>
                    )}
                </Alert>
                <Alert variant="danger">
                    This operation can not be reversed <b style={{color: 'red'}}>Are you sure?</b>
                </Alert>
            </Confirm.Body>
        </Confirm.Modal>
    );
};

export default DeleteFileModal;
