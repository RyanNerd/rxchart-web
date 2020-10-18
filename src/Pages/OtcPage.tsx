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
import {
    calculateLastTaken,
    getFormattedDate,
    getLastTakenVariant,
    getObjectByProperty,
    isSearchValid,
    searchDrugs
} from "../utility/common";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../types/RecordTypes";
import LastTakenButton from "../components/Buttons/LastTakenButton";
import {updateDrugLog} from "./Common/updateDrugLog";
import {updateMedicine} from "./Common/updateMedicine";
import getMedicineLog from "./Common/getMedicineLog";
import getOtcList from "./Common/getOtcList";
import Confirm from "../components/Modals/Confirm";
import {Alert} from "react-bootstrap";
import deleteDrugLog from "./Common/deleteDrugLog";

interface IProps {
    activeTabKey: string | null
    onError: (e: Error) => void
}

/**
 * OtcPage
 * UI for logging OTC medications
 *
 * @returns {JSX.Element | null}
 */
const OtcPage = (props: IProps): JSX.Element | null => {
    const [drugInfo, setDrugInfo] = useState<MedicineRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [showDrugLog, setShowDrugLog] = useState(false);
    const [drugLogInfo, setDrugLogInfo] = useState<DrugLogRecord | null>(null);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<any>(false);
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [otcList, setOtcList] = useGlobal('otcList');
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [activeResident] = useGlobal('activeResident');
    const [providers] = useGlobal('providers');
    const [residentId, setResidentId] = useState(activeResident && activeResident.Id);
    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;
    const focusRef = useRef<HTMLInputElement>(null);
    const activeTabKey = props.activeTabKey;
    const onError = props.onError;

    // We only want to list the OTC drugs on this page that the resident has taken.
    useEffect(() => {
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        const otc = (otcList.length > 0) && drugLogList ? drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((m) => {
                return m.Id === drug?.MedicineId;
            });
        }) : [];
        setOtcLogList(otc);
    }, [drugLogList, otcList])

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'otc' && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey]);

    // Set the active drug when the otcList changes.
    useEffect(() => {
        if (otcList.length > 0) {
            setActiveDrug(otcList[0]);
        } else {
            setActiveDrug(null);
        }
        setResidentId(activeResident && activeResident.Id);
    }, [otcList, activeResident]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

    // Handle if the search text has a match in the otcList.
    useEffect(() => {
        if (otcList.length > 0) {
            const drugMatch = searchDrugs(searchText, otcList);
            if (drugMatch) {
                setActiveDrug(drugMatch);
            }
        }
    }, [searchText, otcList]);

    // Show or hide the valid search icon
    useEffect(() => {
        if (activeDrug) {
            setSearchIsValid(isSearchValid(searchText, activeDrug));
        }
    }, [activeDrug, searchText]);

    // Reset the search text input when the resident changes.
    useEffect(() => {
        setSearchText('');
    }, [activeResident]);

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
            const drugInfo = {...newDrugInfo};
            drugInfo.OTC = true;
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
    const handleMedicineEditModalClose = (drugInfo: MedicineRecord): void => {
        updateMedicine(medicineProvider, drugInfo)
            .then((drugRecord) => {
                getOtcList(medicineProvider)
                    .then((drugList) => {
                        setOtcList(drugList);
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

    /**
     * Fires when the user has confirmed the deletion of a drug log record.
     *
     * @param {DrugLogRecord} drugLogInfo
     */
    const deleteDrugLogRecord = (drugLogInfo: DrugLogRecord): void => {
        const drugLogId = drugLogInfo && drugLogInfo.Id;
        if (drugLogId && residentId) {
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
        if (drugId && residentId) {
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
        const drug = getObjectByProperty(otcList, 'Id', id) as MedicineRecord;
        return drug.Drug;
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const shortenedDrugName = activeDrug?.Drug.substring(0, 21);

    return (
        <Form>
            <Form.Group className={TabContent} as={Row}>
                <Form.Group as={Col} controlId="otc-buttons">
                    <Form.Group as={Row} sm="8">
                        <Button
                            className="mr-1"
                            size="sm"
                            variant="info"
                            onClick={(e) => addEditDrug(e, true)}
                        >
                            + OTC
                        </Button>

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

                    {otcList.length > 0 &&
                        <Form.Group as={Row}>
                            <Form.Control
                                style={{width: "220px"}}
                                isValid={searchIsValid || false}
                                type="search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search OTC"
                                ref={focusRef}
                            />

                            {activeDrug &&
                            <h3 className="ml-4"><b>{shortenedDrugName}</b></h3>
                            }
                        </Form.Group>
                    }
                </Form.Group>

                {activeDrug &&
                    <>
                        <Col sm="8">
                            <span style={{textAlign: "center"}}> <h2>OTC Drug History</h2> </span>
                            <Button
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
                            <Col sm="4">
                                <MedicineListGroup
                                    lastTaken={lastTaken}
                                    medicineList={otcList}
                                    activeDrug={activeDrug}
                                    drugChanged={(drug: MedicineRecord) => setActiveDrug(drug)}
                                    addDrugLog={(e: React.MouseEvent<HTMLElement>) => addEditDrugLog(e)}
                                    logDrug={(amount: number) => handleLogDrugAmount(amount)}
                                    canvasId={"otc-barcode"}
                                />
                            </Col>

                            <Col sm="8">
                                <DrugLogGrid
                                    columns={['Drug', 'Created', 'Updated', 'Amount']}
                                    drugLog={otcLogList || []}
                                    otcList={otcList}
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
            </Form.Group>

            {/* MedicineEdit Modal*/}
            {drugInfo &&
                <MedicineEdit
                    show={showMedicineEdit}
                    onClose={(r) => {
                        setShowMedicineEdit(false);
                        if (r) {
                            handleMedicineEditModalClose(r);
                        }
                    }}
                    drugInfo={drugInfo}
                    otc={true}
                />
            }

            {drugLogInfo &&
                <DrugLogEdit
                    show={showDrugLog}
                    drugLogInfo={drugLogInfo}
                    onHide={() => setShowDrugLog(!showDrugLog)}
                    onClose={(drugLogRecord) => {
                        if (drugLogRecord && residentId) {
                            updateDrugLog(medHistoryProvider, drugLogRecord, residentId)
                                .then((drugLogList) => setDrugLogList(drugLogList))
                                .catch((err) => onError(err))
                        }
                        setShowDrugLog(false);
                    }}
                />
            }

            {showDeleteDrugLogRecord &&
                <Confirm.Modal
                    size='lg'
                    show={typeof showDeleteDrugLogRecord === 'object'}
                    buttonvariant="danger"
                    onSelect={(a) => {
                        setShowDeleteDrugLogRecord(false);
                        const drugLog = {...showDeleteDrugLogRecord};
                        if (a) {
                            deleteDrugLogRecord(drugLog)
                        }
                    }}
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
        </Form>
    );
}

export default OtcPage;
