import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'reactn';
import {TClient} from 'reactn/default';

interface IProps {
    activeClient: TClient;
    medsToCheckout: number[]; // The MedicineIds to default checkout
    show: boolean;
}

type CheckoutLine = {id: number | null; active: boolean; drug: string; checkout: number; notes: string};

/**
 * Confirmation modal to Check out Medications and Print
 * @param {IProps} props The props for this component
 */
const MedicineCheckoutModal = (props: IProps) => {
    const {activeClient, show, medsToCheckout} = props;

    const [checkoutList, setCheckoutList] = useState<null | CheckoutLine[]>(null);
    useEffect(() => {
        if (checkoutList === null) {
            const checkout = [];
            for (const medicine of activeClient.medicineList) {
                checkout.push({id: medicine.Id, active: medicine.Active, drug: medicine.Drug, checkout: 0, notes: ''});
            }
            setCheckoutList(checkout);
        }
    }, [activeClient.medicineList, checkoutList]);

    /**
     * Inline data entry
     * @param {CheckoutLine} checkoutLine The data entry line
     */
    const CheckoutFormLine = (checkoutLine: CheckoutLine) => {
        return (
            <Form inline>
                <Form.Label htmlFor={`medication-name-${checkoutLine.id}`} srOnly className="mx-1">
                    Medication Name
                </Form.Label>
                <Form.Control id={`medication-name-${checkoutLine.id}`} value={checkoutLine.drug} className="mx-1" />
            </Form>
        );
    };

    if (checkoutList === null) return null;

    return (
        <Modal centered show={show} size="lg">
            <Modal.Header>
                <Modal.Title>
                    <h3>Medication Checkout</h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ul
                    style={{
                        listStyleType: 'square'
                    }}
                >
                    {checkoutList.map((checkout) => (
                        <li key={`checkout-item-${checkout.id}`}>{CheckoutFormLine(checkout)}</li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default MedicineCheckoutModal;
