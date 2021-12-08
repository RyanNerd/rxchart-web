import MedDrugLogHistory from 'components/Pages/Grids/MedDrugLogHistory';
import DeleteDrugLogModal from 'components/Pages/Modals/DeleteDrugLogModal';
import DrugLogEdit from 'components/Pages/Modals/DrugLogEdit';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedicineManager} from 'managers/MedicineManager';
import React, {useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {asyncWrapper, getDrugName, getMedicineRecord} from 'utility/common';

interface IProps {
    mm: IMedicineManager;
    onPillboxSelected: (id: number) => void;
    otcList: MedicineRecord[];
}

const RxHistory = (props: IProps) => {
    const {mm, onPillboxSelected, otcList} = props;
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [isBusy, setIsBusy] = useState(false);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog Druglog record object
     */
    const saveDrugLog = async (drugLog: DrugLogRecord): Promise<DrugLogRecord> => {
        await setIsBusy(true);
        const [e, updatedDrugLog] = (await asyncWrapper(mm.updateDrugLog(drugLog))) as [
            unknown,
            Promise<DrugLogRecord>
        ];
        if (e) await setErrorDetails(e);
        else {
            const [errLoadLog, drugLogs] = (await asyncWrapper(
                mm.loadDrugLog(activeClient?.clientInfo?.Id as number, 5)
            )) as [unknown, Promise<DrugLogRecord[]>];
            if (errLoadLog) await setErrorDetails(errLoadLog);
            else await setActiveClient({...(activeClient as TClient), drugLogList: await drugLogs});
        }
        await setIsBusy(false);
        return await updatedDrugLog;
    };

    const medicineOtcList = activeClient?.medicineList.concat(otcList) as MedicineRecord[];

    if (activeClient === null) return null;
    return (
        <>
            <MedDrugLogHistory
                activeClient={activeClient.clientInfo}
                disabled={isBusy}
                gridLists={{
                    drugLogList: activeClient.drugLogList,
                    pillboxList: activeClient.pillboxList,
                    pillboxItemList: activeClient.pillboxItemList,
                    medicineList: activeClient.medicineList.concat(otcList)
                }}
                onEdit={(drugLogRecord) => setShowDrugLog({...drugLogRecord})}
                onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                onPillClick={(pillboxId) => onPillboxSelected(pillboxId)}
            />

            <DrugLogEdit
                drugLogInfo={showDrugLog as DrugLogRecord}
                drugName={getDrugName(showDrugLog?.MedicineId as number, medicineOtcList) || '[unknown]'}
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
                drugName={getDrugName(showDrugLog?.MedicineId as number, medicineOtcList) || '[unknown]'}
                onSelect={(drugLogRecord) => {
                    setShowDeleteDrugLogRecord(null);
                    if (drugLogRecord)
                        mm.deleteDrugLog(showDeleteDrugLogRecord?.Id as number).then(() => {
                            mm.loadDrugLog(activeClient?.clientInfo?.Id as number, 5).then((drugLogRecords) => {
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

export default RxHistory;
