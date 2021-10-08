import Button from 'react-bootstrap/Button';
import React, {useGlobal} from 'reactn';
import {clientDOB, clientFullName} from "utility/common";
import DrugLogGrid from './Grids/DrugLogGrid';

/**
 * DrugHistoryPage
 * DrugLogGrid with a Print button
 * @return {JSX.Element}
 */
const DrugHistoryPage = (): JSX.Element | null => {
    const [activeClient] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineList] = useGlobal('medicineList');
    const [otcList] = useGlobal('otcList');

    const allMeds = medicineList.concat(otcList);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'history') {
        return null;
    }

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
                condensed="true"
                columns={['Drug', 'Created', 'Updated', 'Notes', 'Details', 'Out']}
                drugLog={drugLogList}
                medicineList={allMeds}
                drugId={null}
            />
            </div>
        </>
    );
}

export default DrugHistoryPage;
