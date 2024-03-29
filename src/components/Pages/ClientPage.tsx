import ClientGrid from 'components/Pages/Grids/ClientGrid';
import ClientEdit from 'components/Pages/Modals/ClientEdit';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {ClientRecord, newResidentRecord} from 'types/RecordTypes';
import {asyncWrapper, clientFullName} from 'utility/common';
import ClientRoster from './Modals/ClientRoster';
import Confirm from './Modals/Confirm';

interface IProps {
    clientSelected: () => void;
    activeTabKey: string;
}

/**
 * Display Resident Grid
 * Allow user to edit and add Clients
 * @param {IProps} props Props for the component
 */
const ClientPage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [clientList, setClientList] = useGlobal('clientList');
    const [filteredClients, setFilteredClients] = useState<ClientRecord[]>(clientList);
    const [providers] = useGlobal('providers');
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showClientEdit, setShowClientEdit] = useState<ClientRecord | null>(null);
    const [showClientRoster, setShowClientRoster] = useState(false);
    const [showDeleteResident, setShowDeleteResident] = useState<null | ClientRecord>(null);
    const clientProvider = providers.clientProvider;
    const focusReference = useRef<HTMLInputElement>(null);

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
        focusReference?.current?.focus();
    }, [focusReference]);

    // Don't render if this tab isn't active.
    if (props.activeTabKey !== 'resident') return null;

    const onSelected = props.clientSelected;

    /**
     * Given the client PK load the client info from the API and set as the ActiveClient
     * @param {number} clientId Client PK
     */
    const refreshClient = async (clientId: number): Promise<void> => {
        try {
            const clientLoad = await clientProvider.load(clientId);
            await setActiveClient({
                ...activeClient,
                clientInfo: clientLoad.clientInfo,
                fileList: clientLoad.fileList,
                drugLogList: clientLoad.drugLogList,
                medicineList: clientLoad.medicineList,
                pillboxList: clientLoad.pillboxList,
                pillboxItemList: clientLoad.pillboxItemList
            });
        } catch (error) {
            await setErrorDetails(error);
        }
    };

    /**
     * Rehydrate the global clientList
     */
    const refreshClientList = async () => {
        const [clientListError, clientList] = (await asyncWrapper(clientProvider.loadList())) as [
            unknown,
            Promise<ClientRecord[]>
        ];
        await (clientListError ? setErrorDetails(clientListError) : setClientList(await clientList));
    };

    /**
     * Fires when user clicks on the select button or user has edited/added a client
     * @param {ClientRecord} clientRecord A ClientRecord object to set as the activeClient.clientInfo
     */
    const handleOnSelected = async (clientRecord?: ClientRecord) => {
        if (clientRecord) {
            await refreshClientList();
            await refreshClient(clientRecord.Id as number);
            onSelected();
            setSearchText('');
        } else {
            setSearchText('');
            onSelected();
        }
    };

    /**
     * Given the client Id number deactivate (soft-delete) the client
     * @param {number} clientId The PK of the Resident table
     */
    const deleteClient = async (clientId: number) => {
        try {
            if (await clientProvider.delete(clientId)) {
                await refreshClientList();
                await setActiveClient(null);
                setSearchText('');
            }
        } catch (requestError) {
            await setErrorDetails(requestError);
        }
    };

    return (
        <Form className="tab-content">
            <Row as={ButtonGroup}>
                <Button className="mr-2" onClick={() => setShowClientEdit({...newResidentRecord})}>
                    + Client
                </Button>

                <Form.Control
                    autoFocus
                    id="client-page-search-text"
                    isValid={searchIsValid}
                    onChange={(changeEvent) => setSearchText(changeEvent.target.value)}
                    onKeyDown={(keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
                        if (keyboardEvent.key === 'Enter') keyboardEvent.preventDefault();
                    }}
                    placeholder="Search client"
                    ref={focusReference}
                    style={{width: '220px'}}
                    type="search"
                    value={searchText}
                />

                <Button className="ml-2" disabled={showClientRoster} onClick={() => setShowClientRoster(true)}>
                    Print Client Roster
                </Button>

                {showClientRoster && (
                    <ClientRoster onUnload={() => setShowClientRoster(false)} clientList={clientList} />
                )}
            </Row>

            <Row className="mt-3">
                <ClientGrid
                    activeClient={activeClient}
                    onDelete={(resident: ClientRecord) => setShowDeleteResident(resident)}
                    onEdit={(resident: ClientRecord) => setShowClientEdit({...resident})}
                    onSelected={(r) => handleOnSelected(r)}
                    residentList={filteredClients}
                />
            </Row>

            <ClientEdit
                clientInfo={showClientEdit as ClientRecord}
                clientProvider={clientProvider}
                onClose={(client) => {
                    setShowClientEdit(null);

                    // Do we have a record to update or add?
                    if (client) handleOnSelected(client);
                }}
                show={showClientEdit !== null}
            />

            {showDeleteResident && (
                <Confirm.Modal
                    show={true}
                    onSelect={(isAccepted) => {
                        setShowDeleteResident(null);
                        if (isAccepted) deleteClient(showDeleteResident?.Id as number);
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
