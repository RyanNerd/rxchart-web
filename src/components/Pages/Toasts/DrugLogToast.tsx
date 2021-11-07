import Toast from 'react-bootstrap/Toast';
import React from 'reactn';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {BsColor, getDrugName} from 'utility/common';

interface IProps {
    medicineList: MedicineRecord[];
    onClose: () => void;
    show: boolean;
    toast: DrugLogRecord[];
}

const DrugLogToast = (props: IProps) => {
    const {toast, show, medicineList, onClose} = props;

    return (
        <Toast
            autohide
            className="p-1 mb-2 d-print-none"
            delay={toast && toast.length > 1 ? 5000 : 2000}
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
                <b>Updating Drug History</b>
            </Toast.Header>
            <Toast.Body>
                <ul>
                    {toast?.map((t) => {
                        const key = t.Id;
                        return (
                            <li key={`drug-log-toast-${key}`} className="rx-icon">
                                {getDrugName(t.MedicineId, medicineList)} {t.Notes}
                            </li>
                        );
                    })}
                </ul>
            </Toast.Body>
        </Toast>
    );
};

export default DrugLogToast;
