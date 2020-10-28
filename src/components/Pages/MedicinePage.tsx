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

interface IProps {
    activeTabKey: string | null
}

/**
 * MedicinePage
 * UI for logging prescription medications
 * @param {IProps} props
 * @return {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeResident] = useGlobal('activeResident');
    const [drugLogInfo, setDrugLogInfo] = useState<DrugLogRecord | null>(null);
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useGlobal('medicineList');
    const [mm] = useGlobal('medicineManager');
    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const [searchIsValid, setSearchIsValid] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<any>(false);
    const [showDrugLog, setShowDrugLog] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const activeTabKey = props.activeTabKey;
    const focusRef = useRef<HTMLInputElement>(null);

    // Set the activeDrug when the medicineList changes or the activeResident.
    useEffect(() => {
        if (medicineList.length > 0) {
            setActiveDrug(medicineList[0]);
        } else {
            setActiveDrug(null);
        }
        setResidentId(activeResident ? activeResident.Id : null);
    }, [medicineList, activeResident]);

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
     * Fires when the user clicks on the + Medicine button
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const handleAddMedicine = (e: React.MouseEvent<HTMLElement>) => {
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
    }

    /**
     * Fires when the user clicks on the Edit {medicine} button
     * @param {React.MouseEvent<HTMLElement>} e
     */
    const handleEditMedicine = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setMedicineInfo({...activeDrug} as MedicineRecord);
        setShowMedicineEdit(true);
    }

    /**
     * Fires when MedicineEdit closes and there's an update (add/edit) for a Medicine record
     * @param {MedicineRecord} drugInfo
     */
    const updateMedicine = (drugInfo: MedicineRecord) => {
        const residentId = activeResident?.Id as number;
        mm.updateMedicine(drugInfo)
            .then((drugRecord) => {
                mm.loadMedicineList(residentId)
                    .then((meds) => {
                        setMedicineList(meds);
                        setActiveDrug(drugRecord);
                    })
                    .catch((err) => setErrorDetails(err));
            })
            .catch((err) => setErrorDetails(err));
    }

    /**
     * Fires when the user has confirmed the deletion of a drug log record.
     * @param {number} drugLogId
     */
    const deleteDrugLogRecord = (drugLogId: number) => {
        mm.deleteDrugLog(drugLogId)
            .then((deleted) => {
                if (deleted.success) {
                    mm.loadDrugLog(residentId).then((drugs) => setDrugLogList(drugs))
                        .catch((err) => setErrorDetails(err))
                } else {
                    throw new Error('DrugLog Delete failed for MedHistory.Id: ' + drugLogId);
                }
            })
            .catch((err) => setErrorDetails(err));
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
        const drugId = activeDrug?.Id as number;
        if (drugId) {
            const notes = amount.toString();
            const drugLogInfo = {
                Id: null,
                ResidentId: residentId,
                MedicineId: drugId,
                Notes: notes
            };
            mm.updateDrugLog(drugLogInfo, residentId)
                .then((drugLogList) => setDrugLogList(drugLogList))
                .catch((err) => setErrorDetails(err))
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
                            onClick={(e: React.MouseEvent<HTMLElement>) => handleAddMedicine(e)}
                        >
                            + Medicine
                        </TooltipButton>

                        {activeDrug &&
                        <Button
                            size="sm"
                            variant="info"
                            onClick={(e) => handleEditMedicine(e)}
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
                                        {shortenedDrugName}
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
                            <Button
                                style={lastTaken === 0 ? {cursor: "default"} : {}}
                                disabled={lastTaken === 0}
                                variant={"outline-" + lastTakenVariant}
                                className="mr-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogDrugAmount(1);
                                }}
                            >
                                Log 1 {activeDrug.Drug}
                            </Button>

                            <Button
                                style={lastTaken === 0 ? {cursor: "default"} : {}}
                                disabled={lastTaken === 0}
                                className="mr-3"
                                variant={"outline-" + lastTakenVariant}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogDrugAmount(2);
                                }}
                            >
                                Log 2 {activeDrug.Drug}
                            </Button>

                            <LastTakenButton
                                lastTaken={lastTaken}
                            />
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
                                    onEdit={(e: React.MouseEvent<HTMLElement>, r: DrugLogRecord) =>
                                        addEditDrugLog(e, r)
                                    }
                                    onDelete={(e: React.MouseEvent<HTMLElement>, r: DrugLogRecord) =>
                                        setShowDeleteDrugLogRecord(r)
                                    }
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
                        if (r) {
                            updateMedicine(r);
                        }
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
                        if (drugLogRecord) {
                            mm.updateDrugLog(drugLogRecord, residentId)
                                .then((drugLogList) => setDrugLogList(drugLogList))
                                .catch((err) => setErrorDetails(err))
                        }
                    }}
                />
            }

            {/*Confirm Delete of Drug Log*/}
            {showDeleteDrugLogRecord &&
                <Confirm.Modal
                    size='lg'
                    onSelect={
                        (a) => {
                            setShowDeleteDrugLogRecord(false);
                            if (a) {
                                deleteDrugLogRecord(showDeleteDrugLogRecord.Id);
                            }
                        }
                    }
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
