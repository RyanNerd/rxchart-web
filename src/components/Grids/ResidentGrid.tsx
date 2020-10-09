import React from 'reactn';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Table from 'react-bootstrap/Table';
import {DOB, getMDY} from "../../utility/common";
import {ResidentRecord} from "../../types/RecordTypes";

interface IProps {
    onSelected?: Function,
    onEdit?: Function,
    onDelete?: Function,
    activeResident: ResidentRecord | null,
    residentList: Array<ResidentRecord>
}

/**
 * ResidentGrid component
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const ResidentGrid = (props: IProps): JSX.Element => {
    const {
        onSelected,
        onEdit,
        onDelete,
        activeResident,
        residentList
    } = props;

    /**
     * Resident Child Table Component
     *
     * @param {object} resident Resident record object
     * @returns {null | ResidentRow}
     * @constructor
     */
    const ResidentRow = (resident: ResidentRecord) => {
        // Get formatted DOB
        const dob = DOB(resident);

        // Determine if this row is selected [for radio ToggleButtons]
        const isSelected = onSelected && activeResident && resident.Id === activeResident.Id;
        const mdy = getMDY();
        const created = resident.Created || mdy.now;
        const updated = resident.Updated || mdy.now;
        // const fontStyle = isSelected ? 'bold' : 'italic';

        return (
            <tr
                key={'resident-grid-row-' + resident.Id}
                id={'resident-grid-row-' + resident.Id}
            >
                {onSelected &&
                    <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <ToggleButton
                            id={"resident-grid-select-btn-" + resident.Id}
                            type="radio"
                            name="resident-list"
                            variant="outline-info"
                            checked={isSelected || false}
                            onClick={(e) => onSelected(e, resident)}
                            value={resident.Id}
                        />
                    </td>
                }

                {isSelected ?
                    (
                        <>
                        <td style={{verticalAlign: "middle"}}><b>{resident.LastName}</b></td>
                        <td style={{verticalAlign: "middle"}}><b>{resident.FirstName}</b></td>
                        <td style={{verticalAlign: "middle"}}><b>{dob}</b></td>
                        <td style={{verticalAlign: "middle"}}><b>{created}</b></td>
                        <td style={{verticalAlign: "middle"}}><b>{updated}</b></td>
                        </>
                    ) : (
                        <>
                        <td style={{verticalAlign: "middle"}}>{resident.LastName}</td>
                        <td style={{verticalAlign: "middle"}}>{resident.FirstName}</td>
                        <td style={{verticalAlign: "middle"}}>{dob}</td>
                        <td style={{verticalAlign: "middle"}}>{created}</td>
                        <td style={{verticalAlign: "middle"}}>{updated}</td>
                        </>
                    )
                }

                {onEdit &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"resident-grid-edit-btn-" + resident.Id}
                        onClick={(e) => onEdit(e, resident)}
                    >
                        Edit
                    </Button>
                </td>
                }

                {onDelete && !resident.deleted_at &&
                    <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <Button
                            size="sm"
                            id={"resident-grid-delete-btn-" + resident.Id}
                            variant="outline-danger"
                            onClick={(e) => onDelete(e, resident)}
                        >
                            <span role="img" aria-label="delete">🗑️</span>
                        </Button>
                    </td>
                }
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm" className="w-auto">
            <thead>
            <tr>
                {onSelected &&
                    <th>Selected</th>
                }
                <th>
                    <span>Last Name</span>
                </th>
                <th>
                    <span>First Name</span>
                </th>
                <th>
                    <span>DOB</span>
                </th>
                <th>
                    <span>Created</span>
                </th>
                <th>
                    <span>Activated</span>
                </th>
                {onEdit &&
                    <th/>
                }
                {onDelete &&
                    <th/>
                }
            </tr>
            </thead>
            <tbody>
                {residentList && residentList.length > 0 && residentList.map(ResidentRow)}
            </tbody>
        </Table>
    );
}

export default ResidentGrid;
