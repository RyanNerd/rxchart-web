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

/**
 * Checkout Grid
 * @param {IProps} props
 * @return {JSX.Element}
 */
const CheckoutGrid = (props: IProps): JSX.Element => {
    const {drugId, drugLog = [], medicineList = []} = props;

    const filteredDrugs = drugId ? drugLog.filter((drug) => drug && drug.MedicineId === drugId) : drugLog;

    /**
     * Returns the value of the drug column for the given drugId
     * @param {number} medicineId
     * @param {string} columnName
     * @returns {string | null}
     */
    const drugColumnLookup = (medicineId: number, columnName: string): string | null => {
        if (medicineId) {
            const medicine = getObjectByProperty<MedicineRecord>(medicineList, 'Id', medicineId);
            if (medicine) {
                return medicine[columnName];
            }
        }
        return null;
    };

    /**
     * Child component for the table for each drug that has been logged.
     * @param {DrugLogRecord} drug
     * @returns {JSX.Element | null}
     */
    const DrugRow = (drug: DrugLogRecord): JSX.Element | null => {
        // No drug given then no render
        if (drug === null || !drug.Id) {
            return null;
        }

        // Figure out medicine field values
        const isOtc = drugColumnLookup(drug.MedicineId, 'OTC');
        let drugName = drugColumnLookup(drug.MedicineId, 'Drug');

        if (!drugName || drugName.length === 0) {
            drugName = 'UNKNOWN - Medicine removed!';
        }

        const medicineId = drug.MedicineId;
        const drugStrength = drugColumnLookup(medicineId, 'Strength');
        const updatedDate = new Date(drug.Updated || '');
        const lastTaken = calculateLastTaken(medicineId, [drug]);
        const variant = getLastTakenVariant(lastTaken);
        const variantColor = getBsColor(variant);
        const fontWeight = isToday(updatedDate) ? 'bold' : undefined;

        return (
            <tr key={drug.Id} id={'checkout-grid-row-' + drug.Id} style={{color: variantColor}}>
                <td style={{verticalAlign: 'middle', fontWeight}}>
                    <span>{drugName}</span> <span>{drugStrength}</span> <span>{isOtc ? ' (OTC)' : ''}</span>
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

    return (
        <Table style={{wordWrap: 'break-word'}} {...props} className={'w-auto'} striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Drug</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <span>Updated</span>
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
