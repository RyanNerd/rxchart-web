import Toast from 'react-bootstrap/Toast';
import React from 'reactn';
import {FileRecord} from 'types/RecordTypes';
import {BsColor} from 'utility/common';

interface IProps {
    onClose: () => void;
    show: boolean;
    toast: FileRecord;
}

const SignatureToast = (props: IProps) => {
    const {toast, show, onClose} = props;
    const key = toast.Id;

    return (
        <Toast
            autohide
            className="p-1 mb-2 d-print-none"
            delay={6000}
            onClose={() => onClose()}
            show={show}
            style={{
                position: 'absolute',
                top: 0.95,
                right: 0.95,
                color: '#fff',
                backgroundColor: BsColor.success
            }}
        >
            <Toast.Header>
                <b>Medication Checkout</b>
            </Toast.Header>
            <Toast.Body>
                <ul>
                    <li key={`drug-log-toast-${key}`} className="save-icon">
                        {`${toast.Description} Saved!`}
                    </li>
                </ul>
            </Toast.Body>
        </Toast>
    );
};

export default SignatureToast;
