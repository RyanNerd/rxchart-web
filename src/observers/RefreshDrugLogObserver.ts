import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch the refreshDrugLog global for changes
 * when populated it can be the Resident.Id to refresh or DrugLogRecord[] to use to refresh.
 * @param {IMedicineManager} mm
 * @constructor
 */
const RefreshDrugLogObserver = (mm: IMedicineManager) => {
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [refreshDrugLog, setRefreshDrugLog] = useGlobal('refreshDrugLog');

    useEffect(() => {
        if (refreshDrugLog) {
            if (Array.isArray(refreshDrugLog)) {
                setDrugLogList(refreshDrugLog).then(() => {
                    setRefreshDrugLog(null)
                })
            } else {
                mm.loadDrugLog(refreshDrugLog)
                .then((drugs) => {
                    setDrugLogList(drugs)
                })
                .then(() => {
                    setRefreshDrugLog(null)
                })
                .catch((err) => setErrorDetails(err))
            }
        }
    }, [mm, refreshDrugLog, setDrugLogList, setErrorDetails, setRefreshDrugLog]);
}

export default RefreshDrugLogObserver;
