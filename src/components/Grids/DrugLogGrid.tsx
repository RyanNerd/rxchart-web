import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {DrugLogRecord, MedicineRecord} from "../../types/RecordTypes";
import {
    calculateLastTaken, getBsColor,
    getFormattedDate,
    getLastTakenVariant,
    getObjectByProperty, isToday
} from "../../utility/common";

interface IProps {
    drugLog?: DrugLogRecord[] | null,
    onEdit?: (e: React.MouseEvent<HTMLElement>, r: DrugLogRecord)=>void,
    onDelete?: (e: React.MouseEvent<HTMLElement>, r: DrugLogRecord)=>void,
    drugId?: number | null,
    medicineList?: MedicineRecord[] | null,
    otcList?: MedicineRecord[] | null,
    condensed?: string,
    columns?: string[]
}

/**
 * DrugLogGrid
 *
 * @param {IProps} props
 * @return {JSX.Element}
 * @constructor
 */
const DrugLogGrid = (props: IProps): JSX.Element => {
    const {
        drugLog,
        onEdit,
        onDelete,
        drugId,
        medicineList,
        otcList,
        condensed = "false",
        columns = ['Created', 'Updated', 'Amount']
    } = props;

    // If there are no drugs logged then return a generic table to keep the UI layout consistant
    if (!drugLog || drugLog.length === 0) {
        return <Table
            size="sm"
            style={{tableLayout: "fixed"}}
        >
            <thead>
            <tr>
                <th style={{textAlign: "center"}}>
                    <span>No Medications Logged</span>
                </th>
            </tr>
            </thead>
        </Table>;
    }

    const filteredDrugs = drugId && drugLog ? drugLog.filter(drug => drug && drug.MedicineId === drugId) : drugLog;

    /**
     * Returns the value of the drug column for the given drugId
     *
     * @param {number} drugId
     * @param {string} columnName
     * @returns {any}
     */
    const drugColumnLookup = (drugId: number, columnName: string): any => {
        if (medicineList && drugId) {
            const medicine = getObjectByProperty(medicineList, 'Id', drugId) as MedicineRecord;
            if (medicine) {
                return medicine[columnName];
            }
        }

        if (otcList && drugId) {
            const otc = getObjectByProperty(otcList, 'Id', drugId) as MedicineRecord;
            if (otc) {
                return otc[columnName];
            }
        }
        return null;
   }

    /**
     * Child component for the table for each drug that has been logged.
     *
     * @param {DrugLogRecord} drug
     * @returns {JSX.Element | null}
     */
    const DrugRow = (drug: DrugLogRecord): JSX.Element | null =>
    {
        // No drug given then no render
        if (drug === null || !drug.Id) {
            return null;
        }

        let drugName = drugColumnLookup(drug.MedicineId, 'Drug');
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

        return <tr
            key={'druglog-grid-row-' + drug.Id}
            id={'druglog-grid-row-' + drug.Id}
            style={{color: variantColor}}
        >
            {onEdit &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        onClick={e => onEdit(e, drug)}
                    >
                        Edit
                    </Button>
                </td>
            }

            {columns.includes('Drug') &&
            <td style={{verticalAlign: "middle", fontWeight: fontWeight}}>
                <span>{drugName}</span> <span>{drugStrength}</span>
            </td>
            }
            <td style={{
                textAlign: 'center',
                verticalAlign: "middle",
                fontWeight: fontWeight
            }}>
                {getFormattedDate(createdDate)}
            </td>
            <td style={{
                textAlign: 'center',
                verticalAlign: "middle",
                fontWeight: fontWeight
            }}>
                {getFormattedDate(updatedDate)}
            </td>
            <td style={{
                textAlign: 'center',
                verticalAlign: "middle",
                fontWeight: fontWeight
            }}>
                <b>{drug.Notes}</b>
            </td>

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
        </tr>;
    };

    return (
        <Table
            className={condensed !== 'false' ? 'w-auto' : ''}
            striped
            bordered
            hover
            size="sm"
            style={{tableLayout: "fixed", wordWrap: "break-word"}}
        >
            <thead>
                <tr>
                    {onEdit &&
                        <th> </th>
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
                    {columns.includes('Amount') &&
                    <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <span>Amount</span>
                    </th>
                    }
                    {onDelete &&
                        <th> </th>
                    }
                </tr>
            </thead>
            <tbody>
                {drugLog && drugLog.length && filteredDrugs.map(DrugRow)}
            </tbody>
        </Table>
    )
}

export default DrugLogGrid;
