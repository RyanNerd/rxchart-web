import React, {useGlobal, useState, useEffect, useRef} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../styles/tab_content.css";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/ConfirmationDialog";
import DrugLogGrid from "../components/Grids/DrugLogGrid";
import DrugLogEdit from "../components/Modals/DrugLogEdit";
import RefreshMedicineLog from "../providers/helpers/RefreshMedicineLog";
import MedicineListGroup from "../components/ListGroups/MedicineListGroup";
import TooltipButton from "../components/Buttons/TooltipButton";
import {calculateLastTaken} from "../utility/common";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../types/RecordTypes";
import LastTakenButton from "../components/Buttons/LastTakenButton";
import searchDrugs from "../utility/searchDrugs";
import isSearchValid from "../utility/isSearchValid";
import logButtonColor from "../utility/logButtonColor";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import MedicineProvider from "../providers/MedicineProvider";
import {updateDrugLog} from "./Common/updateDrugLog";
import {updateMedicine} from "./Common/updateMedicine";
import getMedicineList from "./Common/getMedicineList";

interface IProps {
    activeTabKey: string | null,
    onError: (e: Error) => void
}

/**
 * MedicinePage
 * UI for logging prescription medications
 *
 * @returns {*}
 */
const MedicinePage = (props: IProps) => {
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugInfo, setDrugInfo ] = useState<MedicineRecord | null>(null);
    const [ drugLogInfo, setDrugLogInfo ] = useState<DrugLogRecord | null>(null);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState<any>(false);
    const [ lastTaken, setLastTaken ] = useState<number | boolean | null>(null);
    const [ activeDrug, setActiveDrug ] = useState<MedicineRecord | null>(null);
    const [ searchText, setSearchText ] = useState('');
    const [ searchIsValid, setSearchIsValid ] = useState(false)
    const focusRef = useRef<HTMLInputElement>(null);

    const [ medicineList, setMedicineList ] = useGlobal<any>('medicineList');
    const [ drugLogList, setDrugLogList ] = useGlobal<any>('drugLogList');
    const [ activeResident ] = useGlobal<any>('activeResident');
    const [ providers ] = useGlobal('providers');
    const [ residentId, setResidentId ] = useState<number | null>(activeResident?.Id || null);

    const medHistoryProvider = providers.medHistoryProvider as typeof MedHistoryProvider;
    const medicineProvider = providers.medicineProvider as typeof MedicineProvider;
    const onError = props.onError;
    const activeTabKey = props.activeTabKey || null;

    // Set the activeDrug when the medicineList changes or the activeResident.
    useEffect(()=> {
        if (medicineList && medicineList.length > 0) {
            setActiveDrug(medicineList[0]);
        } else {
            setActiveDrug(null);
        }
        setResidentId(activeResident ? activeResident.Id : null);
    }, [medicineList, activeResident]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id && drugLogList) {
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
            drugInfo.OTC = false;
            drugInfo.ResidentId = activeResident?.Id;
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
    const handleMedicineEditModalClose = (drugInfo: MedicineRecord | null) => {
        const residentId = activeResident?.Id;
        if (drugInfo && residentId) {
            updateMedicine(medicineProvider, drugInfo)
            .then((drugRecord) => {
                getMedicineList(medicineProvider, residentId)
                .then((drugList) => {
                    setMedicineList(drugList).then(() => {});
                    setDrugInfo(drugRecord);
                    setActiveDrug(drugRecord);
                    setLastTaken(false);
                    RefreshMedicineLog(medHistoryProvider, residentId)
                        .then((updatedDrugLog) => setDrugLogList(updatedDrugLog));
                })
                .catch((err: Error) => {
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
        if (drugLogInfo && drugLogInfo.Id && residentId !== null) {
            medHistoryProvider.delete(drugLogInfo.Id)
            .then(() => {
                RefreshMedicineLog(medHistoryProvider, residentId).then((data) => setDrugLogList(data));
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

    const medicinePage = (
        <>
            <Form className={TabContent} as={Row}>
                <Form.Group as={Col} controlId="medicine-buttons">
                    <Form.Group as={Row} sm="5">
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
                                className="mr-2"
                                size="sm"
                                variant="info"
                                onClick={(e) => addEditDrug(e, false)}
                            >
                                Edit <b>{activeDrug.Drug}</b>
                            </Button>
                        }
                    </Form.Group>

                    {medicineList && medicineList.length > 0 &&
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
                                <h3 className="ml-4"><b>{activeDrug.Drug}</b></h3>
                            }
                        </Form.Group>
                    }
                </Form.Group>

                {activeDrug && medicineList &&
                    <>
                    <Col sm="7">
                        <span style={{textAlign: "center"}}> <h2>{activeDrug.Drug} History</h2> </span>
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
                                showDrugColumn={false}
                                drugLog={drugLogList}
                                drugId={activeDrug && activeDrug.Id}
                                onEdit={(e: React.MouseEvent<HTMLElement>, r: DrugLogRecord) => addEditDrugLog(e, r)}
                                onDelete={(e: React.MouseEvent<HTMLElement>, r:DrugLogRecord) => setShowDeleteDrugLogRecord(r)}
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
                        if (drugLogRecord && residentId) {
                            updateDrugLog(medHistoryProvider, drugLogRecord, residentId)
                                .then((drugLogList) => setDrugLogList(drugLogList))
                                .catch((err) => onError(err))
                        }
                        setShowDrugLog(false);
                    }}
                />
            }

            <ConfirmationDialog
                title="Delete Log Record"
                body={
                    <>
                        <p>{showDeleteDrugLogRecord.Updated}</p>
                        <b style={{color: "red"}}>
                            Are you sure?
                        </b>
                    </>
                }
                show={showDeleteDrugLogRecord instanceof Object}
                onAnswer={(a) => {
                    if (a) {
                        deleteDrugLogRecord(showDeleteDrugLogRecord);
                    } else {
                        setShowDeleteDrugLogRecord(false);
                    }
                }}
                onHide={() => setShowDeleteDrugLogRecord(false)}
            />
        </>
    );

    if (activeResident && residentId) {
        return medicinePage;
    } else {
        return null;
    }
}

export default MedicinePage;
