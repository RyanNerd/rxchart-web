import PillPopover from 'components/Pages/Grids/PillPopover';
import Button from 'react-bootstrap/Button';
import Table, {TableProps} from 'react-bootstrap/Table';
import React from 'reactn';
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {
    calculateLastTaken,
    deconstructGridLists,
    getBsColor,
    getFormattedDate,
    getLastTakenVariant,
    getObjectByProperty,
    isToday
} from 'utility/common';

export interface IGridLists {
    drugLogList?: DrugLogRecord[];
    medicineList?: MedicineRecord[];
    pillboxItemList?: PillboxItemRecord[];
    pillboxList?: PillboxRecord[];
}

interface IProps extends TableProps {
    checkoutOnly?: boolean;
    columns: string[];
    condensed?: string;
    drugId?: number | null;
    gridLists: IGridLists;
    onDelete?: (r: DrugLogRecord) => void;
    onEdit?: (r: DrugLogRecord) => void;
    onPillClick?: (n: number) => void;
}

/**
 * DrugLogGrid
 * @param {IProps} props The props for this component
 * @returns {JSX.Element}
 */
const DrugLogGrid = (props: IProps): JSX.Element => {
    const {columns, condensed = 'false', drugId, onDelete, onEdit, gridLists, onPillClick} = props;
    const {drugLogList, medicineList, pillboxList, pillboxItemList} = deconstructGridLists(gridLists);
    const filteredDrugs = drugId ? drugLogList.filter((drug) => drug && drug.MedicineId === drugId) : drugLogList;

    /**
     * Returns the value of the drug column for the given drugId
     * @param {number} medicineId The PK of the Medicine table
     * @param {string} columnName The name of the column to look up
     * @returns {string | null}
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
     * @returns {JSX.Element | null}
     */
    const DrugRow = (drug: DrugLogRecord): JSX.Element | null => {
        // No drug given then no render
        if (drug === null || !drug.Id) return null;

        // Figure out medicine field values
        const medicineId = drug.MedicineId;
        const isOtc = drugColumnLookup(medicineId, 'OTC');
        let drugName = drugColumnLookup(medicineId, 'Drug') as string | null;
        if (!drugName || drugName.length === 0) drugName = 'UNKNOWN - Medicine removed!';
        const active = drugColumnLookup(medicineId, 'Active');
        const medicineNotes = drugColumnLookup(medicineId, 'Notes') as string | null;
        const medicineDirections = drugColumnLookup(medicineId, 'Directions');
        const drugDetails = (
            medicineNotes && medicineNotes.trim().length > 0 ? medicineNotes : medicineDirections || ''
        ) as string | null;
        const createdDate = new Date(drug.Created || '');
        const drugStrength = drugColumnLookup(medicineId, 'Strength') as string | null;
        const updatedDate = new Date(drug.Updated || '');
        const fontWeight = isToday(updatedDate) ? 'bold' : undefined;
        const lastTaken = calculateLastTaken(medicineId, [drug]);
        const variant = getLastTakenVariant(lastTaken);
        const variantColor = getBsColor(variant);

        return (
            <tr
                key={`druglog-grid-row-${drug.Id}`}
                id={`druglog-grid-row-${drug.Id}`}
                style={{color: variantColor, textDecoration: !active ? 'line-through' : undefined}}
            >
                {onEdit && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <Button onClick={() => onEdit(drug)} size="sm">
                            Edit
                        </Button>
                    </td>
                )}
                {columns.includes('Drug') && (
                    <td style={{verticalAlign: 'middle', fontWeight}}>
                        <span>{drugName}</span> <span>{drugStrength}</span> <span>{isOtc ? ' (OTC)' : ''}</span>
                    </td>
                )}
                {columns.includes('Created') && (
                    <td
                        style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontWeight
                        }}
                    >
                        {getFormattedDate(createdDate)}
                    </td>
                )}
                {(columns.includes('Updated') || columns.includes('Taken')) && (
                    <td
                        style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontWeight
                        }}
                    >
                        {getFormattedDate(updatedDate)}
                    </td>
                )}
                {columns.includes('Notes')}
                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {drug.PillboxItemId && (
                        <span>
                            <PillPopover
                                id={drug.Id as number}
                                onPillClick={(n) => onPillClick?.(n)}
                                pillboxItemId={drug.PillboxItemId}
                                pillboxItemList={pillboxItemList}
                                pillboxList={pillboxList}
                            />
                        </span>
                    )}{' '}
                    <b>{drug.Notes}</b>
                </td>
                {columns.includes('Out') && (
                    <td
                        style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontWeight
                        }}
                    >
                        <b>{drug.Out}</b>
                    </td>
                )}
                {columns.includes('In') && (
                    <td
                        style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            fontWeight
                        }}
                    >
                        <b>{drug.In}</b>
                    </td>
                )}
                {columns.includes('Details') && <td>{drugDetails}</td>}
                {onDelete && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <Button
                            id={`drug-grid-delete-btn-${drug.Id}`}
                            onClick={() => onDelete(drug)}
                            size="sm"
                            variant="outline-danger"
                        >
                            <span role="img" aria-label="delete">
                                🗑️
                            </span>
                        </Button>
                    </td>
                )}
            </tr>
        );
    };

    return (
        <Table
            style={{wordWrap: 'break-word'}}
            {...props}
            bordered
            className={condensed !== 'false' ? 'w-auto' : ''}
            hover
            size="sm"
            striped
        >
            <thead>
                <tr>
                    {onEdit && <th></th>}
                    {columns.includes('Drug') && <th>Drug</th>}
                    {columns.includes('Created') && (
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Created</span>
                        </th>
                    )}
                    {columns.includes('Updated') && (
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Updated</span>
                        </th>
                    )}
                    {columns.includes('Taken') && (
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Taken</span>
                        </th>
                    )}
                    {columns.includes('Notes') && (
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Amount/Notes</span>
                        </th>
                    )}
                    {columns.includes('Out') && (
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Out</span>
                        </th>
                    )}
                    {columns.includes('In') && (
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>In</span>
                        </th>
                    )}
                    {columns.includes('Details') && <th>Details</th>}
                    {onDelete && <th></th>}
                </tr>
            </thead>
            <tbody>{drugLogList && drugLogList.length && filteredDrugs ? filteredDrugs.map(DrugRow) : <></>}</tbody>
        </Table>
    );
};

export default DrugLogGrid;
