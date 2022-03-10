/* eslint-disable unicorn/consistent-function-scoping */
import TooltipContainer from 'components/Pages/Containters/TooltipContainer';
import ManageDrugGrid from 'components/Pages/Grids/ManageDrugGrid';
import CheckoutListGroup from 'components/Pages/ListGroups/CheckoutListGroup';
import CheckoutAllModal from 'components/Pages/Modals/CheckoutAllModal';
import DeleteMedicineModal from 'components/Pages/Modals/DeleteMedicineModal';
import {RX_TAB_KEY} from 'components/Pages/RxPage';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedicineManager} from 'managers/MedicineManager';
import {IMedicineProvider} from 'providers/MedicineProvider';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {
    ClientRecord,
    DrugLogRecord,
    MedicineRecord,
    newDrugLogRecord,
    newMedicineRecord,
    PillboxItemRecord
} from 'types/RecordTypes';
import {clientFullName, getCheckoutList, getDrugName} from 'utility/common';
import TabContent from 'styles/common.css';
import DrugLogEdit from 'components/Pages/Modals/DrugLogEdit';
import MedicineEdit from 'components/Pages/Modals/MedicineEdit';

interface IProps {
    rxTabKey: string;
    mm: IMedicineManager;
    medicineProvider: IMedicineProvider;
}

/**
 * ManageRx - UI for Displaying, editing and adding Medicine
 * @param {IProps} props The props for this component
 */
