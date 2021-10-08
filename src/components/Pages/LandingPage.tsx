import {TabContent} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useGlobal, useLayoutEffect, useMemo, useState} from 'reactn';
import {getCheckoutList} from "utility/common";
import DiagnosticPage from "./DiagnosticPage";
import DrugHistoryPage from "./DrugHistoryPage";
import LoginPage from './LoginPage';
import ManageDrugPage from "./ManageDrugPage";
import ManageOtcPage from "./ManageOtcPage";
import MedicineCheckoutPage from "./MedicineCheckoutPage";
import MedicinePage from "./MedicinePage";
import ResidentPage from "./ResidentPage";

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

    // We need to get a ref to the outer (class nav nav-tabs) div element to prevent printing it.
    // React-bootstrap adds this with no id attribute or other method of obtaining a ref, so we need to use
    // the old-fashioned method of element retrieval to get a ref and add the d-print-none class
    const navBarElement = document.getElementsByClassName('nav nav-tabs');
    if (navBarElement?.length > 0) {
        navBarElement[0].classList.add('d-print-none');
    }

    // Enable or disable the Print Medicine Checkout button
    useLayoutEffect(() => {
        if (drugLogList.length > 0) {
            const checkoutList = getCheckoutList(drugLogList);
            setCheckoutDisabled(checkoutList.length <= 0)
        } else {
            setCheckoutDisabled(true);
        }
    }, [drugLogList])

    /**
     * Memoized MedicinePage to reduce number of re-renders
     */
    const medicinePage = useMemo(() => {
        return (
            <MedicinePage
                activeTabKey={activeTabKey}
                activeResident={activeResident}
            />
        )
    }, [activeTabKey, activeResident])

    const checkoutPage = useMemo(() => {
        return (
            <MedicineCheckoutPage
                drugLogList={drugLogList}
                activeTabKey={activeTabKey}
                activeClient={activeResident}
            />
        )
    }, [drugLogList, activeTabKey, activeResident])

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
                title={<span className={activeTabKey === 'resident' ? 'bld' : ''}>Clients</span>}>
                <ResidentPage
                    residentSelected={() => setActiveTabKey('medicine')}
                />
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="medicine"
                title={<span className={activeTabKey === 'medicine' ? 'bld' : ''}>Rx</span>}>
                {activeResident && activeTabKey === "medicine" &&
                <Tab.Content>
                    {medicinePage}
                </Tab.Content>
                }
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="manage"
                title={<span className={activeTabKey === 'manage' ? 'bld' : ''}>Manage Rx</span>}
            >
                <ManageDrugPage/>
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
                {activeResident && activeResident && apiKey &&
                    <TabContent>
                        {checkoutPage}
                    </TabContent>
                }
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
