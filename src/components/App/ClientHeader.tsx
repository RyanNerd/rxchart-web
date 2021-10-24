import ClientButton from 'components/Pages/Buttons/ClientButton';
import ClientDobButton from 'components/Pages/Buttons/ClientDobButton';
import ClientRoster from 'components/Pages/Modals/ClientRoster';
import ResidentEdit from 'components/Pages/Modals/ResidentEdit';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {ResidentRecord} from 'types/RecordTypes';

/**
 * Dropdown Buttons for the activeClient
 */
const ClientHeader = () => {
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [, setResidentList] = useGlobal('residentList');
    const [activeClient, setActiveClient] = useGlobal('activeResident');
    const [copyText, setCopyText] = useState('');
    const [hmisName, setHmisName] = useState('');
    const [rm] = useGlobal('residentManager');
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
     * @param {ResidentRecord} client Resident record object
     */
    const saveClient = async (client: ResidentRecord) => {
        const r = await rm.updateResident(client);
        if (r) {
            const rl = await rm.loadResidentList();
            await setResidentList(rl);
            await setActiveClient(r);
        }
    };

    // No point in rendering if there's not an active client
    if (!activeClient) {
        return null;
    }

    return (
        <>
            <h3 className="d-print-none auto-center mb-0" style={{textAlign: 'center'}}>
                <ButtonGroup>
                    <ClientButton
                        className="mr-2"
                        clientRecord={activeClient}
                        onSelect={(choice) => {
                            switch (choice) {
                                case 'edit':
                                    setShowClientEdit(true);
                                    break;
                                case 'print':
                                    setShowClientRoster(true);
                                    break;
                                case 'copy':
                                    setCopyText(activeClient.FirstName.trim() + ' ' + activeClient.LastName);
                                    break;
                                case 'hmis':
                                    setHmisName(activeClient.FirstName.trim() + ' ' + activeClient.LastName);
                                    break;
                                case 'switch':
                                    setActiveTabKey('resident');
                                    break;
                            }
                        }}
                    />

                    <ClientDobButton clientRecord={activeClient} />
                </ButtonGroup>
            </h3>

            {showClientRoster && activeClient && (
                <ClientRoster onUnload={() => setShowClientRoster(false)} clientList={[activeClient]} />
            )}

            <ResidentEdit
                residentInfo={activeClient as ResidentRecord}
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
