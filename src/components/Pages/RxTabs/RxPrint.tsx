import CheckoutListGroup from 'components/Pages/ListGroups/CheckoutListGroup';
import React from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord} from 'types/RecordTypes';

interface IProps {
    activeClient: TClient;
    checkoutList: DrugLogRecord[];
}

const RxPrint = (props: IProps) => {
    const activeClient = props.activeClient;
    const checkoutList = props.checkoutList;

    if (activeClient === null) return null;
    return (
        <CheckoutListGroup
            clientRecord={activeClient.clientInfo}
            checkoutList={checkoutList}
            medicineList={activeClient.medicineList}
        />
    );
};

export default RxPrint;
