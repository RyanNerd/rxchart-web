import React, {useGlobal, useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ResidentGrid from '../components/Grids/ResidentGrid';
import ResidentEdit from '../components/Modals/ResidentEdit';
import {FullName} from '../utility/common';
import {Alert, Form} from "react-bootstrap";
import ResidentProvider from "../providers/ResidentProvider";
import {ResidentRecord} from "../types/RecordTypes";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import {useProviders} from "../utility/useProviders";
import getMedicineList from "./Common/getMedicineList";
import getMedicineLog from "./Common/getMedicineLog";
import Confirm from "../components/Modals/Confirm";
import {getResidentList} from "./Common/getResidentList";

interface IProps {
    onError: (e: Error) => void
}

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 *
 * @returns {*}
 * @constructor
 */
const ResidentPage = (props: IProps) => {
    const [ show, setShow ] = useState(false);
    const [ residentInfo, setResidentInfo ] = useState<ResidentRecord | null>(null);
    const [ showDeleteResident, setShowDeleteResident ] = useState(false);
    const [ residentToDelete, setResidentToDelete ] = useState<ResidentRecord | null>(null);

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
     * @param {ResidentRecord} resident
     * @return Promise<void>
     */
    const refreshResident = (resident: ResidentRecord): Promise<void> => {
        setResidentInfo(resident);
        return getResidentList(residentProvider)
        .then((residentList: ResidentRecord[]) => {
            // Rehydrate the residentList
            setResidentList(residentList).then(()=>{});
            // Set the resident as the active resident.
            setActiveResident(resident).then(()=>{});
            // Rehydrate the MedicineList
            const residentId = resident.Id as number;
            getMedicineList(medicineProvider, residentId)
            .then((hydratedMedicineList) => {
                setMedicineList (hydratedMedicineList).then(()=>{});
                // If there are any medicines for the selected resident then
                // select the first one and make it the active drug.
                if (hydratedMedicineList && hydratedMedicineList.length > 0) {
                    // Refresh the drugLogList for the new active drug.
                    getMedicineLog(medHistoryProvider, residentId)
                        .then((data) => setDrugLogList(data))
                        .catch((err) => props.onError(err));
                } else {
                    setDrugLogList(null).then(()=>{});
                }
            });
        })
    }

    /**
     * Reactivate a trashed resident given the primary key
     *
     * @param id
     * @returns {Promise<Response>}
     */
    const reactivateResident = (id: number): Promise<ResidentRecord> => {
        return residentProvider.restore({restore_id: id})
        .then((response: any) => {
            return response;
        })
        .catch((err: Error) =>
        {
           onError(err);
        });
    }

    /**
     * Fires when user clicks the Edit button
     *
     * @param {MouseEvent} e
     * @param resident
     */
    const handleOnEdit = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
        e.preventDefault();
        setResidentInfo({...resident});
        setShow(true);
    }

    /**
     * Fires when user clicks the + (add) button
     *
     * @param {MouseEvent} e
     */
    const handleAdd = (e: React.MouseEvent<HTMLElement>) => {
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
    const handleModalClose = (residentInfo: ResidentRecord | null) => {
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
                if (result.length === 1 && result[0] && result[0].Id) {
                    reactivateResident(result[0].Id)
                    .then((restoredResident: ResidentRecord) => {
                        refreshResident(restoredResident).then(()=>{})
                    })
                    .catch((err: Error) => onError(err));
                } else {
                    // Add / update the new resident
                    residentProvider.post(residentData)
                    .then((newResident) => {
                        refreshResident(newResident).then(()=>{})
                    })
                    .catch((err: Error) => onError(err));
                }
            })
            .catch((err: Error) => onError(err));
        }
    }

    /**
     * Fires when the selected column / row is clicked
     *
     * @param {MouseEvent|null} e
     * @param {object} resident
     */
    const handleOnSelected = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
        e.preventDefault();
        refreshResident(resident).then(()=>{});
    }

    /**
     * Fires when user clicks on resident trash icon
     *
     * @param {MouseEvent} e
     * @param {object} resident
     */
    const handleOnDelete = (e: React.MouseEvent, resident: ResidentRecord) =>  {
        e.preventDefault();
        setResidentToDelete(resident);
        setShowDeleteResident(true);
    }

    /**
     * Fires when user confirms to delete resident record
     */
    const deleteResident = () => {
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
            .catch((err: Error) => onError(err));
        }
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
                onEdit={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => handleOnEdit(e, resident)}
                onSelected={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => handleOnSelected(e, resident)}
                onDelete={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => handleOnDelete(e, resident)}
                activeResident={activeResident}
                residentList={residentList}
            />

            {/* ResidentEdit Modal */}
            {residentInfo &&
                <ResidentEdit
                    show={show}
                    residentInfo={residentInfo}
                    onClose={(r) => {
                        setShow(false);
                        handleModalClose(r);
                    }}
                    onHide={() => setShow(!show)}
                />
            }

            {residentToDelete &&
                <Confirm.Modal
                    show={showDeleteResident}
                    onAnswer={(a) => {
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
