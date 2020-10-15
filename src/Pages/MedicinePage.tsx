import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../styles/common.css";
import MedicineEdit from "../components/Modals/MedicineEdit";
import DrugLogGrid from "../components/Grids/DrugLogGrid";
import DrugLogEdit from "../components/Modals/DrugLogEdit";
import MedicineListGroup from "../components/ListGroups/MedicineListGroup";
import TooltipButton from "../components/Buttons/TooltipButton";
import {
    calculateLastTaken,
    getFormattedDate,
    getLastTakenVariant,
    getMDY,
    getObjectByProperty,
    isSearchValid,
    searchDrugs
} from "../utility/common";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../types/RecordTypes";
import LastTakenButton from "../components/Buttons/LastTakenButton";
import {updateDrugLog} from "./Common/updateDrugLog";
import {updateMedicine} from "./Common/updateMedicine";
import getMedicineList from "./Common/getMedicineList";
import getMedicineLog from "./Common/getMedicineLog";
import Confirm from "../components/Modals/Confirm";
import {Alert} from "react-bootstrap";
import deleteDrugLog from "./Common/deleteDrugLog";

interface IProps {
    activeTabKey: string | null,
    onError: (e: Error) => void
}

/**
 * MedicinePage
 * UI for logging prescription medications
 *
 * @param {IProps} props
 * @return {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [showDrugLog, setShowDrugLog] = useState(false);
    const [drugInfo, setDrugInfo] = useState<MedicineRecord | null>(null);
    const [drugLogInfo, setDrugLogInfo] = useState<DrugLogRecord | null>(null);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<any>(false);
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [searchText, setSearchText] = useState('');
    const [searchIsValid, setSearchIsValid] = useState(false)
    const [medicineList, setMedicineList] = useGlobal('medicineList');
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [activeResident] = useGlobal('activeResident');
    const [providers] = useGlobal('providers');
    const [residentId, setResidentId] = useState<number | null>(activeResident?.Id || null);
    const focusRef = useRef<HTMLInputElement>(null);
    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;
    const onError = props.onError;
    const activeTabKey = props.activeTabKey;

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
        if (activeTabKey === 'medicine' && focusRef && focusRef.current) {
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

    // If there isn't an activeResident then bail with null
    if (!residentId) {
        return null;
    }

    /**
     * Fires when medicine is added or edited.
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {boolean} isAdd
     */
    const addEditDrug = (e: React.MouseEvent<HTMLElement>, isAdd: boolean): void => {
        e.preventDefault();
        if (isAdd) {
            const mdy = getMDY();
            const drugInfo = {
                ...newDrugInfo,
                OTC: false,
                ResidentId: activeResident?.Id,
                FillDateYear: mdy.year,
                FillDateMonth: mdy.month,
                FillDateDay: mdy.day
            };
            setDrugInfo(drugInfo);
        } else {
            const drugRecord = {...activeDrug} as MedicineRecord;
            setDrugInfo(drugRecord);
        }
        setShowMedicineEdit(true);
    }

    /**
     * Fires when MedicineEdit closes.
     *
     * @param {MedicineRecord | null} drugInfo
     */
    const handleMedicineEditModalClose = (drugInfo: MedicineRecord | null): void => {
        const residentId = activeResident?.Id;
        if (drugInfo && residentId) {
            updateMedicine(medicineProvider, drugInfo)
                .then((drugRecord) => {
                    getMedicineList(medicineProvider, residentId)
                        .then((drugList) => {
                            setMedicineList(drugList).then(() => {});
                            setDrugInfo(drugRecord);
                            setActiveDrug(drugRecord);
                            setLastTaken(null);
                            getMedicineLog(medHistoryProvider, residentId)
                                .then((updatedDrugLog) => setDrugLogList(updatedDrugLog));
                        })
                        .catch((err) => {
                            onError(err);
                        });
                });
        }
        setShowMedicineEdit(false);
    }

    /**
     * Fires when the user has confirmed the deletion of a drug log record.
     *
     * @param {DrugLogRecord} drugLogInfo
     */
    const deleteDrugLogRecord = (drugLogInfo: DrugLogRecord): void => {
        const drugLogId = drugLogInfo && drugLogInfo.Id;
        if (drugLogId) {
            deleteDrugLog(medHistoryProvider, drugLogId)
                .then((deleted) => {
                    if (deleted.success) {
                        getMedicineLog(medHistoryProvider, residentId).then((data) => setDrugLogList(data));
                    } else {
                        throw new Error('DrugLog Delete failed for Record: ' + drugLogId);
                    }
                })
                .catch((err) => onError(err));
        }
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {DrugLogRecord} drugLogInfo
     */
    const addEditDrugLog = (e: React.MouseEvent<HTMLElement>, drugLogInfo?: DrugLogRecord): void => {
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
     *
     * @param {number} amount
     */
    const handleLogDrugAmount = (amount: number): void => {
        const drugId = activeDrug && activeDrug.Id;
        if (drugId) {
            const notes = amount.toString();
            const drugLogInfo = {
                Id: null,
                ResidentId: residentId,
                MedicineId: drugId,
                Notes: notes
            };
            updateDrugLog(medHistoryProvider, drugLogInfo, residentId)
                .then((drugLogList) => setDrugLogList(drugLogList))
                .catch((err) => onError(err))
        }
    }

    /**
     * Given the MedicineId return the name of the drug
     *
     * @param {number} id
     * @return {string}
     */
    const getDrugName = (id: number): string => {
        const drug = getObjectByProperty(medicineList, 'Id', id) as MedicineRecord;
        return drug.Drug;
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
                            onClick={(e: React.MouseEvent<HTMLElement>) => addEditDrug(e, true)}
                        >
                            + Medicine
                        </TooltipButton>

                        {activeDrug &&
                        <Button
                            size="sm"
                            variant="info"
                            onClick={(e) => addEditDrug(e, false)}
                        >
                            Edit <b>{activeDrug.Drug}</b>
                        </Button>
                        }
                    </Form.Group>

                    {medicineList.length > 0 &&
                        <Form.Group as={Row}>
                            <Form.Control
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
            {drugInfo &&
                < MedicineEdit
                    show={showMedicineEdit}
                    onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                    onClose={(r) => handleMedicineEditModalClose(r)}
                    drugInfo={drugInfo}
                />
            }

            {drugLogInfo &&
                <DrugLogEdit
                    show={showDrugLog}
                    drugLogInfo={drugLogInfo}
                    onHide={() => setShowDrugLog(!showDrugLog)}
                    onClose={(drugLogRecord) => {
                        if (drugLogRecord) {
                            updateDrugLog(medHistoryProvider, drugLogRecord, residentId)
                                .then((drugLogList) => setDrugLogList(drugLogList))
                                .catch((err) => onError(err))
                        }
                        setShowDrugLog(false);
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
                            const drugLog = {...showDeleteDrugLogRecord};
                            if (a) {
                                deleteDrugLogRecord(drugLog)
                            }
                        }
                    }
                    show={typeof showDeleteDrugLogRecord === 'object'}
                    buttonvariant="danger"
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            Delete {getDrugName(showDeleteDrugLogRecord.MedicineId)} Log Record
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
