import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table, {TableProps} from 'react-bootstrap/Table';
import {MedicineRecord, PillboxItemRecord} from "../../../types/RecordTypes";

interface IProps extends TableProps {
    [key: string]: any
    pillboxId: number
    residentId: number
    medicineList: MedicineRecord[]
    pillboxItemList: PillboxItemRecord[]
    onDelete: (e: React.MouseEvent<HTMLElement>, r: PillboxItemRecord) => void
    onEdit: (e: React.MouseEvent<HTMLElement>, r: PillboxItemRecord) => void
}

type PillRowType = {
    Id: number
    ResidentId: number
    PillboxId: number
    MedicineId: number
    Drug: string
    Strength: string
    Quantity: number
}

/**
 * PillboxItemGrid
 * @param {IProps} props
 * @return {JSX.Element}
 */
const PillboxItemGrid = (props: IProps): JSX.Element | null => {
    const {
        pillboxId,
        residentId,
        pillboxItemList,
        medicineList,
        onDelete,
        onEdit
    } = props;

    // No render if there isn't anything to render
    if (!pillboxItemList || pillboxItemList.length === 0) {
        return null;
    }

    /**
     * Returns {MedicineRecord[]}
     */
    // Get a list of MedicineRecords for each pillboxItem
    const pillMedList = medicineList.filter((medicine: MedicineRecord) => {
        return pillboxItemList.some((pir) => {
            return medicine.Id === pir.MedicineId;
        });
    });

    if (!pillMedList || pillMedList.length === 0) {
        return null;
    }

    // Build out pills<PillRowType>[]
    const pills = [] as PillRowType[];
    pillMedList.forEach((m) => {
        // TODO: Use find here instead of filter / or figure out a better way of doing this
        const pillRecords = pillboxItemList.filter((r) => r.MedicineId === m.Id);
        if (pillRecords.length === 1) {
            const pillRecord = pillRecords[0];
            pills.push({
                Id: pillRecord.Id as number,
                PillboxId: pillboxId,
                ResidentId: residentId,
                MedicineId: m.Id as number,
                Drug: m.Drug,
                Strength: m.Strength as string,
                Quantity: pillRecord.Quantity
            })
        }
    });

    /**
     * Child component for the table for each medicine in the pill box.
     * @returns {JSX.Element | null}
     * @param pill
     */
    const PillRow = (pill: PillRowType): JSX.Element | null => {
        // No medicine record given then no render
        if (pill === null || !pill.Id) {
            return null;
        }

        return (
            <tr
                key={'pill-grid-row-' + pill.Id}
                id={'pill-grid-row-' + pill.Id}
            >
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        id={"pill-grid-edit-btn" + pill.Id}
                        size="sm"
                        onClick={((e) => {
                            onEdit(e, {
                                Id: pill.Id,
                                PillboxId: pill.PillboxId,
                                ResidentId: pill.ResidentId,
                                MedicineId: pill.MedicineId,
                                Quantity: pill.Quantity
                            });
                        })}
                    >
                        Edit
                    </Button>
                </td>

                <td>
                    {pill.Drug}
                </td>

                <td>
                    {pill.Strength}
                </td>

                <td>
                    {pill.Quantity}
                </td>

                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"pill-grid-delete-btn-" + pill.Id}
                        variant="outline-danger"
                        onClick={e => onDelete(e, pill)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
            </tr>
        );
    }

    return (
        <Table
            style={{wordWrap: "break-word"}}
            {...props}
            striped
            bordered
            hover
            size="sm"
        >
            <thead>
            <tr>
                <th>{/*Edit*/}</th>
                <th>Drug</th>
                <th>Strength</th>
                <th>Quantity</th>
                <th>{/*Delete*/}</th>
            </tr>
            </thead>
            <tbody>
            {pills.map((p) =>PillRow(p))}
            </tbody>
        </Table>
    )
}

export default PillboxItemGrid;
