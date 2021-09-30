import CheckoutListGroup from "components/Pages/ListGroups/CheckoutListGroup";
import Alert from "react-bootstrap/Alert"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from "react-bootstrap/ListGroup";
import Row from 'react-bootstrap/Row';
import Toast from "react-bootstrap/Toast"
import ToggleButton from "react-bootstrap/ToggleButton"
import React, {useEffect, useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, PillboxRecord, ResidentRecord} from "types/RecordTypes";
import {
    calculateLastTaken,
    getCheckoutList,
    getDrugName,
    getFormattedDate,
    getMedicineRecord,
    setPillboxLogDate
} from "utility/common";
import usePrevious from "../../hooks/usePrevious";
import TabContent from "../../styles/common.css";
import LastTakenButton from "../Buttons/LastTakenButton";
import DrugLogGrid from "./Grids/DrugLogGrid";
import PillboxCard from "./Grids/PillboxCard";
import MedListGroup from "./ListGroups/MedListGroup";
import OtcListGroup from "./ListGroups/OtcListGroup";
import PillboxListGroup from "./ListGroups/PillboxListGroup";
import Confirm from './Modals/Confirm';
import DrugLogEdit from "./Modals/DrugLogEdit";
import MedicineEdit from "./Modals/MedicineEdit";

// Display states
enum DISPLAY_TYPE {
    Medicine = "med",
    OTC = "otc",
    Pillbox = "pillbox",
    Print = "print"
}

