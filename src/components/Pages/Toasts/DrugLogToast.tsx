import Toast from "react-bootstrap/Toast";
import React from "reactn";
import {DrugLogRecord, MedicineRecord} from "types/RecordTypes";
import {BsColors, getDrugName} from "utility/common";

interface IProps {
    toast: DrugLogRecord[]
    medicineList: MedicineRecord[]
    show: boolean
    onClose: () => void
}

const DrugLogToast = (props: IProps) => {
    const {
        toast,
        show,
        medicineList,
        onClose
    } = props;

    return (
    <Toast
        style={{
            position: "absolute",
            top: 0.95,
            right: 0.95,
            color: "#fff",
            backgroundColor: BsColors.success
        }}
        onClose={() => onClose()}
        show={show}
        delay={toast && toast.length > 1 ? 5000 : 2000}
        autohide
        className="p-1"
    >
        <Toast.Header>
            <b>Updating Drug History</b>
        </Toast.Header>
        <Toast.Body>
            <ul>
                {toast?.map(
                    (t) => {
                        return (
                            <li className="rx-icon">
                               {getDrugName(t.MedicineId, medicineList)} {" "} {t.Notes}
                            </li>
                        )
                    })
                }
            </ul>
        </Toast.Body>
    </Toast>
    )
}

export default DrugLogToast;
