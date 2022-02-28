import Documents from 'components/Pages/RxTabs/Documents';
import ManageRx from 'components/Pages/RxTabs/ManageRx';
import RxHistory from 'components/Pages/RxTabs/RxHistory';
import RxMedicine from 'components/Pages/RxTabs/RxMedicine';
import RxOtc from 'components/Pages/RxTabs/RxOtc';
import RxPillbox from 'components/Pages/RxTabs/RxPillbox';
import RxPrint from 'components/Pages/RxTabs/RxPrint';
import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {IPreferences} from 'reactn/default';
import {DrugLogRecord, PillboxRecord} from 'types/RecordTypes';
import {getCheckoutList} from 'utility/common';

// Active Rx tab states
export enum TAB_KEY {
    History = 'history',
    Medicine = 'med',
    OTC = 'otc',
    Pillbox = 'pillbox',
    Print = 'print',
    Manage = 'manage',
    Document = 'document'
}

interface IProps {
    activeTabKey: string;
    preferences: IPreferences;
}

/**
 * RxPage - UI for logging prescription & OTC medications as well as pillboxes and medication checkout
 * @param {IProps} props The props for this component
 */
const RxPage = (props: IProps): JSX.Element | null => {
    const [activeClient] = useGlobal('activeClient');
    const [activePillbox, setActivePillbox] = useState<PillboxRecord | null>(null);
    const [activeRxTab, setActiveRxTab] = useState<TAB_KEY>(TAB_KEY.Medicine);
    const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    const [mm] = useGlobal('medicineManager');
    const [otcList] = useGlobal('otcList');
    const preferences = props.preferences;

    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    useEffect(() => {
        setActiveTabKey(props.activeTabKey);
    }, [props.activeTabKey]);

    // Update the checkoutList when drugLogList changes
    useEffect(() => {
        if (activeClient?.drugLogList) {
            setCheckoutList(getCheckoutList(activeClient.drugLogList));
        }
    }, [activeClient, setCheckoutList]);

    // Observer to show / hide RxTabs
    useEffect(() => {
        if (activeClient) {
            const historyElement = document.getElementById('medicine-page-tabs-tab-' + TAB_KEY.History);
            if (historyElement) {
                historyElement.style.display = activeClient.drugLogList.length === 0 ? 'none' : 'block';
                if (activeRxTab === TAB_KEY.History && activeClient.drugLogList.length === 0) {
                    setActiveRxTab(TAB_KEY.Medicine);
                }
            }

            const pillboxElement = document.getElementById('medicine-page-tabs-tab-' + TAB_KEY.Pillbox);
            if (pillboxElement) {
                pillboxElement.style.display = activeClient.medicineList.length < 5 ? 'none' : 'block';
                if (activeRxTab === TAB_KEY.Pillbox && activeClient.medicineList.length < 5) {
                    setActiveRxTab(TAB_KEY.Medicine);
                }
            }

            const printElement = document.getElementById('medicine-page-tabs-tab-' + TAB_KEY.Print);
            if (printElement) {
                printElement.style.display = checkoutList.length === 0 ? 'none' : 'block';
                if (activeRxTab === TAB_KEY.Print && checkoutList.length === 0) {
                    setActiveRxTab(TAB_KEY.Medicine);
                }
            }
        }

        // Move LandingPage tabs up for more screen real estate
        const tabContent = document.querySelectorAll<HTMLElement>('div#root > .tab-content');
        if (tabContent && tabContent.length > 0) {
            tabContent[0].style.marginTop = '-15px';
        }

        // Move RxPage rxTabs up for more screen real estate
        const navElement = document.querySelectorAll<HTMLElement>('div.medicine-page-tablet > nav.nav');
        if (navElement && navElement.length > 0) {
            navElement[0].style.marginBottom = '-15px';
        }

        // Changing padding on this tab changes it for all RxTabs. More screen real estate
        const rxMedicineTab = document.getElementsByClassName('rx-medicine-tab');
        if (rxMedicineTab) {
            const rxMedTabElement = rxMedicineTab[0] as HTMLElement;
            rxMedTabElement.style.paddingBottom = '1px';
        }
    }, [activeClient, activeRxTab, checkoutList.length]);

    // If there isn't an active client, or the active tab isn't 'medicine' then do not render
    if (!activeClient || activeTabKey !== 'medicine') return null;

    const {drugLogList, pillboxList, medicineList} = activeClient;

    return (
        <div className="medicine-page-tablet">
            <Tabs
                id="medicine-page-tabs"
                activeKey={activeRxTab}
                defaultActiveKey={TAB_KEY.Medicine}
                onSelect={(key) => setActiveRxTab((key as TAB_KEY) || TAB_KEY.Medicine)}
            >
                <Tab
                    eventKey={TAB_KEY.Medicine}
                    style={{marginLeft: '-35px', marginRight: '1%'}}
                    tabClassName="rx-medicine-tab"
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.Medicine}
                            className="d-print-none"
                            id="med-list-group-med-radio-btn"
                            key="med-list-group-med-btn"
                            name="radio-med-list-group"
                            onChange={() => setActiveRxTab(TAB_KEY.Medicine)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.Medicine}
                            variant="outline-success"
                        >
                            <span className="ml-2">Medicine</span>
                        </ToggleButton>
                    }
                >
                    <RxMedicine
                        mm={mm}
                        pillboxSelected={(id) => {
                            setActivePillbox(pillboxList.find((p) => p.Id === id) || null);
                            setActiveRxTab(TAB_KEY.Pillbox);
                        }}
                    />
                </Tab>

                <Tab
                    eventKey={TAB_KEY.OTC}
                    style={{marginLeft: '-40px'}}
                    tabClassName="rx-otc-tab"
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.OTC}
                            className="ml-2 d-print-none"
                            id="med-list-group-otc-radio-btn"
                            key="med-list-group-otc-btn"
                            name="radio-med-list-group"
                            onChange={() => setActiveRxTab(TAB_KEY.OTC)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.OTC}
                            variant="outline-success"
                        >
                            <span className="ml-2">OTC</span>
                        </ToggleButton>
                    }
                >
                    <RxOtc mm={mm} activeRxTab={activeRxTab} />
                </Tab>

                <Tab
                    eventKey={TAB_KEY.History}
                    style={{marginLeft: '-40px'}}
                    tabClassName="rx-history-tab d-print-flex"
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.History}
                            className="ml-2 d-print-none"
                            disabled={drugLogList.length === 0}
                            id="med-list-group-history-radio-btn"
                            key="med-list-group-history-btn"
                            onChange={() => setActiveRxTab(TAB_KEY.History)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.History}
                            variant="outline-success"
                        >
                            <span className="ml-2">History</span>
                        </ToggleButton>
                    }
                >
                    <RxHistory
                        mm={mm}
                        otcList={otcList}
                        onPillboxSelected={(id) => {
                            setActivePillbox(pillboxList.find((p) => p.Id === id) || null);
                            setActiveRxTab(TAB_KEY.Pillbox);
                        }}
                    />
                </Tab>

                <Tab
                    eventKey={TAB_KEY.Pillbox}
                    style={{marginLeft: '-40px'}}
                    tabClassName="rx-pillbox-tab"
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.Pillbox}
                            className="ml-2 d-print-none"
                            disabled={medicineList.length < 5}
                            id="med-list-group-pill-radio-btn"
                            key="med-list-group-pill-btn"
                            name="radio-med-list-group"
                            onChange={() => setActiveRxTab(TAB_KEY.Pillbox)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.Pillbox}
                            variant="outline-success"
                        >
                            <span className="ml-2">Pillbox</span>
                        </ToggleButton>
                    }
                >
                    <RxPillbox
                        mm={mm}
                        activePillbox={activePillbox}
                        activePillboxChanged={(pb) => setActivePillbox(pb)}
                    />
                </Tab>

                <Tab
                    tabClassName="rx-print-tab"
                    style={{marginLeft: '-40px'}}
                    eventKey={TAB_KEY.Print}
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.Print}
                            className="ml-2 d-print-none"
                            disabled={checkoutList.length === 0}
                            id="med-list-group-print-radio-btn"
                            key="med-list-group-print-btn"
                            name="radio-print-list-group"
                            onChange={() => setActiveRxTab(TAB_KEY.Print)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.Print}
                            variant="outline-success"
                        >
                            <span className="ml-2">
                                Print Med Checkout{' '}
                                {checkoutList.length > 0 && <Badge variant="secondary">{checkoutList.length}</Badge>}
                            </span>
                        </ToggleButton>
                    }
                >
                    <RxPrint activeClient={activeClient} checkoutList={checkoutList} />
                </Tab>
                <Tab
                    eventKey={TAB_KEY.Manage}
                    style={{marginLeft: '-40px'}}
                    tabClassName="rx-manage-tab"
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.Manage}
                            className="ml-2 d-print-none"
                            id="med-list-group-manage-radio-btn"
                            key="med-list-group-manage-btn"
                            name="radio-med-list-group"
                            onChange={() => setActiveRxTab(TAB_KEY.Manage)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.Manage}
                            variant="outline-success"
                        >
                            <span className="ml-2">Manage Rx</span>
                        </ToggleButton>
                    }
                >
                    <ManageRx />
                </Tab>

                <Tab
                    eventKey={TAB_KEY.Document}
                    style={{marginLeft: '-40px'}}
                    tabClassName="rx-document-tab"
                    title={
                        <ToggleButton
                            checked={activeRxTab === TAB_KEY.Document}
                            className="ml-2 d-print-none"
                            id="med-list-group-document-radio-btn"
                            key="med-list-group-document-btn"
                            name="radio-med-list-group"
                            onChange={() => setActiveRxTab(TAB_KEY.Document)}
                            size={preferences.rxTabSize}
                            type="radio"
                            value={TAB_KEY.Document}
                            variant="outline-success"
                        >
                            <span className="ml-2">Documents</span>
                        </ToggleButton>
                    }
                >
                    <Documents />
                </Tab>
            </Tabs>
        </div>
    );
};

export default RxPage;
