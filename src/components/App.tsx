import ActiveResidentObserver from "../observers/ActiveResidentObserver";
import ApiKeyObserver from "../observers/ApiKeyObserver";
import ClientObserver from "../observers/ClientObserver";
import DrugLogObserver from "../observers/DrugLogObserver";
import ErrorDetailsObserver from "../observers/ErrorDetailsObserver";
import LandingPage from "./Pages/LandingPage";
import MedicineObserver from "../observers/MedicineObserver";
import OtcMedicineObserver from "../observers/OtcMedicineObserver";
import React, {useGlobal} from 'reactn';
import {clientFullName, clientDOB} from "../utility/common";
import AuthObserver from "../observers/AuthObserver";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [activeClient] = useGlobal('activeResident');
    const [development] = useGlobal('development');
    const [mm] = useGlobal('medicineManager');
    const [providers] = useGlobal('providers');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    // Initialize all the observers
    ActiveResidentObserver(activeClient);
    ApiKeyObserver(providers);
    ClientObserver();
    DrugLogObserver(mm, activeClient);
    ErrorDetailsObserver();
    AuthObserver();
    MedicineObserver(mm, activeClient);
    OtcMedicineObserver(mm);

    return (
        <>
            {activeClient &&
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {clientFullName(activeClient) + ' ' + clientDOB(activeClient)}
                    </span>
                </h4>
            }

            <div style={{marginLeft: "15px"}}>
                <LandingPage/>
            </div>
        </>
    );
}

export default App;
