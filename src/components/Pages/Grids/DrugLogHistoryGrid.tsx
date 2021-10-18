import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {DrugLogRecord, MedicineRecord} from "types/RecordTypes";
import {
    calculateLastTaken,
    getBsColor,
    getFormattedDate,
    getLastTakenVariant,
    getObjectByProperty,
    isToday, T_BS_Colors
} from "utility/common";

interface IProps {
    drugLog: DrugLogRecord[]
    medicineList: MedicineRecord[]
    onDelete: (r: DrugLogRecord) => void
    onEdit: (r: DrugLogRecord) => void
}

/**
 * DrugLogHistoryGrid
 * @param {IProps} props
 * @return {JSX.Element}
 */
const DrugLogHistoryGrid = (props: IProps): JSX.Element => {
    const {
        drugLog = [],
        medicineList = [],
        onDelete,
        onEdit
    } = props;

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
    }

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
        const medicineNotes = drugColumnLookup(drug.MedicineId, 'Notes');
        const medicineDirections = drugColumnLookup(drug.MedicineId, 'Directions');
        const drugDetails =
            medicineNotes && medicineNotes.trim().length >0
                ?
                medicineNotes
                :
                medicineDirections || '';

        if (!drugName || drugName.length === 0) {
            drugName = 'UNKNOWN - Medicine removed!';
        }

        const medicineId = drug.MedicineId;
        const drugStrength = drugColumnLookup(medicineId, 'Strength');
        const updatedDate = new Date(drug.Updated || '');
        const lastTaken = calculateLastTaken(medicineId, [drug]);
        const variant = getLastTakenVariant(lastTaken) as T_BS_Colors;
        const variantColor = getBsColor(variant);
        const fontWeight = isToday(updatedDate) ? 'bold' : undefined;

        return (
            <tr
                key={'druglog-history-grid-row-' + drug.Id}
                id={'druglog-history-grid-row-' + drug.Id}
                style={{color: variantColor}}
            >
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        className="d-print-none"
                        size="sm"
                        onClick={() => onEdit(drug)}
                    >
                        Edit
                    </Button>
                </td>

                <td style={{verticalAlign: "middle", fontWeight}}>
                    <span>{drugName}</span> <span>{drugStrength}</span> <span>{isOtc ? " (OTC)" : ""}</span>
                </td>

                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    {getFormattedDate(updatedDate)}
                </td>

                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    <b>{drug.Notes}</b>
                </td>

                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    <b>{drug.Out}</b>
                </td>

                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    <b>{drug.In}</b>
                </td>

                <td>
                    {drugDetails}
                </td>

                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        className="d-print-none"
                        size="sm"
                        id={"drug-grid-delete-btn-" + drug.Id}
                        variant="outline-danger"
                        onClick={() => onDelete(drug)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>

            </tr>
        )
    }

    return (
        <Table
            style={{wordWrap: "break-word"}}
            striped
            bordered
            hover
            size="sm"
        >
            <thead>
                <tr>
                    <th></th>

                    <th>
                        Drug
                    </th>

                    <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <span>Taken</span>
                    </th>

                    <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <span>Amount/Notes</span>
                    </th>

                    <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <span>Out</span>
                    </th>

                    <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <span>In</span>
                    </th>

                    <th>
                        Details
                    </th>

                    <th></th>
                </tr>
            </thead>

            <tbody>
                {drugLog.map(DrugRow)}
            </tbody>
        </Table>
    )
}

export default DrugLogHistoryGrid;
