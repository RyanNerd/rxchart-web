import React, {useGlobal} from 'reactn';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginPage from './../Login/LoginPage';
import ResidentPage from "../Resident/ResidentPage";
import MedicinePage from "../Medicine/MedicinePage";

function LandingPage() {
    const [ activeTabKey, setActiveTabKey ] = useGlobal('activeTabKey');
    const [ apiKey ] = useGlobal('apiKey');
    const [ activeResident ] = useGlobal('activeResident');

    return (
        <Tabs
            id="landing-page-tabs"
            activeKey={activeTabKey}
            onSelect={key => setActiveTabKey(key)}
        >
            <Tab
                sytle={{marginLeft: "15px"}}
                eventKey="login"
                title={apiKey ? "Logout" : "Login"}
            >
                <LoginPage onLogin={(loggedIn) => {setActiveTabKey(loggedIn ? 'drugs' : 'login')}} />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="drugs"
                title="Scan">
                <MedicinePage/>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title="Resident List">
                <ResidentPage />
            </Tab>
            <Tab
                disabled={apiKey === null || activeResident === null}
                eventKey="history"
                title="Drug History"
            >
                <p>Drug History Placeholder</p>
            </Tab>
            <Tab
                disabled={apiKey === null || activeResident === null}
                eventKey="manage"
                title="Manage Drugs"
            >
                <p>Manage Drugs Placeholder</p>
            </Tab>
        </Tabs>
    );
}

export default LandingPage;