import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

const UpdateDrugLogObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [updateDrugLog, setUpdateDrugLog] = useGlobal('updateDrugLog');

    /**
     * Set to a drugLogRecord when a MedHistory record is added or updated
     * @var updateDrugLog {drugLogRecord|null}
     */
    useEffect(() => {
        if (updateDrugLog) {
            mm.updateDrugLog(updateDrugLog, updateDrugLog.ResidentId)
            .then((drugLogs) => {
                setRefreshDrugLog(drugLogs)
            })
            .then(() => {
                setUpdateDrugLog(null)
            })
            .catch((err) => setErrorDetails(err))
        }
    }, [mm, setErrorDetails, setRefreshDrugLog, setUpdateDrugLog, updateDrugLog])
}

export default UpdateDrugLogObserver;
