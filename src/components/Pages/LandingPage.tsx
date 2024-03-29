import ClientPage from 'components/Pages/ClientPage';
import ManagementPage from 'components/Pages/ManagementPage';
import RxLookup from 'components/Pages/RxLookup';
import RxPage from 'components/Pages/RxPage';
import {ReactNode} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React, {useEffect, useGlobal, useMemo} from 'reactn';
import {IPreferences} from 'reactn/default';
import {RxError} from 'utility/RxError';
import DiagnosticPage from './DiagnosticPage';
import LoginPage from './LoginPage';

interface ITitleProps {
    activeKey: string;
    children: ReactNode;
}

interface IProps {
    preferences: IPreferences;
}

/**
 * Landing Page - Tab Page Menu UI
 * @param {IProps} props The props for this component
 */
const LandingPage = (props: IProps) => {
    const [activeClient] = useGlobal('activeClient');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [signIn] = useGlobal('signIn');
    const apiKey = signIn.apiKey;
    const [errorDetails] = useGlobal('__errorDetails');
    const preferences = props.preferences;

    // We need to get a ref to the outer (class nav nav-tabs) div element to prevent printing it.
    // React-bootstrap adds this with no id attribute or other method of obtaining a ref, so we need to use
    // the old-fashioned method of element retrieval to get a ref and add the d-print-none class
    const navBarElement = document.getElementsByClassName('nav nav-tabs');
    if (navBarElement?.length > 0) navBarElement[0].classList.add('d-print-none');

    // Observer to show / hide the Diagnostics tab title
    useEffect(() => {
        const element = document.getElementById('landing-page-tabs-tab-error');
        if (element) {
            element.style.display = errorDetails ? 'block' : 'none';
        }
    }, [errorDetails]);

    // Observer to show / hide tabs based on if logged in and if a client has been selected
    useEffect(() => {
        ['resident', 'medicine', 'management', 'rx-lookup'].map((tab) => {
            const element = document.getElementById('landing-page-tabs-tab-' + tab);
            if (element) {
                if (tab === 'resident' || tab === 'management' || tab === 'rx-lookup') {
                    element.style.display = apiKey ? 'block' : 'none';
                } else {
                    element.style.display = apiKey && activeClient ? 'block' : 'none';
                }
            }
        });
    }, [activeClient, apiKey]);

    /**
     * Memoized pages to reduce number of re-renders
     */
    const medicinePage = useMemo(() => {
        return <RxPage activeTabKey={activeTabKey} preferences={preferences} />;
    }, [activeTabKey, preferences]);

    const clientPage = useMemo(() => {
        return <ClientPage activeTabKey={activeTabKey} clientSelected={() => setActiveTabKey('medicine')} />;
    }, [activeTabKey, setActiveTabKey]);

    const loginPage = useMemo(() => {
        return <LoginPage activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey} />;
    }, [activeTabKey, setActiveTabKey]);

    /**
     * Tab Title component to format tab appearance
     * @param {ITitleProps} props The props for this component
     */
    const Title = (props: ITitleProps) => {
        const {activeKey, children} = props;
        return (
            <ToggleButton
                className={activeKey === activeTabKey ? 'bld' : undefined}
                size={preferences.landingPageTabSize}
                type="radio"
                value={activeKey}
                checked={activeKey === activeTabKey}
                variant="outline-info"
            >
                {' '}
                {children}
            </ToggleButton>
        );
    };

    return (
        <Tabs id="landing-page-tabs" activeKey={activeTabKey} onSelect={(key) => setActiveTabKey(key || 'login')}>
            <Tab
                disabled={errorDetails !== undefined}
                eventKey="login"
                title={<Title activeKey="login">{apiKey ? 'Logout' : 'Login'}</Title>}
            >
                <Tab.Content>{loginPage}</Tab.Content>
            </Tab>
            <Tab disabled={!apiKey} eventKey="resident" title={<Title activeKey="resident">Clients</Title>}>
                <Tab.Content style={{marginLeft: 0}}>{clientPage}</Tab.Content>
            </Tab>

            <Tab disabled={!apiKey || !activeClient} eventKey="medicine" title={<Title activeKey="medicine">Rx</Title>}>
                {activeClient && activeTabKey === 'medicine' && (
                    <Tab.Content style={{marginLeft: 0}}>{medicinePage}</Tab.Content>
                )}
            </Tab>

            <Tab disabled={!apiKey} eventKey="management" title={<Title activeKey={'management'}>Management</Title>}>
                <Tab.Content>
                    <ManagementPage />
                </Tab.Content>
            </Tab>

            <Tab disabled={!apiKey} eventKey="rx-lookup" title={<Title activeKey={'rx-lookup'}>Rx Lookup</Title>}>
                <Tab.Content>
                    <RxLookup activeTabKey={activeTabKey} />
                </Tab.Content>
            </Tab>

            <Tab disabled={!errorDetails} eventKey="error" title={<Title activeKey="error">Diagnostics</Title>}>
                <Tab.Content>
                    <DiagnosticPage
                        error={errorDetails as RxError}
                        dismissErrorAlert={() => window.location.reload()}
                    />
                </Tab.Content>
            </Tab>
        </Tabs>
    );
};

export default LandingPage;
