import {Button, ListGroup} from "react-bootstrap";
import React, {useGlobal} from 'reactn';
import {clientFullName, getCheckoutList, getFormattedDate} from "utility/common";
import DrugLogGrid from "../Pages/Grids/DrugLogGrid";

/**
 * MedicineCheckoutPage
 * Displays a table of drugLogList records that have In or Out values > 0 and were entered/updated today.
 * @return {JSX.Element | null}
 */
const MedicineCheckoutPage = () => {
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineList] = useGlobal('medicineList');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [activeResident] = useGlobal('activeResident');
    const clientName = activeResident ? clientFullName(activeResident) : '';

    // Prevent render if the active tab isn't medicine-checkout or there are no drugLogList or medicineList records.
    if (activeTabKey !== 'medicine-checkout' ||
            !drugLogList || drugLogList.length <=0 ||
            !medicineList || medicineList.length <= 0) {
        return null;
    }

    const now = new Date();
    const today = getFormattedDate(now);
    const checkoutList = getCheckoutList(drugLogList);

    return (
        <ListGroup>
            <ListGroup.Item>
                <Button
                    className="mb-2 d-print-none"
                    onClick={() => {
                        window.print();
                    }}
                >
                    Print
                </Button>

                <p>
{clientName} as a resident of Switchpoint, I declare that I am leaving for the day and verify that I
have a prescription medication dose that needs to be administered during this time.
<br/>
I take full responsibility for my medication while I am away from the Switchpoint facility and
attest that staff gave me my prescription medication for this purpose and this purpose alone.
<br/>
I am fully aware that if I return to the property and do not immediately turn my prescription
medications back in to the front office, I can be detained and arrested by the police.
<br/>
<br/>
<span className="mt-3">Signature:____________________________________</span> <span className="ml-3">Date: {today}</span>
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <DrugLogGrid
                    columns={['Drug', 'Updated', 'Notes', 'Out', 'In']}
                    drugLog={checkoutList}
                    medicineList={medicineList}
                    drugId={null}
                />
            </ListGroup.Item>
        </ListGroup>
    )
}

export default MedicineCheckoutPage;
