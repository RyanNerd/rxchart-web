import CheckoutListGroup from 'components/Pages/ListGroups/CheckoutListGroup';
import React from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord} from 'types/RecordTypes';

interface IProps {
    activeClient: TClient;
    checkoutList: DrugLogRecord[];
}

/**
 * RxCheckout Tab -- Displays the Medication Checkout grid and signature printout
 * @param {IProps} props - The props for this component
 */
const RxCheckout = (props: IProps) => {
    const activeClient = props.activeClient;
    const checkoutList = props.checkoutList;

    if (activeClient === null) return null;
    return (
        <CheckoutListGroup
            checkoutList={checkoutList}
            clientRecord={activeClient.clientInfo}
            medicineList={activeClient.medicineList}
        />
    );
};

export default RxCheckout;
