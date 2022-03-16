import MedDrugLogHistory from 'components/Pages/Grids/MedDrugLogHistory';
import DeleteDrugLogModal from 'components/Pages/Modals/DeleteDrugLogModal';
import DrugLogEdit from 'components/Pages/Modals/DrugLogEdit';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedicineManager} from 'managers/MedicineManager';
import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import React, {useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {asyncWrapper, getDrugName, getMedicineRecord} from 'utility/common';

interface IProps {
    mm: IMedicineManager;
    medHistoryProvider: IMedHistoryProvider;
    onPillboxSelected: (id: number) => void;
    otcList: MedicineRecord[];
}

/**
 * RxHistory Tab - Shows a grid of drugs logged for the past 5 days
 * @param {IProps} props The props for this component
 */
const RxHistory = (props: IProps) => {
    const {mm, medHistoryProvider, onPillboxSelected, otcList} = props;
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
        const [errorUpdateDrugLog, updatedDrugLog] = (await asyncWrapper(medHistoryProvider.update(drugLog))) as [
            unknown,
            Promise<DrugLogRecord>
        ];
        if (errorUpdateDrugLog) await setErrorDetails(errorUpdateDrugLog);
        else {
            const [errorLoadDrugLog, drugLogs] = (await asyncWrapper(
                mm.loadDrugLog(activeClient?.clientInfo?.Id as number, 5)
            )) as [unknown, Promise<DrugLogRecord[]>];
            await (errorLoadDrugLog
                ? setErrorDetails(errorLoadDrugLog)
                : setActiveClient({...(activeClient as TClient), drugLogList: await drugLogs}));
        }
        await setIsBusy(false);
        return await updatedDrugLog;
    };

    if (activeClient === null) return null;
    const medicineOtcList = [...activeClient.medicineList, ...otcList];

    return (
        <>
            <MedDrugLogHistory
                activeClient={activeClient}
                disabled={isBusy}
                onEdit={(drugLogRecord) => setShowDrugLog({...drugLogRecord})}
                onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                onPillClick={(pillboxId) => onPillboxSelected(pillboxId)}
                medicineOtcList={medicineOtcList}
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
                onSelect={async (drugLogRecord) => {
                    await setShowDeleteDrugLogRecord(null);
                    if (drugLogRecord) await medHistoryProvider.delete(showDeleteDrugLogRecord?.Id as number);
                    const drugLogRecords = await mm.loadDrugLog(activeClient?.clientInfo?.Id as number, 5);
                    await setActiveClient({...activeClient, drugLogList: drugLogRecords});
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
