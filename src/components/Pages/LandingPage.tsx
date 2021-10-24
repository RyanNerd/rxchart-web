import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, {useGlobal, useMemo} from 'reactn';
import {ReactNode} from 'reactn/default';
import DiagnosticPage from './DiagnosticPage';
import LoginPage from './LoginPage';
import ManageDrugPage from './ManageDrugPage';
import ManageOtcPage from './ManageOtcPage';
import MedicinePage from './MedicinePage';
import ResidentPage from './ResidentPage';

interface ITitleProps {
    activeKey: string;
    children: ReactNode;
}

/**
 * Landing Page - Tab Page Menu UI
 */
const LandingPage = () => {
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [signIn] = useGlobal('signIn');
    const apiKey = signIn.apiKey;
    const [errorDetails] = useGlobal('__errorDetails');

    // We need to get a ref to the outer (class nav nav-tabs) div element to prevent printing it.
    // React-bootstrap adds this with no id attribute or other method of obtaining a ref, so we need to use
    // the old-fashioned method of element retrieval to get a ref and add the d-print-none class
    const navBarElement = document.getElementsByClassName('nav nav-tabs');
    if (navBarElement?.length > 0) navBarElement[0].classList.add('d-print-none');

    /**
     * Memoized MedicinePage to reduce number of re-renders
     */
    const medicinePage = useMemo(() => {
        return <MedicinePage activeTabKey={activeTabKey} activeResident={activeResident} />;
    }, [activeTabKey, activeResident]);

    const manageDrugPage = useMemo(() => {
        return <ManageDrugPage activeTabKey={activeTabKey} />;
    }, [activeTabKey]);

    const clientPage = useMemo(() => {
        return <ResidentPage activeTabKey={activeTabKey} residentSelected={() => setActiveTabKey('medicine')} />;
    }, [activeTabKey, setActiveTabKey]);

    const manageOtcPage = useMemo(() => {
        return <ManageOtcPage activeTabKey={activeTabKey} />;
    }, [activeTabKey]);

    /**
     * Tab Title component to format tab appearance
     * @param {ITitleProps} props The props for this component
     */
    const Title = (props: ITitleProps) => {
        return <span className={activeTabKey === props.activeKey ? 'bld' : undefined}>{props.children}</span>;
    };

    return (
        <Tabs id="landing-page-tabs" activeKey={activeTabKey} onSelect={(key) => setActiveTabKey(key || 'login')}>
            <Tab
                disabled={errorDetails}
                eventKey="login"
                title={<Title activeKey="login">{apiKey ? 'Logout' : 'Login'}</Title>}
            >
                <LoginPage />
            </Tab>
            <Tab disabled={!apiKey} eventKey="resident" title={<Title activeKey="resident">Clients</Title>}>
                <Tab.Content>{clientPage}</Tab.Content>
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="medicine"
                title={<Title activeKey="medicine">Rx</Title>}
            >
                {activeResident && activeTabKey === 'medicine' && <Tab.Content>{medicinePage}</Tab.Content>}
            </Tab>
            <Tab
                disabled={!apiKey || !activeResident}
                eventKey="manage"
                title={<Title activeKey="manage">Manage Rx</Title>}
            >
                <Tab.Content>{manageDrugPage}</Tab.Content>
            </Tab>
            <Tab disabled={!apiKey} eventKey="manage-otc" title={<Title activeKey="manage-otc">Manage OTC</Title>}>
                <Tab.Content>{manageOtcPage}</Tab.Content>
            </Tab>
            <Tab disabled={!errorDetails} eventKey="error" title={<Title activeKey="error">Diagnostics</Title>}>
                <DiagnosticPage error={errorDetails} dismissErrorAlert={() => window.location.reload()} />
            </Tab>
        </Tabs>
    );
};

export default LandingPage;
