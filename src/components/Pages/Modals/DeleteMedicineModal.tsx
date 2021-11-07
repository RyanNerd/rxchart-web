import Confirm from 'components/Pages/Modals/Confirm';
import Alert from 'react-bootstrap/Alert';
import React from 'reactn';
import {MedicineRecord} from 'types/RecordTypes';
import {BsColor} from 'utility/common';

interface IProps {
    medicine: MedicineRecord;
    onSelect: (n: number) => void;
    show: boolean;
}

/**
 * Delete Medicine Confirmation Modal
 * @param {IProps} props The props for the component
 */
const DeleteMedicineModal = (props: IProps) => {
    const {medicine, onSelect, show} = props;

    // If no medicine record then do not render
    if (!medicine) return null;

    return (
        <Confirm.Modal
            onSelect={(isAccepted) => onSelect(isAccepted ? (medicine.Id as number) : 0)}
            show={show}
            size="lg"
            yesButtonContent={`Destroy ${medicine.Drug}`}
            yesButtonProps={{variant: 'danger'}}
        >
            <Confirm.Header>
                <Confirm.Title>
                    <h3>
                        <span style={{color: BsColor.red}}>Delete</span>{' '}
                        <span style={{color: BsColor.blue}}>
                            <b>{medicine.Drug} </b>
                        </span>
                        {medicine.Strength}
                    </h3>
                </Confirm.Title>
            </Confirm.Header>
            <Confirm.Body>
                <Alert variant="danger">
                    This will <b>permanently</b> delete{' '}
                    <span style={{color: BsColor.blue}}>
                        <b>{medicine.Drug}</b>
                    </span>
                </Alert>
                <b style={{color: 'red'}}>Are you sure?</b>
            </Confirm.Body>
        </Confirm.Modal>
    );
};

export default DeleteMedicineModal;
