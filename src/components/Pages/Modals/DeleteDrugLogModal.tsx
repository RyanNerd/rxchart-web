import Confirm from 'components/Pages/Modals/Confirm';
import Alert from 'react-bootstrap/Alert';
import React from 'reactn';
import {DrugLogRecord} from 'types/RecordTypes';
import {getFormattedDate} from 'utility/common';
interface IProps {
    onSelect: (drugLogRecord: DrugLogRecord | null) => void;
    drugLogRecord: DrugLogRecord;
    drugName: string;
    show: boolean;
}

/**
 * Confirmation modal for when a drug log record is to be deleted
 * @param {IProps} props This props for this component
 */
const DeleteDrugLogModal = (props: IProps) => {
    const {onSelect, drugLogRecord, drugName, show} = props;

    if (!drugLogRecord) return null;

    return (
        <Confirm.Modal
            size="lg"
            onSelect={(isAccepted) => onSelect(isAccepted ? drugLogRecord : null)}
            show={show}
            yesButtonProps={{variant: 'danger'}}
        >
            <Confirm.Header>
                <Confirm.Title>Delete {drugName} Log Record</Confirm.Title>
            </Confirm.Header>
            <Confirm.Body>
                {drugLogRecord.Updated && (
                    <Alert variant="secondary">Date: {getFormattedDate(drugLogRecord?.Updated)}</Alert>
                )}
                <b style={{color: 'red'}}>Are you sure?</b>
            </Confirm.Body>
        </Confirm.Modal>
    );
};

export default DeleteDrugLogModal;
