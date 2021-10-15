import DrugLogHistoryGrid from "components/Pages/Grids/DrugLogHistoryGrid";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "reactn";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "types/RecordTypes";
import {clientDOB, clientFullName} from "utility/common";

interface IProps {
    activeClient: ResidentRecord
    drugLogList: DrugLogRecord[]
    medicineList: MedicineRecord[]
    onEdit: (d: DrugLogRecord) => void
    onDelete: (d: DrugLogRecord) => void
}

/**
 * Drug Log History Table
 * @param  {IProps} props
 */
const MedDrugLogHistory = (props: IProps) => {
    const {
        activeClient,
        drugLogList,
        medicineList,
        onDelete,
        onEdit
    } = props;

    const [printing, setPrinting] = useState(false);

    useEffect(() => {
        if (printing) {
            window.print();

            // Kludge to block JS events until the print dialog goes away (only works in Chrome)
            // see: https://stackoverflow.com/a/24325151/4323201
            setTimeout(() => {
                setPrinting(false);
            }, 100);
        }
    }, [printing])

    return (
        <>
            <Button
                className="d-print-none mr-3 mb-1"
                onClick={() => setPrinting(true)}
                variant="primary"
                size="sm"
            >
                Print
            </Button>

            {activeClient && printing &&
                 <ul
                    style={{listStyleType: "none"}}
                 >
                     <li
                         style={{
                             fontSize: "20px",
                             fontWeight: "bold",
                         }}
                     >
                         {clientFullName(activeClient) + ' DOB: ' + clientDOB(activeClient)}
                     </li>

                     <span
                        style={{fontSize: "12px"}}
                     >
                     <li>
                         <b>LEGEND:</b>
                     </li>
                     <li>
                         <span style ={{color: "blue"}}>pb: <i>Pillbox</i></span>
                     </li>
                     <li>
                         <span style ={{color: "blue"}}>Out: <i>Taken out of shelter</i></span>
                     </li>
                     <li>
                         <span style ={{color: "blue"}}>In: <i>Returned to shelter</i></span>
                     </li>
                     </span>
                 </ul>
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

export default MedDrugLogHistory;
