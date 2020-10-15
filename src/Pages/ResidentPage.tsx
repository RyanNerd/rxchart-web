import React, {useGlobal, useState} from 'reactn';
import ResidentGrid from '../components/Grids/ResidentGrid';
import ResidentEdit from '../components/Modals/ResidentEdit';
import {FullName} from '../utility/common';
import {Alert, Form, Spinner} from "react-bootstrap";
import ResidentProvider from "../providers/ResidentProvider";
import {ResidentRecord} from "../types/RecordTypes";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import {useProviders} from "../utility/useProviders";
import getMedicineList from "./Common/getMedicineList";
import getMedicineLog from "./Common/getMedicineLog";
import Confirm from "../components/Modals/Confirm";
import {getResidentList} from "./Common/getResidentList";
import TooltipButton from "../components/Buttons/TooltipButton";

interface IProps {
    onError: (e: Error) => void
}

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 *
 * @param {IProps} props
 * @return {JSX.Element}
 * @constructor
 */
const ResidentPage = (props: IProps): JSX.Element => {
    const [ showResidentEdit, setShowResidentEdit ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState<ResidentRecord | null>(null);
    const [ showDeleteResident, setShowDeleteResident ] = useState(false);
    const [ residentToDelete, setResidentToDelete ] = useState<ResidentRecord | null>(null);
    const [ residentListLoading, setResidentListLoading ] = useState(false);
    const [ residentList, setResidentList ] = useGlobal('residentList');
    const [ , setMedicineList ] = useGlobal('medicineList');
    const [ , setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident, setActiveResident ] = useGlobal<any>('activeResident');
    const providers = useProviders();
    const residentProvider = providers.residentProvider as typeof ResidentProvider;
    const medicineProvider = providers.medicineProvider as typeof MedicineProvider;
    const medHistoryProvider = providers.medHistoryProvider as typeof MedHistoryProvider;
    const onError = props.onError;

    /**
     * Given a ResidentRecord set it as the activeResident,
     * rehydrate the ResidentList, Get and set all meds and drug history for the resident
     *
     * @return Promise<void>
     */
    const refreshResidentList = async (): Promise<void> => {
        setResidentListLoading(true);
        const residentList = await getResidentList(residentProvider);
        setResidentList(residentList)
        .then(() => setResidentListLoading(false));
    }

    /**
     * Refresh the medicineList and medicineLog for the given residentId
     *
     * @param {number | null} residentId The residentId or null if the logs are to be cleared.
     * @return Promise<void>
     */
    const refreshLogs = (residentId: number | null): Promise<void> => {
        if (residentId ===  null) {
            // Logs will be empty for new residents
            return setMedicineList([])
            .then(() => setDrugLogList([]).then(()=>{}))
        }

        return getMedicineList(medicineProvider, residentId)
        .then((hydratedMedicineList) => {
            setMedicineList (hydratedMedicineList).then(()=>{});
            // If there are any medicines for the selected resident then
            // select the first one and make it the active drug.
            if (hydratedMedicineList && hydratedMedicineList.length > 0) {
                // Refresh the drugLogList for the new active drug.
                getMedicineLog(medHistoryProvider, residentId)
                .then((data) => setDrugLogList(data))
                .catch((err) => onError(err));
            } else {
                setDrugLogList(null).then(()=>{});
            }
        });
    }

    /**
     * Reactivate a trashed resident given the primary key
     *
     * @param {number} id
     * @returns {Promise<ResidentRecord>}
     */
    const reactivateResident = (id: number): Promise<ResidentRecord> => {
        return residentProvider.restore(id)
        .then((reactivatedResident) => {
            return reactivatedResident;
        })
        .catch((err) => {
            throw err;
        })
    }

    /**
     * Fires when user clicks the Edit button
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnEdit = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord): void => {
        e.preventDefault();
        setResidentInfo({...resident});
        setShowResidentEdit(true);
    }

    /**
     * Fires when user clicks the + (add) button
     *
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const handleAdd = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        setResidentInfo({
            Id: null,
            FirstName: "",
            LastName: "",
            DOB_YEAR: "",
            DOB_MONTH: "",
            DOB_DAY: ""
        });
        setShowResidentEdit(true);
    }

    /**
     * Fires when ResidentEdit closes.
     *
     * @param {ResidentRecord | null} residentRecord
     */
    const handleModalClose = (residentRecord: ResidentRecord | null): void => {
        if (residentRecord) {
            const residentData = {...residentRecord};
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
                const trashedResidentId = (result.length === 1) ? result[0].Id : null;
                // Do we have a trashed resident? Reactivate them, otherwise add as a new resident.
                if (trashedResidentId) {
                    reactivateResident(trashedResidentId)
                    .then((restoredResident: ResidentRecord) => {
                        refreshResidentList()
                        .then(() => {
                            // Set the resident as the active resident.
                            setActiveResident(restoredResident).then(()=>{});
                            // Refresh the logs for the resident.
                            const residentId = restoredResident.Id;
                            return refreshLogs(residentId);
                        })
                    })
                    .catch((err) => onError(err));
                } else {
                    // Add / update the new resident
                    residentProvider.post(residentData)
                    .then((resident) => {
                        refreshResidentList()
                        .then(() => {
                            // Set the resident as the active resident.
                            setActiveResident(resident).then(() => {
                                // Note the use of residentData (Id will be null for new residents)
                                refreshLogs(residentData.Id).then(()=>{});
                            });
                        })
                    })
                    .catch((err) => onError(err));
                }
            })
            .catch((err) => onError(err));
        }
    }

    /**
     * Fires when the selected column / row is clicked
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnSelected = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord): void => {
        e.preventDefault();
        const residentId = resident.Id as number;
        // Set the resident as the active resident and refresh the logs
        setActiveResident(resident).then(()=>{
            refreshLogs(residentId).then(()=>{});
        });
    }

    /**
     * Fires when user clicks on resident trash icon
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnDelete = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord): void =>  {
        e.preventDefault();
        setResidentToDelete(resident);
        setShowDeleteResident(true);
    }

    /**
     * Fires when user confirms to delete resident record
     */
    const deleteResident = (): void => {
        if (residentToDelete && residentToDelete.Id) {
            // Perform the DELETE API call
            residentProvider.delete(residentToDelete.Id)
            .then((response) => {
                if (response.success) {
                    // If the activeResident is the resident that is being deleted then mark it as no longer active.
                    if (activeResident && activeResident.Id === residentToDelete.Id) {
                        setActiveResident(null).then(()=>{});
                    }
                    const searchCriteria =  {
                        order_by: [
                            {column: "LastName", direction: "asc"},
                            {column: "FirstName", direction: "asc"}
                        ]
                    };
                    residentProvider.search(searchCriteria)
                        .then((data) => setResidentList(data))
                        .catch((err: Error) => onError(err));
                } else {
                    throw(response);
                }
            })
            .catch((err) => onError(err));
        }
    }

    return (
        <>
            <Form>
                <TooltipButton
                    className="mr-2"
                    placement="top"
                    tooltip="Add New Resident"
                    onClick={(e: React.MouseEvent<HTMLElement>) => handleAdd(e)}
                >
                    + Resident
                </TooltipButton>

                <TooltipButton
                    disabled={residentListLoading}
                    variant="light"
                    className="mr-2"
                    placement="right"
                    tooltip="Reload Resident List"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        refreshResidentList()
                        .then(() => setActiveResident(null));
                    }}
                >
                    {residentListLoading ?
                        (
                            <>
                                <Spinner animation="border" size="sm"/> <span>Reloading...</span>
                            </>
                        ) : (
                            <>
                                <span role="img" aria-label="reload">🔁</span> <span>Reload</span>
                            </>
                        )
                    }
                </TooltipButton>
            </Form>

            <p><span> </span></p>

            <ResidentGrid
                onEdit={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => handleOnEdit(e, resident)}
                onSelected={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) =>
                    handleOnSelected(e, resident)
                }
                onDelete={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => handleOnDelete(e, resident)}
                activeResident={activeResident}
                residentList={residentList}
            />

            {/* ResidentEdit Modal */}
            {residentInfo &&
                <ResidentEdit
                    show={showResidentEdit}
                    residentInfo={residentInfo}
                    onClose={(r) => {
                        setShowResidentEdit(false);
                        handleModalClose(r);
                    }}
                />
            }

            {residentToDelete &&
                <Confirm.Modal
                    show={showDeleteResident}
                    onSelect={(a) => {
                        setShowDeleteResident(false);
                        if (a) {deleteResident()}
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            {"Deactivate " + FullName(residentToDelete)}
                        </Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert variant="danger">
                            Are you sure?
                        </Alert>
                    </Confirm.Body>
                </Confirm.Modal>
            }
        </>
    );
}

export default ResidentPage;
