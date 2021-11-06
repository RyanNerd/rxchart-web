import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {newResidentRecord, ClientRecord} from 'types/RecordTypes';
import {clientFullName} from 'utility/common';
import ClientGrid from 'components/Pages/Grids/ClientGrid';
import ClientRoster from './Modals/ClientRoster';
import Confirm from './Modals/Confirm';
import ResidentEdit from './Modals/ResidentEdit';

interface IProps {
    clientSelected: () => void;
    activeTabKey: string;
}

/**
 * Display Resident Grid
 * Allow user to edit and add Clients
 * @param {IProps} props Props for the component
 * @returns {JSX.Element | null}
 */
const ClientPage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [clientList, setClientList] = useGlobal('clientList');
    const [filteredClients, setFilteredClients] = useState<ClientRecord[]>(clientList);
    const [mm] = useGlobal('medicineManager');
    const [cm] = useGlobal('clientManager');
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showClientRoster, setShowClientRoster] = useState(false);
    const [showDeleteResident, setShowDeleteResident] = useState<null | ClientRecord>(null);
    const [showResidentEdit, setShowResidentEdit] = useState<ClientRecord | null>(null);
    const focusRef = useRef<HTMLInputElement>(null);

    // Filter the resident list by the search textbox value
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = clientList.filter((residentRecord) => {
                const firstName = residentRecord.FirstName.toLowerCase();
                const lastName = residentRecord.LastName.toLowerCase();
                const nickname = residentRecord.Nickname ? residentRecord.Nickname.toLowerCase() : '';
                const search = searchText.toLowerCase();
                return lastName.includes(search) || firstName.includes(search) || nickname.includes(search);
            });

            if (filter && filter.length > 0) {
                setSearchIsValid(true);
                setFilteredClients(filter);
            } else {
                setSearchIsValid(false);
                setFilteredClients([]);
            }
        } else {
            setSearchIsValid(false);
            setFilteredClients(clientList);
        }
    }, [clientList, searchText]);

    useEffect(() => {
        focusRef?.current?.focus();
    }, [focusRef]);

    // Don't render if this tab isn't active.
    if (props.activeTabKey !== 'resident') return null;

    const onSelected = props.clientSelected;

    /**
     * Fires when user clicks on the select button or if the user is trying to add an existing active client
     * @param {ClientRecord} clientRecord A ClientRecord object to set as the activeClient.clientInfo
     */
    const handleOnSelected = (clientRecord?: ClientRecord) => {
        const refreshClient = async (clientRec: ClientRecord): Promise<void> => {
            const clientId = clientRec.Id as number;
            try {
                await setActiveClient({
                    ...activeClient,
                    drugLogList: await mm.loadDrugLog(clientId, 5),
                    medicineList: await mm.loadMedicineList(clientId),
                    pillboxItemList: await mm.loadPillboxItemList(clientId),
                    pillboxList: await mm.loadPillboxList(clientId),
                    clientInfo: clientRec
                });
            } catch (e) {
                await setErrorDetails(e);
            }
        };

        if (clientRecord) {
            refreshClient(clientRecord)
                .then(() => onSelected())
                .then(() => setSearchText(''));
        } else {
            setSearchText('');
            onSelected();
        }
    };

    /**
     * Given the ResidentRecord update/insert the record, rehydrate the clientList global
     * @param {ClientRecord} client The client record object
     */
    const saveClient = async (client: ClientRecord) => {
        const r = await cm.updateClient(client);
        await setClientList(await cm.loadClientList());
        return r;
    };

    /**
     * Given the client Id number deactivate (soft-delete) the client
     * @param {number} clientId The PK of the Resident table
     */
    const deleteClient = async (clientId: number) => {
        if (await cm.deleteClient(clientId)) {
            await setClientList(await cm.loadClientList());
            await setActiveClient(null);
            setSearchText('');
        }
    };

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
                    style={{width: '220px'}}
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
                    }}
                >
                    Print Client Roster
                </Button>

                {showClientRoster && (
                    <ClientRoster onUnload={() => setShowClientRoster(false)} clientList={clientList} />
                )}
            </Row>

            <Row className="mt-3">
                <ClientGrid
                    activeClient={activeClient}
                    residentList={filteredClients}
                    onDelete={(resident: ClientRecord) => setShowDeleteResident(resident)}
                    onEdit={(resident: ClientRecord) => setShowResidentEdit({...resident})}
                    onSelected={(r) => handleOnSelected(r)}
                />
            </Row>

            <ResidentEdit
                residentInfo={showResidentEdit as ClientRecord}
                show={showResidentEdit !== null}
                onClose={(client) => {
                    // Hide this modal
                    setShowResidentEdit(null);

                    // Do we have a record to update or add?
                    if (client) {
                        // Are we adding a new record?
                        if (client.Id === null) {
                            // Search clientList for any existing clients to prevent adding dupes
                            const existing = clientList.find(
                                (r) =>
                                    r.FirstName.trim().toLowerCase() === client.FirstName.trim().toLowerCase() &&
                                    r.LastName.trim().toLowerCase() === client.LastName.trim().toLowerCase() &&
                                    (typeof r.DOB_DAY === 'string' ? parseInt(r.DOB_DAY) : r.DOB_DAY) ===
                                        (typeof client.DOB_DAY === 'string'
                                            ? parseInt(client.DOB_DAY)
                                            : client.DOB_DAY) &&
                                    (typeof r.DOB_MONTH === 'string' ? parseInt(r.DOB_MONTH) : r.DOB_MONTH) ===
                                        (typeof client.DOB_MONTH === 'string'
                                            ? parseInt(client.DOB_MONTH)
                                            : client.DOB_MONTH) &&
                                    (typeof r.DOB_YEAR === 'string' ? parseInt(r.DOB_YEAR) : r.DOB_YEAR) ===
                                        (typeof client.DOB_YEAR === 'string'
                                            ? parseInt(client.DOB_YEAR)
                                            : client.DOB_YEAR)
                            );

                            // Is user trying to add an existing active client?
                            // If so then make the exiting client the active instead.
                            if (existing) {
                                handleOnSelected();
                                return;
                            }
                        }
                        saveClient(client).then((c) => handleOnSelected(c));
                    }
                }}
            />

            {showDeleteResident && (
                <Confirm.Modal
                    show={true}
                    onSelect={(a) => {
                        setShowDeleteResident(null);
                        if (a) deleteClient(showDeleteResident?.Id as number);
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>{'Deactivate ' + clientFullName(showDeleteResident)}</Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert variant="danger">Are you sure?</Alert>
                    </Confirm.Body>
                </Confirm.Modal>
            )}
        </Form>
    );
};

export default ClientPage;
