import ActiveResidentObserver from "../observers/ActiveResidentObserver";
import ApiKeyObserver from "../observers/ApiKeyObserver";
import DeleteClientObserver from "../observers/DeleteClientObserver";
import DeleteDrugLogObserver from "../observers/DeleteDrugLogObserver";
import DeleteMedicineObserver from "../observers/DeleteMedicineObserver";
import DeleteOtcMedcineObserver from "../observers/DeleteOtcMedicineObserver";
import ErrorDetailsObserver from "../observers/ErrorDetailsObserver";
import LandingPage from "./Pages/LandingPage";
import LoginObserver from "../observers/LoginObserver";
import React, {useGlobal} from 'reactn';
import RefreshClientsObserver from "../observers/RefreshClientsObserver";
import RefreshDrugLogObserver from "../observers/RefreshDrugLogObserver";
import RefreshMedicineObserver from "../observers/RefreshMedicineObserver";
import RefreshOtcObserver from "../observers/RefreshOtcObserver";
import UpdateClientOvserver from "../observers/UpdateClientObserver";
import UpdateDrugLogObserver from "../observers/UpdateDrugLogObserver";
import UpdateMedicineObserver from "../observers/UpdateMedicineObserver";
import UpdateOtcMedicineObserver from "../observers/UpdateOtcMedicineObserver";
import {clientFullName, clientDOB} from "../utility/common";

/**
 * Main Entry Component
 * Also the single source of truth for database updates and global state management
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    const [activeResident] = useGlobal('activeResident');
    const [am] = useGlobal('authManager');
    const [development] = useGlobal('development');
    const [mm] = useGlobal('medicineManager');
    const [providers] = useGlobal('providers');
    const [rm] = useGlobal('residentManager');
    const residentColor = development ? 'blue' : "#edf11e";
    const residentForegroundColor = development ? "#fffff0" : "black";

    // Initialize all the observers
    ActiveResidentObserver(activeResident);
    ApiKeyObserver(providers);
    DeleteClientObserver(rm);
    DeleteDrugLogObserver(mm, activeResident);
    DeleteMedicineObserver(mm, activeResident);
    DeleteOtcMedcineObserver(mm);
    ErrorDetailsObserver();
    LoginObserver(am);
    RefreshClientsObserver(rm);
    RefreshDrugLogObserver(mm);
    RefreshMedicineObserver(mm);
    RefreshOtcObserver(mm);
    UpdateClientOvserver(rm);
    UpdateDrugLogObserver(mm);
    UpdateMedicineObserver(mm);
    UpdateOtcMedicineObserver(mm);

    return (
        <>
            {activeResident &&
                <h4 style={{textAlign: "center"}}>
                    <span style={{background: residentColor, color: residentForegroundColor}}>
                        {clientFullName(activeResident) + ' ' + clientDOB(activeResident)}
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
