import Confirm from "./Modals/Confirm";
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import ResidentEdit from './Modals/ResidentEdit';
import ResidentGrid from './Grids/ResidentGrid';
import TooltipButton from "../Buttons/TooltipButton";
import {Alert, Button, Form, Row} from "react-bootstrap";
import {clientFullName} from '../../utility/common';
import {ResidentRecord} from "../../types/RecordTypes";
import ClientRoster from "./Modals/ClientRoster";

interface IProps {
    residentSelected: () => void
}

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 * @return {JSX.Element}
 */
const ResidentPage = (props: IProps): JSX.Element | null => {
    const [, setClient] = useGlobal('__client');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeResident, setActiveResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [residentList] = useGlobal('residentList');
    const [filteredResidents, setFilteredResidents] = useState<ResidentRecord[]>(residentList);
    const [residentToDelete, setResidentToDelete] = useState<ResidentRecord | null>(null);
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showDeleteResident, setShowDeleteResident] = useState(false);
    const [showResidentEdit, setShowResidentEdit] = useState<ResidentRecord | null>(null);
    const [showClientRoster, setShowClientRoster] = useState(false);
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
     * Fires when user clicks the + (add) button
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const handleAddResident = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setShowResidentEdit({
            Id: null,
            FirstName: "",
            LastName: "",
            DOB_YEAR: "",
            DOB_MONTH: "",
            DOB_DAY: "",
            Notes: ""
        });
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
                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search resident"
                    ref={focusRef}
                />

                <Button
                    className="ml-2"
                    disabled={showClientRoster}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowClientRoster(true);
                    }}>
                    Print Client Roster
                </Button>

                {showClientRoster &&
                    <ClientRoster
                        onUnload={() => setShowClientRoster(false)}
                        clientList={residentList}
                    />
                }
            </Row>

            <Row className="mt-3">
                <ResidentGrid
                    activeResident={activeResident}
                    onDelete={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) =>
                        handleOnDelete(e, resident)
                    }
                    onEdit={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
                        e.preventDefault();
                        setShowResidentEdit({...resident});
                    }}
                    onSelected={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
                        e.preventDefault();
                        setActiveResident(resident)
                        .then(() => setSearchText(''))
                        .then(() => onSelected())
                        .catch((err) => setErrorDetails(err))
                    }}
                    residentList={filteredResidents}
                />
            </Row>

            <ResidentEdit
                onClose={(residentRecord) => {
                    if (residentRecord) {
                        setClient({
                            action: "update",
                            payload: residentRecord,
                            cb: (clientRecord) => {
                                // If we are adding a new resident then make them the active client.
                                if (!residentRecord.Id) {
                                    setActiveResident(clientRecord);
                                }
                            }
                        })
                    }
                    setShowResidentEdit(null);
                }}
                residentInfo={showResidentEdit as ResidentRecord}
                show={showResidentEdit !== null}
            />


            {residentToDelete &&
            <Confirm.Modal
                show={showDeleteResident}
                onSelect={(a) => {
                    setShowDeleteResident(false);
                    if (a && residentToDelete) {
                        setClient({action: "delete", payload: residentToDelete?.Id as number})
                        .then(() => {
                            setSearchText('');
                        })
                    }
                }}
            >
                <Confirm.Header>
                    <Confirm.Title>
                        {"Deactivate " + clientFullName(residentToDelete)}
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
