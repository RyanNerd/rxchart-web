import React, {useGlobal, useState, useEffect, useRef} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../styles/tab_content.css";
import RefreshMedicineList from "../providers/RefreshMedicineList";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import DrugLogGrid from "../components/grids/DrugLogGrid";
import DrugLogEdit from "../components/Modals/DrugLogEdit";
import RefreshMedicineLog from "../providers/RefreshMedicineLog";
import MedicineListGroup from "../components/ListGroups/MedicineListGroup";
import TooltipButton from "../components/Buttons/TooltipButton";
import {calculateLastTaken} from "../utility/common";
import {newDrugInfo} from "../utility/InitialState";
import PropTypes from 'prop-types';

/**
 * MedicinePage
 * This is where most of the logic and data entry will be done so the page is a little busy
 * Features of this page are:
 *  - Manually Add Medicine
 *  - Add Drug to Medicine Log
 *  - Edit / Delete Existing Medicine
 *  - Drug History Grid
 *
 * @returns {*}
 */
const MedicinePage = (props) => {
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugInfo, setDrugInfo ] = useState(null);
    const [ drugLogInfo, setDrugLogInfo ] = useState(null);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState(false);
    const [ lastTaken, setLastTaken ] = useState(false);
    const [ activeDrug, setActiveDrug ] = useState(null);
    const [ searchText, setSearchText ] = useState('');
    const [ searchIsValid, setSearchIsValid ] = useState(false)
    const [ showSearch, setShowSearch ] = useState(false);
    const focusRef = useRef(null);

    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ drugLogList, setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;
    const onError = props.onError;
    const key = props.activeTabKey || null;

    // Set the activeDrug when the medicineList changes.
    useEffect(()=> {
        if (medicineList && medicineList.length > 0) {
            setActiveDrug(medicineList[0]);
        }
    }, [medicineList]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id && drugLogList) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

    // Set focus to the search input if it is shown and the page key has changed
    useEffect(() => {
        if (focusRef && focusRef.current && showSearch) {
            focusRef.current.focus();
        }
    }, [showSearch, key]);

    // Handle if the search text has a match in the otcList.
    useEffect(() =>{
        const textLen = searchText ? searchText.length : 0;
        if (textLen > 0) {
            const drugMatch = medicineList.filter(drug => (drug.Drug.substr(0, textLen).toLowerCase() === searchText.toLowerCase()));
            if (drugMatch && drugMatch.length > 0) {
                setActiveDrug(drugMatch[0]);
                setSearchIsValid(true);
            } else {
                setSearchIsValid(false);
            }
        } else {
            setSearchIsValid(null);
        }
    }, [searchText, medicineList]);

    /**
     * Fires when medicine is added or edited.
     *
     * @param {MouseEvent} e
     * @param {boolean} isAdd
     */
    const addEditDrug = (e, isAdd) => {
        e.preventDefault();
        if (isAdd) {
            const drugInfo = {...newDrugInfo};
            drugInfo.OTC = false;
            drugInfo.ResidentId = activeResident.Id;
            setDrugInfo(drugInfo);
        } else {
            setDrugInfo({...activeDrug});
        }
        setShowMedicineEdit(true);
    }

    /**
     * Fires when MedicineEdit closes.
     *
     * @param {object | null} drugInfo
     */
    const handleMedicineEditModalClose = (drugInfo) => {
        if (drugInfo) {
            const drugData = {...drugInfo};

            if (!drugData.Id) {
                drugData.Id = null;
            }

            if (drugData.Notes === '') {
                drugData.Notes = null;
            }

            medicineProvider.post(drugData)
            .then((drugRecord) => {
                RefreshMedicineList(medicineProvider, drugData.ResidentId)
                .then((drugList) => {
                    setMedicineList(drugList);
                    setDrugInfo(drugRecord);
                    setActiveDrug(drugRecord);
                    setLastTaken(false);
                    RefreshMedicineLog(medHistoryProvider, drugData.ResidentId)
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
    const deleteDrugLogRecord = (drugLogInfo) => {
        medHistoryProvider.delete(drugLogInfo.Id)
        .then((response) => {
            RefreshMedicineLog(medHistoryProvider, activeDrug.ResidentId)
                .then((data) => setDrugLogList(data));
        });
        setShowDeleteDrugLogRecord(false);
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     *
     * @param {MouseEvent} e
     * @param {object} drugLogInfo
     */
    const addEditDrugLog = (e, drugLogInfo) => {
        e.preventDefault();
        // If drugLogInfo is not populated then this is an add operation.
        if (!drugLogInfo) {
            drugLogInfo = {
                Id: null,
                ResidentId: activeResident.Id,
                MedicineId: activeDrug.Id,
                Notes: ""
            }
        }

        setDrugLogInfo(drugLogInfo);
        setShowDrugLog(true);
    }

    /**
     * Fires when the drug log edit modal closes
     *
     * @param {object | null} drugLogInfo
     */
    const handleDrugLogEditClose = (drugLogInfo) => {
        if (drugLogInfo) {
            medHistoryProvider.post(drugLogInfo)
                .then((response) => {
                    RefreshMedicineLog(medHistoryProvider, activeDrug.ResidentId)
                        .then((data) => setDrugLogList(data));
                })
                .catch((err) => {
                    onError(err);
                });
        }
        setShowDrugLog(false);
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
                            onClick={(e) => addEditDrug(e, true)}
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

                        {medicineList && medicineList.length > 0 &&
                        <Button
                            className="mr-3"
                            size="sm"
                            variant="secondary"
                            onClick={(e) => setShowSearch(!showSearch)}
                        >
                            Toggle Search
                        </Button>
                        }
                    </Form.Group>

                    {showSearch &&
                    <Form.Group as={Row}>
                        <Form.Control
                            isValid={searchIsValid}
                            type="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search medicine"
                            ref={focusRef}
                        />
                    </Form.Group>
                    }

                </Form.Group>

                {activeDrug &&
                <Col sm="7">
                    <span style={{textAlign: "center"}}> <h2>{activeDrug.Drug} History</h2> </span>
                </Col>
                }

                {activeDrug &&
                    <Row>
                        <Col sm="5">
                            {medicineList && activeDrug &&
                                <MedicineListGroup
                                    lastTaken={lastTaken}
                                    medicineList={medicineList}
                                    activeDrug={activeDrug}
                                    drugChanged={(drug) => setActiveDrug(drug)}
                                    addDrugLog={(e) => addEditDrugLog(e)}
                                />
                            }
                        </Col>

                        <Col sm="7">
                            <DrugLogGrid
                                showDrugColumn={false}
                                drugLog={drugLogList}
                                drugId={activeDrug && activeDrug.Id}
                                onEdit={(e, r) => addEditDrugLog(e, r)}
                                onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                            />
                        </Col>
                    </Row>
                }
            </Form>

            {/* MedicineEdit Modal*/}
            <MedicineEdit
                show={showMedicineEdit}
                onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                onClose={(r) => handleMedicineEditModalClose(r)}
                drugInfo={drugInfo}
            />

            <DrugLogEdit
                show={showDrugLog}
                drugLogInfo={drugLogInfo}
                onHide={() => setShowDrugLog(!showDrugLog)}
                onClose={(drugLogRecord) => handleDrugLogEditClose(drugLogRecord)}
            />

            <ConfirmationDialog
                title="Delete Log Record"
                body={
                    <>
                        <p>{showDeleteDrugLogRecord.Created}</p>
                        <b style={{color: "red"}}>
                            Are you sure?
                        </b>
                    </>
                }
                show={showDeleteDrugLogRecord}
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

    if (activeResident && activeResident.Id) {
        return medicinePage;
    } else {
        return null;
    }
}

MedicinePage.propTypes = {
    onError: PropTypes.func.isRequired
}

export default MedicinePage;
