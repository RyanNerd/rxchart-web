import React, {useGlobal, useState, useEffect} from 'reactn';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../../styles/tab_content.css";
import MedicineEdit from "../Medicine/MedicineEdit";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import DrugLogGrid from "../DrugLog/DrugLogGrid";
import DrugLogEdit from "../DrugLog/DrugLogEdit";
import RefreshMedicineLog from "../../providers/RefreshMedicineLog";
import AddNewMedicineButton from "../ManageDrugs/AddNewMedicineButton";
import MedicineListGroup from "./../Medicine/MedicineListGroup";
import RefreshOtcList from "../../providers/helpers/RefreshOtcList";

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
export default function OtcPage(props)
{
    const [ barcode, setBarcode ] = useState('');
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDrugLog, setShowDrugLog ] = useState(false);
    const [ drugInfo, setDrugInfo ] = useState(null);
    const [ drugLogInfo, setDrugLogInfo ] = useState(null);
    const [ showDeleteDrugLogRecord, setShowDeleteDrugLogRecord ] = useState(false);
    const [ lastTaken, setLastTaken ] = useState(false);

    const [ activeDrug, setActiveDrug ] = useState(null);
    const [ otcList, setOtcList ] = useGlobal('otcList');
    const [ drugLogList, setDrugLogList ] = useGlobal('drugLogList');
    const [ activeResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    const medHistoryProvider = providers.medHistoryProvider;
    const medicineProvider = providers.medicineProvider;

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    useEffect(()=> {
        if (otcList && otcList.length > 0) {
            setActiveDrug(otcList[0]);
        }
    }, [otcList]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id && drugLogList) {
            const filteredDrugs = activeDrug.Id && drugLogList ? drugLogList.filter(drug => drug.MedicineId === activeDrug.Id) : null;
            const latestDrug = filteredDrugs && filteredDrugs.length > 0 ? filteredDrugs[0] : null;
            if (latestDrug) {
                const latestDrugDate = Math.round((new Date(latestDrug.Created)).getTime() / 1000);
                const now = Math.round((new Date()).getTime() / 1000);
                const diff = Math.round((now - latestDrugDate) / 3600);
                setLastTaken(diff);
            }
        } else {
            setLastTaken(0);
        }
    }, [activeDrug, drugLogList]);

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
                OTC: true,
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
                RefreshMedicineLog(medHistoryProvider, activeResident.Id)
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
                RefreshMedicineLog(medHistoryProvider, activeResident.Id)
                .then((data) => {setDrugLogList(data)})
            })
            .catch((err) => {
                props.onError(err);
            });
        }
        setShowDrugLog(false);
    }

    const otcPage = (
        <>
            <Form className={TabContent}>
                <Row controlId="medicine-buttons">
                    <Col sm="4">
                        <>
                            <AddNewMedicineButton
                                onClick={(e) => addEditDrug(e, true)}
                            />

                            {activeDrug &&
                            <Button
                                className="ml-2"
                                size="sm"
                                variant="info"
                                onClick={(e) => addEditDrug(e, false)}
                            >
                                Edit Medicine
                            </Button>
                            }
                        </>
                    </Col>

                    {activeDrug &&
                    <Col sm="8">
                        <span style={{textAlign: "center"}}> <h2>{activeDrug.Drug} History</h2> </span>
                    </Col>
                    }
                </Row>

                {activeDrug &&
                <Row>
                    <Col sm="4">
                        {otcList && activeDrug &&
                        <MedicineListGroup
                            lastTaken={lastTaken}
                            medicineList={otcList}
                            activeDrug={activeDrug}
                            drugChanged={(drug) => setActiveDrug(drug)}
                            addDrugLog={(e) => addEditDrugLog(e)}
                        />
                        }
                    </Col>

                    <Col sm="8">
                        <DrugLogGrid
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
                otc={true}
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
        </>
    );

    if (activeResident && activeResident.Id ) {
        return otcPage;
    } else {
        return null;
    }
}
