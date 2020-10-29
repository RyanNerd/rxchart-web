import Confirm from "../Modals/Confirm";
import React, {useGlobal, useState} from 'reactn';
import ResidentEdit from '../Modals/ResidentEdit';
import ResidentGrid from '../Grids/ResidentGrid';
import TooltipButton from "../Buttons/TooltipButton";
import {Alert, Form, Row} from "react-bootstrap";
import {FullName} from '../../utility/common';
import {ResidentRecord} from "../../types/RecordTypes";
import {useEffect, useRef} from "react";

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
    const [filteredResidents, setFilteredResidents] = useState<ResidentRecord[]>(residentList);
    const [residentToDelete, setResidentToDelete] = useState<ResidentRecord | null>(null);
    const [rm] = useGlobal('residentManager');
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showDeleteResident, setShowDeleteResident] = useState(false);
    const [showResidentEdit, setShowResidentEdit] = useState(false);
    const activeTabKey = props.activeTabKey;
    const focusRef = useRef<HTMLInputElement>(null);
    const onSelected = props.residentSelected;

    // Set focus to the search textbox when this tab is active
    useEffect(() => {
        if (activeTabKey === 'resident') {
            focusRef?.current?.focus();
        }
    }, [activeTabKey, focusRef])

    // Filter the resident list by the search textbox value
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = residentList.filter((residentRecord) => {
                const lastName = residentRecord.LastName.toLowerCase();
                const firstName = residentRecord.FirstName.toLowerCase();
                const search = searchText.toLowerCase();
                return lastName.includes(search) || firstName.includes(search);
            })

            if (filter && filter.length > 0) {
                setSearchIsValid(true);
                setFilteredResidents(filter);
            } else {
                setSearchIsValid(false);
                setFilteredResidents([]);
            }
        } else {
            setSearchIsValid(false);
            setFilteredResidents(residentList);
        }
    }, [residentList, searchText])

    // Don't render if this tab isn't active.
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
                        setSearchText('');
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
        .then(() => setSearchText(''))
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
        <Form className="tab-content">
            <Row>
                <TooltipButton
                    className="mr-2"
                    placement="top"
                    tooltip="Add New Resident"
                    onClick={(e: React.MouseEvent<HTMLElement>) => handleAddResident(e)}
                >
                    + Resident
                </TooltipButton>

                <Form.Control
                    id="medicine-page-search-text"
                    style={{width: "220px"}}
                    isValid={searchIsValid}
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search resident"
                    ref={focusRef}
                />
            </Row>

            <Row className="mt-3">
                <ResidentGrid
                    activeResident={activeResident}
                    onDelete={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) =>
                        handleOnDelete(e, resident)
                    }
                    onEdit={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) =>
                        handleEditResident(e, resident)
                    }
                    onSelected={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) =>
                        handleOnSelected(e, resident)
                    }
                    residentList={filteredResidents}
                />
            </Row>

            {residentInfo &&
                <ResidentEdit
                    onClose={(r) => {
                        setShowResidentEdit(false);
                        if (r) {
                            handleModalClose(r);
                        }
                    }}
                    residentInfo={residentInfo}
                    show={showResidentEdit}
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
        </Form>
    )
}

export default ResidentPage;