interface IProps {
    activeResident: ResidentRecord | null
    activeTabKey: string
}

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [mm] = useGlobal('medicineManager');

    // Internal state
    const [activeClient, setActiveClient] = useState(props.activeResident);
    const [clientId, setClientId] = useState<number | null>(activeClient?.Id || null);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutDisabled, setCheckoutDisabled] = useState(!activeClient);

    // Modal show/hide states
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);

    // Lists
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [globalMedicineList, setGlobalMedicineList] = useGlobal('medicineList');
    const [medicineList, setMedicineList] = useState<MedicineRecord[]|null>(null);
    const [otcList, setOtcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [pillboxItemList] = useGlobal('pillboxItemList');
    const [pillboxList] = useGlobal('pillboxList');

    // Display state (DISPLAY_TYPE) and activeXXXX defaults
    const [displayType, setDisplayType] = useState<DISPLAY_TYPE>(DISPLAY_TYPE.Medicine);
    const [activeMed, setActiveMed] = useState<MedicineRecord | null>(null);
    const [activeOtc, setActiveOtc] = useState<MedicineRecord | null>(null);
    const [activePillbox, setActivePillbox] = useState<PillboxRecord | null>(null);

    const prevPillboxList = usePrevious(pillboxList);
    const prevClient = usePrevious(props.activeResident);

    const [toast, setToast] = useState<null|DrugLogRecord>(null);

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog
     * @param clientId
     */
    const saveDrugLog = async (drugLog: DrugLogRecord, clientId: number): Promise<DrugLogRecord> => {
        const r = await mm.updateDrugLog(drugLog);
        // Rehydrate the drugLogList
        const drugs = await mm.loadDrugLog(clientId);
        await setDrugLogList(drugs);
        return r;
    }

    /**
     * Given a MedicineRecord Update or Insert the record and rehydrate the globalMedicineList
     * @param {MedicineRecord} med
     * @param {number} clientId
     */
    const saveMedicine = async (med: MedicineRecord, clientId: number) => {
        const m = await mm.updateMedicine(med);

        // Rehydrate the global medicineList
        const ml = await mm.loadMedicineList(clientId);
        await setGlobalMedicineList(ml);

        // If the updated record is OTC we need to refresh the otcList as well.
        if (m.OTC) {
            // Rehydrate the global otcList
            const ol = await mm.loadOtcList();
            await setOtcList(ol);
        }
        return m;
    }

    // Refresh activeClient when the activeResident global changes.
    useEffect(() => {
        if (prevClient !== props.activeResident) {
            // setDrugLogList(props.drugLogList);
            setActiveClient(props.activeResident);

            // Set the clientId
            setClientId(props.activeResident?.Id ? props.activeResident.Id : null);
        }
    }, [props, prevClient]);

    // activeTabKey refresh from prop
    useEffect(() => {
        setActiveTabKey(props.activeTabKey);
    }, [props.activeTabKey]);

    // Update the otcLogList when the drugLogList is changed.
    useEffect(() => {
        // We only want to list the OTC drugs on this page that the resident has taken.
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        setOtcLogList(drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((m) => {return m.Id === drug?.MedicineId;});
        }));
    }, [drugLogList, otcList])

    // Refresh of medicineList from globalMedicineList;
    useEffect(() => {
        setMedicineList(globalMedicineList.filter(m => m.Active));
    }, [globalMedicineList]);

    // Set the default activeMed
    useEffect(() => {
        // We are using medicineList === null as an indicator of if the medicine list has changed and needs new
        if (medicineList !== null) {
            if (activeMed && medicineList.find(m => m.Id === activeMed.Id)) {
                // NOP
            } else {
                setActiveMed(medicineList.length > 0 ? medicineList[0] : null);
            }
        }
    }, [medicineList, activeMed, setActiveMed])

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
        saveDrugLog(drugLogInfo, clientId).then(r => setToast(r));
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
            saveDrugLog(drugLogInfo, clientId).then(r => setToast(r));
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

    /**
     * Handle when the user clicks on Log Pillbox
     */
    const handleLogPillbox = () => {
        // Get all the pillboxItems for the activePillbox that have a Quantity > 0
        const pbi = pillboxItemList.filter(p => p.PillboxId === activePillbox?.Id && p.Quantity > 0);

        // Iterate through the pillbox items and log the drug as taken
        pbi.forEach(pbi => {
            const notes = 'pb: ' + pbi.Quantity
            const drugLogInfo = {
                Id: null,
                ResidentId: clientId,
                MedicineId: pbi.MedicineId,
                Notes: notes,
                In: null,
                Out: null
            };

            mm.updateDrugLog(drugLogInfo).then(r =>setToast(r));
        })

        // Save the date and time to local storage.
        setPillboxLogDate(activePillbox?.Id as number);

        // Now that all the pills in the pillbox are logged rehydrate the drugLogList
        mm.loadDrugLog(clientId).then(drugs => setDrugLogList(drugs));

        // Change  to DISPLAY_TYPE.Medicine
        setDisplayType(DISPLAY_TYPE.Medicine);
    }

    return (
        <>
            <Row className={TabContent}>
                <ListGroup as={Col}>
                    <ListGroup.Item
                        style={{
                            paddingTop: "0.45rem",
                            paddingRight: "1.25rem",
                            paddingBottom: 0,
                            paddingLeft: "1.25rem"
                        }}
                    >
                        <ToggleButton
                            className="d-print-none"
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
                            className="ml-2 d-print-none"
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
                            className="ml-2 d-print-none"
                            disabled={medicineList.length < 5}
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
                            className="ml-2 d-print-none"
                            size="sm"
                            type="radio"
                            disabled={checkoutDisabled}
                            variant="outline-success"
                            name="radio-print-list-group"
                            value={DISPLAY_TYPE.Print}
                            checked={displayType === DISPLAY_TYPE.Print}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Print)}
                        >
                            <span className="ml-2">Print Medicine Checkout</span>
                        </ToggleButton>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {displayType === DISPLAY_TYPE.Medicine &&
                        <MedListGroup
                            activeMed={activeMed}
                            addDrugLog={() => addEditDrugLog()}
                            clientId={clientId}
                            editMedicine={(m) => setShowMedicineEdit(m)}
                            canvasId="med-barcode"
                            itemChanged={id => {
                                if (id < 0) {
                                    setActivePillbox(pillboxList.find(p => p.Id === Math.abs(id)) ||null);
                                    setDisplayType(DISPLAY_TYPE.Pillbox);
                                } else {
                                    setActiveMed(medicineList.find(m => m.Id === id) || null);
                                }
                            }}
                            lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                            logDrug={n => handleLogDrugAmount(n)}
                            pillboxList={pillboxList}
                            medicineList={medicineList}
                        />
                        }

                        {displayType === DISPLAY_TYPE.OTC &&
                        <OtcListGroup
                            disabled={otcList.length === 0}
                            editOtcMedicine={(r) => setShowMedicineEdit(r)}
                            activeOtc={activeOtc}
                            drugLogList={drugLogList}
                            logOtcDrugAmount={(n) => handleLogOtcDrugAmount(n)}
                            logOtcDrug={() => addEditOtcLog()}
                            otcList={otcList}
                            otcSelected={(d) => setActiveOtc(d)}
                        />
                        }

                        {displayType === DISPLAY_TYPE.Pillbox &&
                        <PillboxListGroup
                            activePillbox={activePillbox}
                            onSelect={id => setActivePillbox(pillboxList.find(pb => pb.Id === id) as PillboxRecord)}
                            clientId={clientId}
                            pillboxItemList={pillboxItemList}
                            logPillbox={() => handleLogPillbox()}
                        />
                        }

                        {displayType === DISPLAY_TYPE.Print && activeClient &&
                            <CheckoutListGroup
                                drugLogList={drugLogList}
                                medicineList={medicineList}
                                activeClient={activeClient}
                            />
                        }
                    </ListGroup.Item>
                </ListGroup>

                {displayType !== DISPLAY_TYPE.Print &&
                    <ListGroup as={Col}>
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
                                    lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                                />

                                {activeMed?.Id &&
                                    <DrugLogGrid
                                        drugLog={drugLogList}
                                        drugId={activeMed.Id}
                                        columns={['Created', 'Updated', 'Notes', 'Out', 'In']}
                                        onEdit={r => addEditDrugLog(r)}
                                        onDelete={r => setShowDeleteDrugLogRecord(r)}
                                    />
                                }
                            </ListGroup.Item>
                        }

                        {displayType === DISPLAY_TYPE.OTC &&
                            <ListGroup.Item>
                                <h5 className="mb-2" style={{textAlign: "center"}}>OTC History</h5>
                                <DrugLogGrid
                                    includeCheckout={false}
                                    drugLog={otcLogList}
                                    medicineList={otcList}
                                    columns={['Drug', 'Created', 'Updated', 'Notes']}
                                    onEdit={r => addEditOtcLog(r)}
                                    onDelete={r => setShowDeleteDrugLogRecord(r)}
                                />
                            </ListGroup.Item>
                        }

                        {displayType === DISPLAY_TYPE.Pillbox && activePillbox && activePillbox.Id &&
                            <PillboxCard
                                medicineList={medicineList}
                                activePillbox={activePillbox}
                            />
                        }
                    </ListGroup>
                }
            </Row>

            {/* MedicineEdit Modal*/}
            {showMedicineEdit &&
            <MedicineEdit
                show={true}
                onClose={(r: MedicineRecord | null) => {
                    setShowMedicineEdit(null);
                    if (r) {
                        saveMedicine(r, clientId)
                        .then(m => {
                            if (m.OTC) {
                                setActiveOtc(m);
                            } else {
                                setActiveMed(m);
                            }
                        })
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
                        saveDrugLog(drugLogRecord, clientId).then(r => setToast(r))
                    }
                }}
            />
            }

            {/*Confirm Delete of Drug Log*/}
            {showDeleteDrugLogRecord &&
            <Confirm.Modal
                size='lg'
                onSelect={a => {
                    setShowDeleteDrugLogRecord(null);
                    if (a) mm.deleteDrugLog(showDeleteDrugLogRecord?.Id as number).then(ok => {
                        if (ok) {
                            mm.loadDrugLog(clientId).then(drugs => setDrugLogList(drugs));
                        } else {
                            setErrorDetails('DrugLog delete failed for Id: ' + showDeleteDrugLogRecord.Id);
                        }
                    })
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

            {toast &&
                <Toast
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0
                    }}
                    onClose={()=>setToast(null)}
                    show={true}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        Updating Drug History
                    </Toast.Header>

                    <Toast.Body>
                        Added/Updated {drugName(toast.MedicineId)}
                    </Toast.Body>
                </Toast>
            }
        </>
    );
}

export default MedicinePage;
