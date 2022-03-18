import LastTakenButton from 'components/Pages/Buttons/LastTakenButton';
import DrugLogGrid from 'components/Pages/Grids/DrugLogGrid';
import {IDropdownItem} from 'components/Pages/ListGroups/MedDropdown';
import MedListGroup from 'components/Pages/ListGroups/MedListGroup';
import DeleteDrugLogModal from 'components/Pages/Modals/DeleteDrugLogModal';
import DrugLogEdit from 'components/Pages/Modals/DrugLogEdit';
import MedicineEdit from 'components/Pages/Modals/MedicineEdit';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {IMedicineProvider} from 'providers/MedicineProvider';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord} from 'types/RecordTypes';
import {asyncWrapper, calculateLastTaken, clientFullName, getCheckoutList, getDrugName, isToday} from 'utility/common';

interface IProps {
    medHistoryProvider: IMedHistoryProvider;
    medicineProvider: IMedicineProvider;
    onPrintCheckout: () => void;
    pillboxSelected: (id: number) => void;
    printCheckout: number;
}

/**
 * The RxMedicine tab - Displays the drug dropdown and drug log grid
 * @param {IProps} props The props for this component
 */
const RxMedicine = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [activeMed, setActiveMed] = useState<MedicineRecord | null>(null);
    const [isBusy, setIsBusy] = useState(false);
    const [medItemList, setMedItemList] = useState<IDropdownItem[]>([]);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);
    const clientId = activeClient?.clientInfo.Id;
    const {drugLogList, pillboxList, pillboxItemList, medicineList} = activeClient as TClient;
    const {medicineProvider, medHistoryProvider, pillboxSelected, onPrintCheckout, printCheckout} = props;

    // Build the dropdown items for the Medicine dropdown
    useEffect(() => {
        const itemList = [] as IDropdownItem[];
        if (activeClient) {
            const {drugLogList, pillboxList, pillboxItemList, medicineList} = activeClient;
            const checkoutList = getCheckoutList(drugLogList);

            // Build the itemList with any pillboxes and meds from medicineList
            let pbCnt = 0;
            for (const p of pillboxList) {
                const pbItems = pillboxItemList.filter((pbi) => pbi.PillboxId === p.Id);
                const loggedPillboxItems = drugLogList.filter(
                    (d) => d.Updated && isToday(d.Updated) && pbItems.find((pbi) => pbi.Id === d.PillboxItemId)
                );
                if (loggedPillboxItems.length === 0) {
                    itemList.push({
                        id: -(p.Id as number),
                        description: p.Name.toUpperCase(),
                        subtext: null
                    }); // Pillbox have negative id
                    pbCnt++;
                }
            }
            if (pbCnt > 0) itemList.push({id: 0, description: 'divider', subtext: null});

            for (const m of medicineList) {
                if (m.Active) {
                    const strength = m.Strength || '';
                    const other = m.OtherNames?.length > 0 ? `(${m.OtherNames})` : null;
                    const checkoutMed = checkoutList.find((c) => c.MedicineId === m.Id);
                    const description = (checkoutMed ? '❎ ' : '') + m.Drug + ' ' + strength;
                    itemList.push({
                        id: m.Id as number,
                        description,
                        subtext: other
                    });
                }
            }

            // If activeMed is null, and we have med items in the list then set the initial activeMed to the first item
            if (activeMed === null && itemList.length > 0) {
                const medsOnly = itemList.filter((dropdownItem) => dropdownItem.id > 0);
                setActiveMed(medsOnly.length === 0 ? null : medicineList.find((m) => m.Id === medsOnly[0].id) || null);
            }
        } else {
            setActiveMed(null);
        }
        setMedItemList(itemList);
    }, [activeClient, activeMed]);

    /**
     * Given a MedicineRecord object Update/Insert the record and rehydrate the global otcList / medicineList
     * Set the activeOtc or the activeMed with the updated medicine (if Active)
     * @param {MedicineRecord} med Medicine record object
     */
    const saveMedicine = async (med: MedicineRecord) => {
        await setIsBusy(true);
        const [errorUpdateMedicine, m] = (await asyncWrapper(medicineProvider.update(med))) as [
            unknown,
            Promise<MedicineRecord>
        ];
        if (errorUpdateMedicine) await setErrorDetails(errorUpdateMedicine);
        const updatedMedicineRecord = await m;

        const [errorLoadMedicineList, meds] = (await asyncWrapper(medicineProvider.loadList(clientId as number))) as [
            unknown,
            Promise<MedicineRecord[]>
        ];
        await (errorLoadMedicineList
            ? setErrorDetails(errorLoadMedicineList)
            : setActiveClient({...(activeClient as TClient), medicineList: await meds}));
        const activeMeds = (await meds).filter((m) => m.Active);
        // prettier-ignore
        setActiveMed(
            updatedMedicineRecord.Active ? updatedMedicineRecord : (activeMeds.length === 0 ? null : activeMeds[0])
        );
        await setIsBusy(false);
    };

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog DrugLog record object
     */
    const saveDrugLog = async (drugLog: DrugLogRecord): Promise<DrugLogRecord> => {
        await setIsBusy(true);
        const [errorUpdateDrugLog, updatedDrugLog] = (await asyncWrapper(medHistoryProvider.update(drugLog))) as [
            unknown,
            Promise<DrugLogRecord>
        ];
        if (errorUpdateDrugLog) await setErrorDetails(errorUpdateDrugLog);
        else {
            const [errorLoadDrugLog, drugLogs] = (await asyncWrapper(
                medHistoryProvider.load(clientId as number, 5)
            )) as [unknown, Promise<DrugLogRecord[]>];
            await (errorLoadDrugLog
                ? setErrorDetails(errorLoadDrugLog)
                : setActiveClient({...(activeClient as TClient), drugLogList: await drugLogs}));
        }
        await setIsBusy(false);
        return await updatedDrugLog;
    };

    /**
     * Fires when the Log 1...4 buttons are clicked.
     * @param {number} amount The number of pills (medication) taken
     */
    const handleLogDrugAmount = (amount: number) => {
        setIsBusy(true);
        const medicineId = activeMed?.Id;
        const drugLogInfo = {...newDrugLogRecord};
        drugLogInfo.MedicineId = medicineId as number;
        drugLogInfo.Notes = amount.toString();
        drugLogInfo.ResidentId = clientId as number;
        saveDrugLog(drugLogInfo).then((d) => setToast([d]));
        setIsBusy(false);
    };

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {DrugLogRecord} drugLogInfo The drugLog record object
     */
    const handleAddEditDrugLog = (drugLogInfo?: DrugLogRecord) => {
        const drugLogRecord = drugLogInfo
            ? {...drugLogInfo}
            : ({
                  Id: null,
                  ResidentId: clientId,
                  MedicineId: activeMed?.Id,
                  Notes: ''
              } as DrugLogRecord);
        setShowDrugLog(drugLogRecord);
    };

    if (activeClient === null) return null;
    return (
        <>
            <Row>
                <Col className="col-5">
                    <MedListGroup
                        activeMed={activeMed}
                        addDrugLog={() => handleAddEditDrugLog()}
                        canvasId="med-barcode"
                        clientId={clientId as number}
                        disabled={isBusy}
                        editMedicine={(medicineRecord) => setShowMedicineEdit(medicineRecord)}
                        itemChanged={(id) => {
                            if (id < 0) {
                                pillboxSelected(Math.abs(id));
                            } else {
                                setActiveMed(medicineList.find((m) => m.Id === id) || null);
                            }
                        }}
                        itemList={medItemList}
                        lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                        logDrug={(n) => handleLogDrugAmount(n)}
                        printCheckout={printCheckout}
                        onPrintCheckout={() => onPrintCheckout()}
                    />
                </Col>

                <ListGroup as={Col} className="col-7">
                    <ListGroup.Item style={{textAlign: 'center'}}>
                        <Button
                            className="hover-underline-animation"
                            href={`https://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&v%3Asources=medlineplus-bundle&query=${activeMed?.Drug}`}
                            size="lg"
                            target="_blank"
                            variant="link"
                        >
                            {activeMed?.Drug}
                        </Button>

                        <LastTakenButton
                            lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                        />

                        {activeMed?.Id && (
                            <DrugLogGrid
                                columns={['Taken', 'Notes', 'Out', 'In']}
                                drugId={activeMed.Id}
                                drugLogList={drugLogList}
                                medicineList={medicineList}
                                onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                                onEdit={(r) => handleAddEditDrugLog(r)}
                                onPillClick={(n) => pillboxSelected(n)}
                                pillboxItemList={pillboxItemList}
                                pillboxList={pillboxList}
                            />
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Row>

            <DeleteDrugLogModal
                drugLogRecord={showDeleteDrugLogRecord as DrugLogRecord}
                drugName={
                    showDeleteDrugLogRecord ? getDrugName(showDeleteDrugLogRecord.MedicineId, medicineList) || '' : ''
                }
                onSelect={async (drugLogRecord) => {
                    setShowDeleteDrugLogRecord(null);
                    if (drugLogRecord) {
                        await medHistoryProvider.delete(showDeleteDrugLogRecord?.Id as number);
                        const drugLogRecords = await medHistoryProvider.load(clientId as number, 5);
                        await setActiveClient({...(activeClient as TClient), drugLogList: drugLogRecords});
                    }
                }}
                show={showDeleteDrugLogRecord !== null}
            />

            <MedicineEdit
                allowDelete={!drugLogList.some((d) => d.MedicineId === showMedicineEdit?.Id)}
                drugInfo={showMedicineEdit as MedicineRecord}
                existingDrugs={showMedicineEdit?.Id === null ? medicineList.map((m) => m.Drug) : []}
                fullName={clientFullName(activeClient.clientInfo)}
                onClose={(medicineRecord) => {
                    setShowMedicineEdit(null);
                    if (medicineRecord) saveMedicine(medicineRecord);
                }}
                show={showMedicineEdit !== null}
            />

            <DrugLogToast
                medicineList={medicineList}
                onClose={() => setToast(null)}
                show={toast !== null}
                toast={toast as DrugLogRecord[]}
            />

            <DrugLogEdit
                drugLogInfo={showDrugLog as DrugLogRecord}
                drugName={getDrugName(showDrugLog?.MedicineId as number, medicineList) || '[unknown]'}
                onClose={(drugLogRecord) => {
                    setShowDrugLog(null);
                    if (drugLogRecord)
                        saveDrugLog(drugLogRecord).then((updatedDrugLogRecord) => setToast([updatedDrugLogRecord]));
                }}
                onHide={() => setShowDrugLog(null)}
                show={showDrugLog !== null}
            />
        </>
    );
};

export default RxMedicine;
