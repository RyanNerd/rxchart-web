import DrugLogGrid from 'components/Pages/Grids/DrugLogGrid';
import OtcListGroup from 'components/Pages/ListGroups/OtcListGroup';
import {TAB_KEY} from 'components/Pages/rxPage';
import DeleteDrugLogModal from 'components/Pages/Modals/DeleteDrugLogModal';
import DrugLogEdit from 'components/Pages/Modals/DrugLogEdit';
import MedicineEdit from 'components/Pages/Modals/MedicineEdit';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedicineManager} from 'managers/MedicineManager';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord} from 'types/RecordTypes';
import {asyncWrapper, clientFullName, getDrugName, getMedicineRecord} from 'utility/common';

interface IProps {
    mm: IMedicineManager;
    activeRxTab: TAB_KEY;
}

/**
 * The RxOtc tab - Displays the OTC drug dropdown and drug log grid
 * @param {IProps} props The props for this component
 */
const RxOtc = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [activeOtc, setActiveOtc] = useState<MedicineRecord | null>(null);
    const [isBusy, setIsBusy] = useState(false);
    const [otcList, setOtcList] = useGlobal('otcList');
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);
    const clientId = activeClient?.clientInfo.Id;
    const mm = props.mm;

    const [activeRxTab, setActiveRxTab] = useState<TAB_KEY>(props.activeRxTab);
    useEffect(() => {
        setActiveRxTab(props.activeRxTab);
    }, [props.activeRxTab]);

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog Druglog record object
     */
    const saveDrugLog = async (drugLog: DrugLogRecord): Promise<DrugLogRecord> => {
        await setIsBusy(true);
        const [errorUpdateDrugLog, updatedDrugLog] = (await asyncWrapper(mm.updateDrugLog(drugLog))) as [
            unknown,
            Promise<DrugLogRecord>
        ];
        if (errorUpdateDrugLog) await setErrorDetails(errorUpdateDrugLog);
        else {
            const [errorLoadDrugLog, drugLogs] = (await asyncWrapper(mm.loadDrugLog(clientId as number, 5))) as [
                unknown,
                Promise<DrugLogRecord[]>
            ];
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
    const handleLogOtcDrugAmount = (amount: number) => {
        const medicineId = activeOtc?.Id;
        const drugLogInfo = {...newDrugLogRecord};
        drugLogInfo.MedicineId = medicineId as number;
        drugLogInfo.Notes = amount.toString();
        drugLogInfo.ResidentId = clientId as number;
        saveDrugLog(drugLogInfo).then((r) => setToast([r]));
    };

    /**
     * Given a MedicineRecord object Update/Insert the record and rehydrate the global otcList / medicineList
     * Set the activeOtc with the updated medicine (if Active)
     * @param {MedicineRecord} med Medicine record object
     */
    const saveMedicine = async (med: MedicineRecord) => {
        await setIsBusy(true);
        const [error, m] = (await asyncWrapper(mm.updateMedicine(med))) as [unknown, Promise<MedicineRecord>];
        if (error) await setErrorDetails(error);
        const updatedMedicineRecord = await m;
        const [errorLoadOtc, otcMeds] = (await asyncWrapper(mm.loadOtcList())) as [unknown, Promise<MedicineRecord[]>];
        await (errorLoadOtc ? setErrorDetails(errorLoadOtc) : setOtcList(await otcMeds));
        setActiveOtc(updatedMedicineRecord.Active ? updatedMedicineRecord : null);
        await setIsBusy(false);
    };

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {DrugLogRecord} drugLogInfo The drugLog record object
     */
    const addEditDrugLog = (drugLogInfo?: DrugLogRecord) => {
        const drugLogRecord = drugLogInfo
            ? {...drugLogInfo}
            : ({
                  Id: null,
                  ResidentId: clientId,
                  MedicineId: activeOtc?.Id,
                  Notes: ''
              } as DrugLogRecord);
        setShowDrugLog(drugLogRecord);
    };

    if (activeClient === null) return null;
    const medicineOtcList = [...activeClient.medicineList, ...otcList];

    return (
        <>
            <Row noGutters>
                <Col>
                    <OtcListGroup
                        activeOtc={activeOtc}
                        activeRxTab={activeRxTab}
                        disabled={otcList.length === 0 || isBusy}
                        drugLogList={activeClient.drugLogList}
                        editOtcMedicine={(medicineRecord) => setShowMedicineEdit(medicineRecord)}
                        logOtcDrug={() => addEditDrugLog()}
                        logOtcDrugAmount={(n) => handleLogOtcDrugAmount(n)}
                        otcList={otcList}
                        otcSelected={(medicineRecord) => setActiveOtc(medicineRecord)}
                    />
                </Col>

                <ListGroup as={Col} className="ml-2">
                    <ListGroup.Item>
                        <h5 className="mb-2" style={{textAlign: 'center'}}>
                            OTC Log History
                        </h5>
                        <DrugLogGrid
                            columns={['Drug', 'Taken', 'Notes']}
                            drugLogList={activeClient.drugLogList.filter((drug: DrugLogRecord) => {
                                return otcList.some((m) => {
                                    return m.Id === drug?.MedicineId;
                                });
                            })}
                            medicineList={otcList}
                            onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                            onEdit={(drugLogRecord) => addEditDrugLog(drugLogRecord)}
                        />
                    </ListGroup.Item>
                </ListGroup>
            </Row>

            <MedicineEdit
                allowDelete={!activeClient.drugLogList.some((d) => d.MedicineId === showMedicineEdit?.Id)}
                drugInfo={showMedicineEdit as MedicineRecord}
                existingDrugs={showMedicineEdit?.Id === null ? otcList.map((m) => m.Drug) : []}
                fullName={clientFullName(activeClient.clientInfo)}
                onClose={(medicineRecord) => {
                    setShowMedicineEdit(null);
                    if (medicineRecord) saveMedicine(medicineRecord);
                }}
                show={showMedicineEdit !== null}
            />

            <DrugLogEdit
                drugLogInfo={showDrugLog as DrugLogRecord}
                drugName={getMedicineRecord(showDrugLog?.MedicineId as number, medicineOtcList)?.Drug || '[unknown]'}
                onClose={(drugLogRecord) => {
                    setShowDrugLog(null);
                    if (drugLogRecord)
                        saveDrugLog(drugLogRecord).then((updatedDrugLogRecord) => setToast([updatedDrugLogRecord]));
                }}
                onHide={() => setShowDrugLog(null)}
                otc={getMedicineRecord(showDrugLog?.MedicineId as number, medicineOtcList)?.OTC || false}
                show={showDrugLog !== null}
            />

            <DeleteDrugLogModal
                drugLogRecord={showDeleteDrugLogRecord as DrugLogRecord}
                drugName={
                    showDeleteDrugLogRecord
                        ? getDrugName(showDeleteDrugLogRecord.MedicineId, medicineOtcList) || ''
                        : ''
                }
                onSelect={(drugLogRecord) => {
                    setShowDeleteDrugLogRecord(null);
                    if (drugLogRecord)
                        mm.deleteDrugLog(showDeleteDrugLogRecord?.Id as number).then(() => {
                            mm.loadDrugLog(clientId as number, 5).then((drugLogRecords) => {
                                setActiveClient({...activeClient, drugLogList: drugLogRecords});
                            });
                        });
                }}
                show={showDeleteDrugLogRecord !== null}
            />

            <DrugLogToast
                medicineList={medicineOtcList}
                onClose={() => setToast(null)}
                show={toast !== null}
                toast={toast as DrugLogRecord[]}
            />
        </>
    );
};

export default RxOtc;
