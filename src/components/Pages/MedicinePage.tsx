import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Confirm from "../Modals/Confirm";
import DrugLogEdit from "../Modals/DrugLogEdit";
import DrugLogGrid from "../Grids/DrugLogGrid";
import Form from 'react-bootstrap/Form';
import LastTakenButton from "../Buttons/LastTakenButton";
import MedicineEdit from "../Modals/MedicineEdit";
import MedicineListGroup from "../ListGroups/MedicineListGroup";
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert} from "react-bootstrap";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../../types/RecordTypes";
import {
    calculateLastTaken, getDrugName,
    getFormattedDate,
    getLastTakenVariant,
    getMDY,
    isSearchValid,
    searchDrugs
} from "../../utility/common";
import LogButtons from "../Buttons/LogButtons";

/**
 * MedicinePage
 * UI for logging prescription medications
 * @return {JSX.Element | null}
 */
const MedicinePage = (): JSX.Element | null => {
    const [, setDeleteDrugLog] = useGlobal('deleteDrugLog');
    const [, setUpdateDrugLog] = useGlobal('updateDrugLog');
    const [, setUpdateMedicine] = useGlobal('updateMedicine');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [drugLogInfo, setDrugLogInfo] = useState<DrugLogRecord | null>(null);
    const [drugLogList] = useGlobal('drugLogList');
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList] = useGlobal('medicineList');
    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const [searchIsValid, setSearchIsValid] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<any>(false);
    const [showDrugLog, setShowDrugLog] = useState(false);
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

    // Handle if the search text has a match in the medicineList.
    useEffect(() => {
        const drugMatch = searchDrugs(searchText, medicineList);
        if (drugMatch) {
            setActiveDrug(drugMatch);
        }
    }, [searchText, medicineList]);

    // Reset the search text input when the activeResident changes
    useEffect(() => {
        setSearchText('');
        // todo: get rid of the monitoring of residentId
        const clientId = activeResident?.Id ? activeResident.Id : null;
        setResidentId(clientId);
    }, [activeResident]);

    // Show or hide the valid search icon
    useEffect(() => {
        if (activeDrug) {
            setSearchIsValid(isSearchValid(searchText, activeDrug));
        }
    }, [activeDrug, searchText]);

    // If there isn't an activeResident or this isn't the active tab then do not render
    if (!residentId || activeTabKey !== 'medicine') {
        return null;
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        setDrugLogInfo(drugLogRecord);
        setShowDrugLog(true);
    }

    /**
     * Fires when the Log 1 or Log 2 buttons are clicked.
     * @param {number} amount
     */
    const handleLogDrugAmount = (amount: number) => {
        if (activeDrug?.Id) {
            const notes = amount.toString();
            const drugLogInfo = {
                Id: null,
                ResidentId: residentId,
                MedicineId: activeDrug.Id,
                Notes: notes
            };
            setUpdateDrugLog(drugLogInfo);
        }
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const shortenedDrugName = activeDrug?.Drug.substring(0, 31);

    return (
        <>
            <Form className={TabContent} as={Row}>
                <Form.Group as={Col} controlId="medicine-buttons">
                    <Form.Group as={Row} sm="8">
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
                                    ResidentId: activeResident?.Id,
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
                    </Form.Group>

                    {medicineList.length > 0 &&
                        <Form.Group as={Row}>
                            <Form.Control
                                id="medicine-page-search-text"
                                style={{width: "220px"}}
                                isValid={searchIsValid}
                                type="search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search medicine"
                                ref={focusRef}
                            />

                            {activeDrug &&
                                <h3 className="ml-4">
                                    <b>
                                        <a
                                            className="hover-underline-animation"
                                            href={"https://goodrx.com/" + shortenedDrugName}
                                            rel="noopener noreferrer"
                                            target="_blank">
                                            {shortenedDrugName}
                                        </a>
                                    </b>
                                </h3>
                            }
                        </Form.Group>
                    }
                </Form.Group>

                {activeDrug &&
                    <>
                        <Col sm="7">
                            <span style={{textAlign: "center"}}> <h2>{activeDrug.Drug} History</h2> </span>
                            <LogButtons
                                lastTaken={lastTaken}
                                lastTakenVariant={lastTakenVariant}
                                onLogAmount={(n) => handleLogDrugAmount(n)}
                                drugName={activeDrug.Drug}
                            />

                            <span className="ml-3">
                            <LastTakenButton
                                lastTaken={lastTaken}
                            />
                            </span>
                        </Col>

                        <Row>
                            <Col sm="5">
                                <MedicineListGroup
                                    lastTaken={lastTaken}
                                    medicineList={medicineList}
                                    activeDrug={activeDrug}
                                    drugChanged={(drug: MedicineRecord) => setActiveDrug(drug)}
                                    addDrugLog={(e: React.MouseEvent<HTMLElement>) => addEditDrugLog(e)}
                                    logDrug={(amount: number) => handleLogDrugAmount(amount)}
                                    canvasId={'med-barcode'}
                                />
                            </Col>

                            <Col sm="7">
                                <DrugLogGrid
                                    drugLog={drugLogList}
                                    drugId={activeDrug && activeDrug.Id}
                                    onEdit={(e, r) => addEditDrugLog(e, r)}
                                    onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                                />
                            </Col>
                        </Row>
                    </>
                }
            </Form>

            {/* MedicineEdit Modal*/}
            {medicineInfo &&
                < MedicineEdit
                    show={showMedicineEdit}
                    onClose={(r) => {
                        setShowMedicineEdit(false);
                        setUpdateMedicine(r);
                    }}
                    drugInfo={medicineInfo}
                />
            }

            {drugLogInfo &&
                <DrugLogEdit
                    show={showDrugLog}
                    drugLogInfo={drugLogInfo}
                    onHide={() => setShowDrugLog(!showDrugLog)}
                    onClose={(drugLogRecord) => {
                        setShowDrugLog(false);
                        setUpdateDrugLog(drugLogRecord);
                    }}
                />
            }

            {/*Confirm Delete of Drug Log*/}
            {showDeleteDrugLogRecord &&
                <Confirm.Modal
                    size='lg'
                    onSelect={(a) => {
                        setShowDeleteDrugLogRecord(false);
                        setDeleteDrugLog(a ? showDeleteDrugLogRecord.Id : null);
                    }}
                    show={typeof showDeleteDrugLogRecord === 'object'}
                    buttonvariant="danger"
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            Delete {getDrugName(showDeleteDrugLogRecord.MedicineId, medicineList)} Log Record
                        </Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert variant="secondary">
                            Date: {getFormattedDate(showDeleteDrugLogRecord.Updated)}
                        </Alert>
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
