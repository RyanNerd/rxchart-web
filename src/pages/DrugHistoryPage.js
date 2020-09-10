import React from 'reactn';
import Button from 'react-bootstrap/Button';
import DrugLogGrid from "../components/grids/DrugLogGrid";

const DrugHistoryPage = (props) => {
    const drugLogList = props.drugLogList;
    const medicineList = props.medicineList;
    const otcList = props.otcList;

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
