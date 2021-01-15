import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Confirm from "./Modals/Confirm";
import DrugLogEdit from "./Modals/DrugLogEdit";
import DrugLogGrid from "./Grids/DrugLogGrid";
import Form from 'react-bootstrap/Form';
import LastTakenButton from "../Buttons/LastTakenButton";
import LogButtons from "../Buttons/LogButtons";
import MedicineEdit from "./Modals/MedicineEdit";
import MedicineListGroup from "./ListGroups/MedicineListGroup";
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert} from "react-bootstrap";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../../types/RecordTypes";
import {
    calculateLastTaken,
    getDrugName,
    getFormattedDate,
    getLastTakenVariant,
    getMDY
} from "../../utility/common";
import PrintMedicineCheckout from "../Buttons/PrintMedicineCheckout";

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (): JSX.Element | null => {
    const [drugLog, setDrugLog] = useGlobal('drugLog');
    const [, setMedicine] = useGlobal('medicine');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [drugLogList] = useGlobal('drugLogList');
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList] = useGlobal('medicineList');
    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
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
        if (focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey]);

    // Set the local clientId state
    useEffect(() => {
        const clientId = activeResident?.Id ? activeResident.Id : null;
        setResidentId(clientId);
    }, [activeResident]);

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
     * Fires when the Log 1 or Log 2 buttons are clicked.
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

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    return (
        <>
            <Form className={TabContent} as={Row}>
                <Col lg="5">
                    <Row>
                        <TooltipButton
                            className="mr-1"
                            tooltip="Manually Add New Medicine"
                            size="sm"
                            variant="info"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                e.preventDefault();
                                const mdy = getMDY();
                                setMedicineInfo({
                                    ...newDrugInfo,
                                    OTC: false,
                                    ResidentId: residentId,
                                    FillDateYear: mdy.year,
                                    FillDateMonth: mdy.month,
                                    FillDateDay: mdy.day
                                });
                                setShowMedicineEdit(true);
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
                                setMedicineInfo({...activeDrug} as MedicineRecord);
                                setShowMedicineEdit(true);
                            }}
                        >
                            Edit <b>{activeDrug.Drug}</b>
                        </Button>
                        }

                        {drugLogList && drugLogList.length > 0 &&
                            <PrintMedicineCheckout
                                className="ml-2"
                                size="sm"
                                variant="info"
                            >
                                Print Medicine Checkout
                            </PrintMedicineCheckout>
                        }
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
                </Col>

                {activeDrug &&
                <Col lg="6">
                    <Row className="justify-content-center">
                        <h2>
                            <a
                                className="hover-underline-animation"
                                href={"https://goodrx.com/" + activeDrug.Drug}
                                rel="noopener noreferrer"
                                target="_blank">
                                {activeDrug.Drug}
                            </a> History
                        </h2>
                    </Row>

                    <Row className="mb-3">
                        <LogButtons
                            disabled={drugLog !== null}
                            lastTaken={lastTaken}
                            lastTakenVariant={lastTakenVariant}
                            onLogAmount={(n) => handleLogDrugAmount(n, activeDrug.Id as number)}
                            drugName={activeDrug.Drug}
                        />
                        <span className="ml-3">
                            <LastTakenButton
                                lastTaken={lastTaken}
                            />
                        </span>
                    </Row>

                    <Row>
                        <DrugLogGrid
                            drugLog={drugLogList}
                            drugId={activeDrug && activeDrug.Id}
                            onEdit={(e, r) => addEditDrugLog(e, r)}
                            onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                        />
                    </Row>
                </Col>
                }
            </Form>

            {/* MedicineEdit Modal*/}
            {medicineInfo &&
            < MedicineEdit
                show={showMedicineEdit}
                onClose={(r) => {
                    setShowMedicineEdit(false);
                    setMedicine({action: "update", payload: r});
                }}
                drugInfo={medicineInfo}
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
