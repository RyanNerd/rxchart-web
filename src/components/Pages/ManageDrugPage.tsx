import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import React, {useEffect, useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, newMedicineRecord} from "types/RecordTypes";
import {getDrugName, isToday} from "utility/common";
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
import DrugLogGrid from "./Grids/DrugLogGrid";
import MedicineDetail from "./Grids/MedicineDetail";
import ConfirmDialogModal from "./Modals/ConfirmDialogModal";
import DrugLogEdit from "./Modals/DrugLogEdit";
import MedicineEdit from "./Modals/MedicineEdit";

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 * @returns {JSX.Element}
 */
const ManageDrugPage = (): JSX.Element | null => {
    const [mm] = useGlobal('medicineManager');
    const [activeResident] = useGlobal('activeResident');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useGlobal('medicineList');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [showDrugLogDeleteConfirm, setShowDrugLogDeleteConfirm] = useState<DrugLogRecord | null>(null);
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | null>(null);
    const [todayDrugLogList, setTodayDrugLogList] = useState<DrugLogRecord[]>([]);

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog
     * @param clientId
     */
    const saveDrugLog = async (drugLog: DrugLogRecord, clientId: number): Promise<DrugLogRecord> => {
        const r = await mm.updateDrugLog(drugLog);
        // Rehydrate the drugLogList
        const drugs = await mm.loadDrugLog(clientId);
        await setDrugLogList(drugs);
        return r;
    }

    /**
     * Given a MedicineRecord Update or Insert the record and rehydrate the globalMedicineList
     * @param {MedicineRecord} med
     * @param {number} clientId
     */
    const saveMedicine = async (med: MedicineRecord, clientId: number) => {
        const m = await mm.updateMedicine(med);

        // Rehydrate the global medicineList
        const ml = await mm.loadMedicineList(clientId);
        await setMedicineList(ml);

        // If the updated record is OTC we need to refresh the otcList as well.
        if (m.OTC) {
            // Rehydrate the global otcList
            const ol = await mm.loadOtcList();
            await setOtcList(ol);
        }
        return m;
    }

    /**
     * Return true if there are any drugLog records that have Out > 0
     */
    const hasCheckout = () => todayDrugLogList.some(r => r.Out && r.Out > 0);

    // We only display the log for drugs that were updated/created today.
    useEffect(() => {
        const logList = drugLogList.filter((dr) => {
            const updated = dr && dr.Updated;
            const active = medicineList.find(m => (m.Id === dr.MedicineId) && m.Active);
            return updated && active && isToday(updated);
        });
        setTodayDrugLogList(logList);
    }, [drugLogList, medicineList]);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage') {
        return null;
    }

    /**
     * Fires when the Edit button is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord | null) => {
        e.preventDefault();
        const medicineInfo = (medicine) ? {...medicine} : {
            ...newMedicineRecord,
            OTC: false,
            ResidentId: activeResident?.Id,
            FillDateDay: "",
            FillDateMonth: "",
            FillDateYear: ""
        };
        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
    }

    /**
     * Handle when user clicks on the + Log Drug from the Medicine Detail table
     * @param e {React.MouseEvent<HTMLElement>}
     * @param r {MedicineRecord}
     */
    const handleLogDrug = (e: React.MouseEvent<HTMLElement, MouseEvent>, r: MedicineRecord) => {
        e.preventDefault();

        // Search todayDrugLogList to see if a record already exists.
        const drugLogRecords = todayDrugLogList.filter((dl) => {
            return dl.MedicineId === r.Id;
        });

        // Set drugLog to either the existing drugLogRecord or create a new one to be inserted.
        const drugLog = drugLogRecords.length > 0 ? drugLogRecords[0] : {...newDrugLogRecord};

        // If new ResidentId will be 0, so we need to set fields up correctly for the insert.
        if (drugLog.ResidentId === 0) {
            drugLog.ResidentId = r.ResidentId as number;
            drugLog.MedicineId = r.Id as number;
        }

        setShowCheckoutModal(drugLog);
    }

    /**
     * Convenience function to get drug name
     * @param {number} medicineId
     * @return {string | undefined}
     */
    const drugName = (medicineId: number): string | undefined => {
        return getDrugName(medicineId, medicineList.concat(otcList));
    }

    const rowHeight = todayDrugLogList && todayDrugLogList.length > 0 ? '475px' : '';
    const rowOverflow = rowHeight.length > 0 ? 'scroll' : undefined;

    return (
        <Form className={TabContent}>
                <Row>
                    <TooltipButton
                        tooltip="Manually Add New Medicine"
                        size="sm"
                        variant="info"
                        onClick={(e: React.MouseEvent<HTMLElement>) => onEdit(e, null)}
                    >
                        + Medicine
                    </TooltipButton>

                    <Button
                        className="ml-3"
                        size="sm"
                        variant="info"
                        disabled={!hasCheckout()}
                        onClick={() => {
                            setActiveTabKey('medicine-checkout')
                        }}
                    >
                        Print Medicine Checkout
                    </Button>
                </Row>

                <Row style={{height: rowHeight, overflowY: rowOverflow}} className="mt-2">
                    <Table
                        striped
                        bordered
                        hover
                        size="sm"
                    >
                        <thead>
                        <tr>
                            <th></th>
                            {/* Edit */}
                            <th></th>
                            {/* Checkout */}
                            <th>
                                Drug
                            </th>
                            <th>
                                Strength
                            </th>
                            <th>
                                Directions
                            </th>
                            <th>
                                Notes
                            </th>
                            <th>
                                Barcode
                            </th>
                            <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                                Deactivate
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {medicineList.map((drug: MedicineRecord) =>
                            <MedicineDetail
                                drug={drug}
                                key={'med-' + drug.Id}
                                onDelete={(medicineRecord) => {
                                    const med = {...medicineRecord};
                                    med.Active = false;
                                    saveMedicine(med, activeResident?.Id as number)
                                    .then(m => {
                                        if (!m.Active) {
                                            mm.loadDrugLog(activeResident?.Id as number)
                                            .then(dl => setDrugLogList(dl))
                                        }
                                    })
                                }}
                                onEdit={onEdit}
                                onLogDrug={(e, r) => handleLogDrug(e, r)}
                            />
                        )}
                        </tbody>
                    </Table>
                </Row>

                {todayDrugLogList && todayDrugLogList.length > 0 &&
                <Row className="mt-2">
                    <DrugLogGrid
                        style={{height: "180px", overflowY: "scroll"}}
                        onEdit={(r) => {
                            if (r) {
                                setShowCheckoutModal(r);
                            }
                        }}
                        onDelete={r => setShowDrugLogDeleteConfirm(r)}
                        medicineList={medicineList.concat(otcList).filter(m => m.Active)}
                        includeCheckout={true}
                        drugLog={todayDrugLogList}
                        columns={['Drug', 'Created', 'Updated', 'Notes', 'Out', 'In']}
                    />
                </Row>
                }

            {showMedicineEdit && medicineInfo &&
            /* MedicineEdit Modal */
            <MedicineEdit
                show={showMedicineEdit}
                onClose={(r) => {
                    setShowMedicineEdit(false);
                    if (r && activeResident?.Id) {
                        saveMedicine(r, activeResident?.Id) // Toast?
                    }
                }}
                drugInfo={medicineInfo}
            />
            }

            {showCheckoutModal && activeResident?.Id &&
                <DrugLogEdit
                    drugName={drugName(showCheckoutModal.MedicineId) || "[unknown]"}
                    drugLogInfo={showCheckoutModal}
                    onClose={(dl) => {
                        setShowCheckoutModal(null);
                        if (dl) {
                            saveDrugLog(dl, activeResident.Id as number) // TOAST?
                        }
                    }}
                    onHide={() => setShowCheckoutModal(null)}
                    show={true}
                />
            }

            {showDrugLogDeleteConfirm &&
                <ConfirmDialogModal
                    centered
                    show={true}
                    title={<h3>Delete Drug Log Entry</h3>}
                    body={
                        <Alert variant="danger">
                            {"Delete " + drugName(showDrugLogDeleteConfirm?.MedicineId as number) + " from the drug log?"}
                        </Alert>
                    }
                    yesButton={
                        <Button
                            variant="danger"
                            onClick={(e) => {
                                e.preventDefault();
                                mm.deleteDrugLog(showDrugLogDeleteConfirm?.Id as number)
                                .then(ok => {
                                    if (ok) {
                                        mm.loadDrugLog(activeResident?.Id as number)
                                            .then(drugs => setDrugLogList(drugs));
                                    } else {
                                        setErrorDetails('DrugLog delete failed for Id: ' + showDrugLogDeleteConfirm.Id);
                                    }
                                })
                                setShowDrugLogDeleteConfirm(null);
                            }}
                        >
                            Delete
                        </Button>
                    }
                    noButton={
                        <Button
                            variant="secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowDrugLogDeleteConfirm(null);
                            }}
                        >
                            Cancel
                        </Button>
                    }
                />
            }

            {showDeleteMedicine && medicineInfo &&
                <ConfirmDialogModal
                    centered
                    size="lg"
                    show={true}
                    title={
                        <Alert
                            variant="warning"
                        >
                            <span><b>WARNING</b>: Deactivate Medication <b>{medicineInfo.Drug}</b></span>
                        </Alert>
                    }
                    body={
                        <Alert
                            variant="warning"
                        >
                            <p>
                                {/* tslint:disable-next-line:max-line-length */}
                                Deactivating <b>{medicineInfo?.Drug}</b> will no longer display drug log history for this drug
                            </p>
                        </Alert>
                    }
                    yesButton={
                        <Button
                            variant="warning"
                            onClick={(e) => {
                                e.preventDefault();
                                const m = {...medicineInfo};
                                m.Active = false;
                                saveMedicine(m, activeResident?.Id as number)
                                    .then(() => mm.loadDrugLog(activeResident?.Id as number));
                                setShowDeleteMedicine(false);
                            }}
                        >
                            {"Deactivate " + medicineInfo?.Drug}
                        </Button>
                    }
                    noButton={
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowDeleteMedicine(false);
                            }}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                    }
                />
            }
        </Form>
    );
}

export default ManageDrugPage;
