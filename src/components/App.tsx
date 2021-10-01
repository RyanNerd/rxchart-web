import ButtonGroup from "react-bootstrap/ButtonGroup";
import React, {useEffect, useGlobal, useState} from 'reactn';
import {ResidentRecord} from "types/RecordTypes";
import {ReactComponent as RxIcon} from "../icons/prescription.svg";
import ActiveResidentObserver from "../observers/ActiveResidentObserver";
import ApiKeyObserver from "../observers/ApiKeyObserver";
import AuthObserver from "../observers/AuthObserver";
import ErrorDetailsObserver from "../observers/ErrorDetailsObserver";
import ClientButton from "./Buttons/ClientButton";
import ClientDobButton from "./Buttons/ClientDobButton";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/Modals/About";
import ClientRoster from "./Pages/Modals/ClientRoster";
import ResidentEdit from "./Pages/Modals/ResidentEdit";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 */
const App = () => {
    const [activeClient, setActiveClient] = useGlobal('activeResident');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [development] = useGlobal('development');
    const [providers] = useGlobal('providers');
    const [showClientEdit, setShowClientEdit] = useState(false);
    const [showClientRoster, setShowClientRoster] = useState(false);
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn] = useGlobal('signIn');
    const [hmisName, setHmisName] = useState('');
    const [copyText, setCopyText] = useState('');
    const [rm] = useGlobal('residentManager');
    const [, setResidentList] = useGlobal('residentList');

    /**
     * Initialize all the observers
     */
    ActiveResidentObserver(activeClient);   // Watching: __activeResident
    ApiKeyObserver(providers, signIn);      // Watching: apiKey
    ErrorDetailsObserver();                 // Watching: __errorDetails
    AuthObserver();                         // Watching: __auth

    /**
     * Update Resident record
     * @param {ResidentRecord} client
     */
    const saveClient = async (client: ResidentRecord) => {
        const r = await rm.updateResident(client);
        if (r) {
            const rl = await rm.loadResidentList();
            await setResidentList(rl);
            await setActiveClient(r);
        }
    }

    // When copyText is populated copy it to the clipboard
    useEffect(() => {
        /**
         * Use async/await to write to the clipboard
         * @param {string} t
         */
        const updateClipboard = async (t: string) => {
            await navigator.clipboard.writeText(t);
            setCopyText('');
        }

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
            setTimeout(()=> {
                window.open('https://www.clienttrack.net/utahhmis', '_blank');
                setHmisName('');
            }, 500);
        }
    }, [hmisName]);

    return (
        <>
            <h3 style={{textAlign: "center"}} className="d-print-none">℞Chart{ }
                <RxIcon
                    style={{cursor: "pointer", pointerEvents: "all"}}
                    onClick={()=>setShowAboutPage(true)}
                    width="30px"
                    height="35px"
                />
                <span
                    style={{color: "steelblue"}}
                >
                    {signIn.organization}
                </span>
            </h3>

            {activeClient &&
            <h1
                className="d-print-none auto-center"
                style={{textAlign: "center"}}
            >
                <ButtonGroup>
                    <ClientButton
                        className="mr-2"
                        clientRecord={activeClient}
                        development={development}
                        onSelect={(choice)=> {
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

                    <ClientDobButton
                        clientRecord={activeClient}
                        development={development}
                    />
                </ButtonGroup>
            </h1>
            }

            <div style={{marginLeft: "15px"}}>
                <React.StrictMode>
                    <LandingPage/>
                </React.StrictMode>
            </div>

            {showClientRoster && activeClient &&
            <ClientRoster
                onUnload={() => setShowClientRoster(false)}
                clientList={[activeClient]}
            />
            }

            <ResidentEdit
                residentInfo={activeClient as ResidentRecord}
                show={activeClient !== null && showClientEdit}
                onClose={(client) => {
                    setShowClientEdit(false);
                    if (client) saveClient(client);
                }}
            />

            <About
                show={showAboutPage}
                onHide={()=>setShowAboutPage(false)}
            />
        </>
    );
}

export default App;
