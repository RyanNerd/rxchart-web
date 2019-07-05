import React, {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Table from 'react-bootstrap/Table';
import {DOB} from "../../utility/common";

/**
 * ResidentGrid component
 *
 * @param props :
 *          onEdit(e, resident) Callback when edit button clicked
 *          onSelected(e, resident) Callback when selected toggle button clicked
 *          activeResidentId {int} The currently selected resident Id
 * @returns {*}
 * @constructor
 */
export default function ResidentGrid(props) {
    // Get residentsList[] from the global store
    const [ residentList ] = useGlobal('residentList');

    /**
     * Resident Child Table Component
     *
     * @param {object} resident Resident record object
     * @returns {null | ResidentRow}
     * @constructor
     */
    const ResidentRow = (resident) => {
        // Get formatted DOB
        const dob = DOB(resident);

        // Determine if this row is selected [for radio ToggleButtons]
        const isSelected = props.onSelected && props.activeResident && resident.Id === props.activeResident.Id;

        return (
            <tr
                key={'resident-grid-row-' + resident.Id}
                id={'resident-grid-row-' + resident.Id}
            >
                {props.onSelected &&
                    <td>
                        <ToggleButton
                            id={"resident-grid-select-btn-" + resident.Id}
                            type="radio"
                            name="resident-list"
                            variant="outline-info"
                            checked={isSelected}
                            onClick={(e) => props.onSelected(e, resident)}
                        />
                    </td>
                }

                {props.onEdit &&
                    <td>
                        <Button
                            size="sm"
                            id={"resident-grid-edit-btn-" + resident.Id}
                            onClick={(e) => props.onEdit(e, resident)}
                        >
                            Edit
                        </Button>
                    </td>
                }

                <td>{resident.FirstName}</td>
                <td>{resident.LastName}</td>
                <td>{dob}</td>

                {props.onDelete &&
                    <td>
                        <Button
                            size="sm"
                            id={"resident-grid-delete-btn-" + resident.Id}
                            variant="outline-danger"
                            onClick={(e) => props.onDelete(e, resident)}
                        >
                            <span role="img" aria-label="delete">🗑️</span>
                        </Button>
                    </td>
                }
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                {props.onSelected &&
                <th>Selected</th>
                }
                {props.onEdit &&
                    <th/>
                }
                <th>
                    <span>First Name</span>
                </th>
                <th>
                    <span>Last Name</span>
                </th>
                <th>
                    <span>DOB</span>
                </th>
                {props.onDelete &&
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