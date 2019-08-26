import React, {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button';
import DrugLogGrid from "../DrugLog/DrugLogGrid";

export default function DrugHistoryPage()
{
    const [ drugLogList ] = useGlobal('drugLogList');
    const [ medicineList ] = useGlobal('medicineList');

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
                drugLog={drugLogList}
                medicineList={medicineList}
                drugId={null}
            />
        </>
    );
}
