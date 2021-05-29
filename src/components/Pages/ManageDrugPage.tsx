import React, {useEffect, useGlobal, useState} from 'reactn';

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {Alert, Form, Row} from "react-bootstrap";

import ConfirmDialogModal from "./Modals/ConfirmDialogModal";
import DrugLogEdit from "./Modals/DrugLogEdit";
import DrugLogGrid from "./Grids/DrugLogGrid";
import MedicineDetail from "./Grids/MedicineDetail";
import MedicineEdit from "./Modals/MedicineEdit";
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, newMedicineRecord} from "../../types/RecordTypes";
import {getDrugName, isToday} from "../../utility/common";

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 * @returns {JSX.Element}
 */
const ManageDrugPage = (): JSX.Element | null => {
    const [, setMedicine] = useGlobal('__medicine');
    const [, setDrugLog] = useGlobal('__drugLog');
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList] = useGlobal('medicineList');
    const [otcList] = useGlobal('otcList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [showDrugLogDeleteConfirm, setShowDrugLogDeleteConfirm] = useState<DrugLogRecord | null>(null);
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | null>(null);
    const [todayDrugLogList, setTodayDrugLogList] = useState<DrugLogRecord[]>([]);

    /**
     * Return true if there are any drugLog records that have Out > 0
     */
    const hasCheckout = () => todayDrugLogList.some(r => r.Out && r.Out > 0);

    // We only display the log for drugs that were updated/created today.
    useEffect(() => {
        const logList = drugLogList.filter((dr) => {
            const updated = dr && dr.Updated;
            return updated && isToday(updated);
        });
        setTodayDrugLogList(logList);
    }, [drugLogList]);

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

        // If new ResidentId will be 0 so we need to set fields up correctly for the insert.
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

                <Row style={{height: "475px", overflowY: "scroll"}} className="mt-2">
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
                            <th></th>
                            {/* Delete */}
                        </tr>
                        </thead>
                        <tbody>
                        {medicineList.map((drug: MedicineRecord) =>
                            <MedicineDetail
                                drug={drug}
                                key={'med-' + drug.Id}
                                onDelete={(e, medicineRecord) => {
                                    e.preventDefault();
                                    setMedicineInfo({...medicineRecord});
                                    setShowDeleteMedicine(true);
                                }}
                                onEdit={onEdit}
                                onLogDrug={(e, r) => handleLogDrug(e, r)}
                            />
                        )}
                        </tbody>
                    </Table>
                </Row>

                {todayDrugLogList && todayDrugLogList.length > 0 &&
                <Row style={{height: "220px", overflowY: "scroll"}} className="mt-2">
                    <DrugLogGrid
                        onEdit={(e, r) => {
                            if (r) {
                                setShowCheckoutModal(r);
                            }
                        }}
                        onDelete={(e, r) => {
                            e.preventDefault();
                            setShowDrugLogDeleteConfirm(r);
                        }}
                        medicineList={medicineList.concat(otcList)}
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
                    setMedicine({action: 'update', payload: r});
                }}
                drugInfo={medicineInfo}
            />
            }

            <DrugLogEdit
                drugName={drugName(showCheckoutModal?.MedicineId as number) || "[unknown]"}
                drugLogInfo={showCheckoutModal as DrugLogRecord}
                onClose={(dl) => {
                    setShowCheckoutModal(null);
                    setDrugLog({action: "update", payload: dl});
                }}
                onHide={() => setShowCheckoutModal(null)}
                show={showCheckoutModal !== null}
            />

            <ConfirmDialogModal
                centered
                show={showDrugLogDeleteConfirm !== null}
                title={<h3>Delete Drug Log Entry</h3>}
                body={
                    <Alert variant="danger">
                        {"Delete " + drugName(showDrugLogDeleteConfirm?.MedicineId as number) + " from the drug log?"}
                    </Alert>
                }
                yesButton={
                    <Button
                        variant="danger"
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            const drugLogRecord = showDrugLogDeleteConfirm as DrugLogRecord;
                            const drugLogId = drugLogRecord.Id as number;
                            setDrugLog({action: "delete", payload: drugLogId});
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

            <ConfirmDialogModal
                centered
                size="lg"
                show={medicineInfo !== null && showDeleteMedicine}
                title={
                    <Alert
                        variant="danger"
                    >
                        <span><b>DANGER</b>: Delete Medication <b>{medicineInfo?.Drug}</b></span>
                    </Alert>
                }
                body={
                    <Alert
                        variant="danger"
                    >
                        <p>
                            Deleting <b>{medicineInfo?.Drug}</b> will destroy <b>ALL</b> drug log history for this drug!
                        </p>
                        <p>
                            <b>This can not be undone!</b>
                        </p>
                    </Alert>
                }
                yesButton={
                    <Button
                        variant="danger"
                        onClick={(e) => {
                            e.preventDefault();
                            setMedicine({action: "delete", payload: medicineInfo?.Id as number});
                            setShowDeleteMedicine(false);
                        }}
                    >
                        {"Delete " + medicineInfo?.Drug}
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
        </Form>
    );
}

export default ManageDrugPage;
