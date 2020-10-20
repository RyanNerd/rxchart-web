import DiagnosticPage from "./DiagnosticPage";
import DrugHistoryPage from "./DrugHistoryPage";
import LoginPage from './LoginPage';
import ManageDrugPage from "./ManageDrugPage";
import ManageOtcPage from "./ManageOtcPage";
import MedicinePage from "./MedicinePage";
import OtcPage from "./OtcPage";
import React, {useGlobal, useState} from 'reactn';
import ResidentPage from "./ResidentPage";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useEffect} from "react";

interface ITitle {
    [key: string]: string
}

/**
 * Landing Page - Tab Page Menu UI
 * @constructor
 */
const LandingPage = () => {
    const [activeResident] = useGlobal('activeResident');
    const [apiKey, setApiKey] = useGlobal('apiKey');
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineList] = useGlobal('medicineList');
    const [otcList] = useGlobal('otcList');
    const [activeTabKey, setActiveTabKey] = useState<string | null>('login');
    const [errorDetails, setErrorDetails] = useState<any>(null);

    /**
     * Determine the table title component based on eventKey and bold the title if it is the current tab
     * @param eventKey
     */
    const getTitle = (eventKey: string): JSX.Element => {
        const Title = {
            login: apiKey ? 'Logout' : 'Login',
            "manage-otc": 'Manage OTC',
            manage: 'Manage Rx',
            otc: 'OTC',
            resident: 'Residents',
            history: 'Drug History',
            medicine: 'Rx'
        } as ITitle
        if (eventKey === activeTabKey) {
            return (<b>{Title[eventKey]}</b>)
        } else {
            return (<>{Title[eventKey]}</>)
        }
    }

    // Completely hide the Diagnostics tab header if it isn't active using some direct DOM manipulation.
    useEffect(() => {
        const el = document.getElementById('landing-page-tabs-tab-error');
        if (el && activeTabKey !== 'error') {
            el.style.color = 'white';
        } else {
            if (el) {
                el.style.color = '#007BFF';
            }
        }
    }, [activeTabKey]);

    /**
     * Error handler
     *
     * @param {any} err
     */
    const errorOccurred = (err: any) => {
        setApiKey(null);
        setErrorDetails(err);
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
                title={getTitle('login')}
            >
                <LoginPage
                    onLogin={(loggedIn) => {
                        setActiveTabKey(loggedIn ? 'resident' : 'login')
                    }}
                    onError={(error) => errorOccurred(error)}
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="medicine"
                title={getTitle('medicine')}>
                <MedicinePage
                    activeTabKey={activeTabKey}
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="otc"
                title={getTitle('otc')}>
                <OtcPage
                    onError={(error) => errorOccurred(error)}
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title={getTitle('resident')}>
                <ResidentPage
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="history"
                title={getTitle('history')}
            >
                <DrugHistoryPage
                    drugLogList={drugLogList}
                    medicineList={medicineList}
                    otcList={otcList}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="manage"
                title={getTitle('manage')}
            >
                <ManageDrugPage
                    onError={(err: Error) => errorOccurred(err)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="manage-otc"
                title={getTitle('manage-otc')}
            >
                <ManageOtcPage
                    onError={(err) => errorOccurred(err)}
                />
            </Tab>
            <Tab
                disabled={errorDetails === null || activeTabKey !== 'error'}
                eventKey="error"
                title={getTitle('error')}
                style={{color: activeTabKey !== 'error' ? 'white' : ''}}
            >
                <DiagnosticPage
                    error={errorDetails}
                />
            </Tab>
        </Tabs>
    );
}

export default LandingPage;
