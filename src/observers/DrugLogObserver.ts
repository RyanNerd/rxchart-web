import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";
import {DrugLogRecord, ResidentRecord} from "../types/RecordTypes";

const DrugLogObserver = (mm: IMedicineManager, activeClient: ResidentRecord | null) => {
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [drugLog, setDrugLog] = useGlobal('drugLog');

    useEffect(() => {
        if (drugLog && activeClient && activeClient.Id) {
            const clientId = activeClient.Id;
            const action  = drugLog.action;
            const payload = drugLog.payload;
            switch (action) {
                case "load": {
                    if (Array.isArray(payload)) {
                        setDrugLogList(payload).then(() => {
                            setDrugLog(null)
                        })
                    } else {
                        mm.loadDrugLog(clientId)
                        .then((drugs) => { setDrugLogList(drugs) })
                        .then(() => {
                            setDrugLog(null)
                        })
                        .catch((err) => setErrorDetails(err))
                    }
                    break;
                }
                case "update": {
                    const drugLogRecord = drugLog.payload;
                    if (drugLogRecord) {
                        mm.updateDrugLog(drugLogRecord as DrugLogRecord, clientId)
                        .then((drugLogs) => {
                            setDrugLog({action: 'load', payload: drugLogs})
                        })
                        .catch((err) => setErrorDetails(err))
                    }
                    break;
                }
                case "delete": {
                    const drugLogId = drugLog.payload as number;
                    mm.deleteDrugLog(drugLogId)
                    .then((deleted) => {
                        if (deleted) {
                            setDrugLog({action: 'load', payload: clientId});
                        } else {
                            setErrorDetails(new Error('unable to delete drugLogRecord. Id: ' + drugLogId));
                        }
                    })
                    .catch((err) => setErrorDetails(err))
                }
            }
        }
    }, [activeClient, drugLog, mm, setDrugLog, setDrugLogList, setErrorDetails]);
}

export default DrugLogObserver;
