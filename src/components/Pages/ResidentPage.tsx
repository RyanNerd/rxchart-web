import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, {useEffect, useGlobal, useLayoutEffect, useRef, useState} from 'reactn';
import {newResidentRecord, ResidentRecord} from "types/RecordTypes";
import {clientFullName} from 'utility/common';
import ResidentGrid from './Grids/ResidentGrid';
import ClientRoster from "./Modals/ClientRoster";
import Confirm from "./Modals/Confirm";
import ResidentEdit from './Modals/ResidentEdit';

interface IProps {
    residentSelected: () => void
}

/**
 * Display Resident Grid
 * Allow user to edit and add Residents
 * @return {JSX.Element | null}
 */
const ResidentPage = (props: IProps): JSX.Element | null => {
    const [activeResident, setActiveResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [residentList, setResidentList] = useGlobal('residentList');
    const [filteredResidents, setFilteredResidents] = useState<ResidentRecord[]>(residentList);
    const [rm] = useGlobal('residentManager');
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showClientRoster, setShowClientRoster] = useState(false);
    const [showDeleteResident, setShowDeleteResident] = useState<null|ResidentRecord>(null);
    const [showResidentEdit, setShowResidentEdit] = useState<ResidentRecord | null>(null);
    const onSelected = props.residentSelected;
    const focusRef = useRef<HTMLInputElement>(null);

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

    useLayoutEffect(() => {
        focusRef?.current?.focus();
    })

    // Don't render if this tab isn't active.
    if (activeTabKey !== 'resident') {
        return null;
    }

    /**
     * Fires when user clicks on the select button or if the user is trying to add an existing active client
     * @param {ResidentRecord} client
     */
    const handleOnSelected = (client: ResidentRecord) => {
        const activateClient = async (clientRec: ResidentRecord) => {
            await setActiveResident(clientRec);
            await setSearchText('');
            onSelected();
        }
        activateClient(client);
    }

    const saveClient = async (client: ResidentRecord) => {
        const r = await rm.updateResident(client);
        if (r) {
            const rl = await rm.loadResidentList();
            await setResidentList(rl);
            handleOnSelected(r);
        }
    }

    const deleteClient = async (clientId: number) => {
        const d = await rm.deleteResident(clientId);
        if (d) {
            const rl = await rm.loadResidentList();
            await setResidentList(rl);
            await setActiveResident(null);
        }
    }

    return (
        <Form className="tab-content">
            <Row as={ButtonGroup}>
                <Button
                    className="mr-2"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        setShowResidentEdit({...newResidentRecord});
                    }}
                >
                    + Resident
                </Button>

                <Form.Control
                    autoFocus
                    id="medicine-page-search-text"
                    style={{width: "220px"}}
                    isValid={searchIsValid}
                    ref={focusRef}
                    type="search"
                    value={searchText}
                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search resident"
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
                    residentList={filteredResidents}
                    onDelete={(resident: ResidentRecord) => setShowDeleteResident(resident)}
                    onEdit={(resident: ResidentRecord) => setShowResidentEdit({...resident})}
                    onSelected={r => handleOnSelected(r)}
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
                        }
                        saveClient(client);
                    }
                }}
            />

            {showDeleteResident &&
            <Confirm.Modal
                show={true}
                onSelect={(a) => {
                    setShowDeleteResident(null);
                    if (a) {
                        deleteClient(showDeleteResident?.Id as number);
                    }
                }}
            >
                <Confirm.Header>
                    <Confirm.Title>
                        {"Deactivate " + clientFullName(showDeleteResident)}
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
