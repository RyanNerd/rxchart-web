import React, {setGlobal, useGlobal, useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ResidentGrid from './ResidentGrid';
import ResidentEdit from './ResidentEdit';
import {FULLNAME} from './../../utility/common';
import RefreshMedicineList from "../../providers/RefreshMedicineList";
import RefreshMedicineLog from "../../providers/RefreshMedicineLog";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import {Form} from "react-bootstrap";

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 *
 * @returns {*}
 * @constructor
 */
export default function ResidentPage(props)
{
    // Establish initial state
    const [ show, setShow ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState({Id: null});
    const [ showDeleteResident, setShowDeleteResident ] = useState(false);
    const [ residentToDelete, setResidentToDelete ] = useState(null);

    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const residentProvider = providers.residentProvider;

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
        let isAdd = false;
        if (residentInfo) {
            const residentData = {...residentInfo};

            if (!residentData.Id) {
                residentData.Id = null;
            }

            residentProvider.post(residentData)
            .then((response) => {
                setResidentInfo(response);
                residentProvider.query('*')
                .then((data) => {
                    setGlobal({residentList: data});
                    setActiveResident(residentData);
                })
                .catch((err) => props.onError(err));
            })
            .catch((err) => props.onError(err));
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
                // Refresh the drugLogList for the new active drug.
                RefreshMedicineLog(providers.medHistoryProvider, 'ResidentId', data[0].ResidentId)
                    .then((data) => setGlobal({drugLogList: data}))
                    .catch((err) => props.onError(err));
            }
        })
        .catch((err) => setGlobal({medicineList: null}));

        setGlobal({activeDrug: null});
    }

    /**
     * Fires when user clicks on resident trash icon
     *
     * @param {event} e
     * @param {object} resident
     */
    function handleOnDelete(e, resident)
    {
        e.preventDefault();
        setResidentToDelete(resident);
        setShowDeleteResident(true);
    }

    /**
     * Fires when user confirms to delete resident record
     */
    function deleteResident()
    {
        // Perform the DELETE API call
        residentProvider.delete(residentToDelete.Id)
        .then((response) => {
            if (response.success) {
                // If the activeResident is the resident that is being deleted then mark it as no longer active.
                if (activeResident && activeResident.Id === residentToDelete.Id) {
                    setActiveResident(null);
                }

                residentProvider.query('*').then((data) => setGlobal({residentList: data}));
            } else {
                props.onError(response);
            }
        });
    }

    return (
        <>
            <Form>
            <OverlayTrigger
                key="add"
                placement="right"
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
                    + Resident
                </Button>
            </OverlayTrigger>

                <Form.Check
                    className="ml-3"
                    inline
                    custom
                    type="checkbox"
                    id="resident-show-deleted"
                    label='Show deleted'
                    onClick={()=>alert('TODO: Add logic that shows deleted residents')}
                />
            </Form>
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

            {residentToDelete &&
            <ConfirmationDialog
                title={"Delete " + FULLNAME(residentToDelete)}
                body={
                    <b style={{color: "red"}}>
                        Are you sure?
                    </b>
                }
                show={showDeleteResident}
                onAnswer={(a) => {
                    if (a) {
                        deleteResident();
                    } else {
                        setResidentToDelete(null);
                    }
                }}
                onHide={() => setShowDeleteResident(false)}
            />
            }
        </>
    );
}