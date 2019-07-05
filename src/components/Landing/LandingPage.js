import React, {useGlobal} from 'reactn';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginPage from './../Login/LoginPage';
import ResidentPage from "../Resident/ResidentPage";
import MedicinePage from "../Medicine/MedicinePage";

function LandingPage() {
    const [ activeTabKey, setActiveTabKey ] = useGlobal('activeTabKey');
    const [ apiKey ] = useGlobal('apiKey');

    return (
        <Tabs
            id="controlled-tab-example"
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
                title="Medicine Log">
                <MedicinePage/>
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