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
    const [activeTabKey, setActiveTabKey] = useState<string | null>('login');
    const [apiKey, setApiKey] = useGlobal('apiKey');
    const [drugLogList] = useGlobal('drugLogList');
    const [errorDetails] = useGlobal('errorDetails');
    const [medicineList] = useGlobal('medicineList');
    const [otcList] = useGlobal('otcList');

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
            medicine: 'Rx',
            error: 'Diagnostics'
        } as ITitle
        if (eventKey === activeTabKey) {
            return (<b>{Title[eventKey]}</b>)
        } else {
            return (<>{Title[eventKey]}</>)
        }
    }

    // Observer for anytime there is an error set on the errorDetails global
    useEffect(() => {
        if (errorDetails) {
            setApiKey(null);
            setActiveTabKey('error');
        }
    }, [errorDetails, setApiKey, activeTabKey])

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
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="medicine"
                title={getTitle('medicine')}>
                <MedicinePage
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="otc"
                title={getTitle('otc')}>
                <OtcPage
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title={getTitle('resident')}>
                <ResidentPage/>
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
                <ManageDrugPage/>
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="manage-otc"
                title={getTitle('manage-otc')}
            >
                <ManageOtcPage/>
            </Tab>
            <Tab
                disabled={!errorDetails}
                eventKey="error"
                title={getTitle('error')}
            >
                <DiagnosticPage
                    error={errorDetails}
                />
            </Tab>
        </Tabs>
    );
}

export default LandingPage;
