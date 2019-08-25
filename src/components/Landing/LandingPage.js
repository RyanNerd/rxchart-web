import React, {useGlobal, useState} from 'reactn';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginPage from './../Login/LoginPage';
import ResidentPage from "../Resident/ResidentPage";
import MedicinePage from "../Medicine/MedicinePage";
import DrugHistoryGrid from "../DrugHistory/DrugHistoryGrid";

function LandingPage()
{
    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ activeResident ] = useGlobal('activeResident');
    const [ development ] = useGlobal('development');
    const [ drugLogList ] = useGlobal('drugLogList');
    const [ medicineList ] = useGlobal('medicineList');

    const [ errorDetails, setErrorDetails ] = useState(null);
    const [ activeTabKey, setActiveTabKey ] = useState('login');

    function errorOccurred(err)
    {
        if (development) {
            console.error('Error', err);
            if (err) {
                setErrorDetails(err.toString());
            } else {
                setErrorDetails('Unknown Error');
            }
        } else {
            setErrorDetails('Something went wrong. Please check your internet connection and sign back in.');
        }
        setApiKey(null);
        setActiveTabKey('error');
    }

    return (
        <Tabs
            id="landing-page-tabs"
            activeKey={activeTabKey}
            onSelect={(key) => setActiveTabKey(key)}
        >
            <Tab
                sytle={{marginLeft: "15px"}}
                eventKey="login"
                title={apiKey ? "Logout" : "Login"}
            >
                <LoginPage
                    onLogin={(loggedIn) => {setActiveTabKey(loggedIn ? 'drugs' : 'login')}}
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="drugs"
                title="Scan">
                <MedicinePage
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title="Resident List">
                <ResidentPage
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || activeResident === null}
                eventKey="history"
                title="Drug History"
            >
                <DrugHistoryGrid
                    drugLogList={drugLogList}
                    medicineList={medicineList}
                    drugId={null}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || activeResident === null}
                eventKey="manage"
                title="Manage Drugs"
            >
                <p>Manage Drugs Placeholder</p>
            </Tab>
            <Tab
                disabled={activeTabKey !== 'error'}
                eventKey="error"
                title="Diagnostics"
            >
                <p>{errorDetails}</p>
            </Tab>
        </Tabs>
    );
}

export default LandingPage;