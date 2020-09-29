import React from 'reactn';
import Button from 'react-bootstrap/Button';
import DrugLogGrid from "../components/Grids/DrugLogGrid";
import {DrugLogRecord, MedicineRecord} from "../types/RecordTypes";

interface IProps {
    drugLogList: DrugLogRecord[] | null,
    medicineList: MedicineRecord[] | null,
    otcList: MedicineRecord[] | null
}

const DrugHistoryPage = (props: IProps) => {
    const {
        drugLogList,
        medicineList,
        otcList
    } = props;

    return (
        <>
            <Button
                style={{marginBottom: "5px"}}
                onClick={() => window.print()}
                variant="primary"
                size="sm"
            >
                Print
            </Button>

            <DrugLogGrid
                condensed={true}
                showDrugColumn={true}
                drugLog={drugLogList}
                medicineList={medicineList}
                otcList={otcList}
                drugId={null}
            />
        </>
    );
}

export default DrugHistoryPage;
