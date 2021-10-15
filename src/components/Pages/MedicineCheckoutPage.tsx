import CheckoutListGroup from "components/Pages/ListGroups/CheckoutListGroup";
import React, {useGlobal} from 'reactn';
import {DrugLogRecord, ResidentRecord} from "types/RecordTypes";

interface IProps {
    activeClient: ResidentRecord | null
    activeTabKey: string
    drugLogList: DrugLogRecord[]
}

/**
 * MedicineCheckoutPage
 * Displays a table of drugLogList records that have In or Out values > 0 and were entered/updated today.
 * @return {JSX.Element | null}
 */
const MedicineCheckoutPage = (props: IProps) => {
    const {
        drugLogList,
        activeTabKey,
        activeClient
    } = props

    const [medicineList] = useGlobal('medicineList');

    // Prevent render if the active tab isn't medicine-checkout or there are no drugLogList or medicineList records.
    if (activeTabKey !== 'medicine-checkout' || !activeClient || drugLogList.length ===0 || medicineList.length === 0) {
        return null;
    }

    return (
        <CheckoutListGroup
            drugLogList={drugLogList}
            medicineList={medicineList}
            activeClient={activeClient}
        />
    )
}

export default MedicineCheckoutPage;
