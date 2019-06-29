import React, {useGlobal, useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {DOB} from './../../utility/common';
import ResidentEdit from './ResidentEdit';

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 *
 * @returns {*}
 * @constructor
 */
export default function ResidentPage()
{
    // Establish initial state
    const [ residentList ] = useGlobal('residentList');
    const [ show, setShow ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState({Id: null});

    /**
     * Fires when user clicks the Edit button
     *
     * @param e
     * @param resident
     */
    function handleEdit(e, resident)
    {
        e.preventDefault();

        setResidentInfo({...resident});
        setShow(true);
    }

    /**
     * Fires when user clicks the + (add) button
     *
     * @param e
     */
    function handleAdd(e)
    {
        e.preventDefault();

        setResidentInfo({
            Id: 0,
            FirstName: "",
            LastName: "",
        });

        setShow(true);
    }

    /**
     * Fires when ResidentEdit closes.
     *
     * @param {object | null} residentInfo
     */
    function handleModalClose(residentInfo)
    {
        if (residentInfo) {
            alert(residentInfo.FirstName + ' ' + residentInfo.LastName);
        }

        setShow(false);
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

            <ResidentEdit
                show={show}
                residentInfo={residentInfo}
                onClose={(r) => handleModalClose(r)}
            />
        </>
    );
}