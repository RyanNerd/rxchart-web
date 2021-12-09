import ClientButton from 'components/Pages/Buttons/ClientButton';
import ClientDobButton from 'components/Pages/Buttons/ClientDobButton';
import ClientEdit from 'components/Pages/Modals/ClientEdit';
import ClientRoster from 'components/Pages/Modals/ClientRoster';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {ClientRecord} from 'types/RecordTypes';

/**
 * Dropdown Buttons for the activeClient
 */
const ClientHeader = () => {
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setClientList] = useGlobal('clientList');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [copyText, setCopyText] = useState('');
    const [hmisName, setHmisName] = useState('');
    const [cm] = useGlobal('clientManager');
    const [showClientEdit, setShowClientEdit] = useState(false);
    const [showClientRoster, setShowClientRoster] = useState(false);

    // When copyText is populated copy it to the clipboard
    useEffect(() => {
        /**
         * Use async/await to write to the clipboard
         * @param {string} t The text string to write to the clipboard
         */
        const updateClipboard = async (t: string) => {
            await navigator.clipboard.writeText(t);
            setCopyText('');
        };

        if (copyText !== '') {
            updateClipboard(copyText);
        }
    }, [copyText]);

    /**
     * Launch HMIS website when hmisName is populated, but first copy the name to the clipboard.
     */
    useEffect(() => {
        // Copy paste side effect trigger
        if (hmisName?.trim().length > 0) {
            // Copy name to clipboard.
            setCopyText(hmisName);
            // Kludge to allow clipboard time to get populated.
            setTimeout(() => {
                window.open('https://www.clienttrack.net/utahhmis', '_blank');
                setHmisName('');
            }, 500);
        }
    }, [hmisName]);

    /**
     * Update Resident record
     * @param {ClientRecord} client Resident record object
     */
    const saveClient = async (client: ClientRecord) => {
        if (activeClient) {
            await setActiveClient({...activeClient, clientInfo: await cm.updateClient(client)});
            await setClientList(await cm.loadClientList());
        }
    };

    // No point in rendering if there's not an active client
    if (!activeClient) {
        return null;
    }

    const clientRecord = activeClient.clientInfo;
    return (
        <>
            <h3 className="d-print-none auto-center mb-0" style={{textAlign: 'center'}}>
                <ButtonGroup>
                    <ClientButton
                        className="mr-2"
                        clientRecord={clientRecord}
                        onSelect={(choice) => {
                            switch (choice) {
                                case 'edit':
                                    setShowClientEdit(true);
                                    break;
                                case 'print':
                                    setShowClientRoster(true);
                                    break;
                                case 'copy':
                                    setCopyText(clientRecord.FirstName.trim() + ' ' + clientRecord.LastName);
                                    break;
                                case 'hmis':
                                    setHmisName(clientRecord.FirstName.trim() + ' ' + clientRecord.LastName);
                                    break;
                                case 'switch':
                                    setActiveTabKey('resident');
                                    break;
                            }
                        }}
                    />

                    <ClientDobButton clientRecord={clientRecord} />
                </ButtonGroup>
            </h3>

            {showClientRoster && activeClient && (
                <ClientRoster onUnload={() => setShowClientRoster(false)} clientList={[activeClient.clientInfo]} />
            )}

            <ClientEdit
                clientInfo={clientRecord}
                cm={cm}
                show={showClientEdit}
                onClose={(client) => {
                    setShowClientEdit(false);
                    if (client) saveClient(client);
                }}
            />
        </>
    );
};

export default ClientHeader;
