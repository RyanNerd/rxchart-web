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
import {DrugLogRecord, PillboxRecord} from 'types/RecordTypes';
import {getCheckoutList} from 'utility/common';

export type TPillboxMedLog = {
    Active: boolean;
    Drug: string | undefined;
    Notes: string | null;
    PillboxId?: number | null;
    PillboxItemId?: number | null;
    Quantity: number;
    Strength: string | null | undefined;
    Updated: Date | null | undefined;
};

// Display states
enum DISPLAY_TYPE {
    History = 'history',
    Medicine = 'med',
    OTC = 'otc',
    Pillbox = 'pillbox',
    Print = 'print'
}

interface IProps {
    activeTabKey: string;
}

/**
 * MedicinePage - UI for logging prescription medications
 * @param {IProps} props The props for this component
 * @returns {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [activeClient] = useGlobal('activeClient');
    const [activePillbox, setActivePillbox] = useState<PillboxRecord | null>(null);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    const [displayType, setDisplayType] = useState<DISPLAY_TYPE>(DISPLAY_TYPE.Medicine);
    const [mm] = useGlobal('medicineManager');
    const [otcList] = useGlobal('otcList');

    // activeTabKey refresh from prop
    useEffect(() => {
        setActiveTabKey(props.activeTabKey);
    }, [props.activeTabKey]);

    // Update the checkoutList when drugLogList changes
    useEffect(() => {
        if (activeClient?.drugLogList) {
            setCheckoutList(getCheckoutList(activeClient.drugLogList));
        }
    }, [activeClient, setCheckoutList]);

    // If there isn't an active client, or this isn't the active tab then do not render
    if (!activeClient || activeTabKey !== 'medicine') return null;

    const {drugLogList, pillboxList, medicineList} = activeClient;

    return (
        <>
            <Tabs
                activeKey={displayType}
                onSelect={(key) => setDisplayType((key as DISPLAY_TYPE) || DISPLAY_TYPE.Medicine)}
            >
                <Tab
                    style={{marginLeft: '-40px', marginRight: '1%'}}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.Medicine}
                            className="d-print-none"
                            id="med-list-group-med-radio-btn"
                            key="med-list-group-med-btn"
                            name="radio-med-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.Medicine)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.Medicine}
                            variant="outline-success"
                        >
                            <span className="ml-2">Medicine</span>
                        </ToggleButton>
                    }
                    eventKey={DISPLAY_TYPE.Medicine}
                >
                    <RxMedicine
                        mm={mm}
                        pillboxSelected={(id) => {
                            setActivePillbox(pillboxList.find((p) => p.Id === id) || null);
                            setDisplayType(DISPLAY_TYPE.Pillbox);
                        }}
                    />
                </Tab>

                <Tab
                    style={{marginLeft: '-40px'}}
                    eventKey={DISPLAY_TYPE.OTC}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.OTC}
                            className="ml-2 d-print-none"
                            disabled={otcList?.length === 0}
                            id="med-list-group-otc-radio-btn"
                            key="med-list-group-otc-btn"
                            name="radio-med-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.OTC)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.OTC}
                            variant="outline-success"
                        >
                            <span className="ml-2">OTC</span>
                        </ToggleButton>
                    }
                >
                    <RxOtc mm={mm} />
                </Tab>

                {/* Only show when: activeClient && activeClient.clientInfo */}
                <Tab
                    style={{marginLeft: '-40px'}}
                    className="d-print-flex"
                    eventKey={DISPLAY_TYPE.History}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.History}
                            className="ml-2 d-print-none"
                            disabled={drugLogList.length === 0}
                            id="med-list-group-history-radio-btn"
                            key="med-list-group-history-btn"
                            onChange={() => setDisplayType(DISPLAY_TYPE.History)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.History}
                            variant="outline-success"
                        >
                            <span className="ml-2">History</span>
                        </ToggleButton>
                    }
                >
                    <RxHistory
                        mm={mm}
                        otcList={otcList}
                        pillboxSelected={(id) => {
                            setActivePillbox(pillboxList.find((p) => p.Id === id) || null);
                            setDisplayType(DISPLAY_TYPE.Pillbox);
                        }}
                    />
                </Tab>

                {/* Show when activePillbox && activePillbox.Id */}
                <Tab
                    style={{marginLeft: '-40px'}}
                    eventKey={DISPLAY_TYPE.Pillbox}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.Pillbox}
                            className="ml-2 d-print-none"
                            disabled={medicineList.length < 5}
                            id="med-list-group-pill-radio-btn"
                            key="med-list-group-pill-btn"
                            name="radio-med-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.Pillbox)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.Pillbox}
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

                {/* Only show when: activeClient && activeClient.clientInfo */}
                <Tab
                    style={{marginLeft: '-40px'}}
                    eventKey={DISPLAY_TYPE.Print}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.Print}
                            className="ml-2 d-print-none"
                            disabled={checkoutList.length === 0}
                            id="med-list-group-print-radio-btn"
                            key="med-list-group-print-btn"
                            name="radio-print-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.Print)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.Print}
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
            </Tabs>
        </>
    );
};

export default MedicinePage;
