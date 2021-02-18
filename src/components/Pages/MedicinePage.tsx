import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Confirm from "./Modals/Confirm";
import DrugLogEdit from "./Modals/DrugLogEdit";
import DrugLogGrid from "./Grids/DrugLogGrid";
import Form from 'react-bootstrap/Form';
import LastTakenButton from "../Buttons/LastTakenButton";
import MedicineEdit from "./Modals/MedicineEdit";
import MedicineListGroup from "./ListGroups/MedicineListGroup";
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert, ListGroup} from "react-bootstrap";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../../types/RecordTypes";
import {calculateLastTaken, getCheckoutList, getDrugName, getFormattedDate, getMDY} from "../../utility/common";
import OtcListGroup from "./ListGroups/OtcListGroup";

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (): JSX.Element | null => {
    const [, setMedicine] = useGlobal('medicine');
    const [, setOtcMedicine] = useGlobal('otcMedicine');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeOtcDrug, setActiveOtcDrug] = useState<MedicineRecord | null>(null);
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [apiKey] = useGlobal('apiKey');
    const [checkoutDisabled, setCheckoutDisabled] = useState(apiKey === null || !activeResident)
    const [drugLog, setDrugLog] = useGlobal('drugLog');
    const [drugLogList] = useGlobal('drugLogList');
    const [gridHeight, setGridHeight] = useState('675px');
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [medicineList] = useGlobal('medicineList');
    const [otcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const focusRef = useRef<HTMLInputElement>(null);

    // Set the activeDrug when the medicineList changes
    useEffect(() => {
        if (medicineList.length > 0) {
            setActiveDrug(medicineList[0]);
        } else {
            setActiveDrug(null);
        }
    }, [medicineList]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

    // Set focus to the search input if the page key has changed
    useEffect(() => {
        if (activeTabKey === 'medicine' && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey]);

    // Set the local clientId state
    useEffect(() => {
        const clientId = activeResident?.Id ? activeResident.Id : null;
        setResidentId(clientId);
    }, [activeResident]);

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

    // Set the activeOtcDrug when the otcList changes.
    useEffect(() => {
        if (otcList.length > 0) {
            setActiveOtcDrug(otcList[0]);
        } else {
            setActiveOtcDrug(null);
        }
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

        // Also, set the gridHeight based on if there are OTC drugs logged
        setGridHeight(otc.length > 0 ? "385px" : "685px");
    }, [drugLogList, otcList]);

    // If there isn't an activeResident or this isn't the active tab then do not render
    if (!residentId || activeTabKey !== 'medicine') {
        return null;
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {DrugLogRecord} drugLogInfo
     */
    const addEditDrugLog = (e: React.MouseEvent<HTMLElement>, drugLogInfo?: DrugLogRecord) => {
        e.preventDefault();
        const drugLogRecord = drugLogInfo ? {...drugLogInfo} : {
            Id: null,
            ResidentId: residentId,
            MedicineId: activeDrug?.Id,
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
     * Fires when the Log 1 or Log 2, etc. buttons are clicked in the OtcListGroup are clicked
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

    return (
        <>
            <Form className={TabContent} as={Row}>
                <Col lg="4">
                    <Row>
                        <TooltipButton
                            className="mr-1"
                            tooltip="Manually Add New Medicine"
                            size="sm"
                            variant="info"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                e.preventDefault();
                                const mdy = getMDY();
                                setShowMedicineEdit({
                                    ...newDrugInfo,
                                    OTC: false,
                                    ResidentId: residentId,
                                    FillDateYear: mdy.year,
                                    FillDateMonth: mdy.month,
                                    FillDateDay: mdy.day
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

                    <Row className="mt-3">
                        {activeDrug &&
                        <MedicineListGroup
                            activeDrug={activeDrug}
                            addDrugLog={(e: React.MouseEvent<HTMLElement>) => addEditDrugLog(e)}
                            canvasId={'med-barcode'}
                            disabled={drugLog !== null}
                            drugChanged={(drug: MedicineRecord) => setActiveDrug(drug)}
                            lastTaken={lastTaken}
                            logDrug={(amount: number) => handleLogDrugAmount(amount, activeDrug.Id as number)}
                            medicineList={medicineList}
                        />
                        }
                    </Row>

                    {activeOtcDrug &&
                    <Row className="mt-2">
                        <OtcListGroup
                            addOtcMedicine={() => {
                                setShowMedicineEdit({...newDrugInfo, OTC: true});
                            }}
                            editOtcMedicine={() => {
                                setShowMedicineEdit({...activeOtcDrug} as MedicineRecord);
                            }}
                            activeOtcDrug={activeOtcDrug}
                            drugLogList={drugLogList}
                            logOtcDrugAmount={(n) => handleLogOtcDrugAmount(n)}
                            otcList={otcList}
                            setActiveOtcDrug={(d) => setActiveOtcDrug(d)}/>
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
                            onEdit={(e, r) => addEditDrugLog(e, r)}
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
                            onEdit={(e, r) => addEditDrugLog(e, r)}
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
                show={true}
                drugLogInfo={showDrugLog}
                onHide={() => setShowDrugLog(null)}
                onClose={(drugLogRecord) => {
                    setShowDrugLog(null);
                    if (drugLogRecord) {
                        setDrugLog({action: 'update', payload: drugLogRecord});
                    } else {
                        setDrugLog(null);
                    }
                }}
            />
            }

            {/*Confirm Delete of Drug Log*/}
            {showDeleteDrugLogRecord &&
            <Confirm.Modal
                size='lg'
                onSelect={(a) => {
                    setDrugLog(a ? {action: 'delete', payload: showDeleteDrugLogRecord?.Id as number} : null);
                    setShowDeleteDrugLogRecord(null);
                }}
                show={true}
                buttonvariant="danger"
            >
                <Confirm.Header>
                    <Confirm.Title>
                        Delete {getDrugName(showDeleteDrugLogRecord.MedicineId, medicineList)} Log Record
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
