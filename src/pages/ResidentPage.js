import React, {useGlobal, useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ResidentGrid from '../components/Grids/ResidentGrid';
import ResidentEdit from '../components/Modals/ResidentEdit';
import {FullName} from '../utility/common';
import RefreshMedicineList from "../providers/helpers/RefreshMedicineList";
import RefreshMedicineLog from "../providers/helpers/RefreshMedicineLog";
import ConfirmationDialog from "../components/Modals/ConfirmationDialog";
import {Form} from "react-bootstrap";
import PropTypes from 'prop-types';

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 *
 * @returns {*}
 * @constructor
 */
const ResidentPage = (props) => {
    const [ show, setShow ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState(null);
    const [ showDeleteResident, setShowDeleteResident ] = useState(false);
    const [ residentToDelete, setResidentToDelete ] = useState(null);

    const [ residentList, setResidentList ] = useGlobal('residentList');
    const [ , setMedicineList ] = useGlobal('medicineList');
    const [ , setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const residentProvider = providers.residentProvider;
    const onError = props.onError;

    /**
     * Reactivate a trashed resident given the primary key
     *
     * @param id
     * @returns {Promise<Response>}
     */
    const reactivateResident = (id) => {
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
     * @param {MouseEvent} e
     * @param resident
     */
    const handleOnEdit = (e, resident) => {
        e.preventDefault();

        setResidentInfo({...resident});
        setShow(true);
    }

    /**
     * Fires when user clicks the + (add) button
     *
     * @param {MouseEvent} e
     */
    const handleAdd = (e) => {
        e.preventDefault();

        setResidentInfo({
            Id: null,
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
    const handleModalClose = (residentInfo) => {
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
                            setResidentList(residentList);
                            // Set the reactivated resident as the active resident.
                            setActiveResident(restoredResident);
                            // Rehydrate the MedicineList
                            RefreshMedicineList(providers.medicineProvider, restoredResident.Id)
                            .then((hydratedMedicineList) => {
                                setMedicineList (hydratedMedicineList);
                                // If there are any medicines for the selected resident then
                                // select the first one and make it the active drug.
                                if (hydratedMedicineList && hydratedMedicineList.length > 0) {
                                    // Refresh the drugLogList for the new active drug.
                                    RefreshMedicineLog(providers.medHistoryProvider, restoredResident.Id)
                                    .then((data) => setDrugLogList(data))
                                    .catch((err) => props.onError(err));
                                }
                            });
                        })
                        .catch((err) => onError(err));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    // Add the new resident
                    residentProvider.post(residentData)
                    .then((newResident) => {
                        residentProvider.search({order_by: [
                                {column: "LastName", direction: "asc"},
                                {column: "FirstName", direction: "asc"}
                            ]
                        })
                        .then((residentList) => {
                            setResidentList(residentList);
                        })
                        .catch((err) => onError(err));
                        return newResident;
                    })
                    .then((newResident) => {
                        setResidentInfo(newResident);
                        handleOnSelected(null, newResident);
                    })
                    .catch((err) => onError(err));
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
     * @param {MouseEvent|null} e
     * @param {object} resident
     */
    const handleOnSelected = (e, resident) => {
        if (e) {
            e.preventDefault();
        }

        setActiveResident(resident);
        RefreshMedicineList(providers.medicineProvider, resident.Id)
        .then((data) => {
            // If there are any medicines for the selected resident then
            // select the first one and make it the active drug.
            if (data && data.length > 0) {
                setMedicineList(data);
                // Refresh the drugLogList for the new active drug.
                RefreshMedicineLog(providers.medHistoryProvider, data[0].ResidentId)
                .then((data) => setDrugLogList(data))
                .catch((err) => onError(err));
            } else {
                setMedicineList(null);
                setDrugLogList(null);
            }
        })
        .catch(() => setMedicineList(null));
    }

    /**
     * Fires when user clicks on resident trash icon
     *
     * @param {MouseEvent} e
     * @param {object} resident
     */
    const handleOnDelete = (e, resident) =>  {
        e.preventDefault();
        setResidentToDelete(resident);
        setShowDeleteResident(true);
    }

    /**
     * Fires when user confirms to delete resident record
     */
    const deleteResident = () => {
        // Perform the DELETE API call
        residentProvider.delete(residentToDelete.Id)
        .then((response) => {
            if (response.success) {
                // If the activeResident is the resident that is being deleted then mark it as no longer active.
                if (activeResident && activeResident.Id === residentToDelete.Id) {
                    setActiveResident(null);
                }

                const searchCriteria =
                    {
                        order_by: [
                            {column: "LastName", direction: "asc"},
                            {column: "FirstName", direction: "asc"}
                        ]
                    };
                residentProvider.search(searchCriteria)
                    .then((data) => setResidentList(data))
                    .catch((err) => onError(err));
            } else {
                onError(response);
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
                residentList={residentList}
            />

            {/* ResidentEdit Modal */}
            <ResidentEdit
                show={show}
                residentInfo={residentInfo}
                onClose={(r) => handleModalClose(r)}
            />

            {residentToDelete &&
            <ConfirmationDialog
                title={"Deactivate " + FullName(residentToDelete)}
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

ResidentPage.propTypes = {
    onError: PropTypes.func.isRequired,

}

export default ResidentPage;
