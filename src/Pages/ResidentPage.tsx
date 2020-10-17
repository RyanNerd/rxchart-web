import React, {useGlobal, useState} from 'reactn';
import ResidentGrid from '../components/Grids/ResidentGrid';
import ResidentEdit from '../components/Modals/ResidentEdit';
import {FullName} from '../utility/common';
import {Alert, Form} from "react-bootstrap";
import {ResidentRecord} from "../types/RecordTypes";
import Confirm from "../components/Modals/Confirm";
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
    const [showResidentEdit, setShowResidentEdit] = useState(false);
    const [residentInfo, setResidentInfo] = useState<ResidentRecord | null>(null);
    const [showDeleteResident, setShowDeleteResident] = useState(false);
    const [residentToDelete, setResidentToDelete] = useState<ResidentRecord | null>(null);
    const [residentList] = useGlobal('residentList');
    const [activeResident] = useGlobal('activeResident');
    const [rm] = useGlobal('residentManager');

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
    const handleModalClose = (residentRecord: ResidentRecord): void => {
        rm.addOrUpdateResident(residentRecord)
            .catch((err) => props.onError(err));
    }

    /**
     * Fires when the selected column / row is clicked
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnSelected = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord): void => {
        e.preventDefault();
        rm.setResident(resident);
    }

    /**
     * Fires when user clicks on resident trash icon
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {ResidentRecord} resident
     */
    const handleOnDelete = (e: React.MouseEvent<HTMLElement>, resident: ResidentRecord): void => {
        e.preventDefault();
        setResidentToDelete(resident);
        setShowDeleteResident(true);
    }

    return (
        <>
            <Form>
                <TooltipButton
                    placement="top"
                    tooltip="Add New Resident"
                    onClick={(e: React.MouseEvent<HTMLElement>) => handleAdd(e)}
                >
                    + Resident
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
                    if (a) {
                        rm.deleteResident(residentToDelete);
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
