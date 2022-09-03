import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import React, {useEffect, useState} from 'reactn';
import {TClient} from 'reactn/default';

interface IProps {
    activeClient: TClient;
    medsToCheckout: number[]; // The MedicineIds to default checkout
    show: boolean;
    onClose: () => void;
}

type CheckoutLine = {id: number | null; active: boolean; drug: string; checkout: number; notes: string};

/**
 * Confirmation modal to Check out Medications and Print
 * @param {IProps} props The props for this component
 * @todo Adjust checkout by medsToCheckout and existing checkouts
 * @todo Save needs to update existing MedLog records and add new ones.
 */
const MedicineCheckoutModal = (props: IProps) => {
    const {activeClient, medsToCheckout, onClose} = props;

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

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
     * @link https://react-bootstrap-v4.netlify.app/components/forms/#forms-inline
     */
    const CheckoutFormLine = (checkoutLine: CheckoutLine) => {
        return (
            <Form inline>
                <Form.Label htmlFor={`medication-name-${checkoutLine.id}`} srOnly>
                    Medication Name
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id={`medication-name-${checkoutLine.id}`}
                    value={checkoutLine.drug}
                    readOnly
                />

                <Form.Label htmlFor={`medication-checkout-${checkoutLine.id}`} srOnly>
                    Out
                </Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Out</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        id={`medication-checkout-${checkoutLine.id}`}
                        style={{width: '75px'}}
                        value={checkoutLine.checkout}
                    />
                </InputGroup>

                <Form.Label htmlFor={`medication-ckout-notes-${checkoutLine.id}`} srOnly>
                    Out
                </Form.Label>
                <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Notes</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control id={`medication-ckout-notes-${checkoutLine.id}`} value={checkoutLine.notes} />
                </InputGroup>
            </Form>
        );
    };

    if (checkoutList === null) return null;

    /**
     * How to scroll an ordered list
     * @link https://stackoverflow.com/questions/29793160/making-unordered-list-scrollable
     */
    return (
        <Modal
            centered
            static
            show={show}
            size="lg"
            onHide={() => {
                setShow(false);
                onClose();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Medication Checkout</h3>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{height: '400px'}}>
                    <ul
                        style={{
                            listStyleType: 'none',
                            margin: 0,
                            padding: 0,
                            maxHeight: '400px',
                            overflow: 'auto',
                            textIndent: '10px'
                        }}
                    >
                        {checkoutList.map((checkout) => (
                            <li style={{lineHeight: '50px'}} key={`checkout-item-${checkout.id}`}>
                                {CheckoutFormLine(checkout)}
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={() => {
                        setShow(false);
                        onClose();
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MedicineCheckoutModal;
