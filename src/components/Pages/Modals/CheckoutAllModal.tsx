import Confirm from 'components/Pages/Modals/Confirm';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import React from 'reactn';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';

interface IProps {
    checkoutList: DrugLogRecord[];
    medicineList: MedicineRecord[];
    onCloseCheckoutAlert: () => void;
    onSelect: (s: boolean) => void;
    show: boolean;
    showCheckoutAlert: boolean;
}

/**
 * Confirmation modal to Check out All Medications and Print
 * This component exists to make the code in ManageDrugPage more readable
 * @param {IProps} props The props for this component
 */
const CheckoutAllModal = (props: IProps) => {
    const {show, medicineList, checkoutList, onSelect, showCheckoutAlert, onCloseCheckoutAlert} = props;

    return (
        <Confirm.Modal
            centered
            onSelect={(isAccepted) => onSelect(isAccepted)}
            show={show}
            size="lg"
            yesButtonProps={{disabled: showCheckoutAlert, variant: 'warning'}}
            yesButtonContent={
                <span>
                    Checkout <b>All</b> and Print
                </span>
            }
            noButtonContent={'Cancel'}
        >
            <Confirm.Header>
                <Confirm.Title>
                    <h3>
                        Checkout <b>ALL</b> Medications
                    </h3>
                </Confirm.Title>
            </Confirm.Header>
            <Confirm.Body>
                <>
                    <Alert variant="warning">
                        Answering Yes will mark <b>all</b> medicines as checked out and bring up the print dialog
                    </Alert>
                    <ul
                        style={{
                            listStyleType: 'square'
                        }}
                    >
                        {medicineList.map((m) => (
                            <li key={`med-checkout-li-${m.Id}`}>
                                {checkoutList.find((d) => m.Id === d.MedicineId) && <Badge>❎</Badge>}{' '}
                                <span
                                    style={{
                                        textDecoration: m.Active ? undefined : 'line-through',
                                        fontWeight: checkoutList.find((d) => m.Id === d.MedicineId) ? 'bold' : undefined
                                    }}
                                >
                                    {m.Drug}
                                </span>{' '}
                                {!m.Active && <span>(Inactive medication will not appear in checkout)</span>}
                            </li>
                        ))}
                    </ul>
                    <Alert
                        dismissible
                        onClose={() => onCloseCheckoutAlert()}
                        show={showCheckoutAlert}
                        variant="warning"
                    >
                        At least one drug is already checked out<Badge>❎</Badge>.{' '}
                        <b>Dismiss this alert if you want to proceed.</b>
                    </Alert>
                </>
            </Confirm.Body>
        </Confirm.Modal>
    );
};

export default CheckoutAllModal;
