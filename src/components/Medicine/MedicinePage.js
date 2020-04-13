import React, {useGlobal, useState, useEffect} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import TabContent from "../../styles/tab_content.css";
import RefreshMedicineList from "../../providers/RefreshMedicineList";
import MedicineEdit from "../Medicine/MedicineEdit";
import {FULLNAME} from "../../utility/common";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import InformationDialog from "../Dialog/InformationDialog";
import DrugLogGrid from "../DrugLog/DrugLogGrid";
import DrugLogEdit from "../DrugLog/DrugLogEdit";
import RefreshMedicineLog from "../../providers/RefreshMedicineLog";
import AddNewMedicineButton from "../ManageDrugs/AddNewMedicineButton";
import MedicineListGroup from "./MedicineListGroup";

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
 * @returns {*}
 */
export default function MedicinePage(props)
{
    const [ barcode, setBarcode ] = useState('');
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showUnknownBarcode, setShowUnknownBarcode ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugInfo, setDrugInfo ] = useState(null);
    const [ drugLogInfo, setDrugLogInfo ] = useState(null);
    const [ showResidentChangeAlert, setShowResidentChangeAlert ] = useState(false);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState(false);
    const [ showBarcodeNotFound, setShowBarcodeNotFound ] = useState(false);
    const [ showLastTakenWarning, setShowLastTakenWarning ] = useState(false);

    const [ activeDrug, setActiveDrug ] = useGlobal('activeDrug');
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ drugLogList, setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;
    const residentProvider = providers.residentProvider;

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id && drugLogList) {
            const filteredDrugs = activeDrug.Id && drugLogList ? drugLogList.filter(drug => drug.MedicineId === activeDrug.Id) : null;
            const latestDrug = filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs[0] : null;
            if (latestDrug) {
                const latestDrugDate = Math.round((new Date(latestDrug.Created)).getTime() / 1000);
                const now = Math.round((new Date()).getTime() / 1000);
                const diff = Math.round((now - latestDrugDate) / 3600);
                setShowLastTakenWarning(diff);
            }
        } else {
            setShowLastTakenWarning(0);
        }
    }, [activeDrug, drugLogList]);

    /**
     * Given the number of hours since the activeDrug was taken return the warningColor code.
     * @param {number} hours
     * @returns {string}
     */
    function determineWarningColor(hours) {
        switch (hours) {
            case 0: return 'danger';
            case 1: return 'danger';
            case 2: return 'danger';
            case 3: return 'warning';
            case 4: return 'warning';
            case 5: return 'warning';
            case 6: return 'info';
            case 7: return 'info';
            case 8: return 'info';
            default: return 'light';
        }
    }

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
     * Fires when medicine is being manually added or edited.
     *
     * @param {Event} e
     * @param {boolean} isAdd
     */
    function addEditDrug(e, isAdd)
    {
        if (e) {
            e.preventDefault();
        }

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
                Notes: "",
                FillDateMonth: month,
                FillDateDay: day,
                FillDateYear: year
            });
        } else {
            setDrugInfo({...activeDrug});
        }

        setBarcode('');
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
                    setShowLastTakenWarning(false);
                    // setBarcodeImg('http://bwipjs-api.metafloor.com/?bcid=code128&scale=1&text=' + activeDrug.Barcode);
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

                    <Col sm="3">
                        <Form.Control
                            type="text"
                            value={barcode}
                            onKeyPress={(e) => handleBarcodeKeyPress(e)}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </Col>

                    <Col sm="3">
                        {activeResident && activeResident.Id &&
                            <>
                            <AddNewMedicineButton
                                onClick={(e) => addEditDrug(e, true)}
                            />

                            {activeDrug &&
                                <>
                                    <Button
                                        className="ml-2"
                                        size="sm"
                                        variant="info"
                                        onClick={(e) => addEditDrug(e, false)}
                                    >
                                        Edit Medicine
                                    </Button>
                                </>
                            }
                        </>
                        }
                    </Col>

                    <Col sm="4">
                        <Alert
                            className="ml-1"
                            show={showLastTakenWarning >= 0 && activeDrug}
                            variant={determineWarningColor(showLastTakenWarning)}
                        >

                        {/* Display in BOLD if taken 3 or less hours ago */}
                        {showLastTakenWarning <= 3 ?
                            <b>Last Taken (hours): {showLastTakenWarning}</b>
                            :
                            <span>Last Taken (hours): {showLastTakenWarning}</span>
                        }

                        </Alert>
                    </Col>
                </Form.Group>
            </Form>

            {activeResident && activeResident.Id && activeDrug &&
            <Row>
                <Col sm={4}>
                        {medicineList && activeDrug &&
                        <MedicineListGroup
                            medicineList={medicineList}
                            activeDrug={activeDrug}
                            drugChanged={(drug) => {
                                setActiveDrug(drug);
                                RefreshMedicineLog(medHistoryProvider, 'ResidentId', drug.ResidentId)
                                    .then((data) => setDrugLogList(data));
                            }}
                            addDrugLog={(e) => addEditDrugLog(e)}
                        />
                    }
                </Col>

                <Col sm={8}>
                    <span style={{textAlign: "center"}}> <h1>{activeDrug.Drug} History</h1> </span>
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
                        addEditDrug(null, true);
                    } else {
                        setBarcode('');
                    }
                    setShowBarcodeNotFound(false);
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
