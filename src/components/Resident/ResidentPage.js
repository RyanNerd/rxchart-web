import React, {setGlobal, useGlobal, useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ResidentGrid from './ResidentGrid';
import ResidentEdit from './ResidentEdit';
import {FULLNAME} from './../../utility/common';
import RefreshMedicineList from "../../providers/RefreshMedicineList";

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
    const [ show, setShow ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState({Id: null});
    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    /**
     * Fires when user clicks the Edit button
     *
     * @param e
     * @param resident
     */
    function handleOnEdit(e, resident)
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
            alert(FULLNAME(residentInfo));
        }

        setShow(false);
    }

    function handleOnSelected(e, resident)
    {
        setActiveResident(resident);
        RefreshMedicineList(providers.medicineProvider, resident.Id)
        .then((data) => setGlobal({medicineList: data}))
        .catch((err) => setGlobal({medicineList: null}));

        setGlobal({activeBarcode: ''});
        setGlobal({activeDrug: null});
    }

    function handleOnDelete(e, resident)
    {
        alert('Delete: ' + FULLNAME(resident));
    }

    return (
        <>
            <OverlayTrigger
                key="add"
                placement="top"
                overlay={
                    <Tooltip id="add-resident-tooltip">
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

            <p><span> </span></p>

            <ResidentGrid
                onEdit={(e, resident) => handleOnEdit(e, resident)}
                onSelected={(e, resident) => handleOnSelected(e, resident)}
                onDelete={(e, resident) => handleOnDelete(e, resident)}
                activeResident={activeResident}
            />

            {/* ResidentEdit Modal */}
            <ResidentEdit
                show={show}
                residentInfo={residentInfo}
                onClose={(r) => handleModalClose(r)}
            />
        </>
    );
}