import DiagnosticPage from "./DiagnosticPage";
import DrugHistoryPage from "./DrugHistoryPage";
import getInitialState from "../../utility/getInitialState";
import LoginPage from './LoginPage';
import ManageDrugPage from "./ManageDrugPage";
import ManageOtcPage from "./ManageOtcPage";
import MedicinePage from "./MedicinePage";
import OtcPage from "./OtcPage";
import React, {setGlobal, useGlobal} from 'reactn';
import ResidentPage from "./ResidentPage";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

/**
 * Landing Page - Tab Page Menu UI
 * @constructor
 */
const LandingPage = () => {
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [apiKey] = useGlobal('apiKey');
    const [errorDetails] = useGlobal('errorDetails');

    return (
        <Tabs
            id="landing-page-tabs"
            activeKey={activeTabKey}
            onSelect={(key) => setActiveTabKey(key || 'login')}
        >
            <Tab
                disabled={errorDetails}
                eventKey="login"
                title={<span className={activeTabKey === 'login' ? 'bld' : ''}>{apiKey ? 'Logout' : 'Login'}</span>}
            >
                <LoginPage/>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title={<span className={activeTabKey === 'resident' ? 'bld' : ''}>Resident</span>}>
                <ResidentPage
                    residentSelected={() => setActiveTabKey('medicine')}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="medicine"
                title={<span className={activeTabKey === 'medicine' ? 'bld' : ''}>Rx</span>}>
                <MedicinePage/>
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="otc"
                title={<span className={activeTabKey === 'otc' ? 'bld' : ''}>OTC</span>}>
                <OtcPage/>
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="history"
                title={<span className={activeTabKey === 'history' ? 'bld' : ''}>Drug History</span>}
            >
                <DrugHistoryPage/>
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="manage"
                title={<span className={activeTabKey === 'manage' ? 'bld' : ''}>Manage Rx</span>}
            >
                <ManageDrugPage/>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="manage-otc"
                title={<span className={activeTabKey === 'manage-otc' ? 'bld' : ''}>Manage OTC</span>}
            >
                <ManageOtcPage/>
            </Tab>
            <Tab
                disabled={!errorDetails}
                eventKey="error"
                title={<span className={activeTabKey === 'error' ? 'bld' : ''}>Diagnostics</span>}
            >
                <DiagnosticPage
                    error={errorDetails}
                    dismissErrorAlert={() => {
                        setGlobal(getInitialState());
                        setActiveTabKey('login');
                    }}
                />
            </Tab>
        </Tabs>
    );
}

export default LandingPage;
