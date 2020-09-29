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

const LandingPage = () => {
    const [ apiKey, setApiKey ] = useGlobal('apiKey');
    const [ activeResident ] = useGlobal('activeResident');
    const [ development ] = useGlobal('development');

    const [ errorDetails, setErrorDetails ] = useState<string | null>(null);
    const [ activeTabKey, setActiveTabKey ] = useState<string | null>('login');

    const [ drugLogList ] = useGlobal('drugLogList');
    const [ medicineList ] = useGlobal('medicineList');
    const [ otcList ] = useGlobal('otcList');

    /**
     * Given a ref set focus if it exists and is current.
     *
     * @param {React.Ref} ref
     */
    const setFocus = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }

    /**
     * Error handler
     *
     * @param {ErrorEvent | null} err
     */
    const errorOccurred = (err: ErrorEvent) => {
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
                    onLogin={(loggedIn) => {setActiveTabKey(loggedIn ? 'resident' : 'login')}}
                    onError={(error) => errorOccurred(error)}
                    updateFocusRef={(ref) => setFocus(ref)}
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="log"
                title="Rx">
                <MedicinePage
                    activeTabKey={activeTabKey}
                    onError={(error) => errorOccurred(error)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null || !activeResident}
                eventKey="otc"
                title="OTC">
                <OtcPage
                    onError={(error) => errorOccurred(error)}
                    updateFocusRef={(ref) => setFocus(ref)}
                    activeTabKey={activeTabKey}
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
                disabled={apiKey === null || !activeResident}
                eventKey="history"
                title="Drug History"
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
                title="Manage Rx"
            >
                <ManageDrugPage
                    onError={(err: ErrorEvent) => errorOccurred(err)}
                />
            </Tab>
            <Tab
                disabled={apiKey === null}
                eventKey="manage-otc"
                title="Manage OTC"
            >
                <ManageOtcPage
                    onError={(err) => errorOccurred(err)}
                />
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
