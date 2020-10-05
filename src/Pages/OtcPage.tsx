import React, {useGlobal, useState, useEffect, useRef} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../styles/tab_content.css";
import MedicineEdit from "../components/Modals/MedicineEdit";
import DrugLogGrid from "../components/Grids/DrugLogGrid";
import DrugLogEdit from "../components/Modals/DrugLogEdit";
import MedicineListGroup from "../components/ListGroups/MedicineListGroup";
import {calculateLastTaken, getFormattedDate} from "../utility/common";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../types/RecordTypes";
import LastTakenButton from "../components/Buttons/LastTakenButton";
import searchDrugs from "../utility/searchDrugs";
import isSearchValid from "../utility/isSearchValid";
import logButtonColor from "../utility/logButtonColor";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import MedicineProvider from "../providers/MedicineProvider";
import {updateDrugLog} from "./Common/updateDrugLog";
import {updateMedicine} from "./Common/updateMedicine";
import getMedicineLog from "./Common/getMedicineLog";
import getOtcList from "./Common/getOtcList";
import Confirm from "../components/Modals/Confirm";
import {Alert} from "react-bootstrap";

interface IProps {
    activeTabKey: string | null,
    onError: (e: Error) => void
}

/**
 * OtcPage
 * UI for logging OTC medications
 *
 * @returns {*}
 */
