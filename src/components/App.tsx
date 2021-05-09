import ActiveResidentObserver from "../observers/ActiveResidentObserver";
import ApiKeyObserver from "../observers/ApiKeyObserver";
import AuthObserver from "../observers/AuthObserver";
import ClientObserver from "../observers/ClientObserver";
import ClientRoster from "./Pages/Modals/ClientRoster";
import DrugLogObserver from "../observers/DrugLogObserver";
import ErrorDetailsObserver from "../observers/ErrorDetailsObserver";
import LandingPage from "./Pages/LandingPage";
import MedicineObserver from "../observers/MedicineObserver";
import OtcMedicineObserver from "../observers/OtcMedicineObserver";
import React, {useEffect, useGlobal, useState} from 'reactn';
import TooltipButton from "./Buttons/TooltipButton";
import {clientDOB, clientFullName} from "../utility/common";
import {version} from './../../package.json';
import {Button} from "react-bootstrap"; // @see: https://stackoverflow.com/a/36733261/4323201

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 */
const App = () => {
    const [activeClient] = useGlobal('activeResident');
    const [development] = useGlobal('development');
    const [mm] = useGlobal('medicineManager');
    const [providers] = useGlobal('providers');
    const [rxchartImage, setRxchartImage] = useState<HTMLElement | null>(null);
    const [showClientRoster, setShowClientRoster] = useState(false);

    // The Rx image is established in index.html (outside of the React framework)
    // So we add a native click eventListener via useEffect() and remove the listener when the app closes.
    useEffect(() => {
        /**
         * Show the version from package.json
         */
        const handleImageClick = () => {
            alert('Version: ' + version);
        }

        if (rxchartImage === null) {
            setRxchartImage(document.getElementById("rxchart-img"));
        } else {
            rxchartImage.addEventListener('click', handleImageClick, false);
        }

        return (() => {
            rxchartImage?.removeEventListener('click', handleImageClick, false);
        })
    }, [rxchartImage]);

    /**
     * Initialize all the observers
     * Observers are a type of hybred middleware similar to Publish/Subscribe with intelligent Agents
     * Below we are "Subscribing" the observers.
     * The observers themselves are "Intelligent Agents" that use a global state varaible as a "sensor" to
     * determine what actions need to be taken based on the current state of the machine.
     * @see https://en.wikipedia.org/wiki/Middleware_(distributed_applications)#Types
     *
     * Observers are like functions but instead of accepting arguments they use React's hook mechanisms
     * to observe changes to a single global state variable. The observer decides the actions to take based on the
     * values of the global state variable. The global variable for an observer is an object with
     * the signature of {action: {string}, payload: {any}} with the action string property indicating what action the
     * observer should perform; the payload property contains any information the observer needs to act on.
     * For example the ClientObserver is watching for changes to the global `client` variable. If the client variable
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
    ActiveResidentObserver(activeClient);   // Watching: activeResident
    ApiKeyObserver(providers);              // Watching: apiKey
    ClientObserver();                       // Watching: client
    DrugLogObserver(mm, activeClient);      // Watching: drugLog
    ErrorDetailsObserver();                 // Watching: errorDetails
    AuthObserver();                         // Watching: auth
    MedicineObserver(mm, activeClient);     // Watching: medicine
    OtcMedicineObserver(mm);                // Watching: otcMedicine

    return (
        <>
            {activeClient &&
            <h4
                className="d-print-none"
                style={{textAlign: "center"}}
            >
                <TooltipButton
                    variant={development ? "outline-danger" : "outline-warning"}
                    placement="left"
                    tooltip="Print Medbox Labels"
                    disabled={showClientRoster}
                    onClick={() => setShowClientRoster(true)}
                >
                        <span style={{fontStyle: development ? "italic" : "bold"}}>
                            {clientFullName(activeClient)}
                        </span>
                </TooltipButton>

                <Button
                    variant="outline-dark"
                    disabled={true}
                >
                    <span style={{fontStyle: "bold"}}>
                        {clientDOB(activeClient)}
                    </span>
                </Button>
            </h4>
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
        </>
    );
}

export default App;
