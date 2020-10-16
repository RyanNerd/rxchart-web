import React from 'reactn';
import Button from 'react-bootstrap/Button';
import DrugLogGrid from "../components/Grids/DrugLogGrid";
import {DrugLogRecord, MedicineRecord} from "../types/RecordTypes";

interface IProps {
    drugLogList: DrugLogRecord[]
    medicineList: MedicineRecord[]
    otcList: MedicineRecord[]
}

/**
 * DrugHistoryPage
 * DrugLogGrid with a Print button
 *
 * @param {IProps} props
 * @return {JSX.Element}
 */
const DrugHistoryPage = (props: IProps): JSX.Element => {
    const {
        drugLogList = [],
        medicineList = [],
        otcList = []
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
                condensed="true"
                columns={['Drug', 'Created', 'Updated', 'Amount']}
                drugLog={drugLogList}
                medicineList={medicineList}
                otcList={otcList}
                drugId={null}
            />
        </>
    );
}

export default DrugHistoryPage;
