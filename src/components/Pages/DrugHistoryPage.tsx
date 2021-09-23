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
                className="d-print-none mb-3"
                onClick={() => window.print()}
                variant="primary"
                size="sm"
            >
                Print
            </Button>

            {activeClient &&
                <span
                    className="ml-3 mb-3"
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    {clientFullName(activeClient) + ' DOB:' + clientDOB(activeClient)}
                </span>
            }

            <DrugLogGrid
                condensed="true"
                columns={['Drug', 'Created', 'Updated', 'Notes', 'Details']}
                drugLog={drugLogList}
                medicineList={allMeds}
                includeCheckout={false}
                drugId={null}
            />
        </>
    );
}

export default DrugHistoryPage;
