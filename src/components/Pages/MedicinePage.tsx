import React, {useEffect, useGlobal, useState} from 'reactn';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from "react-bootstrap/ListGroup";
import Row from 'react-bootstrap/Row';
import {Alert, ToggleButton} from "react-bootstrap";

import {
    DrugLogRecord,
    MedicineRecord,
    newMedicineRecord,
    PillboxRecord,
    ResidentRecord
} from "../../types/RecordTypes";
import {
    calculateLastTaken,
    getCheckoutList,
    getDrugName,
    getFormattedDate,
    getMedicineRecord
} from "../../utility/common";

import Confirm from './Modals/Confirm';
import DrugLogEdit from "./Modals/DrugLogEdit";
import DrugLogGrid from "./Grids/DrugLogGrid";
import LastTakenButton from "../Buttons/LastTakenButton";
import MedListGroup from "./ListGroups/MedListGroup";
import MedicineEdit from "./Modals/MedicineEdit";
import OtcListGroup from "./ListGroups/OtcListGroup";
import PillboxListGroup from "./ListGroups/PillboxListGroup";
import TabContent from "../../styles/common.css";
import usePrevious from "../../hooks/usePrevious";
import PillboxCard from "./Grids/PillboxCard";

// Display states
enum DISPLAY_TYPE {
    Medicine = "med",
    OTC = "otc",
    Pillbox = "pillbox",
    Print = "print"
}

