import ManageDrugGrid from "components/Pages/Grids/ManageDrugGrid";
import CheckoutListGroup from "components/Pages/ListGroups/CheckoutListGroup";
import DrugLogToast from "components/Pages/Toasts/DrugLogToast";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, {useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, newMedicineRecord} from "types/RecordTypes";
import {getDrugName, isToday} from "utility/common";
import TabContent from "../../styles/common.css";
import TooltipButton from "./Buttons/TooltipButton";
import DrugLogEdit from "./Modals/DrugLogEdit";
import MedicineEdit from "./Modals/MedicineEdit";

interface IProps {
    activeTabKey: string
}

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 * @returns {JSX.Element | null}
 */
const ManageDrugPage = (props: IProps): JSX.Element | null => {
    const [activeClient] = useGlobal('activeResident');
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useGlobal('medicineList');
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | null>(null);
    const [showCheckoutPrint, setShowCheckoutPrint] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [toast, setToast] = useState<DrugLogRecord[] | null>(null);

    const {
        activeTabKey
    } = props;

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage') return null;

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog
     * @param {number} clientId
     */
    const saveDrugLog = async (drugLog: DrugLogRecord, clientId: number): Promise<DrugLogRecord> => {
        const r = await mm.updateDrugLog(drugLog);
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
        const ml = await mm.loadMedicineList(clientId);
        await setMedicineList(ml);

        // If the updated record is OTC we need to refresh the otcList.
        if (m.OTC) {
            const ol = await mm.loadOtcList();
            await setOtcList(ol);
        }
        return m;
    }

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (medicine: MedicineRecord | null) => {
        const medicineInfo = (medicine) ? {...medicine} : {
            ...newMedicineRecord,
            OTC: false,
            ResidentId: activeClient?.Id,
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

    /**
     * Return a MedicineRecord[] array of all medicines that have Out populated and was logged today
     */
    const medicineWithCheckout = medicineList.filter(m => {
            return drugLogList.some(dl => {
            return dl.MedicineId === m.Id && dl?.Updated && dl.Out && isToday(dl.Updated);
        }) && m.Active
    })

    // True if there are any drugLog records that have Out > 0
    const hasCheckout = medicineWithCheckout.length > 0;

    return (
        <Form className={TabContent}>
            <Row className="d-print-none">
                <TooltipButton
                    disabled={showCheckoutPrint}
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
                    disabled={!hasCheckout || showCheckoutPrint}
                    onClick={() =>setShowCheckoutPrint(true)}

                >
                    Print Medicine Checkout {hasCheckout && <Badge>❎</Badge>}
                </Button>
            </Row>

            {showCheckoutPrint && activeClient &&
                <Row className="mt-2">
                <CheckoutListGroup
                    onClose={() => setShowCheckoutPrint(false)}
                    drugLogList={drugLogList}
                    medicineList={medicineList}
                    activeClient={activeClient}
                />
                </Row>
            }

            {!showCheckoutPrint &&
                <Row className="mt-2 d-print-none">
                    <ManageDrugGrid
                        checkoutMeds={medicineWithCheckout}
                        onDelete={(mr => {
                            const med = {...mr};
                            med.Active = false;
                            saveMedicine(med, activeClient?.Id as number)
                                .then(m => {
                                    if (!m.Active) {
                                        mm.loadDrugLog(activeClient?.Id as number, 5)
                                            .then(dl => setDrugLogList(dl))
                                    }
                                })
                        })}
                        onEdit={(m) => onEdit(m)}
                        onLogDrug={(d) => handleLogDrug(d)}
                        medicineList={medicineList}
                    />
                </Row>
            }

            {showMedicineEdit && medicineInfo &&
                <MedicineEdit
                    show={showMedicineEdit}
                    onClose={(m) => {
                        setShowMedicineEdit(false);
                        if (m) saveMedicine(m, activeClient?.Id as number);
                    }}
                    drugInfo={medicineInfo}
                />
            }

            {showCheckoutModal && activeClient?.Id &&
                <DrugLogEdit
                    drugName={drugName(showCheckoutModal.MedicineId) || "[unknown]"}
                    drugLogInfo={showCheckoutModal}
                    onClose={(dl) => {
                        setShowCheckoutModal(null);
                        if (dl) saveDrugLog(dl, activeClient.Id as number).then(r => setToast([r]));
                    }}
                    onHide={() => setShowCheckoutModal(null)}
                    show={true}
                />
            }

            <DrugLogToast
                toast={toast as DrugLogRecord[]}
                medicineList={medicineList.concat(otcList)}
                show={toast !== null}
                onClose={() => setToast(null)}
            />
        </Form>
    )
}

export default ManageDrugPage;
