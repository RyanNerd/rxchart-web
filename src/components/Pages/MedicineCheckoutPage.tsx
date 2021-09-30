import CheckoutListGroup from "components/Pages/ListGroups/CheckoutListGroup";
import React, {useGlobal} from 'reactn';

/**
 * MedicineCheckoutPage
 * Displays a table of drugLogList records that have In or Out values > 0 and were entered/updated today.
 * @return {JSX.Element | null}
 */
const MedicineCheckoutPage = () => {
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineList] = useGlobal('medicineList');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [activeClient] = useGlobal('activeResident');

    // Prevent render if the active tab isn't medicine-checkout or there are no drugLogList or medicineList records.
    if (activeTabKey !== 'medicine-checkout' ||
            !activeClient ||
            !drugLogList || drugLogList.length <=0 ||
            !medicineList || medicineList.length <= 0) {
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
