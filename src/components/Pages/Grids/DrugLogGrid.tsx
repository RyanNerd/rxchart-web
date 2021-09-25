import Button from 'react-bootstrap/Button';
import Table, {TableProps} from 'react-bootstrap/Table';
import React from 'reactn';
import {DrugLogRecord, MedicineRecord} from "types/RecordTypes";
import {
    calculateLastTaken,
    getBsColor,
    getFormattedDate,
    getLastTakenVariant,
    getObjectByProperty,
    isToday
} from "utility/common";

interface IProps extends TableProps {
    checkoutOnly?: boolean
    columns: string[]
    condensed?: string
    drugId?: number | null
    drugLog?: DrugLogRecord[]
    includeCheckout?: boolean
    medicineList?: MedicineRecord[]
    onDelete?: (e: React.MouseEvent<HTMLElement>, r: DrugLogRecord) => void
    onEdit?: (r: DrugLogRecord) => void
    [key: string]: any
}

/**
 * DrugLogGrid
 * @param {IProps} props
 * @return {JSX.Element}
 */
const DrugLogGrid = (props: IProps): JSX.Element => {
    const {
        columns,
        condensed = "false",
        drugId,
        drugLog = [],
        includeCheckout = true,
        medicineList = [],
        onDelete,
        onEdit
    } = props;

    const filteredDrugs = drugId ? drugLog.filter(drug => drug && drug.MedicineId === drugId) : drugLog;

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
        const createdDate = new Date(drug.Created || '');
        const updatedDate = new Date(drug.Updated || '');
        const lastTaken = calculateLastTaken(medicineId, [drug]);
        const variant = getLastTakenVariant(lastTaken);
        const variantColor = getBsColor(variant);
        const fontWeight = isToday(updatedDate) ? 'bold' : undefined;

        // If includeCheckout is false then suppress any rows where drug.Out >0 or drug.In > 0
        if (!includeCheckout && ((drug.Out && drug.Out >= 0) || (drug.In && drug.In >= 0) )) {
            return null;
        }

        return (
            <tr
                key={'druglog-grid-row-' + drug.Id}
                id={'druglog-grid-row-' + drug.Id}
                style={{color: variantColor}}
            >
                {onEdit &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        onClick={e => {
                            e.preventDefault();
                            onEdit(drug);
                        }}
                    >
                        Edit
                    </Button>
                </td>
                }

                {columns.includes('Drug') &&
                <td style={{verticalAlign: "middle", fontWeight}}>
                    <span>{drugName}</span> <span>{drugStrength}</span>
                </td>
                }
                {columns.includes('Created') &&
                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    {getFormattedDate(createdDate)}
                </td>
                }
                {columns.includes('Updated') &&
                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    {getFormattedDate(updatedDate)}
                </td>
                }
                {columns.includes('Notes')}
                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    <b>{drug.Notes}</b>
                </td>
                {columns.includes('Out') &&
                    <td style={{
                        textAlign: 'center',
                        verticalAlign: "middle",
                        fontWeight
                    }}>
                        <b>{drug.Out}</b>
                    </td>
                }
                {columns.includes('In') &&
                <td style={{
                    textAlign: 'center',
                    verticalAlign: "middle",
                    fontWeight
                }}>
                    <b>{drug.In}</b>
                </td>
                }
                {columns.includes('Details') &&
                    <td>
                        {drugDetails}
                    </td>
                }
                {onDelete &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"drug-grid-delete-btn-" + drug.Id}
                        variant="outline-danger"
                        onClick={e => onDelete(e, drug)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
                }
            </tr>
        );
    }

    return (
        <Table
            style={{wordWrap: "break-word"}}
            {...props}
            className={condensed !== 'false' ? 'w-auto' : ''}
            striped
            bordered
            hover
            size="sm"
        >
            <thead>
            <tr>
                {onEdit &&
                <th></th>
                }
                {columns.includes('Drug') &&
                <th>
                    Drug
                </th>
                }
                {columns.includes('Created') &&
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Created</span>
                </th>
                }
                {columns.includes('Updated') &&
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Updated</span>
                </th>
                }
                {columns.includes('Notes') &&
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Amount/Notes</span>
                </th>
                }
                {columns.includes('Out') &&
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Out</span>
                </th>
                }
                {columns.includes('In') &&
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>In</span>
                </th>
                }
                {columns.includes('Details') &&
                    <th>
                        Details
                    </th>
                }
                {onDelete &&
                <th></th>
                }
            </tr>
            </thead>
            <tbody>
            {(drugLog && drugLog.length && filteredDrugs) ?
                (
                    filteredDrugs.map(DrugRow)
                ) : (
                    <></>
                )
            }
            </tbody>
        </Table>
    )
}

export default DrugLogGrid;
