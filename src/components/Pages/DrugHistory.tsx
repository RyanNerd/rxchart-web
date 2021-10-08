import DrugLogGrid from "components/Pages/Grids/DrugLogGrid";
import Button from "react-bootstrap/Button";
import React from "reactn";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "types/RecordTypes";
import {clientDOB, clientFullName} from "utility/common";

interface IProps {
    activeClient: ResidentRecord
    drugLogList: DrugLogRecord[]
    medicineList: MedicineRecord[]
    condensed?: boolean
}

const DrugHistory = (props: IProps) => {
    const {
        activeClient,
        condensed = true,
        drugLogList,
        medicineList
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
                <DrugLogGrid
                    condensed={condensed ? "true" : "false"}
                    columns={['Drug', 'Created', 'Updated', 'Notes', 'Details', 'Out']}
                    drugLog={drugLogList}
                    medicineList={medicineList}
                    drugId={null}
                />
            </div>
        </>
    )
}

export default DrugHistory;
