import React, {useGlobal, useState} from 'reactn';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Example from './../../Example';
import LoginPage from './../Login/LoginPage';
import ScanPage from "../Scan/ScanPage";

function LandingPage() {
    const [key, setKey] = useState('login');
    const [apiKey, setApiKey] = useGlobal('apiKey');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={key => setKey(key)}
        >
            <Tab
                sytle={{marginLeft: "15px"}}
                eventKey="login"
                title={apiKey ? "Logout" : "Login"}
            >
                <LoginPage onLogin={(loggedIn) => {setKey(loggedIn ? 'scan' : 'login')}} />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="scan"
                title="Scan Barcode"
            >
                <ScanPage/>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title="Resident">
                <Example variant="light"/>
            </Tab>
        </Tabs>
    );
}

export default LandingPage;