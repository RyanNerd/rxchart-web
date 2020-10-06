import React, {useGlobal, useState} from 'reactn';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginPage from './LoginPage';
import ResidentPage from "./ResidentPage";
import MedicinePage from "./MedicinePage";
import DrugHistoryPage from "./DrugHistoryPage";
import ManageDrugPage from "./ManageDrugPage";
import OtcPage from "./OtcPage";
import ManageOtcPage from "./ManageOtcPage";
import {MedicineRecord} from "../types/RecordTypes";
import {useEffect} from "react";

/**
 * Landing Page - Tab Page Menu UI
 * @constructor
 */
const LandingPage = () => {
    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ activeResident ] = useGlobal('activeResident');
    const [ development ] = useGlobal('development');
    const [ errorDetails, setErrorDetails ] = useState<string | null>(null);
    const [ activeTabKey, setActiveTabKey ] = useState<string | null>('login');
    const [ drugLogList ] = useGlobal('drugLogList');
    const [ medicineList ] = useGlobal<MedicineRecord>('medicineList');
    const [ otcList ] = useGlobal('otcList');

    /**
     * Error handler
     *
     * @param {Error} err
     */
    const errorOccurred = (err: Error) => {
        if (development) {
            console.log('Error', err);
            if (err) {
                setErrorDetails(err.toString());
            } else {
                setErrorDetails('Unknown Error');
            }
        } else {
            setErrorDetails('Something went wrong. Please check your internet connection and sign back in.');
        }
        setApiKey(null).then(()=>{});
        setActiveTabKey('error');
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

    const signIn = apiKey ? 'Logout' : 'Login';
    const loginTitle = (activeTabKey === 'login') ? (<b>{signIn}</b>) : (<span>{signIn}</span>);
    const rxTitle = (activeTabKey === 'medicine') ? (<b>Rx</b>) : (<span>Rx</span>);
    const otcTitle = (activeTabKey === 'otc') ? (<b>OTC</b>) : (<span>OTC</span>);
    const residentTitle = (activeTabKey === 'resident') ? (<b>Residents</b>) : (<span>Residents</span>);
    const drugHistoryTitle = (activeTabKey === 'history') ? (<b>Drug History</b>) : (<span>Drug History</span>);
    const manageRxTitle = (activeTabKey === 'manage') ? (<b>Manage Rx</b>) : (<span>Manage Rx</span>);
    const manageOtcTitle = (activeTabKey === 'manage-otc') ? (<b>Manage OTC</b>) : (<span>Manage OTC</span>);
    const errorTitle = (activeTabKey === 'error') ? (<b>Diagnostics</b>) : (<span>Diagnostics</span>);

    return (
        <Tabs
            id="landing-page-tabs"
            activeKey={activeTabKey}
            onSelect={(key) => setActiveTabKey(key)}
        >
            <Tab
                sytle={{marginLeft: "15px"}}
                eventKey="login"
                title={loginTitle}
            >
                <LoginPage
                    onLogin={(loggedIn) => {setActiveTabKey(loggedIn ? 'resident' : 'login')}}
                    onError={(error) => errorOccurred(error)}
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="medicine"
                title={rxTitle}>
                <MedicinePage
                    activeTabKey={activeTabKey}
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="otc"
                title={otcTitle}>
                <OtcPage
                    onError={(error) => errorOccurred(error)}
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="resident"
                title={residentTitle}>
                <ResidentPage
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="history"
                title={drugHistoryTitle}
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
                title={manageRxTitle}
            >
                <ManageDrugPage
                    onError={(err: Error) => errorOccurred(err)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="manage-otc"
                title={manageOtcTitle}
            >
                <ManageOtcPage
                    onError={(err) => errorOccurred(err)}
                />
            </Tab>
            <Tab
                disabled={activeTabKey !== 'error'}
                eventKey="error"
                title={errorTitle}
                style={{color: activeTabKey !== 'error' ? 'white' : ''}}
            >
                <p>{errorDetails}</p>
            </Tab>
        </Tabs>
    );
}

export default LandingPage;
