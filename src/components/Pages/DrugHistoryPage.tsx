import React, {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button';
import DrugLogGrid from './Grids/DrugLogGrid';

/**
 * DrugHistoryPage
 * DrugLogGrid with a Print button
 * @return {JSX.Element}
 */
const DrugHistoryPage = (): JSX.Element | null => {
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
