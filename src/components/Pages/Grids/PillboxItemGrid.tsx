import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table, {TableProps} from 'react-bootstrap/Table';
import {MedicineRecord, PillboxItemRecord} from "../../../types/RecordTypes";
import {BsColors, multiSort, randomString, SortDirection} from "../../../utility/common";
import {ButtonGroup, Dropdown} from "react-bootstrap";

interface IProps extends TableProps {
    [key: string]: any
    medicineList: MedicineRecord[]
    onEdit: ( r: PillboxItemRecord) => void
    pillboxId: number
    pillboxItemList: PillboxItemRecord[]
    residentId: number
}

type PillRowType = {
    Drug: string
    Id: number | null
    MedicineId: number
    PillboxId: number
    Quantity: number | null
    ResidentId: number
    Strength: string | null
}

/**
 * PillboxItemGrid
 * @param {IProps} props
 * @return {JSX.Element}
 */
const PillboxItemGrid = (props: IProps): JSX.Element | null => {
    const {
        medicineList,
        onEdit,
        pillboxId,
        pillboxItemList,
        residentId
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
                Drug: m.Drug,
                Id: pillboxItemRecord.Id,
                MedicineId: m.Id as number,
                PillboxId: pillboxId,
                Quantity: pillboxItemRecord.Quantity,
                ResidentId: residentId,
                Strength: m.Strength
            })
        } else {
            pillBuild.push({
                Drug: m.Drug,
                Id: null,
                MedicineId: m.Id as number,
                PillboxId: pillboxId,
                Quantity: 0,
                ResidentId: residentId,
                Strength: m.Strength
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
        const isInPillbox = !!(pill.Quantity && pill.Quantity > 0);
        const color = isInPillbox ? BsColors.success : undefined;
        const domId = pill.Id ? pill.Id : randomString();
        const fontStyle = isInPillbox ? undefined : 'italic';
        const fontWeight = isInPillbox ? 'bold' : undefined;
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
                        disabled={quantity === 0}
                        id={"pill-grid-inc-btn" + domId}
                        onClick={((e) => {
                            onEdit({
                                Id: pill.Id,
                                MedicineId: pill.MedicineId,
                                PillboxId: pill.PillboxId,
                                Quantity: quantity-1,
                                ResidentId: pill.ResidentId
                            });
                        })}
                        size="sm"
                        variant="info"
                    >
                        -
                    </Button>

                    <Dropdown as={ButtonGroup}
                        onSelect={k => {
                            onEdit({
                                Id: pill.Id,
                                MedicineId: pill.MedicineId,
                                PillboxId: pill.PillboxId,
                                Quantity: parseInt(k || "0"),
                                ResidentId: pill.ResidentId
                            });
                        }}
                    >
                        <Button
                            className="ml-2"
                            size="sm"
                            variant={isInPillbox ? 'success' : 'info'}
                        >
                            {pill.Quantity || "0"}
                        </Button>
                        <Dropdown.Toggle
                            split
                            variant={isInPillbox ? 'success' : 'info'}
                            id={"pill-grid-dropdown-" + domId}
                        />
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="0"  disabled={pill.Quantity === 0}>0</Dropdown.Item>
                            <Dropdown.Item eventKey="1"  disabled={pill.Quantity === 1}>1</Dropdown.Item>
                            <Dropdown.Item eventKey="2"  disabled={pill.Quantity === 2}>2</Dropdown.Item>
                            <Dropdown.Item eventKey="3"  disabled={pill.Quantity === 3}>3</Dropdown.Item>
                            <Dropdown.Item eventKey="4"  disabled={pill.Quantity === 4}>4</Dropdown.Item>
                            <Dropdown.Item eventKey="5"  disabled={pill.Quantity === 5}>5</Dropdown.Item>
                            <Dropdown.Item eventKey="6"  disabled={pill.Quantity === 6}>6</Dropdown.Item>
                            <Dropdown.Item eventKey="7"  disabled={pill.Quantity === 7}>7</Dropdown.Item>
                            <Dropdown.Item eventKey="8"  disabled={pill.Quantity === 8}>8</Dropdown.Item>
                            <Dropdown.Item eventKey="9"  disabled={pill.Quantity === 9}>9</Dropdown.Item>
                            <Dropdown.Item eventKey="10" disabled={pill.Quantity === 10}>10</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        className="ml-2"
                        id={"pill-grid-inc-btn" + domId}
                        onClick={((e) => {
                            onEdit({
                                Id: pill.Id,
                                PillboxId: pill.PillboxId,
                                ResidentId: pill.ResidentId,
                                MedicineId: pill.MedicineId,
                                Quantity: quantity + 1
                            });
                        })}
                        size="sm"
                        variant="info"
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
            bordered
            hover
            size="sm"
            striped
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
