import ActiveResidentObserver from "../observers/ActiveResidentObserver";
import ApiKeyObserver from "../observers/ApiKeyObserver";
import ClientObserver from "../observers/ClientObserver";
import DeleteOtcMedcineObserver from "../observers/DeleteOtcMedicineObserver";
import ErrorDetailsObserver from "../observers/ErrorDetailsObserver";
import LandingPage from "./Pages/LandingPage";
import LoginObserver from "../observers/LoginObserver";
import LogoutObserver from "../observers/LogoutObserver";
import React, {useGlobal} from 'reactn';
import RefreshOtcObserver from "../observers/RefreshOtcObserver";
import UpdateOtcMedicineObserver from "../observers/UpdateOtcMedicineObserver";
import {clientFullName, clientDOB} from "../utility/common";
import MedicineObserver from "../observers/MedicineObserver";
import DrugLogObserver from "../observers/DrugLogObserver";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [activeClient] = useGlobal('activeResident');
    const [am] = useGlobal('authManager');
    const [development] = useGlobal('development');
    const [mm] = useGlobal('medicineManager');
    const [providers] = useGlobal('providers');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    // Initialize all the observers
    ActiveResidentObserver(activeClient);
    ApiKeyObserver(providers);
    ClientObserver();
    DeleteOtcMedcineObserver(mm);
    DrugLogObserver(mm, activeClient);
    ErrorDetailsObserver();
    LoginObserver(am);
    LogoutObserver();
    MedicineObserver(mm, activeClient);
    RefreshOtcObserver(mm);
    UpdateOtcMedicineObserver(mm);

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
