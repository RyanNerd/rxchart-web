import React, {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button';
import DrugLogGrid from './Grids/DrugLogGrid';
import {clientDOB, clientFullName} from "../../utility/common";

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
                medicineList={medicineList}
                includeCheckout={false}
                otcList={otcList}
                drugId={null}
            />
        </>
    );
}

export default DrugHistoryPage;
