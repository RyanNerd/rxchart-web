import React, {useGlobal, useState} from 'reactn';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import TabContent from "../../styles/tab_content.css";
import DrugDropdown from "./DrugDropdown";
import RefreshMedicineList from "../../providers/RefreshMedicineList";
import MedicineEdit from "../Medicine/MedicineEdit";
import {FULLNAME} from "../../utility/common";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import InformationDialog from "../Dialog/InformationDialog";
import DrugLogGrid from "../DrugLog/DrugLogGrid";
import DrugLogEdit from "../DrugLog/DrugLogEdit";
import RefreshMedicineLog from "../../providers/RefreshMedicineLog";

/**
 * MedicinePage
 * This is where most of the logic and data entry will be done so the page is a little busy
 * Features of this page are:
 *  - Scan Barcode
 *  - Manually Add Medicine
 *  - Add Drug to Medicine Log
 *  - Edit / Delete Existing Medicine
 *  - Drug History Grid
 *
 *  TODO: refresh**** should be single responsibility.
 *
 * @returns {*}
 */
function MedicinePage(props)
{
    const [ barcode, setBarcode ] = useState('');
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteDrug, setShowDeleteDrug ] = useState(false);
    const [ showUnknownBarcode, setShowUnknownBarcode ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugInfo, setDrugInfo ] = useState(null);
    const [ drugLogInfo, setDrugLogInfo ] = useState(null);
    const [ showResidentChangeAlert, setShowResidentChangeAlert ] = useState(false);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState(false);
    const [ showBarcodeNotFound, setShowBarcodeNotFound ] = useState(false);

    const [ activeDrug, setActiveDrug ] = useGlobal('activeDrug');
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ drugLogList, setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;
    const residentProvider = providers.residentProvider;

    /**
     * Fires on keyPress for the barcode text box
     *
     * @param e KeyboardEvent
     */
    function handleBarcodeKeyPress(e)
    {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Query the Medicine table looking for a matching barcode.
            medicineProvider.query(barcode, 'Barcode')
            .then((response) => {
                // Did we find a matching barcode?
                if (response && response.success) {
                    // Sanity Check -- Should only be one
                    if (response.data.length === 1) {
                        setBarcode('');
                        const drug = response.data[0];
                        setActiveDrug(drug);
                        refreshActiveResident(drug.ResidentId);
                        RefreshMedicineLog(medHistoryProvider, 'ResidentId', drug.ResidentId)
                            .then((data) => setDrugLogList(data));
                    } else {
                        const err = new Error("Duplicate Barcode -- This shouldn't happen!");
                        props.onError(err);
                    }
                } else {
                    if (!response || !response.status || response.status !== 404) {
                        props.onError(response);
                    } else {
                        if (activeResident && activeResident.Id) {
                            // Show Dialog box: Barcode not found. Do you want to add a new drug for {resident}?
                            setShowBarcodeNotFound(true);
                        } else {
                            setShowUnknownBarcode(true);
                        }
                    }
                }
            })
        }
    }

    /**
     * Rehydrate the active resident and the medicineList
     *
     * @param residentId
     * Set the active resident to what is given by the residentId and rehydrate the medicineList.
     *
     */
    function refreshActiveResident(residentId)
    {
        residentProvider.read(residentId)
        .then((residentInfo) =>
        {
            if (activeResident && activeResident.Id !== residentId) {
                setShowResidentChangeAlert(true);
            }

            setActiveResident(residentInfo);

            RefreshMedicineList(medicineProvider, residentId)
            .then((data) => setMedicineList(data))
            .catch((err) => {
                props.onError(err);
            });
        })
        .catch((err) => {
            props.onError(err);
        });
    }

    /**
     * Fires when a drug is being manually added or edited.
     *
     * @param {boolean} isAdd
     */
    function addEditDrug(isAdd)
    {
        // There are multiple entry states:
        // 1. Barcode gave not found error AND there is an activeResident (add)
        // 2. User clicked the Add New Medicine button AND there is an activeResident (add)
        // 3. User clicked Edit Drug Info button [activeResident && activeDrug.Id] (edit)

        if (isAdd) {
            // Sanity check
            if (!activeResident || !activeResident.Id) {
                alert('No active resident selected!');
                return;
            }

            setDrugInfo({
                Id: 0,
                Barcode: barcode,
                ResidentId: activeResident.Id,
                Drug: "",
                Strength: "",
                Directions: "",
                Notes: ""
            });
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
    function handleMedicineEditModalClose(drugInfo)
    {
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
                    RefreshMedicineLog(medHistoryProvider, 'ResidentId', drugData.ResidentId)
                        .then((updatedDrugLog) => setDrugLogList(updatedDrugLog));
                })
                .catch((err) => {
                    props.onError(err);
                });
            });
        }

        setShowMedicineEdit(false);
    }

    /**
     * Fires when the user clicks on the Delete Drug button
     */
    function deleteDrug() {
        medicineProvider.delete(activeDrug.Id)
        .then((response) => {
            if (response.success) {
                RefreshMedicineList(medicineProvider, activeDrug.ResidentId)
                .then((data) => {
                    setMedicineList(data);
                    setDrugInfo(null);
                    setActiveDrug(null);
                    setDrugLogList(null);
                });
            } else {
                props.onError(response);
            }
        });

        setShowDeleteDrug(false);
    }

    /**
     * Fires when the user has confirmed the deletion of a drug log record.
     *
     * @param {object} drugLogInfo
     */
    function deleteDrugLogRecord(drugLogInfo)
    {
        medHistoryProvider.delete(drugLogInfo.Id)
        .then((response) => {
            RefreshMedicineLog(medHistoryProvider, 'ResidentId', activeDrug.ResidentId)
                .then((data) => setDrugLogList(data));
        });
        setShowDeleteDrugLogRecord(false);
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     *
     * @param {Event} e
     * @param {object} drugLogInfo
     */
    function addEditDrugLog(e, drugLogInfo)
    {
        e.preventDefault();

        setDrugLogInfo(drugLogInfo);
        setShowDrugLog(true);
    }

    /**
     * Fires when the drug log edit modal closes
     *
     * @param {object | null} drugLogInfo
     */
    function handleDrugLogEditClose(drugLogInfo) {
        if (drugLogInfo) {
            medHistoryProvider.post(drugLogInfo)
                .then((response) => {
                    RefreshMedicineLog(medHistoryProvider, 'ResidentId', activeDrug.ResidentId)
                        .then((data) => setDrugLogList(data));
                })
                .catch((err) => {
                    props.onError(err);
                });
        }
        setShowDrugLog(false);
    }

    return (
        <>
            {showResidentChangeAlert &&
                <Alert
                    dismissible
                    show={showResidentChangeAlert}
                    onClose={() => setShowResidentChangeAlert(!showResidentChangeAlert)}
                    variant="warning"
                >
                    <Alert.Heading>
                        <strong>Resident Changed to {FULLNAME(activeResident)}</strong>
                    </Alert.Heading>
                </Alert>
            }

            <Form className={TabContent}>
                <Form.Group as={Row} controlId="bar-code">
                    <Form.Label column sm="1">
                        Scan Barcode
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            type="text"
                            value={barcode}
                            onKeyPress={(e) => handleBarcodeKeyPress(e)}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </Col>
                    <Col sm="2">
                        {activeResident && activeResident.Id &&
                            <OverlayTrigger
                                key="new-drug"
                                placement="right"
                                overlay={
                                    <Tooltip id="add-new-drug-tooltip">
                                        Manually Add New Drug for Resident
                                    </Tooltip>
                                }
                            >
                                <Button
                                    size="sm"
                                    variant="info"
                                    onClick={() => addEditDrug(true)}
                                >
                                    + Drug
                                </Button>
                            </OverlayTrigger>
                        }
                    </Col>
                </Form.Group>
            </Form>

            {activeResident && activeResident.Id && activeDrug &&
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        <ListGroup.Item active>
                            <DrugDropdown
                                medicineList={medicineList}
                                drugId={activeDrug.Id}
                                onSelect={(e, drug) => {
                                    setActiveDrug(drug);
                                    RefreshMedicineLog(medHistoryProvider, 'ResidentId', drug.ResidentId)
                                        .then((data) => setDrugLogList(data));
                                }}
                            />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                className="mr-2"
                                size="md"
                                variant="primary"
                                onClick={(e) => addEditDrugLog(e, {
                                    Id: null,
                                    ResidentId: activeResident.Id,
                                    MedicineId: activeDrug.Id,
                                    Note: ''
                                })}
                            >
                                + Log Drug
                            </Button>

                            <Button
                                className="mr-3"
                                size="sm"
                                variant="info"
                                onClick={() => addEditDrug(false)}
                            >
                                Edit Drug
                            </Button>

                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => setShowDeleteDrug(true)}
                            >
                                <span role="img" aria-label="delete">🗑️ Delete Drug</span>
                            </Button>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <b>Directions</b>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <p>{activeDrug.Directions}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <b>Notes</b>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <p>{activeDrug.Notes}</p>
                        </ListGroup.Item>

                        <ListGroup.Item variant="info">
                            <b>Barcode:</b> {activeDrug.Barcode}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col sm={6}>
                    <span style={{textAlign: "center"}}> <h1>DRUG HISTORY</h1> </span>
                    <DrugLogGrid
                        drugLog={drugLogList}
                        drugId={activeDrug && activeDrug.Id}
                        onEdit={(e, r)=> addEditDrugLog(e, r)}
                        onDelete={(e, r) => setShowDeleteDrugLogRecord(r)}
                    />
                </Col>
            </Row>
            }

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

            {activeDrug && activeDrug.Id &&
            <ConfirmationDialog
                title={"Delete " + activeDrug.Drug}
                body={
                    <b style={{color: "red"}}>
                        Are you sure?
                    </b>
                }
                show={showDeleteDrug}
                onAnswer={(a) => {
                    if (a) {
                        deleteDrug();
                    } else {
                        showDeleteDrug(false);
                    }
                }}
                onHide={() => setShowDeleteDrug(false)}
            />
            }

            {activeDrug && activeDrug.Id &&
            <ConfirmationDialog
                title={"Delete Log Record"}
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
            }

            {showBarcodeNotFound &&
            <ConfirmationDialog
                title={"Barcode not found"}
                body={
                    <>
                        <b style={{color: "blue"}}>
                            Do you want to add a new drug?
                        </b>
                    </>
                }
                show={showBarcodeNotFound}
                onAnswer={(a) => {
                    if (a) {
                        addEditDrug(true);
                        setShowBarcodeNotFound(false);
                    } else {
                        setShowBarcodeNotFound(false);
                    }
                }}
                onHide={() => setShowBarcodeNotFound(false)}
            />
            }

            <InformationDialog
                title="Unknown Barcode"
                body="You must select the resident this drug is for before adding it."
                show={showUnknownBarcode}
                onHide={() => setShowUnknownBarcode(false)}
            />
        </>
    );
}

export default MedicinePage;