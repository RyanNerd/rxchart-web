import CheckoutGrid from 'components/Pages/Grids/CheckoutGrid';
import DigitalSignature from 'components/Pages/Modals/DigitalSignature';
import {GenerateResponseData} from 'providers/PinProvider';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useGlobal, useState} from 'reactn';
import {ClientRecord, DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {clientFullName, getFormattedDate} from 'utility/common';

interface IProps {
    clientRecord: ClientRecord;
    checkoutList: DrugLogRecord[];
    medicineList: MedicineRecord[];
    onClose?: () => void;
}
const CheckoutListGroup = (props: IProps) => {
    const {checkoutList, medicineList, clientRecord, onClose} = props;
    const clientName = clientRecord ? clientFullName(clientRecord) : '';
    const now = new Date();
    const today = getFormattedDate(now);
    const [providers] = useGlobal('providers');
    const pinProvider = providers.pinProvider;
    const [pinData, setPinData] = useState<null | GenerateResponseData>(null);
    const [signIn] = useGlobal('signIn');
    const organization = signIn?.organization?.trim();

    const handleDigitalSignature = () => {
        pinProvider.generate(clientRecord.Id as number).then((pinData) => {
            setPinData(pinData);
        });
    };

    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                    <ButtonGroup>
                        <Button
                            className="mb-2 d-print-none"
                            onClick={() => {
                                window.print();

                                if (onClose) {
                                    // Kludge to block JS events until the print dialog goes away (only works in Chrome)
                                    // see: https://stackoverflow.com/a/24325151/4323201
                                    setTimeout(() => {
                                        onClose();
                                    }, 100);
                                }
                            }}
                            size="sm"
                        >
                            Print
                        </Button>

                        <Button className="mb-2 d-print-none ml-2" size="sm" onClick={() => handleDigitalSignature()}>
                            Digital Signature
                        </Button>

                        {onClose && (
                            <Button className="mb-2 d-print-none ml-2" size="sm" onClick={() => onClose()}>
                                Close
                            </Button>
                        )}
                    </ButtonGroup>

                    <p>
                        {clientName} as a resident of {organization}, I declare that I am leaving for the day and verify
                        that I have a prescription medication dose that needs to be administered during this time.
                        <br />
                        I take full responsibility for my medication while I am away from the Switchpoint facility and
                        attest that staff gave me my prescription medication for this purpose and this purpose alone.
                        <br />
                        I am fully aware that if I return to the property and do not immediately turn my prescription
                        medications back in to the front office, I can be detained and arrested by the police.
                        <br />
                        <br />
                        <span className="mt-3">Signature:____________________________________</span>{' '}
                        <span className="ml-3">Date: {today}</span>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <CheckoutGrid drugLog={checkoutList} medicineList={medicineList} drugId={null} />
                </ListGroup.Item>
            </ListGroup>

            {pinData && <DigitalSignature pinData={pinData} />}
        </>
    );
};

export default CheckoutListGroup;
