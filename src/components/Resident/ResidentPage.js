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
            DOB_YEAR: "",
            DOB_MONTH: "",
            DOB_DAY: ""
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
            const residentData = {...residentInfo};

            if (!residentData.Id) {
                residentData.Id = null;
            }
            providers.residentProvider.post(residentData)
            .then((response) => {
                setResidentInfo(response);
                providers.residentProvider.query('*')
                .then((data) => {
                    setGlobal({residentList: data});
                    if (activeResident && activeResident.Id === residentData.Id) {
                        setActiveResident(residentData);
                    }
                });
            });
        }

        setShow(false);
    }

    function handleOnSelected(e, resident)
    {
        setActiveResident(resident);
        RefreshMedicineList(providers.medicineProvider, resident.Id)
        .then((data) => {
            setGlobal({medicineList: data});
            // If there are any medicines for the selected resident then
            // select the first one and make it the active drug.
            if (data && data.length > 0) {
                setGlobal({activeDrug: data[0]});
            }
        })
        .catch((err) => setGlobal({medicineList: null}));

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