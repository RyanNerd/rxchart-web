import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const RefreshDrugLogObserver = (mm: IMedicineManager) => {
    const [refreshDrugLog, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setErrorDetails] = useGlobal('errorDetails');
    /**
     * Set to residentId or DrugLogRercord[] when drugLogList needs a refresh
     * @var refreshDrugLog {number|DrugLogRecord[]|null}
     */
    useEffect(() => {
        if (refreshDrugLog) {
            if (Array.isArray(refreshDrugLog)) {
                setDrugLogList(refreshDrugLog).then((state) => {setRefreshDrugLog(null)})
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
