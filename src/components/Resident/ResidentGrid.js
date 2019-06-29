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
 *          currentResidentId {int} The currently selected resident Id
 * @returns {*}
 * @constructor
 */
export default function ResidentGrid(props) {
    // Get residentsList[] from the global store
    const [ residentList ] = useGlobal('residentList');

    /**
     * Resident Child Table Component
     *
     * @param resident ResidentInfo
     * @returns {null | ResidentRow}
     * @constructor
     */
    const ResidentRow = (resident) => {
        // Get formatted DOB
        const dob = DOB(resident);

        // Determine if this row is selected [for radio buttons]
        const isSelected = props.onSelected && (resident.Id === props.currentResidentId) ? 1 : 0;

        return (
            <tr
                key={'resident-grid-row-' + resident.Id}
                id={'resident-grid-row-' + resident.Id}
            >
                {props.onSelected &&
                    <td>
                        <ToggleButton
                            type="radio"
                            name="resident-list"
                            variant="outline-secondary"
                            checked={isSelected}
                            onClick={(e) => props.onSelected(e, resident)}
                        />
                    </td>
                }

                {props.onEdit &&
                    <td>
                        <Button
                            size="sm"
                            id={"resident-grid-button-" + resident.Id}
                            onClick={(e) => {
                                props.onEdit(e, resident)
                            }}
                        >
                            Edit
                        </Button>
                    </td>
                }

                <td>{resident.FirstName}</td>
                <td>{resident.LastName}</td>
                <td>{dob}</td>
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                {props.onSelected &&
                    <th/>
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
            </tr>
            </thead>
            <tbody>
                {residentList && residentList.length > 0 && residentList.map(ResidentRow)}
            </tbody>
        </Table>
    );
}