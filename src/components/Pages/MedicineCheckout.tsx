import React, {useGlobal} from 'reactn';
import {Button, ListGroup} from "react-bootstrap";
import DrugLogGrid from "../Pages/Grids/DrugLogGrid";
import {clientFullName, getFormattedDate, isToday} from "../../utility/common";
import {DrugLogRecord} from "../../types/RecordTypes";

const MedicineCheckout = () => {
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineList] = useGlobal('medicineList');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [activeResident] = useGlobal('activeResident');
    const clientName = activeResident ? clientFullName(activeResident) : '';
    const now = new Date();
    const today = getFormattedDate(now);

    if (activeTabKey !== 'medicine-checkout' ||
            !drugLogList || drugLogList.length <=0 ||
            !medicineList || medicineList.length <= 0) {
        return null;
    }

    const checkoutList = drugLogList.filter((drug) => {
        const isThisDay = (drug: DrugLogRecord) => {
            return drug && drug.Updated && isToday(new Date(drug.Updated));
        }
        return (drug.Out && drug.Out > 0) && isThisDay(drug);
    });

    return (
        <ListGroup>
            <ListGroup.Item>
                <Button
                    className="mb-2"
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
                    drugLog={checkoutList}
                    medicineList={medicineList}
                    drugId={null}
                />
            </ListGroup.Item>
        </ListGroup>
    )
}

export default MedicineCheckout;
