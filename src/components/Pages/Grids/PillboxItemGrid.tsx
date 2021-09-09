import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table, {TableProps} from 'react-bootstrap/Table';
import {MedicineRecord, PillboxItemRecord} from "../../../types/RecordTypes";
import {multiSort, randomString, SortDirection} from "../../../utility/common";

interface IProps extends TableProps {
    [key: string]: any
    pillboxId: number
    residentId: number
    medicineList: MedicineRecord[]
    pillboxItemList: PillboxItemRecord[]
    onEdit: (e: React.MouseEvent<HTMLElement>, r: PillboxItemRecord) => void
}

type PillRowType = {
    Id: number | null
    ResidentId: number
    PillboxId: number
    MedicineId: number
    Drug: string
    Strength: string
    Quantity: number | null
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
        onEdit
    } = props;

    // No render if there isn't anything to render
    if (medicineList.length === 0) {
        return null;
    }

    // Build out pills<PillRowType>[]
    const pillBuild = [] as PillRowType[];
    medicineList.forEach((m) => {
        const pillboxItemRecord = pillboxItemList.find((r) => r.MedicineId === m.Id);
        if (pillboxItemRecord) {
            pillBuild.push({
                Id: pillboxItemRecord.Id as number,
                PillboxId: pillboxId,
                ResidentId: residentId,
                MedicineId: m.Id as number,
                Drug: m.Drug,
                Strength: m.Strength as string,
                Quantity: pillboxItemRecord.Quantity
            })
        } else {
            pillBuild.push({
                Id: null,
                PillboxId: pillboxId,
                ResidentId: residentId,
                MedicineId: m.Id as number,
                Drug: m.Drug,
                Strength: m.Strength as string,
                Quantity: 0
            })
        }
    });

    // @ts-ignore multiSort isn't currently generic so the first argument throws:
    //      TS2345: Argument of type 'PillRowType[]' is not assignable to parameter of type '[]'.
    //      Target allows only 0 element(s) but source may have more.
    // @fixme: see above
    const pills = multiSort(pillBuild, {Quantity: SortDirection.asc, Drug: SortDirection.desc});

    /**
     * Child component for the table for each medicine in the pill box.
     * @returns {JSX.Element | null}
     * @param pill
     */
    const PillRow = (pill: PillRowType): JSX.Element | null => {
        const domId = pill.Id ? pill.Id : randomString();
        const isInPillbox = !!(pill.Quantity && pill.Quantity > 0);
        const fontWeight = isInPillbox ? 'bold' : undefined;
        const fontStyle = isInPillbox ? undefined : 'italic';
        const color = isInPillbox ? '#28a745' : undefined;
        const quantity = pill.Quantity || 0;

        return (
            <tr
                key={'pill-grid-row-' + domId}
                id={'pill-grid-row-' + domId}
            >
                <td style={{verticalAlign: "middle", fontStyle, fontWeight, color}}>
                    {pill.Drug}
                </td>

                <td style={{verticalAlign: "middle", fontStyle, fontWeight, color}}>
                    {pill.Strength}
                </td>

                <td style={{textAlign: 'center', verticalAlign: "middle"}}>

                    <Button
                        id={"pill-grid-inc-btn" + domId}
                        size="sm"
                        variant="info"
                        disabled={quantity === 0}
                        onClick={((e) => {
                            onEdit(e, {
                                Id: pill.Id,
                                PillboxId: pill.PillboxId,
                                ResidentId: pill.ResidentId,
                                MedicineId: pill.MedicineId,
                                Quantity: quantity-1
                            });
                        })}
                    >
                        -
                    </Button>

                    <Button
                        id={"pill-grid-edit-btn" + domId}
                        size="sm"
                        variant={isInPillbox ? 'success' : 'info'}
                        className="ml-2"
                        onClick={((e) => {
                            onEdit(e, {
                                Id: pill.Id,
                                PillboxId: pill.PillboxId,
                                ResidentId: pill.ResidentId,
                                MedicineId: pill.MedicineId,
                                Quantity: quantity
                            });
                        })}
                    >
                        {pill.Quantity || '0'}
                    </Button>

                    <Button
                        id={"pill-grid-inc-btn" + domId}
                        size="sm"
                        variant="info"
                        className="ml-2"
                        onClick={((e) => {
                            onEdit(e, {
                                Id: pill.Id,
                                PillboxId: pill.PillboxId,
                                ResidentId: pill.ResidentId,
                                MedicineId: pill.MedicineId,
                                Quantity: quantity + 1
                            });
                        })}
                    >
                        +
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
                <th>Drug</th>
                <th>Strength</th>
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>QTY</th>
            </tr>
            </thead>
            <tbody>
            {pills.map((p) =>PillRow(p))}
            </tbody>
        </Table>
    )
}

export default PillboxItemGrid;
