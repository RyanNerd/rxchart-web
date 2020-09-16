import React, {useGlobal, useState, useEffect, useRef} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../styles/tab_content.css";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import DrugLogGrid from "../components/grids/DrugLogGrid";
import DrugLogEdit from "../components/Modals/DrugLogEdit";
import RefreshMedicineLog from "../providers/RefreshMedicineLog";
import MedicineListGroup from "../components/ListGroups/MedicineListGroup";
import RefreshOtcList from "../providers/helpers/RefreshOtcList";
import {calculateLastTaken} from "../utility/common";
import {newDrugInfo} from "../utility/InitialState";
import Table from "react-bootstrap/Table";
import PropTypes from 'prop-types';

/**
 * OtcPage
 * This is where most of the logic and data entry will be done so the page is a little busy
 * Features of this page are:
 *  - Manually Add Medicine
 *  - Add Drug to Medicine Log
 *  - Edit / Delete Existing Medicine
 *  - Drug History Grid
 *
 * @returns {*}
 */
const OtcPage = (props) => {
    const [ drugInfo, setDrugInfo ] = useState(newDrugInfo);
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugLogInfo, setDrugLogInfo ] = useState(null);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState(false);
    const [ lastTaken, setLastTaken ] = useState(false);
    const [ searchText, setSearchText ] = useState('');
    const [ searchIsValid, setSearchIsValid ] = useState(null);
    const [ activeDrug, setActiveDrug ] = useState(null);
    const [ otcList, setOtcList ] = useGlobal('otcList');
    const [ drugLogList, setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;

    const focusRef = useRef(null);
    const key = props.activeTabKey || null;
    const onError = props.onError;

    // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
    // We only want to list the OTC drugs on this page that the resident has taken.
    const otcLogList = (otcList && otcList.length > 0 ) && drugLogList ? drugLogList.filter((drug) => {
        return otcList.some((f) => {
            return f.Id === drug.MedicineId;
        });
    }) : null;

    // Set focus to the search input when this page is selected.
    useEffect(() => props.updateFocusRef(focusRef), [props, key]);

    // Set the active drug when the otcList changes.
    useEffect(()=> {
        if (otcList && otcList.length > 0) {
            setActiveDrug(otcList[0]);
        }
    }, [otcList]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id && drugLogList) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

    // Handle if the search text has a match in the otcList.
    useEffect(() =>{
        const textLen = searchText ? searchText.length : 0;
        if (textLen > 0 && otcList && otcList.length > 0) {
            const otcDrugMatch =
                otcList.filter(drug =>
                    (drug.Drug.substr(0, textLen).toLowerCase() === searchText.toLowerCase())
                );
            if (otcDrugMatch && otcDrugMatch.length > 0) {
                setActiveDrug(otcDrugMatch[0]);
            }
        }
    }, [searchText, otcList]);

    // Show or hide the valid search icon
    useEffect(() => {
        const textLen = searchText ? searchText.length : 0;
        if (activeDrug) {
            if (activeDrug.Drug.substr(0, textLen).toLowerCase() === searchText.toLowerCase()) {
                setSearchIsValid(true);
            } else {
                setSearchIsValid(false);
            }
        }
    }, [activeDrug, searchText]);
    
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
            drugInfo.OTC = true;
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
                RefreshOtcList(medicineProvider)
                .then((drugList) => {
                    setOtcList(drugList);
                    setDrugInfo(drugRecord);
                    setActiveDrug(drugRecord);
                    setLastTaken(false);
                    RefreshMedicineLog(medHistoryProvider, activeResident.Id)
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
            RefreshMedicineLog(medHistoryProvider, activeResident.Id).then((data) => setDrugLogList(data));
        })
        .catch((err) => onError(err));

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
                RefreshMedicineLog(medHistoryProvider, activeResident.Id)
                .then((data) => {setDrugLogList(data)})
            })
            .catch((err) => {
                onError(err);
            });
        }
        setShowDrugLog(false);
    }

    const otcPage = (
        <Form>
            <Form.Group className={TabContent} as={Row}>
                <Form.Group as={Col} sm="5">
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
                                isValid={searchIsValid}
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

                {activeDrug &&
                <Col sm="7">
                    <span style={{textAlign: "center"}}> <h2>OTC Drug History</h2> </span>
                </Col>
                }

                {activeDrug && otcList &&
                <Row>
                    <Col sm="5">
                        <MedicineListGroup
                            lastTaken={lastTaken}
                            medicineList={otcList}
                            activeDrug={activeDrug}
                            drugChanged={(drug) => setActiveDrug(drug)}
                            addDrugLog={(e) => addEditDrugLog(e)}
                        />
                    </Col>

                    <Col sm="7">
                        <DrugLogGrid
                            showDrugColumn={true}
                            drugLog={otcLogList}
                            otcList={otcList}
                            onEdit={(e, r) => addEditDrugLog(e, r)}
                            onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                        />
                    </Col>
                </Row>
                }
            </Form.Group>

            {/* MedicineEdit Modal*/}
            <MedicineEdit
                show={showMedicineEdit}
                onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                onClose={(r) => handleMedicineEditModalClose(r)}
                drugInfo={drugInfo}
                otc={true}
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
        </Form>
    );

    if ((activeResident && activeResident.Id)) {
        return otcPage;
    } else {
        return null;
    }
}

OtcPage.propTypes = {
    activeTabKey: PropTypes.string,
    onError: PropTypes.func.isRequired,
    updateFocusRef: PropTypes.func.isRequired
}

export default OtcPage;
