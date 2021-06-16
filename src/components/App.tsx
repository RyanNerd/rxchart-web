import React, {useGlobal, useState, useEffect} from 'reactn';

import {ButtonGroup} from "react-bootstrap";

import About from "./Pages/Modals/About";
import ActiveResidentObserver from "../observers/ActiveResidentObserver";
import ApiKeyObserver from "../observers/ApiKeyObserver";
import AuthObserver from "../observers/AuthObserver";
import ClientButton from "./Buttons/ClientButton";
import ClientDobButton from "./Buttons/ClientDobButton";
import ClientObserver from "../observers/ClientObserver";
import ClientRoster from "./Pages/Modals/ClientRoster";
import DrugLogObserver from "../observers/DrugLogObserver";
import ErrorDetailsObserver from "../observers/ErrorDetailsObserver";
import LandingPage from "./Pages/LandingPage";
import MedicineObserver from "../observers/MedicineObserver";
import OtcMedicineObserver from "../observers/OtcMedicineObserver";
import ResidentEdit from "./Pages/Modals/ResidentEdit";
import {ReactComponent as RxIcon} from "../icons/prescription.svg";
import {ResidentRecord} from "../types/RecordTypes";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 */
const App = () => {
    const [, setClient] = useGlobal('__client');
    const [activeClient, setActiveClient] = useGlobal('activeResident');
    const [, setActiveTabKey] = useGlobal('activeTabKey');
    const [development] = useGlobal('development');
    const [mm] = useGlobal('medicineManager');
    const [providers] = useGlobal('providers');
    const [showClientEdit, setShowClientEdit] = useState(false);
    const [showClientRoster, setShowClientRoster] = useState(false);
    const [showAboutPage, setShowAboutPage] = useState(false);
    const [signIn] = useGlobal('signIn');
    const [hmisName, setHmisName] = useState('');

    /**
     * Initialize all the observers
     * Observers are a type of hybrid middleware similar to Publish/Subscribe with intelligent Agents
     * Below we are "Subscribing" the observers.
     * The observers themselves are "Intelligent Agents" that use a global state variable as a "sensor" to
     * determine what actions need to be taken based on the current state of the machine.
     * @see https://en.wikipedia.org/wiki/Middleware_(distributed_applications)#Types
     *
     * Observers are like functions but instead of accepting arguments they use React's hook mechanisms
     * to observe changes to a single global state variable. The observer decides the actions to take based on the
     * values of the global state variable. The global variable for an observer is an object with
     * the signature of {action: string, payload: any, cb?: ()=>void } with the action string property indicating what
     * action the observer should perform; the payload property contains any information the observer needs to act on.
     * Optionally there may be a call back signature which can be used to update the invoking process with state change.
     * For example the ClientObserver is watching for changes to the global `__client` variable. If the client variable
     * isn't null then the observer expects the client variable to be an object with the action property set to one
     * of three values: 'load', 'update', or 'delete'
     * If the action is 'load' then the observer will load all client records into the global variable residentList.
     * If the action is 'update' then the observer will add or update the given client record by what is in the payload.
     * If the action is 'delete' then the observer will delete the client record indicated by the primary key value in
     * the payload property.
     * Advantages:
     * - Simplicity: Set the observed global variable action and payload then automatically the observer will
     *               act accordingly.
     * - Declarative: Observers are pure functions implemented via React hooks.
     * - Robust: Due to the declarive nature unexpected side effects & state mutations are minimized.
     * Disadvantages:
     * - Abstraction: Instead of importing an observer, a client sets the observed global variable. Unlike importing
     *                a function which would have a signature it isn't always obvious what action strings and payload
     *                values are acceptable.
     * - Flow: Observers react to state changes to the watched global variable so code is executed similar to events
     *         when the state changes the code executes as opposed to line-by-line linear processing.
     * - Not OOP: Observers are pure functions lacking the advantages (and disadvantages) of object oriented
     *            architecture.
     */
    ActiveResidentObserver(activeClient);   // Watching: __activeResident
    ApiKeyObserver(providers, signIn);      // Watching: apiKey
    ClientObserver();                       // Watching: __client
    DrugLogObserver(mm, activeClient);      // Watching: __drugLog
    ErrorDetailsObserver();                 // Watching: __errorDetails
    AuthObserver();                         // Watching: __auth
    MedicineObserver(mm, activeClient);     // Watching: __medicine
    OtcMedicineObserver(mm);                // Watching: __otcMedicine

    /**
     * Launch HMIS website when hmisName is populated, but first copy the name to the clipboard.
     */
    useEffect(() => {
        if (hmisName?.trim().length > 0) {
            const handleClipboardEvent = (e: ClipboardEvent) => {
                e?.clipboardData?.setData('text/plain', (hmisName));
                e.preventDefault();
            }
            document.addEventListener('copy', (e: ClipboardEvent) => handleClipboardEvent(e));
            document.execCommand('copy');
            window.open('https://www.clienttrack.net/utahhmis', '_blank');
            setHmisName('');
            return ()=> document.removeEventListener('copy', handleClipboardEvent);
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
                                case 'hmis':
                                    setHmisName(activeClient.LastName + ', ' + activeClient.FirstName);
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
                <LandingPage/>
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
                    setClient(
                        client ? {
                            action: "update",
                            payload: client,
                            cb: (c) => setActiveClient(c as ResidentRecord)
                        } : null
                    );
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
