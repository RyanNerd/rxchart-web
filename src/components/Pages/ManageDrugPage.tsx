import TooltipContainer from 'components/Pages/Buttons/Containters/TooltipContainer';
import ManageDrugGrid from 'components/Pages/Grids/ManageDrugGrid';
import CheckoutListGroup from 'components/Pages/ListGroups/CheckoutListGroup';
import ConfirmDialogModal from 'components/Pages/Modals/ConfirmDialogModal';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, newMedicineRecord, PillboxItemRecord} from 'types/RecordTypes';
import {clientFullName, getCheckoutList, getDrugName} from 'utility/common';
import TabContent from '../../styles/common.css';
import DrugLogEdit from './Modals/DrugLogEdit';
import MedicineEdit from './Modals/MedicineEdit';

interface IProps {
    activeTabKey: string;
}

/**
 * ManageDrugPage - UI for Displaying, editing and adding Medicine
 * @param {IProps} props The props for the component
 * @returns {JSX.Element | null}
 */
const ManageDrugPage = (props: IProps): JSX.Element | null => {
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | null>(null);
    const [showCheckoutPrint, setShowCheckoutPrint] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [toast, setToast] = useState<DrugLogRecord[] | null>(null);
    const [showCheckoutAllMeds, setShowCheckoutAllMeds] = useState(false);

    const activeTabKey = props.activeTabKey;

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage') return null;
    if (!activeClient) return null;

    const {clientInfo, medicineList, drugLogList, pillboxItemList} = activeClient;

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
        medicineList.forEach((m) => {
            if (m.Active) {
                const drugLog = {...newDrugLogRecord};
                drugLog.Out = 1;
                drugLog.Notes = '** ALL **';
                drugLog.MedicineId = m.Id as number;
                drugLog.ResidentId = clientId;
                toastQ.push(drugLog);
            }
        });

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
        /**
         * Remove all the PillboxItems when a medicine is marked as inactive
         * @param {number} medicineId The PK of the Medicine table
         */
        const removeInactivePillboxItems = async (medicineId: number) => {
            let delCount = 0;
            pillboxItemList.forEach((pbi) => {
                const removePillboxItems = async () => {
                    if (pbi.MedicineId === medicineId) {
                        await mm.deletePillboxItem(pbi.Id as number);
                        delCount++;
                    }
                };
                removePillboxItems();
            });
            return delCount;
        };

        const m = await mm.updateMedicine(med);
        const ml = await mm.loadMedicineList(clientId);
        let dl = null as null | DrugLogRecord[];
        let pbil = null as null | PillboxItemRecord[];

        // If the medicine has been set to inactive then refresh the drug log and remove from any pillboxItems
        if (!m.Active) {
            dl = await mm.loadDrugLog(clientInfo.Id as number, 5);
            await setActiveClient({...activeClient, drugLogList: dl});

            if (!m.Active) {
                const count = await removeInactivePillboxItems(m.Id as number);
                if (count > 0) {
                    pbil = await mm.loadPillboxItemList(clientInfo.Id as number);
                }
            }
        }

        await setActiveClient({
            ...activeClient,
            medicineList: ml,
            drugLogList: dl ? dl : activeClient.drugLogList,
            pillboxItemList: pbil ? pbil : activeClient.pillboxItemList
        });
        return m;
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
     * @returns {string | undefined}
     */
    const drugName = (medicineId: number): string | undefined => {
        return getDrugName(medicineId, medicineList);
    };

    const checkoutList = getCheckoutList(drugLogList);

    /**
     * Return a MedicineRecord[] array of all medicines that have Out populated and was logged today
     */
    const medicineWithCheckout = medicineList.filter((m) => {
        return checkoutList.find((c) => c.MedicineId === m.Id);
    });

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
                    size="sm"
                    variant="info"
                    disabled={checkoutList.length === 0 || showCheckoutPrint}
                    onClick={() => setShowCheckoutPrint(true)}
                >
                    Print Medicine Checkout{' '}
                    {checkoutList.length > 0 && <Badge variant="secondary">{checkoutList.length}</Badge>}
                </Button>

                <TooltipContainer
                    tooltip={'At least one drug is already checked out'}
                    placement="right"
                    show={checkoutList.length > 0 && !showCheckoutAllMeds && !showCheckoutPrint}
                    delay={{show: 120, hide: 200}}
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
                        onClose={() => setShowCheckoutPrint(false)}
                        checkoutList={checkoutList}
                        medicineList={medicineList}
                        activeClient={clientInfo}
                    />
                </Row>
            )}
            {!showCheckoutPrint && (
                <Row className="mt-2 d-print-none">
                    <ManageDrugGrid
                        checkoutList={medicineWithCheckout}
                        onDelete={(mr) => {
                            const med = {...mr};
                            med.Active = false;
                            saveMedicine(med, clientInfo.Id as number);
                        }}
                        onEdit={(m) => onEdit(m)}
                        onLogDrug={(d) => handleLogDrug(d)}
                        medicineList={medicineList}
                    />
                </Row>
            )}
            {showMedicineEdit && medicineInfo && (
                <MedicineEdit
                    fullName={clientFullName(clientInfo)}
                    show={showMedicineEdit}
                    onClose={(m) => {
                        setShowMedicineEdit(false);
                        if (m) saveMedicine(m, clientInfo.Id as number);
                    }}
                    drugInfo={medicineInfo}
                />
            )}
            {showCheckoutModal && clientInfo.Id && (
                <DrugLogEdit
                    drugName={drugName(showCheckoutModal.MedicineId) || '[unknown]'}
                    drugLogInfo={showCheckoutModal}
                    onClose={(dl) => {
                        setShowCheckoutModal(null);
                        if (dl) saveDrugLog([dl], clientInfo.Id as number).then((t) => setToast(t));
                    }}
                    onHide={() => setShowCheckoutModal(null)}
                    show={true}
                />
            )}
            <DrugLogToast
                toast={toast as DrugLogRecord[]}
                medicineList={medicineList}
                show={toast !== null}
                onClose={() => setToast(null)}
            />
            <ConfirmDialogModal
                centered
                size="lg"
                show={showCheckoutAllMeds}
                title={
                    <h3>
                        Checkout <b>ALL</b> Medications
                    </h3>
                }
                body={
                    <>
                        <Alert variant="warning">
                            Answering Yes will mark <b>all</b> medicines as checked out and bring up the print dialog
                        </Alert>
                        <ul
                            style={{
                                listStyleType: 'square'
                            }}
                        >
                            {medicineList.map((m) => (
                                <li key={`$m.Id`}>
                                    {checkoutList.find((d) => m.Id === d.MedicineId) && <Badge>❎</Badge>}{' '}
                                    <span style={{textDecoration: m.Active ? undefined : 'line-through'}}>
                                        {m.Drug}
                                    </span>{' '}
                                    {!m.Active && <span>(Inactive medication will not appear in checkout)</span>}
                                </li>
                            ))}
                        </ul>
                        {medicineList.some((m) => checkoutList.find((c) => m.Id === c.MedicineId)) && (
                            <Alert variant="warning">
                                At least one drug is already checked out<Badge>❎</Badge>. You must remove checked out
                                drugs from the drug log history before you can <b>checkout all drugs.</b>
                            </Alert>
                        )}
                    </>
                }
                yesButton={
                    <Button
                        disabled={medicineList.some((m) => checkoutList.find((c) => m.Id === c.MedicineId))}
                        variant="danger"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowCheckoutAllMeds(false);
                            logAllDrugsCheckedOut();
                        }}
                    >
                        Yes{' '}
                        {medicineList.some((m) => checkoutList.find((c) => m.Id === c.MedicineId)) && (
                            <span style={{fontSize: '12px'}}>(At least one drug is already checked out)</span>
                        )}
                    </Button>
                }
                noButton={
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowCheckoutAllMeds(false);
                        }}
                    >
                        No
                    </Button>
                }
            />
        </Form>
    );
};

export default ManageDrugPage;