const ManageRx = (props: IProps): JSX.Element | null => {
    const [, setPillboxItemList] = useState<PillboxItemRecord[]>([]);
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    const [clientInfo, setClientInfo] = useState<ClientRecord | null>(null);
    const [drugLogList, setDrugLogList] = useState<DrugLogRecord[]>([]);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useState<MedicineRecord[]>([]);
    const [showCheckoutAlert, setShowCheckoutAlert] = useState(false);
    const [showCheckoutAllMeds, setShowCheckoutAllMeds] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | null>(null);
    const [showCheckoutPrint, setShowCheckoutPrint] = useState(false);
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(0);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [toast, setToast] = useState<DrugLogRecord[] | null>(null);
    const mm = props.mm;
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

    useEffect(() => {
        setShowCheckoutAlert(checkoutList.length > 0);
    }, [checkoutList]);

    // No need to render if there's not an activeClient or if the activeTabKey isn't 'manage'
    if (!activeClient || !clientInfo) return null;

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord[]} drugLogs Array of drugLog records to insert or update
     * @param {number} clientId The PK of the Resident table
     */
    const saveDrugLog = async (drugLogs: DrugLogRecord[], clientId: number): Promise<DrugLogRecord[]> => {
        const drugsLogged = [] as DrugLogRecord[];
        for (const d of drugLogs) {
            /**
             * Insert or Update the drugLog record
             * @param {DrugLogRecord} d The drugLog record to insert or update
             */
            const save = async (d: DrugLogRecord) => {
                return await mm.updateDrugLog(d);
            };
            drugsLogged.push(await save(d));
        }
        await setActiveClient({...activeClient, drugLogList: await mm.loadDrugLog(clientId, 5)});
        return drugsLogged;
    };

    /**
     * Checks out all medicine and brings up the checkout print dialog
     */
    const logAllDrugsCheckedOut = () => {
        const clientId = clientInfo.Id as number;
        const toastQ = [] as DrugLogRecord[];
        for (const m of medicineList) {
            if (m.Active) {
                const drugLog = {...newDrugLogRecord};
                drugLog.Out = 1;
                drugLog.Notes = '** ALL **';
                drugLog.MedicineId = m.Id as number;
                drugLog.ResidentId = clientId;
                toastQ.push(drugLog);
            }
        }

        if (toastQ.length > 0) {
            saveDrugLog(toastQ, clientId)
                .then((t) => setToast(t))
                .then(() => setShowCheckoutPrint(true));
        }
    };

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
     * Handle when user clicks on the + Log Drug from the Medicine Detail table
     * @param {MedicineRecord} r Medicine record object
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
    };

    /**
     * Convenience function to get drug name
     * @param {number} medicineId The PK of the Medicine table
     * @returns {string | undefined} The drug name if found, otherwise undefined
     */
    const drugName = (medicineId: number): string | undefined => {
        return getDrugName(medicineId, medicineList);
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
                    <Button disabled={showCheckoutPrint} size="sm" variant="info" onClick={() => onEdit(null)}>
                        + Medicine
                    </Button>
                </TooltipContainer>

                <Button
                    className="ml-3"
                    disabled={checkoutList.length === 0 || showCheckoutPrint}
                    onClick={() => setShowCheckoutPrint(true)}
                    size="sm"
                    variant="info"
                >
                    Print Medicine Checkout{' '}
                    {checkoutList.length > 0 && <Badge variant="secondary">{checkoutList.length}</Badge>}
                </Button>

                <TooltipContainer
                    delay={{show: 120, hide: 200}}
                    placement="right"
                    show={
                        checkoutList.length > 0 &&
                        !showCheckoutAllMeds &&
                        !showCheckoutPrint &&
                        !showMedicineEdit &&
                        rxTabKey === RX_TAB_KEY.Manage
                    }
                    tooltip={'At least one drug is already checked out'}
                >
                    <Button
                        className="ml-3"
                        size="sm"
                        variant="outline-secondary"
                        disabled={showCheckoutPrint || medicineList.length === 0}
                        onClick={() => setShowCheckoutAllMeds(true)}
                    >
                        Checkout All {checkoutList.length > 0 && <Badge variant="danger">{checkoutList.length}</Badge>}
                    </Button>
                </TooltipContainer>
            </ButtonGroup>
            {showCheckoutPrint && activeClient && (
                <Row className="mt-2">
                    <CheckoutListGroup
                        clientRecord={clientInfo}
                        checkoutList={checkoutList}
                        medicineList={medicineList}
                        onClose={() => setShowCheckoutPrint(false)}
                    />
                </Row>
            )}

            {!showCheckoutPrint && (
                <Row className="mt-2 d-print-none">
                    <ManageDrugGrid
                        checkoutList={medicineWithCheckout}
                        medicineList={medicineList}
                        onEdit={(m) => onEdit(m)}
                        onLogDrug={(d) => handleLogDrug(d)}
                        onToggleActive={(mr) => saveMedicine({...mr, Active: !mr.Active}, clientInfo.Id as number)}
                    />
                </Row>
            )}

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

            <DrugLogEdit
                drugLogInfo={showCheckoutModal as DrugLogRecord}
                drugName={drugName(showCheckoutModal?.MedicineId as number) || '[unknown]'}
                onClose={(dl) => {
                    setShowCheckoutModal(null);
                    if (dl) saveDrugLog([dl], clientInfo.Id as number).then((t) => setToast(t));
                }}
                onHide={() => setShowCheckoutModal(null)}
                show={clientInfo.Id !== null && showCheckoutModal !== null}
            />

            <DrugLogToast
                medicineList={medicineList}
                onClose={() => setToast(null)}
                show={toast !== null}
                toast={toast as DrugLogRecord[]}
            />

            <CheckoutAllModal
                checkoutList={checkoutList}
                medicineList={medicineList}
                onSelect={(a) => {
                    setShowCheckoutAllMeds(false);
                    if (a) logAllDrugsCheckedOut();
                }}
                onCloseCheckoutAlert={() => setShowCheckoutAlert(false)}
                show={showCheckoutAllMeds}
                showCheckoutAlert={showCheckoutAlert}
            />

            <DeleteMedicineModal
                medicineRecord={medicineInfo as MedicineRecord}
                onSelect={(n) => {
                    setShowDeleteMedicine(0);
                    if (n > 0) deleteMedicine(n);
                }}
                show={showDeleteMedicine !== 0}
            />
        </Form>
    );
};

export default ManageRx;
