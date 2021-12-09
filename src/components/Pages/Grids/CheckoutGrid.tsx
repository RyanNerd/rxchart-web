import Table, {TableProps} from 'react-bootstrap/Table';
import React from 'reactn';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {
    calculateLastTaken,
    getBsColor,
    getFormattedDate,
    getLastTakenVariant,
    getObjectByProperty,
    isToday
} from 'utility/common';

interface IProps extends TableProps {
    drugId: number | null;
    drugLog: DrugLogRecord[];
    medicineList: MedicineRecord[];
}

interface ITableProps extends TableProps {
    drugId: unknown;
    drugLog: unknown;
    medicineList: unknown;
}

/**
 * Checkout Grid
 * @param {IProps} props The props for this component
 */
const CheckoutGrid = (props: IProps): JSX.Element => {
    const {drugId, drugLog = [], medicineList = []} = props;
    const filteredDrugs = drugId ? drugLog.filter((drug) => drug && drug.MedicineId === drugId) : drugLog;

    /**
     * Returns the value of the drug column for the given drugId
     * @param {number} medicineId The PK of the Medicine table
     * @param {string} columnName The name of the column to search
     * @returns {string | number | null} The MedicineRecord column value if found, otherwise null
     */
    const drugColumnLookup = (medicineId: number, columnName: string): unknown => {
        if (medicineId) {
            const medicine = getObjectByProperty<MedicineRecord>(medicineList, 'Id', medicineId);
            if (medicine) return medicine[columnName];
        }
        return null;
    };

    /**
     * Child component for the table for each drug that has been logged.
     * @param {DrugLogRecord} drug The drugLog record object
     */
    const DrugRow = (drug: DrugLogRecord): JSX.Element | null => {
        // No drug given then no render
        if (drug === null || !drug.Id) return null;

        // Figure out medicine field values
        const medicineId = drug.MedicineId;
        let drugName = drugColumnLookup(medicineId, 'Drug') as string | null;
        if (!drugName || drugName.length === 0) drugName = 'UNKNOWN - Medicine removed!';
        const active = drugColumnLookup(medicineId, 'Active');
        const drugStrength = drugColumnLookup(medicineId, 'Strength') as string | null;
        const updatedDate = new Date(drug.Updated || '');
        const fontWeight = isToday(updatedDate) ? 'bold' : undefined;
        const lastTaken = calculateLastTaken(medicineId, [drug]);
        const variant = getLastTakenVariant(lastTaken);
        const variantColor = getBsColor(variant);

        return (
            <tr
                key={drug.Id}
                id={`checkout-grid-row-${drug.Id}`}
                style={{color: variantColor, textDecoration: active ? undefined : 'line-through'}}
            >
                <td style={{verticalAlign: 'middle', fontWeight}}>
                    <span>{drugName}</span> <span>{drugStrength}</span>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {getFormattedDate(updatedDate)}
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {drug.PillboxItemId && <span>{'💊 '}</span>} <b>{drug.Notes}</b>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    <b>{drug.Out}</b>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    <b>{drug.In}</b>
                </td>
            </tr>
        );
    };

    const tableProps = {...(props as ITableProps)};
    delete tableProps.drugId;
    delete tableProps.drugLog;
    delete tableProps.medicineList;

    return (
        <Table style={{wordWrap: 'break-word'}} {...tableProps} className={'w-auto'} striped bordered hover size="sm">
            <thead>
                <tr>
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
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <span>In</span>
                    </th>
                </tr>
            </thead>
            <tbody>{drugLog && drugLog.length && filteredDrugs ? filteredDrugs.map(DrugRow) : <></>}</tbody>
        </Table>
    );
};

export default CheckoutGrid;
