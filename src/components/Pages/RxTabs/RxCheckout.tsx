import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {calculateLastTaken, getBsColor, getCheckoutList, getFormattedDate, getLastTakenVariant} from 'utility/common';

interface IProps {
    activeClient: TClient;
}

/**
 * RxCheckout Tab -- Displays the Medication Checkout grid and signature printout
 * @param {IProps} props - The props for this component
 */
const RxCheckout = (props: IProps) => {
    const activeClient = props.activeClient;
    const medicineList = props.activeClient.medicineList;

    if (activeClient === null) return null;
    const checkoutList = getCheckoutList(activeClient.drugLogList);

    const handleDigitalSignature = () => {
        alert('TODO: Handle Digital Signature');
    };

    const DrugRow = (medRecord: MedicineRecord): JSX.Element | null => {
        // No drug given then no render
        if (medRecord === null || !medRecord.Id) return null;

        // Figure out medicine field values
        const checkoutLogItem = checkoutList.find((checkoutItem) => checkoutItem.MedicineId === medRecord.Id);
        const updatedDate = checkoutLogItem?.Updated ? new Date(checkoutLogItem.Updated) : '';
        const fontWeight = checkoutLogItem ? 'bold' : undefined;
        const lastTaken = checkoutLogItem ? calculateLastTaken(medRecord.Id, [checkoutLogItem]) : null;
        const variant = getLastTakenVariant(lastTaken);
        const variantColor = getBsColor(variant);

        const handleEdit = (medRecord: MedicineRecord, checkoutLogItem: DrugLogRecord | undefined) => {
            alert(
                'todo: handle edit. Med: ' + JSON.stringify(medRecord) + ' Checkout: ' + JSON.stringify(checkoutLogItem)
            );
        };

        return (
            <tr
                key={medRecord.Id}
                id={`checkout-grid-row-${medRecord.Id}`}
                style={{color: variantColor, textDecoration: medRecord.Active ? undefined : 'line-through'}}
            >
                <td className="d-print-none" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        size="sm"
                        id={`checkout-grid-row-edit-btn-${medRecord.Id}`}
                        onClick={() => handleEdit(medRecord, checkoutLogItem)}
                    >
                        {checkoutLogItem ? 'Edit' : 'Checkout'}
                    </Button>
                </td>

                <td style={{verticalAlign: 'middle', fontWeight}}>
                    <span>{medRecord.Drug}</span> <span>{medRecord.Strength}</span>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {updatedDate ? getFormattedDate(updatedDate) : ''}
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {checkoutLogItem?.PillboxItemId && <span>{'💊 '}</span>} <b>{checkoutLogItem?.Notes}</b>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    <b>{checkoutLogItem?.Out}</b>
                </td>
            </tr>
        );
    };

    return (
        <>
            <ButtonGroup>
                <Button className="d-print-none" onClick={() => window.print()} size="sm">
                    Print
                </Button>

                <Button className="d-print-none ml-2" size="sm" onClick={() => handleDigitalSignature()}>
                    Digital Signature
                </Button>

                <Button
                    variant="outline-success"
                    className="d-print-none ml-3"
                    size="sm"
                    onClick={() => alert('todo: handle checkout all')}
                >
                    Checkout ALL
                </Button>
            </ButtonGroup>

            <Table style={{wordWrap: 'break-word'}} className="w-auto mt-2" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Drug</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Date/Time Stamp</span>
                        </th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Amount/Notes</span>
                        </th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Out</span>
                        </th>
                    </tr>
                </thead>
                <tbody>{medicineList.map((medicineRecord) => DrugRow(medicineRecord))}</tbody>
            </Table>
        </>
    );
};

export default RxCheckout;
