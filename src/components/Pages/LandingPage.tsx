import DiagnosticPage from "./DiagnosticPage";
import DrugHistoryPage from "./DrugHistoryPage";
import LoginPage from './LoginPage';
import ManageDrugPage from "./ManageDrugPage";
import ManageOtcPage from "./ManageOtcPage";
import MedicinePage from "./MedicinePage";
import React, {useEffect, useGlobal, useState} from 'reactn';
import ResidentPage from "./ResidentPage";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MedicineCheckoutPage from "./MedicineCheckoutPage";
import {getCheckoutList} from "../../utility/common";
import PillboxPage from "./PillboxPage";

/**
 * Landing Page - Tab Page Menu UI
 */
const LandingPage = () => {
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [signIn] = useGlobal('signIn');
    const apiKey = signIn.apiKey;
    const [errorDetails] = useGlobal('__errorDetails');
    const [checkoutDisabled, setCheckoutDisabled] = useState(!activeResident);
    const [drugLogList] = useGlobal('drugLogList');
    const navBarElement = document.getElementsByClassName('nav nav-tabs');
    const [pillboxList] = useGlobal('pillboxList');
    const [pillboxItemList] = useGlobal('pillboxItemList');

    if (navBarElement && navBarElement.length > 0) {
        const navBar = navBarElement[0];
        navBar.classList.add('d-print-none');
    }

    useEffect(() => {
        if (apiKey && activeResident && drugLogList.length > 0) {
            const checkoutList = getCheckoutList(drugLogList);
            if (checkoutList.length > 0) {
                setCheckoutDisabled(false);
            } else {
                setCheckoutDisabled(true);
            }
        } else {
            setCheckoutDisabled(true);
        }
    }, [activeResident, apiKey, drugLogList])

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
                disabled={!apiKey}
                eventKey="resident"
                title={<span className={activeTabKey === 'resident' ? 'bld' : ''}>Resident</span>}>
                <ResidentPage
                    residentSelected={() => setActiveTabKey('medicine')}
                />
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="medicine"
                title={<span className={activeTabKey === 'medicine' ? 'bld' : ''}>Rx</span>}>
                <MedicinePage/>
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="manage"
                title={<span className={activeTabKey === 'manage' ? 'bld' : ''}>Manage Rx</span>}
            >
                <ManageDrugPage/>
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="pillbox"
                title={<span className={activeTabKey === 'pillbox' ? 'bld' : ''}>Pillbox</span>}
            >
                <PillboxPage
                    pillboxList={pillboxList}
                    pillboxItemList={pillboxItemList}
                    activeResident={activeResident}
                    activeTabKey={activeTabKey}
                />
            </Tab>
            <Tab
                disabled={!apiKey}
                eventKey="manage-otc"
                title={<span className={activeTabKey === 'manage-otc' ? 'bld' : ''}>Manage OTC</span>}
            >
                <ManageOtcPage/>
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="history"
                title={<span className={activeTabKey === 'history' ? 'bld' : ''}>Drug History</span>}
            >
                <DrugHistoryPage/>
            </Tab>
            <Tab
                disabled={!apiKey || checkoutDisabled || !activeResident}
                eventKey="medicine-checkout"
                title="Medicine Checkout"
            >
                <MedicineCheckoutPage/>
            </Tab>

            <Tab
                disabled={!errorDetails}
                eventKey="error"
                title={<span className={activeTabKey === 'error' ? 'bld' : ''}>Diagnostics</span>}
            >
                <DiagnosticPage
                    error={errorDetails}
                    dismissErrorAlert={() => {
                        window.location.reload();
                    }}
                />
            </Tab>
        </Tabs>
    );
}

export default LandingPage;
