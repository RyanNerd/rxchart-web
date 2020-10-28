import Confirm from "../Modals/Confirm";
import React, {useGlobal, useState} from 'reactn';
import ResidentEdit from '../Modals/ResidentEdit';
import ResidentGrid from '../Grids/ResidentGrid';
import TooltipButton from "../Buttons/TooltipButton";
import {Alert, Form} from "react-bootstrap";
import {FullName} from '../../utility/common';
import {ResidentRecord} from "../../types/RecordTypes";

interface IProps {
    activeTabKey: string | null
    residentSelected: () => void
}

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 * @return {JSX.Element}
 * @constructor
 */
const ResidentPage = (props: IProps): JSX.Element | null => {
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setMedicineList] = useGlobal('medicineList');
    const [activeResident, setActiveResident] = useGlobal('activeResident');
    const [mm] = useGlobal('medicineManager');
    const [residentInfo, setResidentInfo] = useState<ResidentRecord | null>(null);
    const [residentList, setResidentList] = useGlobal('residentList');
    const [residentToDelete, setResidentToDelete] = useState<ResidentRecord | null>(null);
    const [rm] = useGlobal('residentManager');
    const [showDeleteResident, setShowDeleteResident] = useState(false);
    const [showResidentEdit, setShowResidentEdit] = useState(false);
    const onSelected = props.residentSelected;
    const activeTabKey = props.activeTabKey;

    if (activeTabKey !== 'resident') {
        return null;
    }

    /**
     * Fires when user clicks the Edit button
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleEditResident = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
        e.preventDefault();
        setResidentInfo({...resident});
        setShowResidentEdit(true);
    }

    /**
     * Fires when user clicks the + (add) button
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const handleAddResident = (e: React.MouseEvent<HTMLElement>) => {
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
     * @param {ResidentRecord | null} residentRecord
     */
    const handleModalClose = (residentRecord: ResidentRecord) => {
        rm.updateResident(residentRecord)
            .then((resident) => {
                rm.loadResidentList()
                .then((residents) => {
                    setResidentList(residents);
                    if (!residentRecord.Id) {
                        setMedicineList([]);
                        setDrugLogList([]);
                        setActiveResident(resident);
                        onSelected();
                    }
                })
                .catch((err) => setErrorDetails(err))
            })
            .catch((err) => setErrorDetails(err));
    }

    /**
     * Fires when the selected column / row is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnSelected = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
        e.preventDefault();
        const residentId = resident.Id as number;
        mm.loadMedicineList(residentId)
            .then((meds) => {
                setMedicineList(meds);
                setActiveResident(resident);
                mm.loadDrugLog(residentId)
                    .then((drugs) => setDrugLogList(drugs))
                    .catch((err) => setErrorDetails(err))
            })
            .then(() => onSelected())
            .catch((err) => setErrorDetails(err))
    }

    /**
     * Fires when user clicks on resident trash icon
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnDelete = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
        e.preventDefault();
        setResidentToDelete(resident);
        setShowDeleteResident(true);
    }

    return (
        <>
            <Form className="tab-content">
                <TooltipButton
                    placement="top"
                    tooltip="Add New Resident"
                    onClick={(e: React.MouseEvent<HTMLElement>) => handleAddResident(e)}
                >
                    + Resident
                </TooltipButton>
            </Form>

            <p><span> </span></p>

            <ResidentGrid
                onEdit={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => handleEditResident(e, resident)}
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
                    if (r) {
                        handleModalClose(r);
                    }
                }}
            />
            }

            {residentToDelete &&
            <Confirm.Modal
                show={showDeleteResident}
                onSelect={(a) => {
                    setShowDeleteResident(false);
                    if (a && residentToDelete) {
                        rm.deleteResident(residentToDelete?.Id as number)
                            .then((deleted) => {
                                if (deleted) {
                                    if (activeResident?.Id === residentToDelete.Id) {
                                        setActiveResident(null);
                                        setMedicineList([]);
                                        setDrugLogList([]);
                                    } else {
                                        rm.loadResidentList()
                                        .then((residents) => setResidentList(residents))
                                        .catch((err) => setErrorDetails(err))
                                }
                            } else {
                                setErrorDetails(new Error('Unable to delete resident.Id ' + residentToDelete.Id));
                            }
                        })
                        .catch((err) => setErrorDetails(err));
                    }
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
