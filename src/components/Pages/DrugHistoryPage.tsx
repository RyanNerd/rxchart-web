import DrugHistory from "components/Pages/DrugHistory";
import React, {useGlobal} from 'reactn';
import {DrugLogRecord, ResidentRecord} from "types/RecordTypes";

interface IProps {
    activeClient: ResidentRecord
    activeTabKey: string
    drugLogList: DrugLogRecord[]
}

/**
 * DrugHistoryPage
 * DrugLogGrid with a Print button
 * @return {JSX.Element}
 */
const DrugHistoryPage = (props: IProps): JSX.Element | null => {
    const {
        activeClient,
        activeTabKey,
        drugLogList
    } = props;

    const [medicineList] = useGlobal('medicineList');
    const [otcList] = useGlobal('otcList');

    // If this tab isn't active then don't render
    if (activeTabKey !== 'history') {
        return null;
    }

    return (
        <DrugHistory
            activeClient={activeClient}
            drugLogList={drugLogList}
            medicineList={medicineList.concat(otcList).filter(m => m.Active)}
        />
    )
}

export default DrugHistoryPage;
