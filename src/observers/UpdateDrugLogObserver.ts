import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the updateDrugLog global
 * when populated is set to the DrugLogRecord to be added or updated
 * @param {IMedicineManager} mm
 * @constructor
 */
const UpdateDrugLogObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [updateDrugLog, setUpdateDrugLog] = useGlobal('updateDrugLog');

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
