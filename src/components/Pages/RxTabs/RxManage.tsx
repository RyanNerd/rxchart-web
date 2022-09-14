/* eslint-disable unicorn/consistent-function-scoping */
import TooltipContainer from 'components/Pages/Containters/TooltipContainer';
import ManageDrugGrid from 'components/Pages/Grids/ManageDrugGrid';
import DeleteMedicineModal from 'components/Pages/Modals/DeleteMedicineModal';
import MedicineEdit from 'components/Pages/Modals/MedicineEdit';
import PrintMedicationList from 'components/Pages/Modals/PrintMedicationList';
import {RX_TAB_KEY} from 'components/Pages/RxPage';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {IMedicineProvider} from 'providers/MedicineProvider';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useState} from 'reactn';
import TabContent from 'styles/common.css';
import {ClientRecord, DrugLogRecord, MedicineRecord, newMedicineRecord, PillboxItemRecord} from 'types/RecordTypes';
import {clientFullName, getCheckoutList} from 'utility/common';

interface IProps {
    rxTabKey: string;
    medicineProvider: IMedicineProvider;
    medHistoryProvider: IMedHistoryProvider;
}

/**
 * RxManage - UI for Displaying, editing and adding Medicine
 * @param {IProps} props The props for this component
 */
const RxManage = (props: IProps): JSX.Element | null => {
    const [, setPillboxItemList] = useState<PillboxItemRecord[]>([]);
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    const [clientInfo, setClientInfo] = useState<ClientRecord | null>(null);
    const [drugLogList, setDrugLogList] = useState<DrugLogRecord[]>([]);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useState<MedicineRecord[]>([]);
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(0);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [showPrintMedicationList, setShowPrintMedicationList] = useState(false);
    const [toast, setToast] = useState<DrugLogRecord[] | null>(null);
    const medicineProvider = props.medicineProvider;

    const [rxTabKey, setRxTabKey] = useState(props.rxTabKey);
    useEffect(() => {
        setRxTabKey(props.rxTabKey);
    }, [props.rxTabKey]);

    // When the activeClient is "active" then deconstruct the activeClient into the lists and clientInfo constants
    useEffect(() => {
        if (activeClient) {
            const {drugLogList, medicineList, pillboxItemList, clientInfo} = activeClient;
            const checkoutList = getCheckoutList(drugLogList);
            setDrugLogList(drugLogList);
            setMedicineList(medicineList);
            setPillboxItemList(pillboxItemList);
            setClientInfo(clientInfo);
            setCheckoutList(checkoutList);
        }
    }, [activeClient]);

    // No need to render if there's not an activeClient or if the activeTabKey isn't 'manage'
    if (!activeClient || !clientInfo) return null;

    /**
     * Given a MedicineRecord Update or Insert the record and rehydrate the globalMedicineList
     * @param {MedicineRecord} med The medicine record object
     * @param {number} clientId The PK of the Resident table
     */
    const saveMedicine = async (med: MedicineRecord, clientId: number) => {
        const m = await medicineProvider.update(med);
        await setActiveClient({
            ...activeClient,
            medicineList: await medicineProvider.loadList(clientId)
        });
        return m;
    };

    /**
     * Given a MedicineRecord PK delete the medicine
     * @param {number} id The PK of the Medicine record to delete
     */
    const deleteMedicine = async (id: number) => {
        if (activeClient && (await medicineProvider.delete(id))) {
            await setActiveClient({
                ...activeClient,
                medicineList: await medicineProvider.loadList(clientInfo.Id as number)
            });
        }
    };

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine The medicine record object, or null for a new record
     */
    const onEdit = (medicine: MedicineRecord | null) => {
        const medicineInfo = medicine
            ? {...medicine}
            : {
                  ...newMedicineRecord,
                  OTC: false,
                  ResidentId: clientInfo.Id,
                  FillDateDay: '',
                  FillDateMonth: '',
                  FillDateYear: ''
              };
        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
    };

    /**
     * Return a MedicineRecord[] array of all medicines that have Out populated and was logged today
     */
    const medicineWithCheckout = medicineList.filter((m) => {
        return checkoutList.find((c) => c.MedicineId === m.Id);
    });

    if (rxTabKey !== RX_TAB_KEY.Manage) return null;

    return (
        <Form className={TabContent}>
            <ButtonGroup as={Row} className="d-print-none">
                <TooltipContainer tooltip={'Manually Add New Medicine'}>
                    <Button size="sm" variant="info" onClick={() => onEdit(null)}>
                        + Medicine
                    </Button>
                </TooltipContainer>

                <Button
                    className="ml-3"
                    size="sm"
                    variant="outline-primary"
                    onClick={() => setShowPrintMedicationList(true)}
                >
                    Print Medication List
                </Button>
            </ButtonGroup>

            <Row className="mt-2 d-print-none">
                <ManageDrugGrid
                    checkoutList={medicineWithCheckout}
                    medicineList={medicineList}
                    onEdit={(m) => onEdit(m)}
                    onToggleActive={(mr) => saveMedicine({...mr, Active: !mr.Active}, clientInfo.Id as number)}
                />
            </Row>

            <MedicineEdit
                allowDelete={!drugLogList.some((d) => d.MedicineId === medicineInfo?.Id)}
                drugInfo={medicineInfo as MedicineRecord}
                existingDrugs={medicineInfo?.Id === null ? medicineList.map((m) => m.Drug) : []}
                fullName={clientFullName(clientInfo)}
                onClose={(m) => {
                    setShowMedicineEdit(false);
                    if (m) {
                        if (m.Id && m.Id < 0) {
                            setShowDeleteMedicine(Math.abs(m.Id)); // Negative Id indicates a delete operation
                        } else {
                            saveMedicine(m, clientInfo.Id as number);
                        }
                    }
                }}
                show={showMedicineEdit}
            />

            <DrugLogToast
                medicineList={medicineList}
                onClose={() => setToast(null)}
                show={toast !== null}
                toast={toast as DrugLogRecord[]}
            />

            <DeleteMedicineModal
                medicineRecord={medicineInfo as MedicineRecord}
                onSelect={(n) => {
                    setShowDeleteMedicine(0);
                    if (n > 0) deleteMedicine(n);
                }}
                show={showDeleteMedicine !== 0}
            />

            {showPrintMedicationList && (
                <PrintMedicationList onUnload={() => setShowPrintMedicationList(false)} medList={medicineList} />
            )}
        </Form>
    );
};

export default RxManage;
