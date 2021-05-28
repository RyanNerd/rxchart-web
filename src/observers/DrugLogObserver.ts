import {useEffect, useGlobal} from "reactn";

import {IMedicineManager} from "../managers/MedicineManager";
import {DrugLogRecord, ResidentRecord} from "../types/RecordTypes";

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
                        setDrugLogList(payload)
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setDrugLog(null))
                    } else {
                        mm.loadDrugLog(clientId)
                        .then((drugs) => {
                            return setDrugLogList(drugs);
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setDrugLog(null))
                    }
                    break;
                }

                case "update": {
                    const drugLogRecord = drugLog.payload;
                    if (drugLogRecord) {
                        mm.updateDrugLog(drugLogRecord as DrugLogRecord, clientId)
                        .then((drugLogs) => {
                            return setDrugLog({action: 'load', payload: drugLogs})
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
