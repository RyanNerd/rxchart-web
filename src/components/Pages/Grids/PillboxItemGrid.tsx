import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table, {TableProps} from 'react-bootstrap/Table';
import React from 'reactn';
import {PillboxItemRecord} from 'types/RecordTypes';
import {BsColor, randomString} from 'utility/common';
import {PillRowType} from './getPillboxItems';

interface IProps extends TableProps {
    [key: string]: unknown;
    onEdit: (r: PillboxItemRecord) => void;
    pillboxGridItems: PillRowType[];
}

/**
 * PillboxItemGrid
 * @param {IProps} props The props for this component
 * @returns {JSX.Element}
 */
const PillboxItemGrid = (props: IProps): JSX.Element | null => {
    const {pillboxGridItems, onEdit} = props;

    // No render if there isn't anything to render
    if (pillboxGridItems.length === 0) return null;

    /**
     * Child component for the table for each medicine in the pill box.
     * @returns {JSX.Element | null}
     * @param {PillRowType} pill The pill row object
     */
    const PillRow = (pill: PillRowType): JSX.Element | null => {
        const isInPillbox = !!(pill.Quantity && pill.Quantity > 0);
        const color = isInPillbox ? BsColor.success : undefined;
        const domId = pill.Id ? pill.Id : randomString();
        const fontStyle = isInPillbox ? undefined : 'italic';
        const fontWeight = isInPillbox ? 'bold' : undefined;
        const pillboxId = Math.abs(pill.PillboxId);
        const quantity = pill.Quantity || 0;

        return (
            <tr key={`pill-grid-row-${domId}`} id={`pill-grid-row-${domId}`}>
                <td style={{verticalAlign: 'middle', fontStyle, fontWeight, color}}>{pill.Drug}</td>
                <td style={{verticalAlign: 'middle', fontStyle, fontWeight, color}}>{pill.Strength}</td>
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        disabled={quantity === 0}
                        id={`pill-grid-inc-btn-${domId}`}
                        onClick={() => {
                            onEdit({
                                Id: pill.Id,
                                MedicineId: pill.MedicineId,
                                PillboxId: pillboxId,
                                Quantity: quantity - 1,
                                ResidentId: pill.ResidentId
                            });
                        }}
                        size="sm"
                        variant="info"
                    >
                        -
                    </Button>

                    <Dropdown
                        as={ButtonGroup}
                        onSelect={(k) => {
                            onEdit({
                                Id: pill.Id,
                                MedicineId: pill.MedicineId,
                                PillboxId: pillboxId,
                                Quantity: parseInt(k || '0'),
                                ResidentId: pill.ResidentId
                            });
                        }}
                    >
                        <Button
                            className="ml-2"
                            onClick={(e) => e.stopPropagation()}
                            size="sm"
                            variant={isInPillbox ? 'success' : 'info'}
                        >
                            {pill.Quantity || '0'}
                        </Button>
                        <Dropdown.Toggle
                            id={`pill-grid-dropdown-${domId}`}
                            split
                            variant={isInPillbox ? 'success' : 'info'}
                        />
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="0" disabled={pill.Quantity === 0}>
                                0
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="1" disabled={pill.Quantity === 1}>
                                1
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2" disabled={pill.Quantity === 2}>
                                2
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" disabled={pill.Quantity === 3}>
                                3
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="4" disabled={pill.Quantity === 4}>
                                4
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="5" disabled={pill.Quantity === 5}>
                                5
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        className="ml-2"
                        id={`pill-grid-inc-btn-${domId}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit({
                                Id: pill.Id,
                                PillboxId: pillboxId,
                                ResidentId: pill.ResidentId,
                                MedicineId: pill.MedicineId,
                                Quantity: quantity + 1
                            });
                        }}
                        size="sm"
                        variant="info"
                    >
                        +
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <Table style={{wordWrap: 'break-word'}} {...props} bordered hover size="sm" striped>
            <thead>
                <tr>
                    <th>Drug</th>
                    <th>Strength</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>QTY</th>
                </tr>
            </thead>
            <tbody>{pillboxGridItems.map((p) => PillRow(p))}</tbody>
        </Table>
    );
};

export default PillboxItemGrid;
