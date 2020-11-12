import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const UpdateDrugLogObserver = (mm: IMedicineManager) => {
    const [updateDrugLog, setUpdateDrugLog] = useGlobal('updateDrugLog');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to a drugLogRecord when a MedHistory record is added or updated
     * @var updateDrugLog {drugLogRecord|null}
     */
    useEffect(() => {
        if (updateDrugLog) {
            mm.updateDrugLog(updateDrugLog, updateDrugLog.ResidentId)
            .then((drugLogs) => {setRefreshDrugLog(drugLogs)})
            .then(() => {setUpdateDrugLog(null)})
            .catch((err) => setErrorDetails(err))
        }
    }, [mm, setErrorDetails,setRefreshDrugLog, setUpdateDrugLog, updateDrugLog])
}

export default UpdateDrugLogObserver;
