import React from 'reactn';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Table from 'react-bootstrap/Table';
import {DOB} from "../../utility/common";
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
 * @param props {
 *          onEdit: (MouseEvent, object),
 *          onSelected(MouseEvent, object)}
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

                <td style={{verticalAlign: "middle"}}>{resident.LastName}</td>
                <td style={{verticalAlign: "middle"}}>{resident.FirstName}</td>
                <td style={{verticalAlign: "middle"}}>{dob}</td>

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
