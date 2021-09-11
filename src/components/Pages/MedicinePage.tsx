import React, {useEffect, useGlobal, useState} from 'reactn';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Alert, ListGroup} from "react-bootstrap";

import Confirm from "./Modals/Confirm";
import DrugLogEdit from "./Modals/DrugLogEdit";
import DrugLogGrid from "./Grids/DrugLogGrid";
import LastTakenButton from "../Buttons/LastTakenButton";
import MedicineEdit from "./Modals/MedicineEdit";
import MedicineListGroup from "./ListGroups/MedicineListGroup";
import OtcListGroup from "./ListGroups/OtcListGroup";
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
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
import MedListGroup from "./ListGroups/MedListGroup";

interface IProps {
    drugLogList: DrugLogRecord[]
    activeResident: ResidentRecord | null
    activeTabKey: string
    medicineList: MedicineRecord[]
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
}

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [, setMedicine] = useGlobal('__medicine');
    const [, setOtcMedicine] = useGlobal('__otcMedicine');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeOtcDrug, setActiveOtcDrug] = useState<MedicineRecord | null>(null);
    const [activeResident, setActiveResident] = useState(props.activeResident);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutDisabled, setCheckoutDisabled] = useState(!activeResident);
    const [drugLog, setDrugLog] = useGlobal('__drugLog');
    const [drugLogList, setDrugLogList] = useState(props.drugLogList);
    const [gridHeight, setGridHeight] = useState('675px');
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [medicineList, setMedicineList] = useState(props.medicineList);
    const [filteredMedicineList, setFilteredMedicineList] = useState(medicineList);
    const [otcGroupShown, setOtcGroupShown] = useState<boolean>(false);
    const [otcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const [pillboxList, setPillboxList] = useState(props.pillboxList);
    const [pillboxItemList, setPillboxItemList] = useState(props.pillboxItemList);
    const [activeId, setActiveId] = useState<number | null>(null);

    // Refresh when props change
    useEffect(() => {
        setDrugLogList(props.drugLogList);
        setActiveResident(props.activeResident);
        setActiveTabKey(props.activeTabKey);
        setMedicineList(props.medicineList);
        setPillboxList(props.pillboxList);
        setPillboxItemList(props.pillboxItemList);
    }, [props]);

    // Set the activeDrug when the filteredMedicineList changes
    useEffect(() => {
        if (filteredMedicineList.length > 0) {
            setActiveDrug(filteredMedicineList[0]);
        } else {
            setActiveDrug(null);
        }
    }, [filteredMedicineList]);

    useEffect(() => {
        if (filteredMedicineList.length > 0) {
            setActiveId(filteredMedicineList[0].Id);
        }
    }, [filteredMedicineList]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

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
        if (otcList.length > 0) {
            setActiveOtcDrug(otcList[0]);
        } else {
            setActiveOtcDrug(null);
        }
    }, [otcList]);

    // Refresh the filteredMedicineList when medicineList changes
    useEffect(() => {
        setFilteredMedicineList(medicineList.filter((m) => m.Active));
    }, [medicineList]);

    // We only want to list the OTC drugs on this page that the resident has taken.
    useEffect(() => {
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        const otc = (otcList.length > 0) && drugLogList ? drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((m) => {
                return m.Id === drug?.MedicineId;
            });
        }) : [];
        setOtcLogList(otc);

        // Also, set the gridHeight based on if there are OTC drugs logged
        setGridHeight(otc.length > 0 ? "385px" : "685px");
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
        const drugLogRecord = drugLogInfo ? {...drugLogInfo} : {
            Id: null,
            ResidentId: residentId,
            MedicineId: activeDrug?.Id,
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
            MedicineId: activeOtcDrug?.Id,
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
        const drugId = activeOtcDrug?.Id as number;
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
                    {!otcGroupShown &&
                    <Row>
                        <TooltipButton
                            className="mr-1"
                            tooltip="Manually Add New Medicine"
                            size="sm"
                            variant="info"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                e.preventDefault();
                                setShowMedicineEdit({
                                    ...newMedicineRecord,
                                    OTC: false,
                                    ResidentId: residentId,
                                    FillDateYear: "",
                                    FillDateMonth: "",
                                    FillDateDay: ""
                                });
                            }}
                        >
                            + Medicine
                        </TooltipButton>

                        {activeDrug &&
                        <Button
                            size="sm"
                            variant="info"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowMedicineEdit({...activeDrug} as MedicineRecord);
                            }}
                        >
                            Edit <b>{activeDrug.Drug}</b>
                        </Button>
                        }

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
                    }

                    {!otcGroupShown && activeDrug &&
                    <Row className="mt-3">
                        <MedListGroup
                            activeId={activeId || 0}
                            addDrugLog={(e: React.MouseEvent<HTMLElement>) => {
                                e.preventDefault();
                                addEditDrugLog();
                            }}
                            canvasId="med-barcode"
                            drugChanged={id => {
                                setActiveId(id);
                                setActiveDrug(medicineList.find(m => m.Id === id) || null);
                            }}
                            lastTaken={lastTaken}
                            logDrug={n => handleLogDrugAmount(n, activeDrug.Id as number)}
                            medicineList={filteredMedicineList}
                            pillboxList={pillboxList}
                            pillboxItemList={pillboxItemList}
                        />

                        {/*<MedicineListGroup*/}
                        {/*    activeDrug={activeDrug}*/}
                        {/*    addDrugLog={(e: React.MouseEvent<HTMLElement>) => {*/}
                        {/*        e.preventDefault();*/}
                        {/*        addEditDrugLog();*/}
                        {/*    }}*/}
                        {/*    canvasId={'med-barcode'}*/}
                        {/*    disabled={drugLog !== null}*/}
                        {/*    drugChanged={(drug: MedicineRecord) => setActiveDrug(drug)}*/}
                        {/*    lastTaken={lastTaken}*/}
                        {/*    logDrug={(amount: number) => handleLogDrugAmount(amount, activeDrug.Id as number)}*/}
                        {/*    medicineList={filteredMedicineList}*/}
                        {/*/>*/}
                    </Row>
                    }

                    {activeOtcDrug &&
                    <Row className={otcGroupShown ? "" : "mt-4"}>
                        <OtcListGroup
                            disabled={drugLog !== null}
                            addOtcMedicine={() => {
                                setShowMedicineEdit({...newMedicineRecord, OTC: true});
                            }}
                            editOtcMedicine={() => {
                                setShowMedicineEdit({...activeOtcDrug} as MedicineRecord);
                            }}
                            activeOtcDrug={activeOtcDrug}
                            drugLogList={drugLogList}
                            logOtcDrugAmount={(n) => handleLogOtcDrugAmount(n)}
                            logOtcDrug={(e) => {
                                e.preventDefault();
                                addEditOtcLog();
                            }}
                            otcList={otcList}
                            setActiveOtcDrug={(d) => setActiveOtcDrug(d)}
                            onDisplay={(d) => setOtcGroupShown(d)}
                        />
                    </Row>
                    }
                </Col>

                {activeDrug &&
                <ListGroup as={Col} className="mx-5">
                    <ListGroup.Item style={{height: gridHeight, overflow: "auto", textAlign: "center"}}>
                        <Button
                            size="lg"
                            className="hover-underline-animation"
                            variant="link"
                            target="_blank"
                            href={"https://goodrx.com/" + activeDrug.Drug}
                        >
                            {activeDrug.Drug}
                        </Button>

                        <LastTakenButton
                            lastTaken={lastTaken}
                        />

                        <DrugLogGrid
                            drugLog={drugLogList}
                            drugId={activeDrug && activeDrug.Id}
                            columns={['Created', 'Updated', 'Notes', 'Out', 'In']}
                            onEdit={(e, r) => {
                                e.preventDefault();
                                addEditDrugLog(r);
                            }}
                            onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                        />
                    </ListGroup.Item>

                    {otcLogList.length > 0 &&
                    <ListGroup.Item style={{height: gridHeight, overflow: "auto"}}>
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
                </ListGroup>
                }
            </Form>

            {/* MedicineEdit Modal*/}
            {showMedicineEdit &&
            <MedicineEdit
                show={true}
                onClose={(r) => {
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