const OtcPage = (props: IProps) => {
    const [ drugInfo, setDrugInfo ] = useState<MedicineRecord | null>(null);
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugLogInfo, setDrugLogInfo ] = useState<DrugLogRecord | null>(null);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState<any>(false);
    const [ lastTaken, setLastTaken ] = useState<number | null | boolean>(false);
    const [ searchText, setSearchText ] = useState('');
    const [ searchIsValid, setSearchIsValid ] = useState<boolean | null>(null);
    const [ activeDrug, setActiveDrug ] = useState<MedicineRecord | null>(null);
    const [ otcLogList, setOtcLogList ] = useState(null);

    const [ otcList, setOtcList ] = useGlobal<any>('otcList');
    const [ drugLogList, setDrugLogList ] = useGlobal<any>('drugLogList');
    const [ activeResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');
    const [ residentId, setResidentId ] = useState(activeResident && activeResident.Id);

    const medHistoryProvider = providers.medHistoryProvider as typeof MedHistoryProvider;
    const medicineProvider = providers.medicineProvider as typeof MedicineProvider;

    const focusRef = useRef<HTMLInputElement>(null);
    const activeTabKey = props.activeTabKey || null;
    const onError = props.onError;

    // We only want to list the OTC drugs on this page that the resident has taken.
    useEffect(() => {
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        const otc = (otcList && otcList.length > 0 ) && drugLogList ? drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((f: any) => {
                return f.Id === drug?.MedicineId;
            });
        }) : null;
        setOtcLogList(otc);
    }, [drugLogList, otcList])

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'otc'  && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey]);

    // Set the active drug when the otcList changes.
    useEffect(()=> {
        if (otcList && otcList.length > 0) {
            setActiveDrug(otcList[0]);
        } else {
            setActiveDrug(null);
        }
        setResidentId(activeResident && activeResident.Id);
    }, [otcList, activeResident]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id && drugLogList) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

    // Handle if the search text has a match in the otcList.
    useEffect(() => {
        if (otcList && otcList.length > 0) {
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

    /**
     * Fires when medicine is added or edited.
     *
     * @param {MouseEvent} e
     * @param {boolean} isAdd
     */
    const addEditDrug = (e: React.MouseEvent<HTMLElement>, isAdd: boolean) => {
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
     * @param {object | null} drugInfo
     */
    const handleMedicineEditModalClose = (drugInfo?: MedicineRecord | null) => {
        if (drugInfo && residentId) {
            updateMedicine(medicineProvider, drugInfo)
            .then((drugRecord) => {
                getOtcList(medicineProvider)
                .then((drugList) => {
                    setOtcList(drugList).then(() => {});
                    setDrugInfo(drugRecord);
                    setActiveDrug(drugRecord);
                    setLastTaken(false);
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
     * @param {object} drugLogInfo
     */
    const deleteDrugLogRecord = (drugLogInfo: DrugLogRecord) => {
        if (drugLogInfo && drugLogInfo.Id && residentId) {
            medHistoryProvider.delete(drugLogInfo.Id)
            .then(() => {
                getMedicineLog(medHistoryProvider, residentId).then((data) => setDrugLogList(data));
            })
            .catch((err: Error) => onError(err));
        }
        setShowDeleteDrugLogRecord(false);
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     *
     * @param {MouseEvent} e
     * @param {object} drugLogInfo
     */
    const addEditDrugLog = (e: React.MouseEvent<HTMLElement>, drugLogInfo?: DrugLogRecord) => {
        e.preventDefault();
        const drugLogRecord = drugLogInfo ? drugLogInfo : {
            Id: null,
            ResidentId: residentId,
            MedicineId: activeDrug?.Id,
            Notes: "",
        } as DrugLogRecord;
        setDrugLogInfo(drugLogRecord);
        setShowDrugLog(true);
    }

    /**
     * Fires when the Log 1 or Log 2 buttons are clicked.
     *
     * @param {number} amount
     */
    const handleLogDrugAmount = (amount: number) => {
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

    const otcPage = (
        <Form>
            <Form.Group className={TabContent} as={Row}>
                <Form.Group as={Col} sm="4">
                    <Form.Group as={Row}>
                        <Button
                            size="sm"
                            variant="info"
                            onClick={(e) => addEditDrug(e, true)}
                        >
                            + OTC
                        </Button>

                        {activeDrug &&
                            <Button
                                className="ml-2"
                                size="sm"
                                variant="info"
                                onClick={(e) => addEditDrug(e, false)}
                            >
                                Edit <b>{activeDrug.Drug}</b>
                            </Button>
                        }
                    </Form.Group>

                    {otcList && otcList.length > 0 &&
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
                                <h3 className="ml-4"><b>{activeDrug.Drug}</b></h3>
                            }
                        </Form.Group>
                    }
                </Form.Group>

                {activeDrug && otcList &&
                    <>
                    <Col sm="8">
                        <span style={{textAlign: "center"}}> <h2>OTC Drug History</h2> </span>
                        <Button
                            disabled={lastTaken === 0}
                            variant={"outline-" + logButtonColor(lastTaken)}
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
                            variant={"outline-" + logButtonColor(lastTaken)}
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
                                addDrugLog={(e: React.MouseEvent<HTMLInputElement>) => addEditDrugLog(e)}
                                logDrug={(amount: number) => handleLogDrugAmount(amount)}
                                canvasId={"otc-barcode"}
                            />
                        </Col>

                        <Col sm="8">
                            <DrugLogGrid
                                showDrugColumn={true}
                                drugLog={otcLogList || []}
                                otcList={otcList}
                                onEdit={(e: React.MouseEvent<HTMLElement>, r: DrugLogRecord) => addEditDrugLog(e, r)}
                                onDelete={(e: React.MouseEvent<HTMLElement>, r: DrugLogRecord) => setShowDeleteDrugLogRecord(r)}
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
                    onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                    onClose={(r) => handleMedicineEditModalClose(r)}
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
                show={showDeleteDrugLogRecord}
                onAnswer={(a) => {
                    setShowDeleteDrugLogRecord(false);
                    const drugLog = {...showDeleteDrugLogRecord};
                    if (a) {deleteDrugLogRecord(drugLog)}
                }}
            >
                <Confirm.Header>
                    <Confirm.Title>
                        Delete Log Record
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

    if ((activeResident && residentId)) {
        return otcPage;
    } else {
        return null;
    }
}

export default OtcPage;
