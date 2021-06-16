import React, {useEffect, useGlobal, useRef, useState} from 'reactn';

import {Alert, Button, Form, Row} from "react-bootstrap";

import ClientRoster from "./Modals/ClientRoster";
import Confirm from "./Modals/Confirm";
import ResidentEdit from './Modals/ResidentEdit';
import ResidentGrid from './Grids/ResidentGrid';
import TooltipButton from "../Buttons/TooltipButton";
import {clientFullName} from '../../utility/common';
import {newResidentRecord, ResidentRecord} from "../../types/RecordTypes";

interface IProps {
    residentSelected: () => void
}

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 * @return {JSX.Element | null}
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
    const [showClientPrint, setShowClientPrint] = useState<ResidentRecord | null>(null);
    const [showClientRoster, setShowClientRoster] = useState(false);
    const [showDeleteResident, setShowDeleteResident] = useState(false);
    const [showResidentEdit, setShowResidentEdit] = useState<ResidentRecord | null>(null);
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
                const firstName = residentRecord.FirstName.toLowerCase();
                const lastName = residentRecord.LastName.toLowerCase();
                const nickname = residentRecord.Nickname ? residentRecord.Nickname.toLowerCase() : '';
                const search = searchText.toLowerCase();
                return lastName.includes(search) || firstName.includes(search) || nickname.includes(search);
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
     * Fires when user clicks on the select button or if the user is trying to add an existing active client
     * @param {ResidentRecord} resident
     */
    const handleOnSelected = (resident: ResidentRecord) => {
        setActiveResident(resident)
        .then(() => setSearchText(''))
        .then(() => onSelected())
        .catch((err) => setErrorDetails(err))
    }

    return (
        <Form className="tab-content">
            <Row>
                <TooltipButton
                    className="mr-2"
                    placement="top"
                    tooltip="Add New Resident"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        setShowResidentEdit({...newResidentRecord});
                    }}
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

                {showClientPrint !== null &&
                    <
                        ClientRoster
                            onUnload={()=>{
                                setShowClientPrint(null);
                                handleOnSelected(showClientPrint);
                            }}
                            clientList={[showClientPrint]}
                    />
                }

            </Row>

            <Row className="mt-3">
                <ResidentGrid
                    activeResident={activeResident}
                    residentList={filteredResidents}
                    onDelete={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
                        e.preventDefault();
                        setResidentToDelete(resident);
                        setShowDeleteResident(true);
                    }}
                    onEdit={(e: React.MouseEvent<HTMLElement>, resident: ResidentRecord) => {
                        e.preventDefault();
                        setShowResidentEdit({...resident});
                    }}
                    onSelected={(e: React.MouseEvent<HTMLElement>, r: ResidentRecord) => {
                        e.preventDefault();
                        handleOnSelected(r)
                    }}
                />
            </Row>

            <ResidentEdit
                residentInfo={showResidentEdit as ResidentRecord}
                show={showResidentEdit !== null}
                onClose={(client) => {
                    // Hide this modal
                    setShowResidentEdit(null);

                    // Do we have a record to update or add?
                    if (client) {
                        // Are we adding a new record?
                        if (client.Id === null) {
                            // Search residentList for any existing clients to prevent adding dupes
                            const existing = residentList.find(r =>
                                r.FirstName.trim().toLowerCase() === client.FirstName.trim().toLowerCase() &&
                                r.LastName.trim().toLowerCase() === client.LastName.trim().toLowerCase() &&
                                (typeof r.DOB_DAY === 'string' ?
                                    parseInt(r.DOB_DAY) : r.DOB_DAY) ===
                                (typeof client.DOB_DAY === 'string' ?
                                    parseInt(client.DOB_DAY) : client.DOB_DAY) &&
                                (typeof r.DOB_MONTH === 'string' ?
                                    parseInt(r.DOB_MONTH) : r.DOB_MONTH) ===
                                (typeof client.DOB_MONTH === 'string' ?
                                    parseInt(client.DOB_MONTH) : client.DOB_MONTH) &&
                                (typeof r.DOB_YEAR === 'string' ?
                                    parseInt(r.DOB_YEAR) : r.DOB_YEAR) ===
                                (typeof client.DOB_YEAR === 'string' ?
                                    parseInt(client.DOB_YEAR) : client.DOB_YEAR)
                            )

                            // Is user trying to add an existing active client?
                            // If so then make the exiting client the active instead.
                            if (existing) {
                                handleOnSelected(existing);
                                return;
                            }
                            setClient({
                                action: "update",
                                payload: client,
                                cb: (c) => {
                                    setActiveResident(c as ResidentRecord)
                                        .then(() => setShowClientPrint(c as ResidentRecord));
                                }
                            })
                            .then();
                        } else {
                            // Update the client
                            setClient({
                                action: "update",
                                payload: client,
                                cb: (c) => {
                                    handleOnSelected(c as ResidentRecord);
                                }
                            })
                            .then();
                        }
                    }
                }}
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
