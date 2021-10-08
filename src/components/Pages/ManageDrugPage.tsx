import ManageDrugGrid from "components/Pages/Grids/ManageDrugGrid";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, {useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, newMedicineRecord} from "types/RecordTypes";
import {getDrugName, isToday} from "utility/common";
import TabContent from "../../styles/common.css";
import TooltipButton from "../Buttons/TooltipButton";
import DrugLogEdit from "./Modals/DrugLogEdit";
import MedicineEdit from "./Modals/MedicineEdit";

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 * @returns {JSX.Element}
 */
const ManageDrugPage = (): JSX.Element | null => {
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey, setActiveTabKey] = useGlobal('activeTabKey');
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useGlobal('medicineList');
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog
     * @param clientId
     */
    const saveDrugLog = async (drugLog: DrugLogRecord, clientId: number): Promise<DrugLogRecord> => {
        const r = await mm.updateDrugLog(drugLog);
        // Rehydrate the drugLogList
        const drugs = await mm.loadDrugLog(clientId, 5);
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

    const getMedicineWithCheckout = () => {
        return medicineList.filter(m => {
                return drugLogList.some(dl => {
                    const updated = dl?.Updated;
                    return dl.MedicineId === m.Id &&
                        dl.Out &&
                        updated && isToday(updated)
                }) && m.Active
            }
        )
    }

    /**
     * Return true if there are any drugLog records that have Out > 0
     */
    const hasCheckout = getMedicineWithCheckout().length > 0;

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage') {
        return null;
    }

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (medicine: MedicineRecord | null) => {
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
     * @param r {MedicineRecord}
     */
    const handleLogDrug = (r: MedicineRecord) => {
        // Set drugLog to either the existing drugLogRecord or create a new one to be inserted.
        const drugLog = {...newDrugLogRecord};

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

    return (
        <Form className={TabContent}>
            <Row>
                <TooltipButton
                    tooltip="Manually Add New Medicine"
                    size="sm"
                    variant="info"
                    onClick={() => onEdit(null)}
                >
                    + Medicine
                </TooltipButton>

                <Button
                    className="ml-3"
                    size="sm"
                    variant="info"
                    disabled={!hasCheckout}
                    onClick={() => {
                        setActiveTabKey('medicine-checkout')
                    }}
                >
                    Print Medicine Checkout {hasCheckout && <Badge>❎</Badge>}
                </Button>
            </Row>

            <Row className="mt-2">
                <ManageDrugGrid
                    checkoutMeds={getMedicineWithCheckout()}
                    onDelete={(mr => {
                        const med = {...mr};
                        med.Active = false;
                        saveMedicine(med, activeResident?.Id as number)
                        .then(m => {
                            if (!m.Active) {
                                mm.loadDrugLog(activeResident?.Id as number, 5)
                                .then(dl => setDrugLogList(dl))
                            }
                        })
                    })}
                    onEdit={(m) => onEdit(m)}
                    onLogDrug={(d) => handleLogDrug(d)}
                    medicineList={medicineList}
                />
            </Row>

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
        </Form>
    )
}

export default ManageDrugPage;
