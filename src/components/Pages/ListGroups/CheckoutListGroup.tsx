import DrugLogGrid from "components/Pages/Grids/DrugLogGrid";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import React from "reactn";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "types/RecordTypes";
import {clientFullName, getCheckoutList, getFormattedDate} from "utility/common";

interface IProps {
    drugLogList: DrugLogRecord[]
    medicineList: MedicineRecord[]
    activeClient: ResidentRecord
}
const CheckoutListGroup = (props: IProps) => {
    const {
        drugLogList,
        medicineList,
        activeClient
    } = props;

    const clientName = activeClient ? clientFullName(activeClient) : '';
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
                    {/* tslint:disable-next-line:max-line-length */}
                    <span className="mt-3">Signature:____________________________________</span> <span
                    className="ml-3">Date: {today}</span>
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

export default CheckoutListGroup;
