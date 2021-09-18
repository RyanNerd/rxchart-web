import React, {useEffect, useGlobal, useState} from 'reactn';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Alert, ToggleButton} from "react-bootstrap";
import TabContent from "../../styles/common.css";
import MedListGroup, {IMedDropdownItem} from "./ListGroups/MedListGroup";
import {
    DrugLogRecord,
    MedicineRecord,
    newMedicineRecord,
    PillboxItemRecord,
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
import PillboxItemGrid from "./Grids/PillboxItemGrid";
import getPillboxItems from "./Grids/getPillboxItems";
import OtcListGroup from "./ListGroups/OtcListGroup";
import ListGroup from "react-bootstrap/ListGroup";
import LastTakenButton from "../Buttons/LastTakenButton";
import DrugLogGrid from "./Grids/DrugLogGrid";
import DrugLogEdit from "./Modals/DrugLogEdit";
import Confirm from './Modals/Confirm';
import MedicineEdit from "./Modals/MedicineEdit";
import PillboxListGroup from "./ListGroups/PillboxListGroup";

enum LIST_TYPE {
    Medicine = "med",
    OTC = "otc",
    Pillbox = "pillbox"
}

interface IProps {
    drugLogList: DrugLogRecord[]
    activeResident: ResidentRecord | null
    activeTabKey: string
    medicineList: MedicineRecord[]
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
    otcList: MedicineRecord[]
}

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [, setMedicine] = useGlobal('__medicine');
    const [, setOtcMedicine] = useGlobal('__otcMedicine');
    const [, setPillboxItemObserver] = useGlobal('__pillboxItem');

    const [activeResident, setActiveResident] = useState(props.activeResident);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutDisabled, setCheckoutDisabled] = useState(!activeResident);
    const [drugLog, setDrugLog] = useGlobal('__drugLog');

    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const [lastTaken, setLastTaken] = useState<number | null>(null);

    // Lists from props
    const [drugLogList, setDrugLogList] = useState(props.drugLogList);
    const [medicineList, setMedicineList] = useState(props.medicineList);
    const [otcList, setOtcList] = useState(props.otcList);
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [pillboxItemList, setPillboxItemList] = useState(props.pillboxItemList);
    const [pillboxList, setPillboxList] = useState(props.pillboxList);

    // Display state and active Items
    // fixme: Default activeMed
    const [listType, setListType] = useState<LIST_TYPE>(LIST_TYPE.Medicine);
    const [activeMed, setActiveMed] = useState<MedicineRecord | null>(medicineList.length > 0 ? medicineList[0] : null);
    const [activeOtc, setActiveOtc] = useState<MedicineRecord | null>(otcList.length > 0 ? otcList[0] : null);
    const [activePillbox, setActivePillbox] = useState<PillboxRecord|null>(pillboxList.length>0? pillboxList[0] : null);

    // Refresh when props change
    useEffect(() => {
        setDrugLogList(props.drugLogList);
        setActiveResident(props.activeResident);
        setActiveTabKey(props.activeTabKey);
        setMedicineList(props.medicineList.filter(m => m.Active) || []); // On this page we only care about active
        setOtcList(props.otcList);
        setPillboxList(props.pillboxList);
        setPillboxItemList(props.pillboxItemList);
        setListType(LIST_TYPE.Medicine);
    }, [props]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        setLastTaken(activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null);
    }, [activeMed, drugLogList, medicineList]);

    // Set the local clientId state
    useEffect(() => {
        const clientId = activeResident?.Id ? activeResident.Id : null;
        setResidentId(clientId);
    }, [activeResident]);

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

    // Set the activeOtcDrug when the otcList changes.
    useEffect(() => {
        setActiveOtc(otcList.length > 0 ? otcList[0] : null);
    }, [otcList]);

    // We only want to list the OTC drugs on this page that the resident has taken.
    useEffect(() => {
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        const otc = (otcList.length > 0) && drugLogList ? drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((m) => {
                return m.Id === drug?.MedicineId;
            });
        }) : [];
        setOtcLogList(otc);
    }, [drugLogList, otcList]);

    // If there isn't an activeResident or this isn't the active tab then do not render
    if (!residentId || activeTabKey !== 'medicine') {
        return null;
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {DrugLogRecord} drugLogInfo
     */
    const addEditDrugLog = (drugLogInfo?: DrugLogRecord) => {
        // todo: test this!! Especially the MedicineId: activeId attribute
        const drugLogRecord = drugLogInfo ? {...drugLogInfo} : {
            Id: null,
            ResidentId: residentId,
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
            ResidentId: residentId,
            MedicineId: activeOtc?.Id,
            Notes: ""
        } as DrugLogRecord;
        setShowDrugLog(drugLogRecord);
    }

    /**
     * Fires when the Log 1...4 buttons are clicked.
     * @param {number} amount
     * @param {number} drugId
     */
    const handleLogDrugAmount = (amount: number, drugId: number) => {
        const notes = amount.toString();
        const drugLogInfo = {
            Id: null,
            ResidentId: residentId,
            MedicineId: drugId,
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
                ResidentId: residentId,
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
                            value={LIST_TYPE.Medicine}
                            checked={listType === LIST_TYPE.Medicine}
                            onChange={(e) => setListType(LIST_TYPE.Medicine)}
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
                            value={LIST_TYPE.OTC}
                            checked={listType === LIST_TYPE.OTC}
                            onChange={(e) => setListType(LIST_TYPE.OTC)}
                        >
                            <span className="ml-2">OTC</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-pill-btn"
                            id="med-list-group-pill-radio-btn"
                            className="ml-2"
                            size="sm"
                            type="radio"
                            disabled={pillboxList.length === 0}
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={LIST_TYPE.Pillbox}
                            checked={listType === LIST_TYPE.Pillbox}
                            onChange={(e) => setListType(LIST_TYPE.Pillbox)}
                        >
                            <span className="ml-2">Pillbox</span>
                        </ToggleButton>

                        <Button
                            className="ml-3"
                            size="sm"
                            variant="info"
                            disabled={checkoutDisabled}
                            onClick={() => {
                                setActiveTabKey('medicine-checkout')
                            }}
                        >
                            Print Medicine Checkout
                        </Button>
                    </Row>

                    <Row>
                        {listType === LIST_TYPE.Medicine &&
                        <MedListGroup
                            activeMed={activeMed}
                            addDrugLog={(e: React.MouseEvent<HTMLElement>) => {
                                e.preventDefault();
                                addEditDrugLog();
                            }}
                            canvasId="med-barcode"
                            itemChanged={id => {
                                setActiveMed(medicineList.find(m => m.Id === id) || null)
                            }}
                            lastTaken={lastTaken}
                            logDrug={n => {
                                // const activeDrug = getActiveDrug();
                                // handleLogDrugAmount(n, activeDrug?.Id as number)
                            }}
                            medicineList={medicineList}
                        />
                        }


                        {listType === LIST_TYPE.OTC && activeOtc &&
                        <OtcListGroup
                            disabled={drugLog !== null}
                            addOtcMedicine={() => {
                                setShowMedicineEdit({...newMedicineRecord, OTC: true});
                            }}
                            editOtcMedicine={() => {
                                setShowMedicineEdit({...activeOtc} as MedicineRecord);
                            }}
                            activeOtcDrug={activeOtc}
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

                        {listType === LIST_TYPE.Pillbox &&
                        <PillboxListGroup/>
                        }
                    </Row>
                </Col>

                <ListGroup as={Col} className="mx-5">
                    {listType === LIST_TYPE.Medicine &&
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

                    {listType === LIST_TYPE.OTC &&
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

                    {listType === LIST_TYPE.Pillbox && activePillbox && activePillbox.Id &&
                        <PillboxItemGrid
                            onEdit={() => alert('todo: edit pillbox thingy')}
                            pillboxGridItems={getPillboxItems(medicineList, pillboxItemList, activePillbox.Id)}
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
                            setOtcMedicine({action: "update", payload: r});
                        } else {
                            setMedicine({action: "update", payload: r});
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
