import DrugLogHistoryGrid from "components/Pages/Grids/DrugLogHistoryGrid";
import Button from "react-bootstrap/Button";
import React from "reactn";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "types/RecordTypes";
import {clientDOB, clientFullName} from "utility/common";

interface IProps {
    activeClient: ResidentRecord
    drugLogList: DrugLogRecord[]
    medicineList: MedicineRecord[]
    onEdit: (d: DrugLogRecord) => void
    onDelete: (d: DrugLogRecord) => void
}

const DrugLogHistory = (props: IProps) => {
    const {
        activeClient,
        drugLogList,
        medicineList,
        onDelete,
        onEdit
    } = props;

    return (
        <>
            <Button
                className="d-print-none mr-3 mb-1"
                onClick={() => window.print()}
                variant="primary"
                size="sm"
            >
                Print
            </Button>

            {activeClient &&
                <span
                    style={{
                        fontSize: "25px",
                        fontWeight: "bold"
                    }}
                >
                    {clientFullName(activeClient) + ' DOB: ' + clientDOB(activeClient)}
                </span>
            }

            <div className="mt-3">
                <DrugLogHistoryGrid
                    drugLog={drugLogList}
                    medicineList={medicineList}
                    onDelete={d => onDelete(d)}
                    onEdit={d => onEdit(d)}
                />
            </div>
        </>
    )
}

export default DrugLogHistory;