interface IProps {
    drugLogList: DrugLogRecord[]
    activeResident: ResidentRecord | null
    activeTabKey: string
}

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [, setMedicine] = useGlobal('__medicine');
    const [, setOtcMedicine] = useGlobal('__otcMedicine');
    const [, setDrugLog] = useGlobal('__drugLog');
    // const [, setPillboxItemObserver] = useGlobal('__pillboxItem');

    // Internal state
    const [activeClient, setActiveClient] = useState(props.activeResident);
    const [clientId, setClientId] = useState<number | null>(activeClient?.Id || null);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutDisabled, setCheckoutDisabled] = useState(!activeClient);
    const [lastTaken, setLastTaken] = useState<number | null>(null);

    // Modal show/hide states
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);

    // Lists
    const [drugLogList, setDrugLogList] = useState(props.drugLogList);
    const [globalMedicineList] = useGlobal('medicineList');
    const [medicineList, setMedicineList] = useState<MedicineRecord[]|null>(null);
    const [otcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [pillboxItemList] = useGlobal('pillboxItemList');
    const [pillboxList] = useGlobal('pillboxList');

    // Display state (DISPLAY_TYPE) and activeXXXX defaults
    const [displayType, setDisplayType] = useState<DISPLAY_TYPE>(DISPLAY_TYPE.Medicine);
    const [activeMed, setActiveMed] = useState<MedicineRecord | null>(null);
    const [activeOtc, setActiveOtc] = useState<MedicineRecord | null>(null);
    const [activePillbox, setActivePillbox] = useState<PillboxRecord | null>(null);

    const prevOtcList = usePrevious(otcList);
    const prevPillboxList = usePrevious(pillboxList);
    const prevClient = usePrevious(props.activeResident);

    // Refresh activeClient when the activeResident global changes.
    useEffect(() => {
        if (prevClient !== props.activeResident) {
            // setDrugLogList(props.drugLogList);
            setActiveClient(props.activeResident);

            // Set the clientId
            setClientId(props.activeResident?.Id ? props.activeResident.Id : null);
        }
    }, [props, otcList, prevClient]);

    // activeTabKey refresh from prop
    useEffect(() => {
        setActiveTabKey(props.activeTabKey);
    }, [props.activeTabKey]);

    // drugLogList (and related otcLogList) refresh from prop
    useEffect(() => {
        setDrugLogList(props.drugLogList);

        // We only want to list the OTC drugs on this page that the resident has taken.
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        setOtcLogList(props.drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((m) => {return m.Id === drug?.MedicineId;});
        }));
    }, [props.drugLogList])

    // Refresh of medicineList from globalMedicineList;
    useEffect(() => {
        setMedicineList(globalMedicineList.filter(m => m.Active));
    }, [globalMedicineList]);

    // Set the default activeMed
    useEffect(() => {
        // We are using medicineList === null as an indicator of if the medicine list has changed and needs new
        if (medicineList !== null) {
            // todo: move to direct param once we figure out why medicine dropdown is stupid.
            const activeMed = medicineList.length > 0 ? medicineList[0] : null;
            setActiveMed(activeMed);
        }
    }, [medicineList])

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        setLastTaken(activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null);
    }, [activeMed, drugLogList, medicineList]);

    // Disable or Enable Print Checkout button based on if there are any drugs marked as to be checked out
    useEffect(() => {
        if (drugLogList?.length > 0) {
            const checkoutList = getCheckoutList(drugLogList);
            if (checkoutList.length > 0) {
                setCheckoutDisabled(false);
            } else {
                setCheckoutDisabled(true);
            }
        } else {
            setCheckoutDisabled(true);
        }
    }, [drugLogList])

    // Set activeOtc state to the first element of the otcList when the otcList changes
    useEffect(() => {
        if (prevOtcList !== otcList) {
            setActiveOtc(otcList.length > 0 ? otcList[0] : null);
        }
    }, [otcList, prevOtcList]);

    // Set activePillbox to the first element of pillboxList when the pillboxList changes
    useEffect(() => {
        if (prevPillboxList !== pillboxList) {
            setActivePillbox(pillboxList.length > 0 ? pillboxList[0] : null);
        }
    }, [pillboxList, prevPillboxList]);

    // If there isn't an activeResident or this isn't the active tab then do not render
    if (!clientId || !medicineList || activeTabKey !== 'medicine') {
        return null;
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {DrugLogRecord} drugLogInfo
     */
    const addEditDrugLog = (drugLogInfo?: DrugLogRecord) => {
        const drugLogRecord = drugLogInfo ? {...drugLogInfo} : {
            Id: null,
            ResidentId: clientId,
            MedicineId: activeMed?.Id,
            Notes: ""
        } as DrugLogRecord;
        setShowDrugLog(drugLogRecord);
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button for OTC drugs
     * @param {DrugLogRecord} drugLogInfo
     */
    const addEditOtcLog = (drugLogInfo?: DrugLogRecord) => {
        const drugLogRecord = drugLogInfo ? {...drugLogInfo} : {
            Id: null,
            ResidentId: clientId,
            MedicineId: activeOtc?.Id,
            Notes: ""
        } as DrugLogRecord;
        setShowDrugLog(drugLogRecord);
    }

    /**
     * Fires when the Log 1...4 buttons are clicked.
     * @param {number} amount
     */
    const handleLogDrugAmount = (amount: number) => {
        const notes = amount.toString();
        const drugLogInfo = {
            Id: null,
            ResidentId: clientId,
            MedicineId: activeMed?.Id as number,
            Notes: notes,
            In: null,
            Out: null
        };
        setDrugLog({action: 'update', payload: drugLogInfo});
    }

    /**
     * Fires when the Log 1 or Log 2, etc. buttons are clicked for OTC drugs
     * @param {number} amount
     */
    const handleLogOtcDrugAmount = (amount: number) => {
        const drugId = activeOtc?.Id as number;
        if (drugId) {
            const notes = amount.toString();
            const drugLogInfo = {
                Id: null,
                ResidentId: clientId,
                MedicineId: drugId,
                Notes: notes,
                In: null,
                Out: null
            };
            setDrugLog({action: 'update', payload: drugLogInfo});
        }
    }

    /**
     * Convenience function to get drug name
     * @param {number} medicineId
     * @return {string | undefined}
     */
    const drugName = (medicineId: number): string | undefined => {
        return getDrugName(medicineId, medicineList.concat(otcList));
    }

    return (
        <>
            <Form className={TabContent} as={Row}>
                <Col lg="4">
                    <Row>
                        <ToggleButton
                            key="med-list-group-med-btn"
                            id="med-list-group-med-radio-btn"
                            type="radio"
                            size="sm"
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={DISPLAY_TYPE.Medicine}
                            checked={displayType === DISPLAY_TYPE.Medicine}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Medicine)}
                        >
                            <span className="ml-2">Medicine</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-otc-btn"
                            id="med-list-group-otc-radio-btn"
                            className="ml-2"
                            disabled={otcList?.length === 0}
                            type="radio"
                            size="sm"
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={DISPLAY_TYPE.OTC}
                            checked={displayType === DISPLAY_TYPE.OTC}
                            onChange={() => setDisplayType(DISPLAY_TYPE.OTC)}
                        >
                            <span className="ml-2">OTC</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-pill-btn"
                            id="med-list-group-pill-radio-btn"
                            className="ml-2"
                            size="sm"
                            type="radio"
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={DISPLAY_TYPE.Pillbox}
                            checked={displayType === DISPLAY_TYPE.Pillbox}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Pillbox)}
                        >
                            <span className="ml-2">Pillbox</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-print-btn"
                            id="med-list-group-print-radio-btn"
                            className="ml-2"
                            size="sm"
                            type="radio"
                            disabled={checkoutDisabled}
                            variant="outline-success"
                            name="radio-print-list-group"
                            value={DISPLAY_TYPE.Print}
                            checked={displayType === DISPLAY_TYPE.Print}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Print)}
                        >
                            <span className="ml-2">Print</span>
                        </ToggleButton>
                    </Row>

                    <Row>
                        {displayType === DISPLAY_TYPE.Medicine &&
                        <MedListGroup
                            activeMed={activeMed}
                            addDrugLog={(e: React.MouseEvent<HTMLElement>) => {
                                e.preventDefault();
                                addEditDrugLog();
                            }}
                            editMedicine={(m) => setShowMedicineEdit(m)}
                            canvasId="med-barcode"
                            itemChanged={id => setActiveMed(medicineList.find(m => m.Id === id) || null)}
                            lastTaken={lastTaken}
                            logDrug={n => handleLogDrugAmount(n)}
                            medicineList={medicineList}
                        />
                        }

                        {displayType === DISPLAY_TYPE.OTC && activeOtc &&
                        <OtcListGroup
                            disabled={otcList.length === 0}
                            addOtcMedicine={() => {
                                setShowMedicineEdit({...newMedicineRecord, OTC: true});
                            }}
                            editOtcMedicine={() => {
                                setShowMedicineEdit({...activeOtc} as MedicineRecord);
                            }}
                            activeOtc={activeOtc}
                            drugLogList={drugLogList}
                            logOtcDrugAmount={(n) => handleLogOtcDrugAmount(n)}
                            logOtcDrug={(e) => {
                                e.preventDefault();
                                addEditOtcLog();
                            }}
                            otcList={otcList}
                            setActiveOtcDrug={(d) => setActiveOtc(d)}
                        />
                        }

                        {displayType === DISPLAY_TYPE.Pillbox &&
                        <PillboxListGroup
                            pillboxList={pillboxList}
                            activePillbox={activePillbox}
                            onSelect={id => setActivePillbox(pillboxList.find(pb => pb.Id === id) as PillboxRecord)}
                            clientId={clientId}
                        />
                        }
                    </Row>
                </Col>

                <ListGroup as={Col} className="mx-5">
                    {/* todo: convert this to DrugLogCard??? */}
                    {displayType === DISPLAY_TYPE.Medicine &&
                    <ListGroup.Item style={{textAlign: "center"}}>
                        <Button
                            size="lg"
                            className="hover-underline-animation"
                            variant="link"
                            target="_blank"
                            href={"https://goodrx.com/" + activeMed?.Drug}
                        >
                            {activeMed?.Drug}
                        </Button>

                        <LastTakenButton
                            lastTaken={lastTaken}
                        />

                        {activeMed?.Id &&
                        <DrugLogGrid
                            drugLog={drugLogList}
                            drugId={activeMed.Id}
                            columns={['Created', 'Updated', 'Notes', 'Out', 'In']}
                            onEdit={(e, r) => {
                                e.preventDefault();
                                addEditDrugLog(r);
                            }}
                            onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                        />
                        }
                    </ListGroup.Item>
                    }

                    {/* todo: convert this to OtcLogCard??? */}
                    {displayType === DISPLAY_TYPE.OTC &&
                    <ListGroup.Item style={{overflow: "auto"}}>
                        <h5 className="mb-2" style={{textAlign: "center"}}>OTC History</h5>
                        <DrugLogGrid
                            includeCheckout={false}
                            drugLog={otcLogList}
                            medicineList={otcList}
                            columns={['Drug', 'Created', 'Updated', 'Notes']}
                            onEdit={(e, r) => {
                                e.preventDefault();
                                addEditOtcLog(r);
                            }}
                            onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                        />
                    </ListGroup.Item>
                    }

                    {displayType === DISPLAY_TYPE.Pillbox && activePillbox && activePillbox.Id &&
                        <PillboxCard
                            medicineList={medicineList}
                            pillboxItemList={pillboxItemList}
                            activePillbox={activePillbox}
                        />
                    }
                </ListGroup>
            </Form>

            {/* MedicineEdit Modal*/}
            {showMedicineEdit &&
            <MedicineEdit
                show={true}
                onClose={(r: MedicineRecord | null) => {
                    setShowMedicineEdit(null);
                    if (r) {
                        if (r.OTC) {
                            // fixme: callback not working for added OTC
                            setOtcMedicine({
                                action: "update",
                                payload: r,
                                cb: (m) => setActiveOtc(m as MedicineRecord)
                            });
                        } else {
                            setMedicine({
                                action: "update",
                                payload: r,
                                cb: (m) => setActiveMed(m as MedicineRecord)
                            });
                        }
                    }
                }}
                drugInfo={showMedicineEdit}
            />
            }

            {showDrugLog &&
            <DrugLogEdit
                otc={getMedicineRecord(showDrugLog.MedicineId, medicineList.concat(otcList))?.OTC || false}
                drugName={getMedicineRecord(showDrugLog.MedicineId, medicineList.concat(otcList))?.Drug || '[unknown]'}
                show={true}
                drugLogInfo={showDrugLog}
                onHide={() => setShowDrugLog(null)}
                onClose={(drugLogRecord) => {
                    setShowDrugLog(null);
                    if (drugLogRecord) {
                        setDrugLog({action: 'update', payload: drugLogRecord});
                    }
                }}
            />
            }

            {/*Confirm Delete of Drug Log*/}
            {showDeleteDrugLogRecord &&
            <Confirm.Modal
                size='lg'
                onSelect={(a) => {
                    setShowDeleteDrugLogRecord(null);
                    if (a) {
                        setDrugLog({action: 'delete', payload: showDeleteDrugLogRecord?.Id as number});
                    }
                }}
                show={true}
                buttonvariant="danger"
            >
                <Confirm.Header>
                    <Confirm.Title>
                        Delete {drugName(showDeleteDrugLogRecord.MedicineId)} Log Record
                    </Confirm.Title>
                </Confirm.Header>
                <Confirm.Body>
                    {showDeleteDrugLogRecord && showDeleteDrugLogRecord.Updated &&
                    <Alert variant="secondary">
                        Date: {getFormattedDate(showDeleteDrugLogRecord.Updated)}
                    </Alert>
                    }
                    <b style={{color: "red"}}>
                        Are you sure?
                    </b>
                </Confirm.Body>
            </Confirm.Modal>
            }
        </>
    );
}

export default MedicinePage;
