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
     * Reactivate a trashed resident given the primary key
     *
     * @param id
     * @returns {Promise<Response>}
     */
    function reactivateResident(id) {
        return residentProvider.restore({restore_id: id})
        .then((response) => {
            return response;
        })
        .catch((error) =>
        {
           console.log(error);
        });
    }

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

            const searchExisting = {
                where: [
                        {column: "FirstName", value: residentData.FirstName},
                        {column: "LastName", value: residentData.LastName},
                        {column: "DOB_YEAR", value: residentData.DOB_YEAR},
                        {column: "DOB_MONTH", value: residentData.DOB_MONTH},
                        {column: "DOB_DAY", value: residentData.DOB_DAY}
                        ],
                limit: 1,
                only_trashed: true
            };

            // Check if the added resident exists but is trashed.
            residentProvider.search(searchExisting)
            .then((result) => {
                // Do we have a trashed resident? Reactivate them, otherwise add as a new resident.
                if (result.length === 1) {
                    reactivateResident(result[0].Id)
                    .then((restoredResident) => {
                        setResidentInfo(restoredResident);
                        residentProvider.search({order_by: [
                            {column: "LastName", direction: "asc"},
                            {column: "FirstName", direction: "asc"}
                            ]
                        })
                        .then((residentList) => {
                            // Rehydrate the residentList
                            setGlobal({residentList: residentList});
                            // Set the reactivated resident as the active resident.
                            setActiveResident(restoredResident);
                            // Rehydrate the MedicineList
                            RefreshMedicineList(providers.medicineProvider, restoredResident.Id)
                            .then((hydratedMedicineList) => {
                                setGlobal({medicineList: hydratedMedicineList});
                                // If there are any medicines for the selected resident then
                                // select the first one and make it the active drug.
                                if (hydratedMedicineList && hydratedMedicineList.length > 0) {
                                    setGlobal({activeDrug: hydratedMedicineList[0]});
                                    // Refresh the drugLogList for the new active drug.
                                      RefreshMedicineLog(providers.medHistoryProvider, 'ResidentId', restoredResident.Id)
                                    .then((data) => setGlobal({drugLogList: data}))
                                    .catch((err) => props.onError(err));
                                }
                            });
                        })
                        .catch((err) => props.onError(err));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    // Add the new resident
                    residentProvider.post(residentData)
                    .then((response) => {
                        residentProvider.search({order_by: [
                                {column: "LastName", direction: "asc"},
                                {column: "FirstName", direction: "asc"}
                            ]
                        })
                        .then((residentList) => {
                            setGlobal({residentList: residentList});
                        })
                        .catch((err) => props.onError(err));

                        return response;
                    })
                    .then((response) => {
                        setResidentInfo(response);
                        setActiveResident(response);
                        setGlobal({activeDrug: null, medicineList: null, drugLog: null});
                    })
                    .catch((err) => props.onError(err));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setShow(false);
    }

    /**
     * Fires when the selected column / row is clicked
     *
     * @param e
     * @param resident
     */
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
                    setShowDeleteResident(false);
                }}
                onHide={() => setShowDeleteResident(false)}
            />
            }
        </>
    );
}