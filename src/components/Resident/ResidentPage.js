import React, {useGlobal} from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {DOB} from './../../utility/common';

export default function ResidentPage()
{
    const [ residentList ] = useGlobal('residentList');


    /**
     * Fires when user clicks the Edit button
     * @param e
     * @param resident
     */
    function handleEdit(e, resident)
    {
        alert(resident.Id + ' DOB: ' + DOB(resident));
    }

    function handleAdd(e)
    {
        e.preventDefault();
        alert('you clicked the add button');
    }

    /**
     * Resident Child Component
     * @param resident ResidentInfo
     * @returns {null | ResidentRow}
     * @constructor
     */
    const ResidentRow = (resident) => {
        if (resident === null ){
            return null;
        }

        const dob = DOB(resident);

        return (
            <tr
                key={'resident-grid-row-' + resident.Id}
                id={'resident-grid-row-' + resident.Id}
            >
                <td>
                    <Button
                        size="sm"
                        id={"resident-grid-button-" + resident.Id}
                        onClick={(e) => handleEdit(e, resident)}
                    >
                        Edit
                    </Button>
                </td>
                <td>{resident.FirstName}</td>
                <td>{resident.LastName}</td>
                <td>{dob}</td>
            </tr>
        );
    };


    return (
        <>
            <OverlayTrigger
                key="add-right"
                placement="right"
                overlay={
                    <Tooltip id="add-tooltip-right">
                        Add New Resident
                    </Tooltip>
                }
            >
                <Button
                    size="sm"
                    variant="info"
                    onClick={(e) => handleAdd(e)}
                >
                    +
                </Button>
            </OverlayTrigger>

            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th/>
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
                    {residentList && residentList.length > 0 && residentList.map(ResidentRow) }
                </tbody>
            </Table>

            <br/>
        </>
    );
}