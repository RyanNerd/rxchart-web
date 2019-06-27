import React, {useGlobal} from 'reactn';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginPage from './../Login/LoginPage';
import ScanPage from "../Scan/ScanPage";
import ResidentPage from "../Resident/ResidentPage";

function LandingPage() {
    const [ currentTabKey, setCurrentTabKey ] = useGlobal('currentTabKey');
    const [ apiKey ] = useGlobal('apiKey');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={currentTabKey}
            onSelect={key => setCurrentTabKey(key)}
        >
            <Tab
                sytle={{marginLeft: "15px"}}
                eventKey="login"
                title={apiKey ? "Logout" : "Login"}
            >
                <LoginPage onLogin={(loggedIn) => {setCurrentTabKey(loggedIn ? 'scan' : 'login')}} />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="scan"
                title="Lookup"
            >
                <ScanPage/>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="log"
                title="Medicine Log">
                <p>Place Holder for Medicine Log</p>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title="Resident List">
                <ResidentPage />
            </Tab>
        </Tabs>
    );
}

export default LandingPage;