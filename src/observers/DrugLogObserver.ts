import {IMedicineManager} from "managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";
import {DrugLogRecord, ResidentRecord} from "types/RecordTypes";

/**
 * Watch the __drugLog global
 * when set take the action specified: load, update, or delete
 */
const DrugLogObserver = (mm: IMedicineManager, activeClient: ResidentRecord | null) => {
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [drugLog, setDrugLog] = useGlobal('__drugLog');

    useEffect(() => {
        if (drugLog && activeClient && activeClient.Id) {
            const clientId = activeClient.Id;
            const action  = drugLog.action;
            const payload = drugLog.payload;
            switch (action) {
                case "load": {
                    if (Array.isArray(payload)) {
                        setDrugLogList(payload);
                        if (drugLog.cb) {
                            drugLog.cb(payload);
                        }
                        setDrugLog(null);
                    } else {
                        mm.loadDrugLog(clientId)
                        .then((drugs) => {
                            setDrugLogList(drugs);
                            if (drugLog.cb) {
                                return drugLog.cb(drugs);
                            }
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setDrugLog(null))
                    }
                    break;
                }

                case "update": {
                    const drugLogRecord = drugLog.payload as DrugLogRecord;
                    if (drugLogRecord) {
                        mm.updateDrugLog(drugLogRecord as DrugLogRecord)
                        .then((dr) => {
                            if (drugLog.cb) {
                                drugLog.cb(dr);
                            }
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setDrugLog(null))
                    }
                    break;
                }

                case "delete": {
                    const drugLogId = drugLog.payload as number;
                    mm.deleteDrugLog(drugLogId)
                    .then((deleted) => {
                        if (deleted) {
                            return setDrugLog({action: 'load', payload: clientId});
                        } else {
                            return setErrorDetails(new Error('unable to delete drugLogRecord. Id: ' + drugLogId));
                        }
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => setDrugLog(null))
                    break;
                }
            }
        }
    }, [activeClient, drugLog, mm, setDrugLog, setDrugLogList, setErrorDetails]);
}

export default DrugLogObserver;
